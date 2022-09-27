import classNames from 'classnames'
import { ComponentPropsWithoutRef } from 'react'

import { Corners } from './Corners'

type BaseProps = {
  className?: string
  cornersVisible?: boolean
  backgroundColor?: string
  cornerColor?: string
  // todo:@josh why is ReactNode not working here
  height?: 'stretch' | 'auto'
  alignItems?: 'top' | 'middle' | 'bottom' | 'spaceBetween'
  children?: any // ReactNode
}

type Props = BaseProps & Omit<ComponentPropsWithoutRef<'div'>, keyof BaseProps>

// todo:@josh why are we getting a console error for not forwarding the ref on this and other components
export function Box({
  cornersVisible = true,
  height = 'auto',
  alignItems = 'top',
  backgroundColor = 'transparent',
  ...props
}: Props) {
  return (
    <div
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
      {cornersVisible && (
        <div className="absolute inset-0">
          <Corners color={props.cornerColor} />
        </div>
      )}
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
}
