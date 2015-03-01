---
date: 2009-08-18 17:38:17.484159
db_id: 541
db_updated: 2009-08-18 17:38:17.484208
layout: post
tags: games game-design assassins
title: Why Assassins? Plus, Future Features
---
I've posted a `brief history of the Assassins! project`__ and I thought
I might explore more of the hows and whys of the project. I'll even
throw in a few hints of its future and features that are just around the
corner well below.

__ http://blog.worldmaker.net/2009/aug/01/history-assassins/

First thing is first: `Assassins! Profile Page`_ where you can read
about it in the "comfort" of Ye Olde Facebooke Frame, and even become a
fan of it or venture into trying it. (You may want to get a handle on
the `General Rules`_ and `Moderator's Guide`_ before attempting to
create a game, however.)

This is open beta. There will be bugs, and I appreciate any help in
tracking them down. To that purpose there is `the Enlark forum at Get
Satisfaction`__ or you can `email me <me@worldmaker.net>`_.

__ http://getsatisfaction.com/enlark

*Assassins!* is an interesting, and exciting project for me. If the
history post illustrates anything it might be that it is a project I
should have pushed through faster, years ago. It is a return to
strengths that seems necessary at this date. It's also a much better
project for a startup. In "lean startup" terms, Assassins is a good
"minimum viable product" that I can quickly get people playing today and
learn and adapt the game as people play it.

I feel that I should start with what Assassins is *not*: It is **not** a
manifesto, or the best game I could possibly build right now. It's a
game about right now, inherited from the past, designed for everywhere
[1]_, but engineered, in this instance, by me. For what I can to
differentiate the project, I've used my strengths as a writer and lover
of language, and can only hope that those manifest themselves to the
player.

At this point it isn't even a great product, it is a service that might
not even be monetizable. It might not be the best business strategy at
this point to admit that I'm broke and I don't know if I can make money
from my own service. I do feel that I owe history, that I owe players,
the ability to play the core mechanics for free. I've done my best to
mitigate costs and live at "web scale".

At least as a web service, I'm not alone in the "I don't where the money
might come from" business model, even if perhaps I am being openly
candid about it. It's Web 2.0, it's always in beta, it's life on the
modern web. In the short term it is about encouraging people to have
fun, and when the bills are due we'll work to get them paid.

To be honest, part of what of what I've been afraid of is success on the
web. On the web, success can be more startling, more frightening than
failure. At this point the cost of failure is a couple weeks of work.
The price of success has an actual dollar amount and/or player
irritation. Viral is good for web apps, but I for one am afraid of
viral. (I also think that viral can sit too close to spam for comfort.)

Furthermore, and closer to home, I'm afraid of web development. Every
industry, and at times it seems particularly the Games industry, is
still locked in a Chinese wall model where web development is wholly
separate from "real" development. Certainly my preference to a modern
language such as C# already marks me as an "oddball" developer in
gaming, but I've felt that "web games" and "web development" on my
resume was even then too much of a stigma. I don't want to be
pigeon-holed as a "web games guy" and do nothing but web-based projects
for the rest of my life. I want to design for everywhere and use what
makes the most sense for a project. Even if I have strengths in web
development, I still find enough fascination in all forms of art and all
varieties of gaming that I don't want to be a "second class citizen" of
any form...

But enough of my worries, let us recommence talk about the fun stuff.

The Best Game on Facebook is Assassins!
=======================================

While Assassins is not intended as a manifesto or a masthead or a
flagship product for my small, underfunded company by any means, there
is a message that I am hoping to send. I do think most games on Facebook
are awful. There is the meager variation in game mechanics on display,
few of which I feel qualify as "fun", much less the makings of an actual
"game".  There is the endless wells of subtly copied versions of the
same "game", which is the awful feedback loop that continues to
perpetuate the same "games" upon Facebook. Then there's all of the spam,
albeit depending on the general spaminess of your own social graph...

At the moment Assassins has *zero* invites, notifications, wall posts or
stream posts. I'm not going to guarantee that it will continue apace and
"naked", but I'm going to try my best to keep it "organic". Partly
because I want to, for my own sake and ethics. Partly because I'm
masochistic enough to try to walk the minefield that is Facebook quotas,
suggestions, requirements, and privacy stipulations.

Most importantly to me: Assassins currently has *zero* queries into a
player's social graph. It doesn't have anything "suggesting" how you
play or who you play with. **And yet**, Assassins is a truly social game
and requires some sort of social graph to play. The best play in the
game comes not from spamming your social graph to get as many as you can
involved or, necessarily, from finding the hidden cobwebs in your social
graph and getting them involved for completion metrics. The best play
comes from carefully chosen and pruned subsets of a person's subgraph. I
can see adding some help here, but I'm inclined to believe there is a
fine line between nagging and genuine help and I don't think "fun" comes
with nagging.

Features to the Future
======================

It's not active yet, so I haven't been able to test it yet, but I've
written SMS support for contract completion. I'm going to debut how to
do it here and once it is active and tested I'll figure out the best
places to mention it in the documentation. Once enabled players should
be able to complete contracts by texting ``enlark-assassins username says
secret`` (where ``username`` is the new username in Facebook profile
page addresses) or ``enlark-assassins secret says username`` to the
``FBOOK`` short code. I apologize that the ``enlark-assassins`` isn't
shorter, but I didn't feel up to changing it everywhere it appears in
the application just for shorter text messages. Particularly with so
many cellphones providing useful auto-complete tools.

I've also added a simple, preliminary profile tab. I'm not entirely
certain what exactly would be useful for a profile tab, or if one would
be all that generally useful. I'd certainly appreciate feedback on the
subject.

My plan is to work on in-game and post-game statistics over the next few
weeks. That's the most crucial thing that I want to add. I've also been
thinking about ways for tying Assassins games to Facebook events. I'm
not sure all of what I want to do will properly make its way past
Facebook's privacy minefield, however.

I've got other features and ideas for features on my list, and I welcome
other suggestions.

----

.. [1] Raph Koster's slide deck "Designing for Everywhere" is a totem
   reminder on my laptop's desktop. Not that I need it, perhaps.

.. _Assassins! Profile Page: http://www.facebook.com/apps/application.php?id=2395244337
.. _General Rules: http://fbassassins.enlark.com/static/rules.html
.. _Moderator's Guide: http://fbassassins.enlark.com/static/moderator.html

.. vim: ai spell tw=72
