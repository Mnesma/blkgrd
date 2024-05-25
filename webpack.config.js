const path = require("path");
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

const config = {
    entry: "./src/frontend/index.ts",
    output: {
        path: path.resolve(__dirname, "build/frontend/public"),
        filename: "[name].js",
        publicPath: "public/"
    },
    plugins: [
        new MiniCssExtractPlugin({
            filename: "[name].css"
        }),
        new HtmlWebpackPlugin({
            title: "Blackguard",
            favicon: "src/frontend/assets/favicon.ico",
            scriptLoading: "module",
            filename: "../index.html"
        })
    ],
    module: {
        rules: [
            {
                test: /\.(ts)$/i,
                use: [
                    {
                        loader: "ts-loader",
                        options: {
                            configFile: "src/frontend/tsconfig.json"
                        }
                    }
                ],
                exclude: ["/node_modules/"]
            },
            {
                test: /\.css$/i,
                use: [MiniCssExtractPlugin.loader, "css-loader"]
            },
            {
                test: /\.(webp|png|ttf)$/i,
                loader: "file-loader",
                options: {
                    name: "assets/[folder]/[name].[ext]",
                    publicPath: "public"
                }
            }
        ]
    },
    resolve: {
        extensions: [".ts", ".js"]
    }
};

module.exports = () => {
    if (process.env.NODE_ENV === "production") {
        config.mode = "production";
    } else {
        config.mode = "development";
        config.devtool = "source-map";
    }
    return config;
};
