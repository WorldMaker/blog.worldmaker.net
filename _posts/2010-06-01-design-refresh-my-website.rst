---
date: 2010-06-01 04:28:10.869474
db_id: 568
db_updated: 2010-06-01 04:28:10.869505
layout: post
tags: worldmaker
title: Design Refresh for My Website
---
While I was working on my nice new Pygments style, I got to thinking about my website's own color palette which after a few years had grown into an interesting hodge-podge. A palette refresh turned into a bit of a CSS audit and an excuse to play with some cool new CSS3 features and some old IE4 friends that are finally about ready for prime-time ("Hello, ``@font-face``!").

July 4th will begin the 8th year of my blogging from my domain name. In that time I've had three major designs (with quite a few more than that rewrites and tweaks). The current design dates back to the migration from Drupal (yuck) to my current, not-very-fancy-but-all-I-really-want custom Django mini-Frankenstein. It's hard to believe, but that happened this time four years ago, meaning that I've used the current design for nearly half of the domain's life... The current design was rewritten once since then to replace inherited spaghetti CSS grids for YUI's nice clean orderly system.

This weekend's design refresh, nicknamed "``tangowithme``", I standardized the site's color palette, as with the Pygments style, on the Tango_ palette, which I love. It's like pastel candies for your eyes. To make palette handling a tad bit easier I used a subtly hacked CleverCSS_ in a simple design-time build system (along with cssmin_ to preserve a few useful kilobytes).

The more noticeable differences are that I'm using a couple of CSS3 features that you will catch on most modern browsers: ``border-radius`` corner rounding and linear gradients. The `CSS3 Gradient Generator`_ from `glzrad.com <http://gradients.glrzad.com/>`_ was quite nice for visualizing the gradient design.

The most noticeable difference is of course the fonts. If your browser supports it (and many, many will) you'll notice Orbitron_ headings and *Latin Modern Roman* text for what I think to be an interesting mix of sci-fi titling and classic lettering (albeit with some modern sensibilities) by way of the textbook. (*Latin Modern Roman* is a descendant of *Computer Modern*, one of the most classic fonts in computer typesetting, particularly academic work.) Both are awesome free fonts, and I have to thank Kernest_ for the currently free, optimized hosting of awesome free fonts. I intended to host all of the fonts for my webpage by myself, but due to security protocols in Firefox I couldn't use my normal S3-based static file hosting approach. (S3 currently doesn't support ``Access-Control-Allow-Origin`` headers.)

So, yeah, I'm surprised that my taste for this design style has lasted as long as it has, but this refresh may keep around for another few years. I'm still tweaking it, but hopefully for y'all that care about my website's design sensibility you might be pleasantly surprised by it. (I think it is awesome.)

.. _Tango: http://tango.freedesktop.org/Tango_Icon_Theme_Guidelines
.. _CleverCSS: http://www.github.com/worldmaker/clevercss/
.. _cssmin: http://pypi.python.org/pypi/cssmin/
.. _CSS3 Gradient Generator: http://gradients.glrzad.com/
.. _Orbitron: http://www.theleagueofmoveabletype.com/fonts/12-orbitron
.. _Kernest: http://kernest.com