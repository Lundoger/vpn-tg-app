import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';

// https://vite.dev/config/
// export default defineConfig({
//   base: '/vpn-tg-app/',
//   plugins: [react()],
//   build: {
//     outDir: 'build',
//   },
// })

export default defineConfig({
  base: '/vpn-tg-app/',
  plugins: [react()],
  build: {
    outDir: 'build',
  },
});
