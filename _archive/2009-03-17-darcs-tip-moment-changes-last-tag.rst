---
date: 2009-03-17 01:13:26.214083
db_id: 524
db_updated: 2009-03-18 21:35:09.900290
layout: post
tags: darcs
title: 'Darcs Tip of the Moment: Changes Since the Last Tag'
---
I've been thinking about keeping better track of some of the cool tips and tricks for use in my source control system of choice, darcs_.  Here's a couple of quick tips for working with ``darcs changes``:

.. _darcs: http://darcs.net

It is quite common to want to know how many patches have been added to a repository since the last tag, for instance to review the changes since the last major build so that you can write release notes before tagging the next build.  The ``--from-tag`` matcher is exactly what you need. To select the last tag you don't need to remember what it was, you can let darcs do that format.  Keep in mind that the matchers accept regular expressions and that the ``--from`` and ``--to`` matchers select the first matching patch they come upon.  To get the changes from the last tag is as simple as::

  darcs changes --from-tag .

The dot is a RegEx that matches anything (and hence everything), but since ``--from-tag`` stops at the first tag that matches, it shall always stop at the most recent (thus last) tag. It might be useful to note the difference with::

  darcs changes --tags .

If you run this second command, it shows that the RegEx does indeed match every tag in the repository and the output should look similar ``darcs show tags``.

As with any other ``darcs changes`` call, don't forget that you can add ``--count`` to get just the number of patches rather than a change log and ``--interactive`` for patch-by-patch inspection.