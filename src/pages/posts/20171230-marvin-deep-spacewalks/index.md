---
title: "Marvin: (Deep) Spacewalks"
date: 2017-12-30T18:07:33-07:00
tags:
  - marvin
  - spacewalk
  - nasa
  - basalt
  - neemo
draft: true
---

<><>start off with an image of an astronaut<><>

Human beings in spacesuits outside of spacecraft have taken some of the most remarkable pictures of the space age.

<><>insert more images of astronauts<><>

## The Backstory

Spacewalks fall under a broad mission category known as extravehicular activity (EVA).

Astronauts perform spacewalks routinely, but they're anything but routine. Crew members leave the spacecraft only when necesssary, such as for hardware installations, repairs, and, during the Apollo missions, exploration.

<iframe width="560" height="315" src="https://www.youtube.com/embed/wbAF1EExpek?rel=0" frameborder="0" gesture="media" allow="encrypted-media" allowfullscreen></iframe>

_Funnily enough, this is one of the most realistic examples of EVA chatter I've seen in a movie (minus the fact they omitted the Earth-Mars time delay)._

Every astronaut on EVA faces hightened risk. They rely on localized life support systems, which provide limited consumable resources like oxygen and battery power. They face direct exposure to space, an already hostile environment even before considering the possibility of hardware malfunctions, micrometeroid impacts, sudden solar flares, and a million other incapacitating events. In the event of emergency, crew members must react quickly and precisely to stave off disaster. In fact, over the nearly sixty year history of EVAs, about 30%<><>cite with matthew's thesis<><> of EVAs have experienced some kind of incapacitating event that led to early ingress (coming back into the spacecraft, as opposed to egress, when a crew member exits the spacecraft).

Given the risk inherent to EVAs as well as the general complexity of EVA tasks, each EVA is a highly choreographed event, sometimes years in the making. As an extreme example, the alpha magnetic spectrometer (AMS), an external piece of hardware onboard the International Space Station (ISS), currently needs repair (I believe a valve needs to be repaired, and it's unfortunately tucked deep within a nasty nest of sharp surfaces in an awkward location). NASA built a full-scale replica of the AMS for use underwater at the Neutral Buoyancy Lab (NBL, basically a massive swimming pool for weightlessness training) and astronauts will be training for at least two years for the mission.<><>cite if possible<><> During this mission and every other EVA, crew members will be / are in constant, direct contact with personnel<>sp?<> in Mission Control Center (MCC) at Johnson Space Center in Houston. In fact, mission operations at MCC will effectively call every shot. They will keep track of the mission timeline, task status, and suit telemetry (data describing the state of the spacesuit), and they will control most assets like the Canadarm 2 as well. The astronauts themselves are almost robots or actresses following a script with little opportunity for ad libbing. An additional crew member inside the spacecraft, known as the intervehicle (IV) crew member, monitors many of the same variables as ground and can communicate directly with the extravehicle (EV) crew member.

The few people at risk in space benefit from dozens (maybe hundreds) of experts on the ground analyzing, predicting, and optimizing for mission success. In low Earth orbit (LEO), cis-lunar space (between Earth and the Moon) or on lunar EVAs, keeping MCC in the loop for all decision making is a viable operations concept because the speed of light allows it. ISS is only a few hundred kilometers above the ground, where the communication lag is low enough that space crew and ground personnel could reasonably play online video games together. In more official terms, we call the lag one-way latenecy time (OWLT). The OWLT of ISS is measured in the 10s of milliseconds.<><>check<><>. The Moon has a OWLT of just over one second. MCC to Moon communications are awkward (think a bad connection on an overseas video conference), but they still enable real-time communication and decision making. Exploration targets past the Moon, however, increasingly isolate crew members.

Most reasonable near-Earth asteroid targets are distant enough that OWLT is measured in minutes. Mars has a OWLT between 4 and 22 minutes, depending on our orbital orientation. In a worst case scenario, roundtrip communications between Earth and Mars take a minimum of 45 minutes. Ground cannot provide anything resembling real-time direction if we're hamstrung by question-response cycles that take the better part of an hour. Clearly, we need to rethink our EVA operations paradigm before we get to Mars.

A NASA researcher, Matthew Miller, began working on this problem during his doctoral research at Georgia Tech. He asked how crew members could support themselves on EVA under time-delayed operations constraints. He envisioned a multi-pronged approach, where a mix of operational changes and technology would afford crew members greater independence. In a friend-of-a-friend set of circumstances, Matthew and I met two years ago and I agreed to help with the technology for his thesis, primarily by building the decision support system (DSS) software behind both the control group and a prototype with independence-enabling features. In the two years since then, we've been able to test our prototype with real astronauts on EVAs underwater on coral reefs in the Florida Keys, simulated astronauts hiking around lava flows in Hawaii and Idaho, and undergrads playing Martian explorers in laboratory controlled exercises at Georgia Tech.

The key to greater independence is augmenting the observational and predictive capability of the IV crew member who remains inside the spacecraft while her EV counterparts perform tasks outside. If an IV is as capable as the ground, our thinking goes, then the crew can safely perform EVAs without real-time support from MCC. Matthew spent hundreds of hours learning from NASA mission operations controllers, including observing ISS EVAs from MCC and interviews designed to extract the flow of information and level of importance of information on decision making during EVAs. He and I also participated in multiple analog EVA missions, during which we simulated exploration-style EVAs alongside multidisciplinary scientists and operations researchers in the field. Currently, Matthew is continuing his research at Jacobs, a NASA contractor, where he is building a hybrid reality (VR + interactive physical objects) lab capable of repeated, controlled simulated EVAs.

## The Baseline Control

In order to build a case for an advanced DSS prototype, we needed to determine that current technology and methodology cannot feasibly support time delayed missions. Matthew pared down his research to two EVA aspects - monitoring life support and tracking the mission timeline (basically the set of actions that astronauts are scheduled to perform during EVA). These two priorities fell out of the learnings from NASA mission operations folks and we thought they were possible to tackle in the time remaining before Matthew wanted to graduate (obviously the most pressing concern for any PhD student). Incidentally, I only needed to build a spacesuit telemetry display. Believe it or not (and I had a really hard time believing this), a huge portion of tracking the mission timeline is done _by hand_. A mission timeline is essentially a massive spreadsheet with expected task durations, task descriptions, and task priorities. It is printed, 3-hole-punched, and dropped into binders. Ops people use pencils and calculators to follow along and make decisions.

![gemini 12 flight plan that looks like a spreadsheet](gemini_12_flight_plan.jpg)

_I took this picture at the Adler Planetarium in Chicago. This Gemini 12 flight plan looks almost identical to the mission timelines for ISS EVAs._