import commonjs from '@rollup/plugin-commonjs';
import external from 'rollup-plugin-peer-deps-external';
import resolve from '@rollup/plugin-node-resolve';
import babel from '@rollup/plugin-babel';
import replace from '@rollup/plugin-replace';
import * as path from 'path';
import * as fs from 'fs';
import * as t from '@babel/types';

import pkg from './package.json';

// eslint-disable-next-line @typescript-eslint/no-var-requires
const requireFromString = require('require-from-string');

const OPCodeIdx = requireFromString(
  fs
    .readFileSync(path.join(__dirname, './src/opcodes/opIdx.ts'), 'utf-8')
    .replace('export const ', 'module.exports = ')
);

const minifyObj = {};
Object.keys(OPCodeIdx).forEach((key) => {
  minifyObj[`OPCodeIdx.${key}`] = OPCodeIdx[key];
});

export default {
  input: 'src/index.ts',
  external: ['@dp/owl-wxapp'],
  plugins: [
    replace({
      preventAssignment: true,
      __version__: JSON.stringify(pkg.version.split('-')[0])
    }),
    external(),
    resolve({
      extensions: ['.ts']
    }),
    commonjs(),
    babel({
      babelrc: false,
      configFile: false,
      assumptions: {
        noDocumentAll: true,
        noClassCalls: true,
        enumerableModuleMeta: true,
        constantReexports: true,
        iterableIsArray: true,
        noNewArrows: true,
        objectRestNoSymbols: true,
        privateFieldsAsProperties: true,
        setClassMethods: true,
        setComputedProperties: true,
        setPublicClassFields: true,
        setSpreadProperties: true,
        superIsCallableConstructor: true,
        skipForOfIteratorClosing: true
      },
      presets: [
        [
          '@babel/env',
          {
            targets: {
              browsers: ['safari >= 10', 'android >= 53']
            },
            bugfixes: true
          }
        ],
        '@babel/preset-typescript'
      ],
      plugins: [
        [
          'transform-define',
          {
            'process.env.NODE_ENV': 'production',
            ...minifyObj
          }
        ],
        function () {
          return {
            visitor: {
              CallExpression({ node }) {
                if (t.isMemberExpression(node.callee)) {
                  // evalStack.push()
                  if (
                    t.isIdentifier(node.callee.object) &&
                    node.callee.object.name === 'evalStack'
                  ) {
                    if (t.isIdentifier(node.callee.property)) {
                      if (node.callee.property.name === 'push') {
                        node.callee.property.name = 'p';
                      }
                      if (node.callee.property.name === 'pop') {
                        node.callee.property.name = 'u';
                      }
                      // if (node.callee.property.name === 'top') {
                      //   node.callee.property.name = 't';
                      // }
                      if (node.callee.property.name === 'tail') {
                        node.callee.property.name = 't';
                      }
                    }
                  }
                }
              }
            }
          };
        }
      ],
      extensions: ['.ts']
    })
  ]
};
