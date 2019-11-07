---
title: vue-init 项目分析：前篇
date: 2017-08-07 18:15:24
categories: 前端技术
tags:
- vue
- webpack
typora-root-url: ../
---

> Vue.js（读音 /vjuː/，类似于 view） 是一套构建用户界面的渐进式框架。与其他重量级框架不同的是，Vue 采用自底向上增量开发的设计。Vue 的核心库只关注视图层，它不仅易于上手，还便于与第三方库或既有项目整合。另一方面，当与单文件组件和 Vue 生态系统支持的库结合使用时，Vue 也完全能够为复杂的单页应用程序提供驱动。

vue 相比与其他几种现在流行的前端框架而言，还是有很多优势的。具体请看[这里](对比其它框架)。

Vue.js 提供一个官方命令行工具，可用于快速搭建大型单页应用。该工具提供开箱即用的构建工具配置，带来现代化的前端开发流程。只需几分钟即可创建并启动一个带热重载、保存时静态检查以及可用于生产环境的构建配置的项目。

如果你已经是一个前端老手，我想你可能比较嗨皮，因为可以省了很多准备工作，如果你还是一个前端新人，建议先了解 Vue 命令行到底为我们做了什么，这里就分析下 vue-cli 究竟为我们做了哪些工作。

先全局安装 vue-cli：

```bash
# 全局安装 vue-cli
$ npm install --global vue-cli
# 创建一个基于 webpack 模板的新项目
$ vue init webpack my-project
# 安装依赖，走你
$ cd my-project
$ npm install
$ npm run dev
```

看下执行完上面命令后生成的骨架项目结构：

![](/images/vue/QQ20170807-153736.png)

先看下根目录生成的这些文件：

__.babelrc__

```json
{
  "presets": [
    ["env", {
      "modules": false,
      "targets": {
        "browsers": ["> 1%", "last 2 versions", "not ie <= 8"]
      }
    }],
    "stage-2"
  ],
  "plugins": ["transform-runtime"],
  "env": {
    "test": {
      "presets": ["env", "stage-2"],
      "plugins": ["istanbul"]
    }
  }
}
```

这里使用 Babel 的配置文件
presets 配置：
env 的环境配置，禁止了使用 ES6 模块转换到其他的模块类型（详细[文档](https://babeljs.io/docs/plugins/preset-env/)），同时，指定了浏览器兼容规则（[详情](http://browserl.ist/)）
stage-x 预设的转换都是尚未被批准为发布 Javascript 的语言（如ES6 / ES2015）的更改。这里的 stage-2 指定了第二草案规定内容版本的转换器（[详情](https://babeljs.io/docs/plugins/#transform-plugins-other)）
plugins 配置：
使用 [transform-runtime](http://babeljs.io/docs/plugins/transform-runtime/) 插件，为代码构建一个沙盒模式，避免污染全局变量
env 配置：
test 的环境下使用 env ，stage-2 的转换器，引用 istanbul 插件（代码覆盖率工具，配合 Mocha 使用）

__.editorconfig__

```config
root = true

[*]
charset = utf-8
indent_style = space
indent_size = 2
end_of_line = lf
insert_final_newline = true
trim_trailing_whitespace = true
```

这里定义了文件编码 utf-8，用空格替换制表符，缩进2个空格，以lf换行符结尾，结尾增加一个空行，删除换行符前的所有空白字符
editorconfig 是规范不同编辑器之间缩进的插件配置，支持多种编辑器，好的编程习惯，从它开始，详情看[官网](http://editorconfig.org/)

__.eslintignore__

```config
build/*.js
config/*.js
```

这里定义了 eslint 规则校验忽略的文件

__.eslintrc.js__

```javascript
// http://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parser: 'babel-eslint',
  parserOptions: {
    sourceType: 'module'
  },
  env: {
    browser: true,
  },
  extends: 'airbnb-base',
  // required to lint *.vue files
  plugins: [
    'html'
  ],
  // check if imports actually resolve
  'settings': {
    'import/resolver': {
      'webpack': {
        'config': 'build/webpack.base.conf.js'
      }
    }
  },
  // add your custom rules here
  'rules': {
    // don't require .vue extension when importing
    'import/extensions': ['error', 'always', {
      'js': 'never',
      'vue': 'never'
    }],
    // allow optionalDependencies
    'import/no-extraneous-dependencies': ['error', {
      'optionalDependencies': ['test/unit/index.js']
    }],
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0
  }
}

```

这里配置了项目使用的 eslint 规则，在 init 项目时，会让你选择使用哪种 eslint 规则，有 Google 的一般规则，也有 airbnb 较为严格的校验规则，也可以选择自定义的规则，这里示例的是 airbnb 的校验规则。你可以根据自己的习惯在 rules 中配置自定义的规则。

__.gitignore__

```
.DS_Store
node_modules/
dist/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
test/unit/coverage
test/e2e/reports
selenium-debug.log

# Editor directories and files
.idea
*.suo
*.ntvs*
*.njsproj
*.sln
```

这里指定 git 忽略的文件

__.postcssrc.js__

```
// https://github.com/michael-ciniawsky/postcss-load-config

module.exports = {
  "plugins": {
    // to edit target browsers: use "browserslist" field in package.json
    "autoprefixer": {}
  }
}
```
这是 [PostCSS](http://postcss.org/) 配置文件，用 JavaScript 转换 CSS 的工具。autoprefixer 是为 CSS 自动添加前缀功能。

以上，是对 vue init 的骨架项目根目录下的配置文件介绍。

还有关于 webpack ，source 源码，vue-router 以及 NightWatch & Karma + Mocha 测试框架，见后续[文章](/2017/08/09/vue-init项目分析2/)。
