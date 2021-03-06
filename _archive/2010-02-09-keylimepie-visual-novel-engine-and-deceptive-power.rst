---
date: 2010-02-09 01:02:51.761823
db_id: 560
db_updated: 2010-02-09 01:02:51.761851
layout: post
tags: games game-design keylimepie
title: KeyLimePie Visual Novel Engine and the Deceptive Power of Simplicity
---
I've mentioned briefly on twitter my attempt to write a game or two in
the "Visual Novel" format [1]_. It's an easier to write genre than IF,
as much as I love IF, and a more interesting genre than just a CYOA. The
art requirements are generally a bit kinder if I try to explain them to
any interested artists than the traditional adventure game (fewer
animations, no walk cycles, ...).

I've smashed this in with my desire to play with writing *Mass
Effect*-like 2D conversations. I realized that a single 2D "compass"
menu makes a lot of sense as the driving focus for a Visual Novel game.
In particular, it gives more of an IF-like "map directions" relationship
to locations, albeit with an even more visual Pie menu chooser.

I think its safe to announce the engine I've been writing, the *Keystone
Literary Menu Pie* (abbrev. *KeyLimePie*), named of course for the Pie
Menu that is the keystone in the engine. If anyone is actually
interested, I am planning to release it as Open Source as it comes
closer to completion (which should be soon, I expect). I'm focussing on
cross-platform, browser-based Silverlight (with IronPython magic!) for
the main player engine, which means I will be testing it in Moonlight as
well (but I don't expect any difficulties; Moonlight rocks). I've also
been building some editing/development tools against normal CPython.
(It will be easy to port the engine to non-Silverlight platforms, which
are in my mind primarily iPhone and Android. I could see writing a
pygame engine as an excuse to better learn pygame, and because that
would also be really easy.)

(I guess I should note that I'm not actually announcing any games that
I'll be writing for it. I haven't decided on a "real" game to write yet,
and the test game I've been writing is possibly controversial and I've
not quite figured out if it is that "good kind of controversial" yet.)

All of which is but one preface to my present topic, but let me first
make a quick tangent into a second preface. Forgive me if it comes off
as a bit of a rant. As a result of my job search I've been presented
with a small handful of programming "tests". I would argue that
programming is something that is hard to test at a distance, but more
critically that a good majority of these tests that I've seen (and
definitely the majority of ones I feel like I've "failed") tend to often
favor the programmer with Asperger's and a compulsion to brute force the
80% answer as quickly as possible.

It's very obvious, to me, that I can't compete with that, and that it is
fairly clear to me that these tests are almost intentionally designed as
something of an affront to programmers like me. The general pattern is
that the test gives a time limit and a problem with a couple of example
test cases. The assumed response is that you write enough code to
"solve" the given test cases (and not much more), and as far as I can
tell that is the only way to get anything finished in the given time
limits.

The graduate student that I am takes a look at the problem definition,
says "Oh, that problem is NP-Complete, but there are known algorithmic
solutions that get reasonable performance," and then goes off to
research those until the time expires, with not much in the way of
finished code to show off, but a better understanding of the original
problem statement than perhaps the test writer ever had...

Software Engineering as a whole, across the board, is rife with just a
common failure to research. There are unspoken, sometimes unnoticed,
tendencies to build "quick and easy" 80% solutions that brute force a
given problem set, without examining if there is a well known generic
solution or even bothering to think through the remain 20% of edge
cases. Coupled with NIH syndrome ("Not Invented Here", where teams seem
to only trust code they themselves have written) and an odd confusion
between complexity and "power" or "ability", and sometimes it is a
wonder that good software ever gets written.

Sometimes it is easy, or so it seems, to forget to **work smarter, not
harder**.

So, back to the topic at hand, for *KeyLimePie* I wanted it to be easy
to create conversation scripts. That's what it is all about, sure. I
looked at ChoiceScript_ for a nearby example, although it certainly
doesn't have the sorts of tools that I was looking for it was nice to
see someone else's approach.

Now, both approaches will have their admirers, but I ended up going in a
different direction for several reasons. One thing that was important to
me was to reuse existing parsers. Now, I like writing parsers, and I
certainly have the chops to build powerful parsers, but I try to find
the right tool for the job. In the *KeyLimePie* conversations I wanted
to focus first on the declarative nature of the conversation flow, which
meant a markup language of one sort or another, and less on the
scripting of it. In this case I decided upon YAML_ as the framing
system, which I think looks like a reasonable approximation of a
conversation script (as in a play script).

There's another benefit to using a declarative markup language as the
framing document, which is rich editing tools. In fact, I researched
diagram tools for that purpose. However, I didn't find any I
particularly liked for the purpose of *KeyLimePie*. I did find a few
programmable components that would have worked, but all had triple-digit
single-developer license fees. That'll be something to consider for the
budget if someone wants to help pay me for a "Visual KeyLimePie"
designer or if I go to Kickstarter or somewhere to fund an actual game
with an intent to publish it. On the other hand, I do know Graphviz_
fairly well by now and so I do already have an after-its-written
visualization tool for the conversation scripts. (I'll probably attach
visualizations to future posts, if I continue to write blog posts about
*KeyLimePie*.)

One thing I was having an imaginary debate with myself about was flow
control. Something I think a lot of people don't learn from the
abstractions presented in an *Automata* theory course (and don't get me
started on the programmers that never take one) is how simple a
scripting language can be, and yet still provide very complex
possibilities. For example, its very easy to take any of those useless
"calculator" exercises that every textbook and professor uses to teach a
Grammars/Compilers course, and add simple lambda expressions to the
grammar and interpreter. Given the lambda support you have instant
"full" scripting language for real computation [2]_.

The scripting in *KeyLimePie*, thus far, is limited to the descriptive
flow of your basic Finite State Machine diagram [3]_. There's
descriptive arrows from one conversation node to another (admittedly a
fine line distinction from an imperative goto, but for obvious reasons
of abstraction level), and there are optional pre-conditions that can be
added to those arrows, via the ``cond`` field (a lispish abbreviation
for a lispish data structure, I'll admit [4]_). Nodes can have optional
post-effects, which can affect which pre-conditions apply, but that's
about it. [5]_

The sequence of pre-conditions creates an implied if/else structure (or
switch/case if you prefer, but whatever) and so my imaginary debate
wondered if I should provide more "programming language forms" for it.
So far I've decided for the simplicity of the current declarative model
and against more imperative-like flow control.

All of this will probably make more sense in context of some examples,
which I'll save for another post, and the script format documentation
itself.

.. _ChoiceScript: http://www.choiceofgames.com/blog/choicescript-intro/
.. _YAML: http://yaml.org
.. _Graphviz: http://graphviz.org

----

.. [1] Visual Novels are primarily a Japanese adventure game cousin that
   are often not much more than heavily illustrated
   Choose-Your-Own-Adventure (CYOA) books as videogame. They generally
   use reusable backdrops and simple character sprites, with a focus on
   one-on-one interactions between characters and a simple menu-based
   inferface. The easiest examples that can be found in North America is
   the fun *Ace Attorney* series (aka the *Pheonix Wright* series).
   There's also the *Harvey Birdman: Attorney At Law* videogame, for the
   more (im)mature audience.

.. [2] Admittedly the performance may not be the greatest. Certainly it
   a lot tougher to implement the tail recursion you might need to get
   great performance for real applications. The point stands, though,
   that the distance between "toy calculator" and "real programming
   language" is smaller than most people realize.

.. [3] I'm not in the mood to explain that. It's something that a good
   *Automata* course should have drilled into one's head. The full math
   description for the autistic at Wikipedia may suffice as a refresher,
   but there are easier ways to teach it.
 
.. [4] Not to belabor the point that I'm extremely underemployed or
   anything, but I spent a whole semester of school writing primarily
   Common Lisp, and sometimes I do realize that it was a very good
   exercise to have done that.

.. [5] Incidentally, just as I decided on YAML to avoid creating my own
   formatting/special language, both cond and effect are themselves
   embedded Python, right now, because I didn't want to invent a magic
   mini-language, and because I can easily embed Python expressions and
   statements in both Silverlight and CPython. You could use "real
   Python" to do some crazy stuff, probably, between the two fields, if
   you absolutely miss your imperative coding paradigms, but I don't
   expect most people to use it for anything more than basic variable
   manipulation.

.. vim: ai spell tw=72