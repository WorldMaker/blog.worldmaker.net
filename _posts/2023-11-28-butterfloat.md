---
title: What is Butterfloat and Why is it The Greatest?
tags: [coding, rxjs]
---

I've been working on a modern web view engine named
[Butterfloat][Butterfloat] (now in pre-release) that is
interestingly Knockout-inspired, but with a focus on Typescript and
as pure as possible RxJS Observables. I think it has been a great
project, and I'm proud of the results I've gotten as a solo
developer doing it in the middle of other tasks in just a few months.

## How Did We Get Here?

I've been on an interesting journey for some time now. It started
with me criticizing some deep architecture decisions of Angular and
how their wishy-washy approach to RxJS made mistakes too common and
too easy. From the things that I experienced getting strong
performance out of an RxJS-heavy Angular application was an effort
of futility and required fighting uphill against a lot of "Angular
Best Practices" as seen in an ecosystem full of blog posts and Stack
Overflow answers available for copy and paste.

What happened next was that I hit a Production issue in Angular that
was precisely the sort of ghost story that developers least want to
experience: it was a massive, reliably repeatable performance stall
out that debug builds could not reproduce at all, even when pointed
to Production data and following every one of the same steps,
meticulously. This led me to deep diving into ways to remove Zone.js
and many aspects of Angular's change detection that most application
developers using Angular don't seem to encounter. That led me to the
need to pursue a "Component Framework" to help build RxJS-focused
components in a way that tried to lead to a "pit of success" in
terms of RxJS best practices, removing the need for Zone.js, and
taking a different approach to Angular change detection. I called
that framework Pharkas after fictional videogame pharmacologist,
Freddy Pharkas. (Because I felt like I too was a frontier pharmacist
slinging Rx in a lawless frontier.)

I had a few people ask if I would consider taking the lessons learned
from Pharkas and some of the ideas posited on how to build an
RxJS-focused templating language and build something from scratch
from that. I considered it more than once, but wasn't sure that
would be an itch I felt a need to scratch. Surely someone else might
build that at some point, and generally I've been happy with React
as "good enough" for most projects.

In August of this year, after more than 8 years in that position, I
was unceremoniously tagged in a "headcount reduction" due to a new
incoming CTO and an expectation of a shift in software strategies.

Among the many, many tasks involved in a full time job search, I
started working on one of the more unique to a software developer:
polishing my GitHub profile and revisiting some of my public
repositories on GitHub. Several of mine were written in Knockout,
which was the style at the time, or which was a preference of mine
for "quick and dirty proof of concept". In dusting the cobwebs,
dealing with the bitrot, paying down some of the tech debt of the
[CompRadProg][compradprog] demo, in particular, I was thinking that
it might be great to upgrade it to something modern. The more I was
looking at it though, the more I was torn by how "elegant" some of
my View Models have been in Knockout, including in this "quick and
dirty proof of concept" demo that I love to talk about but don't
really have much left to do with it.

In thinking on this, it started to seem that the tools were in my
power, that I should just build my own view engine with real, pure
observables and Typescript and otherwise mostly vanilla ES2022+. I've
tried to stick to one major runtime dependency: RxJS. I've tried to
stick to one major build-time dependency: Typescript. (You could
use Babel instead, but you probably don't need Babel. I use esbuild,
myself. But as just a view engine, Butterfloat in unopinionated on
your build tooling choices.)

## How Is It Different From Most View Engines?

I think a lot of the modern web frameworks have learned from Knockout
in some way or another. The impression I have of Angular, Vue,
Svelte, and Qwik is that all of them were too enamored with the
"magic" of Knockout's "computed" observables, and never quite
learned some of the lessons that Knockout's observables are more
accurately Subjects in modern observable nomenclature and the leak
of imperative concerns across API boundaries was never quite seen as
the problem it should have been. To me, that was often the weakness
of large Knockout codebases and seems the continued weakness of many
of today's Knockout successors, too.

## How Is It Different From React?

This is where things start to get interesting. A simple Hello World
example at first glance looks a lot like an ordinary React function
component. I wanted the only compiler involved to be Typescript as
much as possible, so Butterfloat makes heavy use of TSX
infrastructure which is already an HTML-like template engine with a
lot of features it would take me quite a bit of effort to reinvent
from true scratch. A Butterfloat Component is a function. (It's
always a function at this time, there's no equivalent to a React
class component at all.) Just as with React, it can take as a first
argument some number of properties that reflect the "attributes" in
TSX that were passed to the component.

That's where things start to diverge. A Butterfloat Component takes
an optional second argument called the Component Context. This
context provides some useful helpers, which we'll get to.

On top of that, a Butterfloat Component is static by default.
Butterfloat is not a Virtual DOM. In a Knockout-inspired feeling that
more of an application's DOM is static than not, it has no diff and
patch mechanisms of the intermediate description language its TSX
compiles to. The only parts that can and will change once
instantiated to the DOM are things bound to Observables and other
Components (which of course "secretly" themselves become
Observables, too, at run time).

There are testing benefits to having this rich "intermediate
description language" similar to the virtual nodes of most Virtual
DOM engines. Some types of Butterfloat Components may be tested
entirely in Node without a need for useful DOM faking/testing
library such as JSDOM. The descriptions can even be richer than is
typical in a Virtual DOM environment because Butterfloat doesn't
expect most of them to be long-lived or commonly created so it
doesn't need to try to save space by using shorter names or other
such clever shortcuts. On top of that the descriptions are natively
written in Typescript so benefit from some type-level distinctions
that you don't commonly see in Virtual DOM virtual nodes.

[Cycle.js][cycle] is a great Virtual DOM with Observables, if that
is what someone is looking for. Butterfloat tries to be a "static
DOM" with Observables in a way that I feel like I haven't really
seen since Knockout.

One further divergence that I'm particularly proud of is that
`@types/react` is a multi-thousand line file of seemingly
hand-maintained types, other JSX/TSX implementations either copy
and paste this work and hand merge it, or don't bother entirely. I
built a much fewer line bit of meta-typing on top of Typescript's
(auto-generated) `lib.dom` types. I think I've got a *better*
developer experience than React at a fraction of the cost of
labor (no matter how much of that labor is volunteer work by
DefinitelyTyped organization contributors). (One of the ways it is
better: the auto-generated `lib.dom` types include MDN direct links
in the documentation comments. I get those "for free" by
inheritance.) I expect other JSX/TSX implementations to learn from
this example now that one of us has done it, and I keep debating if
I want to try the political game of PRing something like it to
good old `@types/react` itself.

## Where Did The Name Come From?

My design documents for this project for a few days were in a folder
called Dr. Mario after the only other, better known, fictional
pharmacist in videogames, in direct relationship to my Pharkas
project. I spend those days searching for a better name. I was at a
football game where I was especially thinking about how much I'd like
to somehow honor Knockout in the name without sounding too directly
related to Knockout (or its once and future intended successor Total
Knockout). By that point I realized that the thing most center in
the distance that I was staring out at, mostly unfocused, while
thinking about this project was the logo for the Louisville Muhammad
Ali International Airport. One of Muhammad Ali's well known
catchphrases was the classic "Float like a Butterfly, Sting Like a
Bee". That seemed like a good idea for what I was going for with any
sort of Knockout-inspired project and satisfies the boxing metaphor,
albeit obliquely.

In the spirit of the Greatest Champion of All Time, I feel in a good
place to proclaim that with Pharkas I built a tool better than
(baseline) Angular and here with Butterfloat I have built a tool
greater than React in the spirit of Classic React (just a web view
engine). It is the greatest view engine for the modern web.

[Butterfloat]: https://github.com/WorldMaker/butterfloat
[compradprog]: https://github.com/WorldMaker/compradprog
[cycle]: https://cycle.js.org
