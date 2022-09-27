import { ComponentPropsWithoutRef } from 'react'

import { Corners } from './Corners'

type BaseProps = {
  className?: string
  cornersVisible?: boolean
  backgroundColor?: string
  cornerColor?: string
  // todo:@josh why is ReactNode not working here
  children?: any // ReactNode
}

type Props = BaseProps & Omit<ComponentPropsWithoutRef<'div'>, keyof BaseProps>

// todo:@josh why are we getting a console error for not forwarding the ref on this and other components
export function Box({ cornersVisible = true, backgroundColor = 'transparent', ...props }: Props) {
  return (
    <div
      className={`${props.className} relative z-0 p-8`}
      style={{
        backgroundColor: backgroundColor,
      }}
    >
      {cornersVisible && (
        <div className="absolute inset-0">
          <Corners color={props.cornerColor} />
        </div>
      )}
      {props.children}
    </div>
  )
}
