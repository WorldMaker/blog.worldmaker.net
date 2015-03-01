---
date: 2011-10-24 23:49:37.671857
db_id: 719
db_updated: 2011-10-24 23:49:37.671878
layout: post
tags: games game-design bhaloidam
title: Bhaloidam
---
If you haven't already, you should definitely back Corvus Elrod's `Bhaloidam on Kickstarter`_. There are only a few days left to do so. Corvus' Bhaloidam is a very unique storytelling platform as RPG-like boardgame (or boardgame-like RPG) and well worth pushing further towards its Kickstarter goal. Corvus explains things pretty well on the Kickstarter page, so go there.

.. _Bhaloidam on Kickstarter: http://www.kickstarter.com/projects/corvuse/bhaloidam-an-indie-tabletop-storytelling-game

I've enjoyed every opportunity I've had to work with Bhaloidam (or as it was previously referred to as the HoneyComb Engine), both in having played it a couple of times with Corvus and friends and having experimented with it in Python. Now that Bhaloidam is stable and about to be published in a big way, I'm working on slowly picking back up the Python work and bring it up to date.

The first baby step here is that I'm giving the library and assorted accoutrements a proper name, which is now Madiolahb_. Obviously not entirely original as it is simply the reverse of Bhaloidam, but I like that it lends some focus to "lahb"; my intended path for the library and toolset is to be a laboratory of interesting component parts to build Bhaloidam-based games and structures in computer-mediated spaces. As a first example of this laboratory approach I'm trying to push towards as rewrite, streamline, and expand upon Madiolahb, I'm opening up the idea of a standardized JSON format for tool chaining (similar in ways to unix pipelining) within Madiolahb itself and as a potential interchange format between other Bhaloidam-based tools. `Madiolahb JSON Schemata`_ is a first stab at documenting this and comments are welcome.

More to do and more to come. (Don't forget to support Bhaloidam over on Kickstarter.)

.. _Madiolahb: http://madiolahb.appspot.com
.. _Madiolahb JSON Schemata: http://madiolahb.appsopt.com/docs/json.html