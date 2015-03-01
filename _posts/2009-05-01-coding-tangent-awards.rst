---
date: 2009-05-01 01:35:59.166188
db_id: 528
db_updated: 2009-05-01 01:36:44.796465
layout: post
tags: coding xna
title: 'Coding Tangent: Awards!'
---
The PAX 10 application deadline is Saturday the 9th, and Derby (the deadline I've been using for weeks) is this Saturday. I've been working on something of a tangent to the game itself this week, the Awards system. Certainly a bad time to run the gauntlet for a tangential feature that is mere "polish" when there are bugs left on the list. However, the Awards menu items are the only remaining items on the menu that don't do anything. The PAX 10 submission wants a strong Beta, and for recent weeks I've been using the percentage of working menu items as a rough estimate of beta-candidacy. Certainly Awards are "polish", but like Help screens they help all the more with the feeling that what I'm working on is a "real game".

I'm hoping to have a chance to do a deeper write-up, if not a full fledged article on this week's work towards the Awards system, because I would like to contribute deeper to the communal spirit. Particularly because I started with a sample from Ziggyware, expanding it to better fit my needs. But also because this is one of those areas where XNA games have to fight to appear nearly as polished as the 360's in-built Achievements. Better "Awards" or whatever we call them, I think, are needed to gain some sort of legitimacy foothold with "normal 360 players". The sample I expanded upon was started in `this first Awards article`_ by Nick Gravelyn and expanded a bit in `this second Awards article`_ by Daniel Hanson.

.. _this first Awards article: http://www.ziggyware.com/readarticle.php?article_id=217
.. _this second Awards article: http://www.ziggyware.com/readarticle.php?article_id=230

Until I get a chance to write that deeper write-up/article I figured I would release early. Until it finds a more permanent home, here's a simply hosted `AwardsDemo.zip`_.

.. _AwardsDemo.zip: http://if.unlore.com/AwardsDemo.zip

I've included the full change history that I made in a darcs_ repository, if someone is inclined to examine the full changes that I made. The basic thrust of my changes comes from two important design decisions: to use ``PlayerIndex`` rather than ``Gamertag``, and to make the Award displays more attractive and more reusable. 

.. _darcs: http://darcs.net

I think using the ``PlayerIndex`` makes it easier/more obvious to follow some of the ways in which awards are to be used. It also makes it easier to show a player indicator (as the Xbox shows an indicator of which player unlocked an achievement). My own cutely subtle attempt at the player indicator here may be entirely two subtle for games where it will really matter (4-player local play), but I've included my SVGs.

Re-usability and configurability was important to me for the Award display functionality (which I broke out into a class called ``AwardDisplay``), primarily because I knew that I needed a "Trophy Case menu". Particularly because players can't rely on the Guide to display information about a game's Awards I wanted to insure that there would be plenty of menu opportunities to assess that information for the achievement-oriented players. While I was doing that I threw in pretty progress bars. It also made it obvious that the animated notifications were suitable as a simple subclass (suitably named ``AwardNotification``). One gain here is that there is clean seperation between the animation code and the drawing code. (Hurray for Object-Oriented design!) I also managed to throw in a big animation nicety from the Gears of War 2 playbook. Daniel Hanson added code to do incremental nofications (so that you see nice round 15/20 pop-ups), but Gears of War 2, the inspiration here to both of us, does one better and a few milliseconds after popping up with the nice round increment, Gears of War 2 animates a catch-up of the progress report to the most current values. This is perhaps easiest to watch with the Seriously 2.0 achievement notifications: after that initial delay, you can watch as each new kill finds its way into the count until the notification disappears.

Anyway, I hope this is useful to others and I'll be looking to write a deeper article on the topic in a couple of weeks.