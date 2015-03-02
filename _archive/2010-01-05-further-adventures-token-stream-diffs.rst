---
date: 2010-01-05 20:14:29.618957
db_id: 555
db_updated: 2010-01-05 20:14:29.618979
layout: post
tags: coding darcs pygments
title: Further Adventures with Token Stream Diffs
---
I've taken, with a tiny bit of prodding, the `Token Stream Diffs Using Pygments`_ from toy to a nascent toolchain that may even almost be useful. 

.. _Token Stream Diffs Using Pygments: http://blog.worldmaker.net/2009/aug/16/token-stream-diffs-using-pygments/

I've brought in two new dependencies `Google diff-match-patch`_ and, for nice argument parsing, argparse_. The diff-match-patch library provides a character-based diff algorithm and patch format (a character-based unidiff-like format with character escaping) in a number of languages, including my friend Python. I can use diff-match-patch to produce useful patch output (and apply said patches with a simple new ``tokpatch.py`` file that is but a wrapper around diff-match-patch patching).

.. _Google diff-match-patch: http://code.google.com/p/google-diff-match-patch/
.. _argparse: http://code.google.com/p/argparse/

``tokdiff.py`` has grown three new output formats. The original "toy" format I've renamed "verbose" and its quite interesting for debugging and getting an idea of why diffs look the way they do. Most useful, and the new default, is the unidiff-like output. There's also diff-match-patch's much more compact tab-delimited "delta" format, which is interesting, but I don't think is all that safe. (It's an undocumented, outside of the code itself, feature...)

The final output format is the "compare" which outputs some pretty HTML visually showing the differences between the tokenized diff approach and diff-match-patch's standard character-based diff, plus some basic benchmarking of the two algorithms.

Both tools and both dependencies can be grabbed from the darcs repository::

  darcs get http://repos.worldmaker.net/tokdiff/main tokdiff

I'll consider putting together a deeper code site for it in the near future.

Some brief observations and thoughts for future directions:

* I shouldn't be too surprised by it, but the tokenized diff does generally seem to be an order of magnitude faster than diff-match-patch's more generalized character-based diff algorithm.

* I think there are still some interesting heuristics that can be further applied to make the tokenized diff even smarter. I'm not sure how exactly to start on that (I've been lucky to get as far as I have on the backs of existing diff algorithms).

* I'd like to experiment with darcs-like patch selection UI using the tokenized diffs; particularly using the existing tokenization for syntax highlighting.

* I'd like to know if anyone finds interesting real applications of this quick hack.