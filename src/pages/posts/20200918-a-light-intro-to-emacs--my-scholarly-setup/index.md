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

Since [my AI class last fall](/posts/20191229-a-semester-of-ai-at-mit/), I have been addicted to autonomy research. I took another MIT class in the spring, Cognitive Robotics, and somehow worked my way into contributing to planning and scheduling research in the [MERS](https://www.csail.mit.edu/research/model-based-embedded-and-robotics-systems-group) lab. Working with MERS is a huge development for my professional life. There's a lot I want to say about the experience of breaking into cutting-edge AI research, but today I want to share a second-order finding that I hadn't expected when I first started, and that's what I'm calling an **integrated <strike>development</strike> knowledge environment** (IKE) with [Emacs](https://www.gnu.org/software/emacs/).

I started using Emacs because MERS writes lisp. And lisp is written almost exclusively with Emacs. Out of the box, Emacs is fine. It's just a text editor with a larger than average set of keyboard shortcuts. What distinguishes Emacs is its extensibility, which is unrivaled across any piece of software I've ever come across. The extensibility starts to become apparent when you want to change settings. There is no real "Preferences" menu. Instead you have configuration files that consist of Emacs lisp, or elisp code, that let you call functions and set variables to change your editing experience.[^1] Want to change your font size? You've got to write elisp (or probably just paste the elisp you found on Stack Overflow). Want to hide the intro help message? That's another line of elisp. Maybe someone else has written some functionality that you are interested in trying. In that case, you can copy and run their elisp.

This is where Emacs stands out - it exposes enough APIs to your elisp that, in many ways makes Emacs look more like an operating system than a text editor. There are popular frameworks, like [Spacemacs](https://www.spacemacs.org/) and [Doom](https://github.com/hlissner/doom-emacs), that effectively turn Emacs into an entirely different editor. Want the extensibility of Emacs but still keep your vim shortcuts? There's an (e**vi**l) [package for that](https://github.com/emacs-evil/evil). You can use Emacs to [surf the web](https://www.gnu.org/software/emacs/manual/html_mono/eww.html), [check your email](https://www.djcbsoftware.nl/code/mu/mu4e.html), [read PDFs](https://www.gnu.org/software/emacs/manual/html_node/emacs/Document-View.html), [play games](https://www.emacswiki.org/emacs/CategoryGames), [control Spotify](https://github.com/danielfm/spotify.el), and probably a lot of other really cool things I don't even know about.

While I've gotten fond of using Emacs to write code, even non-lisp code, the biggest shift in my workflow has been the introduction of the IKE, which has fundamentally changed the way I manage ideas.

## What is a knowledge environment?

First, consider the ubiquitous integrated development environment (IDE) used across programming languages and environments. Though code may be executed in or may define arbitrarily complex and dynamic systems, the act of writing code is simply entering plain text in files. IDEs boost developer productivity by automating low-level workflows and providing explicit context that would otherwise need to be sourced in the developer's head. These connections between new and existing code abstract away low-level implementation problems and free up cycles for higher-level reasoning.

Academic work shares many of the same characteristics as coding. Instead of connections in code, academic work is the connection of new and existing bodies of knowledge. We study the existing state of the art as described by other researchers, scaffold new ideas off existing ones, provide evidence to support our claims, and publish our ideas to form the basis for future work. Instead of external libraries, academics have papers. Instead of imports, citations bring in external ideas. Instead of linting, there are spelling and grammar checks. Instead of comments and READMEs, personal notes give an informal take on the overall context of the work. Instead of compiling to an executable, an academic product is compiled to a PDF. Yet, despite the similarities, there does not exist an all-in-one environment for academic work. Most academics cobble together a collection of tools to accomplish the various tasks of academic writing. They read their PDFs in one place, manage citations in another, and write notes somewhere else. They manually copy and paste BibTeX citations and laboriously hand write LaTeX. It doesn't have to be like this. Much like an IDE simplifies understanding systems in code, an IKE should simplify the task of reasoning about or defining arbitrarily complex systems through academic writing. To be successful, I posit that an IKE has the following requirements:

1. It must automate citation management, including storing, searching, formatting, and inserting citations
2. It must simplify research library management
3. It must explicitly connect personal notes to existing papers and in-progress writing
4. It must minimize the effort required to format academic writing

The net effect of these requirements is that an IKE should make it easy to see and create links between ideas. As far as I know, there is no single piece of software that satisfies every requirement out of the box. However, with some configuration, Emacs can come very close.

## An Emacs IKE

<em>Disclaimer: To be clear, what follows is **not** an in-depth how-to guide. I am just sharing my approach and toolset. But I'll include links to everything and all the documentation you need to setup your own IKE. If you want to setup an IKE with Emacs, you should know that this is going to take actual effort. You will benefit by explicitly spending time at the outset building a mental model of how Emacs works and how your configuration files and package manager interact. If you blindly start copy and pasting elisp, you are bound to be frustrated early in the process. This is a game for people who like to tinker. But if you are someone who just wants to be given a tool that works, that's fine too! I still think you ought to try this out because the benefits are totally worth every ounce of frustration you're going to have setting it up.</em>

To understand how you can setup an IKE in Emacs, you have to start with Emacs basics.

* **Frames**: [A system-level display](https://www.gnu.org/software/emacs/manual/html_node/emacs/Frames.html). What most other applications call a window.
* **Buffers**: A thing with text in it. Usually a file but doesn't have to be.
* **Windows**: A visible thing in the frame that renders 0+ buffers. One or more windows are visible at a time in Emacs.
* **Keyboard Shortcuts**: Most keyboard shortcuts are combinations with prefix keys like, control, `C-`, and meta (alt), `M-`. The built-in tutorial that opens with Emacs is worth going through. There are [plenty of guides for learning Emacs](https://www.emacswiki.org/emacs/LearningEmacs) and an official [cheatsheet](https://www.gnu.org/software/emacs/refcards/pdf/refcard.pdf). If you don't like the Emacs keyboard shortcuts, don't worry! You can change pretty much every single one, and that includes ditching the prefix keys.
* **Modes**: When you open different kinds of files in Emacs, the editor goes into different [modes](https://www.gnu.org/software/emacs/manual/html_node/emacs/Modes.html). Each mode can have different behaviors and functionality associated with it. Elisp can target specific modes, or create new modes, to add useful behaviors when you're editing different types of files or in different situations.
* **Package management**: At its core, a package is just 1+ elisp files that you can download and `(load)`. But you usually don't need to manually download anything because Emacs has a [built-in package manager](https://www.emacswiki.org/emacs/InstallingPackages) that connects with [MELPA](https://melpa.org/), the major repository for Emacs packages. You can install packages from within Emacs itself or declare dependencies on packages in your configuration files.
* **Frameworks/Packages**: A framework is a curated and opinionated collection of packages that significantly changes the user experience. The two most popular,  [Spacemacs](https://www.spacemacs.org/) and [Doom](https://github.com/hlissner/doom-emacs], are essentially to Emacs what [Ubuntu is to Debian](https://ubuntu.com/community/debian). But there are [many other frameworks and packages](https://github.com/emacs-tw/awesome-emacs) with specific goals or functionality in mind. Many of them pull in functionality by running external commands and piping the input into an Emacs buffer.

### The Foundation - Org Mode

The Emacs ecosystem has a unique note-taking file format called [Org mode](https://orgmode.org/), ostensibly named because it helps you organize your life. The word "mode" here specifically refers to an Emacs mode. On its surface, a `.org` file puts you in a mode where you write simple markup that is interpreted in a hierarchical structure with some formatting attached ([docs](https://orgmode.org/org.html)). 

Let's start with the end goal - seeing and creating links between ideas.


[^1] Technically there are menus that let you change settings, but you'll probably notice that all that happens is that the menus add code to your configuration files. 
