# Galería React (Vite)

Pequeña galería de imágenes hecha con React y Vite. Ideal como punto de partida.

Requisitos:
- Node.js 16+ y npm

Instalación (PowerShell en Windows):

```powershell
cd "C:\Users\USUARIO\Documents\galeria con react"
npm install
npm run dev
```

La app quedará disponible típicamente en http://localhost:5173

Estructura principal:
- `index.html` - entrada
- `src/main.jsx` - punto de arranque
- `src/App.jsx` - componente raíz
- `src/Gallery.jsx` - galería y lightbox
- `src/index.css` - estilos

Personalización:
- Cambia las URLs en `IMAGES` dentro de `src/Gallery.jsx` por tus imágenes.
- Puedes añadir carga de imágenes, filtros y paginación.
