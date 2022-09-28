import classNames from 'classnames'
import { ComponentPropsWithoutRef, forwardRef, Ref } from 'react'

import { Corners } from './Corners'

type BaseProps = {
  className?: string
  cornersVisible?: boolean
  backgroundColor?: string
  cornerColor?: string
  height?: 'stretch' | 'auto'
  alignItems?: 'top' | 'middle' | 'bottom' | 'spaceBetween'
  // todo:@josh why is ReactNode not working here
  children?: any // ReactNode
}

type Props = BaseProps & Omit<ComponentPropsWithoutRef<'div'>, keyof BaseProps>

export const Box = forwardRef(function Box(
  {
    cornersVisible = true,
    height = 'auto',
    alignItems = 'top',
    backgroundColor = 'transparent',
    ...props
  }: Props,
  ref: Ref<HTMLDivElement>,
) {
  return (
    <div
      ref={ref}
      className={classNames(
        props.className,
        'relative z-0 p-8 flex',
        {
          stretch: 'self-stretch',
          auto: 'self-auto',
        }[height],
      )}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {cornersVisible && <Corners className="absolute z-10" color={props.cornerColor} />}
      <div
        className={classNames(
          'flex w-full',
          {
            stretch: 'self-stretch',
            auto: 'self-auto',
          }[height],
          {
            top: '[&>div]:content-start',
            middle: '[&>div]:content-center',
            bottom: '[&>div]:content-end',
            spaceBetween: '[&>div]:content-between',
          }[alignItems],
        )}
      >
        {props.children}
      </div>
    </div>
  )
})
