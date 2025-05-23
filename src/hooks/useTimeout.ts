import { useRef, useEffect } from "react"

export const useTimeout = (callback: () => void, delay: number) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null)

  useEffect(() => {
    // Limpiar el timeout cuando el componente se desmonte
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current)
      }
    }
  }, [])

  const startTimeout = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current)
    }
    timeoutRef.current = setTimeout(callback, delay)
  }

  return { startTimeout }
}
