import react from '@vitejs/plugin-react';
import { defineConfig } from 'vite';
import { VitePWA } from 'vite-plugin-pwa';
import tsconfigPaths from 'vite-tsconfig-paths';

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          react: ['react'],
          rDom: ['react-dom'],
          fm: ['framer-motion'],
        },
      },
    },
  },
  plugins: [
    react(),
    tsconfigPaths(),
    VitePWA({
      strategies: 'injectManifest',
      srcDir: 'src',
      filename: 'sw.ts',
      registerType: 'autoUpdate',
      injectRegister: false,
      workbox: {
        globPatterns: ['**/*.{js,css,html,ico,png,svg,jpg,jpeg,gif}'],
        runtimeCaching: [
          {
            urlPattern: /\.(png|jpg|jpeg|gif|svg)$/,
            handler: 'StaleWhileRevalidate',
            options: {
              cacheName: 'image-cache',
              expiration: {
                maxEntries: 100,
                maxAgeSeconds: 30 * 24 * 60 * 60, // 30 days
              },
              cacheableResponse: {
                statuses: [0, 200],
              },
            },
          },
        ],
      },

      pwaAssets: {
        disabled: true,
        config: true,
        overrideManifestIcons: false,
      },

      manifest: {
        name: 'sunoh',
        short_name: 'Sunoh',
        description: 'Sunoh dil ki dhun',
        theme_color: '#0a0a0a',
        background_color: '#0a0a0a',
        start_url: '/',
        icons: [
          {
            purpose: 'maskable',
            sizes: '1024x1024',
            src: 'maskable_icon.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '72x72',
            src: 'maskable_icon_x72.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '96x96',
            src: 'maskable_icon_x96.png',
            type: 'image/png',
          },
          {
            purpose: 'any',
            sizes: '144x144',
            src: 'maskable_icon_x144.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '192x192',
            src: 'maskable_icon_x192.png',
            type: 'image/png',
          },
          {
            purpose: 'maskable',
            sizes: '512x512',
            src: 'maskable_icon_x512.png',
            type: 'image/png',
          },
        ],
      },

      injectManifest: {
        globPatterns: ['**/*.{js,css,html,svg,png,ico}'],
      },

      devOptions: {
        enabled: false,
        navigateFallback: 'index.html',
        suppressWarnings: true,
        type: 'module',
      },
    }),
  ],
});
