---
date: 2009-08-16 22:39:40.268502
db_id: 540
db_updated: 2009-08-16 22:39:40.268547
layout: post
tags: coding darcs pygments
title: Token Stream Diffs Using Pygments
---
I was writing again today about the possibility of interestingly useful
diffs produced using a lexer (tokenizer) from a syntax highlighting
library. I wrote a simple proof-of-concept prototype and thought it
might be interesting to someone. Interestingly it ended up being shorter
than I expected thanks in large part to Python's standard library
``difflib``.

From time to time on the darcs mailing list the idea comes up to use
something (or several somethings) for smarter, more meaningful diffs
(than the defacto line-based diffs that every SCS, and many similar
tools, have used since just about the dawn of time). The idea to go
smarter is to help better separate out "meaningful" changes to the code
and less meaningful changes such as whitespace reformatting. A strong
example is an XML diff tool that picks up changes in the DOM tree rather
than at the text/formatting level. The problem with such a strong
example is that it is very domain specific (each format has its own AST
and few formats use the same tools to get that AST), and fragile (both
documents have to be well-formed, complete, or otherwise parsable).

I think that I've come up with the idea that there is a good, pragmatic
compromise position between the "stupid" line-based diff and the "smart"
domain-specific parser diff: diffs based upon the token streams of
syntax highlighter lexers. Most syntax highlighter libraries are
designed to be general purpose and reusable, and often have strong
libraries of lexers for major languages. These lexers are also built to
be rough and tumble and to do their best with all sorts of unfinished,
malformed, or otherwise "junk" input. These lexers are not going to be a
"perfect" match for what the language's tools expect of the language,
but my contention is that if they are good enough for reasonable syntax
highlighting in an editor or other environment they are good enough for
usefully informative diffs.

I wanted a test bed for this hypothesis and so to start with I wanted a
simple "proof-of-concept" tool that could produce a simple token-based
diff of two files, using Pygments, which is the very useful syntax
highlighter library for Python. Once I discovered Python's standard
library's ``difflib`` module it turned out to be a reasonably
straightforward tool to build. Behold:

.. sourcecode:: python

	#!/usr/bin/env python
	# Copyright 2009 Max Battcher <me@worldmaker.net>. Licensed under the MS-PL.
	from difflib import SequenceMatcher
	import pygments
	import pygments.lexers
	import sys

	"""
	This is a simple diff utility based upon pygments' lexer token streams.
	"""

	if len(sys.argv) != 4:
	    print "Usage: tokdiff.py lexername file1 file2"
	    sys.exit(1)

	tool, lexname, f1, f2 = sys.argv

	lexer = pygments.lexers.get_lexer_by_name(lexname)

	a = list(pygments.lex(file(f1).read(), lexer))
	b = list(pygments.lex(file(f2).read(), lexer))

	sm = SequenceMatcher(None, a, b)

	for op, a1, a2, b1, b2 in sm.get_opcodes():
	    if op == 'equal':
		for item in a[a1:a2]:
		    print "  %s: %s" % item
	    elif op == 'replace':
		print "~~~"
		for item in a[a1:a2]:
		    print "- %s: %s" % item
		for item in b[b1:b2]:
		    print "+ %s: %s" % item
		print "~~~"
	    elif op == 'insert':
		for item in b[b1:b2]:
		    print "+ %s: %s" % item
	    elif op == 'delete':
		for item in a[a1:a2]:
		    print "- %s: %s" % item
	    else:
		print "<<%s>>" % op

	# vim: ai et ts=4 sts=4 sw=4

Next steps would be to come up with a useful "compact" diff output and
putting it to the test with a tokenized ``patch`` tool. There are
probably still a lot of questions that would need to be answered and
tests to perform before such a tool might usefully be used as the basis
of a source control system or source control system add-on, but my few
tests with this tool already are showing some of the results that I had
hoped for.
