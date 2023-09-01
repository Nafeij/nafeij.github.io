import { A, ScrollContainerRefContext, Section } from '@components'
import { graphql, useStaticQuery } from 'gatsby'
import { sr } from '@util'
import { useEffect, useContext, useState, createRef, useRef } from 'react'
import { srConfig } from '@config'
import { usePrefersReducedMotion } from '@hooks'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import tw from 'twin.macro'
import { css } from '@emotion/react'

export default function Jobs () {
  const prefersReducedMotion = usePrefersReducedMotion()
  const ScrollContainerRef = useContext(ScrollContainerRefContext)
  const [activeTab, setActiveTab] = useState(0)

  const { jobs } = useStaticQuery(
    graphql`
      {
        jobs: allMarkdownRemark(
            filter: {fileAbsolutePath: {regex: "/content/Jobs/"}}
            sort: {frontmatter: {date: ASC}}
        ) {
        edges {
            node {
              frontmatter {
                date
                title
                company
                companyShort
                location
                range
                url
              }
              html
            }
          }
        }
      }
    `
  )

  const posts = jobs.edges as any[]
  const nodeRefs = useRef(posts.map(() => createRef<HTMLDivElement>()))

  useEffect(() => {
    if (!prefersReducedMotion) {
      sr?.reveal('#jobs', {
        ...srConfig(200, 0.5),
        container: ScrollContainerRef?.current
      })
    }
    return sr?.destroy
  }, [ScrollContainerRef, prefersReducedMotion])

  const jobInner = (node: any, i: number) => {
    const { frontmatter, html } = node
    const { title, company, location, range, url } = frontmatter as {
      title: string
      company: string
      location: string
      range: string
      url: string
    }
    return (
      <CSSTransition
        key={i}
        timeout={300}
        classNames="fadeup"
        nodeRef={nodeRefs.current[i]}
      >
        <div tw='absolute inset-0 px-4 py-3 md:px-8' ref={nodeRefs.current[i]}>
          <h2 tw='flex flex-col transition-[color]'>
            <span>{title}</span>
            <span className="company">
              <A href={url} className="inline-link" tw='transition-[color]'>
                {'@ ' + company}
              </A>
            </span>
          </h2>
          <code tw='transition-[color]'>{`${range}, ${location}`}</code>
          <p css={[
            tw`transition-[color]`,
            css`
              padding-top: 1rem;
              li {
                ${tw`relative pl-5`}
                :before {
                  ${tw`absolute left-0`}
                  content: "▹";
                }
              }
            `
          ]} dangerouslySetInnerHTML={{ __html: html }} />
        </div>
      </CSSTransition>
    )
  }

  const tab = (node: any, i: number) => {
    const { frontmatter } = node
    const { company, companyShort } = frontmatter as { company: string, companyShort: string }
    return (
      <button key={i} css={[
        tw`w-full border-b-2 md:border-b-0 md:border-r-2 border-[var(--text-primary)] p-3 md:p-4 text-left`,
        css`
          ${activeTab === i ? tw`bg-[var(--text-primary)] text-[var(--bg-primary)]` : ''}
          transition-property: background-color, color, border-color;
          transition-timing-function: var(--easing);
          transition-duration: var(--transition-duration);
          &:hover {
            transition-duration: 300ms;
            background-color: var(--button-primary);
            color: var(--bg-primary);
          }
        `
      ]} onClick={() => { setActiveTab(i) }}>
        <code tw='md:text-xl'>{companyShort ?? company}</code>
      </button>
    )
  }

  return (
    <Section id="jobs">
      <h1 tw="mb-5 transition-[color] md:mb-10 lg:mb-14">Here&apos;s what I&apos;ve been up to.</h1>
      <div tw={'flex h-[28rem] w-full flex-col md:h-[22rem] md:flex-row lg:h-72'}>
        <div tw='mb-5 flex w-full flex-initial flex-row justify-center md:mb-0 md:w-32 md:flex-col md:justify-start'>
          {posts.map(({ node }: { node: any }, i: number) =>
            tab(node, i)
          )}
        </div>
        <div tw='relative flex-1'>
          <TransitionGroup component={null}>
            {posts.map(({ node }: { node: any }, i: number) => {
              if (i === activeTab) {
                return jobInner(node, i)
              }
              return null
            })}
          </TransitionGroup>
        </div>
      </div>
    </Section>
  )
}
