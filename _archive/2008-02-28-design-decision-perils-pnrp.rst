---
date: 2008-02-28 13:56:30.390562
db_id: 449
db_updated: 2008-02-28 13:56:30.390677
layout: post
tags: game-design
title: 'Design Decision: The Perils of PNRP'
---
Most of my biggest design issues on working on my game have come from the *wonderful* world of networking.  It's not that networking is hard, but it's more that there are way too many choices and currently no decent panaceas.

Currently drawing my ire: PNRP_, the Peer Name Resolution Protocol. Ultimately PNRP is a very simple tool: it's a distributed hash table mapping keys to IP addresses.  When it works, it's easy and scalable. Want to connect to a new "room"?  Find some IPs from PNRP and connect to them and you're done.  But it seems to a certain extent that it doesn't really work, at least, not reliably, and when it doesn't work it can be hard to diagnose and harder to fix.  Not to mention the fact that on XP it's not installed by default and the install is irritating and quite prone to failure in my experience.  It's not exactly PNRP's fault, and I still respect it as a technology, but it just seems that it's still too early to rely on PNRP in an actual application that you plan to distribute outside of a tightly controlled network.

I figured I would eventually have to replace PNRP, but was hoping to at least use it as a cost saving device early on during testing...   But all of my difficulties in setting up test environments and working with testers have come from installing Windows Peer-To-Peer and getting PNRP set up and talking to the correct clouds and wondering about why things don't appear to work...  So it looks like I'm going to have to replace it as a dependency sooner rather than later.

On a semi-related note: When can I get access to the Steamworks stuff, Valve?  Please?

.. _PNRP: http://en.wikipedia.org/wiki/Peer_Name_Resolution_Protocol