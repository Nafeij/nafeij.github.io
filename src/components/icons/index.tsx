import IconExternal from './external'
import IconFork from './fork'
import IconGitHub from './github'
import IconLeetCode from './leetcode'
import IconLinkedIn from './linkedin'
import IconMail from './mail'
import IconPhone from './phone'
import IconReddit from './reddit'
import IconResume from './resume'
import IconStar from './star'
import IconStrava from './strava'

const Icon = ({ name }: { name: string }) => {
  switch (name) {
    case 'External':
      return <IconExternal />
    case 'GitHub':
      return <IconGitHub />
    case 'LinkedIn':
      return <IconLinkedIn />
    case 'Reddit':
      return <IconReddit />
    case 'Strava':
      return <IconStrava />
    case 'LeetCode':
      return <IconLeetCode />
    case 'Email':
      return <IconMail />
    case 'Phone':
      return <IconPhone />
    case 'Resume':
      return <IconResume />
    case 'Fork':
      return <IconFork />
    case 'Star':
      return <IconStar />
    default:
      return <IconExternal />
  }
}

export default Icon
