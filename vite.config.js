import { defineConfig } from 'vite';
import { resolve } from 'path';

export default defineConfig({
  build: {
    rollupOptions: {
      input: {
        main: resolve(__dirname, 'index.html'),
        certificates: resolve(__dirname, 'certificates.html'),
        adminDashboard: resolve(__dirname, 'admin/dashboard.html'),
        adminLogin: resolve(__dirname, 'admin/login.html')
      }
    }
  }
});
