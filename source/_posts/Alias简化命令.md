---
title: Alias 简化命令
date: 2017-04-09 18:05:58
tags: bash
---

### 什么是 Alias?

Alias 是 linux 内建命令，一种函数，功能是设置命令的别名。

### Alias 有什么用？

*   自定义常用命令，简化命令输入长度
*   装逼，菜鸟表示看不懂你在输什么

### 设置常用的 git Alias

#### mac/linux

编辑配置文件：

```bash
$ vim ~/.bashrc
```

添加 alias:

```bash
alias gss='git status'
```

#### Windows

##### gitbash

```bash
$ cd ~
$ vim .bashrc
$ 同上
```

##### cmd

在用户文件夹下创建alias.bat

```bash
$ cd c:\User\[用户名]
$ vim alias.bat
```

添加alias规则

```bash
gss=git status
```

加入注册表

```bash
$ reg add "hkcu\software\microsoft\command processor" /v Autorun /t reg_sz /d "doskey /macrofile=C:\Users\[用户名]\alias.bat"
```

以上，即可在windows/mac/linux中自由使用alias装逼了。

### 效果展示

windows环境下CMD运行：

![](/images/alias/windowsalias.png)

> 在windows中，在文件夹中按住shift键+鼠标右击可以在当前目录下打开命令行
> ![](/images/alias/opencmd.png)

mac/linux环境下终端运行：

![](/images/alias/maclinuxalias.png)
