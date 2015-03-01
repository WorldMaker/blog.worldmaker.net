---
date: 2008-01-31 16:39:26.993442
db_id: 436
db_updated: 2008-02-21 20:31:04.480555
layout: post
tags: restructuredtext
title: On reStructuredText, Wikir
---
I switched to reStructuredText (reST) about a year ago as a preferred formatting style.  (I have long, weird history here, including one that I wrote from scratch, by hand.)  ReST has a number of unique points and has a very interesting overly-optimistic (almost over-engineered) design.  The primary focus is that the ASCII markup should be relatively unobtrusive, and I've yet to see a reST document that was difficult to read.  Much of the markup looks relatively "natural" in a text document.  Beyond that, reST has a powerful backend system that is built to support any number of output formats.  The same reST documents can be output to HTML documentation, LaTeX/PDF "paper" documentation, or many other things you can want.  RST2A_ is a good advocacy site for more of an idea of why reST is different and some of what you can do with it.

An interesting new development, to me at least, is Wikir_, which brings backend support to generate Wiki-formatting-style documents from reST sources, which was originally built to allow a project on Google Code to autogenerate Wiki documents (so they show up on Google Code's wiki section) from existing reST documents.  It's almost funny to convert one ASCII-based markup style to another, but it certainly could be useful.

.. _Wikir: http://code.google.com/p/wikir/
.. _RST2A: http://www.rst2a.com/