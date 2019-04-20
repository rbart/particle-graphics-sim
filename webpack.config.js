module.exports = {
  resolve: {
    extensions: ['.ts', '.tsx', '.js', '.jsx']
  },
  devtool: 'source-map',
  entry: __dirname+'/app/script.ts',
  output: {
    path: __dirname+'/app',
    filename: 'app.bundle.js'
  },
  module: {
    rules: [
      {
        test: /\.tsx?$/,
        loader: 'awesome-typescript-loader'
      }
    ]
  }
};
