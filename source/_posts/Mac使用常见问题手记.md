---
title: Mac使用常见问题手记
date: 2017-08-08 17:51:12
categories: 技术探讨
tags: macos
---
### 一、解压 rar 文件

Mac OS 的归档管理器默认不支持对 rar 文件的压缩和解压，需要额外安装工具处理，推荐一个终端工具——unrar。

**安装 Homebrew**

```bash
$ /usr/bin/ruby -e "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/master/install)"
```

**brew 安装 unrar**

```bash
$ brew install unrar
  ...
  ==> Downloading https://homebrew.bintray.com/bottles/unrar-5.4.5_1.sierra.bottle.tar.gz
  ######################################################################## 100.0%
  ==> Pouring unrar-5.4.5_1.sierra.bottle.tar.gz
  🍺  /usr/local/Cellar/unrar/5.4.5_1: 6 files, 499.1KB
```

**安装完成**

解压到对应目录：

```bash
$ unrar x test.rar
```

解压到当前目录：

```bash
$ unrar e test.rar
```

> 附：unrar 适合经常使用命令行的朋友使用，这里推荐一款方便的解压工具，The Unarchiver，使用方式根默认的解压程序一样，双击 .rar 压缩包即可解压

### 二、终端忽略大小写自动补全

Mac OS 的终端默认是区分大小写补全的，即：

```bash
$ cd Dow // 按 tab 会补全成 cd Download
$ cd dow // 按 tab 是不响应的
```
解决方法：

在终端执行：

```bash
echo "set completion-ignore-case on" >> ~/.inputrc
```

重启终端即可。

---

不定期更新...
