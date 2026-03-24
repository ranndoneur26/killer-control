import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import tailwindcss from '@tailwindcss/vite'

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react()
  ],
  build: {
    // Es vital establecer el target a un estándar moderno (ES2022 o ESNEXT)
    // para evitar que el minificador rompa los Tagged Template Literals.
    target: 'esnext'
  },
  esbuild: {
    // También lo forzamos en el transformador de esbuild
    target: 'esnext'
  },
  optimizeDeps: {
    // Forzamos la pre-optimización de estas librerías críticas
    include: ['framer-motion', 'recharts', 'lucide-react', 'react-router-dom']
  }
})
