---
title: Mac配置终端git自动补全
date: 2017-07-25 14:32:42
categories: 技术探讨
tags:
- macos
- git
---
对于终端的使用，最爽的自然是Linux下的终端，MacBook虽然也是Unix内核开发的系统，但是在终端上的体验还是较Linux上差一些，比如对于git命令的自动补全功能。

这里介绍下如何让MacBook的终端也能支持git命令的自动补全功能（虽然还是没有Linux终端的自动补全爽，但有比没有好）

#### bash-completion

**安装brew**

终端里运行：

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

具体说明参见[官方网站](https://brew.sh/index_zh-cn.html)

**安装bash-completion**

```bash
$ brew install bash-completion
```

**下载git-completion.bash源码**

下载[git-completion.bash](https://github.com/git/git/blob/master/contrib/completion/git-completion.bash)源码，保存到~/.git-completion.bash

**配置bash-completion**

```bash
$ vim ~/.bash_profile
```

在最后面添加如下代码：

```bash
# FOR GIT-COMPLETION
[ -f /usr/local/etc/bash_completion ] && . /usr/local/etc/bash_completion
source ~/.git-completion.bash
```

重启终端，或者终端输入 `source ~/.bash_profile` 即可

完成

附：

[终端忽略大小写自动补全](/2017/08/08/Mac使用常见问题手记/)
