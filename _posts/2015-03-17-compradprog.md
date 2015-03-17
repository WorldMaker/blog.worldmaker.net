---
layout: post
title: Composite Radial Progress Demo
---

[Composite Radial Progress Demo](http://worldmaker.net/compradprog/)
([source](http://github.com/WorldMaker/compradprog/) is a user
experience idea I've had for years that I thought would be worth
investigating. With the "modern gen" games [^3] filled to the brim with
radial progress bars now,  I decided to build a quick prototype of this
variant and finally get the idea out of my head and onto some form of
example. Particularly because this is the sort of "hula hoop" idea that
if you sketch it on paper people laugh at it, but seeing it in action
might give a few insights into it.

# History of the Idea

A long time ago in that teenage place where every young programmer
thinks they should build their own operating system [^1] I thought it
would be really cool if an operating system offered a progress bar
summary of all active progress bars. I spent too much time thinking
about how you would build such a progress bar without violating some
basic user experience courtesies of a progress bar. The primary courtesy
being the one of "forward momentum": a linear progress bar expands
left-to-right and if it goes backwards (right-to-left) it was [^2]
typically meant to indicate some sort of error or fallback. The obvious
solution to me at the time was that a radial progress bar/wheel could
easily keep forward momentum (clockwise movement of the head) while also
allow for the tail to catch up when new tasks are added.

I thought it would be neat to have a radial progress bar summary
translucently spinning around the mouse cursor, like the mouse-attached
HUD in some video games.

# Possible Use Cases

In addition to the aforementioned idea of an OS presenting a "progress
HUD", I've kept the idea under my hat in case it came in handy for a
game design somewhere, eventually.

The obvious use case in today's world where someone sees a lot of
progress bar and new ones could show up and any moment is the downloads
window of most web browsers.

In programming there are often many cases where a recursive algorithm is
handy and each task may have an unknown number of subtasks once you
start on that task. This is also the sort of user experience where I
think this composite radial progress bar is superior to a normal flat
progress bar that either ends up "stuck" or "moving backwards" as
sub-tasks are discovered. Also, a gentle spin on the bar as a whole
makes the bar it's own "indeterminate" state and never gives a truly
"stuck/frozen/crashed" impression, even if the completion percentage
isn't changing.

# A Modern Aesthetic

Radial progress bars are cool and hip and filling so much of our 1080p
screen space in video games right now. I'm almost surprised that a game
hasn't done a loading bar or something similar already even remotely
like my little prototype here.

[^1]:
  It may not be "every" programmer, but it certainly seems a large
  percentage. I'm fairly convinced that this is place where a lot of
  Unix distributions come from, for instance.

[^2]:
  Times change expectations: It's quite a bit more common these days to
  see backwards momentum in progress bars and not surprise the users
  that something might be wrong.

[^3]:
  Even Tetris Ultimate is filled with radial progress wheels. Tetris!
  It's a game comprised of blocks and the UI is full of circles and arcs
  now!
