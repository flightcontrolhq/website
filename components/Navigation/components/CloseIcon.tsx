import { motion, SVGMotionProps } from 'framer-motion'
import * as React from 'react'

export function Close(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg width="24" height="24" fill="#fff" xmlns="http://www.w3.org/2000/svg" {...props}>
      <rect
        x="3"
        y="19.9706"
        width="24"
        height="2"
        transform="rotate(-45 3 19.9706)"
        fill="white"
      />
      <rect x="4.41418" y="3" width="24" height="2" transform="rotate(45 4.41418 3)" fill="white" />
    </motion.svg>
  )
}
