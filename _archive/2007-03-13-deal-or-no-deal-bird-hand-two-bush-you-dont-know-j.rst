---
date: 2007-03-13 01:53:22.868535
db_id: 314
db_updated: 2008-02-21 15:16:46.020019
layout: post
tags: game-design games
title: 'Deal or No Deal: A Bird in the Hand, Two in the Bush, You Don''t Know Jack'
---
First of all, there is new entertainments to be found at `You Don't Know Jack's Net Game 2 Beta`__ [#]_.

__ http://www.youdontknowjack.com

Last Monday, having watched *Deal or No Deal* only for its value in signaling that *Heroes* has started it came to me to do it as a school project.  So I wrote up a quick merciless web-version called "Acceptable Compromise or Unacceptable Compromise" and populated it with a trio of penny-pinching Robotic Bankers versus a random assortment of friends.  I may not be an expert on *Deal or No Deal*, but I now know way too much about the game and the way people play the game...

I'll save most of my commentary for the final report, but the obvious thing that I've noticed is that generally players fall into two categories: those that follow "a bird in the hand is worth two in the bush" and those that do not.  Some players have a decent idea of the probabilities involved in the game and others do not.  A bank offer is often worth more than any possibility of having a certain case, because one is "cash in hand" and the other is "maybe there is twice as much in this bush".  Obviously I'm overgeneralizing, but perhaps the big thing here is that in the end the game is no more than a lottery and neither type of player really ever, in the long run, "wins".

I think I myself have become a member of a third class in the course of this work.  I'm really evaluating the performance of the banker algorithms and the measurement by which they are tested is not the final payout or the final "deal" (wanted ($1,000,000 vs. payout) or won (payout vs. "own" case)) but instead the "entertainment value" which is the simple ratio of payout per round of play.  The game wants people to spend as long as they can to get the least payout they can.  They are trying to fill an hour of television and so ultimately this payout/rounds is related to the cost per hour to film the show.  Eventually cost would be compared to ratings and ad revenue, but cost is still the biggest indicator of a banker's success.

From that view, a winning player is one that gets the highest payout the earliest in the game they can, because this plays exactly against the banker's intention.  So, is the bird in the hand right now worth two in the hand an hour from now?  I'm coming to think so.  Basically, *Deal or No Deal* isn't just a lottery, it's a lottery in which a contestant is given manual labor as a necessity to produce lottery winnings. [#]_  The manual labor is "be an interesting person, say interesting things, choose random numbers, push or do not push a button".  The payout per round effectively gets tied into your wage (payout per hour).  Is the length of time you play the wind-up monkey for the television cameras worth the payout you receive in the end?  The average amount of money a person could make per television hour of game play (assuming going all ten rounds to the final reveal, and one game per player per hour) is around $113,000.  Admittedly $113,000 is much, much higher than, say, minimum wage [#]_, but it still begs the question how much that time is worth to you.  Other factors apply, of course, and not everyone in the country sees being in front a camera as work.  I'm curious as to how the payouts might compare to the average hourly wage of a television series lead actor...

Anyway, long rant aside, there were two guys on tonight's show that both had the million dollar case as "theirs" and both sold it.  The show plays them off a bit as "losers" for having "given up" their chance at a million, but as I was pointing out, there are many more factors to judge a game by rather than just what's in "your" case.

Also, I'm very tempted to build the reverse game (you play the banker against a set of evil money-grubbing robots or maybe other players) now that I have this better view of the game...  I originally thought that the banker was almost useless, but now I'm starting to think that maybe playing the banker is the much more interesting game.

.. [#] *The Net Game* was originally on Bezerk as a 7-question, 1 episode at a time distraction from the real world.  This new Drupal-based "beta" website [#]_ is definitely *The Revenge of The Net Game*.
.. [#] Some manual labor jobs are a lottery anyway, due to the whims of middle and upper management...
.. [#] Assuming no other perks: 3 out of every 26 players won't earn minimum wage if they played a full television-hour.
.. [#] In the grand Web 2.0 fashion/tradition