const { override, addWebpackResolve, addWebpackPlugin, disableEsLint } = require('customize-cra');
const webpack = require('webpack');
const path = require('path');

module.exports = override(
  disableEsLint(),
  addWebpackPlugin(
    new webpack.ProvidePlugin({
      process: 'process/browser',
      Buffer: ['buffer', 'Buffer'],
    })
  ),
  addWebpackResolve({
    alias: {
      '@ethersproject/hash': path.resolve(__dirname, 'node_modules/@ethersproject/hash/lib/index.js'),
    },
    fallback: {
      assert: require.resolve('assert'),
      crypto: require.resolve('crypto-browserify'),
      stream: require.resolve('stream-browserify'),
      https: require.resolve('https-browserify'),
      http: require.resolve('stream-http'),
      os: require.resolve('os-browserify/browser'),
      url: require.resolve('url'),
      path: require.resolve('path-browserify'),
      buffer: require.resolve('buffer'),
      zlib: require.resolve('browserify-zlib'),
    },
  })
);
