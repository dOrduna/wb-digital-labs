
module.exports = {
  entry: {
    main: "./src/main.js"
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.html$/,
        use: ["html-loader"]
      },
      {
        test: /\.jpeg$/,
        use: {
          loader: "file-loader",
          options: {
            name: "[name]-[hash].[ext]",
            outputPath: "img",
            esModule: false
          }
        }
      }
    ]
  }
};