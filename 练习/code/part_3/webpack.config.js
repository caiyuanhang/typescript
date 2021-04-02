const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');

module.exports = {
    entry: "./src/index.ts",

    output: {
        path: path.resolve(__dirname, "dist"),
        filename: "home.js",
        environment: {
            arrowFunction: false
        }
    },

    module: {
        rules: [
            {
                test: /\.ts$/,
                use: [/* {
                    loader: "babel-loader",
                    options: {
                        presets: [[
                            "@babel/preset-env",
                            {
                                targets: {
                                    "chrome": "58",
                                    "ie": "11"
                                },
                                "corejs": "3",
                                "useBuiltIns": "usage"
                            }
                        ]]
                    }
                },  */"ts-loader"],
                exclude: /node_modules/
            }
        ]
    },

    plugins: [
        // new CleanWebpackPlugin(),
        new HtmlWebpackPlugin({
            template: "./public/index.html",
            filename: "home.html"
        })
    ],

    resolve: {
        extensions: [".ts",".js"]
    }
}