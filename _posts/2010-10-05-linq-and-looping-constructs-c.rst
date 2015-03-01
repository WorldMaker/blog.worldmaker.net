---
date: 2010-10-05 21:06:14.227802
db_id: 576
db_updated: 2010-10-05 21:06:14.227831
layout: post
tags: coding c# linq
title: On LINQ and the Looping Constructs of C#
---

========================================
On LINQ and the Looping Constructs of C#
========================================

The obvious preface is that I love LINQ, and I love seeing it in action,
and I mostly enjoy using it. It is fascinating to see a slow creeping of
functional constructs into C#, a "respectable" mainstream language. It
is fascinating to see a semi-powerful DSL take something of a center
stage in a modern ALGOL descendant, as a subtle and slow unshackling of
overly ubiquitous required brackets and parentheses.

That said, as a sometimes student and observer of languages and language
design, I think it is fair to say that my largest criticism of LINQ is
in fact that I feel that it doesn't quite go far enough. It is still far
too conservative a design, and not quite comprehensive enough. I realize
that this is, of course, the *design goals*, but I wouldn't have a blog
post to write here if I were entirely satisfied by the status quo.

Anyway, what follows is just a simple comparison and contrasting of some
similar lingual constructs in C#, Python, and Common Lisp, and some
noodling of my own on the subject.

A Brief Review of Looping in C#
===============================

With LINQ around in C#, there are now almost too many disparate means of
doing traditional loop iteration over a data structure, all with subtle
differences. The differences can make it tough to write pithy one liners
where pithy one *should* suffice. There's also a certain amount of
boiler-plate needed to convert from one sort to the other, and there are
too many "decision points" on the looping construct choice flow chart:
Am I working with a range of numbers, an array, an ``IEnumerable<T>``,
or an ``IList<T>``?  Is the current index (or count) important to my
iteration?

The Traditional ``for`` Loop
----------------------------

.. sourcecode:: c#

   for (int i=0; i < items.Count; i++)
   {
       if (i % 2 == 0 && item[i].IsAwesome)
       {
           items[i].DoThatThing();
       }
   }

C# inherits ``for`` from its predecessors, and to be honest it feels
vestigial at best (and otherwise obnoxious). Keep in mind that ``for``
has always been a weird-looking, but usefully pithy, shortcut for a
``while`` loop, such as:

.. sourcecode:: c#

   int i=0;
   while (i < items.Count)
   {
       if (i % 2 == 0 && item.IsAwesome)
       {
           items[i].DoThatThing();
       }

       i++;
   }

I think that more of the usecases of ``for`` should be available in the
other looping constructs, but more on that in a bit when I talk about
Python.

Note the additional complications that you are doing your own bounds
checking here, and that even that varies from type to type. For
instance: ``IList<T>`` uses the ``Count`` property, arrays use
``Length``, and gets more complicated in additional dimensions.

The More Moderne ``foreach``
----------------------------

.. sourcecode:: c#

   foreach (Item item in items)
   {
       if (item.IsAwesome)
       {
           item.DoThatThing();
       }
   }

This is the C# workhorse for use with anything that supports
``IEnumerable`` and/or ``IEnumerable<T>``. Note that there is no strong,
pithy way to get the current index/count during iteration other than:

.. sourcecode:: c#

   int i = 0;
   foreach (Item item in items)
   {
       if (i % 2 == 0 && item.IsAwesome)
       {
           item.DoThatThing();
       }

       i++;
   }

More often than not, using the equivalent ``for`` loop is pithier, and
often preferred stylistically, if for no other reason.

The Lonely ``List<T>.ForEach``
------------------------------

.. sourcecode:: c#

   items.ForEach(item => if (item.IsAwesome) item.DoThatThing());

Very useful for short, pithy one-liners when using the most recent
anonymous functions syntax, but only available in specific situations
(``List<T>`` as the big example). It predates LINQ, and is definitely
oddly vestigial, or at least under-exploited.

I am curious why LINQ didn't bother adding a more general version as an
``IEnumerable<T>`` extension method. I'm also curious why ``ForEach``
doesn't have an overload that also provides the integer list position as
well as the item...

LINQ "Fluent" Syntax
--------------------

.. sourcecode:: c#

   var query = items.Where(item => item.IsAwesome);

   foreach (var item in query)
   {
       item.DoThatThing();
   }

LINQ queries are lazy, which is great, but they rely on the existing
``foreach``, or a conversion extension method like ``.ToList<T>()`` and
``.ToArray<T>()``, which I've already noticed are easy to abuse/mis-use.

A generic ``ForEach`` equivalent could help with that. Fluent syntax
embedded into the ``foreach`` loop is fairly common, and makes things
slightly pithier, but can easily degenerate into a parenthetical jungle.
[1]_

LINQ Query Syntax
-----------------

.. sourcecode:: c#

   var query = from item in items
               where item.IsAwesome
               select item;

   foreach (var item in query)
   {
       item.DoThatThing();
   }

LINQ Query Syntax is one of the best parts of LINQ in C#, IMNSHO. Again,
however, ``foreach`` or a conversion operator is needed.

The "In From" Approach
^^^^^^^^^^^^^^^^^^^^^^

.. sourcecode:: c#

   foreach (var item in from item in items
                        where item.IsAwesome
                        select item)
   {
       item.DoThatThing();
   }

C# is perfectly fine with an "in from", but I've already seen some style
guides frowning upon it, unlike fluent syntax directly in the
``foreach``. Even if I disagree with most of the reasoning behind why
the articles I've seen frown upon the "in from", it seems reasonable to
point out how grammatically ugly the construction is (to an English
reader), and how weirdly redundant the whole thing seems both in terms
of keyword usage and naming, even when using type inferencing as much as
possible. (It only gets more redundant should you need to use a type
name for ``var`` and a ``from TypeName item``.)

It seems to me that there should be a cleaner form for this. For
instance, it seems to me that the ``from`` clause should be entirely
elidable, if not the ``select`` as well. For instance, I think something
like this should be possible with query syntax:

.. sourcecode:: c#

   foreach (var item in items where item.IsAwesome)
   {
       item.DoThatThing();
   }

Versus Python
=============

Python is my go to language at this point for prototyping, so its often
Python that I'm "translating from" when writing C# code at this point,
and its often Python that I'm most commonly comparing to C# when I'm
coding, nowadays at least.

Python ``for``
--------------

Python basically sticks to an iterators-only approach (iterators being
the rough Python equivalent to C# ``IEnumerator<T>``). While you can
still unroll the shortcut of a classic ALGOL-family ``for`` loop with a
``do`` or ``while`` loop, the Python ``for`` loop is actually the
equivalent of C#'s ``foreach``:

.. sourcecode:: python

   for item in items:
       if item.is_awesome:
           item.do_that_thing()

Python ``range``
^^^^^^^^^^^^^^^^

To deal with ranges, python provides built-in iterator functions for
that [2]_:

.. sourcecode:: python

   for i in range(0, len(items)):
       if i % 2 == 0 and items[i].is_awesome:
           item.do_that_thing()

You will also notice that Python has one core way to get the length of
all of its data-types, rather than dealing with property names that can
vary as C# does.

The .NET base class library could easily provide standard range
enumerators, so that something like the following would be valid:

.. sourcecode:: c#

   foreach (var i in int.Range(0, items.Count))
   {
       if (i % 2 == 0 && items[i].IsAwesome)
       {
           items[i].DoThatThing();
       }
   }

If enumerators were optimized well enough, C# could also benefit from a
strong ``foreach`` as the primary loop construct.

Python ``enumerate``
^^^^^^^^^^^^^^^^^^^^

Python also provides an even pithier way to deal with indexing an
iterator in its ``enumerate`` function, which is perhaps easiest to show
with its example:

.. sourcecode:: python

   for i, item in enumerate(items):
       if i % 2 == 0 and item.is_awesome:
           item.do_that_thing()

C# doesn't offer destructuring like Python does, and you could probably
do an entire series of posts entirely on how and where C# might offer
destructuring to better work with object hierarchies. LINQ offers a few
destructuring tools, but it certainly isn't as comprehensive in C# as it
is in Python and many other languages.

Something like ``enumerate``, however, is something that I think LINQ,
at least when working with in-memory objects, is lacking as a built-in
tool.

Python Generators
-----------------

Python generators have a rough equivalence to LINQ statements, in some
cases:

.. sourcecode:: python

   query = (item.do_that_thing() for item in items if item.is_awesome)

   for _ in query: pass

Certainly Python doesn't yet have the diversity of operators that LINQ
supports, nor the ability to as easily use generators to lazily build
things like database queries.

Due to Python's dynamic nature, generators can be (but rarely are) used
solely for side-effects/procedural operations and "void" functions used
in the equivalent of Python's ``select``. (C# will give a compiler error
for a ``from item in items select item.DoThatThing()`` if
``item.DoThatThing()`` is a void function.)

List Comprehensions
^^^^^^^^^^^^^^^^^^^

List comprehensions are a specialization of generators [3]_ that
greedily build a list in memory, thus an equivalent for ``ToList<T>()``
in LINQ terms. Python's list syntax makes them wonderfully pithy,
however:

.. sourcecode:: python

   [item.do_that_thing() for item in items if item.is_awesome]

Square brackets are Python's standard list constructor (or more
accurately a syntactic shortcut for the actual ``list()`` constructor).
Given how often ``ToList<T>()`` seems to be (ab)used in C# already, I'm
curious if square brackets around a LINQ expression in C# might be
useful syntactic sugar for ``ToList<T>()`` as well.

Versus Common Lisp's LOOP Macro
===============================

The `Lisp LOOP Macro`_ was one of the first things that I thought of
when I was first introduced to LINQ. LOOP is an amazing DSL for Common
Lisp looping. It is interesting to compare and contrast LINQ's operators
with LOOP's language. Certainly LINQ ultimately provides more tools, but
there are still some interesting things that LINQ might pick up.

For completion's sake, here's one version of the running example from
above:

.. sourcecode:: lisp

   (loop for item in items when (is-awesome? item) do (do-that-thing item))

Note that Lisp's LOOP provides a DO clause that can be used as a loop
body, and thus needs no other loop construct. I keep thinking it might
be nice to allow for standalone LINQ queries with a ``do`` body:

.. sourcecode:: c#

   from item in items where item.IsAwesome do item.DoThatThing();

   // Or backwards, as a very odd keyword-compatible sibling of do-while:
   do item.DoThatThing(); from item in items where item.IsAwesome();

Aggregation Clauses
-------------------

LOOP has explicit aggregation clauses:

.. sourcecode:: lisp

   (loop for item in items maximize (price item))

While LINQ of course provides aggregation tools, C# does not expose
operators for them. Equivalent C# currently would either of the following:

.. sourcecode:: c#

   var maxprice = (from item in items select item.Price).Max();
   var maxprice = items.Max(item => item.Price);

One useful possibility for C#'s query syntax might be something along
the lines of:

.. sourcecode:: c#

   var maxprice = from item in items select maximum item.Price;

Present Participles
-------------------

One interesting feature of Lisp's LOOP macro is that all of its keywords
can be written using the present participle (*-ing*), which can often
result in slightly more readable (from an English perspective, at least)
statements. For example, rewriting the above:

.. sourcecode:: lisp

   (loop for item in items when (is-awesome? item) doing (do-that-thing item))
   (loop for item in items maximizing (price item))

It may seem like a subtle change in these examples, but definitely in
larger, more complicated LOOP examples with many clauses, the change can
make things surprisingly clearer.

It's probably a lot to ask for LINQ in C# to support multiple verb
forms, but there has been a few times already where I've seen long LINQ
queries and thought that they would be easier to read with the present
participle, particularly given how lazy LINQ queries are.

----

.. _Lisp LOOP Macro: http://www.gigamonkeys.com/book/loop-for-black-belts.html

.. [1] I have been debating adopting the style that I see mostly from
   Novell and Mono bloggers of placing an extra space between a function
   name and its arguments, which often does make things like long runs
   of LINQ extension methods somewhat easier on the eyes. But my old
   habit is hard to break, and still the most common C# style.

.. [2] Nit-picking: Python 2's built-in ``range`` builds a list in
   memory, rather than an iterator, which is the job of ``xrange``, of
   course.

.. [3] Well, actually historically generators are a generalization of
   list comprehensions, which Python added first.

.. vim: ai spell tw=72
