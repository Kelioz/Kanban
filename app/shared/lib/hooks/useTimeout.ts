// import { useEffect } from 'react'

// interface IUseTimeout {
//   clearTimeoutId: () => void
// }

// export default function useTimeout(
//   handler: () => void,
//   timeout: number
// ): IUseTimeout {
//   let timeoutId: NodeJS.Timeout

//   function setTimeoutId(): void {
//     timeoutId = setTimeout(() => {
//       handler()
//     }, timeout)
//   }

//   function clearTimeoutId(): void {
//     clearTimeout(timeoutId)
//   }
//   useEffect(() => {
//     setTimeoutId()
//   }, [])

//   return {
//     clearTimeoutId,
//   }
// }
