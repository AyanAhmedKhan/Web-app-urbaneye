import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingoCompilerPlugin } from '@lingo.dev/compiler/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => ({
  plugins: [
    // Only use lingo in development to avoid translation issues in production
    ...(mode === 'development' ? [lingoCompilerPlugin({
      sourceRoot: 'src',
      sourceLocale: 'en',
      targetLocales: ['hi'],
      models: 'lingo.dev',
      dev: { usePseudotranslator: false },
    })] : []),
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
}))
