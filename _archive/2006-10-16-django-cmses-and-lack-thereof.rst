---
date: 2006-10-16 15:45:50.216546
db_id: 274
db_updated: 2008-02-21 15:16:46.887666
layout: post
tags: computers
title: Django CMSes (and lack thereof)
---
I wrote the below in reply to `a comment on a blog post by James Bennett <http://www.b-list.org/weblog/2006/10/16/how-i-got-here#c2015>`_:

    Knowing what you know of Django, and that you have used Textpattern in a previous incarnation, can you recommend a Free Django CMS? 

Django.  I know it sounds like a joke and I've heard a score of complaints that each and every person tends to implement their own individual Django CMS for their project, but to me that speaks to a lot of the strengths of Django.  My personal website and the website I maintain for my student council (SpeedCouncil.org) both have very widely different needs from a CMS, and share very little code, but I haven't "rewritten" anything and there's no unnecessary duplication.  The same absolutely cannot be said for the websites when I was using PHP.

Keep in mind too that the key piece needed for a CMS is provided largely out of the box by Django: the brilliant, well-designed, Admin site.  90% of writing or dealing with a CMS is "How do I input data?" and the Admin site removes that worry leaving you with the much simpler problem of "What data do I actually need for this website?  What's the best way to store that data?".  With Django's Admin I get the cool features that constrained PHP CMSes provided and yet I much more constrained data types, better data integrity, and an easier time to doing real cool data queries that actually make use of the relationship power of a modern RDBMS rather than treating the RDBMS like a glorified file store.

Obviously there are bits and pieces that you might want to borrow from others.  For instance, I've borrowed Ivan Sagalaev's Tag library for my personal site.  But such pieces are rarely the types of monolithic behaviors that "CMS Engines" require on other languages, they are much more organic components that graft into your own design rather than force you into someone else's.  

I've been all over the PHP CMS spectrum (DIY, Nucleus, Drupal) and the freedom and the power over the design of Django websites has just been empowering and I'd certainly have a hard time going back to an "off the shelf CMS" again.