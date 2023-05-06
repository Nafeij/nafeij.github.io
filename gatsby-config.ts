import type { GatsbyConfig } from "gatsby";

import path from "path";

const config: GatsbyConfig = {
  siteMetadata: {
    title: `Wang Jiefan`,
    description: `Wang Jiefan's personal website. He is a Computer Science Major at the National University of Singapore and aspiring software engineer with a passion for building exceptional digital experiences.`,
    siteUrl: `https://nafeij.github.io`,
    twitterUsername: `@WJiefan`,
    image: `/og.png`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  flags: {
    DEV_SSR: true,
  },
  plugins: [
    "gatsby-plugin-image",
    "gatsby-plugin-mdx",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: "gatsby-remark-autolink",
            options: {},
          },
        ],
      },
    },
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: "Nafeij",
        short_name: "Nafeij",
        icons: [
          {
            src: "src/assets/images/favicon/android-chrome-192x192.png",
            sizes: "192x192",
            type: "image/png",
          },
          {
            src: "src/assets/images/favicon/android-chrome-512x512.png",
            sizes: "512x512",
            type: "image/png",
          },
        ],
        theme_color: "#ffffff",
        background_color: "#ffffff",
        display: "standalone",
      },
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
      },
    },
    {
      resolve: "gatsby-plugin-alias-imports",
      options: {
        alias: {
          "@components": path.resolve(__dirname, "src/components"),
          "@fonts": path.resolve(__dirname, "src/assets/fonts"),
          "@hooks": path.resolve(__dirname, "src/hooks"),
          "@images": path.resolve(__dirname, "src/assets/images"),
          "@pages": path.resolve(__dirname, "src/pages"),
          "@styles": path.resolve(__dirname, "src/styles"),
          "@util": path.resolve(__dirname, "src/util"),
          "@config": path.resolve(__dirname, "src/config"),
          "@icons": path.resolve(__dirname, "src/components/icons"),
        },
        extensions: [
          "js",
          "jsx",
          "ts",
          "tsx",
          "css",
          "scss",
          "svg",
          "jpg",
          "png",
          "woff",
          "woff2",
        ],
      },
    },
  ],
};

export default config;
