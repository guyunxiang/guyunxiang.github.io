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

对比第三方评论插件：

优点：与 github 集成，项目与评论在一起，统一管理，不用额外注册平台账号。

缺点：评论以文章为 issue，即每一个文章页面就得有一个评论的 issue，文章多了以后，issue 也就多了，不太方便；只有项目的所有者才能建 issue，这意味着所有的评论都需要你自己初始化一遍，如果没有初始化，别人是不能评论的；评论功能有限，想要丰富评论效果则不行。

**接入gitalk**

在配置项中加入 gitalk 配置文件：

```yml
# themes/_config.yml

# Comment
duoshuo:
disqus:
gitalk:
  enable: true
  owner: 'github repo owner'
  repo: 'github repo name'
  ClientID: 'your ClientID'
  ClientSecret: 'your ClientSecret'
```

引入样式：

```jade
// head.jade
link(rel="stylesheet", href= url_for('css/gitalk.css'))
```

添加评论代码：

```jade
// comments.jade

if theme.gitalk.enable
  #gitalk-container
  script(src= url_for('js/gitalk.min.js'))
  script.
    (function(){
      var gitalk = new Gitalk({
        clientID: '#{theme.gitalk.ClientID}',
        clientSecret: '#{theme.gitalk.ClientSecret}',
        repo: '#{theme.gitalk.repo}',
        owner: '#{theme.gitalk.owner}',
      });
      gitalk.render('gitalk-container')
    })();
```

以上，便完成了 gitalk 的接入，注意，gitalk 的接入在本地是无法验证的，我记得 gitment 能在本地验证的，所有需要部署到 github 上来查看是否接入完成， 再根据自己的喜好对样式进行适当调整即可。

gitment 接入跟 gitalk 接入一样。

**gitment 跟 gitalk 如何选择**

两者在功能上相同，都是基于 github issue 的评论插件，安装方式也基本相同，gitalk 后来于 gitment，可以兼容 gitment 的评论，我一开始也是接入 gitment，似乎 gitment 的作者已经弃坑了，且无法兼容移动端，所以找到了 gitalk，gitalk 在样式稍显活力，gitment 更加简约，gitalk 可以快速的回复别人，gitment 则不行，所以，建议是选择 gitalk。

**自动初始化所有评论**

有位朋友位这两个写了个 ruby 的脚本，根据 sitemap 或自定义URL名单自动初始化所有的评论，有兴趣的可以去看看，方便初始化评论 issue
