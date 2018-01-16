# gatsby-remark-images-full-width

Same as [`gatsby-remark-images`](https://github.com/gatsbyjs/gatsby/tree/master/packages/gatsby-remark-images), except it adds the ability to create 100vw images that burst containers.

## Installation

Until I submit a PR to the gatsby folks, copy this dir to plugins/gatsby-remark-images-full-width in your gatsby project.

If you modify it, you need to run `yarn` before changes will take effect.

## Usage

```js
// gatsby-config.js
  ...
  plugins: [
    ...
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images-full-width`,
            options: {
              maxWidth: 590, // still respected for non-full-width images
            },
          },
        ]
      }
    }
  ]
```

```md
... some markdown file ...

![<-FULLWIDTH->a descriptive alt tag](relative/image.jpg)
```

`<-FULLWIDTH->` will be stripped from the final alt tag. The image will expand outside the container to the full width of the viewport.
