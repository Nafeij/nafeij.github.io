'use client'

import { type RefObject, type ReactNode, useContext } from 'react'
import Indicator from './Indicator'
import { ScrollContainerRefContext } from './Layout'
import { MediaContext } from '@util'

export default function ClientLayout (
  { scrollRef, children }:
  {
    scrollRef: RefObject<HTMLDivElement>
    children: ReactNode
  }
) {
  const { isMatch } = useContext(MediaContext)
  return <ScrollContainerRefContext.Provider value={scrollRef}>
    {!isMatch('md') ? <Indicator bottom={false} scrollRef={scrollRef} /> : null}
    {children}
  </ScrollContainerRefContext.Provider>
}
