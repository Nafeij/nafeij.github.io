/** @jsx jsx */
import { Section } from "@components";
import { srConfig } from "@config";
import { jsx, css } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { sr } from "@util";
import { graphql, useStaticQuery } from "gatsby";
import { useEffect, useRef } from "react";
import tw from "twin.macro";

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
  const techs: string[] = markdownRemark.frontmatter.tech;
  const prefersReducedMotion = usePrefersReducedMotion();
  const revealContainer = useRef<null | HTMLDivElement>(null);

  useEffect(() => {
    if (!prefersReducedMotion && sr && revealContainer.current) {
      sr.reveal(revealContainer.current, srConfig());
    }
  }, []);

  return (
    <Section>
      <div
        tw="text-2xl"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        css={css`
          h1 {
            ${tw`text-6xl`}
          }
          h2 {
            ${tw`text-4xl leading-loose`}
          }
        `}
        ref={revealContainer}
      />
      <div tw="mt-5 text-xl grid grid-cols-2 md:grid-cols-3 gap-4">
        {techs.map((tech, i) => (
          <div key={i} tw="flex items-center justify-center">
            {tech}
          </div>
        ))}
      </div>
    </Section>
  );
}
