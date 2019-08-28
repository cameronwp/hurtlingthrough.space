---
title: "Three Lessons from a Year of Being a Lone Developer"
date: 2019-08-28T14:35:37-04:00
tags:
  - nasa
  - lessons-learned
summary: What to consider and advice for solo devs out there from my time working alone on a platform at NASA.
twitterprompt: Cameron tries to give practical advice to software devs taking on big solo projects.
draft: false
---

_Disclaimer: all opinions below are my own and not representative of my employer or NASA._

<p class="lead-in">
I work on a number of projects at NASA Johnson Space Center, most of which involve large teams of scientists and engineers. One project, though, is a bit lonely. I am the only engineer developing an imagery analysis sharing platform. The platform will support JSC <a href="https://en.wikipedia.org/wiki/Photogrammetry" target="_blank">photogrammetrists</a> who will be scrutinizing every pixel in every image taken of the external surface of the Orion crew vehicle. They'll be looking for signs of damage, indications that specific events occurred successfully, and a million other variables. They'll use the platform during the upcoming Artemis missions to share their analyses with each other, flight controllers, and engineers across NASA centers.
</p>

Being the <s>lead</s> lone engineer (and designer!) on a greenfield project has been a great learning experience. There won't be many users - maybe a few dozen active at peak - but it's hard to find stakes higher than keeping people safe in space. This software will likely follow the Artemis project from the first test missions to its conclusion maybe decades in the future. Thus, I've been making choices to prioritize reliability, my development velocity, and long term maintenance. Here are three pieces of advice for engineers at the outset of their own lone projects.

## Wireframe Early and Often

You can learn a lot in a short period of time with wireframes. Take the time to slow down and flesh out your design ideas before writing a line of code.

I wish I had spent more time wireframing when we first started. Not being a designer by trade, I'm not inclined to spend hours in tools like Sketch, Photoshop, or even Keynote. Rather, I whiteboarded some basic designs and asked the team if they were on point. I got a lukewarm reception, which I misinterpreted as my poor drawing skills not fully conveying my brilliant designs. I'm a better coder than I am artist so I took to my IDE to start coding up some "quick and dirty" prototypes.

This was a huge mistake. There's no such thing as a "quick and dirty" prototype - even the most basic functional designs need non-neglible infrastructure. I made hasty choices to build prototypes, which rotted into technical debt almost immediately. A few months into the project, I realized I was working the UX around the tech stack, rather than letting the UX lead the way. While it technically checked all the requirements boxes, the UX screamed "an engineer designed me." Frustrating and over-complicated.

Being a project with a long horizon, I've been able to take the time to refactor the tech stack to better suit the UX. This is pure luck. Had this platform been supporting an organization with a limited runway, my haste to start coding could have killed us before we left the starting line.

## Work in the Open

Avoid surprises! In practice, this means keeping staging up-to-date and publishing task priorities. Most importantly, _communicate_.

If you are like me and you do a job that no one else on the team has any expertise in, then you are in a tenuous employment situation (doubly if you work remotely!). How can anyone on the team know if you're _actually_ fulfilling your duties and meeting their needs if they never see your work and don't know what you do?

I've found that frequently calling out new features in staging and setting up regular opportunities for demo sessions have been hugely helpful. Giving your customers access early and often to your project helps you get feedback faster. It also helps your teammates better understand your development process and progress.

Likewise, proactively informing management of your progress towards project goals keeps them happy. You never want to be asked ["what would you say you do here?"](https://www.youtube.com/watch?v=StIcRH_e6zQ)

## Choose Boring Technologies

Many factors influence tech stack decisions - the ability of languages and frameworks to support the customer's primary requirements, your (team's) comfort with languages and frameworks, your existing infrastructure, how much time you have, performance goals, and probably a million other things.

All things being equal, I recommend making the [boring choice](https://mcfunley.com/choose-boring-technology).

Your customers don't care what tools you used - they just care what you can do for them.

What picking boring technologies allows you to do is focus on business problems - not implementation problems. If you're working by yourself or facing tight deadlines, you don't have the luxury to worry about implementation. Boring technologies are widely used, well documented, and proven solutions at scale. Boring technologies aren't going anywhere - they have active maintainers and helpful communities. It's unlikely that you'll try to do something with a boring technology that no one has tried and documented before. But most importantly, your code will fail in expected ways that you can plan for and mitigate.

Choosing a boring technology for my backend stack in particular has been one of the best productivity decisions I've made. I considered building the API with Golang. I love Golang. It's a joy to read and write. It has fantastic APIs, superb documentation, and an unmatched toolchain. Its performance is bar none. I've used it in a number of projects in the past and always enjoyed the experience. But! It was the wrong language for this project.

In exchange for performance, Golang forces you to think about low-level details. For large teams with high performance metrics, that's great. But that's not me here. I needed a backend stack that would support my ability to focus on high level business goals without tripping over low-level details. Two stacks came to mind - Ruby on Rails and Python Django. Both are "kitchen sink" style frameworks. Either would have been great for this project, but more people at NASA write Python than Ruby (I might not be the only developer on the platform forever!). I know Python better than Ruby. So for us, Python was the boring language and Django was the boring framework.

The boring choice has been a huge win for us - my team doesn't know the difference between speedy Golang and boring Python. All they know is that I was able to give them a beautiful data admin interface on day one. All they know is that I have a beta ready well ahead of schedule. And all I know is that they're getting a reliable, extensible platform to keep astronauts safe.

---

Do you work on your own? Have you worked as a lone developer? What advice do you have? [Tweet at me](https://twitter.com/intent/tweet?original_referer=https%3A%2F%2Fhurtlingthrough.space%2Fposts%2F20190828-three-lessons-from-a-year-of-being-a-lone-developer%2F&ref_src=twsrc%5Etfw&text=Cameron%20tries%20to%20give%20practical%20advice%20to%20software%20devs%20taking%20on%20big%20solo%20projects.&tw_p=tweetbutton&url=https%3A%2F%2Fhurtlingthrough.space%2Fposts%2F20190828-three-lessons-from-a-year-of-being-a-lone-developer%2F&via=cwpittman) and let me know! Seriously, I'm working all by myself here and I'd love some company :)
