# README

**准备工作**

全局安装 hexo

```bash
$ npm i hexo -g
```

安装项目依赖

```bash
$ npm i
```

**开始写作**

```bash
$ hexo new [layout] <title>
```

layout 默认为 post, 可以不写。

示例：

```bash
$ hexo new '如何用hexo搭建博客'
```

**注意事项**

类别：新建博客类别时，先参看已有的[分类](http://guyunxiang.me/categories/)，避免相似不同名的分类出现

标签：同上，先参看已有[标签](http://guyunxiang.me/tags/)，如果新增标签，英文标签小写

**调试**

终端博客目录下运行：

```bash
$ hexo server
或
$ hexo s
```

以纯静态页面运行调试：

```bash
$ hexo server -s
```

指定端口：

```bash
$ hexo server -p 5000
```

生成静态页面文件：

```bash
$ hexo generate
或
$ hexo g
```

监听变更，自动生成静态文件：

```bash
$ hexo generate --watch
```
