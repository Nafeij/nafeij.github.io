/** @jsx jsx */
import { genDelays, Section, TransitionSeries } from "@components";
import { srConfig } from "@config";
import { jsx, css } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { sr } from "@util";
import { graphql, useStaticQuery } from "gatsby";
import { useContext, useEffect, useRef } from "react";
import tw from "twin.macro";
import { ScrollContainerRefContext } from "../Layout";
import profilepic from "@images/profilepic.jpg";
import React from "react";

export default function About() {
  const { markdownRemark } = useStaticQuery(
    graphql`
      query AboutQuery {
        markdownRemark(fileAbsolutePath: { regex: "content/About/" }) {
          frontmatter {
            tech
            title
          }
          html
        }
      }
    `
  );

  const techs: string[] = markdownRemark.frontmatter.tech;
  const techRefs = useRef<HTMLDivElement[]>([]);
  const profileImg = markdownRemark.frontmatter.cover;

  const prefersReducedMotion = usePrefersReducedMotion();
  const revealRef = useRef<HTMLDivElement | null>(null);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);
  const [showTags, setShowTags] = React.useState(false);

  useEffect(() => {
    if (!prefersReducedMotion) {
      revealRef.current &&
        sr?.reveal(revealRef.current, {
          ...srConfig(),
          container: ScrollContainerRef?.current,
          afterReveal: () => setShowTags(true),
        });
      techRefs.current.forEach((el, i) => {
        sr?.reveal(el, {
          ...srConfig(i * 100 + 300),
          container: ScrollContainerRef?.current,
        });
      });
    }
  }, []);

  return (
    <Section>
      <div
        tw="text-secondary md:text-lg lg:text-xl"
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        css={css`
          h1 {
            ${tw`text-4xl text-primary md:text-6xl lg:text-7xl`},
            :before {
              ${tw`ml-1 mr-3 inline-block aspect-square bg-cover align-baseline rounded-md h-12 md:h-16 lg:h-20`}
              content: "";
              background-image: url(${profilepic});
            }
          }
          h2 {
            ${tw`text-2xl md:text-4xl lg:text-5xl`}
            line-height: 2!important;
          }
          a {
            color: var(--text-primary);
          }
        `}
        ref={revealRef}
      />
      <div css={[tw`mt-5 text-lg flex flex-wrap gap-y-4 md:mt-8`]}>
        {techs.map((tech, i) => (
          <div
            key={i}
            ref={(el) => {
              el && (techRefs.current[i] = el);
            }}
            tw="grow basis-1/2 text-center md:basis-1/3 lg:text-lg"
            css={css`
              :before {
                ${tw`absolute left-0`}
                content: "▹";
              }
            `}
          >
            {tech}
          </div>
        ))}
      </div>
    </Section>
  );
}
