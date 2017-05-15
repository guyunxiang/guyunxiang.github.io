---
title: grunt的自动刷新
date: 2014-11-19 17:19:33
categories: 前端技术
tags: grunt
---
grunt很强大，可以帮我我们解决很多繁琐的操作，虽然刚接触不久，但依然感受到其强大之处，这篇记录一下通过grunt.js实现事实刷新页面，

省去了编码 -> 保存 -> F5..F5..F5..F5...n多个F5操作。

首先看下项目目录：

![](/images/frontend/grunt_tree.png)

然后来看package.json配置：

```json
{
  "name":"grunt-connect",
  "version":"0.1.0",
  "devDependencies":{
    "grunt":"~0.4.1",
    "grunt-contrib-connect":"~0.6.0",
    "grunt-contrib-watch":"~0.5.3"
  }
}
```
这里只用到两个，connect+watch。因为平时写小东西用不到WebStorm等那些的大家伙，sublime就很好用了，所以，为了自动刷新，用connect配置一个server.具体根据个人需要删减，然后通过watch实时监听文件变化，以此达到实时刷新的效果。

然后到对应目录下执行：

```bash
$ npm install
```

完成插件的安装。

来看Gruntfile.js配置代码：

```javascript
module.exports = function(grunt) {
  // 项目配置(任务配置)
  grunt.initConfig({
    pkg: grunt.file.readJSON('package.json'),
    // 通过connect配置一个server
    connect:{
      server:{
        options:{
          // 设置端口号
          port:9009,
          hostname:'localhost',
          livereload:true
        }
      }
    },
    // 通过watch实时监听代码变化
    watch: {
      client: {
        //监听的文件
        files: ['view/*', 'css/*', 'js/*', 'images/**/*'],
        options: {
          livereload: true
        }
      }
    }
  });

  // 加载插件
  grunt.loadNpmTasks('grunt-contrib-connect');
  grunt.loadNpmTasks('grunt-contrib-watch');

  // 自定义任务
  grunt.registerTask('default', ['connect','watch']);

};
```

ok！到这，grunt就配置完成了，

在cmd中运行：grunt 就可以运行了

![](/images/frontend/grunt_default.png)

出现以上效果就说明成功了。

在chrome中输入：localhost:9009，就会看见我们的项目了。

然后还有剩下的一部分，就是在chrome中安装livereload插件：

在chrome设置 -> 更多工具 -> 扩展程序中

![](/images/frontend/grunt_tree_more.png)

点击获取更多扩展程序，（一般情况下，获取更多扩展程序会被墙的，所以打不开，需要大家自己解决了）然后搜索livereload，安装

![](/images/frontend/grunt_livereload.png)

安装后，在chrome右上角会有一个小图标，空心的时候表示没有运行，点击一下后，中间的圆圈会变成实心，这个时候就可以实现自动刷新了。
