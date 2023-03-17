import type { GatsbyConfig } from "gatsby";

import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `nafeij.github.io`,
    siteUrl: `https://nafeij.github.io`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {},
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: "./src/assets/images/",
      },
      __key: "images",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "pages",
        path: "./src/pages/",
      },
      __key: "pages",
    },
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "sections",
        path: "./content/",
      }
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          '@components': path.resolve(__dirname, 'src/components'),
          '@fonts': path.resolve(__dirname, 'src/assets/fonts'),
          '@hooks': path.resolve(__dirname, 'src/hooks'),
          '@images': path.resolve(__dirname, 'src/assets/images'),
          '@pages': path.resolve(__dirname, 'src/pages'),
          '@styles': path.resolve(__dirname, 'src/styles'),
          '@util': path.resolve(__dirname, 'src/util'),
          '@config': path.resolve(__dirname, 'src/config'),
        },
        extensions: [
          "js", "jsx", "ts", "tsx", "css", "scss", "svg", "jpg", "png", "woff", "woff2"
        ],
      }
    },
  ],
};

export default config;
