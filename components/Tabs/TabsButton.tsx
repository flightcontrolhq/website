import { LinkValue } from '@makeswift/runtime/prop-controllers'
import classNames from 'classnames'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import { useState } from 'react'

import { Corners } from 'components/Corners'

type BaseProps = {
  className?: string
  cornerColor?: string
  isCurrentTab?: boolean
}

type Props = BaseProps & Omit<HTMLMotionProps<'button'>, keyof BaseProps>

export function TabButton({ children, className, isCurrentTab, ...props }: Props) {
  const [isHovered, setHovered] = useState(false)
  const [isTapped, setTapped] = useState(false)
  const cornerPosition = isTapped ? 0 : -6
  return (
    <motion.button
      initial={false}
      animate={{
        backgroundColor: isCurrentTab ? 'rgba(255,255,255,1)' : 'rgba(255,255,255,.2)',
        color: isCurrentTab ? '#327df9' : '#fff',
      }}
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
      className={classNames(
        className,
        'text-base font-bold py-3 relative z-0 flex flex-shrink select-none items-center justify-center whitespace-nowrap outline-none',
      )}
      {...props}
    >
      <div className="transform translate-y-[1px]">{children}</div>
      <AnimatePresence>
        {isHovered && (
          <motion.div
            className="absolute z-[-1]"
            initial={{ opacity: 0, top: 0, right: 0, bottom: 0, left: 0 }}
            animate={{
              opacity: 1,
              top: cornerPosition,
              right: cornerPosition,
              bottom: cornerPosition,
              left: cornerPosition,
            }}
            exit={{ opacity: 0, top: 0, right: 0, bottom: 0, left: 0 }}
          >
            <Corners size={'small'} />
          </motion.div>
        )}
      </AnimatePresence>
    </motion.button>
  )
}
