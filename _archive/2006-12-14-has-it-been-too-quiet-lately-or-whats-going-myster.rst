---
date: 2006-12-14 03:11:45.270858
db_id: 289
db_updated: 2008-02-21 15:16:46.590205
layout: post
tags: computers game-design games
title: Has it been too quiet lately?, or What's going on with that Mysterious Project?
---
I realize I haven't posted in a while.  I also realize that because of that my website was down for a week.  I seem to have a memory throttling issue and haven't taken the time to track it down.  I'm running on a Virtual Machine with a soft memory limit and I'm thinking that Postgres and Apache 2 are having a hard time staying within that limit...  If anybody has any ideas I'd love to know.

I've been working on a project that I believe should hit "critical mass" shortly.  Once the contract is signed, and I'm hoping it may be soonish (I'm waiting on `my dad <http://www.battcherlaw.com>`_ to have the chance to review it so that we can go over it), I'll probably put more effort into dev-blogging the work.  Right now I'm in a bit of a lull as I do research quests and internally debate some of my next steps.

It's been slower going than I originally hoped, but partly that is because I forgot about the destabilizing force of Holidays.  The next few weeks could be worse (Xmas), but I have a few ideas to keep that from happening.  Then I just have to worry about the interruption of my mini-vacation (going to the Orange Bowl for sun and sports), and the interactions with a full course load in the Spring.  I'm torn between the idea of cutting the course load for the Spring for the project and the realization that I may hopefully be only a busy Spring away from the long sought first diploma...  I continue to debate bringing in a few more "employees" to help with the work load.

So far I've mostly been working on the model ("business logic") for the project.  It's tough to blog about in this particular case both because I can't describe it too much without feeling I'm disclosing too much to early and mostly because the model is always a tough nut to crack.  Modelling any sort of business logic, for me at least, is an interesting task in gestault art, boiling down real world Objects into a few defining Properties ("What does the gun do?"  "It shoots bullets.") and the methods in which  their states change.  Even my source control patches are unfortunately jumbled and sometimes "incoherent", but I've got something "showable" (IronPython console runs) and I'm on the edge of coherence and stability, with a real TODO list and coherent patches.

Probably what has made this particularly daunting this time is that the model was the wrong place to start.  There aren't any real wrong places to start, but here my goal was to have something demonstrable as early as possible.  This is a laudable goal (and pushed by the Agile methodologies), and yet I'm worried about integration challenges as I settle on "lower" framework decisions.  Hopefully if I designed things right I've already foreseen and forestalled major integration challenges, but you never know until you get there.

Here's a few of the Framework decisions that I have decided upon or in the process of debating.  They should be general enough that they apply to a wide variety of projects.

XNA Framework
    This was one of my first decisions and relatively a no brainer.  I very much prefer C# to many of the alternatives and the potential to personally test on my Xbox here is quite tempting.  Dreams of XBLA titlehood dance in my head.  Official 1.0 Launch was Monday, meaning the Framework is good to go and I don't have to wait for it before I can release and deliverables.

Windows Communications Framework/.NET 3.0
    Spelled WCF and pronounced Indigo, this decision is on my "tough call" list.  Tying the application to both XNA and .NET 3.0 may be painful to future downloaders of the finished project, although hopefully they should go entirely unnoticed.  The benefits of WCF, however, are many.  Hopefully I'm not giving up too much of my farm by say this, but the WCF may be a key to succesfully (and hopefully quickly) meeting my business plan.  Maybe I'll discuss some of this as I get deeper into the project.  .NET 3.0 was officially released in November.  I still haven't decided how "deep" to use WCF, but it will certainly be in a few key places.  I'm doubting the 360 will see a version of .NET 3.0 libraries, particularly WCF, and so I realize anything that does require it will most likely be Windows only.  Certainly an XNA Networking announcement could destabilize to some extent my current plans, but hopefully I'll be designing to avoid any huge "oh crap" moments.

The Amazing B+ Tree
   I want a "database" to optimize the storage of some particular data, and did a brief search.  I looked at `db4o <http://www.db4o.com>`_, but their licensing is too restrictive for this project and I disagree with their interpretation of the GPL, maybe I'll write a deep rant on the subject sometime.  I debated using a more traditional RDBMS, but it seems too heavy for my purpose.  Then I rediscovered the wonders of the B+ Tree and decided that I may be best off just writing my own specialized "database".  I felt rather enlightened when I had the realization that I could just do it myself (I have the knowledge, and amazingly classes came in handy) and relatively quickly.  For the most part I try to avoid NIH Syndrome (Not Invented Here), but in this particular case I think I'm justified.  Also, I found what looks to be a good reference implementation that's BSD licensed (not to mention that I believe I may have my own reference implementations still lying around somewhere, maybe).  Best case I use it out of the box and worse case I mangle it into something that fits better.  ("We can rebuild it.  We have the technology.")

Torque X
    This has looked like a good plan since I decided upon using the XNA Framework.  I'm still curious if other useful alternatives might show up in a reasonable time frame, but I'm probably close to making a final decision on this.  They official launched an "Open Beta" on Monday and I'm a bit worried what this might say about the time frame.  I'd hate for this to be the sole blocker when it comes time for me to attempt a launch, but I still have a few weeks to finalize this decision and it's probably not a big deal.

Amazon S3
    This cheap storage solution just may be the key to a few more key features I was looking for.  I'll be coming back to this much closer to the end of this process, but it's good to know about it now as it keeps me from worrying when it comes time to do those few things.

Django
    At this point I definitely don't think I could give up on my server-side friend when it comes time to create the website, which should be some really sweet icing on the whole cake.

So there you have it, another week of work, another reevaluation of a million decisions and brief look into my thought processes as I attempt to boot-strap something that I certainly hope will be big, bold, and profitable.  If this were a better dev-blog you might see some hint as to what my next topic might be and how soon to expect it, but I'm flying by the seat of my pants still and your guess may be better than mine.