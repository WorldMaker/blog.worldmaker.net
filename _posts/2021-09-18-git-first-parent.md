---
title: "On `git --first-parent` and Deep Code Archaeology"
tags: [tech, source-control, git]
---

A big opinion I've picked up over quite of few years of working with
git for source control is that I distrust rebases and squashes in
general, but especially in the hands of junior developers. (I somewhat
trust myself with them, but only in unpublished branches, and mostly as
an exception that proves the rule, because I generally know how to
unbreak the stuff if I accidentally break the stuff.) I want to see
explicit merge commits as much as possible. I like PR workflows with
"no fast-forward" where merge commits can serve as a high level
integration log. For me that gives the best compromise between the "I
want a clean high level" and "I want all the dirty 'how the sausage is
made' accessible when I need to do deep code archeology'".

Some of this opinion comes from direct experience of places where I've
been burnt by bad merge experiences in git. At times I've been the
designated archaeologist tasked with determining where a regression
came from in deep dives into branches where the answer was
non-obvious, didn't seem to show up the annotate (blame/praise) and in
general a weird mystery, all because of a bad merge _somewhere_. If I
never have to directly deal with things like the "rerere" cache in git
(in which git stores previous resolutions to merges for reuse in later
resolutions) again I will be very happy. It's bad enough being in an
environment where as an "integrator of last resort" I was tasked with
maintaining a complex "rerere" cache to avoid even worse merge
problems in giant long-running branches, but I especially hope to
never again have to explain to a junior dev how to wipe their "rerere"
cache to avoid a persistent, bad regression coming from their machine
(because they made some really dumb rebase mistakes once and git decided
to remember it forever). (Part of that hope is because I certainly don't
remember how to do it right now, years later from that particular
codebase's issues.)

Some of this opinion comes from direct experience that has involved a
lot more "deep code archaeology" into legacy codebases where it feels
like sometimes the answer to a riddle about how a bit of code operates
was inscribed by a long gone programmer (or possibly a Sphinx, hard
to tell) in hieroglyphics on RCS tablets that were imported in a CSV
server that eventually merged into a branch in an SVN or TFS monorepo
of a larger project that was migrated to a collection of git
micro-repos with different subsets of those tablets. I've not actually
been in a codebase that particularly hyperbolic, but I've certainly
seen some things. When trying to read the minds of the ancients, I've
found more often than not *everything* helps. "Work in progress" commits
and "checking in because I'm off to lunch" commits and all the mess
and detritus of a busy programmer are still useful documentation years
later. It's not *fun* documentation to crawl, but sometimes you pick up
dumb little things like for that particular dev those "before lunch
checkins" weren't always before the coffee kicked in and that ancient
bug wasn't an intentional business process decision at all (as it has
since concreted into accidentally), but a silly mistake that should be
okay to finally fix (even if some business person will be disappointed
their years of muscle memory in the bug avoidance process is obsolete
if you do that). I'm never going to tell a junior developer they've
got ugly or messy commits in a PR, I look at the whole PR. Ugly and
messy "work in progress" commits have their place and shaming people
for them doesn't make them better programmers, and are useful signals
to future developers in the codebase that "this code wasn't written
perfectly", something often especially easy to forget in legacy codebases
that seem "handed down from the ancients". Past programmers were
generally people too that made human mistakes like the rest of us.
(The Sphinxes writing hieroglyphics riddles in RCS probably were also
not infallible.)

A lot of this opinion comes from my understanding that git's commit
database is a directed acyclic graph (DAG) for multiple reasons, and
with the DAG comes great power. It has always confused me why so many
developers get hung up on wanting as "clean" a git history as possible
when it's an easily solved user experience to present a DAG as clean
or as messy as you would like as a dial-able personal preference. We
have the technology to traverse a DAG in all sort of ways, it doesn't
always have to be depth-first "subway diagrams", as cool as those look
and seem to sell git GUI tools given how often they feature in
screenshots. The command line git is notorious for having a bad user
experience, but it still offers more tools here than most GUI tools
have yet to implement, maybe only because they don't look shiny and
cool in marketing screenshots like the "messy" "subway diagrams" that
seem to be leading so many developers away from using the power of the
DAG and instead constantly manually "cleaning" the commit log with
"rebase only" or "squash only" workflows.

Most git commands today accept a `--first-parent` flag that sticks to
walking the commit DAG just at the surface level. If you work a PR
workflow with "no fast-forward" the `git log --first-parent` shows you
the high level overview of your completed PRs, the `git praise
--first-parent` tells you which PR implemented a change, and `git bisect
--first-parent` will run your test suite at the PR level. (In a
development branch you'll see the same behavior with the same flag is
also useful: just the commits under development and any merges in from
your main branch rolled up to their merge commit and nothing else.)

I'd love to see more git GUI tools adopt a `--first-parent` like
drilldown approach. To me it seems like an obvious UX improvement to
default to showing `--first-parent` only in views like `git log` and then
offer the rest of the commit log as drilldown step or even as the
"subway diagrams", but only on request. I think a lot of the friction
that many of the "rebase only" and "squash only" folks commonly feel
would be ameliorated with better defaults in such GUI tools.

I think a lot of my disagreement with those workflows also comes from
the fundamental fact that their workflow is intentionally about
destroying information that I find useful in "deep code archeology".
It frustrates me some that they can get what they want ("clean high
level views of history") with better DAG traversal tools like
`--first-parent` and better UI tools that make things like that the
smarter default, but I can't get half the information I'd need if
I had to sit down in their codebase and debug a tangled merge
regression or accidental "temporary" code that was never
finished/fixed/completed, because rebases and especially squashes
throw out lots of information. I appreciate that I come from a place
where I've seen worst cases of git merge behavior that many proponents
of rebase and squash only/heavy workflows haven't encountered (I'm
glad they've been so lucky). I appreciate that not everyone has as
much (weird) experience with deep code archeology into the deep dark
corners of "legacy" codebases in exactly the same way that I have. My
experience has lead me to believe that "commit log cleanliness" is
something better solved with user interfaces and tools than with
rebases and squashes, and I will do almost whatever I can to advocate
for that.
