const path = require("path");
const common = require("./webpack-common.js");
const merge = require("webpack-merge");
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = merge(common, {
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "dist")
  },
  mode: 'development',
  plugins: [
    new HtmlWebpackPlugin({
      template: "./src/main-template.html"
    })
  ],
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          "less-loader"
        ]
      }
    ]
  },
});