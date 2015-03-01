---
date: 2010-08-09 18:08:07.069867
db_id: 573
db_updated: 2010-08-09 18:08:07.069893
layout: post
tags: games game-design keylimepie lua ransom
title: !!python/str "I L\xF6ve KeyLimePie"
---
=================
I Löve KeyLimePie
=================

I just recently got a working client on the fifth platform [1]_ for
KeyLimePie, which is written in Lua_ for `Löve 2D`_. Löve 2D feels like
something in between what I've done with pygame and XNA. I wanted to
prove that I grok Lua and Löve 2D was a good way to do that. The Löve 2D
client is the richest offline client for KeyLimePie thus far. (The
Silverlight client is still my preferred online client.)

I think the simplicity of KeyLimePie's base model once again shines in
the Lua client. The Lua code is certainly smaller than I expected,
including the fact that the code does all of its own update/draw logic.

The Lua client also happens to be the first implementation of a couple
of features I've been meaning to implement in other clients, but the Lua
client benefits from the project that explicitly is targeting it, my
"cover letter project" [2]_.

.. _Lua: http://www.lua.org
.. _Löve 2D: http://www.love2d.org

Source Code for Ransom
======================

I've built most of the KeyLimePie clients and tools with Open
Sourcing them in mind. However, I'm not sure if there is any actual
interest in this toolkit of mine, so I'm going to hold it for ransom:

.. raw:: html

   <object width="250" height="250"><param name="movie" value="http://widget.chipin.com/widget/id/04a1b41bf9f3bc3d"></param><param name="allowScriptAccess" value="always"></param><param name="wmode" value="transparent"></param><param name="color_scheme" value="red"></param><embed src="http://widget.chipin.com/widget/id/04a1b41bf9f3bc3d" flashVars="color_scheme=red" type="application/x-shockwave-flash" allowScriptAccess="always" wmode="transparent" width="250" height="250"></embed></object>

I'll use contributions to gauge how much documentation I should write,
and how many of the tools, clients, and servers I initially release to
the web as Open Source. I think the ransom amount is a good start (and a
great deal on the work done to date! [3]_), but some things, like a lot of
the work I've put more specifically into *A Robot Fugue* may require
contributions to exceed the ransom amount before I consider open
sourcing them. (For instance, I do have a number in mind to CC license
the entirety of the *A Robot Fugue* script to date, plus wherever it
goes from here, for instance.)

I think it is a pleasure to write scripts for KeyLimePie, and I'd love
to know if there is any outside interest in trying it. Feel free to post
questions or comments in the boxes below or `email me@worldmaker.net
<me@worldmaker.net>`_.

----

.. [1] For those keeping score at home, the following
   languages/platforms have seen the ability to play KeyLimePie scripts:
   Python (CLI), ChoiceScript, Ren'Py, C# (Silverlight), and now Lua
   (Löve 2D).

.. [2] A project attempting to tightrope walk between silly and boring.
   It has been an interesting creative exercise, but possibly a doomed
   one. The basic concept is that I'm being interviewed by space aliens
   for a space reality show that is controlled by audience
   participation. It's basically an interactive resume that I'm
   attempting to make much more interesting than just an interactive
   resume. It has provided an excuse to fill it with my really bad
   character art and not feel too self-conscious about that. (They're
   just ugly space aliens.)

.. [3] Basic COCOMO analysis with David A. Wheeler's ``sloccount`` tool
   reveals an estimate of around $33,000 of software estimate on just
   the Python tools and Silverlight client alone. $300 is a discount of
   nearly 99%! As bonus, I've already released the related musdex_ tool
   to Open Source, prior to the ransom: a nearly $10,000 value! [4]_

.. _musdex: http://musdex.code.worldmaker.net

.. [4] Yes, I realize that COCOMO analysis is skewed, but its one of the
   best estimates I have right now of the value of my time, given some
   better economy where I might have been employed and salaried to
   produce tools like these.

.. vim: ai spell tw=72
