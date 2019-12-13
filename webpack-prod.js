const path = require("path");
const common = require("./webpack-common.js");
const merge = require("webpack-merge");
const {CleanWebpackPlugin} = require('clean-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const TerserWebpackPlugin = require('terser-webpack-plugin');
const MiniCSSExtractPlugin = require('mini-css-extract-plugin');
const OptimizeCSSAssetsPlugin = require('optimize-css-assets-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: "[name]-[contentHash].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: 'production',
  plugins: [
    new CleanWebpackPlugin(),
    new MiniCSSExtractPlugin({
      filename: "[name]-[contentHash].css"
    })
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
      }),
      new OptimizeCSSAssetsPlugin(),
    ]
  },
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          MiniCSSExtractPlugin.loader,
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
});