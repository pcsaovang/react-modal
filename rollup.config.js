import { babel } from '@rollup/plugin-babel'
import external from 'rollup-plugin-peer-deps-external'
import resolve from '@rollup/plugin-node-resolve'
import typescript from '@rollup/plugin-typescript'
import { terser } from 'rollup-plugin-terser'
import dts from 'rollup-plugin-dts'
import commonjs from '@rollup/plugin-commonjs'
import peerDepsExternal from 'rollup-plugin-peer-deps-external'
import postcss from 'rollup-plugin-postcss'
import svgr from '@svgr/rollup'
import url from '@rollup/plugin-url'

const packageJson = require('./package.json')

export default [
  {
    input: './src/index.ts',
    output: [
      {
        file: packageJson.main,
        format: 'cjs'
      },
      {
        file: packageJson.module,
        format: 'es',
        exports: 'named'
      }
    ],
    plugins: [
      peerDepsExternal(),
      postcss({
        plugins: [],
        minimize: true
      }),
      babel({ exclude: /node_modules/, presets: ['@babel/preset-react'] }),
      external(),
      resolve(),
      commonjs(),
      typescript({ tsconfig: './tsconfig.json' }),
      terser(),
      url(),
      svgr({ icon: true })
    ],
    external: ['react', 'react-dom', 'prop-types', 'classnames']
  },
  {
    input: 'dist/esm/types/index.d.ts',
    output: [{ file: 'dist/index.d.ts', format: 'esm' }],
    plugins: [dts()]
  }
]
