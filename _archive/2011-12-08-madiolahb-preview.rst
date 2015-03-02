---
date: 2011-12-08 00:47:49.477896
db_id: 721
db_updated: 2011-12-08 00:48:51.303986
layout: post
tags: games game-design bhaloidam madiolahb
title: Madiolahb Preview
---
I've uploaded a first preview build of the Madiolahb_ library [1]_ on PyPI_, which means that you can install this preview release with ``easy_install`` or, better yet, ``pip`` if you have Python and one or the other installer on your system.

.. _Madiolahb: http://pypi.python.org/pypi/madiolahb/
.. _PyPI: http://pypi.python.org/

The latest `Madiolahb documentation`_ is now also up on PyPI and this will be where I will keep it up to date now. I'm going to slack on updating the appspot site until I've got a preview build for the REST API.

.. _Madiolahb documentation: http://packages.python.org/madiolahb/

The big deal here is that Madiolahb is now a standalone library (the AppEngine code will depend on it rather than vice versa) and that it has a command line script (just ``madiolahb`` when installed via ``easy_install`` or ``pip``). You can explore the API in Python if you wish, or you can try to `Play By Command Line`_ using JSON (or YAML if you prefer) files and command line pipes. It has useful starter help documentation (``-h``), and I think a very good tool to start examining.

.. _Play By Command Line: http://packages.python.org/madiolahb/api.html#play-by-command-line

There are a lot of known bugs and unfinished commands. It's still not quite "Bhaloidam standard" yet, but getting there. There are a lot of things I need to redocument or document for the first time. I need to start on the REST API handlers. I want to get the old text parser back together (and available from the command line). I should get code pages up on my website with the change log and a link to an up-to-date source repository. But this is a decent starting point. I think the command line feel here (bugs withstanding) should provide some idea into my thought processes for Madiolahb and a decent idea of where it is going. Feedback is welcome/encouraged.

----

.. [1] Madiolahb is my laboratory/API for Bhaloidam_.

.. _Bhaloidam: http://bhaloidam.com