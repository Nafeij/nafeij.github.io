const email = 'wng.jiefan@gmail.com'

interface link {
  name: string
  url: string
  desc?: string
}

const repoName = 'Nafeij/nafeij.github.io'

export const repo = `https://github.com/${repoName}`

export const repoAPI = `https://api.github.com/repos/${repoName}`

export const links: link[] = [
  {
    name: 'Email',
    url: `mailto:${email}`,
    desc: email
  },
  {
    name: 'Resume',
    url: '/Resume_Jiefan.pdf'
  },
  {
    name: 'GitHub',
    url: 'https://github.com/Nafeij'
  },
  {
    name: 'LinkedIn',
    url: 'https://www.linkedin.com/in/wang-jiefan/'
  },
  {
    name: 'LeetCode',
    url: 'https://leetcode.com/user5917bB/'
  }
  /* {
    name: "Reddit",
    url: "https://reddit.com/u/nafeij",
  },
  {
    name: "Strava",
    url: "https://www.strava.com/athletes/102314645",
  }, */
]

export const navLinks = [
  {
    name: 'Home',
    url: ''
  },
  {
    name: 'About',
    url: '#about'
  },
  {
    name: 'Work',
    url: '#jobs'
  },
  {
    name: 'Projects',
    url: '#projects'
  },
  {
    name: 'Contact',
    url: '#contact'
  }
]

export const srConfig = (delay = 200, viewFactor = 0.25) => ({
  origin: 'bottom',
  distance: '20px',
  duration: 500,
  delay,
  rotate: { x: 0, y: 0, z: 0 },
  opacity: 0,
  scale: 1,
  easing: 'cubic-bezier(0.645, 0.045, 0.355, 1)',
  mobile: true,
  reset: false,
  useDelay: 'always',
  viewFactor,
  viewOffset: { top: 0, right: 0, bottom: 0, left: 0 }
})
