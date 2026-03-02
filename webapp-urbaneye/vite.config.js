import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingoCompilerPlugin } from '@lingo.dev/compiler/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'
const isProduction = process.env.NODE_ENV === 'production'

if (isVercel) {
  process.env.LINGO_BUILD_MODE = 'cache-only'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    lingoCompilerPlugin({
      sourceRoot: 'src',
      sourceLocale: 'en',
      targetLocales: ['hi', 'mr'],
      models: 'lingo.dev',
      buildMode: isProduction || isVercel ? 'cache-only' : 'translate',
      dev: { usePseudotranslator: false },
    }),
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})
