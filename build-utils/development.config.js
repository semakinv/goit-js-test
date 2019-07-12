const HtmlWebpackPlugin = require("html-webpack-plugin");
const path = require("path");
module.exports = env => ({
  devtool: "cheap-eval-source-map",
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader", "postcss-loader"]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: "./index.html",
      inject: true
    })
  ],
  devServer: {
    contentBase: path.join(__dirname, "dist"),
    historyApiFallback: true,
    compress: true,
    clientLogLevel: "warning",
    stats: "errors-warnings",
    port: 9000,
    quiet: true,
    open: true
  }
});
