import Components from '/markdoc.components.js'

const button = {
  render: Components.Button,
  description: 'Display a standard button',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      default: 'info',
      matches: ['info', 'caution', 'check', 'note', 'warning'],
      errorLevel: 'critical',
      description:
        'Controls the color and icon of the callout. Can be: "caution", "check", "note", "warning"',
    },
    title: {
      type: String,
      description: 'The button label',
    },
    href: {
      type: String,
      description: 'The button link url',
    },
  },
}

const note = {
  render: Components.Note,
  description: 'Display the enclosed content in a callout box',
  children: ['paragraph', 'tag', 'list'],
  attributes: {
    type: {
      type: String,
      matches: ['info', 'warning', 'error'],
    },
  },
}

const image = {
  render: Components.Image,
  description: 'Display an image',
  attributes: {
    src: { type: String },
    alt: { type: String },
    className: { type: String },
    rounded: { type: Boolean },
    center: { type: Boolean },
    border: { type: Boolean },
  },
}

const collapse = {
  render: Components.Collapse,
  description: 'A box with hidden content',
  attributes: {
    title: { type: String },
    open: { type: Boolean },
    children: ['paragraph', 'tag', 'list'],
  },
}

const spacer = {
  render: Components.Spacer,
  description: 'An element to vertically space elements',
  attributes: {
    size: { type: String },
  },
}

const roadmapcard = {
  render: Components.RoadmapCard,
  description: 'An roadmap card element',
  attributes: {
    date: { type: String },
    children: ['paragraph', 'tag', 'list'],
  },
}

const roadmapheading = {
  render: Components.RoadmapHeading,
  description: 'An roadmap heading element',
}

const discordIcon = {
  render: Components.DiscordIcon,
  description: 'A discord icon',
}

const changelogEntry = {
  render: Components.ChangelogEntry,
  description: 'A changelog entry element',
}

const hero = {
  render: Components.Hero,
  description: 'A hero component',
}

const heroextralinks = {
  render: Components.HeroExtraLinks,
  description: 'Hero extra links',
}

const herolinkcards = {
  render: Components.HeroLinkCards,
  description: 'Hero links',
}

const div = {
  render: Components.Div,
  description: 'A plain div to hold content',
  children: ['paragraph', 'tag', 'list'],
}

const config = {
  variables: {
    user: {
      name: 'Dr. Mark',
    },
  },
  tags: {
    button,
    div,
    collapse,
    hero,
    heroextralinks,
    herolinkcards,
    image,
    note,
    roadmapcard,
    roadmapheading,
    spacer,
    changelogEntry,
    discordIcon,
  },
}

export default config
