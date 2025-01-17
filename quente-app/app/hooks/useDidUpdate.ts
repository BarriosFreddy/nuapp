/* eslint-disable react-hooks/exhaustive-deps */
import { useEffect, useRef } from 'react'

type useDidUpdateType = (callback: ()=> void, dependecies: any[]) => void

export const useDidUpdate: useDidUpdateType = (callback, dependecies) => {
  const mounted = useRef(false)

  useEffect(() => {
    if (mounted.current) {
      return callback()
    } else {
      mounted.current = true
    }
  }, dependecies)
}
