import classNames from 'classnames'
import { Button } from 'components'
import { AnimatePresence } from 'framer-motion'
import { ImageWithDimensions, LinkValue } from 'lib/makeswift/types'
import Image from 'next/image'
import Link from 'next/link'
import { ComponentPropsWithoutRef, forwardRef, Ref, useState } from 'react'

import { Close, Hamburger, IconButton, TextButton, MobileMenu } from './components'

type BaseProps = {
  className?: string
  logo: {
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
          'grid grid-cols-2 md:grid-cols-3 bg-black px-5 py-5 md:px-10 ',
        )}
      >
        <div className="z-[99999] flex flex-row items-center justify-start ">
          {logo.image ? (
            <Link
              passHref
              className="outline-thick flex-shrink-0 rounded-md"
              href={logo.link ?? ''}
            >
              <Image
                alt={'Flight control logo'}
                src={logo.image.url}
                width={logo.image.dimensions.width}
                height={logo.image.dimensions.height}
                priority={true}
              />
            </Link>
          ) : (
            // eslint-disable-next-line @next/next/no-img-element
            <div className="text-xl">Logo placeholder</div>
          )}
        </div>
        <div className="hidden items-center justify-center space-x-8 md:flex">
          {center.map((link, i) =>
            link.variant === 'solid' ? (
              <Button key={i} variant="solid" href={link?.link?.href ?? ''}>
                {link.text}
              </Button>
            ) : (
              <TextButton key={i} href={link?.link?.href ?? ''}>
                {link.text}
              </TextButton>
            ),
          )}
        </div>
        <div className="hidden items-center justify-end space-x-7 md:flex">
          {right.map((link, i) =>
            link.variant === 'solid' ? (
              <Button key={i} variant="solid" size="small" href={link?.link?.href ?? ''}>
                {link.text}
              </Button>
            ) : (
              <TextButton key={i} href={link?.link?.href ?? ''}>
                {link.text}
              </TextButton>
            ),
          )}
        </div>
        <div className="z-[99999]  items-center justify-end self-center justify-self-end md:hidden">
          <IconButton onClick={() => setIsOpen(prev => !prev)}>
            <AnimatePresence mode="popLayout">
              {isOpen ? (
                <Close initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} />
              ) : (
                <Hamburger
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
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
