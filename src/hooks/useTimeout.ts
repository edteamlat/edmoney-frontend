import { useRef, useEffect } from "react"

export const useTimeout = () => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Limpiar el timeout cuando el componente se desmonte
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  return { timeoutRef }
}
