import classNames from 'classnames'
import { AnimatePresence, motion } from 'framer-motion'
import Image from 'next/image'
import { useState, MouseEvent, useRef, ComponentPropsWithoutRef, Ref, forwardRef } from 'react'
import ReactPlayer from 'react-player'

import { BodyMask } from 'components/BodyMask'
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
    ComponentPropsWithoutRef<'button'>,
    keyof BaseProps | 'onAnimationStart' | 'onDragStart' | 'onDragEnd' | 'onDrag'
  >

export const PopupVideo = forwardRef(function PopupVideo(
  { className, preview, previewAltText, video, isAboveTheFold, ...rest }: Props,
  ref: Ref<HTMLButtonElement>,
) {
  const [isFullscreen, setFullscreen] = useState(false)
  const [isFocused, setFocused] = useState(false)
  const [isTapped, setTapped] = useState(false)
  const mousedownTarget = useRef<EventTarget>()

  function handleMouseDown(e: MouseEvent<HTMLElement>) {
    if (e.isDefaultPrevented()) return

    mousedownTarget.current = e.target
  }

  function handleClick(e: MouseEvent<HTMLElement>) {
    if (e.isDefaultPrevented()) return

    if (mousedownTarget.current === e.currentTarget) {
      e.preventDefault()
      setFullscreen(false)
    }
  }

  return (
    <>
      <motion.button
        {...rest}
        onClick={() => setFullscreen(true)}
        className={classNames(
          'max-w-7xl w-full mx-auto relative z-0 cursor-pointer bg-black border-midGray border block',
          className,
        )}
        ref={ref}
        initial={'initial'}
        animate={isTapped ? ['tap', 'animate'] : isFocused ? ['hover', 'animate'] : 'animate'}
        whileTap={'tap'}
        whileHover={'hover'}
        onKeyDown={e => {
          if (e.keyCode == 32 || e.keyCode == 13) {
            setTapped(true)
          }
        }}
        onKeyUp={() => {
          setTapped(false)
        }}
        onFocus={() => setFocused(true)}
        onBlur={() => setFocused(false)}
      >
        {preview ? (
          <>
            <Image
              src={preview.url}
              className="cursor-pointer"
              layout="responsive"
              width={preview.dimensions.width}
              height={preview.dimensions.height}
              alt={previewAltText ?? ''}
              priority={isAboveTheFold}
            />
            <PlayButton
              className="absolute rounded-full top-1/2 left-1/2 flex justify-center items-center w-20 h-20 lg:w-32 lg:h-32"
              variants={{
                initial: {
                  opacity: 0,
                  x: '-50%',
                  y: '-50%',
                },
                animate: {
                  opacity: 1,
                  x: '-50%',
                  y: '-50%',
                  transition: {
                    delay: 0.3,
                  },
                },
                tap: {
                  scale: 0.96,
                },
                hover: {
                  scale: 1.03,
                },
              }}
            />
          </>
        ) : (
          // eslint-disable-next-line @next/next/no-img-element
          <img width="100%" src={placeholders.video.src} alt="Video Placeholder" />
        )}
      </motion.button>
      <AnimatePresence>
        {isFullscreen && video && (
          <BodyMask
            className={
              'fixed z-[1000] p-5 xs:p-8 inset-0 cursor-pointer bg-black flex justify-center items-center'
            }
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
              }}
              animate={{
                opacity: 1,
              }}
              exit={{
                opacity: 0,
              }}
              className="w-[1280px] max-w-full max-h-full bg-black overflow-hidden "
              style={{
                aspectRatio: '' + video?.aspectRatio,
              }}
            >
              <ReactPlayer
                url={video.url}
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
                playing={video?.autoPlay}
                muted={video?.muted}
                controls={video?.controls}
                loop={video?.loop}
              />
            </motion.div>
          </BodyMask>
        )}
      </AnimatePresence>
    </>
  )
})
