---
date: 2011-09-15 18:36:44.795384
db_id: 653
db_updated: 2011-09-15 18:36:44.795408
layout: post
tags: games game-design entity
title: A Rant On "Entity Systems"
---
Certain game development blogs that are very likely to be dropped from my RSS feeds in the near future have been talking a lot lately about so-called "Entity Systems". This happens to involve a couple of axes I have to grind. It seems like another good example of how the Games Industry's locked-doors, no-academics, lets-brute-force-this attitudes have put blinders on the industry to decades of software engineering history and learning. "Entity Systems", as for instance described on `the Entity Systems wiki`_, is a poorly renamed description of the prototype-based paradigm. (My Master's Project regarded this paradigm.) In object-oriented programming, prototype-based OO largely predates gaming's dominant class-based OO language (C++) and even the class-based paradigm as a whole...

That's not to say that many programmers understand prototype-oriented programming-- one of the most commonly used languages in the world (JavaScript/EcmaScript) is so often poorly understood and utilized because programmers don't make the attempt to properly understand prototype-oriented programming.

I'd love to see the heads explode should some of these "Entity Systems" programmers sit down with a proper prototype-oriented language/environment that builds on decades of prototype-oriented knowledge. For instance: io_.

(I am thinking about revisiting my Master's Project using the DLR more directly to build a fast prototype-oriented object model in .NET and see if I can rewrite some "Entity Systems" example into a more interesting shape (dot-notation and less "silly-DOM-model" API code smell). I would bet I could get it pretty fast and beautiful. Even if the DLR scares even professional .NET programmers, much less the C/C++ stalwarts.)

.. _the Entity Systems wiki: http://entity-systems.wikidot.com/
.. _io: http://iolanguage.com/