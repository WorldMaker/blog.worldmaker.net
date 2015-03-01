---
date: 2009-12-09 16:07:43.825674
db_id: 551
db_updated: 2009-12-09 16:07:43.825718
layout: post
tags: coding wave appengine
title: Wave Annotation Markup "Language"
---
This is another itch I needed scratched while working on the HCE bot (which is in alpha testing on Wave). In this case I was butting heads with the API provided by Google Wave for Python, which has provided no end of complaints from me. The poor documentation and brutal "let's just do a rough conversion of the Java API" nature of it haven't helped.

Anyway, I wanted the ability to write rich markup in a friendly neighborhood Django Template (just as I use for the bot's HTML output). The Wave API has a method to append a very anemic subset of HTML, which doesn't come anywhere close to a 1-to-1 correlation with the markup model used on the wire by Wave.

What I'm about to post is a technological turducken: my Wave Annotation Markup "Language" here uses Django templates to render YAML documents (the data structure of which is then used to make API calls that in turn get boiled down into "ops" in Wave's ugly Java-infused "JSON RPC" dialect). But it seems to work, mostly, and that was the point.

I refused to get much closer to the API metal and work inside its innards because I was afraid I'd be too tempted to gut the whole thing and start from scratch to make it all more Pythonic. I'd prefer to get a paycheck from someone to do that sort of thing, before resorting to that. (Hire me!)

Here's the latest version, as of this post, of my "waml" tool, while I continue to procrastinate uploading the entire HCE bot repository:

.. sourcecode:: python

  # Simple, stupid Wave Annotation Markup
  # Copyright 2009 Max Battcher. Licensed for use under the Ms-PL.
  from google.appengine.ext.webapp import template
  from waveapi.document import FormElement, Gadget, Image, Range
  import yaml

  def append_waml(doc, filename, context={}):
      """
      Applies to the doc, which is expected to be a Wave API Document, the
      transforms specified in an appropriate data structure loaded from a
      YAML document that is rendered by a Django Template of the given
      filename and with the given context.
      """
      tmpl = yaml.load(template.render(filename, context))

      pos = len(doc.GetText()) + 1 # Why are ranges 1-based?
      annots = []

      for tok in tmpl:
          if isinstance(tok, list):
              doc.AppendText(tok[0])
              end = pos + len(tok[0])
              if isinstance(tok[1], dict):
                  for key, value in tok[1].items():
                      annots.append((Range(pos, end), key, value))
              pos = end
          elif isinstance(tok, dict):
              type = tok.pop('type').lower()
              if type == 'image':
                  doc.AppendElement(Image(**tok))
              elif type == 'gadget':
                  doc.AppendElement(Gadget(**tok))
              elif type == 'formelement':
                  etype = tok.pop('element_type')
                  name = tok.pop('name')
                  doc.AppendElement(FormElement(etype, name, **tok))
              pos += 1 # These elements take up a position?
          else:
              tok = str(tok)
              doc.AppendText(tok)
              pos += len(tok)
          space = True
      # We collect, then apply all of the annotations at the end here
      # because AppendText apparently automagically adjusts the end of
      # ranges that coincide with the end of the current document, thus
      # producing "leaky" annotations
      for annot in annots:
          doc.SetAnnotation(*annot)

  # vim: ai et ts=4 sts=4 sw=4

An ``example.yaml`` file:

{% raw %}
.. sourcecode:: django

  - "Hello World!\n\n"
  {% for word, color in words %}
  - [{{ word }}, {style/fontWeight: bold, style/color: {{ color }}}]
  {% endfor %}
  - "\n\n"
  - 
    type: image
    url: http://example.com/test.png
{% endraw %}

Example usage:

.. sourcecode:: python

  import waml

  def test(blip): # Grab a blip, any blip
      waml.append_waml(blip.GetDocument(), 'example.yaml', {
          'words': [('testing ', 'red'), ('context', 'blue')],
      })
