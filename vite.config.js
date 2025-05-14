import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  server: {
    // This ensures client-side routing works in development mode
    historyApiFallback: true,
    port: 3000, // Use port 3000 instead of the default 5173
    strictPort: true, // Fail if port is already in use
  },
  build: {
    // Generate source maps for better debugging
    sourcemap: true,
    // Ensure consistent output paths
    outDir: 'dist',
    // Ensure assets are properly handled
    assetsDir: 'assets',
    // Ensure the app can handle route changes properly
    rollupOptions: {
      output: {
        manualChunks: {
          'vendor': ['react', 'react-dom', 'react-router-dom'],
          'firebase': ['firebase/app', 'firebase/auth', 'firebase/firestore']
        }
      }
    }
  }
})