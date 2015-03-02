---
date: 2008-08-04 11:41:25.862731
db_id: 481
db_updated: 2008-08-07 04:55:46.838219
layout: post
tags: darcs
title: A User's Guide to Darcs 2
---
I've been slowly working to push all my systems to using darcs_ 2.
Darcs 2 has some major new features and more importantly some great new
ways to get more performance out of darcs.  However, to truly make use
of these improvements there are a few changes from a darcs 1 setup that
are quick to make and well worth the effort.

.. _darcs: http://darcs.net/

Enable a Global Cache
=====================

Before anything else you should enable a global cache, as this one of
the biggest performance enhancing tools of darcs 2 and you'll benefit
the most from the following suggestions if you enable the global cache
first.  The global cache acts as a giant patch pool where darcs first
looks for a patch when grabbing new patches, thus you want it to be on
the same file system as your repositories.  On file systems that support
the cached patches are going to be hardlinked (the patch is only stored
once, but represented in multiple places) across all of your
repositories.

To enable a Global Cache:

.. sourcecode:: bash

  $ mkdir -p $HOME/.darcs/cache
  $ echo cache:$HOME/.darcs/cache > $HOME/.darcs/sources

In XP or Vista you can run the same commands from ``cmd.exe`` (Command
Prompt) ignore the ``$`` prompts and drop the ``-p`` from the ``mkdir``,
replacing ``$HOME`` with ``C:\Documents and Settings\*Username*`` or
``C:\Users\*Username*``, respectively.

There are some other advanced things you can do in a `sources file`_,
such as create per-repository caches, read-only caches and even set a
primary source repository above any used in a ``darcs get`` or ``darcs
pull`` command.

.. _sources file: http://darcs.net/manual/node5.html#SECTION00510070000000000000

Grab Hashed Repositories 
======================== 

Once you've got a global cache set up the fastest way to start making
good use of it is to start working with hashed repositories.  In
addition to making use of the global cache and automatic "lazy" loading
of patches, hashed repositories have better patch and pristine
management, making darcs repositories safer from corruption and bad
tools.

To get a hashed version of a darcs 1 repository simply:

.. sourcecode:: bash

   $ darcs get --hashed old-repo new-repo

To get the most from darcs 2 you may want to convert, at the very least,
all of your local working versions of darcs 1 repositories to hashed
repositories.  Darcs 2 can ``push`` and ``send`` from a hashed
repository to a non-hashed "classic" darcs 1 repository, without any
problems.  You just have to be aware that if you share a hashed
repository other people accessing the hashed repository will need darcs
2.  You can use ``get`` or ``put`` to create a non-hashed copy for
publishing to darcs 1 users.

You *can* initialize a new repository in the hashed format by ``darcs
init --hashed``, but if you are starting a new project and expect it to
be used entirely by darcs 2 users your best bet is to use the new darcs
2 format.

Use Darcs 2 Format
==================

For new projects it makes a good amount of sense to require darcs 2 for
all developers and to make new repositories in darcs 2's new format.
The darcs 2 format fixes some long-standing darcs 1 format issues, at
the expense of direct interoperation with darcs 1 installations.  If you
*must* support darcs 1 users, use the hashed format above as much as
possible.  If you are starting a new project, push developers to darcs 2
and use darcs 2 format.  Starting a new darcs-2 format repository is
easy and quick:

.. sourcecode:: bash

   $ darcs init --darcs-2

Convert Old Repositories to Darcs 2
===================================

Once all developers on your project have darcs 2 installed, it's worth
considering converting active repositories to darcs 2 format as well.
Conversion is not trivial, but it's mostly painless.  The biggest issue
is that conversion can only be done once for each project (as conversion
results in new versions of some patches that won't convert the same more
than once).  Your best bet is to take a branch that is the largest
superset of your project and convert it, recreating the mainline and
other subset branches from it.  It may be a good time to re-evaluate
some of your extent branches, before converting, and deprecate or merge
them all into your biggest unstable branch.

Conversion is a very simple command in darcs 2, and it will warn of the
above problem that projects should only be converted once (and all at
once):

.. sourcecode:: bash

   $ darcs convert old-repo new-repo

Summary
=======

Darcs 2 provides some new useful tools and it might take a short bit to
become accustomed to them.

=======  =================  =================
Format   Darcs 1 push/pull  Darcs 2 push/pull
=======  =================  =================
darcs-1  Yes                Yes
hashed   **No**             Yes
darcs-2  **No**             Yes
=======  =================  =================

=======  =======  =============  ===========
..              Can Be Converted To
-------  -----------------------------------
Format   darcs-1  hashed         darcs-2
=======  =======  =============  ===========
darcs-1   --      Yes            Yes (Once!)
hashed   Yes       --            Yes (Once!)
darcs-2  **No**   **No**          --
=======  =======  =============  ===========
