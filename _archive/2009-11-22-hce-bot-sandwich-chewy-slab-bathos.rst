---
date: 2009-11-22 04:46:41.668208
db_id: 549
db_updated: 2009-11-22 04:51:37.461176
layout: post
tags: games game-design hce
title: An HCE Bot Sandwich with a Chewy Slab of Bathos
---
The short story is that this week I relieved some stress and helped
relieve some creative blockage by jumping headlong into over-thinking
and over-working a new project. I'm working on a "`Choreographer bot`_"
for playing games with Corvus Elrod's `HoneyComb Engine`_ online via
wave, email, and IM. I've got a command language parser written (and I
think very well tested at this point) and written up documentation for
said parser, which currently assumes familiarity with the HCE. I'll post
the source code eventually.

.. _Choreographer bot: http://hce-bee.appspot.com
.. _HoneyComb Engine: http://www.honeycombengine.com

I've hesitated to blog it, but most of the longer story should be
familiar by now: I'm running on borrowed passion at this point; this
year has been a huge kick to the groin for me. As is the case with many
works that involve groin kicks, this post may be dark at times, but I'm
trying to keep it on the side of dark humour or at least slapstick. I,
at least, find the occasional bathetic introspection useful to get out
of the system. If you want to invest your sympathy in "Ego credits", may
I suggest applying extra funds to Deirdra's `Life Flashes By`_ project.
Also, I wouldn't be opposed to gifts arriving in my Steam account or
PayPal account, not that I expect any this year... I of course still
continue daily my shingle hanging and search for gainful employment as a
measure of my worth in society, should rumours of such reach little
birdies in y'alls ears. If anyone has any ideas on bankrolling a good
Relocation Fund, that might be useful, too.

.. _Life Flashes By: http://www.kickstarter.com/projects/deirdrakiai/life-flashes-by-a-video-game-about-what-might-ha

I'm used to being my own worst critic. I've grown up very familiar with
the adage that familiarity breeds contempt, and I've seen myself grow
angry at everything from instrument practice to a certain mixture of
stage fright and play practice contempt. The last year has seen perhaps
the largest increase in external criticism that I've felt, and my own
creative self-loathing seems to want to increase mightily to compensate.

I certainly want to blame myself for my own shortcomings, even if I can
coddle myself with the all-around depressing statistics of the current
economy. Even if lots of other people are hanging their shingle out just
as I am, I can't help but pick at the scabs of my own flaws.

I worry that I'm not as creative as I was in High School and that all of
my projects and my project ideas right now *suck* at some deep core
temporal level. I've let some of that manifest itself as creative
blockage, and have rarely succeeded to move past it. Thus far the only
project in the last few months I was able to push forward was
*Assassins!*, a rehash of a project from a couple years back, and to
date no one is playing that.

I wrote a project start for one possible "evil plan", but upon
completion of the first document grew to despise it. I'm still planning
to revisit it, but I'm waiting until I have something particular to say
or someone particular to talk to.

I've got a few ideas to proceed old projects, but haven't felt the
passion needed to touch them. Only a week or so ago did I feel like I
had any new ideas, for the first time in months. I wrote down a list of
three of them that sounded useful...

One of which being the HCE bot that I'm currently working on. It's nice
to have inspiration of any sort, and I'm actually glad to have a project
where someone else can take the passion burden for a change. I respect
Corvus a lot, at this point, and his enthusiasm for the HCE has always
been infectious. Having a chance to play the game at PAX certainly
helped me get a feel for it, and I'm trying my best to capture the
spirit of that in my approach to the bot.

For instance, I've written a much more complicated parser than would be
strictly necessary, but my hope is that it will keep dissonance down
while roleplaying alongside the bot. Parser writing is also a skill I
haven't exercised in a while, and it was nice to jump back in. This
parser takes a few things I learn from old experiments with a language
idea I was once fond of named VEND_ (thanks, Wayback Machine), and some
thoughts I've had writing Inform 7 code. The parser I've written isn't
as sophisticated as Inform 7's approach --- I'm still using a "normal"
parser language.

This is the first time I've written using (Python-inscribed) PEG rather
than traditional BNF. It's been a rather nice experiment, with a few
small bits of unlearning/relearning, but PEG's semantic differences to
BNF relate mostly to Regular Expressions (and the stuff one
learns/considers writing everything by hand recursive-descent style)
and the learning curve in the end wasn't much of one.

I'm working on the backend now, and from there will be work on the
various front-ends to actually use the bot.

It seems like a good project and maybe I'll get some attention from it.
I doubt it will directly help my job search (still too much in the
"weird/unusual" bucket for most (myopic) game companies, even if this is
solid "gameplay programming"), but we'll see, I guess.

.. _VEND: http://web.archive.org/web/20041111092621/http://www.worldmaker.net/tavi/index.php?page=WorldMaker.Lang.Vend
