---
date: 2008-03-14 02:43:01.071552
db_id: 454
db_updated: 2008-03-14 02:45:09.714667
layout: post
tags: game-design
title: Sledgehammer to the Network Code, Yo
---
I've been pretty busy this week.  It's my last Spring Break I expect to see in my university career and rather than spend the week vegetating in some tropical spot or some other vacation destination, I've been using the time to gut and then rewrite a good chunk of my game's networking code.  I'm not sure if I'm more surprised or unsurprised at this fact, but progress seems to have been pretty good this week so far.

For those not following along at home, I made the decision to migrate from a current WCF (.NET 3.0) based networking stack to XNA 2.0's cross-platform Live!-tastic networking framework.  Goodbye dependencies on .NET 3.0 and Windows P2P/Advanced Networking.  Hello having to worry about Creator's Club memberships for testers and complaining (but not too hard, keeping it friendly) about the current lack of an Xbox build for FRB_, my current "physics" engine of choice (rather than coding directly to the XNA wire).

.. _FRB: http://www.flatredball.com/

It's interesting because I think this networking rewrite has been something of the kick in the ass that I needed to get the brain running on some new areas to attack in the game by first sweeping out a lot of old cobwebs.  Some of my old network code supposed that I would have to run some of my own infrastructure: gaming handles, avatars, et al.  XNA supplies a lot of that from MSFT's Live! stuff and I'm a little less worried about publisher lock-in thanks to Valve's Steamworks announcement.   Even if no one else is interested, I'm interested in putting together a Steamworks.NET library to go toe-to-toe with Microsoft's XNA GamerServices and Net namespaces.  So freeing myself from worrying about running my own login server and what have you seems to have helped open up some ideas for interesting improvements to other areas of the game.  (Some good ideas on things to do to spice up some animations and transitions and whatnot that probably won't be implemented any time soon but I'm starting to see a better and better skeleton...)

Additionally there's the weird ego boost from XNA's GamerServices stuff...  It's still amusing/amazing to pull up the Guide from my game or to see a notification pop up or to have my Gamerpic show up.  I've even written messages to friends from within "my game", an executable that I built.  I feel special, and I know that it's a drug that Microsoft is feeding me and hoping I get attached to and then even more wish to get published by/through them, but shut up and let me revel in what delirium I have until the initial drug wears off...

Another small source of ego boost has been the small decision to follow behind my "personal branding" change and make a change in logo font for Enlark.  (At the top of my pages now you should see the handsome *Gotham Rail NF* font.)  I bought a few more fonts from the same foundry and chose a clean, but fresh, one for Enlark's logo.  It's now been adorning the game's splash screen this week and I'm quite happy with it.  I think its something that looks quite unique amongst contemporary logos, being that its a throwback to a 1930s sign design, and could help enforce Enlark's trademarks, should I have any problems there (knock on wood).  It'll be a while before I finish my current stack of business cards, but I think I should put together a new design for Enlark's website and if I do, expect to see the new font in all its glory...  So just a small shout out to `Nick's Fonts`_, then, for some really neat fonts at good prices.

.. _Nick's Fonts: http://www.nicksfonts.com/