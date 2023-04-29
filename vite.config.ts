import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react-swc'
import tsconfigPaths from 'vite-tsconfig-paths';

export default defineConfig(({ mode }) => {
    if (mode === 'development') {
      return {
        plugins: [react(), tsconfigPaths()],
      }
    } else {
      return {
        base: '/testDash/',
        plugins: [react(), tsconfigPaths()],      
      }
    }
  }
)