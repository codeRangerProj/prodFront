import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import svgr from 'vite-plugin-svgr';

export default defineConfig(({ mode }) => ({
  plugins: [svgr({ exportAsDefault: true }), react()],
  resolve: {
    alias: [{ find: '@', replacement: '/src' }],
  },
  define: {
    __IS_DEV__: JSON.stringify(mode !== 'production'),
    __API__: JSON.stringify(
      mode === 'production'
        ? 'https://prod-proj-qa6f.onrender.com'
        : 'http://localhost:8000',
    ),
    __PROJECT__: JSON.stringify('frontend'),
  },
}));
