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
            filename: "../index.html",
            template: "src/frontend/index.html"
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
                test: /\.(ttf|webp|png)$/,
                type: "asset/resource",
                generator: {
                    filename: (pathData) => {
                        const pathSegments = pathData.filename.split("/");

                        const assetsSegmentLocation = pathSegments.findIndex(
                            segment => segment === "assets"
                        );

                        if (assetsSegmentLocation > -1) {
                            const newFilename = pathSegments.slice(
                                assetsSegmentLocation + 1
                            ).join("/");
                            return newFilename;
                        }

                        throw new Error(
                            "not a valid asset because \"assets\" segment could not be found"
                        );
                    },
                    publicPath: "public/"
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
