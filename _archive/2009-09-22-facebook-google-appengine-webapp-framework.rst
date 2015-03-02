---
date: 2009-09-22 02:19:58.798090
db_id: 544
db_updated: 2009-10-04 19:14:00.372927
layout: post
tags: coding facebook appengine
title: Facebook on Google AppEngine "webapp" Framework
---
I've got a small backlog of code that I've been meaning to open source
and "announce" so this week may very well be "coding" week here on my
blog. I promise to try to mix things up and get my Round Table post
written this week (not that I have many days after this week to do so)
as well.

The first couple, at least, will be remotely *Assassins!*-related.
Because right now the codebase is the most valuable asset in my poor,
poor company I don't plan to open source the majority of the code
itself. I do plan to re-release the last version of Assassins, which now
is merely a distant relative to the "modern" codebase. This week my plan
is to release some of the sub-projects that Assassins has yielded.

Today's choice bit is ``webappfb.py``, which is a relative to
the ``djangofb`` toolset that Pyfacebook_ provides for Facebook
applications targeting Django. In this case it is many similar tools for
Google App Engine's bare bones object-oriented ``webapp`` framework. I
know that ``webapp`` isn't the greatest framework, nor is it one with a
great amount of support. However, it is a great minimal framework that
seems perfect for the super-fast response times that are needed for a
Facebook application. ``webappfb.py`` is a similarly "minimal" toolkit
to remove some of the repetition needed in developing Facebook apps
against ``webapp``.

I'm not a huge fan of git, but it's what "upstream", Pyfacebook_, has
swapped to, so it's what I've used in this case. I've posted
``webappfb.py`` to my fork at github: `webappfb.py`_. I also did the
kind thing and sent a pull request upstream to see if it sticks.

.. _Pyfacebook: http://pyfacebook.googlecode.com
.. _webappfb.py: http://github.com/WorldMaker/pyfacebook/blob/master/facebook/webappfb.py

I'll have to write "real" documentation, probably, but it should be
mostly self-explanatory to anyone that has seen ``webapp``
documentation. Primarily, ``webappfb.FacebookRequestHandler`` can be
used just about anywhere you would use ``webapp.RequestHandler``.
``FacebookRequestHandler`` provides a ``self.facebook`` instance (using
the API key and secret key that you can store in a simple
``facebook.yaml`` file). 

``FacebookRequestHandler`` also provides the functionality offered by
``djangofb.requires_login`` decorator. To use it, just set a
``requires_login`` attribute on your request handler.  You'll also want
to check against ``self.redirecting`` to keep from performing
application logic when not-logged in.  ``FacebookRequestHandler``
provides a Facebook-friendly ``self.redirect()`` that takes case of the
proper FBML response.

``FacebookRequestHandler`` also provides ``memcache``-backed "user"
messages tagged to a Facebook ``uid`` and stored for a limited time.
This is a simple relative to Django's user messaging that makes use of
the always-available nature of App Engine's ``memcache``.

Finally, ``FacebookCanvasHandler`` is a simple
``FacebookRequestHandler`` subclass that realizes that canvas requests
(for Facebook applications choosing to use the FBML route) are always
``HTTP POST`` and takes care of ``self.redirecting`` among other things,
providing a ``canvas()`` handler to use rather than ``post()``.

A simple example:

.. sourcecode:: python

   from webappfb import FacebookCanvasHandler, FacebookRequestHandler

   class SampleHandler(FacebookRequestHandler):
      requires_login = True

      def post(self):
          if self.redirecting: return

          # TODO: Your application logic

          # Can use self.facebook here to make API calls

          # Save a temporary "flash" message for the current
          # Facebook user
          self.add_user_message('success', 'This is a test.')
        
          self.redirect(self.facebook.get_app_url('other/page'))

   class OtherPageHandler(FacebookCanvasHandler):
       requires_login = True

       def canvas(self):
           for msg in self.get_and_delete_messages():
               self.response.write("""<fb:%(kind)s>
                    <fb:message>%(message)s</fb:message>
                    %(detail)s
                    </fb:%(kind)s>""" % msg)

