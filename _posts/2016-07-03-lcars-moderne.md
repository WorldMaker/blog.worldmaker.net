---
layout: post
title: "LCARS Moderne (New Blog Theme): Partying Like 1999's View of 2364"
tags: [worldmaker]
---

I had a fun new idea for a blog theme several weeks ago, and here it is, I call
it *LCARS Moderne* (ridiculous "e" required). It's the first truly comprehensive
site redesign I've done since about 2009, but's also a throwback in its way to
the design I used way back in 1999, which was the reason for
[some recent web archealogy](/2016/06/07/portrait-web-developer/). It's a design
to make my inner 15 year old self excited. It's definitely not going to please
everyone, but it's my blog, I do what I want here.

# Partying like its 1999's version of 2364 here in 2016

[WorldMaker Online circa 1999](http://worldmaker.net/wmo99/) was clearly an
attempt to replicate, at least partially the Okudagram aesthetic of
*Star Trek: The Next Generation* LCARS [Library Computer Access and Retrieval
System]. That design, while incorporating cutting edge CSS1 at the time was
built with a complicated TABLE structure and many corner GIFs. Those are the
things I can old man shout at web designers these days.

> Back in my day, all we had were table structures and if you wanted pretty
> corners, you walked twelve miles in the snow, uphill, to your image program
> and artisanally hand crafted the GIFs yourself.

The realization I had a few weeks ago was that I could probably do it all
over with nice CSS2 and CSS3 features like `border-radius`, `::before`, and
`::after` and Flexbox.

Thanks to the magic of Flexbox, this site design has the least amount of
markup furniture surrounding the site contents, of any of my blog designs.
The source order in the markup is also probably the best it has ever been.
Both of those make the mostly passed semantic web warrior from college in
me pleased. I'd imagine it would also amaze 15 year old me.

Other improvements brought with passing of time and bettering of technology
include a responsive flex down into a mobile view (technically, **up** from a
mobile view, because that's the best way to do it). Also, Web Fonts these
days are reliable and no more am I beholden to just simple friends like Comic
Sans. (I still like Comic Sans, but long past are the days when the majority
of my site would be in Comic Sans.) This is the latest iteration of my "Future
Thesis" font aesthetic: futurist sans for headers and decoration; old style
serifs for body.

# Horizontal Scrolling is Definitely Retro Future (and These People Hate It)

CSS3 finally has proper multi-column support that mostly works in all the
browsers (with vendor prefixes) and no one wants to use it because Some Very
Vocal and Obnoxious Crowds hate horizontal scrolling of websites.

I freely admit that when Windows 8 based a lot of its aesthetic on nice
multi-column horizontal designs I was excited that the future was finally here.
No longer should we be beholden to arbitrarily constraining websites to fixed
borders, we could make a good, gentle usage of our growing widescreen real
estate.

That future has surprisingly already come and past and I still love it despite
those Vocal Crowds. So here it is, on my own website, in some of its glory.
There's still little bugs in it across the browsers and right now scroll wheel
scrolling only works in IE and Edge thanks to an MS vendor prefixed option. I
may add the JQuery to help with that on other browsers or just do a boring
vertical on non-IE/Edge, but for now, my aesthetic desires trump Vocal Crowds
and browser implementation bugs and non-standard scrolling behavior.

The easy "fix" if it bugs you, dear reader, is to shrink the view to "Mobile" size,
click that "Reader" button in the browser of your choice, or to click the "Print
Preview" button.