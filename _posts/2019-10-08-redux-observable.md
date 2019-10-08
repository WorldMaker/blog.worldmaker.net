---
title: "Some Thoughts on Building a Discord Bot with redux-observable"
tags: [coding, games]
---

Thought I'd talk about a fun little project I built that was mostly finished but
not in time to be most useful. I use `redux` and `redux-observable` on some
React projects at work, and it's often said that redux isn't just for React
but there aren't a lot of examples in the wild for that. One fun example is that
I used redux as the "brains" of my Discord bot,
[SHARON](https://github.com/WorldMaker/SHARON/).

## The Problem Domain

I got rather involved in helping to run and moderate "fleet servers" in
*Sea of Thieves*. Fleet Servers were attempts to run as many as six ships
(*Sea of Thieves*’ server limit) under a single alliance flag, working to some
sort of shared purpose. Ostensibly, that purpose was making the varied grinds of
the game quite a bit more manageable. Allied ships share half the gold and all
of the reputation gains of their other ships. But as with most things in games,
the real purpose, for at least some of us, was as usual **fun**. (I, for one, had
completed the most meaningful grinds prior to playing on fleet servers.) A lot
of my fun in *Sea of Thieves* is the social camaraderie of a full Galleon (four
players) working together.

Contrary to some of the hateful antagonist beliefs fleet servers grew on Reddit
and Twitch and elsewhere, running a fleet server is a lot of hard work. There
was no shortcut to building one, it took luck, time, and more than a few social
skills. If you were lucky you might match two Galleons on the same server in
about a half hour, depending on the number of players trying and the time of day
in the server region’s time zone. Do it, say, on a busy Friday night and you
might need twenty or so people and two hours. If you are really lucky you might
match a third ship, but that usually seemed quite rare. Anything after that
required naturally expanding the fleet with the social skills to ask politely
for other players’ ships when they were done with them, and the PvP skills to
back it up when the polite approach fails.

Similarly contrary to some of the worst misimpressions on social media, you
couldn’t just hold a fleet server indefinitely. Some limits were naturally
enforced by the game. (Our servers were sometimes very fun, natural stress tests
for the game. We hit a lot of the game's natural limits.)

* Somewhere around the 24 hour mark originally, and then closer to the 12 hour
  mark after later updates, servers would stop spawning fresh ships, so if a ship
  was lost it couldn’t be replaced.
* Somewhere around the 36 hour mark a server would go "wonky", often lagging
  even for people with small pings. Sometimes small things wouldn't work right
  or at all. [^1]
* Sometime around the 48 hour mark the game would forcefully shutdown the server
  with a 15 minute shutdown warning. [^2]
  
So in general fleets needed to be rebuilt at least once every two days.
Often, we could only hold a server for the full 48 hours on a busy weekend.
While we had a few tricks for holding ships, the game always had afk/lazy kicks
(and they only got better/harsher), and the easiest way to keep a ship is to
have at least one person actively playing on that ship. Additionally, the reason
we could sometimes keep a fleet going for an entire weekend (having players
spread across time zones) was it's own natural limit of server lifetime.
People can't play as many odd hours during the work week, so generally fleets
were built at least once a day during most of a week. Even without the artificial
lag of an old server, the physical lag of long ping times to server regions on
another continent would sometimes drive players to build a new fleet closer to
home.

After a fleet is built it has its own moderation and coordination needs. A full
six galleon fleet has as many as 24 players active (and hopefully more players
passively waiting their turn, and moderators). (At it’s height, the main Discord
guild [^3] I was a fleet builder in had several times hit a full peak of 48 active
players simultaneously across two full servers, often one in a North American
region and one in a European region.) That many people is always a potential
source of conflicts or communication break downs, and not just the obvious ones
from a game designed for PvP that encourages stealing. Some players would always
want to play together, while others might never want to play together.

A lot of issues involved communications breakdowns of one sorts or another. Ships
might have trouble with each other as communication wasn’t always so easy between
them. Ships were each given their own Discord voice channel to focus on intraship
communication. (Voice communication is often preferred for a good working ship.)
Players were encouraged to keep a fleet-wide text chat channel up on another
screen or device nearby for intership communications, but not everyone has two
screens, and even if someone could have the text chat channel visible to them,
they may be too busy on their ship to see texts in a timely manner, much less
respond as such (having to switch apps or devices).

Tired players would make silly mistakes. Pirate players naturally
want to push the limits of group rules, or ask for forgiveness rather than
permission, even when it wasn’t intentional to grief or upset anyone. As busy
as managing a single ship can be, but how isolating the sea can be sometimes when
sometimes all you might see of an allied ship is when they finish a long voyage,
it was often a case a ship might get it into their collective heads the concern
that perhaps other ships on the server weren't quite pulling the same weight.
(This seemed to rarely be the case when such concerns were raised, but sometimes
there might be a crew trying to take advantage.)

Moderation that is its own interesting communication challenge, as most
moderators might only hear of problems after they've escalated in game.
Moderators might have other things they are doing such as watching TV, studying,
or playing other games. Even moderators active and playing inside a fleet might
themselves be quite busy with their own ship's activities and needs. If their own
ship wasn't involved directly in the issue, they may be unaware of other ship's
needs until it is too late, just as easily.

The "Ship Health Analysis, Reporting, and Organization Notifier" or SHARON,
named after the fan favorite shipwright of the Golden Sands outpost, was my idea
to try to automate a few chores of fleet building (watching /management /
moderation), and add some simple klaxons for warning moderators about some of
the basic situations that can lead to communication breakdowns. I built it
toward the end of one of our busiest seasons, just in time for a lot fewer
players to need or care about fleet servers as a daily gameplay driver (between
players moving to other games, and a raft of new content in *Sea of Thieves*
itself, most of not useful to large alliances).

## Building a Bot

In a perfect fleet server world, it would be great to have an API to subscribe
to in order to get a bunch of information about a server's state. (Or better yet
a full dashboard that directly shows it. [^4] [^5])

Instead, fleet builders had the merest of proxies to track fleet status: voice
channel player lists for basic ship crew status, and the fleet chat channel for
intership status. Discord provides enough events to subscribe to for a bot track
the same proxied information in nearly real time.

For some time in day job projects, the Reactive Extensions (or ReactiveX or RX,
whichever short form you prefer, not to be confused with DOM framework React
itself) has been a common tool for complicated event-driven programming.
`redux-observable` was the immediate reach for me, providing both the RxJS event
reaction mechanics I wanted and a redux store for state management of all the
domain-specific details I wanted to track.

The high level architecture of SHARON thus flows directly and easily out of
these basic components:

* SHARON tries to bootstrap the redux store contents from a local JSON file.
* SHARON connects a bunch of Discord client events to action dispatchers that
  convert Discord objects to domain model objects.
* SHARON starts the combined redux-observable Epics to react to actions.
* SHARON logs in to Discord to get the whole thing flowing.
* If interrupted (`SIGINT`, good old console Ctrl+C), SHARON tries to save the
  redux store contents to a local JSON file for pick up on next launch, before
  shutting down. (An epic also tries to save the redux store to the file at a
  regular interval.)

I think this gives a bit more structure than many comparable chat bots I've seen.
I feel that anyone comfortable with redux and/or redux-observable should have an
easy time seeing the structural components: Actions, Action Dispatchers, Store
models, Reducers, and Epics for asynchronous and/or complicated event side effects
(such as sending chat messages) and reactions.

I feel like it made for a good architecture and I'd likely reuse it for future
bots.

## A Single `redux-observable` Disappointment/Wish

One thing I'm moderately dissatisfied with `redux-observable` in this use case
is an inability to signal a shutdown for epics. This is something that generally
matters less in React in the browser, but is often requested for greater
server-side rendering (SSR) support for React applications.

While I can mostly rely on the single-threaded nature of JS to avoid serializing
a bad redux state to JSON on a clean shutdown of the bot, it still would be nice
knowing that it was also after training any remaining in-progress epics
finished their work.

Per the suggested practice of one of the SSR proposals, I tried to make sure that
all of my Epics in SHARON complete if the main `action$` observable itself
completes (adding a `takeUntil(last(action$))` in the worst case).

## SHARON Progress At Current Pencil's Down

I tried to track my ideas and progress on SHARON in the GitHub issues. The
[Demo Day milestone](https://github.com/WorldMaker/SHARON/milestone/1) was my
progress tracker for where I felt secure enough in recommending the bot to my
Discord guildmates. I feel like summarizing the work finished here to celebrate
spare time achievements that may never otherwise be recognized, given I didn't
make it to "Demo Day" while a SHARON would have still been useful to my main
*Sea of Thieves* guild.

What I completed I think is easy and readable in the Epics, even months since
I last looked at the codebase:

* Regular status checks that the redux store did not miss events from Discord,
  and on bootup to catch up with any changes
* Running logs (based on the Action stream) coalesced to a Bot logging channel
* Regular reports to fleet text channels of the redux store's view of fleet
  status
* Basic player activity workflow tracking:
  - When a player joined a ship (voice channelin a fleet)
  - If a player just joined (possibly "just visiting"), versus has been active
    for some time
  - If a player just left (possibly left the ship or fleet for good)
* Some basic alarms, and the reporting for such, for basic fleet statuses that
  could indicate a problem or a near problem:
  - A player may have been playing too long (thus at risk of possibly leaving
    abrubtly)
  - Too few players active on a ship for the ship type (thus leaving the ship
    possibly at risk of being lost entirely)
  - Too many "young" players on a ship type, based on having any Discord
    hierarchy rank (thus leaving the ship possibly at risk of distraction from
    fleet goals, ignorance of fleet norms and rules, or just generally newbie
    mistakes)

The two big goals for "Demo Day" were to add text chat monitoring for two key
bits of information:

* How many players may be leaving the game soon and approximately how soon
  (thus giving players waiting insight into approximately how long their
  wait may be, and moderators approximate alarms on which ships may soon be
  at risk)
* Voyage progress (a necessary part of approximating wait times, as most players
  wished to finish voyages) [^6]

The indications from my guild was that this particular functionality was
particularly important, but also the toughest part, because you would need
to train at least some players to opt in to this sort of tracking. What you
really want is voice chat monitoring as that would reduce friction of players
needing to switch to text chat and input anything. (But I wasn't sure I had
a way to do that cheaply/reliably in hobby project for a game's Discord bot
mode.) A further complication, and the largest skepticism from my guild was
opt-in training for "bot commands" and that no one would want to learn them,
should have to learn them, would probably use them.

I thought I had two great mitigations planned:

1. Mostly English-like language recognition over a "command language". You
   can see a small example of the [compromise](http://compromise.cool)-based
   approach I was intending to use, already modeled for leaving utterance
   recognition in the code repository.
2. Gamification: People will opt-in/learn if it is fun. People will opt-in/learn
   if there are prizes, such as leaderboards tracking fastest voyages (or parts of
   them).

Plus, for things like voyage tracking I'd only need one of out every (usually)
four active players to learn how to do it, and do it. (Another concern often
brought up was multiple report handling, but I figured an RxJS grouping
by ship for short time windows then "sorting by most specific" would easily
handle that.)

## `redux-observable` Seems Great for Bots

I thought applying `redux-observable` was the perfect architecture for my hobby
project bot for Discord. It's a cool use of `redux` and `redux-observable` outside
of the usually expected React (or other GUI framework frontend) world. SHARON
might not currently be live and shouting fleet alarms at Discord guilds, but that
doesn't mean it wasn't a useful hobby project.

---

[^1]:
    One mitigation we started enforcing was that any treasure, loot, or cargo that
    was unwanted should be dropped into the sea itself to sink making it easier
    for the server to garbage collect it. When done as a rule, from the start of a
    server, we pushed the old server "wonky" point sometimes as far as around
    40-45 hours.

[^2]:
    Made for some fun, tense last minute "sell everything we have", given with bad
    wind it was easily possible to be fifteen minutes from the nearest outpost,
    especially on an already lagging server with the added stressful lag of server
    notifications from everyone else in the Alliance selling as quickly as possible.

[^3]:
    I realize that most people refer to these as "Discord servers", but I find that
    name somewhat dumb (as technically inaccurate, and confusing with other uses of
    the word "server"), and much prefer Discord's own API documented name for them
    "guilds". I realize why that term fell out of favor at it is very videogame and
    not all groups on Discord are game players, but it's still a better term for
    a group/team on Discord.

[^4]:
    Our ships always flew Reaper's Flags, which display their location at all times
    on the server's map, even and especially when didn't control a full server.
    This made it easier for spotting the lucky circumstances if someone managed to
    match a fresh ship on our server. It sometimes deterred would be PvP players
    as players would sometimes skip servers full of Reaper's Flags. (Other times
    it encouraged them, especially during the social media blow back against fleet
    servers.) Alliances themselves also give full such surveillance among members.
    Given the existing in game "double" opt-in to surveillance, having an
    out-of-game map display, at least, wouldn't be hugely game changing.

[^5]:
    As long as I'm wishing for ponies here, let's not forget it would be lovely to
    have private or semi-private server management APIs. It would be great to spin
    up ships and send player invites without the messiness of daily luck and
    talking to people.

[^6]:
    Here so much is a wish for an API directly to pull that information from the
    game itself.
