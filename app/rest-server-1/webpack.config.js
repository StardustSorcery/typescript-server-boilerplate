const { glob } = require('glob');
const path = require('node:path');
const nodeExternals = require('webpack-node-externals');
const TsconfigPathsPlugin = require('tsconfig-paths-webpack-plugin');
const TerserPlugin = require('terser-webpack-plugin');

module.exports = async function () {
  const entry = await Promise.all([
    path.resolve(__dirname, '../../src/lib/main/common/di/prefix.ts'),
    glob(path.resolve(__dirname, '../../src/domain/main/**/*.ts')),
    glob(path.resolve(__dirname, '../../src/infra/main/**/*.ts')),
    glob(path.resolve(__dirname, '../../src/usecase/main/**/*.ts')),
    glob(path.resolve(__dirname, './main/*/**/*.ts')),
    path.resolve(__dirname, './main/index.ts'),
  ]).then((results) => results.flat());

  return {
    mode: 'production',
    entry,
    output: {
      path: path.resolve(__dirname, 'build'),
      filename: 'server.js',
    },
    target: 'node16',
    externalsPresets: { node: true },
    externals: [nodeExternals()],
    watchOptions: {
      ignored: /node_modules/,
    },
    module: {
      rules: [
        {
          test: /\.ts$/,
          use: [
            {
              loader: 'ts-loader',
              options: {
                configFile: path.resolve(__dirname, '../../tsconfig.build.json'),
              },
            },
          ],
          exclude: /node_modules/,
        },
      ],
    },
    resolve: {
      extensions: ['.ts', '.js'],
      plugins: [
        new TsconfigPathsPlugin({
          configFile: path.resolve(__dirname, '../../tsconfig.build.json'),
        }),
      ],
    },
    optimization: {
      minimize: true,
      minimizer: [
        new TerserPlugin({
          terserOptions: {
            keep_classnames: true,
            keep_fnames: true,
          },
        }),
      ],
    },
  };
};
