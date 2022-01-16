---
title: The Technical Basics of "Blockchain"
tags: [tech]
---

Trying again to break down that the technical basics of "blockchain"
are devastatingly simple, because people trying to convince you that
blockchain is really complex technology are _trying to sell you
something_, so I've broken it down into a lot of little "chat line"
pieces, and tried to make sure that every technical term is explained
as it is used (or isn't entirely relevant) with the intended audience
being folks with no technical background. (I think anyone with a
technical background should find this explanation sufficient: "A
blockchain like Bitcoin is a rebase-only git commit process of a
transaction ledger where each new commit hash must start with enough
zeroes. The committer with the right commit hash is awarded more
tokens to use in transactions in later commits.")

I tried to reduce the number of places where someone can "Well,
actually" me with a technical quibble and have kept the biggest ones
to parenthetical asides that should be truly optional to the
description as a whole. I'd like to especially note here that: while
it is very easy to make such "Well, actually" interjections in just
about any technical description of anything, _nuance does not imply
complexity_. Especially in this case it implies _variation_. Not every
use of "blockchain" is Bitcoin, and there are certainly plenty of
variations both like and unlike Bitcoin today, but Bitcoin is and
likely will remain "king of blockchains" (and a use of
electricity, all by itself, continuing to be larger than the
electricity produced by entire "second world countries") so it remains
the strongest example to use of the basics of how a blockchain
operates, technically speaking.

I hope it helps. "Proving" that blockchains are devastatingly simple
isn't going to change hardly any minds on their stance towards
blockchains and cryptocurrencies. I just hope I've helped do my part
to break down some of the salesmanship that drives cryptocurrency hype
cycles ("it is so complex you just cannot understand it, so **trust
me**"). But I'm a cynic here and think it is far too late, the majority
of the damage is done, and that hype cycles or not, for better and for
worse, "blockchain" is here to stay, and mostly in my opinion for the
worst.

---

**Block:** you've got a bunch of documents to store that rely on/link to
data from previous documents

One of the easiest ways to "link" such documents is to record in
"child" documents a secure ID of the "parent" document

A common form of "secure ID" is to use the output of a "cryptographic
hash function", called a hash

A hash is a relatively tiny number that reflects the contents of a
larger document

What makes a hash "secure" is when you can't predict the hash of a
document, but the same document will always produce the same hash, you
can't predict the contents of the document from just the hash, and
similar documents produce unpredictably different hashes

(That's the difference between any old "hash function" and a
"cryptographic hash function", what the word "cryptographic" means
here: that it meets those security needs of unpredictability)

When using a cryptographic hash function in this way to link
documents, this data structure has been called a "Merkle tree" since
the 1970s

It's natural shape **is** a tree: more than one document can point to the
same parent, there's nothing in the nature of this way of storing data
that prevents that from happening

In the case of most cryptocurrencies what is stored in the documents
(inside of "blocks") is the transaction ledger: Transfer X amount from
Address 1 to Address 2, Love Address 1

Transactions depend on previous data (need to point to parent
documents; reason it forms a Merkle tree): at some point previously in
the transaction ledger enough transactions sent X or more to Address 1
(and Address 1 has not already transferred that much out) so that it has
X to send to Address 2 (and is a valid transaction)

**Chain:** creating artificial scarcity by "pruning" the (Merkle) tree

Merkle trees may have an infinite number of possible branches

Blockchains use a "consensus algorithm" to choose which branch is the
preferred branch, and which other branches to ignore

(Forks are still in the same conceptual Merkle tree: the difference
between the Bitcoin, Bitcoin Cash, Bitcoin Gold, etc branches is much
more _marketing_ than technical)

(Artificial scarcity: there's still an infinite possible number of
branches or "forks" allowed by the nature of the underlying data
structure, but marketing is great at selling "preferred options")

"Consensus algorithms" among other things declare "which document must
come next"

The most common "consensus algorithm" (and arguably the only known one
that seems to work in the long term so far) is Bitcoin's "Proof of
Work"

"Proof of Work": the next document (block) proves you have done a lot
of "hard work" in order for it to count in this branch

(In computing terms "proof of [hard] work" really is just "prove you
spent enough electricity")

In Bitcoin's case the "work" to prove is completely stupid: the
"secure ID" for the block needs to start with enough Zeroes

This is _hard_: because the secure ID is a secure hash (from a
"cryptographic hash function") and the output hash is supposed to be
entirely unpredictable from the input data

The only currently known way to do this is to add a bunch of random
garbage next to the document (which is what truly makes it a "block":
document of transactions, plus random assortment of garbage) and see
if you get enough Zeroes starting the hash (ID)

Not enough Zeroes? Add different random garbage and try again (this is
all the "work" in "proof of work", randomly generating literal
garbage)

First one with enough Zeroes "wins"

(Everyone calls this "mining" and not "pruning" because the by-product
of a "win" is new coins to spend; to incentivize computers to sit and
spin creating random garbage in search of finding all these "useless
zeroes" it's a very dumb lottery)

(You can't spend coins without "mining": "mining" is what adds [and
reconciles] your transactions to documents in the Merkle tree
branch/blocks in the "blockchain")

There's a name in security speak for this sort of hunt for a specific
looking hash (ID): a preimage **attack**

(Technically this is a _partial_ preimage attack because Bitcoin
doesn't care what the rest of the ID is after all the zeroes it wants
at a given time; but from a security perspective any partial attack is
still an attack)

That's where Bitcoin's "Proof of Work" especially transcends from not
just "stupid" but downright "evil" because it is a rapid, heavy attack
on a cryptographic hash function used in a lot of other places as a
building block of internet security

If someone found a shortcut that wasn't just the brute force "build
random garbage" (why I prefaced with "the only currently known way"),
they found ways to predict the outputs of the cryptographic hash
function forever weakening their usefulness as secure IDs

(This has happened before. We've lost cryptographic hash functions
when we've found out that they were susceptible to preimage attacks.
But in those cases we had decades of warning and known better
algorithms waiting in the wings. If Bitcoin miners truly "win" the
preimage attack we might not have any warning at all and a lot of
internet security would be immediately at risk. It's also arguable if
we have known better algorithms waiting for such an eventuality
today.)
