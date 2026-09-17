'use client'

import { useEffect } from 'react'

// Guiño de pestaña: al salir/volver a la pestaña, el título saluda con el kiwi.
export default function TabWink() {
  useEffect(() => {
    const original = document.title
    let timer: ReturnType<typeof setTimeout> | undefined
    const onVisibility = () => {
      if (document.hidden) {
        document.title = '🥝 ¡Vuelve pronto!'
      } else {
        document.title = '🥝 ¡Hola de nuevo!'
        timer = setTimeout(() => { document.title = original }, 2000)
      }
    }
    document.addEventListener('visibilitychange', onVisibility)
    return () => {
      document.removeEventListener('visibilitychange', onVisibility)
      if (timer) clearTimeout(timer)
      document.title = original
    }
  }, [])
  return null
}
