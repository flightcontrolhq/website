import { useLayoutEffect, useEffect } from 'react'

/**
 * Sometimes animations need to `useLayoutEffect` to prevent weird initial states on different devices.
 * This hook allows you to use it while silencing the warning in the console.
 */
export const useIsomorphicLayoutEffect = typeof window !== 'undefined' ? useLayoutEffect : useEffect
