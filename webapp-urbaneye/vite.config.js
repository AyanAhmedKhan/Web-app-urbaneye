import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { lingoCompilerPlugin } from '@lingo.dev/compiler/vite'
import tailwindcss from 'tailwindcss'
import autoprefixer from 'autoprefixer'

const isVercel = process.env.VERCEL === '1' || process.env.VERCEL === 'true'
const enableLingoPlugin = process.env.LINGO_ENABLE === 'true' || !isVercel

if (isVercel && enableLingoPlugin) {
  process.env.LINGO_BUILD_MODE = 'cache-only'
}

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    ...(enableLingoPlugin
      ? [
        lingoCompilerPlugin({
          sourceRoot: 'src',
          sourceLocale: 'en',
          targetLocales: ['hi'],
          models: 'lingo.dev',
          buildMode: isVercel ? 'cache-only' : 'translate',
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
