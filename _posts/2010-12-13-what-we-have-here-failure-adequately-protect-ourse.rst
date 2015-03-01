---
date: 2010-12-13 21:41:18.862627
db_id: 581
db_updated: 2010-12-13 21:41:18.862647
layout: post
tags: password fail openid
title: What We Have Here is a Failure to Adequately Protect Ourselves
---
It's very odd that we have some great technologies available to secure ourselves on the internet, and yet nearly everyone refuses to move out of the stone age. Passwords are *too* ubiquitous, and prone to breakage (for instance, Gawker's whole database of passwords has been leaked just recently) and bizarre hobbling (bizarre password restrictions that prove people don't understand storage). `Wish-It-Was-Two-Factor`_ authentication is **damnably stupid**-- *let us give ill-informed users a false sense of security by causing them aggravation and annoyance*... that'll certainly work out for everyone.

.. _Wish-It-Was-Two-Factor: http://thedailywtf.com/Articles/WishItWas-TwoFactor-.aspx

My Password is Too Strong?
=================================================================

I've gotten into the good habit of using one-off, psuedo-randomized and cryptographically-randomized passwords. I sync these with free software (KeePass_) across devices via my backup service of choice (`Jungle Disk`_). I don't have any clue what most of these passwords actually *are*, as I only need to copy and paste them most of the time. (I run the risk of someone having physical access to one or more of my devices, but there are device passwords and master passwords in the way, not to mention the fact that they'd may also have to master my control schemes, all of which is better than post-it notes.)

I have discovered two big things that amaze me each and every time I encounter them:

* Some programs don't allow pasting passwords. Most of the time this is the benign negligence of, particularly, games that didn't think to add it when they wrote their own UI widget. (Suggestion: always use the built-in Password text box of your windowing framework, even in a separate "launcher" if you have to. Please.) Worse are the programs that think they are "smart" by blocking one possible (of many) brute force attacks. I'd rather have a strong password that I can't remember and need to paste in then that one simple, stupid "protection".

* Many systems' requirements for so-called "strong" passwords end up requiring weak passwords. Unfortunately, particularly on the internet, there is a such thing as "too strong of a password". Worse, this affliction of disallowing strong passwords seems to be particularly egregious from those that seemingly champion strong passwords! Generally I've found the "stronger" (according to rules that often are usually pretty weak and scoring algorithms that are mistake) a password a system requires, the more likely it won't accept real strong passwords. It is perplexing.

.. _KeePass: http://keepass.sf.net
.. _Jungle Disk: http://jungledisk.com

I feel like I should name names of the offenders, but there are almost too many to name. Every single one of the insurers that I enrolled with a few weeks ago had "strong password requirements", and yet balked when I gave them actual strong passwords!

Support OpenID!
============================================================

I have **real** two-factor authentication on my OpenID, and have for some time. If you don't support OpenID, you are a part of the problem. Period.

Whine about user ignorance all you want or that "OpenID is too hard", but your password system is almost always going to be weaker than my OpenID, and that is a whole lot easier and nicer for me to use than filling KeePass with yet another random password for a site I'll only use once in a blue moon. My OpenID, possible man-in-the-middle attacks and DNS poisoning attacks **included**, is sadly more secure than any of my current banking or insurance providers (current lone exception being PayPal, which actually also supports real two-factor authentication).

If You Can Support Facebook Connect or Twitter Login, You Can Support OpenID!
---------------------------------------------------------------------------------------------------------------------------------

Seriously. If you can only support one federated login system: support the fully open one, support OpenID!