---
layout: post
title: "Mute More Robots: Ethics in a Time of Massive GIGO"
---

I was given the opportunity to see Microsoft's BUILD conference in person
this year. I came away somewhat disappointed at how much conference time
was devoted to AI topics, and felt that somewhat left me at a different
conference than the majority of the zeitgeist that attended.

This feeling of mine comes not just from a place of skepticism, but a place
of *concern*, and while I admire that Satya Nadella made AI ethics and
responsibility a key topic in the conference's opening keynote, I fear it
is easily a lost message in the hype cycle that is current AI endeavors.

I've been trying to build an ethics framework for my interactions with
social media since the Lovecraftian existential horror moment that lead
to the short story [Astral Plane Meteorology](http://blog.worldmaker.net/2017/10/18/astral-plane-meteorology/).
I've got a lot of notes on the subject, but not a strong set of answers.

I took an AI course in Graduate School, which admittedly doesn't make me
an expert on the subject, but I'm hoping you will concede that it provides
a useful perspective on AI. Of which, my perspective here is mostly one of
*concern*.

A lot of my concerns stem from the fact that almost everything I'm seeing
can be found in the textbook I used in Graduate School, and it was known
then that most of what was found inside hadn't had big reasons to be updated
anytime after the Late 1970s.

Despite this hype cycle, we haven't seen any major breakthroughs, or even
fixed any of the major flaws in the methods of the OG AI booms of the 1960s
and 1970s. What's powering this hype cycle doesn't seem to be bold new
technologies, but instead the conflux of two trends the OG AI booms also
anticipated (and maybe miscalculated how soon they would arrive): the corpus
sizes to train AI upon have bloated to enormous proportions (we call this
trend "Big Data"), and Moore's Law has truly pushed us to an age of vast,
incredibly capable _commodity_ computing power at vast scales (both in how
much computing power we've managed to miniaturize, and in how much computing
power we've managed to network/coordinate/orchestrate in massive datacenters
and a globally distributed internet; we call this trend "The Cloud" a lot
lately, and here we see some of its storms and precipation).

The takeaway that is clear to me, and leaves me awake at night sometimes
terrified, is not that we've solved AI, but that we've *massively accelerated*
Garbage In, Garbage Out (GIGO).

> We've massively accelerated GIGO.

**Big Data** has provided AI algorithms with more potential garbage than ever
before, and **The Cloud** has made it the fastest it has ever been in history
to process all that garbage and spit it back out for presumably human consumption.

I don't want to eat just garbage, but I worry that's a major internet diet at
this point. I've seen too many engineers at Facebook, Google, Amazon, etc, when
pressed about their "AI algorithms" and how they produce their
recommendations/feeds/et al, when they answer truthfully beyond corporate IP
over-protective dodges admit that they don't know much about what's inside the
black boxes, how things are weighted, what sort of training data did what exactly.

The excuse is simply that Big Data is Big. It's too much to sort by humans, so we
let one automated process cluster it so another automated process can ingest it
and another automated process convolute it into some metaphor or another for
cognition, that ultimately is simply some variation of a probabilistic model,
and maybe that one isn't accurate enough so we iterate a bit more with a couple
more blackbox layers, until we've built an AI centipede that seems to poop stuff
vaguely related to what we were hoping to come out. Likely if any testing for
veracity of that output is done, it's also some automated processes built with
the same biases and potential feedback loops, and really it's just ouroboros of
an AI centipede at that point forever recycling its own excrement, in between
leaving some behind for human observers.

AI Researchers in the 1960s wished they had this problem, that they had more
corpus data to ingest than they humanly could handle. They also worried about
what that would mean if they had that problem. GIGO is an ancient term after
all, and one not unfamiliar nor uncommon to OG AI Researchers.

Going back even further into the past, the earliest probabilistic models date
back to mathematicians such as Boole, Bayes, and Pascal. An interesting shared
belief between many of those early mathematicians, partly as a product of their
time/upbringings was that probabilistic models are maybe a method to find some
view of God in the cosmos. I feel like modern AI is starting to show why we
might never find God in randomness, but we certainly seem to be finding plenty
of demons. Certainly the demons here are _soylent_, they are made of people,
processed and industrialized in the dark factories of blackbox AI centipedes.

Cynically, how can we trust, for instance, self-driving cars, when we don't
seem to have any idea of how much garbage is going in to training them? When
we don't have human-level diagnostics of how our AI blackboxes are
(mis-)behaving in even such "innocuous" uses as our entertainment media feeds?

I know good work is going on, and many of the developers, designers, researchers
involved care about all of this deeply. I just find it increasingly difficult
not to worry that we're on a path where we are seeing a lot of nasty repercussions
of people treating AI models as "unbiased" or "objective", without paying attention
to exactly what garbage it has trained on, what metrics it has optimized for.

We keep seeing technologists claiming that the solutions to Big Data, to having
too much data around, is not more custodians/janitors, or smarter approaches, but
AIs/probabilistic models/aggregate metrics and clustering. Quantity has never been
quality. Quality controls are hard, and we can't afford to confuse "intelligent
seeming AI centipedes" for quality. They aren't unbiased/objective, especially when
we don't know what they've optimized for.

# Personal Ethics Commitment

Something I've been trying to do over the past several months is: *Mute More
Robots*.

It's a slow weird process. I've tried to leave Twitter entirely (though not just
for robot concerns). I wish I could quit Facebook. I've unfollowed and/or muted
almost every intentional probabilistic generation bot on social media. I mute
conversations of particular memes on sight, especially "use predictive text to
[blank]" memes. I'm increasingly of the opinion that there's enough random chaos
in the world, we don't need bots spitting more weird soylent chaos back at us.

One of my first things I check habitually now every time I use YouTube is that
Autoplay is turned **off**. Autoplay seems to be the biggest and worst example of
GIGO I can offer today. To get on the curmudgeon's soapbox, I _just_ want to watch
the things I've intentionally subscribed to, in roughly chronological order. That
doesn't _need_ AI of any sort, it's a basic data structure called a "queue", and
YouTube knows that. I think the general concept of "YouTube Celebrity" is GIGO at
work. I don't think _all_ YouTube celebrities are garbage, some of them I consider
friends, but given the GIGO I see continually spit out by YouTube's Autoplay
algorithm, is there any wonder that so many of the YouTube Celebrities keep turning
out to be garbage people? YouTube needs more custodians and janitorial staff
to flush more of the filth out of the platform.

I know I'm not going to avoid all generative text systems, and all applications
of AI to Big Data/The Cloud. Yet it seems useful to remove attention from the
ones that I can afford to mute in my life. Bots have no right to my attention,
and maybe all I'm doing is removing avoidable distractions, but that's a good
enough reason to do so, even if my concerns that we are making soylent demons of
our own destructions is an overly paranoid concern.

I don't know if *Mute More Robots* is a strong enough basis for a more formal item
in a code of ethics for others to subscribe to, but its among my notes exploring
what sort of ethics framework we might need if we are to survive social media.
