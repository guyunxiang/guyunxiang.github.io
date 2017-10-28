---
title: 为hexo添加评论功能
date: 2017-10-28 21:54:33
categories: 技术探讨
tags:
- hexo
---
> Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

通常情况下，Hexo 的主题都自带一到两种评论插件集成进去，比如国内的多说（已关闭）、友言、畅言等，国外的比较有名的像 Disqus 。

接入方法通常也很简单，在主题的 `_config.yml` 文件中配置下即可，例如我的主题配置文件：

```yml
# Comment
duoshuo:
disqus:
```

在配置项里设置自己对应平台的 ID 即可。

这里主要想介绍下其他的评论插件接入，依赖于 github issue 的 [gitment](https://github.com/imsun/gitment) 以及在 gitment 上进行改进优化的 [gitalk](https://github.com/gitalk/gitalk)。

因为这两款插件都以 github issue 来管理评论，而我们的 Hexo 也正好部署在 github 上，更加利于统一管理。
