import classNames from 'classnames'
import { useTransform, transform, useTime, motion } from 'framer-motion'
import React, {
  useState,
  useRef,
  useMemo,
  ComponentPropsWithoutRef,
  forwardRef,
  useImperativeHandle,
  Ref,
  useEffect,
} from 'react'

import { Column } from './components/Column'
import { DOT_RADIUS, X_DISTANCE_BETWEEN_DOTS } from './constants'

const transformWidthToDuration = transform(
  [0, 600, 1200, 3000, 10000],
  [3000, 3000, 4000, 5000, 8000],
)

type BaseProps = {
  className?: string
  cornerColor?: string
  children?: any
}

type Props = BaseProps & Omit<ComponentPropsWithoutRef<'div'>, keyof BaseProps>

export const Lights = forwardRef(function Lights(
  { className, ...props }: Props,
  forwardedRef: Ref<HTMLDivElement>,
) {
  const [points, setPoints] = useState<number[]>([])
  const [width, setWidth] = useState<number>(0)
  const [firstColumnOffsetX, setFirstColumnOffsetX] = useState<number>(0)
  const time = useTime()

  const transformDurationToXPosition = useMemo(
    () => transform([0, transformWidthToDuration(width)], [-400, width + 400]),
    [width],
  )

  const x = useTransform(time, value => {
    const duration = transformWidthToDuration(width)
    return transformDurationToXPosition(value % duration)
  })

  const ref = useRef<HTMLDivElement>(null)
  useImperativeHandle<HTMLDivElement | null, HTMLDivElement | null>(forwardedRef, () => ref.current)

  useEffect(() => {
    window.addEventListener('resize', resize)
    resize()
    return () => window.removeEventListener('resize', resize)

    function resize() {
      const width = ref.current?.getBoundingClientRect().width ?? 0

      const oneDotAndSpace = X_DISTANCE_BETWEEN_DOTS + DOT_RADIUS * 2
      const extraDot = DOT_RADIUS * 2

      const widthAvailableForDots = width - extraDot
      const count = Math.floor(widthAvailableForDots / oneDotAndSpace)
      const firstColumnOffsetX = (widthAvailableForDots % oneDotAndSpace) / 2

      setWidth(width)
      setFirstColumnOffsetX(firstColumnOffsetX)
      setPoints(new Array(count + 1).fill('').map((_, i) => i))
    }
  }, [])

  return (
    <div
      className={classNames(className, 'w-full flex justify-center items-center')}
      ref={ref}
      {...props}
    >
      <motion.svg
        width={width}
        height={56}
        initial={{ opacity: 0 }}
        animate={{ opacity: width ? 1 : 0 }}
        viewBox={`0 0 ${width} 56`}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
      >
        {points.map((index, i) => {
          return (
            <Column
              key={index}
              firstColumnOffset={firstColumnOffsetX}
              numberOfColumns={points.length}
              columnPosition={i}
              width={width}
              x={x}
            />
          )
        })}
      </motion.svg>
    </div>
  )
})
