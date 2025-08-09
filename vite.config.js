import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
});
// use this for using backend as server.js (production)
// export default defineConfig({
//   server: {
//     proxy: {
//       '/api': 'http://localhost:3000',
//     },
//   },
// });
