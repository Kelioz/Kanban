import { useState } from 'react'

export const useNumber = (init: number = 0) => {
  const [value, setValue] = useState<number>(init)
  const set = (value: number) => {
    setValue(value)
  }
  const increment = (value: number = 1) => {
    setValue((prev) => prev + value)
  }
  const decrement = (value: number = 1) => {
    setValue((prev) => prev - value)
  }
  return {
    value,
    set,
    increment,
    decrement,
  }
}
