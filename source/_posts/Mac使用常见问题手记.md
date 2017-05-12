---
title: Mac使用常见问题手记
date: 2017-05-12 15:55:12
tags: macos
---
### 一、 解压 rar 文件

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

---

不定期更新...
