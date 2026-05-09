---
title: Start of 20 Years at WorldMaker.net
tags:
- worldmaker
- meta
---

I'm starting into the 20th year of my blog being hosted on this
domain, which is an anniversary I chose to celebrate in my usual
fashion by refreshing the blog's theme. I'll get into some specific
thoughts on that later. LCARS Moderne "2.0" won't look drastically
different to irregular visitors to my website, but has a fresh coat of
paint and takes into account six years of feedback (and web browser
change).

Technically, it is only the 19th anniversary at the domain, because of
how anniversaries work, but the off-by-one big round number of 20 has
still caught me somewhat feeling reflective of the passage of such
time anyway. While it is an anniversary I mostly just celebrate with
nerdy bits of CSS and HTML, it's still so tied into different eras of
my life. While some of that history is lost in the current archives,
for better and worse, there are still lines I can see in this blog's
history. For examples: there's the point where I stopped publishing
political opinions because I got tired of fighting over them, and
there's the point where I stopped posting so many short posts because
Twitter was built, and those two lines nearly but don't entirely
intersect.

Most of my Twitter posting history is in a zip file at this point as I
felt that I had to delete it from Twitter itself. Sometimes I wonder
about backfilling short posts and "best of archives" into the blog. I
don't know what is in that zip file that remains relevant out of
context. That's part of why I deleted it off Twitter, because time
robbed so much of it of context and robbed of context they were
liabilities I could no longer as easily control. I was a bystander in
such an attack on old out of context posts, and saw enough to leave.
Adding them to the blog could give them new context, but I'd have to
curate them first.

Similarly, I know where the line is where I removed direct commenting
on my blog. Comments were something that I felt important so early in
the blog. It was feedback and community. Of course, back in those days
before Twitter and Facebook and "social media" that was what blogs
were for. The last comment platform I used was Disqus and I dropped
them between privacy concerns with how they were treating data and a
desire to reduce JS on my blog to a bare, optional minimum. (Not
because I have anything against JS, it's often a huge part of my day
job, but because it sometimes gets in the way on a blog in performance
and flow of reading.) I've got a dump of all the comments in a zip
file, too. Some of those I recall were good discussions and I think
sometimes I should post an archive of at least the better ones, back
in context of the posts they referred to. Other times I wonder if it
is better that those comments are gone, the slates clean. It feels a
bit like the same sort of for better and worse forgetfulness that
wiped several years of college posts from the blog. Some of them were
interesting time capsules and others were worth losing for the pain
and/or problems they caused alone.

I can still see so many lines that marked ambitions damaged and/or
major project failures. I joke these days that "WorldMaker" as much as
anything today is the name of my impostor syndrome. It comes up as a
"joke" more often than I'd like because I still use the handle as my
primary in gaming and on Discord, out of decades of momentum at this
point. I still mostly remember why I picked it, so many years back in
high school on IRC and in forums. In some ways it _is_ weird to still
be using it most of a lifetime later.

I've never quite been as prolific at short fiction as I tried to be in
high school. (The loss of a few short stories is what I mostly regret
in the holes in the blog archives.) I've only posted a couple of short
stories in the past few years. On the other hand I may have been
getting better at longer forms of fiction writing. I've won NaNoWriMo
twice in the last few years. One novella was a game of pronouns and
multiple narrators that test readers didn't like (and I couldn't blame
them; it was an intentionally experimental game), and the other is a
work of fan fic over on AO3 for now. It's been too long since the last
attempted game I finished writing, and I've got experiments in the
forge, but no idea if they'll ever be more than just experiments.

# LCARS Moderne 2.0

The basics of LCARS Moderne are largely the same: at typical tablet
widths and wider it is a Star Trek inspired library interface with a
curved C-shape around the main content area, which still scrolls
horizontally by default (with JS enabled; more on this in a bit).

Most obviously, I refreshed the colors, now with palettes that are
inspired by the color choices of Star Trek: Lower Decks. On the
technical side I moved the palettes from build time SASS variables to
run time CSS variables. Dynamic colors were features I put too much
work into previous blog designs, so it's something I appreciate about
this upgrade (and how much easier it is today, just swap a CSS class).
I tried to be subtle with it, and some pages now use different
palettes based sort of on their function/context. It's not quite the
every page load uses a random color scheme of some of my (lost) past
designs (back when that involved so many image files to accomplish).

For a fun example of the more dynamic nature of the color system, a
red alert toggle button:

<button class="button is-danger" onclick="document.body.classList.toggle('redalert')">
    Red Alert!
</button>

I revised a lot under the hood, in part based on six years of
feedback, and in part based on changes in how browsers displayed the
site over six years.

## Still Horizontally Scrolling Along

So the big thing is that by default I still wanted it to be a
multi-column layout like a newspaper that scrolls horizontally on any
screen wider than narrow (bigger than a phone screen). I know it is
weird, and I've seen a bunch of hateful comments over it, but it's a
retro-future weird that I like and this is a personal site that's
allowed to be personally weird. I've got an ultrawide monitor on my
desktop these days and I like that I have just about the only site on
the web that I can full screen on my screen and the site naturally
makes good use of all that width. I can read entire articles sometimes
without scrolling, just reading it newspaper style from column to
column. I still think that is neat.

I did try to address some of the "affordance" issues that had been
pointed out over the last few years. (Affordances are things that make
it more obvious and/or easier to work with.)

Six years ago it used to be that multi-column layouts, when in a
container that scrolls horizontally took the column width you
specified as-is and ignored the view container size, so a
non-percentage width would cause columns to be cut-off/bleed-through
the edge naturally. I thought that was a useful affordance for
"there's more to scroll" if in most default browser sizes there was
always a bit of column peeking out across the edge to encourage
scrolling. Since then the browsers have all converged on a behavior
where the requested column width is now just a minimum size and even
when the container scrolls horizontally it still tries to balance
columns so that they fill the viewable area of the container
"perfectly", removing that hint of a column just slightly cut off or
just slightly peeking in that there's more to scroll. I'm not a fan of
this newer behavior the browsers converged to, but I understand why
they did that: the new behavior is what more people want, because
fewer people actually want horizontal scrolling and they'd rather
things look more "perfect".

I tried to add an affordance back here by adding a "column rule"
between the columns. I still don't _want_ a column rule, as I don't
think it matches the aesthetic I'm going for, especially with how
little options there are for how a column rule looks. It is limited to
an early subset of CSS border styles that feels like a throwback to
me. I wanted to pick something unobtrusive that kind of blended into
the background, but I also wanted to pick something that maximized the
"affordance" capabilities of the column rule here, as its one of the
few remaining obvious hints that "there is more to scroll". The rules
only get drawn in between columns, so if you see one at an edge at
all, it does imply that there is more to scroll. But I was worried
that might be too subtle on its own, so I increased the size of the
rule and chose a pattern that is more obviously "cut in half" on the
edges. I played with the sizes until I reached a point where I thought
that effect was obvious but not distracting. I'm still not entirely
happy with the column rule, but I think I've done about the best I can
with the current CSS tools.

Six years ago there was a non-standard CSS flag I could use to ask the
browser to let the scroll wheel scroll the page horizontally. Because
it wasn't a standard and only supported by a couple of browsers it
eventually stopped working. So I've added a tiny bit of JS that takes
care of it now. When the container is scrolling horizontally the JS
code treats scroll wheel scrolling from your mouse as if it was
horizontal direction scrolling rather than vertical. This does
drastically make it nicer to scroll articles again (if you aren't full
screen on an ultrawide or are on one of the longer articles).

While I was touching it, I also added a CSS class to toggle back and
forth between the horizontal scroll and vertical scroll. I also added
a not-subtle-at-all button with JS to toggle that and also point out
the current scroll direction. It's a lot less subtle than the old
unaligned columns or the new kind of subtle column rule. It might be
subtle that it also acts as a toggle button, if someone really, really
wants it to scroll vertically "like normal". I don't recommend that as
the best experience on most browser sizes. I still have text justified
at all sizes, which I think looks great in multi-column and phone, but
won't look as good at larger window sizes scrolling vertically. I'm
also making the choice to not cap the width when it scrolls vertically.
So many websites do that today. It's often seen as "necessary" to keep
people's increasingly wide screens from making text regions too wide to
be easily readable. My preferred solution to that is multi-column
layout and horizontal scrolling, as clearly mentioned here, so if
someone chooses to scroll my site vertically, I'm going to leave it to
them to manage the width of their browser without me making a strong
CSS statement on that.

Both of those JS features, the scroll wheel translation and the toggle
button seemed usefully necessary affordances that at this point it is
the JS itself that "activates" the default horizontal scrolling, so if
you don't have JS enabled you get the vertical scrolling. I still
think of this increased amount of JS as "optional" in itself, but
given the horizontal scrolling now "requires" it, it's certainly again
the case that the best experience of my website is with JS
enabled. Few people disable it to notice these days (as opposed to my
over-indulgences in JS in my youth), but it's a consideration I
made all the same.

On that front, I did a bit of "CDN elimination" moving away from third
party hosts for code, images, and fonts and moving things back to
hosted locally only on the site. That should eliminate all third party
trackers on this site now. (I don't have any first party trackers as I
stopped caring years ago, and I would assume GitHub likely has "second
party" trackers in its GitHub Pages hosting.) I moved to a bundling
and install process for LCARS Moderne 2.0 updates, which is kind of
neat behind the scenes trivia. (esbuild and npm with a bit of robocopy
if you are curious.)

I'm proud of this blog theme and I suppose I expect it to last another
six years at least. I expect I'll hear plenty more feedback on it still.
