---
date: 2007-05-31 17:15:25.939512
db_id: 370
db_updated: 2008-02-21 15:16:45.555234
layout: post
tags: programming
title: 'Darcsforge: Review Board Looks Nifty'
---
The recently released `Review Board <http://www.chipx86.com/blog/?p=222>`_ (`Review Board Project Site <http://code.google.com/p/reviewboard/>`_) Django application looks really nifty.  I've got a few notes on the sort of design I'd like to see for a similar role, and so I may look, when I get to that point, if I can leverage Review Board or at least features from Review Board.

In Darcsforge's case I was looking to build in the medium term some sort of Patch Manager.  The Patch Manager would augment the Patch Tracker (and work hand in hand with the Repo Manager that is a higher priority) in several ways: primarily it would offer the ability to cherry-pick patches and push/pull them into other Repositories.  I think it would be cool to grab the context information, and I'm not sure right now how that would be accomplished, from the patch and then highlight which Repositories can "take" the patch, if they have the context-mentioned patches.

The other side to the Patch Manager would then be to allow people to post Patches as attachments to Issues or other pages.  It would need some basic review functionalities, like review board.  Because a darcs patch is useful in or out of a repository, I definitely seeing this as the place to add some cool functionality like the ability for admins to directly apply an attached patch to a repository or to even quickly provision a new "branch" repository using that patch.  I also think the power here is that all of this could use the same interface; the same Patch Tracker could track both Repository-controlled patches and Patch Manager-controlled uploaded patches...  (The Patch Tracker is something I'm pretty proud of, I'll probably post an entry about it and my take on it...)