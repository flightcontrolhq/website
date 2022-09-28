import classNames from 'classnames'
import { HTMLMotionProps, motion } from 'framer-motion'
import { forwardRef, Ref } from 'react'

type Size = 'xs' | 'small' | 'medium' | 'large'

type BaseProps = {
  size?: Size
  active?: boolean
  loading?: boolean
}

type Props = Omit<HTMLMotionProps<'button'>, keyof BaseProps> & BaseProps

export const IconButton = forwardRef(function IconButton(
  {
    name,
    size = 'medium',
    color = 'gray',
    active = false,
    type = 'button',
    loading = false,
    disabled = false,
    children,
    ...rest
  }: Props,
  ref: Ref<HTMLButtonElement>,
) {
  return (
    <motion.button
      {...rest}
      className={classNames(
        rest.className,
        'cursor-click disabled:hocus:text-gray-400 disabled:hocus:bg-transparent outline-thick flex items-center justify-center rounded-md fill-current font-bold shadow-none disabled:cursor-not-allowed disabled:bg-transparent disabled:text-gray-400',
        {
          xs: `h-5 w-5`,
          small: `h-6 w-6`,
          medium: `h-7 w-7`,
          large: `h-9 w-9`,
        }[size],
      )}
      ref={ref}
      type={type}
      disabled={disabled || loading}
    >
      {children}
    </motion.button>
  )
})
