require("dotenv").config();

// dependencies
const path = require("path");
const webpack = require("webpack");
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// src and build dirs
const SRC_DIR = path.resolve(__dirname, "resources/React");
const BUILD_DIR = path.resolve(__dirname, "web");
const OUTPUT_DIR = "assets/dist/";

const DEV = process.env.NODE_ENV !== "production";

let config = {
    entry: {
        app: [
            "babel-polyfill",
            SRC_DIR + "/react-app.jsx"
        ]
    },
    output: {
        path: BUILD_DIR,
        filename: OUTPUT_DIR + "[name].js",
        publicPath: "/",
        chunkFilename: OUTPUT_DIR + "[name].[chunkhash].bundle.js"
    },
    resolve: {
        extensions: [".jsx", ".scss", ".js", ".json", ".css"],
        modules: [
            "node_modules",
            path.resolve(__dirname, "./node_modules"),
            path.resolve(__dirname, "./src")
        ]
    },
    devtool: DEV ? "source-map" : false,
    plugins: [
        new webpack.NoEmitOnErrorsPlugin(),
        new webpack.DefinePlugin({
            PRODUCTION_MODE: JSON.stringify(!DEV),
            DEVELOPMENT_MODE: JSON.stringify(DEV),
            "process.env.DEBUG": JSON.stringify(DEV),
            "process.env.NODE_ENV": JSON.stringify(
                process.env.NODE_ENV || "development"
            ),
            "process.env.WEBPACK_MODE": JSON.stringify(true)
        })
    ],
    module: {
        rules: [
            {
                test: /\.jsx?$/,
                exclude: /(node_modules)/,
                include: /(resources)/,
                use: [
                    {
                        loader: "babel-loader"
                    }
                ]
            },
            {
                test: /\.css$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader!css-loader",
                    use: "css-loader"
                })
            },
            {
                test: /\.scss$/,
                use: ExtractTextPlugin.extract({
                    fallback: "style-loader!css-loader!sass-loader",
                    use: "css-loader!sass-loader"
                })
            }
        ]
    }
};

if (!DEV) {
    // production only plugins

    // optimize js output
    config.plugins.push(
        new webpack.optimize.UglifyJsPlugin({
            sourceMap: true,
            minimize: true,
            comments: false,
            compress: {
                warnings: false,
                drop_console: true
            }
        })
    );
} else {
    // development only plugins
}

module.exports = config;
