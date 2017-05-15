---
title: Win7启动修复
date: 2013-05-09 00:19:46
categories: 技术探讨
tags: 操作系统
---
### Ubuntu删除后进入grub rescue的情况


起因：装了win7，然后在另一个分区里装了Ubuntu。后来格掉了Ubuntu所在的分区。

系统启动后出现命令窗口：

```bash
$ grub rescue：_
```

正确的解决方式：

1.光驱插入win7安装盘或者用USB启动（win7支持USB直接启动安装）：

2.选择完语言后，进入下一步，选择底下的修复而不是继续安装；

3.搜索完已经安装的系统后，进入下一步；

4.不要让Windows自动修复，没用的，进入命令提示符模式；

5.依次键入

```bash
$ bootrec /fixmbr
$ bootrec /fixboot
```

6.重新启动系统即可重新恢复Windows7启动模式。
