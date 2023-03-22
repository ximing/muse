import terser from '@rollup/plugin-terser';
import baseConfig from './rollup.config.base';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RollupPluginPreprocess = require('rollup-plugin-preprocess').default;

baseConfig.plugins.unshift(
  RollupPluginPreprocess({
    include: ['**/*.ts'],
    exclude: [],
    context: {
      VM: true,
      CURRENT: 'exp',
      MPE_COMMAND: 'production'
    }
  })
);
baseConfig.plugins.push(
  terser({
    mangle: {
      module: true,
      reserved: ['wx', 'properties'],
      properties: {
        reserved: ['args', 'run']
      }
    }
  })
);

baseConfig.output = [
  // {
  //   file: 'dist/index.esm.js',
  //   format: 'cjs',
  //   exports: 'named',
  //   sourcemap: true
  // },
  {
    file: 'dist/index.esm.js',
    format: 'es',
    exports: 'named',
    sourcemap: true
  }
];

export default baseConfig;
