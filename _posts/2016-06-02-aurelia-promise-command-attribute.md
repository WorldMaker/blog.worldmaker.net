---
layout: post
title: Aurelia Command (Promise Binding)
tags: [coding]
---

[Aurelia Command (Promise Binding)](https://gist.github.com/WorldMaker/82a275550f223aad06e8cef1ea99d8b1) is a gist I felt
I needed to post as it took several missteps to complete, a lot of back and forth with Aurelia's documentation, and an
unhealthy dose of frustration for something I thought should be easy to do in Aurelia and possibly should be easy to find
an existing working example. Hopefully this gist and the below write-up may come in handy to others looking for similar
functionality.

# What I Was Looking For

I wanted a way to systematically intercept any `click.trigger` binding on a button that returned a promise and add a
modicum of progress reporting (disable the button, Toastr notifications, maybe a spinner like NProgress).

# What I Built

The gist is an [Aurelia Custom Attribute](http://aurelia.io/docs.html#/aurelia/templating/1.0.0-beta.1.2.7/doc/article/templating-custom-attributes)
that can be used in place of `click.trigger`, once it has been required into your view: `command.call`. 

# Lessons Learnt

These things in particular took a surprising while to find flipping back and forth between Aurelia's documentation pages
and source code.

## bindingContext

The `bindingContext` passed to a Component's `bind(bindingContext, ...)` is the VM object. In one mostly finished version
I was still using `command.bind` and trying to `Function.bind()` the function being bound to the attribute's value and 
`bindingContext` was what I needed for that, but I hadn't realized what `bindingContext` was, it's name and the documentation
didn't quite make it clear. (Enter painful breakpoint inspections and `console.log` debugging.)

## Call Data Binding

This was the big piece I needed that lead to the search for something like `bindingContext` in the first place, which I finally
discovered in Aurelia's Cheat Sheet while looking for something unrelated later in the day. `.call` is the magic binding syntax
supported by `.trigger` and `.delegate`, but available to custom attributes. I understand why these things have different names,
but it makes discoverability tough and makes me wonder if there might have been a way to better unify some of the `.` binding
actions in Aurelia.

### Aurelia Cheat Sheet

The most complete Aurelia documentation still seems to be the Cheat Sheet. I guess the lesson is check and re-check the Cheat
Sheet. Hopefully the rest of Aurelia's documentation might eventually catch up. Especially there seems to be need of a good
Data Binding focused document (especially for those coming from Durandal because Knockout had pretty strong documentation on
its data binding engine).

# Get The Gist

<script src="https://gist.github.com/WorldMaker/82a275550f223aad06e8cef1ea99d8b1.js"></script>
