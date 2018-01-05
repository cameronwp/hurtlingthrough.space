---
title: "Marvin: (Deep) Spacewalks"
date: 2017-12-30T18:07:33-07:00
tags:
  - marvin
  - spacewalk
  - nasa
  - basalt
  - neemo
summary: The future of spacewalks. How NASA astronauts and flight controllers manage EVAs, and the software we're building to support them on Mars and beyond.
twitterprompt: Cameron explores more efficient ways to perform spacewalks
draft: true
---

<><>start off with an image of an astronaut<><>

Human beings in spacesuits outside of spacecraft have taken some of the most remarkable pictures of the space age.

<><>insert more images of astronauts<><>

## The Backstory

Spacewalks fall under a broad mission category known as extravehicular activity (EVA).

Astronauts perform spacewalks routinely, but they're anything but routine. Crew members leave the spacecraft only when necessary, such as for hardware installations, repairs, and, during the Apollo missions, exploration.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wbAF1EExpek?rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

_Funnily enough, this is one of the most realistic examples of EVA chatter I've seen in a movie (minus the fact they omitted the Earth-Mars time delay)._

Every astronaut on EVA faces heightened risk. They rely on localized life support systems (LSS), which provide limited consumable resources like oxygen and battery power. They face direct exposure to space, an already hostile environment even before considering the possibility of hardware malfunctions, micrometeroid impacts, sudden solar flares, and a million other incapacitating events. In the event of an emergency, crew members must react quickly and precisely to stave off disaster. In fact, over the nearly sixty-year history of EVAs, about 30%<><>cite with matthew's thesis<><> of EVAs have experienced some kind of incapacitating event that led to early ingress (coming back into the spacecraft, as opposed to egress, when a crew member exits the spacecraft).

Given the risk inherent to EVAs as well as the general complexity of EVA tasks, each EVA is a highly choreographed event, sometimes years in the making. As an extreme example, the alpha magnetic spectrometer (AMS), an external piece of hardware onboard the International Space Station (ISS), currently needs repair (I believe a valve needs to be repaired, and it's unfortunately tucked deep within a nasty nest of sharp surfaces in an awkward location). NASA built a full-scale replica of the AMS for use underwater at the Neutral Buoyancy Lab (NBL, basically a massive swimming pool for weightlessness training) and astronauts will be training for at least two years for the mission.<><>cite if possible<><> During this mission and every other EVA, crew members will be / are in constant, direct contact with personnel in Mission Control Center (MCC) at Johnson Space Center in Houston. In fact, mission operations / flight controllers at MCC (which I'll frequently abbreviate as "ops") will effectively call every shot. They will keep track of the mission timeline, task status, and suit telemetry (data describing the state of the spacesuit), and they will control most assets like the Canadarm 2 as well. The astronauts themselves are almost robots or actresses following a script with little opportunity for ad-libbing. An additional crew member inside the spacecraft, known as the intervehicle (IV) crew member, monitors many of the same variables as ground and can communicate directly with the extravehicle (EV) crew member.

The few people at risk in space benefit from dozens (maybe hundreds) of experts on the ground analyzing, predicting, and optimizing for mission success. In low Earth orbit (LEO), cis-lunar space (between Earth and the Moon) or on lunar EVAs, keeping MCC in the loop for all decision making is a viable operations concept because the speed of light allows it. ISS is only a few hundred kilometers above the ground, where the communication lag is low enough that space crew and ground personnel could reasonably play online video games together. In more official terms, we call the lag one-way latency time (OWLT). The OWLT of ISS is measured in the 10s of milliseconds.<><>check<><>. The Moon has an OWLT of just over one second. MCC to Moon communications are awkward (think a bad connection on an overseas video conference), but they still enable real-time communication and decision making. Exploration targets past the Moon, however, increasingly isolate crew members.

Most reasonable near-Earth asteroid targets are distant enough that OWLT is measured in minutes. Mars has a OWLT between 4 and 22 minutes, depending on our orbital orientation. In the worst-case scenario, roundtrip communications between Earth and Mars take a minimum of 45 minutes. Ground cannot provide anything resembling real-time direction if we're hamstrung by question-response cycles that take the better part of an hour. Clearly, we need to rethink our EVA operations concept before we get to Mars.

A NASA researcher, Matthew Miller, began working on this problem during his doctoral research at Georgia Tech. He asked how crew members could support themselves on EVA under time-delayed operations constraints. He envisioned a multi-pronged approach, where a mix of operational changes and technology would afford crew members greater independence. In a friend-of-a-friend set of circumstances, Matthew and I met two years ago and I agreed to help with the technology for his thesis, primarily by building the decision support system (DSS) software behind both the control group and a prototype with independence-enabling features. In the two years since then, we've been able to test our prototype with real astronauts on EVAs underwater on coral reefs in the Florida Keys, simulated astronauts hiking around lava flows in Hawaii and Idaho, and undergrads playing Martian explorers in laboratory controlled exercises at Georgia Tech.

The key to greater independence is augmenting the observational and predictive capability of the IV crew member who remains inside the spacecraft while her EV counterparts perform tasks outside. If an IV is as capable as the ground, our thinking goes, then the crew can safely perform EVAs without real-time support from MCC. Matthew spent hundreds of hours learning from NASA mission operations controllers, including observing ISS EVAs from MCC and interviews designed to extract the flow of information and level of importance of information on decision making during EVAs. He and I also participated in multiple analog EVA missions, during which we simulated exploration-style EVAs alongside multidisciplinary scientists, flight controllers, and operations researchers in the field. Currently, Matthew is continuing his research at [Jacobs](https://www.wehavespaceforyou.com/), a NASA contractor, where he is building a hybrid reality (VR + interactive physical objects) lab capable of repeated, controlled simulated EVAs.

## The Baseline Control

In order to build a case for an advanced DSS prototype, we needed to determine that current technology and methodology cannot feasibly support time delayed missions. To do so, Matthew recruited Georgia Tech undergrads to take part as simulated Martian astronauts. He pared down the scope of the workload in the lab to two EVA requirements - monitoring life support and tracking the mission timeline (basically the set of actions that astronauts are scheduled to perform during EVA). These two priorities fell out of the learnings from NASA mission operations folks and we thought they were possible to tackle in the time remaining before Matthew wanted to graduate (obviously the most pressing concern for any PhD student). Incidentally, I only needed to build an Extravehicular Mobility Unit (EMU) spacesuit telemetry display. Believe it or not (and I had a really hard time believing this), a huge portion of tracking the mission timeline is done _by hand_. A mission timeline is essentially a massive spreadsheet with expected task durations, descriptions, and priorities. It is printed, 3-hole-punched, and dropped into binders. Flight controllers use pencils and calculators to follow along and make decisions. We needed make our simulated astronauts follow the same paper-based procedures.

![gemini 12 flight plan that looks like a spreadsheet](gemini_12_flight_plan.jpg)

_I took this picture of an exhibit at Adler Planetarium in Chicago. This Gemini 12 flight plan looks almost identical to the mission timelines for ISS EVAs._

<><>image of ISS EVA timeline?<><>

For reasons beyond the scope of this blog post, ops still follows some of the same general methodologies from the Gemini and Apollo years. There have been many advances, of course, but they have yet to completely separate from pencil-and-paper tracking. During an EVA, ops personnel need to track the time remaining until LSS can no longer support operations (this is a nice euphemism for "time until astronauts will die because they're out of oxygen"). There are four resources that could potentially be _limiting_ consumables - battery power, oxygen, CO<sub>2</sub> scrubbers, and water. The loss of any single consumable means the suit no longer supports survival. The _limiting consumable_ is the consumable resource of the four listed that will run out _first_, which may change moment-to-moment during an EVA. You calculate how much "buffer" an astronaut has to complete a mission using:

$$
\begin{aligned}
t_{lc} &= \text{time until limiting consumable is depleted} \\
t_{t} &= \text{time remaining to complete tasks} \\
\text{buffer} &= t_{lc} - t_{t}
\end{aligned}
$$

Obviously, everyone wants to maximize this buffer. If it goes too low (or negative!), the team will start cutting tasks.

Similarly, ops needs to know how far ahead or behind the EV crew currently is compared to a nominal (a more fun word for "normal") timeline. Missions often have hard time limits, eg. the crew cannot remain outside for more than four hours. Decisions to keep, cut, or, on rare occasions, add tasks to the timeline depend on an accurate and up-to-date time ahead / time behind calculation. This is a much more difficult calculation because you have to consider the expected duration and completion state (unstarted, completed, aborted, currently executing) of every single task in the timeline. There may be upwards of _hundreds_ of tasks with expected durations at varying levels of accuracy. With the way missions are planned, there are often durations associated with key transitions, such as reaching a traversal checkpoint in 30 minutes or finishing an installation in 75 minutes. At these transition points, it's easy to calculate time ahead / behind. In the middle of tasks, however, the timeline looks fuzzier. Ops may even depend more on intuition than calculations to estimate time ahead / behind. To make matters even worse, there are often multiple crew members outside simultaneously on EVA _performing separate tasks_. Each decision relies on taking each astronaut's individual timeline into account.

![image of a whiteboard with a complicated tree of numbers representing a timeline](timeline-calculation-planning.jpg)

_This is a sketch from a planning session where we were trying to nail down time calculations. To read this graph, each numbered node represents a "step" in the timeline. Steps can have substeps (more on this later). The red number to the top left of each step is the actual duration of a step. The orange number to the bottom left is the expected duration. The timeline is currently on step 10. A, B, C, D, E, F, and G are examples of different ways of we considered calculating time ahead / time behind (I don't remember the rationale behind all of them). Note that "PET" refers to phased elapsed time, a running clock that starts when the first EV egresses, and ends when the last EV ingresses._

Tracking a timeline by hand necessitates _manually_ performing the aforementioned calculations. A mission controller will have to repeatedly perform time math throughout the duration of the EVA. While these calculations only consist of addition and subtraction, the multilayered aspect of tasks in a timeline, the multitaskedness of monitoring an EVA, and the base-60 math all lead to a high likelihood that a mission controller will make a mistake or be prohibitively slow.

In fact, the baseline experiment demonstrated a rough range for just how errant and how slow manual timeline calculations can be.

In the baseline experiment, Matthew tested an IV crew member's ability to perform timeline calculations, with a focus on measuring their speed and accuracy. He recruited Georgia Tech undergrads to play simulated Martian explorers. The experiment setup consisted of two "EV" crew members reading from a script and a single "IV" crew member physically separated from the EV crew. The IV and EV crew were able to communicate real-time with voice and text. They simulated 35 minutes of an EVA, during which the IV crew member (ie. test subject) supported the two EV crew members as they approached an exploration site and began surveying and sampling. The IV crew member had access to an EMU telemetry display (LSS data) and printed timelines in the same format as ISS EVA mission timelines.

![screenshot of EMU telemetry display running in a browser. lots of green, DOS-like text on a black background. looks like it came straight from the 1980s](baseline-emus.png)

_This is a working clone of MCC's telemetry display. More on this in a bit._

<><>insert shot of paper product<><>

<><>insert shot of the setup at GT<><>

<><>insert labeled desk<><>

Throughout the EVA, the IV crew members were tasked with providing the time ahead / time behind calculation and the buffer (also known as the margin) to EV when asked. They had to perform the same calculations whenever the EV crew finished a task, and then write down the results in the timeline. While working, they had to maintain a conversation with the EV crew about science objectives, as well as keep an eye on the EMU telemetry displays to alert the crew if or when they saw anomalous sensor readings. The full results of the experiment live <><>[here in Matthew's dissertation](link to dissertation<><>)<><>, but the gist of the findings is that the IV crew takes upwards of almost two minutes to perform timeline calculations by hand, with an error of **±1 hour** (an EVA is generally 4-6 hours). This is, of course, very significant. You could easily argue that selecting better IV operators and putting them through extensive training would improve speed and reduce errors, and you would be right. But there is more to being a good astronaut than quickly doing math in your head. Computers are _really_ good at math - why not make them do the calculations for us?

## Interlude - Building the Baseline Tool

## The Advanced DSS

Early on, Matthew and I started brainstorming what the workflow for an IV operator in deep space should look like. What kind of information would they want? What kind of actions could we reasonably expect an IV operator to take? Remember, this IV operator would be in a loud, small, metal tube with a dozen voices in their ears, a half-dozen screens in front of them, tasked with monitoring the life support of the EV crew and their own, keeping track of astronaut work, coordinating with scientists and flight controllers in Houston, making sure scientific objectives get hit, and this will be going on for hours. With a plate that full, what can we add that's both easy to do and high fidelity enough to be helpful? We landed on a single click.

<><>image of Marvin UI<><>


