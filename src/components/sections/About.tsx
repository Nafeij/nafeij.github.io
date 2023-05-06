/** @jsx jsx */
import { Section } from "@components";
import { srConfig } from "@config";
import { jsx, css } from "@emotion/react";
import { usePrefersReducedMotion } from "@hooks";
import { sr } from "@util";
import { graphql, useStaticQuery } from "gatsby";
import React, { useContext, useEffect, useRef } from "react";
import tw from "twin.macro";
import { ScrollContainerRefContext } from "../Layout";
import profilepic from "@images/profilepic.jpg";

export default function About() {
  const { markdownRemark } = useStaticQuery(
    graphql`
      query {
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

  const prefersReducedMotion = usePrefersReducedMotion();
  const revealRef = useRef<HTMLDivElement | null>(null);
  const ScrollContainerRef = useContext(ScrollContainerRefContext);

  useEffect(() => {
    if (!prefersReducedMotion) {
      revealRef.current &&
        sr?.reveal(revealRef.current, {
          ...srConfig(),
          container: ScrollContainerRef?.current
        });
      techRefs.current.forEach((el, i) => {
        sr?.reveal(el, {
          ...srConfig(i * 100 + 300),
          container: ScrollContainerRef?.current,
        });
      });
    }
    return sr?.destroy;
  }, [revealRef, techs]);

  return (
    <Section id="about">
      <div
        dangerouslySetInnerHTML={{ __html: markdownRemark.html }}
        css={css`
          h1 {
            ${tw`md:!text-5xl lg:!text-6xl`}

            :before {
              ${tw`ml-1 mr-3 -mb-0.5 inline-block aspect-square bg-cover align-baseline rounded-md h-12 md:h-16 lg:h-20`}
              content: "";
              background-image: url(${profilepic});
            }
          }
          h2 {
            line-height: 2!important;
          }
        `}
        ref={revealRef}
      />
      <div css={[tw`mt-5 pl-2 w-full font-mono flex flex-wrap gap-y-4 md:mt-8`]}>
        {techs.map((tech, i) => (
          <div
            key={i}
            ref={(el) => {
              el && (techRefs.current[i] = el);
            }}
            tw="grow relative basis-1/2 text-center md:basis-1/3"
            css={css`
              :before {
                ${tw`absolute -left-2`}
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
