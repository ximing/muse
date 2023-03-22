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
      MPE_COMMAND: 'dev',
      COMPILER: 'true'
    }
  })
);

baseConfig.output = [
  {
    file: 'dist/index.cjs.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: true
  }
  // {
  //   file: 'dist/index.cjs.mjs',
  //   format: 'es',
  //   exports: 'named',
  //   sourcemap: true
  // }
];

export default baseConfig;
