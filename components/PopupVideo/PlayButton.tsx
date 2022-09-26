import { SVGMotionProps, motion } from 'framer-motion'
import * as React from 'react'

export function PlayButton(props: SVGMotionProps<SVGSVGElement>) {
  return (
    <motion.svg
      width="120"
      height="120"
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <rect width="120" height="120" rx="60" fill="white" />
      <path
        d="M87.7061 56.5034L45.9426 33.3014C43.2764 31.8202 40 33.7481 40 36.7981V83.2019C40 86.2519 43.2764 88.1798 45.9426 86.6986L87.7061 63.4966C90.4493 61.9726 90.4493 58.0274 87.7061 56.5034Z"
        fill="url(#paint0_linear_44_12591)"
      />
      <defs>
        <linearGradient
          id="paint0_linear_44_12591"
          x1="40"
          y1="44"
          x2="94"
          y2="79"
          gradientUnits="userSpaceOnUse"
        >
          <stop stopColor="#22D834" />
          <stop offset="1" stopColor="#327DF9" />
        </linearGradient>
      </defs>
    </motion.svg>
  )
}
