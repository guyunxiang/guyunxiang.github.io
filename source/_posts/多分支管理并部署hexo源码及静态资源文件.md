---
title: 多分支管理并部署hexo源码及静态资源文件
date: 2017-03-28 22:47:06
categories: 技术探讨
tags:
- hexo
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

到此，远程 master 分支上就有了 hexo 生成的静态文件，如果启用了 Github Pages 就可以通过 your_name.github.io 访问博客了。

以上便是我通过 source 分支管理 hexo 源码，通过 master 部署静态文件的方法。

---

**注意**

我在这里是执行拷贝出新生成的项目文件覆盖到 master 分支下的原项目文件，存在一个弊端，就是只增不减，由于 npm script 无法执行排除删除这种特殊的脚本，所以目前还没发现好的方式清理目录方法，暂时只能手动清理：

```bash
$ shopt -s extglob
$ rm -rf !(node_modules|public)
```
我在这里为了清理目录，启用了 extglob 模式，删除了除 node_modules | public 文件夹以外的所有文件（会保留 .git | .gitignore）


**彩蛋**

为了方便步骤，我在 package.json 中配置执行脚本，方便快捷部署。配置如下：

```json
{
  ...
  "scripts": {
    "deploy": "rm -rf public && hexo g && git add -A && git commit -m 'hexo generate' && git push origin source && git checkout master && rm -rf !(node_modules|public) && cp -r public/. . && git add -A && git commit -m 'deploy master' && git push origin master && git checkout source"
  },
  ...
}
```

使用方法，在目录下运行：

```bash
$ npm run deploy
```

---

**更新于2017年10月31日**

上文中写到 `rm -rf !(node_modules|public)` 需要打开 extglob 模式，开启方法 `shopt -s extglob`，这种方法有限制且不利于管理白名单的文件夹名称。

于是考虑到用 Node.js 操作文件，遍历项目目录下的所有文件，然后根据文件名匹配白名单，删除所有非白名单的文件/文件夹。

```javascript
// bin/index.js

'use strict';

var fs = require('fs');
var path = require('path');
var exec = require('child_process').exec;
var files = fs.readdirSync(path.resolve());
var whitelist = [
  '.git',
  '.gitignore',
  '.travis.yml',
  'README.md',
  'bin',
  'node_modules',
  'public'
];

files.forEach(function(filename) {
  if (whitelist.indexOf(filename) < 0) {
    exec('rm -rf ' + filename, function(err, stdout, stderr) {
      if (err) { console.log(err); return; }
    });
  }
});

exec('cp -r public/. .', function(err, stdout, stderr) {
  if (err) { console.error(err); return; }
});
```

当 `hexo generate` 之后，切到 master 分支，运行 `node bin/index.js` 即可删除除了白名单的所有文件/文件夹。

再复制所有的打包文件到根目录下。
