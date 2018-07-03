---
title: git配置多个ssh-key
date: 2017-09-15 15:05:33
categories: 技术探讨
tags:
- git
---

许多 Git 服务器都使用 SSH 公钥进行认证。 为了向 Git 服务器提供 SSH 公钥，如果某系统用户尚未拥有密钥，必须事先为其生成一份。 这个过程在所有操作系统上都是相似的。

公司使用的是 gitlab，自己同时也在使用 github 仓库，所以电脑上会存在多个 git ssh-key 需要管理。

> 默认情况下，用户的 SSH 密钥存储在其 ~/.ssh 目录下

### 生成第一条 ssh-key

```bash
$ ssh-keygen -t rsa -C "xxxxx@xx.xxx"
```

执行完，会在 `~/.ssh` 目录下生成一对公钥和私钥：

```bash
$ ls ~/.ssh
id_rsa    id_rsa.pub
```
id_rsa: 私钥
id_rsa.pub: 公钥

拷贝公钥的内容并添加到 git 服务器的 SSH Keys 管理列表中。

### 生成第二条 ssh-key

```bash
$ ssh-keygen -t rsa -C "xxxxx@xx.xxx" -f ~/.ssh/github_rsa
```

执行完，再看 `~/.ssh` 目录会发现多了一对公钥和私钥：

```bash
$ ls ~/ssh
id_rsa    id_rsa.pub    github_rsa    github_rsa.pub
```

拷贝公钥的内容并添加到 git 服务器上，这时候，需要对这两条 rsa 进行管理，不然 git 会认第一对密钥。

### 添加 config 文件

```bash
$ vim config
```

```bash
# gitlab
Host gitlab.com
  HostName                  gitlab.com
  User                      xxxxx@xx.xxx
  PreferredAuthentications  publickey
  IdentityFile              /Users/xxx/.ssh/id_rsa

# github
Host github.com
  HostName                  github.com
  User                      xxxxx@xx.xxx
  PreferredAuthentications  publickey
  IdentityFile              /Users/xxx/.ssh/github_rsa
```

> Host: 该条配置的主机名
> HostName: 要验证的主机名（主要）
> User: 登录名（次要）
> PreferredAuthentications: 指定使用公钥验证（次要）
> IdentityFile: 指定对应 Host 所使用的 ssh-key 密钥地址（主要）

### 测试连接

```bash
$ ssh -T git@gitlab.com
```

完成
