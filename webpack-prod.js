const path = require("path");
const common = require("./webpack-common.js");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: "[name]-[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
  ],
  optimization: {
    minimizer: [
      new TerserWebpackPlugin(),
      new HtmlWebpackPlugin({
        template: "./src/main-template.html",
        minify: {
          removeAttributeQuotes: true,
          collapseWhitespace: true,
          removeComments: true
        }
      })
    ]
  }
});