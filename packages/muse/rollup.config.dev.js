import baseConfig from './rollup.config.base';
// eslint-disable-next-line @typescript-eslint/no-var-requires
const RollupPluginPreprocess = require('rollup-plugin-preprocess').default;

baseConfig.plugins.unshift(
  RollupPluginPreprocess({
    include: ['**/*.ts', /\/px-exp\/.+/],
    exclude: [],
    context: {
      VM: true,
      CURRENT: 'exp',
      MPE_COMMAND: 'dev'
    }
  })
);

baseConfig.output = [
  {
    file: 'dist/index.dev.js',
    format: 'cjs',
    exports: 'named',
    sourcemap: true
  },
  {
    file: 'dist/index.dev.mjs',
    format: 'es',
    exports: 'named',
    sourcemap: true
  }
];

export default baseConfig;
