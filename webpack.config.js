const path = require('path');

module.exports = {
  entry: './www/app/main.js',
  output: {
    path: path.resolve(__dirname, 'www/dist'),
    filename: 'all.js'
  },
  mode: 'development',
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env','@babel/react']
          }
        }
      },
      {
        test: /\.less$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
          },
          {
            loader: 'less-loader',
          }
        ],
      },
      {
        test: /\.(woff|woff2|svg|ttf|eot)$/,
        use:[
            {
              loader: 'file-loader',
              options: {name: 'fonts/[name].[hash:8].[ext]'}
            }
        ]
      },
      {
        test: /\.(png|jpg|jpeg||gif)$/,
        use:[
            {
              loader: 'url-loader'
            }
        ]
      }
    ]
  },
  watch: true,
  devServer: {
    contentBase: path.join(__dirname),
    compress: true,
    port: 8080,
    proxy: {
      '/api/*': {
        target: 'http://localhost:9000',
        secure: false
      }
    },
    historyApiFallback: true
  }
};