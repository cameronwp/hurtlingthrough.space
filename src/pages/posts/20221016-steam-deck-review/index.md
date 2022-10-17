---
title: "Steam Deck Review - Or My Hunt for the Perfect Console"
date: 2022-10-16T13:37:58-04:00
tags:

-   gaming
-   linux

summary: I got a Steam Deck thinking it would be my go-to handheld retro emulator, but I was wrong.
twitterprompt: Cameron gets his next gaming fix
draft: false
---

I got a Steam Deck thinking it would be my new favorite way to play retro games, but I was wrong.

*FYI, there's a pretty long preamble here. tl;dr I'm obsessed with easy LAN parties everywhere.*

<p class="lead-in">I never grew out of video games. One of my earliest memories is sitting on the
floor at a neighbor's house, watching someone's older brother play <em>Super Mario Bros 3</em> on
the NES. My first system was an NES, but I was more of a Game Boy kid. I would sit around the house
glued to <em>Pokémon Blue</em>. My parents would tell me to go play outside, so I would just walk up
and down the driveway with my Game Boy two inches away from my face. In the 30-some-odd years since,
nothing has really changed. I'd like to claim that I don't get <em>as</em> obsessed with games any
more, but my state of minimum potential energy is still being glued to the couch with a controller
in my hands.</p>

I've owned all sorts of consoles and PCs over the years. I'm not a console gamer or a PC gamer or a
casual gamer. I just like games. I like consoles because they make it easy to sit down and play with
nothing to worry about. I like that PC games offer flexibility, but you have to read the system
requirements and play with the settings to get them just right. And hey, I enjoy tweaking, so half
the fun sometimes is getting a new game to run just right.

I've owned lots of consoles over the years and loved all them. I buy one, I play the hell out of it,
and then I sell it to buy the next one. Looking back, this usual console lifecycle is a little
frustrating. We treat them like disposable commodities. You spend hundreds or thousands of dollars
buying specialized equipment and games, only to ditch all of it when the next system comes around.
Backwards compatibility somewhat addresses it, but noting can compete with the venerability of PC
games.

A few years ago, I decided I wanted to bridge the gap by making my own living room "console" that
could play modern games and retro games.<sup><a id="fnr.1" class="footref" href="#fn.1" role="doc-backlink">1</a></sup> There were two major challenges: (1) finding an interface that would treat all my games
as first class citizens, and (2) making sure a controller could do *everything*, including waking
the console from sleep. My dream was to sit down on the couch, grab a controller, and play any game
ever made.

Technically, any reasonable PC nowadays can emulate just about every system up to Xbox 360, PS3, and
Switch. The hard part wasn't getting the emulators up and running, rather I wanted an interface
where, *only* using a normal controller, I could seamlessly hop between, say, *Shadow of the Tomb
Raider* and *Super Mario World*. Or from *Earthbound* to *Tony Hawk's Pro Skater 4*. Or *Rocket League* to
*Crazy Taxi*. I didn't want to limit myself. The experience had to be as smooth and console-like as
possible.

Steam has Big Picture mode. You can add non-Steam games and display them in your library alongside
your Steam games. This checks most of the boxes, but the interface makes it clear that the non-Steam
games are different. You get less information and the artwork needs to be managed manually. PC games
from other sources also stand out. I own lots of games from the Epic Game Store, Blizzard, and the
PC version of the Xbox game store. Once again, the experience wouldn't be great for them in Steam.

What I wound up doing to solve the first problem was running BigBox by [Launchbox](https://www.launchbox-app.com/) to organize my
games from all my sources and put them in a coherent, controller-friendly interface. I've been super
happy with it for the last couple years.

The second problem was a little more challenging. Controllers connected over Bluetooth work great in
Windows, but they can't wake it from sleep. Almost any peripheral wired over USB can wake a
computer, but running USB cables across my living room was a non-starter. I researched USB dongles
and hubs made for wireless controllers, hoping to find one that could wake a PC from sleep. Lots of
forum research and a couple dongles later, I'm pretty confident in saying the only one with PC
waking functionality is the 2015 version of the Xbox Wireless Adapter for Windows. For whatever
reason, Microsoft removed the ability to wake a PC in the smaller [2018 variant](https://www.xbox.com/en-US/accessories/adapters/wireless-adapter-windows).

Months after building the PC, I found a secondhand 2015 dongle on Ebay for $20, and with that, the
build was finally complete. Just like an Xbox, I can press the big Xbox button on my controller to
wake up my console and hop straight into any game I want. It's a blast.

I'm not always at home though. I go on trips and I take the train to work, so I've always
appreciated a good portable game system. I have a modded 3DS and a Game Boy Color with a [modded](https://www.youtube.com/watch?v=xaGNyhtwmZk) [IPS
panel](https://funnyplaying.com/products/for-gbc-ips-high-light-backlight-lcd-kits) (which is a super cool upgrade and a story for another time), both of which make great
travel companions. They're fun at home too. I thought my DIY home console would be my favorite way
to play retro games, but the 3DS just feels better. I think it's due to the fact that games designed
to be played on CRT TVs look weird on modern TVs. Don't get me wrong, I like jumping into *Super
Metroid* on my TV every once in a while, but I tend to enjoy longer play sessions on my 3DS.

I had my eye on handheld PCs for a long time before the Steam Deck was announced. What's not to love
about the power and flexibility of a gaming laptop with the portability of a Switch? In the first
few years, the value proposition was there, but the execution left a lot to be desired. All of them
had some combination of bad battery life, strange ergonomics, lackluster performance, terrible
software, or expensive price tag. I figured I would eventually get a handheld gaming PC, but I
didn't want one badly enough to be an early adopter.

The Steam Deck, on the other hand, appeared to check a lot of the boxes. It was claimed to be
powerful enough to run the latest AAA games. It looked like it had a full-size Xbox controller
welded onto it. And, as a *major* bonus, it was already running Linux, including giving users easy
access to a full on KDE desktop environment. It was clear that any retro games you could run on Arch
Linux would be playable on the Deck. The battery was supposed to be fine. At $400, it sounded like
something I was willing to take a chance on. I registered to get in line to buy last July, and
bought it as soon as I got the email saying my pre-order was ready back in August.


# Actual Review

It doesn't make sense to separate a review into hardware and software components. This is like some
Apple and Nintendo products where the whole is greater than the sum of the parts. Hardware and
software work together (almost) seamlessly. As an entire package, the Steam Deck is in a category of
its own.

The experience of using one seems to be unique to everyone depending on their interests. For me, I
opened my Steam Deck thinking the value proposition was the same as my DIY console - play
(basically) every game ever made - in a portable package. It seems like it was made for me. Not only
does it run Linux, but a full KDE desktop is only one menu away! The first day I got it, I wanted to
copy over all my retro games. I played around in the terminal and realized that it already had `ssh`
and `rsync` installed! It was a piece of cake `rsync`-ing all the games I wanted. This was a feat
that is insanely difficult, if not impossible, on most consoles, but Steam Deck made it trivial. I
was in love right away.

Next I ran [EmuDeck](https://www.emudeck.com/) to simplify the installation and management of retro games in the main Deck OS.
It worked great. After a few hours of tinkering, I was finally ready to start adventuring through my
library.

Two months later, I'll admit that I've only spent about 1% of my time on the Deck playing retro
games. They're fun and run great, but the Steam Deck has so much more to offer. I'm assuming
basically everyone who has read this far into this review probably has a large Steam library. And
your libraries might include an embarrassing number of games that have never been played. I'm like
you. The library menu in the Deck suggested a lot of games that are already verified to work. I saw
a bunch of older titles I either (a) forgot I owned or (b) wanted to try but never felt compelled to
go through the effort of installing them on my gaming PCs. Why not? I thought. All of a sudden, the
Steam Deck was a console that came with hundreds of AAA games. The sweet spot seemed to be games
from a few years ago that look great on an 800p screen when you bump the graphics all the way up,
while still getting decent battery life. Most unverified and unsupported games I've tried actually
do work. Sometimes they need some tweaking, other times you just have to put up with some kind of
annoyance around text. But they generally work! (Notable exceptions are games with heavy handed
DRM.)

I spent most of the first few weeks trying out my old games and marveling at how cool it is to be
playing them on a handheld. The novelty eventually wore off. I regressed to my old habits of keeping
a few games in regular rotation. At the moment, these are *Rocket League*, *Halo: Infinite*, *Slay
the Spire*, *Hades*, and *Super Mega Baseball 3*. Sometimes I experiment with other games. For
instance, I'm trying to get through *Cyberpunk 2077* right now (the extensive, monotone dialog has
been making it really hard to stay interested). I used to play everything on my DIY console, but now
I'm (almost) exclusively playing on the Deck.

There's a *je ne sais quoi* about it that hasn't worn off. I thought at first it was just the
novelty of a portable gaming PC. Now I'm realizing it's because it simplifies my gaming life. There
are no hard compromises hindering the gaming experience. The screen is obviously a lot smaller than
my 65" TV, but, when held at a normal playing distance, the Deck is about the same apparent size as
my TV when I'm sitting on the couch. The joysticks took a little getting used to, but I feel like I
can't use that as an excuse any more when I miss headshots in *Halo*. The battery life could be
better, but my gaming sessions are usually well under two hours anyway so it hasn't annoyed me.
Overall, it just feels like a really great console that's always nearby.

Take last night for example. A friend and I went online to play a few missions of *Deep Rock
Galactic*. I wanted to see if I could simplify my setup. We use Discord for voice communication. I
usually load up the game on my PC and Discord on my phone so I can be mobile while playing (in case
I want to go to the kitchen for a cold beverage between rounds). I figured firing up Discord on my
Deck would make my life easier - gaming and talking on the same device.

It turns out that SteamOS already allows you to put applications in the background. While In gaming
mode, I opened Discord and joined our voice chat. Then I used the Steam button to go back to the
home menu and load *Deep Rock Galactic*. It just worked! Discord happily ran in the background and
the game didn't seem to even take a performance hit. Audio levels were all reasonable too. It was so
smooth that you'd think the engineers planned for this exact use case. My friend and I could have
played together in so many other ways, but it was freeing to be able to wander around my house with
one device while effectively feeling like I was at a LAN party.

This wasn't the first novel LAN party I've had with the Deck. For whatever reason, my family,
including the non-PC gamers, have all become big fans of *Left 4 Dead 2*. Someone will text
"Zombies?" to the group and we all hop on Steam. I went on a weekend trip a couple weeks after I got
the Deck and got the call-to-arms one night while I was in the hotel room. I hadn't even connected
my Deck to the hotel's wifi yet.

Like the Switch, which sometimes has a hard time with guest wifi login screens at hotels, I couldn't
get the Marriott guest wifi screen to show up in gaming mode. Unlike the Switch, I just switched to
the KDE desktop and connected no problem. I downloaded L4D2 after a couple minutes and joined the
game. As expected, it ran great! (Maybe this is more of a testament to how fast hotel wifi has
gotten?) Now, I easily could played on my laptop, but there's something magical about laying on a
hotel bed and hopping into an impromptu LAN party. It was frictionless. I got to play my way. Just
because I was traveling didn't mean I was left out of the fun of our zombie hunting sessions.

I think the magic of the Steam Deck comes from the level of effort required to have a good time. No
fancy equipment, no extra peripherals to carry around, no worries about hooking up to a TV if you
don't want to. Just pick it up and play whatever you want, however you want. The Steam Deck isn't
perfect by any stretch of the imagination, but it sure makes everyday gaming feel more accessible.


## Negatives

So this review doesn't come off as too biased, here's a list of actual negatives about the Steam
Deck.

-   Battery life leaves something to be desired if you're playing modern games
-   The joystick stems seem to have been grinding on the plastic of the case. It feels a little gritty
    when you push the joysticks all the way out and slide against the plastic enclosure(?)
-   Fan noise is noticeable. It gets about as loud as a small laptop fan on full blast
-   Navigating KDE with the built-in controls still feels clunky (this is a nitpick - it's so
    amazing having KDE to begin with)
-   There are still Steam games that aren't compatible (not really a complaint though because, holy
    cow, it's impressive how many are compatible and how fast compatibility is improving)
-   An OLED screen would really make the Deck pop


## Other Random Positives

The Steam Deck does a lot of little things right.

-   I love the full size controls. My hands are large. Joycons give me hand cramps. These feel perfect
-   The depth of customization in the controller settings. The new radial input menus are wild
-   I'm loving gyro aiming in first-person shooters
-   It comes with a great hard case! Fits perfectly in my backpack
-   The speakers are surprisingly good
-   New Steam UI keeps getting better
-   The rate of software updates is impressive. Lots of little things have been fixed in the two
    months I've had it


# Footnotes

<sup><a id="fn.1" href="#fnr.1">1</a></sup> The specs of the DIY console are [here](https://hurtlingthrough.space/about#living-room-pc), if you're
interested.
