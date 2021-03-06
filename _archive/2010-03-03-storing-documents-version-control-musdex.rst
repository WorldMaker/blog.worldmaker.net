---
date: 2010-03-03 00:12:11.666238
db_id: 562
db_updated: 2010-03-03 00:12:11.666263
layout: post
tags: darcs game-design
title: Storing Documents in Version Control with musdex
---
I've posted my first (presumably buggy) distribution to PyPI (aka the CheeseShop): musdex_ (`musdex documentation`_). You should be able to just ``pip install musdex`` and try it.

This is part of my lead up to `Script Frenzy`_. I'm gearing up to (hopefully) win Script Frenzy by working on a KeyLimePie project. I've got a game backstory and outline I've been working that is less controversial than some of my earlier stuff, and I think a lot of fun. I've put off some of my KeyLimePie work to focus on tooling so that Script Frenzy is as smooth as I can make it.

To get that "real script feel", plus nicely typeset PDF files to help "win" Script Frenzy, I decided to work in Celtx, which is a free screenwriting tool built on the xulrunner platform. I built a tool to convert from a few simple (and I think reasonably script-like) conventions in Celtx to the YAML KeyLimePie data format that I already have tools to work with. (More proof that I think YAML as the basic data format was a good choice.) I took one of my existing YAML scripts, converted it Celtx and then back, as a good test that things work.

That's where musdex comes in. This is a tool that I've meant to build several times over, but knowing that I'm going to be working in Celtx for a month, I decided to finally build it. The Celtx format, like a number of other common document formats today, is really a zip file of a set of XML and HTML documents. musdex is designed so that I can edit a Celtx document as Celtx appears to see it, and yet (transparently) version control the individual XML and HTML documents in my version control system of choice, darcs_. Darcs works well with XML and HTML documents and not so well with binary blobs. The resulting patches from XML and HTML documents are much more interesting to review than binary patches.

There's still more to do with musdex, and I expect to find bugs still. This is an early release and I would be interested in hearing feedback on it. As far as I know, it is the first released tool to do zip document version control.

I think it is good enough for my interests in Celtx version control. I tested a Docx and ODT and the XML files in both were hugely minified and it would be nice to have more linebreaks in the XML before doing much in the way of tracking them in a darcs repository. I think it may still be preferable to binary patches, but not by much and I'd hate to have to debug conflicts in those XML blobs. (Although it might not actually be terrible with my tokdiff tool at hand, come to think of it. I wonder if I should post tokdiff to PyPI...)

.. _musdex: http://pypi.python.org/pypi/musdex/10.03.02
.. _musdex documentation: http://packages.python.org/musdex/
.. _Script Frenzy: http://www.scriptfrenzy.org
.. _darcs: http://darcs.net