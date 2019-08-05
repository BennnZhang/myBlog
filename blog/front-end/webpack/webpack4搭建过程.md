---
title: webpack4搭建vue项目
date: 2019/08/03
slidebar: true
---
准备： 电脑安装node 与 npm
## 1. 初始化项目
`npm init`  
生成package.json  

## 2. 安装基本依赖模块
安装webpack  
`npm i -D webpack`  
此时会生成package-lock.json与node_nodules文件夹

webpack4.0之后需要装webpack-cli  
`npm i -D webpack-cli`

## 3. 创建基本目录结构
项目根目录下创建src文件夹，在其中创建index.js作为入口文件；  
项目根目录下创建index.html作为页面入口;  
项目根目录创建dist文件夹，在其中创建index.html暂时做为打包后的入口；  
项目根目录创建webpack.config.js作为webpack的配置文件(后期后抽离);
```
webpack-demo
  |- package.json
  |- /dist
    |- index.html   
  |- /src
    |- index.js
  |- index.html
  |- webpack.config.js
```
## 4. 配置基本的webpack
在webpack.config.js中配置：  
```js
const path = require('path'); // 核心模块，将相对路径转为绝对路径

module.exports = {
    entry: './src/index.js', // 模块打包开始的入口
    output: { // 模块打包输出位置
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    }
}
```

此时运行npx webpack就会将入口src/index.js打包到dist/main.js；  
我们在dist文件夹的index.html中利用script引入main.js文件，初步的打包就完成了。

## 5. 配置loader处理css,sass
### 处理css
在src文件夹下增加一个style文件夹，中创建一个index.css文件
```css
webpack-demo
  |- package.json
  
  |- /dist
    |- index.html 

  |- /src
    |- /style /* 新增加的style文件夹 */
      |- index.css  /* 新增加的css文件 */
    |- index.js

  |- index.html
  
  |- webpack.config.js
```
此时我们在src下的index.js中引入index.js，此时运行会报错：  
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type, currently no loaders are configured to process this file  
因为webpack本身只能处理js，其他文件并不是他的任务，所以我们现在需要配置对应的loader让它可以处理其他文件；  
处理css需要style-loader与css-loader，style-loader可以帮助我们以style标签的形式以内联样式注入到index.html中；  
`npm i -D style-loader css-loader `  
然后我们在webpack.config.js中增加loader
```js
const path = require('path'); 

module.exports = {
    entry: './src/index.js', 
    output: {
        filename: 'main.js',
        path: path.resolve(__dirname, './dist')
    },
    module: {
        rules: [
            {
                test: /\.css$/, //检查需要处理的文件
                use: ['style-loader', 'css-loader' ] //注意loader解析从后往前解析，顺序不能颠倒
            }
        ]
    }
}
```  
此外，可以看一些其他的module配置:  
``` js
module: {
    noParse: /jquery | lodash/, //不进行处理的模块
    rules: [
        {
            test: /\.css$/, 
            include: [ //匹配特定条件
                path.resolve(__dirname, './src/style')
            ],
            exclude: '', //排除特定条件
            use: [
                'style-loader',
                {
                    loader: 'css-loader'},
                {
                    loader: 'less-loader',
                    options: { //设置配置
                        noIecompat: true
                    }
                }
            ]
        }
    ]
}
```
### 处理sass
安装正确的解析sass的loader：  
`npm i -D sass-loader node-sass`
在webpack.config.js的module中如下配置：  
```js
module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/, //css，sass，scss文件
            use: ['style-loader', 'css-loader', 'sass-loader' ]
        }
    ]
}
```
## 6. 启用sourceMap
此时的配置如果我们想在浏览器中检查元素的样式的来源，会发现找不到，所以此时需要配置sourceMap帮助我们找到样式的根源
```js
module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader', 
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }
    ]
}
```
## 7. postcss-loader
postCSS是css的预处理器，可以帮助我们给css3添加前缀，样式校验（stylelint），提前使用css的新特性等;  
最经常用的就是给css3添加浏览器前缀：  
`npm i -D postcss-loader`  
`npm i autoprefixer`
```js
module: {
    rules: [
        {
            test: /\.(sa|sc|c)ss$/,
            use: [
                'style-loader', 
                {
                    loader: 'css-loader',
                    options: {
                        sourceMap: true
                    }
                },
                {// 新增加的
                    loader: 'postcss-loader',
                    options: {
                        ident: 'postcss',
                        sourceMap: true,
                        plugins: loader => [
                            require('autoprefixer')({browsers: ['> 0.15% in CN']}) // 浏览器前缀
                        ]
                    }
                },
                {
                    loader: 'sass-loader',
                    options: {
                        sourceMap: true
                    }
                }
            ]
        }
    ]
}
```
## 8. css样式抽离为单独文件
webpack 1-3使用的插件是extract-text-webpack-plugin, webpack4使用的是mini-css-extract-plugin  
`npm i -D mini-css-extract-plugin`  
注意:   
1.抽离后样式不会以style标签的形式注入index.html  
2. mode需要设置为production（此时我们可以再创建一个webpack.prod.config.js，将原先的config配置复制过来，并且将mode设置为production）  
3. 我们将打包命令写入package.json的script中避免一直重复跑npx webpack(webpakc默认将webpack.config.js作为配置文件，但是我们可以通过--config 文件名指定其他配置文件)

在webpack.prod.config.js中引入插件 => 将style-loader设置为该插件的loader => 配置该插件  
此时package.json的script样子：  
```json
 "scripts": {
    "build": "npx webpack", //npm run build会将webpack.connfig.js作为配置文件
    "dist": "npx webpack --config webpack.prod.config.js" // npm run dist会将webpack.prod.connfig.js作为配置文件
  },
```
此时webpack.prod.config.js的修改的部分： 
```js
const miniCssExtractPlugin = require('mini-css-extract-plugin'); //新增

module.exports = {
    mode: 'production', //新增
    module: {
        rules: [
            {
                use: [
                    miniCssExtractPlugin.loader, // 将style-load改为这个，其余loader不变
                ]
            }
        ]
    },
    plugins: [ //新增
        new miniCssExtractPlugin({
            filename: '[name].[hash].css', //name会与打包的入口文件名一致,hash随机哈希值
            chunkFilename: '[id].[hash].css' // 异步引入，即非entry中引入时走这个
        })
    ]
}
```
运行npm run dist, 在dist的index.html引入打包后main.css,就实现了样式的抽离
## 9. 压缩css
`npm i -D optimize-css-assets-webpack-plugin`  
在webpack.prod.config.js中引入并在中加入optimization中: 
```js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin"); // 新增

optimization: { // 新增，与plugins同级
    minimizer: [new OptimizeCSSAssetsPlugin({})]
}
```
## 10. 压缩js
此插件mode需要为production;  
` npm i -D uglifyjs-webpack-plugin`  
在webpack.prod.config.js中引入并在中加入optimization中: 
```js
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');
 // 新增

optimization: {
     minimizer: [
         new OptimizeCSSAssetsPlugin({}),
         new UglifyJsPlugin({ // 新增
             cache: true, // 缓存
             parallel: true, // 并行压缩
             sourceMap: false // 是否可以追溯源头
         })
     ]
 }
```
## 11. html-webpack-plugin将打包的文件自动注入html中
`npm i -D html-webpack-plugin`  
在webpack.prod.config.js中引入并在plugins中添加:  
```js
const HtmlWebpackPlugin = require('html-webpack-plugin'); //新增
 plugins: [
     new miniCssExtractPlugin({
         filename: '[name].[hash].css',
         chunkFilename: '[id].[hash].css'
     }),
     new HtmlWebpackPlugin({ // 新增
         filename: 'main.html', // 打包生成的文件名
         template: 'index.html', // 模板来源
         minify: {
           collapseWhitespace: true, //删除空格
           removeComments: true, // 删除注释
           removeAttributeQuotes: true // 移除属性的引号
         }
     })
 ]
```
## 12. 清理dist目录
目前的配置每次我们打包都会在dist中生成文件，一直累加,实际开发中我们需求每次打包都将之前的文件清空；  
`npm i -D clean-webpack-plugin`  
在webpack.config.js中引入并在plugins中添加:
```js
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); //新增
plugins: [// 新增
    new CleanWebpackPlugin() 
]
```
此时运行npm run build, 会发现dist文件夹下的旧文件没有，只有最新打包的
## 13. 对图片的处理
我们在项目的根目录下创建一个static文件夹存放我们的静态资源，在其中创建一个img文件夹放入一张图片,在index.css中引入此图片作为背景;  
此时打包会报错，我们需要url-loader或者file-loader处理：  
两者都能对图片进行一个处理，但两者有区别:  
file-loader是将图片打包到生成目录下，依然会请求加载图片；  
url-loader配置limit当小于limit字节时会使用url-loader将图片转为base64编码注入代码中，不会再次请求，当大于limit字节时会使用file-loader处理，也就是说url-loader依赖file-loader

### file-loader
`npm i -D file-loader`  
在webpack.config.js中的module中的rules中增加  
```js
{
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]', // path可以将图片打包的和原先路径一样的位置在dist中， name会保持和原先名字一样，ext保持原先的后缀名
            }
        }
    ]
}
```
打包后会发现dist文件夹下多了一张图片
### image-webpack-loader压缩图片
`npm i -D image-webpack-loader`  
我这里安装的时候出了点小意外，安装一直报错，后来使用cnpm安装才可以的。如果你像我一样报错的话建议按以下步骤清除之前的残余再使用cnpm安装:  
1. 清除残余 `npm uninstall image-webpack-loader`
2. 全局安装cnpm `npm install cnpm -g --registry=https://registry.npm.taobao.org`
3. cnpm安装 `cnpm install --save-dev  image-webpack-loader `
安装后在webpack.config.js中module的rules中配置
```js
{
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    use: [
        {
            loader: 'file-loader',
            options: {
              name: '[path][name].[ext]',
            }
        },
        {
            loader: 'image-webpack-loader' // 新增
        }
    ]
}
```
### url-loader将图片转为base64格式
`npm i -D url-loader`  
在webpack.config.js中引入并在module的rules中配置:
```js
 {
    test: /\.(png|svg|jpg|jpeg|gif)$/,
    use: [
        { // 修改
            loader: 'url-loader', 
            options: {
              limit: 10000
            }
        },
        {
            loader: 'image-webpack-loader'
        }
    ]
}
```
## 字体的处理
字体的处理也是用的file-loader, 需要我们在module的rules中配置一下:  
```js
{
  test: /\.(woff|woff2|eot|ttf|otf)$/,
  use: [
    'file-loader'
  ]
}
```
