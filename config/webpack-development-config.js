const webpack = require('webpack')
const path = require('path')

const root = path.join(__dirname, '..')

module.exports = {

  entry: {
    app: [
      'babel-polyfill',
      'webpack-hot-middleware/client',
      './client',
    ]
  },

  output: {
    filename: 'app.js',
    chunkFilename: 'app_[name]_[chunkhash].js',
    path: path.join(root, 'dist'),
  },

  // devtool: '#source-map',
  devtool: '#cheap-module-eval-source-map',

  resolve: {
    extensions: ['', '.js', '.jsx', '.scss'],
    root,
  },

  plugins: [
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin(),
    new webpack.DefinePlugin({
      __CLIENT__: true,
      __SERVER__: false,
      __DEVELOPMENT__: true,
    }),
  ],

  module: {
    loaders: [{
      test: /\.jsx?$/,
      loader: 'babel',
      exclude: /node_modules/,
      query: {
        plugins: [
          ['react-transform', {
            transforms: [{
              transform: 'react-transform-hmr',
              imports: ['react'],
              locals: ['module'],
            }]
          }]
        ],
      },
    }, {
      // global styles (don't convert into component-specific modules)
      test: /.s?css$/,
      loaders: [
        'style',
        'css?sourceMap&importLoaders=2',
        'sass?sourceMap',
        'sass-resources',
      ],
      include: [
        path.resolve(root, 'common', 'containers', 'Root.scss'),
        path.resolve(root, 'node_modules', 'graphiql', 'graphiql.css')
      ],
    }, {
      // app styles
      test: /\.s?css$/,
      loaders: [
        'style',
        'css?sourceMap&modules&localIdentName=[name]__[local]__[hash:base64:5]&importLoaders=2',
        'sass?sourceMap',
        'sass-resources',
      ],
      include: [
        path.resolve(root, 'common'),
      ],
      exclude: [
        path.resolve(root, 'common', 'containers', 'Root.scss'),
      ]
    }, {
      // react-toolbox
      test: /\.s?css$/,
      loaders: [
        'style',
        'css?modules&importLoaders=2',
        'sass',
        'toolbox',
      ],
      include: [
        path.resolve(root, 'node_modules', 'react-toolbox'),
      ],
    }, {
      test: /\.json$/,
      loader: 'json-loader'
    }, {
      test: /\.(woff2?|ttf|eot|svg)$/,
      loaders: ['url?limit=10000'],
    }],
  },

  sassResources: './config/sass-resources.scss',
  toolbox: {theme: './common/theme.scss'},
}
