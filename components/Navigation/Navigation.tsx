import classNames from 'classnames'
import { Button } from 'components'
import { AnimatePresence } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef, forwardRef, Ref, useState } from 'react'

import { ImageWithDimensions, LinkValue } from 'lib/makeswift/types'

import { Close, Hamburger, IconButton, TextButton, MobileMenu } from './components'

type BaseProps = {
  className?: string
  logo: {
    image?: ImageWithDimensions
    link?: LinkValue
    alt?: string
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
}

export type Props = BaseProps &
  Omit<
    ComponentPropsWithoutRef<'div'>,
    keyof BaseProps | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  >

export const Navigation = forwardRef(function Navigation(
  { id, logo, className, center, right }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const [isOpen, setIsOpen] = useState(false)
  return (
    <>
      <div
        ref={ref}
        id={id}
        className={classNames(
          className,
          'flex justify-between items-center lg:grid  lg:grid-cols-3 bg-black px-5 py-5 md:px-10',
          isOpen && 'touch-none',
        )}
      >
        <div className={classNames('z-[99999] flex flex-row items-center justify-start ')}>
          {logo.image ? (
            <Link
              passHref
              className="cursor-pointer outline-thick flex-shrink-0 rounded-primary"
              href={logo.link ?? ''}
            >
              <a className="flex justify-center items-center">
                <Image
                  className="cursor-pointer"
                  alt={logo.alt}
                  src={logo.image.url}
                  width={logo.image.dimensions.width}
                  height={logo.image.dimensions.height}
                  priority={true}
                />
              </a>
            </Link>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="text-xl">Logo placeholder</div>
          )}
        </div>
        <div className="hidden items-center justify-center space-x-5 md:flex">
          {center.map((link, i) =>
            link.variant === 'solid' ? (
              <Button key={i} variant="solid" size="small" link={link?.link}>
                {link.text}
              </Button>
            ) : (
              <TextButton key={i} link={link?.link}>
                {link.text}
              </TextButton>
            ),
          )}
        </div>
        <div className="hidden items-center justify-end space-x-5 md:flex">
          {right.map((link, i) =>
            link.variant === 'solid' ? (
              <Button key={i} variant="solid" size="small" link={link?.link}>
                {link.text}
              </Button>
            ) : (
              <TextButton key={i} link={link?.link}>
                {link.text}
              </TextButton>
            ),
          )}
        </div>
        <div
          className={classNames(
            'z-[99999] items-center justify-end self-center justify-self-end md:hidden',
          )}
        >
          <IconButton onClick={() => setIsOpen(prev => !prev)}>
            <AnimatePresence initial={false} mode="wait">
              {isOpen ? (
                <Close
                  key="close"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                />
              ) : (
                <Hamburger
                  key="hamburger"
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  transition={{ duration: 0.1 }}
                />
              )}
            </AnimatePresence>
          </IconButton>
        </div>
        <MobileMenu
          logo={logo}
          center={center}
          right={right}
          onClose={() => setIsOpen(false)}
          open={isOpen}
        />
      </div>
    </>
  )
})
