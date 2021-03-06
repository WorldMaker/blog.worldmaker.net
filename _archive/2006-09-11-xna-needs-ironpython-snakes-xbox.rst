---
date: 2006-09-11 20:31:02.137333
db_id: 260
db_updated: 2008-02-21 15:16:47.309733
layout: post
tags: game-design
title: XNA needs IronPython (Snakes on an Xbox!)
---
I've been thinking since the announcement of XNA that XNA should announce "official" support for at least one more language.  I love C#, but choice would be great, particularly if that other language was something more dynamic and scripty, because a well supported IL-targetted script language would be the perfect peanut butter in XNA's  C# chocolate.  Think about how many games need some sort of quickly updatable scripts to test functionality or to handle functionality that changes with the game/story and how often those scripts are in brittle mini-languages.  If it is IL-targeted you should be able to get the best of both worlds: interpreted within the game engine at run time or compiled as a part of the game engine with the same source for both cases.

Then it hits me just now that all of the recent versions of IronPython are written in C#!  Thus, if all they are going to let compile and copy to the Xbox is C#, then I can throw in IronPython into the middle of my game code (or as my primary game code) and then use python scripts as embedded assets.  I'm thinking that attempting an IronPython build may be the first thing I do when the XNA Xbox support is enabled later in the holiday season.  (Will Snakes on an Xbox be a hit this holiday season?)  

Again, it would be really interesting to see some sort of official support for other languages considering the multi-language aspects of the CLR.  For those not as interested in Python, there are some other interesting languages out there written in C#.  (For instance, Boo and Nemerle off of the top of my head.)