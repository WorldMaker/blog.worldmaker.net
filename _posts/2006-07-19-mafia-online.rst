---
date: 2006-07-19 19:04:32.092761
db_id: 238
db_updated: 2008-02-21 15:16:47.975104
layout: post
tags: game-design mafia world-design
title: Mafia Online
---
I've wanted to write a web-based version of `Mafia <http://www.princeton.edu/~mafia/rules.htm>`_ for some time.  Now that I have a version of `Assassins <http://www.speedcouncil.org/assassin/>`_ under my belt (plus a Tournament Engine that hasn't seen use yet, but is certainly ready for it), I think it may be time to contemplate a version of Mafia.

One of the interesting things I've considered is doing some cross-play between Assassins and Mafia, to reconnect the game to the physical environment.  I could certainly reuse the Assassins data structures for keeping track of player status, at the very least.  I was thinking that the Mafia could assign their kills to Contractors, and those would create Assassins Contracts.  The lynching at the end of the day could be put out as a "Wanted Poster", in that every player (excluding the lynchee, of course) would get the contract.  Mafia may even be the perfect excuse to make use of Contract Bounties, which are stored but not used by Assassins.  I'm not sure what the repercussions of Bounties might be, though.  I also haven't quite figured out the role of the Contractor, either, but I'm guessing that good paid Bounties might have something to do with it.  Without Contractors the Mafia have to do all their own kills, which provides a very interesting out of band set of clues to track, so it would be in the Mafia's interest to hire Contractors, and I'm guessing high bounty scores probably would be the key to getting Contractors.  Bounty scores then add an interesting amount of personal interest (and personal ranking) to what is generally a social dynamic game, and I'm curious as to what effects that might cause.

Even without bounties, the Assassins Contracts within Mafia would give players more ways to influence their `Leaderboard <http://www.speedcouncil.org/assassin/leader/>`_ position.  If Contractors weren't specifically set as for hire and instead were just any possible Civilian, it gives a game's Mafia ultimately the power to choose to award "easy" contracts (because you don't have the competition of an Assassin's game) and thus some control of the Leaderboard, for the possibility of maybe giving friendly nudges up the leaderboard to friends/family.  Should completing a contract have consequences, though?  What if someone botches a contract or can't complete it in a reasonable time?

I think there some very interesting things to try here, I just need to spend a bit of time distilling out what would make an interesting, repeatable, game.