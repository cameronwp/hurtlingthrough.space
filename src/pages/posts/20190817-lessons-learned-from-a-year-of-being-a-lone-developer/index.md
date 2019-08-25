---
title: "Lessons Learned from a Year of Being a Lone Developer"
date: 2019-08-17T22:23:37-04:00
tags: 
  - nasa
  - lessons-learned
draft: false
---

<p class="lead-in">
I work on a number of projects at NASA JSC, most of which involve large teams of scientists and engineers. One project, though, is a bit lonely. I am the only engineer developing an imagery analysis sharing platform. The platform will support JSC photogrammetrists who will be scrutinizing every pixel in every image taken of the external surface of the Orion crew vehicle. They'll be looking for signs of damage, indications that specific events occurred successfully, and a million other variables. They'll use the platform during the upcoming Artemis missions to share their analyses with each other, flight controllers at JSC, and engineers across NASA centers.
</p>

I basically play all the roles you might find in a medium sized project - I work with stakeholders to determine requirements, I design wireframes and prototypes, I write and prioritize tickets, I do the actual coding, I maintain the production environment and its related devops, and I perform user research to inform future iterations. That's not to say I don't have help - I have a supportive boss and project manager who help me daily. The team is super helpful and actively encourages me to dig deep into their workflows to make sure the platform streamlines their work as much as possible. But the vast majority of the work rests on my shoulders.

Being the ~lead~ lone engineer on a greenfield project has been a great learning experience. There won't be many users - maybe a few dozen active users at peak - but it's hard to find stakes higher than keeping people safe in space. Thus, I've been making choices to prioritize reliability, my own velocity, and long term maintenance. Here's what I've considered, the choices I made, and advice for other engineers in similar situations.

## Wireframe Early and Often

I wish I had spent more time wireframing when we first started. Not being a designer by trade, I'm not inclined to spend hours in tools like Sketch or Photoshop. Rather, I whiteboarded some basic designs and asked the team if they were on point. I got a lukewarm reception, which I misinterpreted as my poor drawing skills not fully conveying my brilliant designs. I'm a better coder than I am artist so I took to my IDE to start coding up some "quick and dirty" prototypes.

This was a huge mistake. There's no such thing as a "quick and dirty" prototype - even the most basic functional designs need non-neglible infrastructure. I made hasty infrastructure choices to substantiate my prototypes, which turned into technical debt as the platform evolved. A few months into the project, I realized I was working the user experience around the tech stack, rather than letting the user experience lead the way. While the project was technically checking all the requirements boxes, the user experience screamed "an engineer designed me." Frustrating and over-complicated.

Being a project with a long horizon, I've been able to take the time to refactor my tech stack to better suit the UX. This is pure luck. Had this platform been supporting an organization with a limited runway, my haste to start coding could have killed us dead in the water.

Had I spent more time early on fleshing out wireframes, especially interactive wireframes, I'm sure that I would have come to the same conclusions sooner and with less headache.

## Choose Boring Technologies

Many factors influence tech stack decisions - the ability of languages and frameworks to support the customer's primary requirements, your (team's) comfort with languages and frameworks, your existing infrastructure and processes, how much time you have, performance goals, and probably a million other things.

All things being equal, I tend to make the boring choice.

Boring technologies are widely used, well documented, and proven solutions at scale. Ideally, they have active maintainers and a helpful community.

What picking boring technologies allows you to do is focus on business problems - not implementation problems. If you're working by yourself or face tight deadlines, you don't have the luxury to worry about implementation.

Especially after the aforementioned refactor, I can thank boring technologies for allowing me to do so much in such little time. Here are the boring choices I made for this platform.

✔️ **Browser based**

Accessibility is a must. No software platform comes close to the level of access the web provides. Everyone has a browser!

✔️ **Python Django backend**

I love golang. It's a joy to read and write. It has fantastic APIs, superb documentation, and an unmatched toolchain. And its performance is bar none. I've used it in a number of projects in the past and always enjoyed the experience. But! It was the wrong language for this project. In exchange for performance, it suffers from verbosity and it forces you to think about low-level details. For a large team with high performance metrics, golang offers a lot. But that's not me here.

I needed a backend stack that would support my ability to focus on high level business goals without worrying about low-level minutia. Two stacks came to mind - Ruby on Rails and Python Django. Rails is great, but I _love_ Python. I considered Flask too, but the Django admin offers incomparable functionality out of the box. It's a huge win for both my workflows and my team's data administration needs. Overall Django is a mature, popular framework with a nice plugin ecosystem to boot.

✔️ **React frontend**

Django has an HTML template system built in, but... I'm not a huge fan. I've gotten used to a componentized frontend workflow. I know React well and I love its dev tools. The biggest concern with a frontend framework, though, is the staying power. Frontend devs have seen too many "new hotness" frameworks come and go over the years, so I wanted to make sure that 10 years from now whoever is maintaining the platform won't hate me for my choices now. Odds are, they will so 🤷‍♀️. React has a large ecosystem and appears to have lasting popularity, so I feel about as confident as I can that it's the right choice.

✔️ **NextJS Site Generator**

You can't write React without Webpack, and Webpack is black magic. The less time wasted dealing with inane JSON configurations, the better. A few React site generators let you trade control over transpilation and project structure in exchange for streamlined development. The two I considered were GatsbyJS and NextJS. I had used Gatsby in the past (_Hurtling through Space_ was built with it!), but I was impressed with the simplicity of the NextJS demo and the size of its userbase. After a quick test I was sold.

(Bonus points: NextJS now supports deploying to AWS Lambda, even with dynamic routing! I haven't tried it yet but it's in the backlog.)

✔️ **Docker**

Remember, I only need to support a few dozen active users. Even if there are performance issues, modern horizontal microservices design patterns means that most performance issues can be solved by throwing more servers at the problem. Container technology massively simplifies deployment and there never really was a question of whether or not I'd be Dockerizing this project.

✔️ **Kubernetes**

This one actually goes beyond this single project.

## Work in the Open

Especially if you're working by yourself, make sure your customers can play with your work early and often. Push to staging daily and ensure that all of your customers have access. Get as much feedback as possible. No surprises!