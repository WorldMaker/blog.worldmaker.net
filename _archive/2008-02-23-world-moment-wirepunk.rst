---
date: 2008-02-23 22:24:55.841339
db_id: 446
db_updated: 2008-02-23 22:24:55.841391
layout: post
tags: games world-design wirepunk
title: 'World of the Moment: Wirepunk'
---
I made the decision a while back to explore more of my world design imaginings here on my blog, particularly because it is preferable to losing them, and maybe I'll generate some support for them.

My latest world design came when my brother prodded me that a wireframe MMO might be a reasonably "cheap" thing to produce.  Theoretically, after all, it might be considerably cheaper to find decent wireframe artists than good artists of any other sort.  This was prompted partly from several hours of playing *Rez HD*.

.. contents::

Background
==========

I'm still something of a fan of the goofy 80s films *WarGames* and *Tron*.  The other day in a debate on the sci-fi worthiness of *Tron* I gave the opinion that I felt that part of my enjoyment of *Tron* was from the fact that I considered more historical fiction than sci-fi.

I started to posit a world in which the events of *WarGames* and *Tron* had actually taken place...  and started to come up with probably one of my more compelling world designs in a while for a "wirepunk" epic that really could **only** be told in MMO form.  I don't have a very good name for it, so right now I'm just going to call it *Cloud*.  (The only name coming out of a very short brainstorm session was the amusingly alliterative but overlong *SpiderWire*, which might be a good project code name.)

The Basic Premise
=================

The basic premise is pretty simple, but lovingly possible: In the 80s the US government put considerable work into a user-friendly protocol for the then-nascent ARPAnet/Internet, entirely classified and created mainly with DoD projects in mind.  In the early 90s with the rise and ascent of the *CERN*-based World Wide Web and due to some other reasons the project was unceremoniously dumped and forgotten.  A decade later references to the project were dug up in FoIA requests (Freedom of Information Act).  A dedicated group of reverse engineers gained interest in the project and coordinating through a Wiki the team made a concerted effort to gain as much information about the project as they could gleam from further FoIA requests.  The key milestone occurred when a request turned back a server and port number that still responded to the unique protocol...  Several years later much of the protocol was reverse engineered and the first client in over a decade was ready for public launch...

I'll get into a few details fairly quickly but there are a couple of big implications that I draw from this simple premise: this would be a very "webby" game and this could be quite Uru-like.  Using the internet as the backdrop to the story opens up a lot of story-related reasons to work on interacting with things like web pages and more.  The game wouldn't necessarily become *Metaplace*, but there certainly would be a lot of places where user content might be pulled into the game from "ordinary" web pages.  I think the defining meta-struggle for the game's story will be the fight between openness and webness, between walled garden and open playground.  The game would start very much as a walled garden resembling most contemporary MMOs and I could see it moving toward more of a medium existence ala *Second Life*.  I like making that struggle and those discussions a public part of the story, and thus where I see this as being my most Uru-like design.  Uru gained a lot of its story from the ur-discussions of meta issues like funding and approach.  When I mentioned my interest in Uru demographics `in a recent post`__, part of my thinking was this Wirepunk design of *Cloud*.  If I could tell an exciting enough set of stories with a glob of decent puzzles I'm curious if I could pull much of the Uru-demographic, even across the potential divide of using a somewhat wild wireframe aesthetic.

__ http://blog.worldmaker.net/2008/feb/16/gametap-shuttering-uru/

Important story question: *Who controls the Cloud?*

The Game Play
=============

*Uplink* has done the hacking thing as realistic as possible.  It would not be my intention to duplicate that effort.  My preference would be to focus more on socialization and puzzles, using the geek world for in-jokes and flavor but striving for as much of a mainstream appeal as possible.  I think it would be much more exciting to have hacking attempts be similar to Myst puzzles than to "actual hacking".  "AIs" figure prominently in my design (more later) and I think there are good opportunities for social-NPC puzzles of the sort that were sometimes prominent in the MU* era and text adventures.  I think there are plenty of sources of good meta-puzzles, as well:

One early prominent focus would be the "Reverse Engineering Wiki".  I think the big story for the Wiki is that just prior to the public release the Wiki will have been "sabotaged" and the Engineers will have done there best to convert what was archived of the contents to a more modern Wiki engine, but most of the history and many of the actual pages would have been lost.  This presents an excellent starting place for ARG-style web puzzles, piecing together pages on the Wiki, rediscovering what was "lost" and even piecing together the story of why the Wiki was sabotaged in the first place...

One thing that I think necessary to "lose" early on is the description of what I'm currently calling "ChurchScript", after the American mathematician Alonso Church.  This would be the "Linden script" of the game, and I think the discovery and deciphering of this script language could be a very interest set of challenges early in the game history.  The idea would be that ChurchScript would be a terse syntax akin to Haskell_ meets INTERCAL_, by way of Ada_, and hopefully not as bad as Unlambda_ because it should be eventually decipherable.  There would probably be an interesting amount of LOGO in there for some wireframe stunts. [1]_  The idea is that this would have been some sort of committee-design affair for UI customization meant to contrast with the web's HTML.  I like the idea of players stumbling upon magic incantations of this script and using them to interesting effect and then attempting to play with them and/or decipher them.  Down the line as players start to get more familiar with the script and it becomes more of an unfair advantage to those that can grok it you can have the meta-story debate of enabling other, more familiar, easier languages into the client.  (Again the meta-struggle of webby and open versus closed and controlled.)

.. _Haskell: http://haskell.org/
.. _INTERCAL: http://catb.org/~esr/intercal/
.. _Ada: http://en.wikipedia.org/wiki/Ada_(programming_language)
.. _Unlambda: http://www.madore.org/~david/programs/unlambda/

.. [1] Is it a shock that I know way too much about rare and obfuscated programming languages?  Or that I see deciphering one as an interesting meta-puzzle?

Introduction: ``::1`` is the loneliest number...
================================================

The introduction is the only real "story chapter" that I've put much thought into, but its a good place to start and I think helps provide some impetus for interesting stories to follow.

The idea is that client will start connected to a boringly simple localhost space.  "Home sweet home" being, at first, something starkly simple like a single cube wireframe that maybe you can spin around aimlessly with the controls, but not much else seems to do anything...  The big question hanging in the air "what now?".  The Wiki page for the "welcome tutorial" obviously lost to the bit bucket.  Your friends tell you things are mostly self explanatory, but why can't you do anything?

``INCOMING CONNECTION FROM AI-FAMILIARIS``
------------------------------------------

An NPC named ``AI-Familiaris`` sends an avatar briefly to your localhost space, waves a simple greeting, and drops off a "small" bit of code represented by a simple avatar (a small polygon or sphere similar to bit/byte from *Tron*) and a boring hexadecimal "name" like ``F-09a98cf``.  This new entity introduces itself as a "familiar" and offers its assistance and service.  The familiar would lead a new player through establishing their first avatar and customizing the familiar itself by giving it a more personal name and changing some of its look.  It would then offer to help the player find some interesting places to explore.

User Content
============

Early places to customize are the obvious: localhost spaces, avatars, familiars' avatars.  Over the course of the battles between open and closed I can see there opening up more and more places and things to customize and more ways to do said customization.  More customization incantations might be found.  Again, I see the game walking the border lands between entirely self-contained "walled garden" story world and user-managed realms like *Second Life*.  I can see user content as ultimately being quite critical to the world, but I like the idea of founding that on a good backstory and letting the user content generation be part of the puzzles and exploration.

AIs and the battle for electronic domination
============================================

The NPCs get split into a couple types of AIs.  The most prevalent and interesting of these being the "law-abiding citizens" that sport mandated tags: the older ``AI-`` and the newer ``F-``.  I think it is important to preface that the goal would be to focus on *Tron*-style post-*WarGames* AIs rather than "*Terminator* AIs".  I've always hated the idea of machines seeking to destroy all of mankind "just because", and I definitely don't see any place for that in this game.  The idea is that *Cloud* AIs have all learned the "Tic-Tac-Toe" lesson that "the only way to win is not to play".  The AIs realize that they are fairly dependent on Humanity for their computing resources and have no need to compete with them.  If anything they are more in awe of Humanity: it's been over a decade since the last humans bothered logging in with a *Cloud* client and I can see a good amount of the almost-religious view of humanity that you see in *Tron*.

That said, there certainly is a lot of room for battles between the various AIs over things that are tangible to them: computer resources. Plus, as I mentioned: *Who controls the cloud?*  As a "government-built" protocol I certainly think there would be some definite "command and control" structures in this *Cloud* that AIs might wish control of.

In terms of the inner story I see the battle between AIs as a central fixture.  Should Humanity take a side in this decade-long war?  Considering that the Reverse Engineers must have learnt much of what they know from the AIs encountered it's easy to believe that they picked a side.  Even more important it's obvious that even those that don't choose a side have an impact on the war.  For many years the war would have grown stale with very few additional computing resources available through the *Cloud* protocols.  Just imagine how much things are changed by an influx of visitors using machines with computing resources that in some cases dwarf the "80s supercomputers" that the AIs have long called home.

So far I've only named two potential AI characters.  One is ``AI-Familiaris`` [2]_ and it is what I think is a notable evolution in the *Cloud* for story purposes.  What is the AI's goal in befriending newcomers?  Why does it gift newcomers with a familiar?  Is it really "man's best friend" in the *Cloud*?

The idea of the familiar is to early on provide a combination pet/servant.  There are many interesting stories to be told with familiars.  The invention is obviously new to the *Cloud*, in response to the first Reverse Engineers to connect on the new client.  It seems apparent that the Reverse Engineers hard coded an early signal to ``AI-Familiaris`` upon the initialization of a new client.  Why?

The familiar itself is a unique piece of the fiction.  To a person the familiar serves the role of pet/servant, but the familiar has a more symbiotic relationship in the fiction than that: the familiar leeches a person's computing resources, to some benefit in the AI conflicts, and in return provides companionship and security...

I want people to become attached to their familiars.  Thus I see a major chapter in the fiction becoming a point where a familiar can go rogue and the player is given the opportunity to save that familiar or destroy it.  I think that could be an interesting emotionally personal story to tell, and I see that to be an important part of the decision process to deciding a personal side in the war between AIs.

The only other AI that I've named is that I think a primary, if not the primary, AI antagonist should be named ``Loki``...

.. [2] Should be an obvious reference: the Latin species name for "dog" is *Canis lupus familiaris*.

*End of Line*
=============

So there you have a primer to the world I've been building in my head in the hour or so everyday that I've spent commuting between home and school.  It's possibly one of the most complete, most effective designs I've worked on for a while.  I think it's rife with possibility and once again find myself wondering where I might find the resources to build such a thing...

I'd love comments, suggestions, or other thoughts on this.
