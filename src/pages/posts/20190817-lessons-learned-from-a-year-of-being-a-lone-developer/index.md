---
title: "Lessons Learned from a Year of Being a Lone Developer"
date: 2019-08-17T22:23:37-04:00
tags: 
  - nasa
  - lessons-learned
summary: What to consider and advice for solo devs out there from my time working alone on a platform at NASA.
twitterprompt: Cameron tries to give practical advice to software devs taking on big solo projects.
draft: false
---

_Disclaimer: the opinions below are my own and not representative of my employer or NASA._

<p class="lead-in">
I work on a number of projects at NASA JSC, most of which involve large teams of scientists and engineers. One project, though, is a bit lonely. I am the only engineer developing an imagery analysis sharing platform. The platform will support JSC photogrammetrists who will be scrutinizing every pixel in every image taken of the external surface of the Orion crew vehicle. They'll be looking for signs of damage, indications that specific events occurred successfully, and a million other variables. They'll use the platform during the upcoming Artemis missions to share their analyses with each other, flight controllers at JSC, and engineers across NASA centers.
</p>

I basically play all the roles you might find in a medium sized project - I work with stakeholders to determine requirements, I design wireframes and prototypes, I write and prioritize tickets, I do the actual coding, I maintain the production environment and its related devops, and I perform user research to inform future iterations. That's not to say I don't have help - I have a supportive boss and a project manager who help me daily. The team is super helpful and actively encourages me to dig deep into their workflows to make sure the platform streamlines their work as much as possible. But the vast majority of the work rests on my shoulders.

Being the ~lead~ lone engineer on a greenfield project has been a great learning experience. There won't be many users - maybe a few dozen active users at peak - but it's hard to find stakes higher than keeping people safe in space. Thus, I've been making choices to prioritize reliability, my own velocity, and long term maintenance. Here's what I've considered, the choices I made, and advice for other engineers in similar situations.

## Wireframe Early and Often

I wish I had spent more time wireframing when we first started. Not being a designer by trade, I'm not inclined to spend hours in tools like Sketch or Photoshop. Rather, I whiteboarded some basic designs and asked the team if they were on point. I got a lukewarm reception, which I misinterpreted as my poor drawing skills not fully conveying my brilliant designs. I'm a better coder than I am artist so I took to my IDE to start coding up some "quick and dirty" prototypes.

This was a huge mistake. There's no such thing as a "quick and dirty" prototype - even the most basic functional designs need non-neglible infrastructure. I made hasty infrastructure choices to substantiate my prototypes, which turned into technical debt as the platform evolved. A few months into the project, I realized I was working the user experience around the tech stack, rather than letting the user experience lead the way. While the project was technically checking all the requirements boxes, the user experience screamed "an engineer designed me." Frustrating and over-complicated.

Being a project with a long horizon, I've been able to take the time to refactor my tech stack to better suit the UX. This is pure luck. Had this platform been supporting an organization with a limited runway, my haste to start coding could have killed us dead in the water.

Had I spent more time early on fleshing out wireframes, especially interactive wireframes, I'm sure that I would have come to the same conclusions sooner and with less headache.

## Work in the Open

Especially if you're working by yourself, make sure your customers can play with your work early and often. Push to staging daily and ensure that all of your customers have access. Get as much feedback as possible. No surprises!

I do a job that no one else on my team has any expertise in, and I perform my duties remotely. This is a potentially tentative situation - how can anyone on my team know if I'm _actually_ doing my job and meeting their needs if they never see me and don't know what I do?

I want to avoid surprises as much as possible. To do so, I aggressively work in the open. Beyond simply having weekly standups and regular meetings with my manager, working in the open means that everyone can always know what you've done and what you're going to do next. In practice, this means I publish my task priorities and I keep staging up-to-date. 

## Choose Boring Technologies

Many factors influence tech stack decisions - the ability of languages and frameworks to support the customer's primary requirements, your (team's) comfort with languages and frameworks, your existing infrastructure and processes, how much time you have, performance goals, and probably a million other things.

All things being equal, I tend to make the boring choice.

Boring technologies are widely used, well documented, and proven solutions at scale. Ideally, they have active maintainers and a helpful community. It's unlikely that you're going to try to do something with a boring technology that no one has tried and documented before.

What picking boring technologies allows you to do is focus on business problems - not implementation problems. If you're working by yourself or face tight deadlines, you don't have the luxury to worry about implementation.

Especially after the aforementioned refactor, I can thank boring technologies for allowing me to do so much in such little time. Here are the boring choices I made for this platform.

✔️ **Browser based**

Accessibility is a must. No software platform comes close to the level of access the web provides. Everyone has a browser!

✔️ **Python Django backend**

This is the most important boring decision I made. While most frontend technologies are hot-swappable or interchangable to some extent, backend technologies are much more tightly integrated with your application's data.

I needed a backend stack that would support my ability to focus on high level business goals without worrying about low-level minutia. Two stacks came to mind - Ruby on Rails and Python Django. Rails is fantastic, but I _love_ Python. I considered Flask too, but the Django admin offers incomparable functionality out of the box. It's a huge win for both my workflows and my team's data administration needs. Overall Django is a mature, popular framework with an easy plugin ecosystem to boot.

✔️ **PostgreSQL Database**

I considered PostgreSQL and MySQL. Both options are equally boring - they're each mature, proven databases and you can't go wrong with either one. Django works well with both, but there are some neat built-in extensions to Django's ORM that take advantage of PostgreSQL-only features. I'm also familiar with PostgreSQL, having used it across every company and project I've worked on. PostgreSQL was the most boring decision I could make here.

✔️ **React frontend**

Django has an HTML template system built in, but... I'm not a huge fan. I've gotten used to a componentized frontend workflow. I know React well and I love its dev tools. The biggest concern with a frontend framework, though, is the staying power. Frontend devs have seen too many "new hotness" frameworks come and go over the years, so I wanted to make sure that 10 years from now whoever is maintaining the platform won't hate me for my choices now. Odds are, they will so 🤷‍♀️. React has a large ecosystem and appears to have lasting popularity, so I feel about as confident as I can that it's the right choice.

For what it's worth, I also went with Redux. It appears to be a boring choice, though the addition of [React hooks](https://reactjs.org/docs/hooks-intro.html) has led me to rely on it less and less.

✔️ **NextJS Site Generator**

You can't write React without Webpack, and I stand by the statement that Webpack is black magic. The less time wasted with arcane ~rituals~ JSON configurations, the better. React site generators let you trade control over transpilation and project structure in exchange for streamlined development. This is the boring choice for me - let someone else worry about how all my JSX gets compiled to HTML!

The two generators I considered were [GatsbyJS](https://nextjs.org/) and [NextJS](https://nextjs.org/). I had used Gatsby in the past (_Hurtling through Space_ was [built with it](/posts/20171204-building-a-blog/)!), but I was impressed with the simplicity of the NextJS demo and the size of its [userbase](https://nextjs.org/showcase). After a quick test I was sold.

(Bonus points: NextJS now supports deploying to AWS Lambda, even with dynamic routing! I'd argue this makes my stack even more boring because it kills my responsibility in managing frontend servers. I haven't tried this yet but it's in the backlog.)

✔️ **Docker**

Container technology massively simplifies deployment and scaling and there never really was a question of whether or not I'd be containerizing this project.
