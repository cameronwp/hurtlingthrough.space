---
title: "Marvin: EVA Timeline Breakdown"
date: 2018-01-16T22:19:52-06:00
tags:
  - marvin
  - eva
  - basalt
  - neemo
  - nasa
marvin: 02-timeline
summary: Diving into what happens during EVAs and how they look on paper.
twitterprompt: Cameron plans his spacewalk
draft: false
---

_This is part 2 of the Marvin series. Here’s [part 1](/posts/20180115-marvin-deep-spacewalks/) about why EVA operations research matters._

<p class="lead-in">It's the early 1960s. Picture yourself in a meeting at NASA with scientists, engineers, flight controllers, and astronauts. The summer humidity in Houston makes the air sticky. You feel your allergies flaring up from the cigarette smoke wafting over the table. It's easy to ignore your discomfort though because you’re talking about landing on the Moon in the next decade.</p>

The astronauts want to know what kind of flight controls the Lunar Module will have. The engineers are wringing their hands about about life support systems because humans are so damned difficult to keep functioning compared to lifeless satellites. An administrator hounds the astronauts about their scheduled public appearances to drum up support about beating the Russians who just put Yuri Gagarin in space. With a polite _ahem_, the scientists bring up the topic of what exactly the astronauts should sample on the Moon. The flight controllers nod in agreement.

"Yes," the flight controllers say, "we're glad you brought that up."

This is where the story of Marvin picks up - planning EVAs. Looking through the history of space exploration, human-performed exploration is a rare phenomenon. All astronauts are explorers in the philosophical sense, but only a few astronauts have explored in the Darwin-in-the-Galapagos kind of way. The first EVAs tested engineering limits. Same as the shuttle crews before them, modern ISS EV crews are construction workers in space performing engineering tasks on engineered surfaces. Only the EV crews on Apollo 15 - 17 stepped out of an airlock with the goal of finding something cool outside.

## Apollo Moonwalks

Early Martian EVAs will likely mimic the pattern established in the Apollo missions. Engineering objectives outweighed scientific objectives on the first lunar landings, Apollo 11 - 14, during which lunar pioneers _egressed_ (meaning they left the airlock; as opposed to _ingressed_ when a crew member reenters the airlock) to stretch their legs on the regolith and test equipment and procedures. The EV crews on the later missions, Apollo 15 - 17, focused on lunar science. Notably, the Apollo 17 crew included Harrison Schmitt, the only PhD geologist to ever do field work on a different world.<><>link?<><>

<><>cool apollo pictures?<><>

If you want to optimize a procedure, whether it's tying a shoe or doing interplanetary science, you need to test. You need to make mistakes and learn from them. In that vein, exploration EVAs are uncharted territory. There are only nine examples of exploration EVAs, all of which come from Apollo 15 - 17. As the possibility of future lunar, asteroidal, and Martian EVAs looms on the horizon in the next decades, researchers like Matthew Miller have been [revisiting Apollo missions](http://www.news.gatech.edu/features/lunar-landing-logs) in an effort to learn as much as possible about the human factors and operational concepts that influence EVA mission success.

NASA obsessively plans EVAs for good reason. With higher resolution understanding of the state of an EVA, the better we can prevent unforeseen circumstances from derailing objectives. Apollo EVA planned timelines have minute level resolution, as in, we know what astronauts _should_ have been doing during every 60 second period of the mission. Of course, what _actually_ happened is a different story.

In a paper last year, Matthew and other operations researchers compared planned and executed timelines from the lunar EVAs of Apollo 14 - 17.<sup>1</sup> We generally call this comparison the _time behind_, which reflects the fact that most EVAs fall behind schedule. Given that a timeline consists of an un-gapped sequence of tasks, each with a defined start time (more on how tasks are defined in a moment), you can calculate the deviation between the planned and executed timeline with

$$
\begin{aligned}
\text{time behind} = &\text{actual mission clock at start of task} \\
&- \text{planned mission clock at start of task}
\end{aligned}
$$

The mission clock is called the Phased Elapsed Time (PET). It starts at 00:00 (HH:MM usually) when the first crew member egresses and counts up until the last crew member ingresses.

EVAs begin with egress and equipment checks. Once complete, they go into a cycle where EV crews move through three types of activity - traversal, overhead, and station activities. During traversal activities EV crews relocate to a worksite. Once they reach it, they generally begin an overhead phase, where they unpack and prepare equipment they need for the next phase, station activity, where they use the equipment to complete mission objectives. Once EV crews finish station activities, they reenter an overhead activity while they pack up equipment, clean up their worksite, and then likely move into another traversal. The cycle repeats N times before before EV crews finally ingress.

![a graph with time behind data points from apollo 14 - 17 EVAs. the trend lines go up mostly, with a slight downward trend near the end before sharply rising back up to finish.](./fig33.png)

_This graph shows how the time behind varied on average for Apollo 14 - 17 EVAs.<><>cite p66, figure 33<><> The x-axis shows PET and the y-axis is time behind. Phase 1 is egress, phase 2 and 3 consist of traversal-overhead-station activity cycles. Phase 4 is clean up and ingress.<><>check!<><>_

Time behind got worse as EVAs progressed. Egressing generally proceeded at a nominal pace (NASA-speak for "expected" or "within acceptable bounds"), but pretty much everything else took longer than expected. In fact, 80% of the timeline data points used to generate this graph were behind schedule.<><>cite<><> The few points that contradict the general trend almost always benefitted from cutting prior tasks from the as-performed timeline.

I'll leave diving into the full set of a statistics as an exercise for the curious.<><>cite<><> Suffice it to say that science _always_ takes more time than you think. But that's no excuse for failing to stick to a timeline when you're aware of the tendency for delays and you've got the time to prepare for it. Marvin is our attempt at subverting fashionably late exploration EVAs. The first step to running tighter EVA timelines was to create a detailed language to describe them. In other words, we needed a schema.

## Timeline Schemas

Timelines haven't changed much since the 1960s.

![gemini 12 flight plan that looks like a spreadsheet](gemini_12_flight_plan.jpg)

_I took this picture of an exhibit at Adler Planetarium in Chicago of a Gemini 12 flight plan._

<><>pull image of an apollo timeline from the paper<><>

<><>pull image of an ISS timeline<><>

Modern ISS timelines follow basically the same structure as early Gemini and Apollo timelines. Each one consists of high-level plans that describe broad phases of the mission and low-level procedures for the minute-by-minute, atomic level details. They are generally presented as such.

<><>image of timeline with inset<><>

Matthew and I went back and forth about how a timeline is structured. I emphasized being as specific as possible with our definitions.

<><>why being specific matter<><>
<><>what we came up with<><>
<><>start discussion about JS implementation. pros and cons about performance?<><>

<><>hierarchy diagram<><>

<><>how the hierarchy has affected decision making - less flexibility for on-the-fly changes. difficulty with unknown number of cycles<><>



I've been in meetings where we have a 20 minute discussion about the different ways to strike a rock with a hammer and what they're called. There were factions within the geologists, notably by nationality. At one point, a Brit tossed out the term "cheeky knock," which instantly became canon and I'm sure has since been published in geology papers about BASALT.

"In particular, the Apollo program pioneered
the concept of incorporating a team of scientists to support real-time and strategic
decision making regarding human surface operations" p5

section 1.2 - all about structure of timelines

"An EVA timeline is
a compiled, sequenced set of tasks at various levels of description which contains
the geospatial and temporal information associated with all tasks to be performed" p8

p15, 16 - start description of timeline structure
p18 - measuring tasks. is a task duration really the diff between its start time and the next's? (probably good to hint at Marvin's step duration definition (no dead time))

<sub><sup>1</sup>Comprehensive data on their timelines did not exist, so Matthew had to compile it. Last year, Matthew and co. published this data in a paper titled "Operational Assessment of Apollo Lunar Surface Extravehicular Activity." <><>link with formal citation<><> </sub>


## outline
* brief intro
* review of the paper
	- comparison to other industries
	- note challenge of matching as-planned and actual timelines. crew often called out completion of tasks in bulk rather than instantly when done
* deconstruct a timeline (apollo / iss ?)
	- activity, task, subtask, procedure
* interlude: telemetry in Mission Control (shot that Matthew took?)
* show timeline of GT experiment
* break down how the GT experiment worked
	- the EV actors
	- the IV
	- what's on the screen, what's on paper
	- the scenario the IV crew were given
		+ how we tweaked it
* some high level results re: timing