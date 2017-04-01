---
title: 设置国内npm镜像
date: 2017-04-01 22:59:53
tags: npm
---

npm全称Node Package Manager，是node.js的模块依赖管理工具。由于npm的源在国外，所以国内用户使用起来各种不方便。下面整理出了一部分国内优秀的npm镜像资源，国内用户可以选择使用。

### 国内优秀npm镜像

#### 淘宝npm镜像

*   搜索地址：[http://npm.taobao.org/](http://npm.taobao.org/)
*   registry地址：[http://registry.npm.taobao.org/](http://registry.npm.taobao.org/)

#### cnpmjs镜像

*   搜索地址：[http://cnpmjs.org/](http://cnpmjs.org/)
*   registry地址：[http://r.cnpmjs.org/](http://r.cnpmjs.org/)

### 如何使用

有很多方法来配置npm的registry地址，下面根据不同情境列出几种比较常用的方法。以淘宝npm镜像举例：

#### 1. 临时使用

```bash
$ npm --registry https://registry.npm.taobao.org install express
```

#### 2. 持久使用

```bash
$ npm config set registry https://registry.npm.taobao.org
// 配置后可通过下面方式来验证是否成功
$ npm config get registry
// 或
$ npm info express
```

#### 3. 通过cnpm使用

```bash
$ npm install -g cnpm --registry=https://registry.npm.taobao.org
// 验证
cnpm install express
```

> 文章转载自 [国内优秀npm镜像推荐及使用](http://riny.net/2014/cnpm/)
