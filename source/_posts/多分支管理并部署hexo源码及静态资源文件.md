---
title: 多分支管理并部署hexo源码及静态资源文件
date: 2017-03-28 22:47:06
tags: hexo
---
#### 背景

将hexo blog部署到github上可以通过 hexo-deploy-git插件完成，它在_config.xml中配置git仓库地址即可。
但是这种部署方式，提交的github上的代码仅仅是生成的静态文件，无法对hexo的源码进行管理，让我觉得不方便在多个电脑间同步。

#### 思路

在github上建立两个分支，一个source分支，一个master分支，master分支用以发布静态文件，部署博客使用。source分支用以提交hexo的源码，方便我在多台电脑之间进行同步代码，更新文章。

#### 实现

**第一步**

在Github上新建一个仓库，准备用以部署blog的仓库

**第二步**

克隆仓库到本地，添加.gitignore文件，配置：

```bash
node_modules/
public/
```

提交上传到master分支

```bash
$ git add -A
$ git commit -m 'init master'
$ git push origin master
```

新建分支source

```bash
$ git checkout -b source
$ git push origin source
```

此时，远程source和master分支都有一个文件，.gitignore

**第三步**

初始化一个blog

```bash
$ hexo init blog
```

将github仓库里的文件(.git/ & .gitignore)拷贝到blog里

注：此时github仓库里仅有一个.gitignore文件，同时还有一个.git的文件夹，这两个都要拷贝到blog目录里

**第四步**

切到source分支，提交源码到source分支上

```bash
$ git add -A
$ git commit -m "init source"
$ git push origin source
```

此时，github仓库远程分支已经拥有了hexo的源码文件

**第五步**

生成静态文件

```bash
$ hexo g
```

切到master分支，拷贝public／目录下的静态文件到根目录，提交到远程分支上

```bash
$ git checkout master
$ cp -r public/. .
$ git add -A
$ git commit -m "hexo generate"
$ git push origin master
```

注：此时远程master分支上就有了hexo 生成的静态文件，如果启用了Github Pages就可以通过your_name.github.io访问了博客了。

以上便是我通过source分支管理hexo 源码，通过master部署静态文件的方法。

**彩蛋**

为了方便步骤，我在package.json中配置执行脚本，方便快捷部署。配置如下：

```json
{
  ...
  "scripts": {
    "deploy": "rm -rf public && hexo g && git add -A && git commit -m 'hexo generate' && git push origin source && git checkout master && cp -r public/. . && git add -A && git commit -m 'deploy master' && git push origin master && git checkout source"
  },
  ...
}
```

使用方法，在目录下运行：

```bash
$ npm run deploy
```
