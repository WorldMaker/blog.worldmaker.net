---
date: 2008-02-20 23:47:58.599058
db_id: 443
db_updated: 2008-02-28 14:08:40.174782
layout: post
tags: openid trustbearer django worldmaker
title: A new key on my physical keychain to play with in the digital world...
---
I bought an Athena USB cryptographic token through `Trustbearer Labs`_.  First out of the gate is that I re-delegated my OpenID to `Trustbearer's OpenID Provider`_ and now am officially too secure for most normal OpenID usages (blog comments).  Oh well, I'm hoping to play with the token and see what other cool things I can do...  Right now I'm mostly curious if I can use it for OpenSSH keys...

On the OpenID front, I've been contemplating for a while that I want to switch from the current version of ``django.contrib.comments`` to django-threadedcomments_.  If I were to do the switch it would be a good opportunity to add in some niceties for people that want to login/validate with an OpenID...  not that I get a lot of comments clamoring for such things, but mostly because I think it would be nice to have.

.. _Trustbearer Labs: http://www.trustbearer.com/
.. _Trustbearer's OpenID Provider: http://openid.trustbearer.com/
.. _django-threadedcomments: http://code.google.com/p/django-threadedcomments/