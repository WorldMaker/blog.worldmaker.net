---
date: 2008-02-28 17:23:58.921949
db_id: 450
db_updated: 2008-02-29 03:49:35.381909
layout: post
tags: programming hack retro
title: Twittering it Old School
---
So, I'm still not entirely convinced about Twitter, but I'm tired of people talking about it as some sort of newly sliced bread so I've ventured into the world of Twitter.  Now, you can read and follow `my twitters`_ from the website, but I figured that wasn't cool enough for retro street cred.  I wrote a simple script that will now allow you to follow my twitter from the old school UNIX ``finger`` command: ``finger me@worldmaker.net``.

.. _my twitters: http://twitter.com/WorldMaker

For those curious, here's the simple and stupid Python script to generate a twitterified plan file:  (I used Django utils because they were handy; you'll also need python-twitter and simplejson.  Django utils need a settings module for translation apparently.)

.. sourcecode:: python

  #!/usr/bin/python
  import os
  os.environ['DJANGO_SETTINGS_MODULE'] = 'some.django.settings'
  from django.utils.dateformat import format
  from django.utils.text import wrap
  import twitter
  import datetime

  """
  Simple script to populate a .plan from twitter updates.

  Public Domain from Max Battcher.  No rights reserved.
  http://www.worldmaker.net/
  """

  PLAN_FILE = ".plan"
  TWITTER_USER = "YourUsername"

  f = open(PLAN_FILE, "w")
  api = twitter.Api()
  sts = api.GetUserTimeline(TWITTER_USER)
  for st in sts:
      txt = """
  %s: %s
  -- """ % (format(datetime.datetime.fromtimestamp(st.GetCreatedAtInSeconds()),
          "F j, Y @H:i"),
          st.text)
      txt = wrap(txt, 75)
      print >>f, txt
  f.close()
