const HtmlWebpackPlugin = require('html-webpack-plugin');
const path = require('path');

module.exports = {
  entry: './src/standalone.tsx',
  output: {
    filename: 'campaign-home.js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/',
  },
  mode: 'development',
  devtool: 'source-map',
  module: {
    rules: [
      {
        test: /\.(js|ts|tsx)$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.ts', '.tsx'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@/components': path.resolve(__dirname, 'src/shared/components'),
      '@/hooks': path.resolve(__dirname, 'src/shared/hooks'),
      '@/types': path.resolve(__dirname, 'src/shared/types'),
      '@/utils': path.resolve(__dirname, 'src/shared/utils'),
      '@/store': path.resolve(__dirname, 'src/shared/store'),
      '@/features': path.resolve(__dirname, 'src/features'),
      '@/app': path.resolve(__dirname, 'src/app'),
    }
  },
  devServer: {
    port: 8500,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './src/index.html',
    }),
  ],
};