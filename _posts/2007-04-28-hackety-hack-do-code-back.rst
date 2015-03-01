---
date: 2007-04-28 11:14:38.906110
db_id: 325
db_updated: 2008-02-21 15:16:45.790187
layout: post
tags: game-design games programming
title: 'Hackety Hack: Do Code Back'
---
Someone pointed me to my old acquaintance whytheluckystiff_'s `Hackety Hack`_ project.  It's a colorful world of cute cartoon characters attempting to teach programming languages (Ruby in particular) to young-ish kids, aka absolutely total n00bs.  In a way it's `Why's (Poignant) Guide to Ruby`_: For Kids! The FREE As In Speech Interactive Edition, and it's built as an easy learning sandbox to help fight back against the issues brought up by (among others) `David Brin`_ in `Why Johnny Can't Code`_.  It provides fun tutorials wrapped around Ruby interactive sessions in an easy-to-download bundle that comes with some handy convenience libraries for doing "easy things easily" [#]_ such as very simple websites or playing MP3s or downloading random things from any of the many internets.

Ever since `Why Johnny Can't Code`_ I've felt like doing something like this for Python.  whytheluckystiff_ is using Ruby here, because it is what he knows best right now, but has offered to help distribute bundles for other languages.  I'm extremely tempted to help out with a Python bundle of `Hackety Hack`_...

The `Hackety Hack Manifesto`_ brings me back to a few things I've been thinking about.  XNA_ is a great step in the direction of making Xbox coding much more accessible to everyone.  It doesn't work as great for playing around/fudging with things.  An Xbox-version of `Hackety Hack`_ is just about possible with XNA with just a few pieces in place...  The ugly one is that there is no HTML renderer yet available on the Xbox.  Even if there was one, there might not be XNA-connected hooks into it.  On the other hand, depending on how you want to do things, you could simplify the HTML to some further bare-bones XML description and build your own mini-renderer for that.

The more important one is that once again, I really think that either the Xbox 360 Compact Framework needs to grow a few more non-Compact Framework tricks (notably Reflection.Emit()) so that IronPython_ can be brought to the Xbox or IronPython_ needs a useful Compact Framework build.  Either one will suffice.  With a few kind Pythonic libraries as wrappers around XNA_ (to make the easy things easier, and maybe the hard things a bit tougher) you could easily have a great place to do some interactive programming sessions on the Xbox.  The Xbox already accepts USB keyboards and a handheld controller-connected keyboard is on its way.  Throw in IM-integration and you would have the killer platform for introducing kids to programming...  

Just imagine if "Johnny" could play around with an interactive Python shell to script his neato Pac-Man clone on his Xbox, and being proud of his accomplishment he could very quickly IM that game to his buddy who could then "press play" and see Johnny's game in action (not to mention hack in his own feature to the game and IM that back to Johnny).  Since XNA_ is cross-platform and Microsoft is really pushing the whole Live Anywhere concept, imagine adding this same XNA_ IronPython_ scripts in an IM window to Windows Messenger and making quick and dirty game scripts perhaps as ubiquitous among crazy teens as emoticons. ;-) XNA and IronPython are both easily and effectively sandboxed and so there aren't any IM virus issues to worry about, unless you count viral memes in which case IM is full of those anyway.

It's a funny little dream, and at times I think the XNA_ team wishes to promise something like it...  but I don't know what it would take to make it happen.

.. _whytheluckystiff: http://whytheluckystiff.net/
.. _Hackety Hack: http://hacketyhack.net/
.. _Hackety Hack Manifesto: http://hacketyhack.net/manifesto/
.. _Why's (Poignant) Guide to Ruby: http://poignantguide.net/ruby/
.. _David Brin: http://www.davidbrin.com/
.. _Why Johnny Can't Code: http://www.salon.com/tech/feature/2006/09/14/basic/
.. _XNA: http://www.xna.com/
.. _IronPython: http://www.codeplex.com/Wiki/View.aspx?ProjectName=IronPython
.. [#] This is one of the Python/Django mantras you see a lot: Easy things should be easy; hard things should be doable, but possibly hard.