/** @jsx jsx */
import { jsx } from "@emotion/react";
import { Section } from "@components";
import { graphql, useStaticQuery } from "gatsby";

export default function About() {
  const { markdownRemark } = useStaticQuery(
    graphql`
      query AboutQuery {
        markdownRemark(fileAbsolutePath: { regex: "content/About/" }) {
          frontmatter {
            cover
            tech
            title
          }
          html
        }
      }
    `
  );
  return (
    <Section>
      <div
        tw="text-primary"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
      />
    </Section>
  );
}
