---
date: 2009-02-17 01:05:45.146324
db_id: 516
db_updated: 2009-02-17 01:08:14.916946
layout: post
tags: coding
title: 'Code Snippet of the Moment: Inform 7 Lexer for Pygments'
---
This is a silly hack that turns out isn't entirely useful, but I'm going to post it to preserve it "just in case" and because I probably spent an hour too much on it.  Basically, I've been playing around with writing interactive fiction in Inform 7.  Inform 7 is a unique natural language-based approach to interactive fiction. Because of that is has a deceptively simple subset of highlight-able syntax, with comparison to most other programming or even interactive fiction description languages.  I use Pygments_ as a common syntax highlighter in a number of situations, including and particularly for syntax highlighting of fragments I post to my blog. Thinking ahead to wanting to post snippets of my works to my blog I set about creating a simple lexer for Pygments.

.. _Pygments: http://pygments.org

Unfortunately, it isn't all that useful. Due to the unique nature of the language it is best expressed in a non-fixed-width font with "word wrapping", both of which are entirely unusual for syntax highlighting and don't have existing support in Pygments.  I think my best bet will be to attempt to use Inform's existing HTML output or to hand optimize some reST-based solution.

Here's the lexer in case it might find some use further down the road:

.. sourcecode:: python

  from pygments.lexer import RegexLexer
  from pygments.token import *
  import re

  I7_HEADINGS = ['Volume', 'Book', 'Part', 'Chapter', 'Section', 'Table']

  class Inform7Lexer(RegexLexer):
      """
      Inform 7 is a natural language-based approach to buiding interactive
      fiction. Because of the English-based nature of the language there
      is little overt syntax in the classic sense that might be highlighted.
      """
      name='Inform 7'
      aliases=['I7']
      filenames=['*.inform', '*.i7x', '*.ni']
      flags=re.IGNORECASE | re.MULTILINE

      tokens = {
          'root': [
              (r'^"[^"]*" by ("[^"]*"|[\w ]+)$', Generic.Heading),
              (r'^(%s)[^\n]*$' % "|".join(I7_HEADINGS), Generic.Heading),
              (r'\[', Comment, "comment"),
              (r'"', String, "string"),
              (r'[^"\n\[]+', Text),
              (r'.', Text), 
          ],
          'comment': [
              (r'\]', Comment, "#pop"),
              (r'\[', Comment, "#push"),
              (r'[^\]\[]+', Comment),
          ],
          'string': [
              (r'"', String, "#pop"),
              (r'\[[^\]]*\]', Name),
              (r'[^"\[]*', String),
          ],
      }


  # vim: ai et ts=4 sts=4 sw=4

`A quick screenshot with obviously lots of scrolling and a Firefox rendering glitch`__ from lexing Graham Nelson's `The Reliques of Tolti-Aph`_.

__ http://media.worldmaker.net/blog/i7lexer.png
.. _The Reliques of Tolti-Aph: http://www.inform-fiction.org/I7Downloads/Examples/rota/index.html