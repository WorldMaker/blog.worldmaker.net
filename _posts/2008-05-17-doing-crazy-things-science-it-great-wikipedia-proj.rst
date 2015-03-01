---
date: 2008-05-17 01:18:09.531477
db_id: 464
db_updated: 2008-05-17 01:21:41.960978
layout: post
tags: coding wikipedia insanity
title: 'Doing Crazy Things for the Science of it: The Great Wikipedia Project of Ought
  Eight'
---
So I'm working with a partner on an already belated project for our Web Mining class and we decide, why not mine the textual data of Wikipedia?  I mean, a dump of current revisions of Wikipedia pages as of March this year is *just* 3.5 GBs in one massive *compressed* XML file.  It's supposed to be a learning project, right?  Why not go whole hog and do some massively distributed programming and see if we can pull of something that seems like a real project, huh?

Yes, I certainly do think that I'm insane, but I have indeed been learning things.  For instance, I've been learning how I might deal with huge compressed bundles of XML 'joy'.  Right now I'm streaming that file in RAM and splitting it into individual articles that I'm storing in a bucket under my S3 account.  First of all, I'm a little bit surprised that no one has bothered to keep a public Wikipedia bucket.  I would think that it would be quite useful for academic projects running on EC2.  (Considering that S3 bandwidth is free between EC2 and S3 and that with Wikipedia's strict robots policy S3 is the best place to host a distributed computing-accessible mirror.)  Like what we're crazy enough to be trying...  If anyone wants to take over ownership of this bucket that I'm building I'd be happy to chown it to some other group interested in using it for research or for making it publicly available.  I'll probably just delete it if no one seems interested, but considering that I seem to have already spent $5 or $6 on PUT requests alone, I wouldn't mind seeing someone make good use of it.

Below I'm including revision 2 (the currently running one) of my uploader script, and maybe even if I do end up deleting my bucket before someone can take over maintenance this script will come in handy to the next crazy group attempting this...

This script does some rudimentary XML stuff and I needed something that was fast and performed well while streaming the XML out of a file that was GBs huge and so I was glad to find that ``xml.etree.cElementTree`` added to Python's core in 2.5 was similar enough to ``xmltramp`` that I felt at home with the interface and fast enough to get the job done.  In fact, the obvious bottle neck during most operations are the HTTP requests to S3.  That issue led to this revision 2 of the script that switched to using multiple threads (after a quick refresher on Python ``threading``) and the addition of robustness checks and retries.  So here's how I'm running this script::

  bzcat enwiki-20080312-pages-articles.xml.bz2 | ./splick2.py

``bzcat`` (shortcut to ``bzip -dc``, which decompresses directly to standard out so that you can pipe it) seems to take only an average 5 MBs of RAM to stream through the 3.5 GB file, which is great.  (Particularly because I don't have the hard drive space to completely decompress the XML file.)  The non-threaded version of splick that was prone to burn outs on S3 PUT failure (a well known occurrence to be expected when working with S3) and a bit slower than sending multiple requests as fast as my connection seems to allow.  It used only an average of 9 MBs of Memory in streaming through the file and most of that was spikes as data structures were built to send the HTTP request and then scrubbed before loading the next item from the XML.  Running the combined pipe operation (along with my normal operations firefox, thunderbird, banshee, OO.o Word Processor) left the processor using about a steady 17% CPU according to the widget on my Gnome panel.  

The threaded version with a data queue of 16 items seems to stay consistently around 50 MBs and I did not notice a change in CPU utilization on average, but it is obviously a bit "spikier" as it reads from the stream less consistently.

I'm dedicating this script to the public domain because it was relatively quickly pieced together from other public domain sources:

.. sourcecode:: python

  #!/usr/bin/python
  from xml.etree.cElementTree import iterparse, tostring
  import sys
  import S3 # Get this from Amazon
  import threading
  import Queue

  pagePool = Queue.Queue(16) # Store at most 16 pages

  AWS_ACCESS_KEY_ID = '{{ Your Access Key Here! }}'
  AWS_SECRET_ACCESS_KEY = '{{ Your Secret Access Key Here! }}'
  BUCKET_NAME = 'enwiki'

  WIKI_ID_TAG = "{http://www.mediawiki.org/xml/export-0.3/}id"
  WIKI_TITLE_TAG = "{http://www.mediawiki.org/xml/export-0.3/}title"
  WIKI_PAGE_TAG = "{http://www.mediawiki.org/xml/export-0.3/}page"

  SKIP = 0  # Use this to start after a given article ID

  class PageUploader(threading.Thread):  
      def __init__(self):
          self.conn = S3.AWSAuthConnection(AWS_ACCESS_KEY_ID,
              AWS_SECRET_ACCESS_KEY)
          self.error = False
          threading.Thread.__init__(self)
      def run(self):
          while True:
              if self.error: break

              page = pagePool.get()
              idno = page.find(WIKI_ID_TAG).text
              title = page.find(WIKI_TITLE_TAG).text # for interesting output

              attempt = 1
              while attempt < 4:
                  print u"[%s] Uploading Page: %s (%s, %s)" % (self.getName(),
                      title, idno, attempt)
                  try:
                      resp = self.conn.put(BUCKET_NAME, "%s.xml" % (idno),
                          S3.S3Object(tostring(page, 'utf8')),
                          {'Content-Type': 'text/xml'})
                  except:
                      attempt += 1
                  if resp.http_response.status != 200:
                      attempt += 1
                  else:
                      break
              if attempt == 4:
                  self.error = True
                  print u"[%s] Error on Page Upload! (%s)" % (self.getName(),
                      idno)
                  pagePool.put(page) # replace page
              pagePool.task_done()
            

  context = iterparse(sys.stdin, events=("start", "end"))
  root = None

  for thr in xrange(0, 8):
      upl = PageUploader()
      upl.setName("Uploader%s" % thr)
      upl.start()

  for event, elem in context:
      if event == "start" and root is None:
          print "Found root element..."
          root = elem     # the first element is root
      if event == "end" and elem.tag == WIKI_PAGE_TAG:
          idno = int(elem.find(WIKI_ID_TAG).text)
          if idno < SKIP:
            if idno % 10000 == 0:
                print "Skipped Pages: %s" % (idno)
          else:
              # print "Feeding Page (%s)" % (idno)
              pagePool.put(elem)
          root.clear() # clear already read pages

  pagePool.join() # wait for the queue to empty
