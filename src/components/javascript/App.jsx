import React from 'react'
import Gallery from './Gallery'
import '../styles/app.css'

export default function App() {
  return (
    <div className="app">
      <header className="app-header">
        <h1>Galería de Imágenes</h1>
        <p>Una galería simple hecha con React </p>
      </header>

      <main>
        <Gallery/>
      </main>

      <footer className="app-footer">
        <small>si eva no se hubiera comido la manzana</small>
      </footer>
    </div>
  )
}
