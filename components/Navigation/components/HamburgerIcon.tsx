import { motion, SVGMotionProps } from 'framer-motion'
import * as React from 'react'

export function Hamburger(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect y="7" width="24" height="2" />
      <rect y="15" width="24" height="2" />
    </motion.svg>
  )
}
