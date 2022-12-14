const HtmlWebpackPlugin = require("html-webpack-plugin");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const path = require("path");

module.exports = {
  context: __dirname,
  entry: "./index.jsx",
  mode: "production",
  module: {
    rules: [
      {
        test: /\.png?$/,
        loader: "file-loader",
        options: {
          outputPath: "assets",
        },
      },
      {
        test: /\.css$/i,
        use: [
          MiniCssExtractPlugin.loader,
          "css-loader"
        ]
      },
      {
        test: /\.(js|jsx)?$/,
        exclude: /node_modules/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-react", "@babel/preset-env"]
          }
        }
      }
    ],
  },
  plugins: [
    new HtmlWebpackPlugin({
      title: "Blackguard",
      template: "./index.ejs",
      publicPath: "/",
    }),
    new MiniCssExtractPlugin()
  ],
  devtool: "source-map",
  resolve: {
    extensions: [".jsx", ".js"],
  },
  output: {
    filename: "[name].js",
    path: path.resolve(__dirname, "../../build/frontend"),
    clean: true,
  },
  optimization: {
    moduleIds: "deterministic",
    runtimeChunk: "single",
    splitChunks: {
      cacheGroups: {
        vendor: {
          test: /[\\/]node_modules[\\/]/,
          name: "vendors",
          chunks: "all",
        },
      },
    },
  },
};
