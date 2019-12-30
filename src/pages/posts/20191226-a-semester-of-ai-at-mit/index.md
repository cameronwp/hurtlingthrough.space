---
title: "Lifelong Learning: A Semester of AI at MIT"
date: 2019-12-26T22:26:09-05:00
tags:
  - mit
  - ai
  - lifelong-learning
  - grad-school
  - advanced-study-program
draft: false
---

Lifelong learning is a good decision.

My SO's career took us to Cambridge this past summer. Knowing we were going to move here, I applied to MIT's [Advanced Study Program](https://professional.mit.edu/programs/advanced-study-program) (ASP). The ASP is for professionals (or anyone else) who want to take classes on campus. You're charged full tuition for the course credit hours, but you receive full credit too. As an ASP student, you are a "non-degree seeking" graduate student. Almost the whole course catalog is open to you so long as you have prior education or work experience that satisfies course prerequisites.

I applied to the ASP, got accepted, and enrolled in [16.413 Principles of Autonomy and Decision Making](https://ocw.mit.edu/courses/aeronautics-and-astronautics/16-410-principles-of-autonomy-and-decision-making-fall-2010/) for the fall semester. What drew me to the course is the systematic study of techniques that I hoped would be applicable to EVA decision support system (DSS) software like [Marvin](/posts/20180516-marvin-eva-timeline-breakdown/) at work.

Enrolling put me in a unique position in my development as an educator. My career began with a masters degree in teaching and four years of teaching high school science. It switched directions when I taught myself how to code. And then I was lucky to be able to teach on and contribute to Udacity's platform, a pedagogical tool that could only exist on the Internet. Going back to a college classroom as a normal student would be a chance to come full circle. I would be a part of the learning process as a student in a traditional classroom, elbow to elbow with classmates in a lecture hall watching the professor talk.

Now that the semester is over, I can easily say that loved it.

However, my feelings about the course reflect the way I feel about the content itself and the people who put the class together. The professor, Brian Williams, obviously loves what he's teaching and is a generational expert in the field. He was supported by two TAs, Simon and Sungkweon, who both consistently went above and beyond expectations to help us. I was in multiple office hours sessions where a group of us stayed an extra hour because the two of them were willing to keep answering questions and debugging our code.

I quickly learned that I love autonomy too. It is general problem solving with code, logic, and math. The techniques are almost universally applicable. Ideas from the course like Markov chains and Bayesian inference are super interesting and useful on their own, and they underpin a lot of the modern work in reinforcement learning. Search, constraint programming, and convex optimization are powerful toolsets for reasoning about real-world systems. I'm already starting to apply techniques from the class in the development of a new prototype EVA DSS.

![A whiteboard with math](whiteboard.jpg)

_I keep a whiteboard in my office. This is basically how it looked all semester.  If you're curious, what's shown here is a derivation of linear edge constraints, which just entails determining if a point is on the "safe" side of a line. This was part of my final project of using mixed integer quadratic constraint programming to perform path planning in a two dimensional environment.[^1] Fun fact, there's definitely an error here beyond the one I'm asking about in the red marker._

All that being said, I can easily imagine how the "sage on a stage" approach can fall short. There were two 90 minute lectures per week. These lectures were well presented in that all the information you needed was in the slides that were also distributed before class. I rarely took notes during lecture, instead focusing on Prof. Williams' description of the algorithms and their context within the broader design of decision making systems. Time flew by, and 90 minutes almost felt too short some classes. (Though some classes I drank way too much coffee and felt like I was going to explode out of the lecture hall when class ended.)

But what if the professor isn't as engaging at Prof. Williams? What if the TAs aren't answering questions? What if the content just doesn't grab your attention? All of these are reasons that I think platforms like Udacity are so important to make technical content more accessible to students of all kinds. 

Like any good learning experience, this one still required focused self-study. The homework assignments consisted of Python challenges that took us from the simplest of search algorithms through constraint programming and convex optimization solvers. The readings were lengthy, sometimes spanning full chapters in [AIMA](http://aima.cs.berkeley.edu/index.html). Not satisfied with breadth or depth of the study material we were given for the final exam, I wound up assigning myself problems from our various textbooks that reflected what I thought we might see on the exam. I spent upwards of 10 hours a week outside class doing homework, reading, or studying. My Sundays and morning routines were basically dedicated to studying.

It's at this point the parallels to online education resurface. We found that Udacity students fell into two buckets - they either loved or hated the amount of self-study we put on them ("read the documentation and do this thing"). Some thought we were con artists promising to teach them when in reality we told them what to teach themselves. But that's the thing - learning is teaching yourself. A professor can _explain_ things to you, but you have to struggle and analyze and make decisions if you want to rewire your brain.



MIT isn't unique in having a professional study program. Many colleges and universities have similar programs under names like "continuing education" or "professional studies." If this interests you at all, I absolutely recommend perusing the website of a college or university near you to see what they offer. And I especially recommend it if your company gives you an education stipend because these programs aren't cheap.

If you do get a chance to go back to school, here's my advice. Or if you're in school, this applies to you too.

## Practical Advice for Lifelong Learning

First and foremost, don't be afraid to get to know the TAs and professor. They want to help you. Hit every office hours session, even if you don't have questions. There's always something you can learn by listening to your classmates' questions, and you might get a tidbit of useful info you might not have found otherwise.

Store searchable notes. I can't stress it enough how useful it is to keep your notes consolidated in an accessible location (probably online) where you can search for useful info. I switch between machines multiple times a day, so storing everything in the cloud was a must. I kept a wiki for the course, making it easy to drop the lecture PowerPoints right next to my own notes. It made it super easy to search later when I was looking up algorithms for homework. Beyond that, I found that anal retentively collecting and storing all of the documents, instructions, readings, etc. from the course in a centralized location really streamlined my life.



_[^1] A good intro to path planning with mixed integer programming: Schouwenaars, T., De Moor, B., Feron, E., & How, J. (2001). Mixed integer programming for multi-vehicle path planning. *2001 European Control Conference, ECC 2001*, (March 2014), 2603–2608. https://doi.org/10.23919/ecc.2001.7076321_