import classNames from 'classnames'
import { AnimatePresence, HTMLMotionProps, motion } from 'framer-motion'
import Link from 'next/link'
import { forwardRef, Ref, useState } from 'react'
import { MouseEvent } from 'react'

import { Corners } from './Corners'

type LinkValue = {
  href: string
  target: '_blank' | '_self' | undefined
  onClick(event: MouseEvent<HTMLElement>): void
}

const transition = {
  duration: 0.75,
  ease: 'easeInOut',
  repeat: Infinity,
  repeatDelay: 1,
  times: [0, 0.6, 0.8, 1],
}

type BaseProps = {
  className?: string
  text?: string
  variant?: 'solid' | 'outlined'
  size?: 'small' | 'large'
  showArrows?: boolean
  link?: LinkValue
  cornerColor?: string
}

type Props = BaseProps & Omit<HTMLMotionProps<'a'>, keyof BaseProps>

export const Button = forwardRef(function Button(
  {
    showArrows = true,
    variant = 'solid',
    size = 'large',
    link,
    className,
    cornerColor,
    ...props
  }: Props,
  ref: Ref<HTMLAnchorElement>,
) {
  const [isHovered, setHovered] = useState(false)
  const [isTapped, setTapped] = useState(false)

  const borderOffset = {
    outlined: 2,
    solid: 0,
  }[variant]
  const cornerPosition = isTapped ? 0 - borderOffset : -6 - borderOffset

  return (
    <Link passHref href={link?.href ?? '#'}>
      <motion.a
        ref={ref}
        target={link?.target ?? undefined}
        onClick={link?.onClick}
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
        variants={{
          off: {},
          on: {},
        }}
        transition={{
          staggerChildren: 0.2,
        }}
        initial={'off'}
        animate={showArrows ? 'on' : 'off'}
        className={classNames(
          className,
          'relative z-0 flex flex-shrink select-none items-center  justify-center whitespace-nowrap text-white outline-none',

          {
            small: 'text-sm font-bold leading-none',
            large: 'text-xl font-extrabold leading-none',
          }[size],
          {
            solid: {
              small: 'px-[12px] py-[11px] ',
              large: 'px-[32px] py-[18px]',
            }[size],
            outlined: {
              small: 'px-[10px] py-[9px] ',
              large: 'px-[30px] py-[16px]',
            }[size],
          }[variant],
        )}
        style={
          {
            solid: {
              background: 'linear-gradient(272.74deg, #327DF9 0%, #22D834 100%)',
            },
            outlined: {
              borderImage: 'linear-gradient(272.74deg, #327DF9 0%, #22D834 100%) 25%',
              borderStyle: 'inset',
              borderWidth: '2px',
            },
          }[variant]
        }
      >
        <div>{props.text ?? props.children}</div>
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
              <Corners color={cornerColor} size={size} />
            </motion.div>
          )}
        </AnimatePresence>
        {showArrows && (
          <motion.svg
            width={
              {
                small: '15',
                large: '27',
              }[size]
            }
            height={
              {
                small: '10',
                large: '18',
              }[size]
            }
            viewBox="0 0 27 18"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className={'ml-3 flex-shrink-0'}
          >
            <motion.path
              variants={{
                off: { strokeOpacity: 0.33 },
                on: {
                  strokeOpacity: [0.33, 1, 0.66, 0.33],
                },
              }}
              transition={transition}
              d="M1 1L9 9L1 17"
              stroke="white"
              strokeWidth="2"
            />
            <motion.path
              variants={{
                off: { strokeOpacity: 0.33 },
                on: {
                  strokeOpacity: [0.33, 1, 0.66, 0.33],
                },
              }}
              transition={transition}
              d="M9 1L17 9L9 17"
              stroke="white"
              strokeWidth="2"
            />
            <motion.path
              variants={{
                off: { strokeOpacity: 0.33 },
                on: {
                  strokeOpacity: [0.33, 1, 0.66, 0.33],
                },
              }}
              transition={transition}
              d="M17 1L25 9L17 17"
              stroke="white"
              strokeWidth="2"
            />
          </motion.svg>
        )}
      </motion.a>
    </Link>
  )
})
