---
title: "An Integrated Knowledge Environment with Emacs"
date: 2020-09-18T15:25:37-04:00
tags: 
  - emacs
  - org-mode
  - research
  - mers
summary: A holistic environment for writing and remembering ideas.
twitterprompt: Emacs - an indispensible tool for making sense of ideas
draft: false
---

Since [my AI class last fall](/posts/20191229-a-semester-of-ai-at-mit/), I have been addicted to autonomy research. I took another MIT class in the spring, Cognitive Robotics, and talked my way into contributing to planning and scheduling research in the [MERS](https://www.csail.mit.edu/research/model-based-embedded-and-robotics-systems-group) lab. Working with MERS is a huge development for my professional life. There's a lot I want to say about the experience of breaking into cutting-edge AI research, but today I want to share a second-order finding that I hadn't expected when I first started, and that's what I'm calling an **integrated <strike>development</strike> knowledge environment** (IKE) with [Emacs](https://www.gnu.org/software/emacs/).

I started using Emacs because the lab writes lisp. And lisp is written almost exclusively using Emacs. Out of the box, Emacs is fine. It's just a text editor with a larger than average set of keyboard shortcuts. What distinguishes Emacs is its extensibility, which is unrivaled across any piece of software I've ever come across. It starts with changing settings. There is no real "Preferences" menu. Instead you have configuration files that consist of Emacs lisp, or elisp code, that let you call functions and set variables to change your editing experience.[^1] Want to change your font size? You've got to write elisp (or more likely paste the elisp you found on Stack Overflow). Want to hide the intro help message? That's another line of elisp. Maybe someone else has written some functionality that you are interested in trying. In that case, you just need to download and `(load)` their elisp.

This is where Emacs stands out - it exposes enough APIs to your elisp that, in many ways makes Emacs look more like an operating system than a text editor. You can use Emacs to [surf the web](https://www.gnu.org/software/emacs/manual/html_mono/eww.html), [check your email](https://www.djcbsoftware.nl/code/mu/mu4e.html), [read PDFs](https://www.gnu.org/software/emacs/manual/html_node/emacs/Document-View.html), [play games](https://www.emacswiki.org/emacs/CategoryGames), [control Spotify](https://github.com/danielfm/spotify.el), and probably a lot of other really cool things I haven't even thought of.

While I've gotten fond of using Emacs to write code, even non-lisp code, the biggest fundamental change to my workflow has been the introduction of the IKE. It has profoundly changed the way I manage ideas.

## What is a knowledge environment?

First consider the ubiquitous integrated development environment (IDE) used across programming languages and environments. Though code may be executed in or may define arbitrarily complex and dynamic systems, the act of writing code is simply entering plain text in files. IDEs boost developer productivity by automating low-level workflows and providing explicit context that would otherwise need to be sourced in the developer's head. These connections between new and existing code abstract away low-level implementation problems and free up cycles for higher-level reasoning.

Academic work shares many of the same characteristics as coding. Instead of connections in code, academic work is the connection of new and existing bodies of knowledge. We study the existing state of the art as described by other researchers, scaffold new ideas off existing ones, provide evidence to support our claims, and publish our ideas to form the basis for future work. Instead of external libraries, academics have papers. Instead of imports, citations bring in external ideas. Instead of linting, there are spelling and grammar checks. Instead of comments and READMEs, personal notes give an informal take on the overall context of the work. Instead of compiling to an executable, an academic product is compiled to a PDF. Yet, despite the similarities, there does not exist an all-in-one environment for academic work. Most academics cobble together a collection of tools to accomplish the various tasks of academic writing. They read their PDFs in one place, manage citations in another, and write notes somewhere else. They manually copy and paste BibTeX citations and laboriously hand write LaTeX. It doesn't have to be like this. Much like an IDE simplifies understanding systems in code, an IKE should simplify the task of reasoning about or defining arbitrarily complex systems through academic writing. To be successful, I posit that an IKE has the following requirements:

1. It must automate citation management, including storing, searching, formatting, and inserting citations
2. It must simplify research library management and search
3. It must explicitly connect personal notes to existing papers and in-progress writing
4. It must abstract academic writing from the formatting of academic papers



[^1] Technically there are menus that let you change settings, but you'll probably notice that all that happens is that the menus add code to your configuration files. 
