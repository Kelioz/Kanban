import { useRef } from 'react'

export function useRefString(init: string) {
  const value = useRef<string>(init)

  function setValue(newValue: string) {
    value.current = newValue
  }

  return {
    value,
    setValue,
  }
}
