---
title: "Butterfloat 1.5.0: Stamps for Static Rendering"
tags: [coding]
---

[Butterfloat] released a big 1.5.0 with a big new building block
(nicknamed [Stamps]) for server-side rendering and static ahead-of-time
rendering for the static HTML parts of components. This meets a bunch of
under-spoken needs for JS-based view engines, fulfills a big early
promise of Butterfloat, and does it with hopefully style and convenience.

## The Promise of Progressive Enhancement

My guiding star for Butterfloat from the beginning was "Modern Knockout".
There's influences from React, and lessons learned from Angular's mess,
but I felt like there was also some things missing that Knockout was
great at which have been missing for a while.

One of the biggest of those, for me, was how Knockout was built during
and somewhat epitomized (for me, at least) the somewhat now broken
promises of the now passed "Progressive Enhancement" era.

I had made a promise to myself to include some "Progressive Enhancement"
tools in Butterfloat and enshrined it in the issue tracker as the first
and most important issue. It was something I prepared for in the base
"DNA" of the design. It just didn't make the "MVP" cut of the original
release.

I'm excited that Butterfloat 1.5.0 fulfills that promise for the first
time with Stamps. (It's an early "anniversary" gift, almost exactly a
year after the first release.)

## The Need for Progressive Enhancement Never Left

One of the prods that pushed me to think now was a great time to deliver
on a promise of "Progressive Enhancement" were multiple calls to do it
in recent news and reports. Several great articles have been written in
recent months on the accessibility problems created by the "modern
frameworks" of today's React and Angular for users on cheap devices and
bad connections. Because these sorts of frameworks have become the
"default" or the "best practice" or the "easiest road" in so many places,
they've become the tools in use even in places that *should* be
prioritizing accessibility.

I don't think Butterfloat will single-handedly fix the anti-trend, but
having tools for "progressive enhancement" was still important to me and
the time is always "now" and I appreciated the reminder that there were
good reasons to do it to help people that need it. Even if Butterfloat
might not be the most common choice to help solve that, I hope it helps
at least one other developer to have another option to point to that can
do it and that looks good.

## Keeping it Easy

The Butterfloat component model was already focused on making static
HTML obviously distinct from change bindings (via Observables). Due to
this you can build a Stamp from any easily testable Component (and most
Components can be easily testable). There's no difference between a
Component that supports Stamps and one that doesn't. Stamps are always
bindable at runtime, there's no need to choose between interactivity and
static building a Stamp, there's no architecture/strategy/pattern like
"Islands" to need to rewrite to. It's truly "progressive enhancement".

Stamps continue the theme of taking more modern approaches than the
state of the art from the Knockout days. Where Knockout used a DSL
written in comments and sometimes showed a flash of incomplete content
while the library was loading. Stamps by default build into modern
`<template>` and `<slot>` tags. They won't be rendered at all in modern
browsers until instantiated or unless "prestamped" into the container.

## More is Possible

I keep referring to Stamps as just the "low level" building block for
progressive enhancement/SSR/SSG. There are still more ideas to explore
from them as a starting point:

- Because Stamps build to `<template>` and `<slot>`, there may be good
  scenarios to enable rendering them via the "Shadow DOM" rather than
  binding them with Butterfloat.
- There may be more room for writing Butterfloat components "Stamp-first".
  Stamp bindings are not intended to be edited by hand, but they follow
  patterns that *may* be amenable to future tooling.
- Stamps currently exist entirely within Component boundaries. It would
  be nice to have tools to merge stamps and encompass larger trees of
  components in a single Stamp. That would open up more static site
  generation (SSG) opportunities.
- I've long been meaning to explore Observable completion as a tool for
  "binding removal" in SSG.
- Internally Butterfloat wires many things using "anonymous" Components
  at runtime. It is not currently that useful to run an entire Butterfloat
  app only with Stamps and treeshake out the static DOM builder. (Though
  this does not save that many KBs.) It might be nice to explore solutions
  to that. Especially for ideas of trying to run Web Components as just
  Butterfloat Stamps and try to treeshake golf the components.

I don't know when I'll prioritize any of that work, given at the moment
this is mostly a "free time" project (though a Production-ready one, if
I may say so). I'd love contributors if any of the above ideas or others
spark interest.

[Butterfloat]: https://worldmaker.net/butterfloat/
[Stamps]: https://worldmaker.net/butterfloat/#/stamps
