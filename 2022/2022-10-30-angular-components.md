---
title: I Have Tried to Set a Better Example for Angular Components
tags: [coding]
---

[Previously I blogged about many concerns that I have about the sorts
of examples that Angular sets (deep in its core libraries)][core] and how I
feel like it leads to a "pit of failure" when it comes to reliability
engineering and performance optimization. In my day job I feel backed
into a corner where I have to support Angular application development
and have had to become something of the performance expert and
performance "officer" against my early advice that we should have
picked anything but Angular. In the end of that complaint post, to
offer something constructive, I offered some bon mots about what you
might do if you were to rebuild Angular from nearly scratch (I called
that idea ["Project Gawky"][gawky] if you want to skip to it). At the end of
the day though, I'm a pragmatic software engineer. It's always my job
to build my way out of problems, especially solving other people's
problems.

The short story is that I've built a growing collection of libraries
around what I've called the [Pharkas Component Framework][pharkas]. It codifies a
lot my "Observables-only" best practices into what I hope is a "pit of
success" tool that's easy to slot into existing ("brownfield") Angular applications
and migrate things a component at a time as you can. I think it is
incredibly useful out of the box and have been using it to improve
performance in production apps for months now. At the very least, I
hope these libraries serve as a good example to the Angular ecosystem,
whether or not it sees strong adoption outside of production apps that
I'm personally charged to "grease the wheels of".

I thought I would narrate some of the longer story as well. I'm very
proud of [Pharkas][pharkas] and what it accomplishes as an example to get around
what I think are  problems in Angular deep in the core libraries of
the framework, but I also feel like I need to provide at least as much
motivation and context as I can on why I built this to help answer why
anyone should trust Angular libraries written by someone that
unequivocally admits to hating working in Angular.

# I Picked a Losing Fight With Zone.js

[When I last blogged about Angular][core] I was obviously already trying to
think of constructive ways to build my way out of the mess. I
mentioned these ["Project Gawky"][gawky] ideas in case they sparked someone
else to maybe put in the work, because at the time they mostly
revolved around replacing or somehow augmenting/extending Angular's
template language compiler. Angular likes to pretend that it doesn't
have a template language "it just uses HTML" and as you would imagine
this means that Angular's (massive) template compilers (there have
been several massive rewrites) themselves are somewhat "secretive" in
what of its internals are publicly documented. They aren't really
built for easy replacement or augmentation/enhancement. That lack of tools
support is the core to why "Project Gawky" was much more of a
pie-in-the-sky rewrite idea than a pragmatic solution to offer.

Soon after publicly documenting those thoughts on my blog, but while I
was still in the middle of thinking about trying to construct my way
out Angular, I got tossed into a massive performance fight where the
biggest production app I was working on would just "stall out" for
**minutes** of wall clock time. There was no noticeable network activity, no useful
"progress" indication, terrible responsiveness to user interactions
("slow"/"ignored" clicks), and not even a "please wait/processing" beach
ball or spinning hour glass: it was just the absolute possible worst
user experience and it was making our production users angry.

There wasn't a clear indication of when the problem started, much less
if it was a performance regression specific to any recent code. (There
wasn't even a clear indication of a specific source/cause. The
reproduction was "navigate the app randomly for long enough".) There
was some heavy calculation work in an observable pipeline that
recently was refactored just a tiny bit, so in terms of hypotheses,
and enough evidence that pipeline was shared by enough components on most pages that
was my best idea of a place to start. I started in the obvious places
of making sure that the pipeline wasn't over-subscribed, wasn't
leaking subscriptions without unsubscribes, and wasn't accidentally
over-observing to many input events from other pipelines.

I started with a lot of `tap`s and `console.log`ging debugging, and in the
middle of that was pointed to [RxJS-Spy][spy] which is a fantastic debugging
tool and I can't recommend enough. It provides a simple tag operator
where you give a pipeline a name, which is a no-op in production
builds but in debug builds gives you an entire dev console framework to
spy on specific pipelines by name or groups of pipelines by regex. It
offers the ability to choose between `console.log`ging and debugger
breakpoints. Again, it's just a great improvement on "tap-style"
debugging. Install it today. (I have nothing to do with [RxJS-Spy][spy], I just
keep recommending it to projects now.)

The more I tagged with [RxJS-Spy][spy] the more I verified that the app's
observable pipelines didn't have obvious leaks and were observing
things at a pace that seemed reasonable, including the massive
possibly expensive calculations I was worried about in my hypothesis.
At this point I had easily disproved my hypothesis.

This is the part of debugging that gives everyone nightmares: all of
my team's code is working just as expected. Does that mean the
performance issue isn't in my team's code?

In just about any other framework I would have already have pulled out
"flame graphs" from the Browser's performance developer tools and been
trying to base my hypotheses on real, hard evidence, not just shooting
from the hip in the dark or trying to litter the entire code base with
`console.log`s in the hopes that I could guess at performance
bottlenecks. In Angular it is really hard to get useful data out of
flame graphs for one specific reason: [Zone.js][zone].

Zone.js is a supposed "prollyfill" to implement a JS proposed feature
that ECMA Technical Committee 39 (TC-39) shot down years ago for being
dangerous, confusing, and not generally useful. So far as I'm aware,
Angular remains the only "customer" of Zone.js, and today is entirely embedded in the Angular repo. Angular uses Zone.js
_deeply_ to power its change detection systems. Zone.js works by
monkey patching the entire JS world like a virus or other malware: it
infects every Event callback, every Promise, and every RxJS Observable. It
plugs in a bunch of its own guts in the middle of every bit of code
you try to run in an Angular app.

This "infection" is completely visible in any Angular production flame
graph. It changes and impacts every single execution stack in the
application. Look at the flame graph and the flames are all Zone.js.
*You may insert here in your mind an "Everything is fine" meme with the dog labeled Angular and
all the flames labeled Zone.js.*

Somewhere in those Zone.js flames your code is probably running. Somewhere.

I captured some of these wall clock stalls in the performance tools. I
knew to expect most of the flame graphs to be Zone.js nonsense. I
assumed with the stalls taking minutes of wall clock time that
something not Zone.js should be visible enough in that haystack to
make a difference and make it possible to find.

I consistently found no needles in that haystack. I had minutes and
minutes of call stacks and the further I dug in the more it was all
Zone.js haystack and not a *single* needle of application code. Was the
performance problem entirely Zone.js? I had no good ideas from the
glimpses of internal-only Zone.js APIs and source files in the stack traces to
tell in any reasonable way whatever it thought it was doing. (I still
have no good ideas or answers months later. Zone.js remains a
terrifying horror mystery to me.)

At this point in the horror movie (Happy Halloween! I guess you can
now guess why I was maybe saving this story for this month; it's a
debugger's ghost story) several audience members would be shouting at
me: Zone.js has a debugger mode and turning it on is buried as a comment line in
the Dev environment.ts file in every template-scaffolded Angular
application, because they presume you will need it at some point. As a developer with a lot of experience in debugging, I find deep behavior changes between
environments spooky. It was at this point where I felt that I was out of debug
options and I needed that frightening last option. I cautiously opened
that last door.

With Zone.js in that weird debug mode, I could no longer reproduce the
pauses and the application performed better than production. 👻 Boo! It's
haunted! You're going to die! Get out of the house! 👻

# Zone.js Must Die

This absolutely is one of my deepest nightmares as a sometimes
"performance expert": the bad performance is coming from inside the
framework itself! The framework acts weirdly different in debug and
production environments and it's the production environment
experiencing the worse performance in a way that makes no sense. You
can't debug your way out of the production problem because your
debugger can't reproduce it.

Hyperbolically, I went *insane* here. I lost my damn mind.

I had hard evidence that Angular was a horror show under the covers
and was causing our production users real pain, anguish, and
suffering. But unfortunately, I don't have the power to convince an
entire company that the Sunk Cost Fallacy is real and less of a
problem than trying to keep sleeping in the haunted horror house
because we got such a good deal when we bought it from the previous
owners who died of mysterious circumstances that surely were unrelated to why the house was on sale.
I'm told to "just do my job" and patch a fix.

That left to me the only "logical" and "pragmatic" realization:
**Zone.js Must Die.**

I suppose in the horror film analogy this is the realization by the
final girl that Zone.js really is some sort of serial killer and it is
time for her to roll up her sleeves and go on the offense and fight
back against that ruthless serial killer.

So I started researching everything I could to murder Zone.js without breaking Angular.

Angular is kind enough to give you the option to boot up with a noop
"Zone" and entirely disable Zone.js. Unfortunately, this breaks
Angular Change Detection in weird ways and most apps stop functioning
at this point if you just switch to the noop "Zone".

Angular's Change Detection apparatus is a direct consequence of
Angular's broken compromises between providing RxJS Observables and
then also providing tons of imperative escape hatches. Observables are
entirely "push": they push notifications when changes happen. You
shouldn't need change _detection_ in a pure Observable world, you
already have change _notification_ ("for free"), because that is what
Observables _are_. (This is where the ["Project Gawky"][gawky] idea gets most
of its promise: with "free" change notifications you can wire it to do
some very smart things also "for free".) But Observables are "hard"
and Angular couldn't commit to them and the resulting worst of both
worlds compromise "needs" Change Detection.

That Change Detection uses Zone.js to tell it any time anything
happens in the app, ever. Zone.js figures this out by wrapping all the
Events, Promises, and Observables in the world that it can find with extra
instrumentation. Just to tell Angular "hey, something changed
somewhere, I don't know, maybe" (not even really what changed, certainly not to
the specific level of individual Observable pushes). Angular still has
to do a ton of work after those Zone.js callbacks to figure out what
exactly changed and then from there what to update in the
templates/DOM.

Fortunately Angular seems to have actually anticipated this, too, that
with Observables you have a "push" based system for notifications
already and in theory shouldn't need change detection at all. It took
me something of a deep dive into some of the less well documented
parts of Angular, but it turns out the framework indeed has left
component developers a "manual stick shift" option for writing
components: you can annotate in the Component decorator that the
component uses the Change Detection Strategy named "OnPush" and that
you will push all change notifications manually.

The "`OnPush`" Change Detection Strategy does give you an offense
strategy to use to fight Zone.js from the bottom-up of an application,
and it needs to be from the bottom up: `OnPush` components do not need
to be wrapped in Zones (and generally aren't, though Zone.js is
"viral" in nature and there are no guarantees it doesn't accidentally infect), which is great. But
that also means that `OnPush` components can only ever use other `OnPush`
components. Components that use the "`Default`" change detection
strategy and need Zone.js to detect their changes can use `OnPush`
components just fine, but not the other way around.

But a "bottom up only" hope in a brownfield application is still a ton
of hope to make a noticeable change. A "manual stick shift" option
isn't ideal, but that too gives hope that you have something that you
can automate and that you can build an automatic transmission on top of a
manual stick shift with software. It's not pretty, but it is
"pragmatic" and it will get the job done.

# Introducing the Pharkas Component Framework

To recap: I lost my mind in horror. I decided that **Zone.js must die**. Then I
finally discovered some hope for a "bottom-up solution".

I realized that I could build it: I could codify my "Observables only"
way of building components into a library, and use that library to
build a handy "automatic transmission" to replace Zone.js-based Change
Detection with something smarter and less compromised (if it sticks to
"Observables only").

Unlike ["Project Gawky"][gawky], I had a firm place to start to build a useful,
reusable library for building (Zone-free) `OnPush` components in an
Observables only way that could provide not just automated push-based
change detection to Angular, but even bring in some of the "smarts"
ideas of "Project Gawky" and apply them as good defaults. By making
them good defaults I hope that my library can build not just a "pit of
success" but a "pit of smart success" to the developers that choose to
use it. For instance, React took several major versions worth of
revisions and refactoring and a lot of code to deliver "concurrent
mode" which deprioritizes most DOM work until after idle callbacks such as
`requestAnimationFrame` helping the browser to focus on interactivity
over DOM element thrashing. Concurrent mode is still not yet the
default in React for several compatibility reasons and needs to be
opt-in. I've built something similar in my own library for debouncing
change notifications to Angular to nice clean `requestAnimationFrame` time just using Observable schedulers in
very little code (it's probably a lot more documentation than code at
this point), and it is default and (simple) opt-out. (While it is at
it, the library also takes care of boring Angular administrative
trivia such as `ngOnInit` and `ngOnDestroy` lifecycle callbacks.)

Overall, I feel like this library has turned into some of the best
documented and well-tested open source I've had the pleasure to work
on. I'm not entirely satisfied with the testing just yet, as I'm
waiting for Angular to make the leap to the next major version of RxJS
to get some good "marble diagram" timing tests added. Because of that
useful default of debouncing to `requestAnimationFrame`, I need a marble
diagram harness that understands and fakes `requestAnimationFrame`
timing, which the next major of RxJS supports out of the box and I
wasn't happy with backports I attempted for the current Angular
supported RxJS.

I named this library ["Angular Pharkas"][pharkas] and the approach the ["Pharkas
Component Framework"][pharkas]. This name is a terrible joke, that is possibly
only funny to myself. I had lost my mind, remember, and I needed to
scrape out whatever sanity I could out of this entire horror
situation, **and** had to get whatever I built into production ASAP to make
users happy (and naming is indeed one of the hardest problems in all
of computer science). So I named it a joke and filled its README with
a few jokes to amuse myself. It's maybe not the most "professional"
approach, but sometimes we need humor in our darkest hours.

To entirely over explain the joke:
_Freddy Pharkas: Frontier Pharmacist_ was a 1993 adventure game from Sierra On-Line near the
peak of their development golden age. It can be described as the
"_Blazing Saddles_ of videogames" and is a joke filled satire of
cowboy, Western, and Old West tropes in which the title character just wants to
be a respectable, civilized Pharmacist selling prescriptions in a lawless frontier town.
(I recall it nearly breaks the fourth wall as hard as
_Blazing Saddles_ as well, but it has been a decade easily since I last played
it. The comparison is not entirely unearned, for those that have a
high opinion of _Blazing Saddles_.) As someone trying to peddle RxJS
best practices in a sometimes lawless-feeling ecosystem, I sometimes
feel like a frontier pharmacist when working in Angular. (The terrible
pun there being that "Rx" in addition to technically meaning "Reactive
Extensions", which was the original .NET name for its
Observables-pattern framework, is also one of the more common
abbreviations for the word "prescription" sometimes stylized ℞ and has been used by
pharmacists for that word for a long time, from latin "recipe" meaning "take".)

# The Growing Pharkas "Family"

Beyond the base component and the library that provides the core
"[Pharkas Component Framework][pharkas]", I've been slowly accumulating a lot of
ancillary libraries of other open source components and component base
classes that make sense to release next to it.

So far the biggest running theme of these other components is
providing Angular wrappers for "Vanilla JS" components. There are a
number of factors behind this including the sorts of components I've
needed to work on for my day job's production apps, navigating which
components are "business critical/secret sauce/non-disclosable" versus
which seem good candidates to open source (or clean room rewrite as
open source in my spare time, because I lost my mind and have done some moonlighting here) because they have no domain specific
code, and that the "bottom up" approach to converting to `OnPush`
components especially highlights your "VanillaJS wrapper components"
as a key "bottom" that needs conversion early.

I think "Vanilla JS" components (and components from outside
frameworks embedded inside Angular) are especially ripe to gain the
benefits of `OnPush` style components: they _shouldn't_ have any
change detection needs because they handle everything internally.
Wiring all of a "Vanilla JS" component's Event handlers, Promises, and
even Observables with Zone.js just because it may in very unlikely
cases result in a change to detect is possibly the purest example of
obviously unnecessary overhead. Zone.js _tries_ not to be _that_
"viral", and most existing Angular wrapper components know the pain of
what that means and all the little things that need to be wrapped in
an `NgZone.run` callback. (`Default` components using `OnPush` 
components don't need `NgZone.run` callbacks in my experience, that
boundary is handled automatically enough, unlike the "Vanilla JS"
boundary.)

I think these Pharkas "family" of "Vanilla JS" wrappers should serve
as useful examples of the gains to be made in using `OnPush` component
wrappers in all cases. There should be no doubts that the performance
is better in the boundary spaces between Angular and not-Angular.
There's no `NgZone` injections and no `NgZone.run` calls. There's no
change detection notifications necessary at all when the component
handles all of its own update cycles.

I think they also serve as good, interesting examples of the types of
setup and teardown you can do when you think entirely in Observables.
I think that's often one of the things developers complain the most
that they need imperative "escape hatches" from Observables for (and
why Angular is the bizarre compromise that it is): dealing with the
boundaries between components that understand them and those that have
more imperative APIs. You can do a lot with Observables if you put
your mind to it.

These libraries are also more documentation than
code. Some of them are direct drop-in replacements for well known
Angular wrapper libraries and I think you'll find less, easier to
understand code than the wrappers that they replace, even before you
add in the additional benefits that they simply perform better.

The "[demo site][demo]" for Pharkas right now is a collection of these
"Vanilla JS" components themselves (more than one!) used in a combined
"dashboard" with (fake) real time data. I'm incredibly biased here,
but I have never seen performance that strong at the "Vanilla JS boundaries" anywhere else in the
Angular world. The real time is "fake" but modeled at speeds and
amount of data I've seen in actual real time dashboards in Production
(in Frameworks that are not Angular). There's definitely no strange
and unexpected Zone.js stalls. (The demo site is built in the Angular
noop "Zone" so truly has no Zone.js at all even in accidental
fallback.)

[All of this is MIT licensed open source][github], and I encourage everyone to
at least dig in and glance at the source and maybe try to learn from
it, if nothing else, even if you don't think you need any of these
libraries in your own production work.

# Aside: Observable "State Management"

The "[Pharkas Component Framework][pharkas]" is agnostic to how you build
Observables, it only mandates that you *use* Observables.

There are a lot of options in Angular, many inspired by the React
ecosystem's Redux (in my opinion without understanding the reasoning
behind Redux, but that is a complaint for another blog post) such as
NgRx, NgXs, and more. Pharkas doesn't care if you use any or none of
them. It works well with them. It works well without them.

In my company's production we already have a wild hodge podge of all
of the above. In my own development and prioritization I've taken a
"without them" approach I currently call "lots of small Observables"
which may be possibly called "Atomic Observables" in analogy to the
React "counter-Redux" term "Atomics". Today I don't have a library to
offer on this pattern. I see it as simply a pattern and an "obvious
one" at that, so I don't think it needs a library at all. (I might
even describe it today as a "natural" pattern of Observable building,
implying it is the NgRx/NgXs/et al of the world that is perhaps a bit
"unnatural".) It is on my TODO list to eventually try to write some
better documentation on that pattern in the hopes it sparks joy in
some developers.

At one point I thought Pharkas "needed" a state
management answer or to be a little bit less state management
"agnostic" to be a "real" Angular Observable library (thanks NgRx/NgXs
et al for that bit of impostor syndrome), but I decided YAGNI (you
aren't going to need it) and yeeted it out in early versions and have
no regrets having done so.

# Should You Use Pharkas?

I probably wouldn't if I were you. You likely have no good reason to
trust my claims at face value and doubt my credentials. I probably
wouldn't even build this library, much less offer to maintain it if I
convinced my day job to avoid Angular like the plague, which I have
tried to convince them multiple times. I don't blame you to be
skeptical.

Highlighted and self-aware summary of previous sections:

- Zone.js was built by developers in the lovely ivory towers of
Google. They were confident enough in that effort that they proposed
that to actual standards bodies as a way that all future browsers
should work in perpetuity.
- The Pharkas Component Framework was written by an impostor
syndrome-filled dark matter "Enterprise" developer in a company that
is not primarily a software company.
- This developer openly admits in a blog post that the framework came
out of a fit of insanity.
- The Pharkas documentation files and even project name are full of
unprofessional jokes.
- The Pharkas developer and maintainer has admitted to hating the
Angular Framework in blog posts and claims that they will drop
maintenance support at first chance, depending on their day job's
needs. (On the other hand, [it is MIT licensed Open Source on Github
and easy to fork][github].)
- Pharkas doesn't provide any sort of "State Management".

I scratched my own itch here. I solved some critical production
problems that needed solving ASAP, somehow or another. I did what I
had to do. This blog post isn't a plea to use this work. I have made
promises that I think you would see clear performance gains and 
kinder, gentler developer experience if you to do that,
but I don't expect you to take my word for it.

What I would like? Please learn from it! [It's a handy, easy to explore
MIT-licensed Open Source repository.][github] If there's one particular
takeaway here: use `OnPush` components everywhere you can! This truly is
a bottom up initiative. It needs to be "grass roots" in Angular, because it is not the default. Component
developers (_especially_ those wrapping "Vanilla JS" components) should
start leaning *OnPush* component by their own default choice. I hope no one else
experiences the debugging ghost story 👻 I did to the same extent and it
truly is as rare as it seems in Angular that more people don't call
Angular the "haunted house framework" or worse, but after having experienced
that every library I see in Angular I now evaluate on "does it use
`OnPush` components?". You don't need [Pharkas][pharkas] to build `OnPush`
components. I think Pharkas makes it very easy to do that, and adds
some nice "automatic transmission" and smarts on top of it, so I would
recommend taking a look using it to build your next components, but
again my plea here is only for using `OnPush` components, I don't care
how you get there ("manual stick-shift" or not).

I hope I have set a good example here.

Happy Halloween, and good luck if you are an Angular developer. 🎃

[core]: https://blog.worldmaker.net/2021/06/26/angular/
[demo]: https://worldmaker.net/angular-pharkas/demo/index.html
[gawky]: https://blog.worldmaker.net/2021/06/26/angular/#suggestions-for-a-better-angular-project-gawky
[github]: https://github.com/WorldMaker/angular-pharkas
[pharkas]: https://worldmaker.net/angular-pharkas/
[spy]: https://github.com/cartant/rxjs-spy
[zone]: https://www.npmjs.com/package/zone.js
