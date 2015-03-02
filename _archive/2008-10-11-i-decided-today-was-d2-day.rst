---
date: 2008-10-11 00:03:40.936348
db_id: 500
db_updated: 2008-10-11 00:03:40.936395
layout: post
tags: ''
title: I decided that today was D2-Day
---
Today I updated all of the repositories publicly accessible at repos.worldmaker.net to Darcs-2 format and I've decided to switch code licenses while I was updating everything.  This means some changes if you are using my code (and I don't know of many that are), but I thought it warranted a quick post, particularly to talk a little bit about my thoughts on things.

Why Darcs-2 format?
---------------------------------------------------------------
Darcs is, IMNSHO, the most humane and powerful source control system in existence.  The new Darcs-2 format of repository fixes some small annoyances with darcs-1 format and brings several years of new smarts to the way conflicts are handled.  Switching to darcs-2 format now is a pre-emptive strike.  It requires anyone seeking a copy of my repositories to upgrade to a version of darcs greater than 2, but with the recent release of darcs 2.1, I figure that that isn't too big of a requirement.

Why the license swap?
---------------------------------------------------------------
I've read recently of several people switching to more restrictive licenses and thought it time to buck the trend and switch to a less restrictive license.  For all of my projects that I've licensed under the 2.0 GPL I'm switching them to the Microsoft Reciprocal License (Ms-RL).

I've waffled over the GPL for years.  I've never been quite happy with the FSF interpretation of the GPL and I've had to use the Creative Commons deed to better explain some of my own differences in interpretation.  Worse, the GPL 3.0 contains clauses that just seem wrong to me, with some weird extra baggage.  I could talk for a while about my concerns with the AGPL or Affero GPL.  Basically, I think that in the name of copyleft the GPL, and moreso the AGPL, break the intent of copyright law in a way that I find difficult to accept.  Under the FSF the licenses have equated usage and reference with derivation and that ends up damaging Fair Use rights, if nothing else.

So I've been evaluating licenses that are less restrictive, easier to read, and easier to interpret than the GPL for some time now.  I wanted something copyleft and the only copyleft license that I've seen that is less restrictive, easier to read, and OSI-approved at this point is the new-ish Microsoft Reciprocal License (Ms-RL).  I really do think that the Ms-RL is better and less restrictive than the GPL.

The FSF does not see the GPL as being compatible to the Ms-RL, but I don't see any problem with using the code that I have licensed under the Ms-RL in a GPL project, as long as you follow the "attribution clause" of the Ms-RL I think that the less restrictive terms of the Ms-RL are met when placed in a GPL project.  I am not a lawyer, of course, but I promise not to sue any GPL projects using my code.  The only problems that I can see are in using GPL code within an Ms-RL project (due to some of the same problems that I've historically had with the GPL), so I'll have to do my best to watch what code I borrow.  I don't think there should be any problems in my current repositories...