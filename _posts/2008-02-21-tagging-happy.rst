---
date: 2008-02-21 21:12:15.510266
db_id: 444
db_updated: 2008-02-28 14:08:16.399554
layout: post
tags: django worldmaker
title: Tagging happy...
---
I finally consolidated all of my tagging functionality here on my personal site to the more comprehensive, more "out of the box" experience of django-tagging_.  This means for me that tags now actually work on blog posts, so maybe I'll start using them more consistently...  It also means that I now have `my own tag cloud`_ to stare at in wonder as opposed to a boring flat list.  There's some other cleanup there on my tag pages, but the cloud is the most visible.  Now I'm debating putting a blog-specific cloud on the blog main page.

The only real interesting bit of the code I had to figure out and write is my general "every model" cloud view, because while django-tagging_ provides clouds for individual models it is missing this particular ability:

.. sourcecode:: python

  def cloud(request):
      """
      Grand tag cloud for the whole ball o' wax.
      """
      tags = list(Tag.objects.extra(select={'count': 
          '''SELECT COUNT(*) FROM tagging_taggeditem
          WHERE tagging_taggeditem.tag_id = tagging_tag.id'''}))
      return render_to_response('tagging/tag_list.html', {'object_list': calculate_cloud(tags)})

The only thing that should be noted is that extra select clause works for PostgreSQL, but won't work for MySQL, due to using a full sub-select.

.. _django-tagging: http://code.google.com/p/django-tagging/
.. _my own tag cloud: http://tags.worldmaker.net/