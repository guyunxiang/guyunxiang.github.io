---
title: 在macOS上安装街机模拟器
date: 2018-11-29 17:17:55
categories: 游戏攻略
tags:
- macos
- 街机游戏
---
接着上一篇文章 [OpenEmu模拟器](/2018/11/29/OpenEmu模拟器/)，继续捣鼓小游戏，记得儿时最喜欢跑游戏厅打游戏，什么合金弹头，三国战纪，西游释厄传，恐龙快打，拳皇等等，太多儿时的回忆了。于是想在 mac 上安装一个街机模拟器。

> 说明：Windows 上找游戏太简单了，基本上我平时用 Windows 电脑时也不会打这些小游戏了，所有这里只讲在 mac 上安装和使用。

### MAME

![main-window](/images/mame/main_window.png)

MAME 是模拟器历史上最优秀的多机种的街机模拟器之一，同时也是生命力最旺盛的街机模拟器。从 1997年2月5日发布第一个版本起，MAME 已经经历了数年的开发，同时也经历了各种版本及多个开发者的变迁。作为功能最强大的街机模拟器，覆盖面涵盖许多我们熟悉的街机机板，同时也支持各种不同的 PC 操作平台，并针对不同的 CPU 处理器开发了对应的优化版本。

#### 安装

MAME 在 mac 上有多种版本，这里推荐 [MAME OS X](http://mameosx.sourceforge.net/)，进入官网直接下载安装即可。

### 运行准备

MAME OS X 安装好之后，界面中已经有了所有的游戏列表，但是此时还是不能玩，因为没有 ROM，需要手动安装 BOIS 及 ROM 后才能运行游戏。

1.  配置 ROMs 目录

    在配置页面设置 General -> ROM Directory 配置， 指定用于存放游戏 ROM 以及 BOIS 文件：

    ![roms_dir](/images/mame/roms_dir.png)

2.  配置图像设置

    在设置页面 Video 标签下设置 Rendering Options: OpenGL + MAME 渲染。

    ![video_setting](/images/mame/video_setting.png)

3.  下载 BOIS 文件

    去 [http://www.planetemu.net/roms/mame-bios-pack](http://www.planetemu.net/roms/mame-bios-pack) 下载 BOIS 文件，下载下来是一个压缩包，解压后有 n 多个小的压缩包，这些小的压缩包就是 BOIS 内核，不要在继续逐个解压了，把这些 BOIS 压缩包拷贝到上一步设定的 ROMs 文件夹内即可。

4.  下载游戏

    在 [http://www.planetemu.net/roms/mame-roms](http://www.planetemu.net/roms/mame-roms) 找到你想下载的游戏，下载游戏压缩包，拷贝至 ROMs 目录下，进入 MAME OS X 列表，选中你刚才下载的游戏，点击菜单栏 File -> Audit Selected Games 来检查你下载的游戏，检查完毕后，双击运行即可。

5.  设置按键

    MAME 在程序的设置菜单中是无法设置游戏按键的，得进入游戏后，按 TAB 键开启设置菜单，然后在设置游戏按键。

完成，可以愉快的体验而是游戏厅的游戏了。

![Metal_Slug](/images/mame/Metal_Slug.png)
