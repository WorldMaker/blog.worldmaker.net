---
date: 2009-12-08 00:24:12.322705
db_id: 550
db_updated: 2010-06-21 01:03:56.686883
layout: post
tags: coding appengine
title: Simple App Engine JSON Serialization Snippet
---
I wanted a simple way to easily output JSON for a couple of AppEngine models. A brief search didn't turn up a snippet that looked like what I was looking for, so I wrote this simple module that I call ``gaejson.py``:

.. sourcecode:: python

  # Simple GAE Model JSON Serialization
  # Copyright 2009 Max Battcher. Licensed for use under the Ms-PL.
  from django.utils import simplejson as json
  from google.appengine.api import users
  from google.appengine.ext import db

  class GaeEncoder(json.JSONEncoder):
      def default(self, obj):
          if isinstance(obj, db.Model):
              return dict([(name, getattr(obj, name)) for name 
                  in obj.properties().keys()])
          elif isinstance(obj, users.User):
              return {
                  'nickname': obj.nickname(),
                  'email': obj.email(),
                  'user_id': obj.user_id(),
                  'federated_identity': obj.federated_identity(),
                  'federated_provider': obj.federated_provider(),
              }
          return super(GaeEncoder, self).default(obj)
  
  # vim: ai et ts=4 sts=4 sw=4

Usage is simple:

.. sourcecode:: python

  from gaejson import GaeEncoder, json
  from mymodels import TestModel

  test = TestModel.get(... some db key ...)
  json.dumps(test, cls=GaeEncoder)

.. admonition:: Changes

   2010-06-21
      Fixed the super arguments, which had been reversed and added support for ``google.appengine.api.users.User`` objects.