import React, { useState, useEffect, useCallback, useRef } from 'react'
import '../styles/gallery.css'

// Lista ampliada de imágenes (Unsplash). Cada objeto tiene thumbSrc (miniatura) y fullSrc (vista grande).
const PLACEHOLDER = 'https://via.placeholder.com/1600x900?text=Imagen+no+disponible'
const IMAGES = [
  { id: 1, title: 'Montañas al amanecer', description: 'Niebla suave en el valle y tonos cálidos.', thumbSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop' },
  { id: 2, title: 'Playa tropical', description: 'Palmeras y agua turquesa.', thumbSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop' },
  { id: 3, title: 'Bosque en la mañana', description: 'Luz entre ramas y atmósfera mística.', thumbSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=60&auto=format&fit=crop&ixlib=rb-4.0.3', fullSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop&ixlib=rb-4.0.3' },
  { id: 4, title: 'Ciudad nocturna', description: 'Luces y reflejos en la noche urbana.', thumbSrc: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1499346030926-9a72daac6c63?w=1600&q=80&auto=format&fit=crop' },
  { id: 5, title: 'Dunas del desierto', description: 'Ondas de arena bajo el sol.', thumbSrc: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=1600&q=80&auto=format&fit=crop' },
  { id: 6, title: 'Lago al atardecer', description: 'Reflejos y calma en el agua.', thumbSrc: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1470770903676-69b98201ea1c?w=1600&q=80&auto=format&fit=crop' },
  { id: 7, title: 'Cascada', description: 'Cascada impresionante entre rocas.', thumbSrc: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1502082553048-f009c37129b9?w=1600&q=80&auto=format&fit=crop' },
  { id: 8, title: 'Campo de flores', description: 'Colores vivos en la pradera.', thumbSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=1600&q=80&auto=format&fit=crop' },
  { id: 9, title: 'Aurora boreal', description: 'Cielos verdes sobre montañas nevadas.', thumbSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop' },
  { id: 10, title: 'imagen en blanco', description: 'Líneas y geometría urbana.', thumbSrc: 'https://images.unsplash.com/photo-1449417968484-1cb2f99b2d3a?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1449417968484-1cb2f99b2d3a?w=1600&q=80&auto=format&fit=crop' },
  { id: 11, title: 'Camino otoñal', description: 'Hojas doradas en sendero entre árboles.', thumbSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=1600&q=80&auto=format&fit=crop&sat=20' },
  { id: 12, title: 'Mirador costero', description: 'Acantilados y mar al fondo.', thumbSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=600&q=60&auto=format&fit=crop', fullSrc: 'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80&auto=format&fit=crop' }
]

export default function Gallery() {
  const [selected, setSelected] = useState(null)
  const [isZoomed, setIsZoomed] = useState(false)
  const [loadingState, setLoadingState] = useState({})

  // Inicializar estado de carga (true para mostrar loader si hace falta)
  useEffect(() => {
    const init = {}
    IMAGES.forEach(img => { init[img.id] = true })
    setLoadingState(init)
  }, [])

  const handleImageLoad = (id) => setLoadingState(prev => ({ ...prev, [id]: false }))
  const handleImageError = (id) => setLoadingState(prev => ({ ...prev, [id]: false }))

  const navigate = useCallback((direction) => {
    if (!selected) return
    const idx = IMAGES.findIndex(i => i.id === selected.id)
    const newIdx = direction === 'next'
      ? (idx + 1) % IMAGES.length
      : (idx - 1 + IMAGES.length) % IMAGES.length
    setSelected(IMAGES[newIdx])
    setIsZoomed(false)
  }, [selected])

  // ref a la imagen del lightbox para ajustar transform-origin al hacer click
  const lightboxImgRef = useRef(null)

  // Cuando la imagen seleccionada cambie, asegurar que el transform-origin se reinicia
  useEffect(() => {
    if (lightboxImgRef.current) {
      lightboxImgRef.current.style.transformOrigin = '50% 50%'
    }
    setIsZoomed(false)
  }, [selected])

  // teclado
  useEffect(() => {
    function onKey(e) {
      if (!selected) return
      if (e.key === 'Escape') setSelected(null)
      if (e.key === 'ArrowRight') navigate('next')
      if (e.key === 'ArrowLeft') navigate('prev')
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [selected, navigate])

  return (
    <section className="gallery" aria-label="Galería de imágenes">
      <div className="grid">
        {IMAGES.map(img => (
          <button
            key={img.id}
            className="thumb"
            onClick={() => { setSelected(img); setIsZoomed(false) }}
            aria-label={`Abrir imagen: ${img.title}`}
          >
            <div className="thumb-media">
              {loadingState[img.id] && <div className="thumb-placeholder" aria-hidden="true" />}
              <img
                src={img.thumbSrc}
                alt={img.title}
                loading="lazy"
                onLoad={() => handleImageLoad(img.id)}
                onError={(e) => { handleImageError(img.id); e.currentTarget.src = PLACEHOLDER }}
              />
            </div>
            <div className="caption">{img.title}</div>
          </button>
        ))}
      </div>

      {selected && (
        <div className="lightbox" role="dialog" aria-modal="true" aria-label={`Vista de ${selected.title}`}>
          <div className="backdrop" onClick={() => (isZoomed ? setIsZoomed(false) : setSelected(null))} />
          <div className="lightbox-content" role="document">
            <button className="close" onClick={() => setSelected(null)} aria-label="Cerrar galería">×</button>
            <img
              ref={lightboxImgRef}
              src={selected.fullSrc}
              alt={selected.title}
              className={`lightbox-image ${isZoomed ? 'zoomed' : ''}`}
              onClick={(e) => {
                // centrar el zoom en el punto clicado
                const imgEl = lightboxImgRef.current
                if (!imgEl) return
                const rect = imgEl.getBoundingClientRect()
                const clickX = e.clientX - rect.left
                const clickY = e.clientY - rect.top
                const xPct = Math.max(0, Math.min(100, (clickX / rect.width) * 100))
                const yPct = Math.max(0, Math.min(100, (clickY / rect.height) * 100))
                if (!isZoomed) {
                  imgEl.style.transformOrigin = `${xPct}% ${yPct}%`
                  setIsZoomed(true)
                } else {
                  imgEl.style.transformOrigin = '50% 50%'
                  setIsZoomed(false)
                }
              }}
              onError={(e) => { e.currentTarget.src = PLACEHOLDER; setIsZoomed(false) }}
            />

            <div className="lightbox-info">
              <h3>{selected.title}</h3>
              <p>{selected.description}</p>
              <div className="image-counter">{IMAGES.findIndex(i => i.id === selected.id) + 1} / {IMAGES.length}</div>
              <div className="lightbox-controls">
                <button onClick={() => navigate('prev')} aria-label="Imagen anterior">←</button>
                <button onClick={() => setIsZoomed(prev => !prev)} aria-label={isZoomed ? 'Alejar' : 'Acercar'}>{isZoomed ? '−' : '+'}</button>
                <button onClick={() => navigate('next')} aria-label="Siguiente imagen">→</button>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  )
}
