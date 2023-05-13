import { repo, repoAPI } from '@config'
import styled from '@emotion/styled'
import Icon from '@icons'
import { useEffect, useState } from 'react'
import tw from 'twin.macro'

const StyledFooter = styled.div`
  opacity: 0.6;
  color: var(--text-secondary);
  font-family: var(--font-mono);
  ${tw`text-xs md:text-sm lg:text-base md:p-6 lg:p-8`}

  min-width: 100%;
  margin-left: -100%;
  align-self: end;
  margin-bottom: 5rem;
  text-align: center;

  a {
    margin: 0 auto;

    .github-stats {
      margin-top: 10px;
      text-align: center;

      & > span {
        display: inline-flex;
        align-items: center;
        margin: 0 7px;
      }
      svg {
        display: inline-block;
        margin-right: 5px;
        width: 14px;
        height: 14px;
      }
    }
  }

  @media (min-width: 768px) {
    margin-left: 0;
    translate: 0;
    align-self: center;
    width: auto;
  }
`

export default function Footer () {
  const [githubInfo, setGitHubInfo] = useState<{
    stars: string
    forks: string
  }>({
    stars: '-',
    forks: '-'
  })

  useEffect(() => {
    if (process.env.NODE_ENV !== 'production') return

    fetch(repoAPI)
      .then(async (response) => await response.json())
      .then((json) => {
        const { stargazers_count: stars, forks_count: forks } = json
        setGitHubInfo({
          stars,
          forks
        })
      })
      .catch((e) => { console.error(e) })
  }, [])

  return (
    <StyledFooter>
      <a
        href={repo}
        aria-label="External Link"
        target="_blank"
        rel="noreferrer"
      >
        <p>Designed by Wang Jiefan.</p>
        <div className="github-stats">
          <span>
            <Icon name="Star" />
            <span>{githubInfo.stars.toLocaleString()}</span>
          </span>
          <span>
            <Icon name="Fork" />
            <span>{githubInfo.forks.toLocaleString()}</span>
          </span>
        </div>
      </a>
    </StyledFooter>
  )
}
