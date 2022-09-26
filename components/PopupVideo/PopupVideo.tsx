import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState, MouseEvent, useRef, ComponentPropsWithoutRef, Ref, forwardRef } from 'react'
import ReactPlayer from 'react-player'

import { BodyMask } from 'components/BodyMask'
import { Corners } from 'components/Corners'
import { placeholders } from 'lib/makeswift/placeholders'
import { ImageWithDimensions } from 'lib/makeswift/types'

import { PlayButton } from './PlayButton'

type BaseProps = {
  video?: {
    url?: string
    aspectRatio?: number
    autoPlay?: boolean
    controls?: boolean
    loop?: boolean
    muted?: boolean
  }
  preview?: ImageWithDimensions
  previewAltText?: string
  className?: string
  isAboveTheFold?: boolean
}

type Props = BaseProps &
  Omit<
    ComponentPropsWithoutRef<'div'>,
    keyof BaseProps | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  >

export const PopupVideo = forwardRef(function PopupVideo(
  { className, preview, previewAltText, video, isAboveTheFold, ...rest }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const [isFullscreen, setFullscreen] = useState(false)
  const mousedownTarget = useRef<EventTarget>()

  function handleMouseDown(e: MouseEvent<HTMLDivElement>) {
    if (e.isDefaultPrevented()) return

    mousedownTarget.current = e.target
  }

  function handleClick(e: MouseEvent<HTMLDivElement>) {
    if (e.isDefaultPrevented()) return

    if (mousedownTarget.current === e.currentTarget) {
      e.preventDefault()
      setFullscreen(false)
    }
  }

  return (
    <>
      <motion.div
        {...rest}
        className={classNames(
          'max-w-7xl w-full mx-auto relative z-0 cursor-pointer bg-black border-midGray border block',
          className,
        )}
        ref={ref}
      >
        {preview ? (
          <Image
            src={preview.url}
            layout="responsive"
            width={preview.dimensions.width}
            height={preview.dimensions.height}
            alt={previewAltText}
            className="rounded-t-lg"
            priority={isAboveTheFold}
          />
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img
            width="100%"
            className="rounded-t-lg"
            src={placeholders.video.src}
            alt="Video Placeholder"
          />
        )}

        {preview && (
          <motion.button
            onClick={() => setFullscreen(true)}
            initial={{
              opacity: 0,
              x: '-50%',
              y: '-50%',
            }}
            animate={{
              opacity: 1,
              x: '-50%',
              y: '-50%',
              transition: {
                delay: 0.3,
              },
            }}
            whileTap={{
              scale: 0.96,
              x: '-50%',
              y: '-50%',
            }}
            className="absolute outline-thick rounded-full top-1/2 left-1/2 flex justify-center items-center"
          >
            <PlayButton className={'w-20 h-20 lg:w-32 lg:h-32'} />
          </motion.button>
        )}
        <Corners />
      </motion.div>
      <AnimatePresence>
        {isFullscreen && video && (
          <BodyMask
            className={'fixed inset-0 cursor-pointer bg-black '}
            onClick={handleClick}
            onMouseDown={handleMouseDown}
            transition={{
              type: 'tween',
              ease: [0.165, 0.84, 0.44, 1],
            }}
            initial={{
              backgroundColor: 'rgba(10,10,10,0)',
            }}
            animate={{
              backgroundColor: 'rgba(10,10,10,.86)',
            }}
            exit={{
              backgroundColor: 'rgba(10,10,10,0)',
            }}
          >
            <motion.div
              transition={{
                type: 'tween',
                ease: [0.165, 0.84, 0.44, 1],
              }}
              initial={{
                opacity: 0,
                x: '-50%',
                y: '-45%',
              }}
              animate={{
                opacity: 1,
                x: '-50%',
                y: '-50%',
              }}
              exit={{
                opacity: 0,
                x: '-50%',
                y: '-45%',
              }}
              className="fixed w-11/12 max-w-7xl bg-black rounded-[15px] overflow-hidden transform -translate-x-1/2 -translate-y-1/2 top-1/2 left-1/2 "
              style={{
                aspectRatio: '' + video?.aspectRatio,
              }}
            >
              <ReactPlayer
                url={video?.url}
                width="100%"
                height="100%"
                config={{
                  vimeo: {
                    playerOptions: {
                      background: video != null && !video.controls,
                    },
                  },
                  wistia: {
                    options: {
                      endVideoBehavior: video != null && video.loop === true ? 'loop' : 'default',
                    },
                  },
                }}
                loop={video?.loop}
                controls={video?.controls}
                playing={video?.autoPlay}
                muted={video?.muted}
              />
            </motion.div>
          </BodyMask>
        )}
      </AnimatePresence>
    </>
  )
})
