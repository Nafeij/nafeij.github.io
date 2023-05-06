import React from "react";
import { Helmet } from "react-helmet";
import { useLocation } from "@reach/router";
import { useStaticQuery, graphql } from "gatsby";

import appleIcon from "@images/favicon/apple-touch-icon.png";
import favicon16 from "@images/favicon/favicon-16x16.png";
import favicon32 from "@images/favicon/favicon-32x32.png";
import favicon from "@images/favicon/favicon.ico";
import msIcon from "@images/favicon/mstile-150x150.png";
import safariIcon from "@images/favicon/safari-pinned-tab.svg";

// https://www.gatsbyjs.com/docs/add-seo-component/

const Head = ({
  title,
  description,
  image,
}: {
  title?: string;
  description?: string;
  image?: string;
}) => {
  const { pathname } = useLocation();

  const { site } = useStaticQuery(
    graphql`
      query {
        site {
          siteMetadata {
            defaultTitle: title
            defaultDescription: description
            siteUrl
            defaultImage: image
            twitterUsername
          }
        }
      }
    `
  );

  const {
    defaultTitle,
    defaultDescription,
    siteUrl,
    defaultImage,
    twitterUsername,
  } = site.siteMetadata;

  const seo = {
    title: title || defaultTitle,
    description: description || defaultDescription,
    image: `${siteUrl}${image || defaultImage}`,
    url: `${siteUrl}${pathname}`,
  };

  return (
    <Helmet
      title={title}
      defaultTitle={seo.title}
      titleTemplate={`%s | ${defaultTitle}`}
    >
      <html lang="en" />

      <meta name="description" content={seo.description} />
      <meta name="image" content={seo.image} />

      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:type" content="website" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterUsername} />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />

      <link rel="apple-touch-icon" sizes="180x180" href={appleIcon} />
      <link rel="icon" type="image/x-icon" href={favicon}/>
      <link rel="icon" type="image/png" sizes="32x32" href={favicon32} />
      <link rel="icon" type="image/png" sizes="16x16" href={favicon16} />
      <link rel="mask-icon" href={safariIcon} color="#5e5e5e" />
      <meta name="msapplication-TileColor" content="#2b5797" />
      <meta name="msapplication-TileImage" content={msIcon} />
      <meta name="theme-color" content="#ffffff" />
      <meta
        name="google-site-verification"
        content="1X8DcHxZJeKEYJ0YAEMNV-s0Y4s_8LFg40Re8ArZ4Mo"
      />
    </Helmet>
  );
};

export default Head;
