const CopyPlugin = require("copy-webpack-plugin");

module.exports = {
  /**
   * This is the main entry point for your application, it's the first file
   * that runs in the main process.
   */
  //target: 'node',
  entry: {
    main: './src/main.js',
  },

  plugins: [
    new CopyPlugin({
      patterns: [
        { from: 'src/assets', to: './' },
      ],
    }),
  ],
  // Put your normal webpack config below here
  module: {
    rules: require('./webpack.rules'),
  },
}
