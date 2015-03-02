---
date: 2008-04-21 12:35:40.195096
db_id: 461
db_updated: 2008-04-21 12:35:40.195169
layout: post
tags: digital-colophon
title: Firefox Tricks
---
Recently introduced to Vimperator_, an addon for Firefox that makes Firefox more like Vim, which is amazingly useful for keyboard-based browsing.  Nothing like being able to navigate pages from the home row (unei style for Colemak, with a bit of remapping).  Try it, but because it completely mangles Firefox's keyboard shortcuts and some of Firefox's UI you may want to try it in a separate profile first.

Which is my second trick: *Firefox Profiles*.  I used to think these were a vestigial organ from Netscape used only by corporate types.  Then I realized that I had two good uses of them and that shut me up.  First I've become one of those people that have an extremely long running session and keep something around 10-20 tabs open that come back when I relaunch Firefox.  I actually find that useful, but there is one scenario where that becomes an issue: roaming wireless.  Many wireless networks have "welcome" or "sign-in" pages that redirect you on first connection.  I created a "clear" profile that opens to a blank page specifically for unknown wireless networks where I want to wait to pull up my long running session until after I know they won't be redirected.  The other use is that I decided to move my addons like Firebug and YSlow to a separate profile to keep them from taking up memory when I'm just surfing.

To set up a new profile run ``firefox -ProfileManager`` which gives you the normally hidden profile GUI.  To start Firefox with a different profile you can create a shortcut with ``firefox -p <profile-name>``.

.. _Vimperator: http://vimperator.mozdev.org/