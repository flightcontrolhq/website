import { MouseEvent } from 'react'

export type LinkValue = {
  href: string
  target: '_blank' | '_self' | undefined
  onClick(event: MouseEvent<HTMLElement>): void
}

export type ImageWithDimensions = {
  url: string
  dimensions: {
    width: number
    height: number
  }
}
