import { defineConfig } from 'tsup';

export default defineConfig((config) => ({
  entry: ['src/**/*.ts'],
  splitting: true,
  sourcemap: true,
  dts: true,
  clean: true,
  minify: config.watch ? false : 'terser',
  keepNames: true,
  bundle: true,
  tsconfig: 'tsconfig.json',
  target: 'node22',
  format: ['esm', 'cjs'],
  outDir: 'dist',
}));
