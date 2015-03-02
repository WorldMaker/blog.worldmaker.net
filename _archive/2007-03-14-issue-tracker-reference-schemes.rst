---
date: 2007-03-14 15:14:57.883936
db_id: 315
db_updated: 2008-02-21 15:16:45.981896
layout: post
tags: programming
title: On Issue Tracker Reference Schemes
---
I'm jumping back and forth between working on my big "secret" project and getting some good code into my pet project manager Darcsforge [#]_.  One of the oldest (now) pieces of Darcsforge is my pet issue tracker, nicknamed 'orkin', and it was time to renovate it to better fit with the later pieces I've worked on.    One of the big things I re-debated was the use of "Issue Numbers".   Every Issue Tracker I've ever dealt with has used Issue Numbers as the main tool to reference an Issue [#]_.  The big Pro for Issue Numbers is their terseness: hundreds of thousands of issues can be addressed by a sequence of 6 numbers.  The big Con: terseness.  Sure you might be able to remember the difference between Issue 34 and Issue 43 but at a certain threshold you have to start referring to cheat sheets or the Issue Tracker itself to figure things out.  Quick: What's the difference between Issue 135736 and Issue 135637?  Issue numbers don't work well for us people and are often much more artifacts of back-end systems (auto-numbered database primary keys) than artifacts for human consumption.

Django_ encourages web designers to design "humane" URLs.  Take this blog site, for example, I could just as easily use ``/entry/343/``, but I specifically chose the ``/2007/mar/14/issue-tracker-reference-schemes/`` format because it says a lot more to the human mind and is a lot friendlier.  It breaks into two major pieces, the posted date (3/14/2007 or March 14 2007 or whatever other mental format you prefer) and the 'slug', which is a newspaper term by way of Django_, which in this case is ``issue-tracker-reference-schemes``.  The address there tells me when I posted the blog entry and something about the subject of the blog entry (at least in the cases where I pick a good and appropriate title for the entry, because the slug is just a cleaned, simplified version of the title I choose).

I decided that I would appreciate similar addresses in my issue tracker and starting questioning the usefulness of that as a general reference scheme.  Certainly terseness is out the window, but is it memorable?  I think so.  Personally, I have an easier time remembering "that issue from last monday involving integrating orkin" (Issue ``/2007/mar/11/get-orkin-integrated/``) than some arbitrary number, and in fact that's just about the way I mentally store that anyway. There is a deep context I pull from that reference: how old the issue is, a general idea of what the issue is about, and a general relationship between the issue and the project's history ("in March feature *x* didn't even exist and maybe *x* takes care of this issue").  All without having to actually open the issue or consult a cheat sheet.

So, one of the future features I'm obviously planning to get to is "deep integration" via reStructuredText similar to Trac's wiki-formatting.   How does ``:issue:`2007-Mar-11 get-orkin-integrated``` look for issue reference syntax?  Basically I'm thinking I'm going to use "interpreted roles" in reST for Darcsforge intra-linking.  For issues (and patches, and probably other things) I'm thinking of using the syntax ``[project] [date in YYYY-MMM-DD] slug``.  In many cases the slug alone should be sufficient (at least for me), and it can just grab the most recent, which will generally be the one you want...

.. _Darcs: http://www.darcs.net/
.. _Django: http://www.djangoproject.com/
.. _Trac: http://trac.edgewall.com/

.. [#] An attempt at a Darcs_ oriented, Django_ based, Trac_ like project manager, but more modular/scalable
.. [#] I've dealt with a lot of Issue Trackers.  I can admit that Issue Trackers are well towards the top of the list of software development tools that are continually reinvented...