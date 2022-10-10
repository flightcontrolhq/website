import classNames from 'classnames'
import { AnimatePresence } from 'framer-motion'
import { motion } from 'framer-motion'
import { forwardRef, Ref, useEffect, useState } from 'react'

import { TabButton } from './TabsButton'

type Props = {
  // todo:@josh why is ReactNode not working here
  tab1Content?: any // ReactNode
  tab1Text?: string
  tab2Content?: any // ReactNode
  tab2Text?: string
  initialTab?: string
  className?: string
}

export const Tabs = forwardRef(function Tabs(
  { tab1Text, tab1Content, tab2Content, tab2Text, initialTab, className, ...props }: Props,
  ref: Ref<HTMLDivElement>,
) {
  const [currentTab, setCurrentTab] = useState<number>(parseInt(initialTab ?? '1'))
  useEffect(() => {
    setCurrentTab(parseInt(initialTab ?? '1'))
  }, [initialTab])
  return (
    <div
      className={classNames(
        className,
        'text-sm tablet:text-base font-bold flex flex-col space-y-5',
      )}
      ref={ref}
      {...props}
    >
      <div className="flex justify-center items-center w-full space-x-3">
        <TabButton
          className="max-w-[200px] w-1/2"
          isCurrentTab={currentTab === 1}
          onClick={() => setCurrentTab(1)}
        >
          <div className="transform translate-y-[2px]">{tab1Text}</div>
        </TabButton>
        <TabButton
          className="max-w-[200px] w-1/2"
          isCurrentTab={currentTab === 2}
          onClick={() => setCurrentTab(2)}
        >
          <div className="transform translate-y-[2px]">{tab2Text}</div>
        </TabButton>
      </div>
      <AnimatePresence mode="wait" initial={false}>
        <motion.div
          initial={{
            x: -30,
            opacity: 0,
          }}
          animate={{ x: 0, opacity: 1 }}
          exit={{
            x: 30,
            opacity: 0,
          }}
          transition={{ duration: 0.3, type: 'tween', ease: [0.165, 0.84, 0.44, 1] }}
          key={currentTab === 1 ? tab1Text : tab2Text}
        >
          {currentTab === 1 ? tab1Content : tab2Content}
        </motion.div>
      </AnimatePresence>
    </div>
  )
})
