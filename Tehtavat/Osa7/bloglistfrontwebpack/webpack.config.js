const path = require('path')
const webpack = require('webpack')

const config = (env, argv) => {
    const backend_url = 'http://localhost:3001/'
    return {
        entry: './src/index.js',
        output: {
            path: path.resolve(__dirname, 'dist'),
            filename: 'main.js'
        },
        devServer: {
            contentBase: path.resolve(__dirname, "dist"),
            compress: true,
            port: 3000
        },
        devtool: 'source-map',
        module: {
            rules: [
                {
                    test: /\.js$/,
                    loader: 'babel-loader',
                    query: {
                        presets: ['env', 'react'],
                        plugins: [
                            new webpack.DefinePlugin({
                                BACKEND_URL: JSON.stringify(backend_url)
                            })
                        ]
                    }
                }
            ]
        }
    }
}

module.exports = config