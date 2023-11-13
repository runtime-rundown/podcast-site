import { defineConfig } from 'vitest/config';
import react from '@vitejs/plugin-react';

export default defineConfig({
  plugins: [react()],
  test: {
    // vitest default behavior is watch mode, set false to behave like normal
    watch: false,
    environment: 'jsdom',
  },
});
