import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { useLayoutEffect, useRef, useState } from 'react'

type Props = {}

export function Plane(props: Props) {
  const ref = useRef<HTMLDivElement>(null)
  const [isLoaded, setIsLoaded] = useState(false)

  const [width, setWidth] = useState(0)

  useLayoutEffect(() => {
    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)

    function resize() {
      const width = ref.current?.getBoundingClientRect().width ?? 0
      setWidth(width)
    }
  }, [])

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ['0 1', '1 0'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, width])

  const smoothX = useSpring(x, {
    stiffness: 50,
    damping: 20,
    restDelta: 0.001,
  })

  return (
    <motion.div
      initial={{
        opacity: 0,
      }}
      animate={{
        opacity: isLoaded ? 1 : 0,
      }}
      ref={ref}
      className={`absolute w-full z-[-1] top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2`}
      {...props}
    >
      <motion.div style={{ x: smoothX }}>
        <div className="transform -translate-x-1/2 w-[300px] md:w-[600px]">
          <Image
            onLoad={() => {
              return setIsLoaded(true)
            }}
            width={1200}
            height={1040}
            src={'/plane.png'}
            alt="Plane animating across the screen"
          />
        </div>
      </motion.div>
    </motion.div>
  )
}
