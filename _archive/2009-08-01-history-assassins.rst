---
date: 2009-08-01 00:17:47.708095
db_id: 539
db_updated: 2009-08-02 16:57:24.292090
layout: post
tags: games game-design assassins enlark
title: A History of Assassins
---
Tonight, my company Enlark_ is "officially" announcing that we have a
game opening up as an open beta called Assassins_. This is a simple
social game, with what I think to be an interesting history, that in
this particular beta incarnation is Facebook-based web moderated
version. I thought it would be interesting to post some of that history,
plus a few technical tidbits for the so-inclined, here on my blog to go
alongside the "soft beta launch".

If you are interested in playing send me an email, or hopefully there
might be some "looking for players" posts at the `support forum`_. I'm
also going to talk to a couple of groups from my college to solicit
early "seed players".

.. _Enlark: http://enlark.com
.. _Assassins: http://x.enlark.com/games/assassins
.. _support forum: http://getsatisfaction.com/enlark

I believe I was introduced to Assassins sometime during random internet
wanderings during high school. (I have an interest in ARGs and Assassins
is very much a proto-ARG.) If not, I definitely encountered it in Dave
Barry's satirical novel, *Big Trouble*, when I read that book senior
year of high school (2001-2002) in anticipation of the movie. [1]_ *Big
Trouble* uses Assassins-related hijinks in one of the many subplots. I
spent days at one point late in high school reading the various rules
that the Cambridge Assassins Guild had used over the years. 

When I arrived at the University of Louisville's Speed Scientific School
(renamed to the J. B. Speed School of Engineering during my
undergraduate studies), we played several games using a PHP-based web
moderation system, designed by Aaron Hatfield who graduated just before I
arrived. The moderation system had a very simple, minimalist
"tracker" for game progress, taking some of the boring moderation duties
and "paperwork" out of the equation for the person writing the game.

Assassins is a game that has several related rules sets and can be just
as easily be done solely on pen and paper and by the honor system (as
some games have been done). The minimalist "tracker" places a "secret"
in the hands of each player and makes that secret the right of that
player's assassin and the mark of a successfully completed contract.
The web moderator can use these secrets to acknowledge the contract and
assign new ones.

Several years later, in part of a larger effort [2]_ I ended up writing
a black box reinterpretation of the earlier PHP-based system in Python
for the Django framework. This version was used for a couple of years at
the end of my undergraduate career...

Way back in Ought Seven, the Facebook Platform was announced and I
immediately knew that the social network was the perfect place for a
simple social game like Assassins. I started work on adapting my Django
application to a facebook application, but school and other priorities
caught up with me and I let the project slip. (In the process I did
contribute a few bits and pieces to PyFacebook's development.)

Here we are and to my chagrin there still doesn't seem to be a social
game on Facebook with nearly the appropriateness or applicability to
one's social network as Assassins has. I'm hoping that it will indeed
rise to be one of the best games on Facebook...  The beta still has a
ways to go before that, I'm sure though. Even without any bugs in what
is accessible at this hour, there is still plenty left to do in making
it look prettier and an interesting list of future features on my TODO
list.

For the technically curious, the version that is in beta is related to
the Django application, but has ended up being nearly a total rewrite
from it, because I retargeted it to run on Google's App Engine. I'm
hoping the GAE rewrite will keep the game relatively cheap to run, and
extremely scalable. It's still Python, however. I opted to use FBML
entirely, and right now the only biggest request to Facebook is solely
to get a user's timezone during object creation or update; just about
everything else is (happily) handled with FBML tags. I created a simple
utility class for working with Facebook on GAE, and with a little
documentation I may publish the class as open source, probably
submitting it for review by PyFacebook while I am at it.

It's not the biggest game in Enlark's stable, nor the most interesting.
It has been a small side project with nibbles here and there and then a
decent sized chunk of time this month. I'm hoping, however, that lots of
players will have *fun* playing it.

As I said, feel free to let me know if you have (a group) interest in
playing it. I'm going to see if I can get some early beta testers to
pound on it for a few weeks, and then I'll more publicly post the
appropriate URLs (and submit it to the Facebook application directory).

----

.. [1] The "funny" story there, being that *Big Trouble* was not a huge
   success as a film due to some woefully unfortunate timing: the film
   was originally scheduled for theatrical release in September of that
   year and the climax of the book/film involves a satire of airport
   security.

.. [2] A story for another time, perhaps; although partly discoverable
   from past blog entries.
