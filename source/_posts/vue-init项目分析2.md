---
title: vue-init 项目分析：中篇
date: 2017-08-09 14:53:00
categories: 前端技术
tags:
- vue
- webpack
---

在上一篇[文章](/2017/08/07/vue-init项目分析/)中，我介绍 vue-init 初始化项目中根目录下的配置文件。这一篇着重介绍 vue-init 项目对于 webpack 的配置。

项目结构：

![](/images/vue/QQ20170809-150400.png)

这里的 build 和 config 目录下就是对于 webpack 的配置文件，其中 config 目录中定义了 dev 环境和 prod 环境的配置项。 build 目录下主要配置了 webpack 的设置。

__package.json__

![](/images/vue/QQ20170809-150419.png)

在 package.json 中定义了三个命令，npm start 等同于 npm run dev 用以开发调试；npm run build 用以打包。

__config/dev.env.js__

```javascript
var merge = require('webpack-merge')
var prodEnv = require('./prod.env')

module.exports = merge(prodEnv, {
  NODE_ENV: '"development"'
})
```

这里是开始调试时的 webpack 配置文件，引用了 webpack-merge 插件来合并 prodEnv 的配置项，指定 Node 环境变量为 "development"

__config/prod.env.js__

```javascript
module.exports = {
  NODE_ENV: '"production"'
}
```

这里是用于打包使用的 webpack 配置文件，指定 Node 环境变量为 "production"

__config/test.env.js__

```javascript
var merge = require('webpack-merge')
var devEnv = require('./dev.env')

module.exports = merge(devEnv, {
  NODE_ENV: '"testing"'
})
```

这里是用于单元测试/集成测试时使用的 webpack 配置文件，合并 dev 的配置项并指定 Node 的环境变量为 "testing"

__config/index.js__

```javascript
// see http://vuejs-templates.github.io/webpack for documentation.
var path = require('path')

module.exports = {
  build: {
    env: require('./prod.env'),
    index: path.resolve(__dirname, '../dist/index.html'),
    assetsRoot: path.resolve(__dirname, '../dist'),
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    productionSourceMap: true,
    // Gzip off by default as many popular static hosts such as
    // Surge or Netlify already gzip all static assets for you.
    // Before setting to `true`, make sure to:
    // npm install --save-dev compression-webpack-plugin
    productionGzip: false,
    productionGzipExtensions: ['js', 'css'],
    // Run the build command with an extra argument to
    // View the bundle analyzer report after build finishes:
    // `npm run build --report`
    // Set to `true` or `false` to always turn it on or off
    bundleAnalyzerReport: process.env.npm_config_report
  },
  dev: {
    env: require('./dev.env'),
    port: 8080,
    autoOpenBrowser: true,
    assetsSubDirectory: 'static',
    assetsPublicPath: '/',
    proxyTable: {},
    // CSS Sourcemaps off by default because relative paths are "buggy"
    // with this option, according to the CSS-Loader README
    // (https://github.com/webpack/css-loader#sourcemaps)
    // In our experience, they generally work as expected,
    // just be aware of this issue when enabling this option.
    cssSourceMap: false
  }
}
```

这里是定义 dev 和 prod 配置的通用配置地方。

```javascript
build: {
  env: require('./prod.env'), // 引入上面声明的 NODE_ENV
  index: path.resolve(__dirname, '../dist/index.html'),  // 指定 index.html 路径
  assetsRoot: path.resolve(__dirname, '../dist'), // 指定打包后的资源根路径
  assetsSubDirectory: 'static', // 存放打包后静态资源的目录，/dist/static
  assetsPublicPath: '/',  // 发布路径，会注入到 index.html 中的 src 资源地址引用，用以配置服务器路径或者 CDN 设置
  productionSourceMap: true,  // 是否启用 source-map
  // Gzip off by default as many popular static hosts such as
  // Surge or Netlify already gzip all static assets for you.
  // Before setting to `true`, make sure to:
  // npm install --save-dev compression-webpack-plugin
  productionGzip: false,  // 是否启用 gzip
  productionGzipExtensions: ['js', 'css'],  // gzip 压缩的文件后缀名
  // Run the build command with an extra argument to
  // View the bundle analyzer report after build finishes:
  // `npm run build --report`
  // Set to `true` or `false` to always turn it on or off
  bundleAnalyzerReport: process.env.npm_config_report // 打包后的分析报告
}
```
```javascript
dev: {
  env: require('./dev.env'),  // 引入上面声明的 NODE_ENV
  port: 8080, // dev-server 端口配置
  autoOpenBrowser: true,  // 是否启动打开浏览器
  assetsSubDirectory: 'static', // 存放打包后静态资源的目录，/dist/static
  assetsPublicPath: '/',  // 发布路径，会注入到 index.html 中的 src 资源地址引用，用以配置服务器路径或者 CDN 设置
  proxyTable: {}, // 代理配置，例如解决本地调试接口跨域问题
  // CSS Sourcemaps off by default because relative paths are "buggy"
  // with this option, according to the CSS-Loader README
  // (https://github.com/webpack/css-loader#sourcemaps)
  // In our experience, they generally work as expected,
  // just be aware of this issue when enabling this option.
  cssSourceMap: false // 是否开启 css source-map
}
```

以上，是对 vue init 的骨架项目 config 目录下对 webpack 配置文件的介绍。

主要是声明了三个模式（开发，测试，部署）下的环境变量，在 config/index.js 文件中指定了打包及调试时的通用配置，需要注意的可能就是可能要配置端口号，接口代理，打包的路径以及对发布路径的设置。

关于 webpack 具体配置及 build 目录下配置文件的详细介绍，见后续文章。
