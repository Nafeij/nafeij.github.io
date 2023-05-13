import type { PageProps } from 'gatsby'
import { type FC } from 'react'

import { About, Contact, Head, Layout, Projects, Title } from '@components'
import { GlobalStyle } from '@styles'

const IndexPage: FC<PageProps> = ({ location }) => {
  return (
    <>
    <Head />
      <GlobalStyle />
      <Layout location={location}>
        <Title />
        <About />
        <Projects />
        <Contact />
      </Layout>
    </>
  )
}

export default IndexPage
