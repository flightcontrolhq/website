import { motion } from 'framer-motion'
import Link from 'next/link'
import { useState } from 'react'

import { Corners } from 'components/Corners'
import { BlogPostSummary } from 'lib/sanity'

import { Author } from './Author'
import { PublishedAt } from './PublishedAt'
import { Tags } from './Tags'

type Props = {
  className?: string
  blogSummary: BlogPostSummary
}

export function Card({ blogSummary, className, ...props }: Props) {
  const [isHovered, setHovered] = useState(false)
  const [isTapped, setTapped] = useState(false)
  const cornerPosition = isTapped ? -1 : isHovered ? -6 : -1
  return (
    <Link passHref key={blogSummary._id} href={`/blog/${blogSummary.slug}`} legacyBehavior>
      <motion.a
        {...props}
        onFocus={() => setHovered(true)}
        onBlur={() => setHovered(false)}
        onHoverStart={() => setHovered(true)}
        onHoverEnd={() => setHovered(false)}
        onMouseDown={() => setTapped(true)}
        onMouseUp={() => setTapped(false)}
        onMouseLeave={() => setTapped(false)}
        onKeyDown={e => {
          if (e.keyCode == 32 || e.keyCode == 13) {
            setTapped(true)
          }
        }}
        onKeyUp={() => {
          setTapped(false)
        }}
        className="flex outline-none flex-col w-full bg-darkGray border-midGray border relative z-0 p-8 "
      >
        <Tags className="mb-6" tags={blogSummary.tags} />
        <h3 className="text-white text-heading2 font-bold mb-1">{blogSummary.title}</h3>
        <PublishedAt className="mb-7" date={blogSummary.publishedAt} />
        <Author author={blogSummary.author} />
        <motion.div
          className="absolute z-[-1]"
          initial={false}
          animate={{
            opacity: 1,
            top: cornerPosition,
            right: cornerPosition,
            bottom: cornerPosition,
            left: cornerPosition,
          }}
          exit={{ opacity: 0, top: 0, right: 0, bottom: 0, left: 0 }}
        >
          <Corners size={'large'} />
        </motion.div>
      </motion.a>
    </Link>
  )
}
