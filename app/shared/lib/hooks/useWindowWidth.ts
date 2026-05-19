import { useEffect, useState } from 'react'

export function useWindowWidth(widthMobile: number) {
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    if (window.innerWidth < widthMobile) {
      setIsMobile(true)
    } else {
      setIsMobile(false)
    }
    window.addEventListener('resize', () => {
      if (window.innerWidth < widthMobile) {
        setIsMobile(true)
      } else {
        setIsMobile(false)
      }
    })
  }, [])

  return {
    isMobile,
  }
}
