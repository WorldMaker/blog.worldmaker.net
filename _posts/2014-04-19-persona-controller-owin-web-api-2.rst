---
date: 2014-04-19 00:03:26.378871
db_id: 1163
db_updated: 2014-04-19 00:06:45.779832
layout: post
tags: asp.net persona
title: Persona Controller for OWIN (Web API 2)
---
For a website I'm building in ASP.NET MVC 5/Web API 2 I wanted to simply support `Mozilla Persona`_ as the one and only login system for the site. After finding the right blog posts (which was harder than I expected), particularly `Brock Allen's primer`__, I found OWIN and ASP.NET Identity made it easier than I expected. I'm posting this in the hopes that it might help the next person attempting this.

.. _Mozilla Persona: http://persona.org
__ http://brockallen.com/2013/10/24/a-primer-on-owin-cookie-authentication-middleware-for-the-asp-net-developer/

.. sourcecode:: c#

  using Microsoft.AspNet.Identity;
  using Newtonsoft.Json;
  using Newtonsoft.Json.Linq;
  using System;
  using System.Collections.Generic;
  using System.Linq;
  using System.Net;
  using System.Net.Http;
  using System.Security.Claims;
  using System.Threading.Tasks;
  using System.Web.Http;
  
  namespace MyApp.Controllers
  {
      [RoutePrefix("api/Persona")]
      public class PersonaController : ApiController
      {
          // From: http://brockallen.com/2013/10/24/a-primer-on-owin-cookie-authentication-middleware-for-the-asp-net-developer/
          public const string PersonaAuthenticationType = DefaultAuthenticationTypes.ApplicationCookie;

          [HttpPost]
          [Route("login")]
          public async Task<IHttpActionResult> Login([FromBody]JObject assertion)
          {
              var http = new HttpClient() { BaseAddress = new Uri(Properties.Settings.Default.PersonaVerificationBaseUrl), };
              var body = await JsonConvert.SerializeObjectAsync(new
              {
                  assertion = (string)assertion["assertion"],
                  audience = Properties.Settings.Default.PersonaAudienceUrl,
              });
              var result = await http.PostAsync("verify", new StringContent(body, System.Text.Encoding.UTF8, "application/json"));    
  
              dynamic response = JObject.Parse(await result.Content.ReadAsStringAsync());
  
              var status = (string)response.status;
              if (result.IsSuccessStatusCode && string.Equals(status, "okay", StringComparison.OrdinalIgnoreCase))
              {
                  var claims = new Claim[]
                  {
                      new Claim(ClaimTypes.Name, (string)response.email),
                      new Claim(ClaimTypes.Email, (string)response.email),
                      new Claim("persona-expires", (string)response.expires),
                      new Claim("persona-audience", (string)response.audience),
                      new Claim("persona-issuer", (string)response.issuer),
                      new Claim(ClaimTypes.AuthenticationMethod, "Persona"),
                  };
                  var identity = new ClaimsIdentity(claims, PersonaAuthenticationType);
                  var ctx = Request.GetOwinContext();
                  ctx.Authentication.SignIn(identity);
              }
              else
              {
                  result.StatusCode = HttpStatusCode.BadRequest;
              }
  
              return ResponseMessage(result);
          }
  
          [HttpPost]
          [Route("logout")]
          public IHttpActionResult Logout()
          {
              var ctx = Request.GetOwinContext();
              ctx.Authentication.SignOut(PersonaAuthenticationType);
              return Ok();
          }
      }
  }
