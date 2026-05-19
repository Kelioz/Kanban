import { useRef } from 'react'

export function useRefValue<Type>(init: Type) {
  const value = useRef<Type>(init)

  function setValue(newValue: Type) {
    value.current = newValue
  }

  return {
    value,
    setValue,
  }
}
