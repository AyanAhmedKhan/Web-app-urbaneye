import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingoCompilerPlugin } from '@lingo.dev/compiler/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const enableLingoPlugin = process.env.LINGO_ENABLE !== 'false'
const isProduction = process.env.NODE_ENV === 'production'

export default defineConfig({
  plugins: [
    ...(enableLingoPlugin
      ? [
          lingoCompilerPlugin({
            sourceRoot: 'src',
            sourceLocale: 'en',
            targetLocales: ['hi', 'mr'],
            models: 'lingo.dev',
            buildMode: isProduction ? 'cache-only' : 'translate',
            dev: { usePseudotranslator: false },
          }),
        ]
      : []),
    react(),
  ],
  css: {
    postcss: {
      plugins: [tailwindcss, autoprefixer],
    },
  },
})