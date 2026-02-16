import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingoCompilerPlugin } from '@lingo.dev/compiler/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    lingoCompilerPlugin({
      sourceRoot: 'src',
      sourceLocale: 'en',
      targetLocales: ['hi', 'bn', 'ta', 'te'],
      models: 'lingo.dev',
      dev: { usePseudotranslator: true },
    }),
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})

