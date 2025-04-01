import { resolve } from 'path'

import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

/*import { dependencies, devDependencies } from './package.json' assert { type: 'json' }*/
import packageJson from './package.json' assert { type: 'json' }

const { dependencies, devDependencies } = packageJson

// https://vitejs.dev/config/
export default defineConfig({
  build: {
    lib: {
      entry: resolve(__dirname, 'src/index.ts'),
      fileName: 'my-lib',
      formats: ['es'],
      name: 'Lib-Inctagram',
      // the proper extensions will be added
    },
    rollupOptions: {
      // make sure to externalize deps that shouldn't be bundled
      // into your library
      external: [
        'react/jsx-runtime',
        ...Object.keys(dependencies),
        ...Object.keys(devDependencies),
      ],
    },
    sourcemap: true,
    target: 'esnext',
  },
  plugins: [react()],
})
