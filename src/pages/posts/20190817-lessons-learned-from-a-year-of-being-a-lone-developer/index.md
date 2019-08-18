---
title: "Lessons Learned from a Year of Being a Lone Developer"
date: 2019-08-17T22:23:37-04:00
tags: 
  - nasa
  - lessons-learned
draft: false
---

<p class="lead-in">
I work on a number of projects at NASA JSC, most of which involve large teams of scientists and engineers. One project, though, is a bit lonely. I am the sole engineer on an imagery analysis sharing platform. The platform will support JSC photogrammetrists who will be scrutinizing every pixel in every image taken of the external surface of the Orion crew vehicle. They'll be looking for signs of damage, indications that specific events occurred successfully, and a million other variables. They'll use the platform during the upcoming Artemis missions to share their analyses with each other, flight controllers at JSC, and engineers across NASA centers.
</p>

I basically play all the roles you might find in a medium sized project - I work with stakeholders to determine requirements, I design wireframes and prototypes, I write and prioritize tickets, I do the actual coding, I maintain the production environment and its related devops, and I perform user research to inform future iterations. That's not to say I don't have help - I have a support boss and project manager who help me daily. The team is super helpful and actively encourages me to dig deep into their workflows to make sure the platform streamlines their work as much as possible. But the vast majority of the work rests on my shoulders.

Being the ~lead~ lone engineer on a greenfield project has been a great learning experience. There won't be many users - maybe a few dozen active users at peak - but it's hard to find stakes higher than keeping people safe in space. Thus, I've been making choices to prioritize reliability, my own velocity, and long term maintenance. Here's what I considered, the choices I made, and advice for other engineers in similar situations.

## Choose Boring Technologies

Accessibility is a must. No software platform comes close to the level of access the web provides. Everyone has a browser!

✔️ **Browser based**

I love golang. It's a joy to read and write. It has fantastic APIs, superb documentation, and an unmatched toolchain. And its performance is bar none. I had used it in a number of projects in the past and always enjoyed the experience. But! It was the wrong language for this project. In exchange for performance, it suffers from verbosity and it forces you to think about low-level details. For a large team with high performance metrics, golang offers a lot. But that's not me here.

I realized the platform would suffer significant thrash during early stages as I started to get to scope the project. Our first requirements and designs were vague. It became apparent that whatever we designed first would not likely be the platform used during the first Artemis missions.

I needed a backend stack that would support my ability to focus on high level business goals without worrying about low-level minutia. Two stacks came to mind - Ruby on Rails and Python Django. Rails is great, but I *love* Python. I considered Flask too, but the Django admin offers incomparable functionality out of the box. It's a huge win for both my workflows and my team's data administration needs. Overall Django is a mature, popular framework with a nice plugin ecosystem to boot.

✔️ **Python Django backend**

Django has an HTML template system built in, but... I'm not a huge fan. I've gotten used to a componentized frontend workflow. I know React well and I love its dev tools. The biggest concern with a frontend framework, though, is the staying power. Frontend devs have seen too many "new hotness" frameworks come and go over the years, so I wanted to make sure that 10 years from now whoever is maintaining the platform won't hate me for my choices now. Odds are, they will so 🤷‍♀️. React has a large ecosystem and appears to have lasting popularity, so I feel about as confident as I can that its the right choice.

✔️ **React frontend**

You can't write React without Webpack, and Webpack is black magic. The less time wasted dealing with inane JSON configurations, the better. A few React site generators let you trade control over transpilation and project structure in exchange for streamlined development. The two I considered were GatsbyJS and NextJS. I had used Gatsby in the past (*Hurtling through Space* was built with it!), but I was impressed with the simplicity of the NextJS demo. After a quick test I was sold.

Bonus points: NextJS now supports deploying to AWS Lambda, even with dynamic routing! I haven't tried it yet but it's at the top of the backlog.

✔️ **NextJS Site Generator**

Remember, I only need to support a few dozen active users. Even if there are performance issues, modern horizontal microservices design patterns means that most performance issues can be solved by throwing more servers at the problem.

✔️ **Docker**

This one actually goes beyond this single project.

✔️ **Kubernetes**

## Wireframe Early and Often

And make them interactive! I made the mistake of learning by coding too much. Too eager to show something blinded me to the importance of validating ideas before writing a line of code.