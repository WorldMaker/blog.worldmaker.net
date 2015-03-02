---
date: 2010-03-06 00:31:46.678584
db_id: 563
db_updated: 2010-03-06 01:11:28.925092
layout: post
tags: games game-design keylimepie
title: 'A First Slice of KeyLimePie: Shepard Meets Blastos'
---
It's one thing to talk about a project and another to show a crude work in progress as an example of what I'm doing with it and where I expect it to go. `When I introduced KeyLimePie`__ I mentioned that I was excited about how simple the basic data model is, and yet how powerful (or more precisely: expressive) it can be. Now I'd like to start by showing off some of the simplicity with an actual example. For this first slice [1]_, I'm going to use a very simple, somewhat silly *Mass Effect* fan fiction conversation I wrote, in which Commander Shepard bumps into a well known hanar SPECTRE and needs to recruit "him".

__ http://blog.worldmaker.net/2010/feb/09/keylimepie-visual-novel-engine-and-deceptive-power/

This example I first scripted directly in YAML. Then it served as my test script for writing a tool to convert from Celtx to my YAML-based data model, so then it was rewritten in Celtx, had some light spell checking/editing, and was converted back to YAML to compare against the original. Then it was converted to JSON because I decided that I didn't want to use either of the two YAML libraries for .NET in Silverlight, whereas *System.Json* is quite accessible and handy. (YAML and JSON are good friends, and while I'd rather write by hand in YAML, converting from YAML to JSON is very straightforward.)

Nevermind the technical stuff, let me present what this script looks like visually:

.. image:: http://if.unlore.com/shepbla.png

That is directly from my visualization tool ("whip"), with no doctoring of any sort. It shows the entire branching layout of the conversation from start to finish, including pre-conditions. I figure that you shouldn't have much trouble following it if you have any experience with state machine diagrams and/or *Mass Effect*. You'll notice the requisite paragon/renegade checks, of course. It's a bit harder to tell from just the compass direction names, but you should also notice that I also try to stick to the directional conventions of *Mass Effect*: northern (up) choices are predominantly more paragon, while southern (down) choices are predominantly more renegade; eastern (left) choices generally lead towards the conclusion of the conversation, while western (right) choices generally lead towards additional information, but with the exception of "strong" renegade/paragon actions which are also westerly.

Anyway, now that I've rambled enough, why don't you try actually playing through this quick/simple conversation? What follows is the first prerelease of KeyLimePie. It has some rough edges and the current UI is a bit on the crude side, I think, but I've not yet had a Graphic Designer offer to lend their skills to make KeyLimePie awesome. However, this full test conversation is playable and should give some idea of where I'm going with KeyLimePie. I'd love to hear any feedback you have on this project. You'll need Silverlight 2 to view this (presumably Moonlight 2 should also work, but I won't officially test it until after I post this):

.. raw:: html

    <div id="silverlightControlHost">
		<object data="data:application/x-silverlight-2," type="application/x-silverlight-2" width="480" height="320">
			<param name="source" value="http://if.unlore.com/KeyLimePie.meff.xap"/>
			<param name="background" value="white" />
			<param name="autoUpgrade" value="true" />
                        <param name="enableHtmlAccess" value="true" /> <!-- Because I use it for Blend checking? -->
			<a href="http://go.microsoft.com/fwlink/?LinkID=124807" style="text-decoration: none;">
     			<img src="http://go.microsoft.com/fwlink/?LinkId=108181" alt="Get Microsoft Silverlight" style="border-style: none"/>
			</a>
		</object>
		<iframe style='visibility:hidden;height:0;width:0;border:0px'></iframe>
    </div>

.. [1] The whole point of choosing a classy name like KeyLimePie is bad puns and silly broken metaphors, if you haven't already guessed.