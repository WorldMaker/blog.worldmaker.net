---
title: One Last Feature for Pharkas Component Framework (for Angular)
tags: [coding]
---

With version 6.0.0 I released one
[last](#the-state-of-pharkas-in-late-2023) feature for the
[Pharkas Component Framework][pharkas] and with version 7.0.0 I
updated it to the Angular's current LTS (15). Pharkas is a mature,
battle-tested library for writing user-responsive UI components
using RxJS best practices in Angular. These two updates are likely
my bow around my involvement in the project.

# A Brief Intro to Pharkas

Pharkas came from [my frustrations with Angular][core], especially
with how many core components of Angular may unintentionally lead to
breaking RxJS best practices. At that point I had a nascent idea of
a framework for better RxJS practices in Angular, which I briefly
nicknamed ["Project Gawky"][gawky].

A few months later [while debugging and fighting a Halloween sort of
ghost story in Angular][diezone] caused by Angular's default change
detection system and its (over-)reliance on Zone.js, I felt pushed to
reevaluate the "Project Gawky" ideas in a concrete base library that
could be used in brownfield applications as a way to make it much
easier to adopt Angular's more civilized `OnPush` change detection.
(At least from a "bottom up" direction, as default components can
use `OnPush` ones easily but vice versa isn't as possible or useful
in Angular.)

Pharkas defines something of a DSL for component building in Angular
that is entirely dependent on RxJS Observables, entirely focused on
working solely with them to drive a component's behaviors (including
life cycle), and built to make it easy to follow RxJS best practices.
These include helping developers to avoid over-relying on Subjects,
and minimizing calls to Observable `subscribe`, and especially
attempting to eliminate calls to `subscribe` without a corresponding
`unsubscribe` cleanup at the right component life cycle point. The
benefits to following these best practices (as opposed to many
"best practices" Angular developers often are exposed to in the wild)
should always be a reduction of memory leaks.

Pharkas takes this further by automating the somewhat manual `OnPush`
change detection in Angular. Change detection is handled entirely
based on Observable wiring. Pharkas is designed to lead the component
developer into *user-responsive* components by default.

Pharkas' "DSL-like" patterns have been occused of being a bit
verbose (an unfortunate side effect of Angular's use of non-standard
decorators), but in practice I've often found component code to be
smaller and easier to read when written with Pharkas. Once you
factor in the easy wins from Pharkas' smarter out of the box change
detection behaviors, full mostly automatic component life cycle
management, and other subtle performance benefits, I think the
"verbosity" easily seems to disappear and Pharkas for became the
only good way to write Angular components.

I think Pharkas makes the best way to write components when
performance matters. I think Pharkas also excels at writing thinner
wrappers around Vanilla JS components avoiding unnecessary Zone.js
overhead taxes across the component boundaries. (Vanilla JS
components that handle all their own DOM don't need Zone wrappers
and with Pharkas wrappers will never signal extra busy work to
Angular's change detector.)

# Basic Suspense (The Last Pharkas Feature)

In reviewing the ["Project Gawky"][gawky] I think the final Pharkas
product managed to in general meet most of the expectation (outside
of being directly a template language dialect rather than a DSL
inside component constructors). These ideas came largely from having
watched a lot of what React had been doing, very slowly, across
multiple major releases. I felt like a lot of those same benefits
could come from an RxJS-first approach, as much of it looked like
built-in schedulers and common operator patterns.

From the beginning Pharkas has made easy in Angular to do a lot of
the complex timing management that React calls "Concurrency":
any Observables bound to a template with Pharkas
`this.bind(name, observable, default)` will notify Angular's
change detector no faster than `requestAnimationFrame` time. This
keeps components highly user-responsive, as the browser will
throttle `requestAnimationFrame` time as necessary to focus on
user interactions and keep the UI responsive. (A browser may also
reduce `requestAnimationFrame` time when a tab is hidden or
backgrounded, further improving battery efficiency.)

(Of course, user-responsive also means that sometimes you need
changes propagated as soon as possible, and Pharkas also has
from nearly the beginning provided
`this.bindImmediate(name, observable, default)` to force immediate
change detection on observations. In React this sort of thing is
needed especially for form elements when the "source of truth" is
the virtual DOM; form updates need real time to avoid upsetting
users. In Angular, Reactive Forms treat the real DOM as source of
truth and I've found the need for immediate bindings in Pharkas
extremely rare.)

As I had surmised, this is easily accomplished by a relatively
simple RxJS operator and scheduler combo (it is about entirely
just `debounce(0, requestAnimationFrameScheduler)`) when you, like
Pharkas, are assuming entirely Observables (and nothing but
Observables), and are using Angular's `OnPush` change detection
strategy.

The other side of the React example over multiple major versions
was what React calls "Suspense". I had mentioned that among the
"Project Gawky" ideas, but hadn't implemented until now. In Version
6.0.0 Pharkas learned a very basic version of "Suspense": a component
may `this.bindSuspense(suspenseObservable)` to determine when to
raise a flag that the component is suspended. While suspended,
Pharkas will suspend all further change notifications to the Angular
change detector until the flag is lowered.

One motivation for a suspense observable is loading situations where
you want to display a simple loading UI and fewer of the intermediate
template states while it is loading. Another possible motivation
would be situations where you may expect a lot of expensive
calculations and want to avoid browser DOM work while it happens.

It's another (final) tool in the user-responsive toolbox. Immediate
bindings still trigger change detection, and Angular will do
(opaquely) choose to do change detection on its own every so often.
It won't entirely eliminate "intermediate" states in your UI, but it
will certainly provide a knob to tune refresh rates in periods of
application time where there are other priorities than DOM updates
of your component.

It's not quite apples-to-apples with the full power and complexity
of React's Suspense, but it's an interesting, basic relative that
can deliver similar experiences in similar use cases.

It's also nearly as "simple" from an RxJS standpoint under the
Angular `OnPush` regimen in Pharkas: effectively just an extra
`combineLatest` and `filter` added into the change notification
pipeline. (It's also "pay to play" and if no suspense observable is
bound, these additional pipeline steps aren't added.)

It's not very discoverable, but you can see it in action in the
[Pharkas demo][demo]. If you click the test component with a counter
the demo will now toggle suspense for that component. You may use the
embedded [RxJS-spy][spy] in your Dev Tools console to verify that the
timer observable updating the counter continues to fire on its usual
schedule and that the demo isn't cheating in this "loading" suspended
state.

# The State of Pharkas in Late 2023

Pharkas is mature, stable, and now feature complete with respect to
my original vision for it. It is up to date with respect to current
Angular LTS (15).
[Pharkas is MIT licensed open source on GitHub][github].

I suspect this Suspense feature will be the last feature for Pharkas,
for several reasons: Because it feels feature complete and because
I have no current expectations to continue working with Angular.

Feature-wise, I think the one thing left that bugs me a small bit
still is that I would love to make the DSL prettier with even more
meta-programming should Angular ever finally stop using non-standard
decorators so much. Maintenance expectations for any Angular library
are of course constant updates to keep up with LTS. That will never
likely be "complete" given the way Angular compatibility tends to
work and the complicated nature of Angular's peer dependencies in
npm. I expect maintenance to be needed, but I don't expect to do it
at this point.

In large part this is mostly because I was recently let go from my
job of the past 8 years and am looking for new opportunities and
challenges. I don't have any Angular apps to maintain now and I
don't know if I can entirely avoid Angular in whatever my next
opportunity is, but I know I'm not going to be especially looking
to continue working with it. (It almost drove me crazy.) Without
someone paying me to maintain Angular apps, my interest in keeping
up with the Angular maintenance treadmill falls off a cliff.

I think Pharkas is mature and stable. I believe in open source, and
will entertain suggestions for new maintainers of the project. In the
meantime, I will try my best to welcome pull requests and run
maintenance tasks if politely asked.

[core]: https://blog.worldmaker.net/2021/06/26/angular/
[demo]: https://worldmaker.net/angular-pharkas/demo/index.html
[diezone]: https://blog.worldmaker.net/2022/10/30/angular-components/
[gawky]: https://blog.worldmaker.net/2021/06/26/angular/#suggestions-for-a-better-angular-project-gawky
[github]: https://github.com/WorldMaker/angular-pharkas
[pharkas]: https://worldmaker.net/angular-pharkas/
[spy]: https://github.com/cartant/rxjs-spy
