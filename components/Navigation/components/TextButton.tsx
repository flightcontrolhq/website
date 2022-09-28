import classNames from 'classnames'
import Link from 'next/link'
import { ComponentPropsWithoutRef, MouseEvent } from 'react'

type LinkValue = {
  href: string
  target: '_blank' | '_self' | undefined
  onClick(event: MouseEvent<HTMLElement>): void
}

type BaseProps = {
  className?: string
  link?: LinkValue
}

type Props = BaseProps & Omit<ComponentPropsWithoutRef<'a'>, keyof BaseProps>

export function TextButton({ link, className, ...props }: Props) {
  return (
    <Link href={link?.href ?? '#'}>
      <a
        {...props}
        target={link?.target ?? undefined}
        onClick={link?.onClick}
        className={classNames(
          className,
          'relative z-0 flex select-none items-center justify-center whitespace-nowrap px-[11px] py-[12px] text-base font-light text-lightGray outline-none transition-colors hover:text-white focus-visible:text-white',
        )}
      >
        {props.children}
      </a>
    </Link>
  )
}
