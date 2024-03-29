---
title: 如何安装Nodejs
date: 2017-03-24 21:44:38
categories: 技术探讨
tags:
- nodejs
keywords: [nodejs, node.js, nvm]
---
安装Node.js的方式有很多，这里推荐使用 [nvm](https://github.com/creationix/nvm) 版本控制器进行安装。因为可以进行node.js版本管理，方便升级和倒退。

#### 安装 nvm

**下载 nvm**

curl：
```bash
$ curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

wget:
```bash
$ wget -qO- https://raw.githubusercontent.com/creationix/nvm/v0.33.2/install.sh | bash
```

brew:
```bash
$ brew install nvm
```

完成后 nvm 就安装在了 ~/.nvm 目录，需要为 nvm 配置环境变量，即可在终端使用 nvm 了。

**配置 nvm 环境变量**

```bash
$ vim ~/.bash_profile
```

添加如下内容：

```bash
export NVM_DIR="$HOME/.nvm"
[ -s "$NVM_DIR/nvm.sh" ] && \. "$NVM_DIR/nvm.sh"  # This loads nvm
[ -s "$NVM_DIR/bash_completion" ] && \. "$NVM_DIR/bash_completion"  # This loads nvm bash_completion
```

**brew 配置**

```bash
export NUM_DIR=~/.nvm
source $(brew --prefix nvm)/nvm.sh
```

#### nvm 安装 node.js

安装完成后，重启终端并执行下列命令即可安装 Node.js。

```bash
$ nvm install stable
```
