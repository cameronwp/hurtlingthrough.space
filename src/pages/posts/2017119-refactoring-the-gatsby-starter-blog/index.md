---
title: Refactoring the Gatsby Starter Blog
date: 2017-12-09T10:28:28-06:00
tags:
  - gatsbyjs
  - react
  - js
  - css
layout: post
---

Before I begin, I want to point out that I _really_ like GatsbyJS. It basically solved [all of my front end requirements](/posts/20171204-building-a-blog/index.html) in one fell swoop. The development and build processes built into the gatsby-cli have been amazing. I plan on sticking with it (at least until the next _Great JavaScript Framework_™ overtakes React).

That being said, I want to document a case study of the way I've refactored the starter blog because its current state is confusing at best, and detrimental to creativity at worst. Of course, I'm critiquing the current version of the starter blog. I've seen relatively recent commits, so I can only assume that the repo will change and improve by the time you read this.

Let's start with the premise of GatsbyJS. It's essentially a supercharged Webpack config for generating static content with React. The base starter project is about as empty as possible - just a header and a title. All of the pages are React components. The starter blog focuses on a specific workflow in which you define templates with React, write up your blog posts in markdown files, and 💥boom💥, your static files are ready.

Here's what the site index template looks like when you start:

```js
// src/layouts/index.js
import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'

import { rhythm, scale } from '../utils/typography'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    let header

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    if (location.pathname === rootPath) {
      header = (
        <h1
          style={{
            ...scale(1.5),
            marginBottom: rhythm(1.5),
            marginTop: 0,
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Gatsby Starter Blog
          </Link>
        </h1>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              boxShadow: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            Gatsby Starter Blog
          </Link>
        </h3>
      )
    }
    return (
      <Container
        style={{
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        {header}
        {children()}
      </Container>
    )
  }
}

export default Template
```

The biggest issue that jumps out is the massive `if ... else` in the middle of `render()`.

```js
if (location.pathname === rootPath) {
  header = (
    <h1 style={{ ... }} >
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to={'/'}
      >
        Gatsby Starter Blog
      </Link>
    </h1>
  )
} else {
  header = (
    <h3 style={{ ... }}>
      <Link
        style={{
          boxShadow: 'none',
          textDecoration: 'none',
          color: 'inherit',
        }}
        to={'/'}
      >
        Gatsby Starter Blog
      </Link>
    </h3>
  )
}
```

`header` is conditionally defined with the difference being displaying the title as an `<h1>` vs `<h3>` depending on the path. Sizing it differently is totally fine (in fact, I think the starter blog in general looks fantastic). The issue is how and when the distinction is made. Note that everything else about the `header` is the same between the two conditions. This isn't very DRY. To be fair, I don't think DRYness is necessarily an indicator of good or bad code - I love Go, which tends to eschew DRY in favor of immediately clarity. But this is egregious. Remember, we can define components! Let's define one for a `<SiteTitle />` and hide sizing logic there so that this component, the site root, focuses on a [single level of abstraction](https://simpleprogrammer.com/2017/01/27/respecting-abstraction/).

Here's what the new `SiteTitle` looks like.

```js
// src/components/site-title.js
import React from 'react'
import Link from 'gatsby-link'
import { rhythm, scale } from '../utils/typography'
import config from '../../gatsby-config'

/**
 * Render a SiteTitle. Size options are 'large' and 'small'. Default to 'small'.
 */
class SiteTitle extends React.Component {
  innerTitle() {
    const siteTitle = config.siteMetadata.title
    const linkStyle = { boxShadow: 'none', textDecoration: 'none', color: 'inherit' }
    return (
      <Link to={'/'} style={linkStyle}>{siteTitle}</Link>
    )
  }

  render() {
    const { size } = this.props
    const siteTitle = config.siteMetadata.title

    const largeStyle = {
      ...scale(1.5),
      marginTop: 0,
      marginBottom: rhythm(1.5)
    }
    const smallStyle = {
      fontFamily: 'Montserrat, sans-serif',
      marginTop: 0,
      marginBottom: rhythm(-1)
    }

    const large = <h1 style={largeStyle}>{this.innerTitle()}</h1>
    const small = <h3 style={smallStyle}>{this.innerTitle()}</h3>

    if (size === 'large') {
      return large
    } else {
      return small
    }
  }
}

export default SiteTitle

```

I'm not a fan of all the inline styles in my markup (more on that later), so I moved some of the configs out of the JSX. I also separated defining the header sizes, which change, from the inner link, which doesn't change. I wanted my code to visually reflect the idea that the header can either be `'large'` or `'small'`, but it defaults to `'small'`. I separated the definition of `large` and `small` headers from the `return` logic at the end of `render()`.

(I also want to point out how I anal-retentively repeat a "`large` then `small`" pattern when I define the styles, the components and then the `return` values.)

I prefer a single source of truth for repeated strings, so rather than defining a literal site title here (eg. `"Gatsby Starter Blog"`), I'm just pulling it from the config file. Change the title once, change it everywhere!


Here's what the new site index looks like.

```js
// src/layouts/index.js
import React from 'react'
import Link from 'gatsby-link'
import { Container } from 'react-responsive-grid'
import { rhythm, scale } from '../utils/typography'
import SiteTitle from '../components/site-title'

class Template extends React.Component {
  render() {
    const { location, children } = this.props
    const siteTitle = config.siteMetadata.title

    let rootPath = `/`
    if (typeof __PREFIX_PATHS__ !== `undefined` && __PREFIX_PATHS__) {
      rootPath = __PATH_PREFIX__ + `/`
    }

    let isRoot = location.pathname === rootPath

    return (
      <Container style={{
        maxWidth: rhythm(24),
        padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`
      }}>
        <SiteTitle size={isRoot ? 'large' : 'small'} />
        {children()}
      </Container>
    )
  }
}

export default Template
```

Note the new `<SiteTitle />` in `render()`:

```js
<SiteTitle size={isRoot ? 'large' : 'small'} />
```

So much simpler. It's clear that the site title should be large if we're at the root and small otherwise. Now, the index only focuses on logic that's related to displaying the outer container, the title, and where the content should fit in. I'm happy with this.

However, I'm not sure how I feel about inline styles in the starter kit. For example,

```js
 <h3
  style={{
    fontFamily: 'Montserrat, sans-serif',
    marginTop: 0,
    marginBottom: rhythm(-1),
  }}
>
  <Link
    style={{
      boxShadow: 'none',
      textDecoration: 'none',
      color: 'inherit',
    }}
    to={'/'}
  >
    Gatsby Starter Blog
  </Link>
</h3>
```

First off, I really don't like this indentation (look at the lonely `>`s sitting by themselves!). The poor `Gatsby Starter Kit` content gets lost under all the styles. Note that we're using JS to define styles. On first thought, it appears to be an extension of JSX, where we mix HTML and JS. Why not define CSS with JavaScript too?

I admit that I hated JSX when it came on the scene. "HTML in my _JavaScript_!? Are they crazy?" But now I love it. JSX works well with concept of functionally composing reusable components, which is my choice way of building front ends now. Recognizing that I came around to enjoy combining HTML and JS, I'm wary of my strong distaste for defining styles in JSX, but I can't shake the thought that this is a terrible idea.

The reason why HTML in JS works well is that great components are _reusable_. Functional JavaScript is wonderful JavaScript. It's common to want to map many identical components onto a page, stamping out each one with different data. Good CSS is also reusable. But native CSS already has a super useful construct for repeatability: classes. No JavaScript necessary to reuse a class.

`rhythm()` is a [Typography.js](https://kyleamathews.github.io/typography.js/) method for programmatically changing styles relative to a base condition. A number of other instances of Typography.js methods litter the blog starter kit, notably the `scale()` method. I can appreciate the idea of simplifying the orchestration of large-scale, interrelated CSS changes. However, the end result is markup with too much going on. Take another look at the base iteration of src/layouts/index.js - it's a confusing soup of structure and style, with content hiding between the lines.

I rally against this type of code because it reduces maintainability. Clean code is code that's easy to understand and easy to refactor. I want to keep my styles separate and stick with classes, so I've added [`gatsby-plugin-sass`](https://www.npmjs.com/package/gatsby-plugin-sass) and I'm slowly removing Typography functions (or at least, not adding any new ones).

Still, GatsbyJS is awesome! It's not perfect, but it's been fun to use and I look forward to seeing it improve. And I love that it's [open source](https://github.com/gatsbyjs/gatsby). I'll probably throw some PRs at it at some point.
