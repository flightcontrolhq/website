import { MotionValue, transform, useTransform, motion } from 'framer-motion'
import React, { useMemo } from 'react'

import {
  BLUE,
  DOT_RADIUS,
  GRAY,
  GREEN,
  X_DISTANCE_BETWEEN_DOTS,
  Y_DISTANCE_AROUND_DOTS,
  Y_DISTANCE_BETWEEN_DOTS,
} from '../constants'

const getOpacity = transform([-250, -150, 150, 250], [0, 1, 1, 0])

type Props = {
  columnPosition: number
  numberOfColumns: number
  firstColumnOffset: number
  x: MotionValue<any>
}

export function Column({ columnPosition, numberOfColumns, firstColumnOffset, x }: Props) {
  const backgroundColor = useMemo(
    () => transform([0, numberOfColumns], [GREEN, BLUE])(columnPosition),
    [columnPosition, numberOfColumns],
  )

  const opacity = useTransform(x, value => {
    const rangeOfIlluminatedPositions = [value - 250, value + 250]
    const xPositionOfThisColumn = 20 + 50 * columnPosition
    const isThisColumnIlluminated =
      xPositionOfThisColumn < rangeOfIlluminatedPositions[1] &&
      xPositionOfThisColumn > rangeOfIlluminatedPositions[0]
    return isThisColumnIlluminated ? getOpacity(value - xPositionOfThisColumn) : 1
  })

  const fill = useTransform(x, value => {
    const rangeOfIlluminatedPositions = [value - 250, value + 250]
    const xPositionOfThisColumn = 20 + 50 * columnPosition
    const isThisColumnIlluminated =
      xPositionOfThisColumn < rangeOfIlluminatedPositions[1] &&
      xPositionOfThisColumn > rangeOfIlluminatedPositions[0]
    return isThisColumnIlluminated ? backgroundColor : GRAY
  })

  return (
    <React.Fragment key={columnPosition}>
      <motion.circle
        r={DOT_RADIUS}
        cx={
          firstColumnOffset +
          DOT_RADIUS +
          (X_DISTANCE_BETWEEN_DOTS + DOT_RADIUS * 2) * columnPosition
        }
        cy={Y_DISTANCE_AROUND_DOTS + DOT_RADIUS}
        initial={{ fill: GRAY, opacity: 1 }}
        style={{ fill, opacity }}
      />
      <motion.circle
        r={DOT_RADIUS}
        cx={
          firstColumnOffset +
          DOT_RADIUS +
          (X_DISTANCE_BETWEEN_DOTS + DOT_RADIUS * 2) * columnPosition
        }
        cy={Y_DISTANCE_AROUND_DOTS + DOT_RADIUS * 3 + Y_DISTANCE_BETWEEN_DOTS}
        initial={{ fill: GRAY, opacity: 1 }}
        style={{ fill, opacity }}
      />
      <motion.circle
        r={DOT_RADIUS}
        cx={
          firstColumnOffset +
          DOT_RADIUS +
          (X_DISTANCE_BETWEEN_DOTS + DOT_RADIUS * 2) * columnPosition
        }
        cy={Y_DISTANCE_AROUND_DOTS + DOT_RADIUS * 5 + Y_DISTANCE_BETWEEN_DOTS * 2}
        initial={{ fill: GRAY, opacity: 1 }}
        style={{ fill, opacity }}
      />
    </React.Fragment>
  )
}
