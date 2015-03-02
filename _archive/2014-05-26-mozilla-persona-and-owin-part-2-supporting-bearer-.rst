---
date: 2014-05-26 21:12:08.174705
db_id: 1165
db_updated: 2014-05-26 21:12:08.174730
layout: post
tags: coding asp.net persona
title: 'Mozilla Persona and OWIN Part 2: Supporting Bearer Tokens'
---
In part one I created a `Persona Controller`_, which provided OWIN Cookie Authentication (as a Web API controller), for supporting MVC logins. Going further down OWIN authentication rabbit hole, I needed to figure out how to get the OWIN bearer token support working, as the new templates default to using that to secure Web API 2 controllers themselves. Turns out this was easier than I expected (most of the previous code copy and pasted over), but felt a lot more complicated in terms of finding useful example documentation. (Not that part one was a cake walk in that department either...)

.. _Persona Controller: http://blog.worldmaker.net/2014/apr/19/persona-controller-owin-web-api-2/

Here is the ``ApplicationOAuthProvider`` class that replaces the bulk of the ``PersonaController``:

.. sourcecode:: c#
  
  using System;
  using System.Threading.Tasks;
  using Microsoft.Owin.Security.OAuth;
  using System.Net.Http;
  using System.Configuration;
  using Newtonsoft.Json;
  using Newtonsoft.Json.Linq;
  using System.Security.Claims;
  using Microsoft.Owin.Security.Cookies;
  using Microsoft.Owin.Security;
  using System.Collections.Generic;
  
  namespace StingerCheck.Providers
  {
      public class ApplicationOAuthProvider : OAuthAuthorizationServerProvider
      {
          private readonly string _publicClientId;
  
          public ApplicationOAuthProvider(string publicClientId)
          {
              if (publicClientId == null)
              {
                  throw new ArgumentNullException("publicClientId");
              }
  
              _publicClientId = publicClientId;
          }
  
          public async override Task GrantCustomExtension(OAuthGrantCustomExtensionContext context)
          {
              if (context.GrantType.Equals("persona", StringComparison.OrdinalIgnoreCase))
              {
                  var http = new HttpClient() { BaseAddress = new Uri(ConfigurationManager.AppSettings["PersonaVerificationBaseUrl"]), };
                  var body = await JsonConvert.SerializeObjectAsync(new
                  {
                      assertion = (string)context.Parameters["assertion"],
                      audience = ConfigurationManager.AppSettings["PersonaAudienceUrl"],
                  });
                  var result = await http.PostAsync("verify", new StringContent(body, System.Text.Encoding.UTF8, "application/json"));
  
                  var response = JObject.Parse(await result.Content.ReadAsStringAsync());
  
                  var status = (string)response["status"];
                  if (result.IsSuccessStatusCode && string.Equals(status, "okay", StringComparison.OrdinalIgnoreCase))
                  {
                      var email = (string)response["email"];
                      var claims = new Claim[]
                      {
                          new Claim(ClaimTypes.Name, email),
                          new Claim(ClaimTypes.Email, email),
                          new Claim("persona-expires", (string)response["expires"]),
                          new Claim("persona-audience", (string)response["audience"]),
                          new Claim("persona-issuer", (string)response["issuer"]),
                          new Claim(ClaimTypes.AuthenticationMethod, "Persona"),
                      };
                      var oauthIdentity = new ClaimsIdentity(claims, context.Options.AuthenticationType);
                      var ticket = new AuthenticationTicket(oauthIdentity, new AuthenticationProperties(new Dictionary<string, string> {
                          {"email", email},
                      }));
                      context.Validated(ticket);
                      var identity = new ClaimsIdentity(claims, CookieAuthenticationDefaults.AuthenticationType);
                      context.OwinContext.Authentication.SignIn(identity);
                      return;
                  }
  
                  context.SetError("invalid_grant", (string)response.SelectToken("reason"));
                  return;
              }
  
              await base.GrantCustomExtension(context);
          }
  
  
          public override Task ValidateClientAuthentication(OAuthValidateClientAuthenticationContext context)
          {
              // Resource owner password credentials does not provide a client ID.
              if (context.ClientId == null)
              {
                  context.Validated();
              }
  
              return Task.FromResult<object>(null);
          }
  
          public override Task TokenEndpoint(OAuthTokenEndpointContext context)
          {
              foreach (KeyValuePair<string, string> property in context.Properties.Dictionary)
              {
                  context.AdditionalResponseParameters.Add(property.Key, property.Value);
              }
  
              return Task.FromResult<object>(null);
          }
  
          public override Task ValidateClientRedirectUri(OAuthValidateClientRedirectUriContext context)
          {
              if (context.ClientId == _publicClientId)
              {
                  Uri expectedRootUri = new Uri(context.Request.Uri, "/");
  
                  if (expectedRootUri.AbsoluteUri == context.RedirectUri)
                  {
                      context.Validated();
                  }
                  else if (context.ClientId == "web")
                  {
                      var expectedUri = new Uri(context.Request.Uri, "/");
                      context.Validated(expectedUri.AbsoluteUri);
                  }
              }
  
              return Task.FromResult<object>(null);
          }
      }
  }