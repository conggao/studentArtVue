# student-art-vue

> A Vue.js project

## Build Setup

``` bash
# install dependencies
npm install

# serve with hot reload at localhost:8080
npm run dev

# build for production with minification
npm run build

# build for production and view the bundle analyzer report
npm run build --report

# run unit tests
npm run unit

# run e2e tests
npm run e2e

# run all tests
npm test
```
## scss 配置
```
#install
cnpm install --save-dev sass-loader style-loader css-loader
yarn add node-sass sass-loader css-loader style-loader --dev
# webpack.base.config.js在loaders里面加上rules (vue2.0)
rules: [
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: vueLoaderConfig
      },
      {
        test: /\.js$/,
        loader: 'babel-loader',
        include: [resolve('src'), resolve('test')]
      },
      {
        test: /\.(png|jpe?g|gif|svg)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('img/[name].[hash:7].[ext]')
        }
      },
      {
        test: /\.scss$/,
        loaders: ["style", "css", "sass"]
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/,
        loader: 'url-loader',
        query: {
          limit: 10000,
          name: utils.assetsPath('fonts/[name].[hash:7].[ext]')
        }
      }
    ]
  }
  # 使用方式
  <style lang="scss" scoped="" type="text/css"></style>
```
###style标签内联,配置webpack.config.js
```
module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use:[ 'style-loader','css-loader','sass-loader'],
      },
    ],
  },
};
```
###style标签外联
#先安装插件

```yarn add extract-text-webpack-plugin --dev```
#然后再修改配置webpack.config.js为
```
const ExtractTextPlugin = require('extract-text-webpack-plugin');

module.exports = {
  module: {
    rules: [
      {
        test: /\.(scss|css)$/,
        use: ExtractTextPlugin.extract({
          use:[ 'css-loader','sass-loader'],
          fallback: 'style-loader',
        }),
      },
    ],
  },
  plugins: [
    new ExtractTextPlugin({
      filename: 'index.css',
      disable: false,
      allChunks: true,
    }),
  ],
};
```
#支持CSS Modules,修改配置webpack.config.js为
```
module: {
  rules: [
    {
      test: /\.(scss|css)$/,
      use: ExtractTextPlugin.extract({
        use:[
          {
            loader: 'css-loader',
            options:{
              modules:true,
              importLoaders:1,
              localIdentName:'[local]_[hash:base64:5]',
              sourceMap: true,
            },
          },
          {
            loader:'sass-loader',
            options:{
                sourceMap: true,
            },
          },
        ],
        fallback: 'style-loader',
      }),
    },
  ],
}
```
#chocolatey install(powershell) 
```
iex ((new-object net.webclient).DownloadString('https://chocolatey.org/install.ps1'))
```
#禁止运行脚本
```
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned
```
#yarn 安装sass
```
yarn config set sass_binary_site http://cdn.npm.taobao.org/dist/node-sass -g
```
#yarn install with choco
```
choco install yarn
yarn config set registry https://registry.npm.taobao.org -g
yarn config get registry
```
#路径引入element
```
  import ElHeader from 'element-ui/packages/header/src/main'
  import ElDropdown from 'element-ui/packages/dropdown/src/dropdown'
  import ElDropdownMenu from 'element-ui/packages/dropdown/src/dropdown-menu'
  import ElDropdownItem from 'element-ui/packages/dropdown/src/dropdown-item'
```
