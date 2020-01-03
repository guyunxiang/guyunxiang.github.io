---
title: 饥荒联机版搭建 Ubuntu 专用服务器
date: 2018-12-27 14:45:37
categories: 游戏攻略
tags:
- steam
- 饥荒联机版
typora-root-url: ../
---
> 前言：最近小伙伴趁着 steam 活动入手了饥荒联机版，于是商量着大家一起没事玩玩饥荒，建建家园，所以考虑建一个属于我们自己的专用服务器。

### 准备工作

- 一个正版饥荒联机版（建服务器要验证 token，防盗版）
- 一台云服务器（阿里云、腾讯云啥的都OK）

> 备注：
> 服务器我选择的是 Ubuntu 版本，Linux 系统服务器好处不用多说了，配置用的是 1核 2G内存，镜像是 Ubuntu 16.04，饥荒服务端还是有点吃内存的，建议 2G 内存，性能足够了。CPU 我跑了半天，平均也就 20% 左右，不过在人多的时候，以及有 n 多蜜蜂或下青蛙雨的时候不确定 1核 够不够。
> 阿里云还是腾讯云或者其他云，那个便宜用哪个。

### 客户端工作

#### 一、创建服务端世界

专用服务器就是跑在服务端的一个饥荒世界，所以需要先创建一个世界，这个在本机就能直接创建

![create_dst_world](/images/steam/create_dst_world.png)

在这里设置世界的名称以及描述，选择公共，设置密码等，以及对这个世界的其他定制等等，设置完成后，点击创建，不用进入游戏，退出即可。

> 名称：创建完成之后，在饥荒联机版用来搜索该服务器的名称
> 描述：添加备注，方便大家确认是否是属于我们的世界。
> 密码：方便仅属于我们几个小伙伴才能进入

至此，这个即将运行在服务器上的世界创建完成了。

#### 二、获取饥荒世界创建文件

MacOS目录位置：‎⁨Macintosh HD⁩ ▸ ⁨用户⁩ ▸ you_name ▸ ⁨文稿⁩ ▸ ⁨Klei⁩ ▸ DoNotStarveTogether
Windows目录位置：C:\Users\你的用户名\Documents\Klei\DoNotStarveTogether

![dst_world_dir](/images/steam/dst_world_dir.png)

Cluster_1 就是刚才建立的世界，_1 表示是本地创建的第一个世界。

#### 三、获取个人 ID 以及授权 token

打开饥荒，在左下角菜单下方找到账户信息，点击会打开账户信息页面。

![dst_account](/images/steam/dst_account.png)

打开账户信息页，KLEI 用户 ID 就是你的 ID 了，保存你的 ID 到 `adminlist.txt` 文件中，保存到 `Cluster_1` 目录下。

![dst_account_id](/images/steam/dst_account_id.png)

然后点击导航栏，游戏

![dst_account_games](/images/steam/dst_account_games.png)

找到 Don't Starve Together ，点击服务器按钮，进入到服务器页面，获取你的服务器授权 Token。

![dst_account_token](/images/steam/dst_account_token.png)

保存你的 token 到 `cluster_token.txt` 文件中，保存到 `Cluster_1` 目录下。

至此，你的 Cluster_1 目录下应该包含如下内容：

![dst_world_dir2](/images/steam/dst_world_dir2.png)

> 说明：
> Master 对应地上世界设置
> Caves 对应地下世界设置

OK，到这里，客户端这边做的事情已经准备完了，接下来就是配置服务端了。

- - -

### 服务端工作

#### 一、环境准备

登陆上服务器只有，运行安装依赖：

```bash
$ sudo apt-get install libstdc++6:i386 libgcc1:i386 libcurl4-gnutls-dev:i386 lib32gcc1
```

> 备注： 如果是 Ubuntu 64 位系统安装 i386 的包可能会有异常，报找不到某个包，先运行 `sudo dpkg --add-architecture i386 && sudo apt-get update` 命令，然后再安装。

创建 steamcmd 目录，安装 steamcmd 工具：

```bash
$ mkdir ~/steamcmd
$ cd ~/steamcmd
$ wget https://steamcdn-a.akamaihd.net/client/installer/steamcmd_linux.tar.gz
$ tar -xvzf steamcmd_linux.tar.gz
```

进入 steamcmd 命令行模式，安装饥荒服务端：

```bash
$ ./steamcmd.sh
```

使用匿名账户登录，并安装饥荒到 /dst 目录下，完成后退出：

```bash
$ login anonymous
$ force_install_dir ../dst
$ app_update 343050 validate
$ quit
```

#### 二、创建服务端饥荒

拷贝刚才在本地创建的饥荒世界文件到服务端 `./klei/DoNotStarveTogether` 目录下，拷贝方式有很多，例如 FTP 文件传输工具，或者使用 scp 命令。

例如使用 scp 命令，本地运行：

```bash
$ scp -r ~/Documents/⁨Klei⁩/⁨DoNotStarveTogether⁩/Cluster_1 root@你的服务器:.⁨Klei⁩/⁨DoNotStarveTogether⁩/
```

把本地创建的饥荒世界文件拷贝到服务器对应目录下。

#### 三、打服务器 Mod

修复饥荒服务端 Mod 配置文件：

```bash
$ vim ~/dst/mods/dedicated_server_mods_setup.lua
```
在最后一行添加你想要打的补丁代码，数字是 Mod 的 ID：

```bash
# /dst/mods/dedicated_server_mods_setup.lus
...
ServerModSetup("378160973")

```

起服务时饥荒便会自动把这些 Mod 下载下来，改完如下：

![dst_server_mod](/images/steam/dst_server_mod.png)

> Mod 在哪找?看下图：
> ![dst_mod_id](/images/steam/dst_mod_id.png)
> 关于每一个 mod 如何配置：
> 在客户端部分创建世界的时候，你可以配置你的服务端 Mod，启用并修改它们的选项，然后在 Master/Caves 文件下有一个 `modoverrides.lua` 文件，便是你 mod 的配置文件，把这两个文件替换掉服务端对应文件即可。


#### 四、运行服务器

利用 screen 命令启动一个新窗口，以便后台运行：

```bash
$ screen -s DST
```

> 提示：如果没有 screen 命令，需要先安装，sudo apt-get install screen

启动饥荒服务端程序：

```bash
$ cd /dst/bin/
$ ./dontstarvetogether_dedicated_server
```

> 退出当前窗口，运行 `ctrl + A + D`
> 查看 screen 列表，运行的进程 `screen -ls`
> 停止 screen 进程 `screen -X -S 进程id quit`，进程 ID 可以在查看进程列表中看到

至此，搭建饥荒联机版专用服务器就完成了。进入饥荒，浏览世界，搜索你刚才建立的世界，应该就能找到了。

![dst_world_server](/images/steam/dst_world_server.jpeg)

- - -

无 Mod 不饥荒，推荐几个 Mod:

#### 服务端 Mod

![Global Positions](https://steamuserimages-a.akamaihd.net/ugc/535134943326895647/0FF32BFCBDF3CDAFD88373F2D76C9DDE50D8C090/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true)

[Global Positions](https://steamcommunity.com/sharedfiles/filedetails/?id=378160973)：全球定位系统，可以在地图看到别的小伙伴，非常实用！推荐！ID：378160973

![Health Info](https://steamuserimages-a.akamaihd.net/ugc/27366287301149683/3B7BE389207B0A020F6935F85477409D50E0FFF0/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true)

[Health Info](https://steamcommunity.com/sharedfiles/filedetails/?id=375859599)：显示怪物的生命值，知己知彼方可百战不殆。ID：375859599

#### 客户端 Mod

![Combined Status](https://steamuserimages-a.akamaihd.net/ugc/539643766794230713/9486F35BE935DC54F2A7D1216F725E0444A46C33/?imw=268&imh=268&ima=fit&impolicy=Letterbox&imcolor=%23000000&letterbox=true)

[Combined Status](https://steamcommunity.com/sharedfiles/filedetails/?id=376333686)：显示状态信息，非常实用！客户端 Mod 首推！ID：376333686

饥荒的 Mod 非常多，这里只列了几个我觉得非常实用的 Mod，还有很多非常有意思的 Mod，就不一一列举了。依据个人喜好安装。
