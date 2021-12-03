const path = require('path')
const HtmlWebpackPlugin = require('html-webpack-plugin')
const VueLoaderPlugin = require('vue-loader/lib/plugin')
const TerserPlugin = require("terser-webpack-plugin")

module.exports = {
  entry: {
    main: './main.js',
    bump: {
      import: './src/plugin/bump.js',
      library: {
        name: 'bump-vue',
        type: 'umd'
      }
    },
    css: './style/main.sass'
  },
  output: {
    filename: '[name].js',
    path: path.resolve(__dirname, 'dist'),
    publicPath: '/'
  },
  devServer: {
    static: {
      directory: path.join(__dirname, 'dist')
    },
    compress: true,
    port: 8080,
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        use: 'vue-loader'
      },
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'babel-loader'
      },
      {
        test: /\.css$/,
        use: ['vue-style-loader', 'css-loader']
      },
      {
        test: /\.s[a|c]ss$/,
        use: [
          'vue-style-loader',
          'css-loader',
          {
            loader: 'sass-loader',
            options: {
              // sass-loader version >= 8
              sassOptions: {
                indentedSyntax: true
              }
            }
          }
        ]
      }
    ]
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      //favicon: './public/favicon.ico'
    }),
    new VueLoaderPlugin()
  ],
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin()
    ]
  }
}
