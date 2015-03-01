---
date: 2011-11-04 01:02:48.600696
db_id: 720
db_updated: 2011-11-04 01:02:48.600720
layout: post
tags: games game-design assassins
title: The Secrets of Assassins
---
Enlark's version of Assassins, a platform I put quite some work into but few played, has been down for a few months now. Partly because I didn't feel like updating through the hoops and changes of various Facebook APIs, but mostly because I deactivated my Facebook account entirely.

I haven't figured out what the next steps are for its code base. While I'm still pondering that, I thought I'd post `The Secret of an Assassin`_ which is a simple phrase generation toy. Use it to generate a fun passphrase or to amuse yourself for a short handful of minutes.

Secrets in the Assassin game are passwords to share upon a player's "death" which are plugged into the system to authenticate the completion of a contract. In previous iterations these were actually passwords, and in variations I've seen elsewhere (and nearly implemented) they can be QR codes. For the most recently version of Assassins that I wrote, I wrote a simple pass phrase generator that amused me. Few people actually played with that generator in the context of Assassins, so feel free to learn `The Secret of an Assassin`_ or two. The idea was that they should be amusing, but easy to remember and pass on. (I supported sending those messages via the (Facebook-embedded) website, email, IM, and Facebook's SMS, so they probably didn't need to be memorable for long.) I liked the idea of a non-sequitur "last words" pass phrase better than some assortment of random symbols and/or letters. To some extent, I also liked it better for its social interaction than QR codes.

The basic structure of the generator (and all of my work on Assassins) predates `the xkcd on the subject`__, but that comic is great if you want an idea why pass phrases are great. This particular version was rewritten in a PEG-esque grammar tool of my own concoction. It's probably something that would be worth uniting at some point into a true PEG producer/parser. (Parsing in Assassin's was handled through multi-field input and/or a basic string split depending on interface.)

__ http://xkcd.com/936/

Now, the number of possible combinations may seem low (although, with the current grammar its on the order of a 6-digit password with modern "high security" [1]_ restriction of at least one number and one symbol from a small possible bag of symbols-- it won't be too many more words in the vocabulary before I hit the magic 8 minimum most sites use today), but that's given the knowledge that it is built from this particular grammar and vocabulary. Presuming you could solve the social engineering issues that would leak that fact to the black hats in your life, the passphrases should be very nicely high entropy. Obviously, use one of these secrets as the basis for a major passphrase at your own risk, but they should be perfectly acceptable for "xkcd passphrases" if you want to play with them.

----

.. _The Secret of an Assassin: http://unlore.com/assassinsecret/

.. [1] I could spend all day talking about security theater, the terrible shame that "common practice" for passwords is so terribly abysmal and that passwords are so weirdly restrictive for those of us that actually sometimes care about our password security...