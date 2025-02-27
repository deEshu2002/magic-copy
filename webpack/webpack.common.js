const webpack = require("webpack");
const path = require("path");
const CopyPlugin = require("copy-webpack-plugin");
const srcDir = path.join(__dirname, "..", "src");

module.exports = {
  entry: {
    background: path.join(srcDir, "background.ts"),
    content_script: path.join(srcDir, "content_script.ts"),
    sandbox: path.join(srcDir, "sandbox.ts"),
    options: path.join(srcDir, "options.tsx"),
  },
  output: {
    path: path.join(__dirname, "../dist/js"),
    filename: "[name].js",
  },
  optimization: {
    runtimeChunk: false,
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        use: "ts-loader",
        exclude: /node_modules/,
      },
    ],
  },
  resolve: {
    extensions: [".ts", ".tsx", ".js"],
  },
  plugins: [
    new CopyPlugin({
      patterns: [
        {
          from: ".",
          to: "../",
          context: "public",
          filter: (resourcePath) => {
            return (
              !resourcePath.endsWith("public/manifest.chrome.json") &&
              !resourcePath.endsWith("public/manifest.firefox.json")
            );
          },
        },
      ],
      options: {},
    }),
  ],
};
