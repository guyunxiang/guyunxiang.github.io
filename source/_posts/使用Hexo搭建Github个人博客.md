---
title: 使用Hexo搭建Github个人博客
date: 2017-03-24 21:25:13
tags: hexo
---
网上关于hexo搭建博客的文章已经有很多，这里只做为个人博客的试笔文章，记录下hexo博客搭建的过程和心得。

### Hexo

> Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

### 搭建准备

*   Node.js
*   Git & Github

Node.js安装方式很多，见 [如何安装Node.js](../如何安装Nodejs/) 文章
Git 安装方法，见 [如何安装Git](../如何安装Git/) 文章

node.js 和 git 都安装完成后即可开始搭建hexo个人博客了。

### 开始搭建

#### 安装 hexo

```bash
$ npm i -g hexo-cli
```
> Mac 用户
> 您在编译时可能会遇到问题，请先到 App Store 安装 Xcode，Xcode 完成后，启动并进入 Preferences -> Download -> Command Line Tools -> Install 安装命令行工具。

#### 初始化 blog

```bash
$ hexo init <folder>
$ cd <folder>
$ npm install
```

#### 写文章

你可以执行下列命令来创建一篇新文章。

```bash
$ hexo new [layout] <title>
```
> 可以在命令中指定文章的布局（layout），默认为 post，可以通过修改_config.yml 中的 default_layout 参数来指定默认布局。

#### 服务器

使用 hexo-server 启动本地服务查看博客

> Hexo 3.0 把服务器独立成了个别模块，必须先安装 hexo-server 才能使用。

```bash
$ npm i hexo-server --save
```

**启动服务**

```bash
$ hexo server
```

**实时刷新**

安装 hexo-browsersync，监听文档变化，实时刷新页面

```bash
$ npm i hexo-browsersync --save
$ hexo server
```

#### 生成器

使用 hexo generate 生成静态文件

```bash
$ hexo generate
```

**监听文件变动**

```bash
$ hexo generate --watch
```

#### 部署

```bash
$ hexo deploy
```

### 部署到Github上

#### 新建仓库

github 有个功能叫 Github Pages，可以使用当前账号的名称作为二级域名建立一个自己的网站，前提是这个仓库的名字是 your_name.github.io 这种格式，your_name是你的github账户名。

#### 部署到github上

安装 hexo-deployer-git

```bash
$ npm i hexo-deployer-git --save
```

修改配置项：

```bash
_config.yml
...
# hexo-deployer-git config
deploy:
  type: git
  repo: <repository url> #库（Repository）地址
  branch: [branch] #分支名称。如果您使用的是 GitHub 或 GitCafe 的话，程序会尝试自动检测。
  message: [message] #自定义提交信息 (默认为 Site updated: {{ now('YYYY-MM-DD HH:mm:ss') }})
```

运行

```bash
$ hexo deploy
```

即可将生成的静态文件部署到github上。

访问自己的 your_name.github.io 即可访问自己的博客了。
