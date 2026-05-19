import { RefObject, useRef } from 'react'

interface IUseRefNumber {
  value: RefObject<number>
  setValue: (num: number) => void
  increment: (num?: number) => void
  decrement: (num?: number) => void
}

export function useRefNumber(init: number): IUseRefNumber {
  const value = useRef(init)

  function increment(num: number = 1) {
    value.current += num
  }
  function decrement(num: number = 1) {
    value.current -= num
  }

  function setValue(num: number) {
    value.current = num
  }

  return {
    value,
    increment,
    decrement,
    setValue,
  }
}
