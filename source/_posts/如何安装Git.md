---
title: 如何安装Git
date: 2017-03-24 23:11:55
categories: 技术探讨
tags:
- git
---

### Windows

下载安装 [git](https://git-scm.com/downloads)

### Linxu

#### Debian/Ubuntu

12.04 下

Ubuntu12.04中默认没有安装Git。需要自行安装

```bash
$ sudo add-apt-repository ppa:git-core/ppa
$ sudo apt-get update
$ sudo apt-get install git
```

12.04 以上

```bash
$ sudo apt-get install git
```

#### Centos/RedHat

```bash
$ sudo yum install curl-devel expat-devel gettext-devel openssl-devel zlib-devel
$ sudo yum -y install git-core
```

### Mac

mac 下自带 git，也可以从官网下载安装 [git](https://git-scm.com/downloads)
