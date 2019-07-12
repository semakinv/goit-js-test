const path = require("path");
const FriendlyErrorsWebpackPlugin = require("friendly-errors-webpack-plugin");
const webackMerge = require("webpack-merge");
const WebpackBar = require("webpackbar");
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
// const loadModeConfig = env => require("./build-utils/${env.mode}.config")(env);
const loadModeConfig = env => require(`./build-utils/${env.mode}.config`)(env);

module.exports = env =>
  webackMerge(
    {
      context: path.resolve(__dirname, "src"),
      mode: env.mode,
      entry: {
        index: "./index.js"
      },

      output: {
        path: path.resolve(__dirname, "dist"),
        filename: "[name].bundle.js"
      },
      module: {
        rules: [
          {
            test: /\.(png|jpe?g|gif|svg)$/i,
            use: [
              {
                loader: "url-loader",
                options: {
                  name: "[path]/[name].[ext]",
                  limit: 5000
                }
              }
            ]
          },
          { test: /\.js$/, exclude: /node_modules/, use: ["babel-loader"] },
          { test: /\.hbs$/, loader: "handlebars-loader" },
          {
            test: /\.html$/,
            use: "html-loader"
          }
        ]
      },
      plugins: [
        new CleanWebpackPlugin(),
        new FriendlyErrorsWebpackPlugin(),
        new WebpackBar()
      ]
    },
    loadModeConfig(env)
  );
