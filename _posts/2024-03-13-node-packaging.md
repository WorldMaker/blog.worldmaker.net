---
title: Modern Node Packaging and Bundler-Free Living
tags: [coding, javascript, typescript]
---

I've found myself giving multiple light tutorials on how simple modern
ES Module-only packaging can be in Node/npm packages. I've similarly
given several tutorials on deploying web apps "bundler-free" (it's
more possible than many think). There's a lot of outdated advice on
these subjects, and some interesting superstitions, so I thought it
would be useful to blog about the state of things in 2024 as I know
them and hopefully update some out of date advice with helpful advice
that you can be lazier and things may be simpler than you think and a
lot of the confusion is because of outdated advice.

I'll get into details at length, and some digressions along the way,
but I think the top-level summary is simple and worth bullet pointing
up front. If you are looking to build, bundle, and/or package projects
for any or all of Node, npm, bundlers, and/or the browser, things are
much simpler if you only build/bundle/package ES Modules:

* You only need `"type": "module"` and `"exports"` in `package.json`
* No `"main"`, only `"exports"`, but `"exports"` _can be_ as simple as
  `"main"` was
* Every tool that understands `"exports"` understands `"type": "module"`
* Use only the `.js` file extension
* Use `.js` file extensions for relative imports
* Aside: Consider mocha or `node --test` for unit testing
* You might not need a bundler (or you may just need less bundling
  than you think)
* Aside: You don't need Babel anymore

## `"type": "module"`

The simplest thing to do when going ES Module only is to add a 
`"type": "module"` to your `package.json`. That does most of the work.
It says all `.js` files are ES Modules. You mostly only need the `.js`
file extension for everything at that point, so long as everything is
modules and you *want* everything to be modules. You can forget entirely
you ever heard the file extension `.mjs` and you can mostly avoid ever
needing a `.cjs` file and that only for increasingly rare developer
dependencies.

`"type": "module"` works in all currently security supported Node
versions. It works for a few versions back out of security support,
too, now.

In your package itself: You don't need to build any CommonJS files. You
don't need to build any AMD or UMD files. Let everything be ES Modules.
In your development processes CommonJS should be rare to non-existent
and can use the `.cjs` file extension.

Yes, you need to have the `.js` file extension on all your relative
file imports. The browser expects filenames to be specific and include
the file extension. Deno and Bun both require it. Most recent versions
of Node in `"type": "module"` packages also require it, though there's
still a few ways that slips through the cracks. It's only some bundlers
that don't require it today.

### Typescript

I love Typescript. Typescript is great. Just set Typescript to target
ES Modules, and you only need to target ES Modules. Just drop the JS
files in place (the default build configuration) and include the `.js`
file extension in all your relative imports. (Yes, `.js` not `.ts`.
Typescript decided it was better not to transform this and to emit it
as-is, so it wants you to use `.js` just like Node or the Browser
expects at runtime.) Typescript tries to auto-detect if you are using
file extensions and will start adding the `.js` for you in its
refactoring/auto-complete added auto-imports once you do it enough.

My advice lately is that a reasonably good combo (per caniuse
statistics) for `"module"` and `"target"` in your `tsconfig.json` is
`es${new Date().Year - 2}`. I've been using `"es2022"` lately for both.

### Exception: eslint

The only CommonJS file I find I need today is the .eslintrc.cjs file.
It's the only place in my projects recently that you will see a CommonJS
file at all, and certainly the only need I have for the `.cjs`
extension. Because it is the only exception I currently have, it feels
worth naming and shaming the one tool that doesn't yet support ESM
that I like to use. That looks to finally be fixed in upcoming eslint 9.

### Aside: Testing

Jest still calls ES Module loading "experimental" and has weird bugs
about it. Karma is terrible. (Node is already a v8 instance, you don't
need to boot another v8 instance from your v8 instance just to run
unit tests. That's not unit testing, that's some weird relative of
integration testing.) I recommend mocha or `node --test`. Mocha is
ancient (older than jest), and minimalist, but was also one of the
first harnesses to hand ES Modules well. (Sometimes the old dogs learn
new tricks better, I suppose.) `node --test` is the new kid on the
block, new enough many developers haven't yet discovered it. It's
great to have a test harness built-in to Node. That's one fewer
dependency you don't need. It's similarly minimalist to mocha, but
slowly gaining features, too. You can import all the asserts you need
from `'node:assert/strict'` and the `describe`/`it` test suite setup
functions from `'node:test'`.

## `"exports": "./main.js"`

`"type": "module"` does most of the work at runtime, but if you are
packaging you need `"exports"` in your `package.json`. Don't include
`"main"`. (There are no bundlers that understand `"exports"` but not
`"type": "module"`. There are bundlers that see `"main"` and
accidentally or intentionally ignore `"type": "module"`.)

`"exports"` has a bad reputation for being complicated and confusing. It
can be as simple as `"main"` if you let it: `"exports": "./index.js"`.

The requirements to use simple `"exports"` are basically everything this
guide is about: ES Modules only, with `"type": "module"`, and one "front
door" for "bare" Node package imports.

The useful difference between `"main"` and `"exports"` is that
"front-door" only approach. With `"main"` Node would still let you
import from any .js file in the package and with `"exports"` you only
get the declared exports and nothing else, no more "sneaking in the
back-door". This is useful as a package author for properly
establishing your public API. This is useful as a library consumer for
making importmaps easier to build (less accidentally importing
sub-files after the well known "bare" imports).

Even if you do need more than one "front-door", you can still use a
simpler form of `"exports"` and ignore all the suggestions regarding
`"import"`, `"require"`, and `"typings"` subkeys:

```json
{
    "exports": {
      ".": "./index.js",
      "./optional-cool-thing": "./cool.js"
    }
}
```

Typescript since 4.7 has no problems picking up typings from packages
that include the TS sources or obviously named `.d.ts` files for any
`"exports"` configuration, including these simple ones, so long as files
are simply predictably side-by-side.

## Bundler-Free Living

You might not need a bundler anymore, at least in development, but
sometimes even in Production you need less bundling than you think in
2024.

You can use an importmap to import "bare" Node package names in the
browser.

ES Modules work great in today's browsers with `<script type="module">`.

In a growing number of the simplest cases you can just prune and ship
`node_modules` to a web server, with an appropriate importmap.
`npm prune --omit=dev` will remove all of your development
dependencies. You may need to spot check for large files like test data
to also prune.

You may need to bundle some of your dependencies, especially ones that
don't yet ship ES Modules or haven't yet adjusted to including .js file
extensions for browser compatibility. You can bundle one dependency at
a time. "Vendorizing" your dependencies like this can be a one-line
command with a bundler that itself outputs ES Modules. I use esbuild
for this with the `--format esm` flag, it's generally a simple one-line
CLI command that I can include in `package.json` `"scripts"` and/or
documentation.

ES Modules loaded as ES Modules is a great development experience in
the browsers. You may not even miss "hot reloading" (and you can try
to implement it without the big frameworks and bundlers if you still
want it).

In HTTP/2+ and some well configured/behaved HTTP/1.1 servers there's a
lot less of a "per-file" performance hit than developers historically
worried about. Many ES Modules libraries are collections of lots of
small files, but the always asynchronous loading of
`<script type="module">` combines with some optimizations in dependency
graph loading for smoother performance than many old pre-bundler
memories.

You can use Browser performance tools to make bundling decisions based
on real production data. Rather than always bundle everything, see
what your actual browsers and servers are doing with real world 
dependency graphs. You may find they download less overall than your
previous bundles. You may find that you only need to bundle specific
sub-graphs of your dependencies as they become specific problems.

You don't have to take my word on it, or any framework's big default
bundling configuration: try it yourself and use real data. You may be
surprised at how many fewer reasons to bundle there are with ESM. (I
haven't been that surprised: I shipped AMD applications a long time
ago with very little bundling, and that was just HTTP/1.1. ESM flies
higher and further, especially on HTTP/2+.)

### Useful Tweak: `"sideEffects": false`

If you package a library and expect someone (including yourself) to
use certain bundlers, especially Webpack, it may make sense to still
include the non-standard `"sideEffects": false` flag in your
`package.json`. This suggests to Webpack (and the few others) that it
may tree-shake your library at its most aggressive. Many other bundlers
do either deeper closure parsing or trust `"type": "module"` says you
know what you are doing with ES Modules and don't have CommonJS
transition code and synchronous requires.

### Aside: So long, Babel (Thanks for All the Fish)

You don't need Babel in 2024. It was a great tool for its time. The
number of polyfills and actual amount of transpiling you need for
compatibility in 2024 is minuscule (check caniuse statistics if you
don't trust me on this). If you need JSX consider using something
lighter like Typescript and/or esbuild. Everything else you think you
might need is already in Node or your Browser now.

## Living Example

If you want to see an example library packaged this way, with an
encouragement to try bundler-free living (at least in development),
and with direct documentation on these same subjects, I can offer
[Butterfloat](https://github.com/WorldMaker/butterfloat/) as one such
useful open source library.

The [Butterfloat Getting Started Guide][butterfloat-gs] includes some
similar recaps to this blog post, including an example of bundler-light
living, showing how to spot bundle just the RxJS dependency and then
use an importmap for the vendorized RxJS and the `node_modules` "bare"
package import of Butterfloat to setup a very light-weight development
environment.

[butterfloat-gs]: https://worldmaker.net/butterfloat/#/getting-started

## Summary

In the ES Modules-only world of Node/npm/browsers/bundlers, everything
should start to be easy again. Use `"type": "module"` and you can
ignore a lot of old advice and/or outdated confusion.
