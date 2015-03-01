---
date: 2008-08-10 01:16:06.912036
db_id: 483
db_updated: 2008-08-10 01:36:48.353719
layout: post
tags: darcs coding decentralization
title: 'Darcs Workflow: Completely Distributed Pull-Only Workflow'
---
I'm writing this as a a rough for potential rewriting for the darcs_ wiki section on workflows.  My post on `getting the most out of Darcs 2`__, through feedback on the darcs mailing list has actually been rewritten into patches for the official manual of darcs.  When those get accepted it will mark my first official contribution to the darcs repository, which is pretty cool.

__ http://blog.worldmaker.net/2008/aug/04/users-guide-darcs-2/
.. _darcs: http://darcs.net/

One of the fascinating things about a DVCS is that first **D**, *distributed*.  There are models for working with source control opened up by a good DVCS that would have been unimaginable under a centralized system.  It's still hard to advocate them to users because they sometimes take a mental leap that sometimes seems unmanageable.  I'm personally fascinated by these sorts of workflows and I think that darcs is still the best of breed when it comes to allowing projects to experiment with them.

I don't know of any group currently doing fully distributed development with darcs (however, I'd be happy to hear comments about such development), but I use partly-distributed development on my own projects and with darcs there are lessons here that apply to even partly-distributed development.

I will use ``http`` URIs because it is very easy to set up a simple web server solely for read-only file sharing on every developer's machine, in any operating system environment.  I'll use three example developers on local hostnames generically named ``deva``, ``devb`` and ``devc``.  The basic theory is that each developer keeps at least one private working repository for the project and one special public repository for the project accessible via ``http``.  I'll use the generic name ``project`` for an example project, thus the public repository for ``deva`` for this project will be available at ``http://deva/project/``.  The only developer with write access to that repository is ``deva`` and for everyone else it is only read-only accessible via ``http``.  Notice that this is a very easy security setup.  A good corporate firewall then should easily block as WAN-based (internet-origin) attempts to access the internal repositories.

.. note::
  Aside: I've mentioned before that I think the killer protocol to support for a distributed environment is XMPP (aka Jabber or GTalk), where you have a central server to ping for repository status updates (is this repository currently available for pulling from?), but changes themselves are still sent securely and directly between systems, without touching a central server.  I'm not going to XMPP addresses, as no DVCS currently supports them.  If someone wants to implement bots for doing it with darcs I'd be happy to point out where to start, and it should actually be a fairly simple thing to build.  If you want to imagine it anyway, in the following just replace something like ``http://deva/project/`` with ``xmpp:deva@corp.example.com/project/``.  Note that in this case you can easily use XMPP authentication and authentication lists for some pretty powerful security setups.

The pull-only fully-distributed workflow for each developer is pretty simple (forgive the unix-isms, but they should be generally readable to Windows users as well, one benefit though is the standard ``user@system`` prompt):

.. sourcecode:: bash

  # Update the latest public patches from fellow devs
  deva@deva:~/project/working/$ darcs pull http://devb/project/
  # ...interactively decide what to pull...
  # ...fix any immediate collisions with working code...
  deva@deva:~/project/working/$ darcs pull http://devc/project/
  # ...ditto...
  
  # Push reliable, tested patches to own public repository
  deva@deva:~/project/working/$ darcs push ../public/
  # ...interactively choose the good patches...

There are a couple things to note here as they become even more important later on and can't be overstated: Each developer only pushes to their public repositories patches that they've integrated, test and personally "trust".  Because this is the repository every other developer pulls from, it needs to be kept extraordinarily clean.  Requiring automated tests in each developer's public repository is one way to help insure this is always the case.

So the first easy complaint is that every developer ends up having to do a pull for each and every other developer, how can that be maintainable?  This is a complaint I'll come back to in greater detail further down, but the easy early answers are: this can be automated in a quick script (there is also repository completion in some shells when working with darcs), but more importantly this is necessary an "every time I'm working" thing.  A developer may only pull changes from other developers once a day or once a week, depending on the project and the project's needs.  A lot of this precipitates out of normal development conversations and workflows: issue trackers highlight when new important fixes are available in a developer's repository, mailing list and hallway discussions include sentiments like "You really should grab feature *x* from devb" and "You need to pull bug fix *y* from devc ASAP."

This is also the perfect time to introduce a powerful weapon in the darcs arsenal: ``--intersection``.  Following the early assertion that developers only push patches that they vouch for, it is very easy for ``deva`` to check for patches that both ``devb`` and ``devc`` agree on:

.. sourcecode:: bash

  deva@deva:~/project/working/$ darcs pull --intersection http://devb/project/ http://devc/project/

There is still good reason to check each developers' individual repositories as well, but consensus checks can easily be done more often and developer to developer communication can help surface times when individual repositories need to be checked.

Release by Consensus
=============================================

The next easy question: how do you do release management in a fully-distributed system?  I've just shown the key tool to do that: ``--intersection`` and "consensus repositories".  A build manager with a smoke test build system that I'll nickname ``bbq``, because it's tasty, on deadline day can very easily grab a consensus build, smoke test it, maybe build-bot it, tag it, and ship it with very little direct contact with the developers:

.. sourcecode:: bash

  buildman@bbq:project/$ darcs get --intersection http://deva/project/ \
      http://devb/project/ \
      http://devc/project/ \
      release-`date +%F`
  # ...testing, testing, more testing...
  buildman@bbq:project/release-2008-08-09/$ darcs tag -m "Release `date +%F`"

The other developers may be encouraged to grab the tag patch so that they can recreate the tag in case of bug reports, but that may or may not be necessary.

Note all of that can be scripted and automated.  You could following the same formula for automated daily builds (although you probably don't want to tag every daily build) and continuous integration build bots.

Scalable by Starfish
===========================================

Back to the first question of maintainability and scalability: It's obvious that everything here is pretty easy with a three-developer team example, but how does it scale?  How do keep from winding up with exponentially long pull scripts for each developer?  At first that might even seem like a deal breaker as a project grows...  it doesn't seem like fully-distributed scales very well.  A key to doing such scaling is to realize how such systems scale naturally, sometimes called a "starfish" model.

Let's say that the project doubles from 3 to 9 developers.  You could give each developer a script to pull from 8 other repositories, and that's not a bad option, but let's instead break developers into working groups of 3, because 3 seemed to be a good organizational number before we theoretically doubled.  I'll call these working groups generically ``wg1``, ``wg2``, and ``wg3``.  I'll still use ``deva``, ``devb``,  and ``devc`` for our three developers in each working group, but now I can qualify them with working group such as ``deva.wg1`` for the ``deva`` of ``wg1``.

Just building automatic consensus repositories for each working group cuts the number of repositories to check for updates in half to 4, but with an obvious hierarchy on how often to check them:

.. sourcecode:: bash

  # Pull fixes and features deva is not directly working on from wg2 and wg3, every so often
  deva@deva.wg1:~/project/working/$ darcs pull --intersection http://wg2/project/ http://wg3/project/
  # Pull consensus fixes and features from fellow working group devs, more often
  deva@deva.wg1:~/project/working/$ darcs pull --intersection http://devb.wg1/project/ http://devc.wg1/project/
  # Pull fixes and features from fellow working group devs, as needed for what you are working on, occaisionally
  deva@deva.wg1:~/project/working/$ darcs pull http://devb.wg1/project/
  deva@deva.wg1:~/project/working/$ darcs pull http://devc.wg1/project/

Assuming that the working groups are each working on parallel features and fixes you don't really need to grab the non-consensus patches from the other working groups, bringing us down to 4 repositories and 4 pull commands...  If you break that assumption you'll just add two additional pulls.  Also note that the build manager still only has three repositories to check (just the working group repositories, thus building a consensus of the consensus repositories).

But, let's optimize a bit further, let's say that each working group has a good project manager, who is not quite a developer, but can perform conflict resolution and integration, and maybe it's just a developer wearing a second hat.  Instead of using automated consensus integration for the working group you can have each working group host an integration build:

.. sourcecode:: bash

  # Integrate changes from other working groups, often
  pman@wg1:~/project/integration/$ darcs pull http://wg1/project/
  pman@wg1:~/project/integration/$ darcs pull http://wg2/project/
  # Integrate consensual changes from devs, occaisionally
  pman@wg1:~/project/integration/$ darcs pull --intersection http://deva.wg1/project/ \
      http://devb.wg1/project/ \
      http://devc.wg1/project/
  # Occasionally pull important, specific changes from an individual dev
  # Generally as needed, such as in the case of an emergency bug fix that needs to be
  # integrated across the project ASAP
  pman@wg1:~/project/integration/$ darcs pull http://deva.wg1/project/
  pman@wg1:~/project/integration/$ darcs pull http://devb.wg1/project/
  pman@wg1:~/project/integration/$ darcs pull http://devc.wg1/project/
  # ...Test!...
  # Update the public integration branch
  pman@wg1:~/project/integration/$ darcs push ../public/

This is a bit more work than an automated consensus repository, but it provides an important vector for patches in the working group that need to get out immediately (without developer consensus) and for changes from the other working groups to filter into a working group faster than by consensus of both working groups.

For the individual developer, we've simply reduced the workflow to something resembling the original three person example, if not in fact subtly simpler:

.. sourcecode:: bash

  # Pull fixes and features from the local consensus, as well as integrated from the other groups,
  # every so often
  deva@deva.wg1:~/project/working/$ darcs pull http://wg1/project/
  # Pull fixes and features from fellow working group devs, as needed for what you are working on, occaisionally
  deva@deva.wg1:~/project/working/$ darcs pull http://devb.wg1/project/
  deva@deva.wg1:~/project/working/$ darcs pull http://devc.wg1/project/

Integration branches scale in a similar manner to this example and what you see is that in the end the overall pattern that this mirrors is the traditional hierarchy of a business.  The interesting difference between the reversal of the traditional command and control flow of information.  Rather than in the centralized world of "once I finish this change I push it the central repository owned by the project manager" it's instead, "the project manager should pull my change once I finish it into his repository".

It may not be immediately obvious that there are benefits to one over the other, but I think it might be suggested that the distributed model here is actually superior when you do boil it down to communication terms: the project manager as integrator has to take an active role in knowing what is done and reviewing what is ready for further release.  The integrator has to review patches and specifically pull them into an integration branch, making a decision on whether that patch is ready for being passed both to subordinates and colleagues.  Similarly the integrator has to have active knowledge of colleagues' activities to know what in turn to pull in from the other groups that subordinates might need to inter-operate with or experience or use to their advantage in their own tasks.  Basically, it encourages **every** developer to be an active patch reviewer, including various arms of project and task management.  Maybe that sounds like a lot of responsibility, but I'm betting it's a lot more good, active communication about project status than is traditionally represented solely in a central commit log with only the oversight of check-in security and "maybe" patch reviews...

Anyway, I hope that this illustration of taking a DVCS "seriously" as a tool for complete source control redistribution might be at least informative and provocative.  As I said in the preface, even in hybrid "partly-distributed" operation some of these ideas (consensus branches, pull-only sub-graphs) can be useful.