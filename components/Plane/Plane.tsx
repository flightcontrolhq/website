import { motion, useScroll, useSpring, useTransform } from 'framer-motion'
import Image from 'next/image'
import { forwardRef, Ref, useImperativeHandle, useLayoutEffect, useRef, useState } from 'react'

type Props = {
  isAboveTheFold?: boolean
}

export const Plane = forwardRef(function Plane(props: Props, forwardedRef: Ref<HTMLDivElement>) {
  const ref = useRef<HTMLDivElement>(null)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

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
    offset: ['0 1.5', '1 -.2'],
  })
  const x = useTransform(scrollYProgress, [0, 1], [0, width])
  const smoothX = useSpring(x, { duration: 0.5 })
  return (
    <motion.div
      initial={{
        opacity: 0,
        y: '-50%',
        x: '-70%',
      }}
      animate={{
        opacity: isLoaded ? 1 : 0,
        y: '-50%',
        x: isLoaded ? '-50%' : '-70%',
      }}
      transition={{ duration: 0.3, type: 'tween', ease: [0.165, 0.84, 0.44, 1] }}
      className={`absolute w-full z-[-1] top-1/2 left-1/2`}
      ref={ref}
      {...props}
    >
      <motion.div style={{ x: smoothX }}>
        <div className="transform -translate-x-1/2 w-[300px] tablet:w-[450px] desktop:w-[600px]">
          <Image
            onLoad={() => {
              return setIsLoaded(true)
            }}
            layout="responsive"
            width={1200}
            height={1040}
            src={'/plane.png'}
            alt="Plane animating across the screen"
            priority={props.isAboveTheFold}
          />
        </div>
      </motion.div>
    </motion.div>
  )
})