---
title: Atom国内安装插件教程
date: 2017-05-04 11:30:57
categories: 技术探讨
tags:
- 开发工具
- atom
---

其实 Atom 本身是自带插件管理工具的，同时也有 apm 包管理工具，但是因为墙的问题，国内多数情况下是无法安装和更新插件的。这里列举几个可行的方式：

*   Atom Packages 管理页面安装

Atom 设置界面可以图形界面的管理已经安装的组件，也可以搜索新的组件或者主题，选择 Install 菜单，即可搜索想要安装的插件，点击 插件后面的 Install 按钮即可安装

*   apm 安装组件

apm(Atom Package Manager)是atom的包管理工具，可以方便的管理Atom的插件。切换到 atom 的包列表目录。运行安装命令即可。例如：

```bash
$ cd ~/.atom/packages
$ apm install <package-name>
```

安装完成后重启 Atom 即可。

**注：以上两种方式因为墙的原因，国内用户无法正常使用，可以尝试使用 VPN，一般收费 VPN 比较贵，通常一个月 20 RMB左右，但是比较稳定。如果单单为了偶尔更新下插件开个 VPN ，我想是没人愿意的，除非工作需要使用 VPN 那倒是可以。windows用户推荐一个免费的 VPN ，GreenVPN ，一个老牌 VPN 了，注册后可以每天一个小时的试用 VPN。网上关于GreenVPN 有多个版本，真假难辨，使用时需要注意了。Mac OS用户可以使用鱼摆摆代理工具，一个月才9块钱，方便又好用。建议使用。Linux 下没发现什么好用的 VPN 工具，可以尝试后面介绍的方法。**

*   手动下载插件并安装

打开 Atom 官网，进入插件管理页面，可以选择想要安装的插件，所有的插件都是在 Github 上开源的，所以，可以免费下载到各个插件到本地。

windows环境：

```bash
$ cd C:/Users/你的用户名/.atom/packages
```

MacOs/Linux环境：

```bash
$ cd ~/.atom/packages
```

进入到 atom 的插件目录

git clone 插件的源码，在 clone 的插件目录下 **npm install** 即可。

```bash
$ git clone <atom-packages>.git
$ cd <atom-packages>
$ npm install
```

手动的方式可以解决墙的问题，但是更新插件会比较麻烦，需要一个一个 git pull，再 npm install 更新。

---

小结：在有网络条件的情况下（可出墙）Atom 插件安装还是较为方便的，在没有网络条件的情况下，Atom 还是比较鸡肋的，用之无味，弃之可惜。可以考虑尝试用 vscode 代替，vscode 也是比较方便，而且在打开大文件上性能还要比 Atom 优秀。
