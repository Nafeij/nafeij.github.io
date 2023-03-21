/** @jsx jsx */
import { Section } from "@components";
import { srConfig } from "@config";
import { jsx, css } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { sr } from "@util";
import { graphql, useStaticQuery } from "gatsby";
import { useContext, useEffect, useRef } from "react";
import tw from "twin.macro";
import { ScrollContainerRefContext } from "../Layout";

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
  const revealRef = useRef<HTMLDivElement | null>(null);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);

  useEffect(() => {
    if (!prefersReducedMotion && sr && revealRef.current) {
      sr.reveal(revealRef.current, {...srConfig(), container: ScrollContainerRef?.current});
    }
  }, []);

  return (
    <Section>
      <div
        tw="text-xl md:text-2xl"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        css={css`
          h1 {
            ${tw`text-4xl md:text-6xl lg:text-7xl`}
          }
          h2 {
            ${tw`text-2xl md:text-4xl lg:text-5xl`}
            line-height: 2!important;
          }
        `}
        ref={revealRef}
      />
      <div tw="mt-5 text-xl flex flex-wrap gap-y-4 md:mt-8">
        {techs.map((tech, i) => (
          <div key={i} tw="grow basis-1/2 text-center md:basis-1/3">
            {tech}
          </div>
        ))}
      </div>
    </Section>
  );
}
