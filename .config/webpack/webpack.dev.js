var path = require('path')
var nodeExternals = require('webpack-node-externals');

module.exports = {
    mode: 'development',
    devtool: 'inline-source-map',
    externalsPresets: { node: true }, // in order to ignore built-in modules like path, fs, etc.
    externals: [nodeExternals()],
    entry: './src/index.ts',
    output: {
        path: path.join(process.cwd(), 'dist'),
        filename: 'index.js'
    },
    optimization: { minimize: false },
    stats: { errorDetails: true },
    resolve: {
        // Add `.ts` and `.tsx` as a resolvable extension.
        extensions: ['.ts', '.js']
    },
    module: {
        rules: [
            // all files with a `.ts` or `.tsx` extension will be handled by `ts-loader`
            {
                test: /\.ts$/,
                loader: 'ts-loader'
            }
        ]
    }
}