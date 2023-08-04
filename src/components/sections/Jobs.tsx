import { Section } from '@components'
import { graphql, useStaticQuery } from 'gatsby'

export default function Jobs () {
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

  const posts = jobs.edges

  console.log(posts)

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
      <div>
        <h2 key={i}>
          <span>{title}</span>
          <span className="company">
            {' @ '}
            <a href={url} className="inline-link">
              {company}
            </a>
          </span>
        </h2>
        <code>{`${range}, ${location}`}</code>
        <p dangerouslySetInnerHTML={{ __html: html }} />
      </div>
    )
  }

  return (
    <Section id="jobs" tw="min-h-full px-0 md:px-24">
      {posts.map(({ node }: { node: any }, i: number) =>
        jobInner(node, i)
      )}
    </Section>
  )
}
