import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// Dev server: localhost:5173 (React), Flask on localhost:5001 (backend).
// A catch-all proxy forwards everything that is NOT a Vite-internal path to
// Flask so the archived replay iframes (/view/...) and their root-relative
// asset requests (e.g. /corp-static/..., /_next/...) work unchanged in dev.
//
// Production build: output goes to ../static/react with base '/static/react/'
// so Flask's static handler serves it without any backend changes.
export default defineConfig(({ command }) => ({
  base: command === 'build' ? '/static/react/' : '/',
  plugins: [react()],
  build: {
    outDir: '../static/react',
    emptyOutDir: true,
  },
  server: {
    port: 5173,
    proxy: {
      '/': {
        target: 'http://localhost:5001',
        changeOrigin: true,
        bypass(req) {
          const url = req.url || ''
          // Vite-internal requests are handled by the dev server itself.
          // (Returning a string = "handle locally"; returning undefined proxies.)
          if (
            url === '/' ||
            url.startsWith('/src/') ||
            url.startsWith('/@vite/') ||
            url.startsWith('/@fs/') ||
            url.startsWith('/@id/') ||
            url.startsWith('/@react-refresh') ||
            url.startsWith('/node_modules/')
          ) {
            return url
          }
          // Everything else (API, view replay, archived assets) proxies to Flask.
          return undefined
        },
      },
    },
  },
}))
