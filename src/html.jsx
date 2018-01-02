import React from 'react'
import config from '../gatsby-config'

let stylesStr
if (process.env.NODE_ENV === `production`) {
  try {
    stylesStr = require(`!raw-loader!../public/styles.css`)
  } catch (e) {
    console.error(e)
  }
}

module.exports = class HTML extends React.Component {
  render() {
    let css
    if (process.env.NODE_ENV === `production`) {
      css = (
        <style
          id="gatsby-inlined-css"
          dangerouslySetInnerHTML={{ __html: stylesStr }}
        />
      )
    }

    // lots of these meta tags get overwritten in posts

    return (
      <html {...this.props.htmlAttributes}>
        <head>
          <meta charSet="utf-8" />
          <meta httpEquiv="x-ua-compatible" content="ie=edge" />
          <meta
            name="viewport"
            content="width=device-width, initial-scale=1, shrink-to-fit=no"
          />

          <meta itemprop="name" content={config.siteMetadata.title} />
          <meta name="description" content={config.siteMetadata.description} />
          <meta itemprop="description" content={config.siteMetadata.description} />

          <meta name="twitter:card" content="summary" />
          <meta name="twitter:creator" content="@cwpittman" />
          <meta name="twitter:description" content={config.siteMetadata.description} />
          <meta name="twitter:site" content="@cwpittman" />
          <meta name="twitter:title" content={config.siteMetadata.title} />

          <meta property="og:description" content={config.siteMetadata.description} />
          <meta property="og:site_name" content={config.siteMetadata.title} />
          <meta property="og:type" content="article" />

          {this.props.headComponents}
          {css}
        </head>
        <body {...this.props.bodyAttributes}>
          {this.props.preBodyComponents}
          <div
            key={`body`}
            id="___gatsby"
            dangerouslySetInnerHTML={{ __html: this.props.body }}
          />
          {this.props.postBodyComponents}
        </body>
      </html>
    )
  }
}
