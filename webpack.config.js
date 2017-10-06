require("dotenv").config();

const path = require("path");
const webpack = require("webpack");
const WebpackCleanupPlugin = require("webpack-cleanup-plugin");
const BundleAnalyzerPlugin = require("webpack-bundle-analyzer")
    .BundleAnalyzerPlugin;
const ExtractTextPlugin = require("extract-text-webpack-plugin");

// src and build dirs
const SRC_DIR = path.resolve(__dirname, "resources/React");
const BUILD_DIR = path.resolve(__dirname, "web/assets/dist/");
const PUBLIC_PATH = "/assets/dist/";

const DEV = process.env.NODE_ENV !== "production";

let config = {
    entry: {
        app: ["babel-polyfill", SRC_DIR + "/react-app.jsx"]
    },
    output: {
        path: BUILD_DIR,
        filename: "[name].js",
        publicPath: PUBLIC_PATH,
        chunkFilename: "[name].[chunkhash].bundle.js"
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
        }),
        // split common files
        new webpack.optimize.CommonsChunkPlugin({
            name: "common",
            // automatically check if a file came from a node_module and add it to the common chunk
            minChunks: ({ resource }) => /node_modules/.test(resource)
        }),
        // webpack analyzer
        new BundleAnalyzerPlugin({
            // don't open the file automatically
            openAnalyzer: false,
            // default type to open (`stat`, `parsed` or `gzip`)
            defaultSizes: "gzip",
            // create a server for the watcher or a static file for production enviroments
            analyzerMode: "static",
            // output outside of the public folder
            reportFilename: path.resolve(__dirname, "./webpack.report.html"),
            /**
             * stats file for analyzer - use with:
             * @see https://alexkuz.github.io/stellar-webpack/
             * @see https://alexkuz.github.io/webpack-chart/
             */
            generateStatsFile: true,
            statsFilename: path.resolve(__dirname, "./webpack.stats.json")
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
    // cleanup old build files from BUILD
    config.plugins.push(
        new WebpackCleanupPlugin({
            // disable output
            quiet: true,
            // enable to preview which files will be deleted
            preview: false
        })
    );
} else {
    // development only plugins
}

module.exports = config;
