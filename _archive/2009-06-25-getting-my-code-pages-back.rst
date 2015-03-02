---
date: 2009-06-25 04:11:42.840653
db_id: 536
db_updated: 2009-06-25 04:12:33.985319
layout: post
tags: worldmaker darcsforge django south coding magnatune darcs banshee cherokee
title: Getting My Code Pages Back Up
---
A few months ago I shutdown my code sites because my poor virtual server was getting overloaded (too many sites requiring too much RAM). (The code sites are the easiest to "shard" out of the server because most of the content is built/cached from source control artifacts.) I set up a second virtual server with the intent to get things back up quickly, but then I decided it was time to update some of the "Darcsforge_" code and "back up quickly" became "whoops, I meant to do that months ago" thanks to other priorities. This weekend I've been hacking on Darcsforge and slowly getting things up and running on the second server.

I've made some pretty cool strides forward, including the South_ migrations for Darcsforge applications. One of the things that I felt was holding me back was a feeling that I needed to get the models "perfect" and "publishable", and having a trusty migration tool is very nice net to have under me, working hand in hand with my good friend darcs_.

Part of what spurred me to work on it is was the notice that my simple `Magnatune addon for Banshee`_ is being pushed towards approval as a debian package by `Jo Shields`_, which is actually somewhat exciting for me as it would make the first code that I've originated to become debian packaged. It will also be interesting because it will mark my addon (a quick "weekend hacking project") into an "officially unofficial" addon, particularly because it may end up being one of several keys in the switch for Ubuntu default from Rhythmbox to Banshee_. (I, of course, am in favor of the default switch as Banshee is definitely my Ubuntu media player of choice to the point where it is one of my PPA applications in order to have the latest and greatest.)

In the process of setting up things on my second virtual server I managed to run into a passing mention of Cherokee_ web server in Django_'s documentation, and I've quickly become infatuated. At this point I've used, to different degrees, Apache and nginx and configuration alone seems like a silly chore in both of them. ``cherokee-admin`` is a lovely AJAXy control panel that makes website configuration simple and powerful, and alone is worth the switch to Cherokee for me. Cherokee has great simple, well-organized documentation, and that is also well appreciated.

.. _Darcsforge: http://darcsforge.code.worldmaker.net
.. _South: http://south.aeracode.org
.. _darcs: http://darcs.net
.. _Magnatune addon for Banshee: http://magnatune.code.worldmaker.net
.. _Jo Shields: http://apebox.org
.. _Banshee: http://banshee-project.org
.. _Cherokee: http://cherokee-project.com
.. _Django: http://djangoproject.com