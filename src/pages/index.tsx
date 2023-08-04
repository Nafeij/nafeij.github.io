import type { PageProps } from 'gatsby'
import { type FC } from 'react'

import { About, Contact, Head, Jobs, Layout, Projects, Title } from '@components'
import { GlobalStyle } from '@styles'

const IndexPage: FC<PageProps> = ({ location }) => {
  return (
    <>
    <Head />
      <GlobalStyle />
      <Layout location={location}>
        <Title />
        <About />
        <Jobs />
        <Projects />
        <Contact />
      </Layout>
    </>
  )
}

export default IndexPage
