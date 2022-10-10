import classNames from 'classnames'
import { Button } from 'components'
import { AnimatePresence, motion } from 'framer-motion'

import { ImageWithDimensions, LinkValue } from 'lib/makeswift/types'

import { Props as NavigationProps } from '../../Navigation'
import { TextButton } from './TextButton'

type Props = {
  onClose?: () => unknown
  open?: boolean
  logo?: {
    image?: ImageWithDimensions
    link?: LinkValue
  }
  center: {
    link?: LinkValue
    text?: string
    variant?: 'solid' | 'text'
  }[]
  right: {
    link?: LinkValue
    text?: string
    variant?: 'solid' | 'text'
  }[]
} & NavigationProps

export function MobileMenu({
  open = false,
  onClose = () => {},
  center,
  right,
  className,
  logo,
}: Props): JSX.Element {
  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{
            x: '100%',
          }}
          animate={{
            x: '0%',
          }}
          exit={{
            x: '100%',
          }}
          transition={{
            duration: 0.3,
            type: 'tween',
            ease: [0.165, 0.84, 0.44, 1],
          }}
          className={classNames(
            'xs:px-[30px] fixed top-0 left-0 right-0 bottom-0 z-[9999] flex w-full flex-col overflow-y-auto bg-black px-5 py-5 md:px-10 touch-none',
            className,
          )}
        >
          <div className="relative flex h-full w-full flex-col items-center space-y-5 pt-28">
            {center.map((link, i) =>
              link.variant === 'solid' ? (
                <Button key={i} size="small" variant="solid" link={link?.link}>
                  {link.text}
                </Button>
              ) : (
                <TextButton key={i} link={link?.link}>
                  {link.text}
                </TextButton>
              ),
            )}
            {right.map((link, i) =>
              link.variant === 'solid' ? (
                <Button key={i} size="small" variant="solid" link={link?.link}>
                  {link.text}
                </Button>
              ) : (
                <TextButton key={i} link={link?.link}>
                  {link.text}
                </TextButton>
              ),
            )}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
