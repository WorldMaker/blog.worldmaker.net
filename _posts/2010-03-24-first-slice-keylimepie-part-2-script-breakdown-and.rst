---
date: 2010-03-24 21:42:33.379399
db_id: 564
db_updated: 2010-03-24 21:46:26.523690
layout: post
tags: games game-design keylimepie
title: 'A First Slice of KeyLimePie Part 2: Script Breakdown and Comparing Alternatives'
---
Recently in `A First Slice of KeyLimePie`__ I introduced a bit of *Mass
Effect* fan fiction as a simple example of a KeyLimePie conversation. In
this post I'm going to breakdown the actual script of the conversation,
and then compare it to largely equivalent scripts in ChoiceScript_ and
`Ren'Py`_, two of KeyLimePie's nearest neighbors.

__ http://blog.worldmaker.net/2010/mar/06/first-slice-keylimepie-shepard-meets-blastos/
.. _ChoiceScript: http://www.choiceofgames.com/blog/choicescript-intro/
.. _Ren'Py: http://renpy.org

There are two key places to start when discussing KeyLimePie
conversations in comparison to the other formats: 

1) Choice lists/menus are constrained to 10 directions: the 8 compass
   directions, a center direction (which I consider the "nevermind"
   button), and the "next" psuedo-direction (roughly equivalent to a
   jump/goto).

2) KeyLimePie's conversations doesn't use a single proscribed scripting
   language, it's a data model. As a data model, it can be (and usefully
   is) expressed in any of a handful of markup languages. Both languages
   in the comparison have different (with a few similarities) procedural
   scripting languages.

Current KeyLimePie formats include JSON and YAML, with YAML the
preferred for writing conversations in (which shares indentation-based
formatting with both ChoiceScript and Ren'Py). By current convention,
there is a tiny bit of embedded Python that KeyLimePie allows, sharing
that with Ren'Py's scripting language, but the Python could be replaced
with any embeddable language. The `Shepard-Blastos YAML script`_ is
actually the first version of the script, but it consequently has some
typos that were corrected in later versions. The next major format
change for the script was the rewrite of it as my testbed for Celtx
import, resulting in the `Celtx-formatted Shepard-Blastos script`_.
(I'll be writing my next few conversations directly in the Celtx
format.)

.. _Shepard-Blastos YAML script: http://if.unlore.com/meffdemo/ShepardBlastos.yaml
.. _Celtx-formatted Shepard-Blastos script: http://if.unlore.com/meffdemo/ShepardBlastos.pdf

Today I wrote an actual exporter from the KeyLimePie data model to
ChoiceScript and Ren'Py, so that I could directly point to a comparison
of the three formats. (I found it more interesting to write a somewhat
generally useful exporter than to manually rewrite, particularly because
I knew it would be a quick "day hack".) I have had to do a tiny bit of
massaging of the exports, of course, but probably 98% or so of the
process is automated. ChoiceScript needs the most massaging, simply
because of the embedded Python, which Ren'Py supports directly.

* `Ren'Py version of Shepard-Blastos <http://if.unlore.com/meffdemo/shepbla.rpy>`_
* ChoiceScript export currently uses a file per named node:
  `opening.txt`_, `blastos.txt`_, `investigate.txt`_, and `join.txt`_.

.. _opening.txt: http://if.unlore.com/meffdemo/opening.txt
.. _blastos.txt: http://if.unlore.com/meffdemo/blastos.txt
.. _investigate.txt: http://if.unlore.com/meffdemo/investigate.txt
.. _join.txt: http://if.unlore.com/meffdemo/join.txt

I could see some future version of the KeyLimePie data model
specification as something of an intermediate format for cooperation
between the engines. Certainly the export tool I built works pretty well
for the current demo. If I ever get around to building the "Visual
KeyLimePie" editor that I proposed in an earlier blog post, I could
imagine that would be potentially quite useful to both
ChoiceScript/Ren'Py.

Some of the noteworthy differences between the formats:

* Neither ChoiceScript nor Ren'Py support KeyLimePie's pie menus, so
  directions are added to choice labels, and are obviously harder to
  play with when the directions are useful/important clues.

* Neither ChoiceScript nor Ren'Py seem to support the concept of
  "unavailable" choice. (In the Silverlight KeyLimePie engine, when
  there is no available node (based on pre-conditions) in a given
  direction the choice will be disabled/grayed out, using the label of
  the first unavailable node in that direction.) In ChoiceScript the
  choice can be removed from the list with a surrounding "if" for the
  precondition. Ren'Py doesn't even support surrounding an "if" statement
  around a choice in a menu.

* Ren'Py has an available "jump stack" (call and return) that allows for
  conversation memory. This is something that is planned for KeyLimePie
  (it's in the "spec in my head"), but not yet implemented in any tool
  or engine, because it's primarily a useful state machine tool for
  interaction between conversations.

* ChoiceScript, for obvious reasons I assume, doesn't have direct
  support for conversation styling.

* "Fall through" works subtly (and potentially dangerously, if one were
  relying solely on automatic exports) different in all three systems.

I'm sure there are other things that I'm forgetting, but all of the more
obvious aesthetic differences should be obvious if you peruse the
documents linked above.

This has been an interesting experiment today. I really liked working
with Ren'Py, which was new to me when I started, and would love to see,
and may eventually build, an extension to support KeyLimePie-style
conversations.

Probably the big lesson at the end of the day is that all three projects
are probably much more similar than different. It was also a further
proof for the flexibility of my "data model" approach.
