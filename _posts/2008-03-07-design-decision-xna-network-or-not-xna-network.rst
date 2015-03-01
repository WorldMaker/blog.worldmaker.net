---
date: 2008-03-07 01:39:43.023537
db_id: 452
db_updated: 2008-03-07 01:48:02.059706
layout: post
tags: game-design
title: 'Design Decision: To XNA Network or Not To XNA Network...'
---
I was really excited to learn that XNA 2.0 was going to include networking support.  I was looking forward to use something more powerful than my techniques at the time, particularly if it it were to be a nearly drop-in replacement for existing network code.  Then I learned the potential publishing penance that must be paid and pouted for perhaps better possibilities.  The `LIVE Requirements`_ for XNA Networking are somewhat demanding: for online multiplayer on either platform you need LIVE Gold, at least $50 per annum, and Creator's Club Membership, $100 per annum.  It's particularly worrisome from a testing/debugging side: how do I get testers involved without forcing them to buy a CC membership?  It's not like my company has the money to reimburse people.

.. _LIVE Requirements: http://blogs.msdn.com/xna/archive/2007/11/16/xna-framework-networking-and-live-requirements.aspx

A few months ago that was a pretty big dealbreaker, or at least I thought so.  I pretty much gave up the idea, but some comments today started me re-evaluating things.  I'm still re-evaluating (over and over), but things are starting to look a bit different.  First there is better light in the tunnel for "the end game": the peer review process has been beta-tested and affirmed for a "Holiday release", and the games that already have XBLA contracts appear to be nearing the finish gate, eventually to be released it seems.

Second, I'm debating the importance of "System Link" (aka LAN) testing.  With XNA 2.0 Networking I can at least make use of "free" system link testing, but it does restrict what and how I can test.  For instance, it makes it tougher for my friends in Seattle to play directly with me to show that everything is working and to "face-to-face" point out bugs.  On the other hand, I'm curious if I can use VPNs or similar techniques to good effect for testing purposes.  For more exhaustive testing I just might have to get creative with local LAN events, and maybe in treating it as something of an old school LAN event get some interest and enthusiasm...  The cost of a couple of pizzas could be much more effective than the cost of a couple of CC memberships.  It might not be great testing or anywhere near as exhaustive as true "all hours internet play", but I could see it as being an interesting way to go about business.

All in all, I'm currently torn.  Does it make sense to use the resources I have to invest in XNA Networking?  Here's my attempt at a summary chart:

+-----------------------------------+-----------------------------------------+
| Pros                              | Cons                                    |
+===================================+=========================================+
|* Remove 2 (!) current             |* No true self-publishing (!!!); must use|
|  dependencies                     |  contract with MSFT or eventual "peer"  |
|* Simplify some network code       |  system                                 |
|* "Drop-In"                        |* Peer-review system not available until |
|* LIVE Integration; voice chat,    |  "Holidays"                             |
|  basic profile integration        |* No free internet ride                  |
|  (gamerpic, no acheivements)      |* Loss of control                        |
|* Xbox Testing (for me, CC         |* Code may not be that re-useful should  |
|  testers)                         |  another option present itself          |
|* Loss of some responsibilities    |                                         |
|  (managed security concerns,      |                                         |
|  etc..)                           |                                         |
|* Encouraged by MSFT               |                                         |
+-----------------------------------+-----------------------------------------+