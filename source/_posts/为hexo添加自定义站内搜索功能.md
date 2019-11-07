---
title: 为hexo添加自定义站内搜索功能
date: 2017-10-26 14:59:33
categories: 技术探讨
tags:
- hexo
keywords: [hexo, hexo-generator-search, hexo-generator-json-content, 自定义搜索, 站内搜索, 搜索功能]
typora-root-url: ../
---
> Hexo 是一个快速、简洁且高效的博客框架。Hexo 使用 Markdown（或其他渲染引擎）解析文章，在几秒内，即可利用靓丽的主题生成静态网页。

因为 Hexo 是纯静态的博客框架，所以想要在自己的 Hexo 博客实现站内搜索有以下两种途径：

### 1. 站内搜索工具

可以使用 Google 站内搜索或者百度站内搜索，也可以使用 Swiftype 或 tinysou。

优点：功能强大，搜索准确，不需要做太多的事，只要配置好即可。

缺点：样式可能与博客的主题不契合，颜值上差点，且有申请条件限制。

我这里主要介绍添加自定义的站内搜索，所以就不介绍站内搜索工具了，具体如何接入，可以上网搜索下相关文章。

### 2. 自定义的站内搜索工具

Hexo 官网的插件库中有提供两个插件可以用来为我们的自定义搜索提供帮助，分别是：

[hexo-generator-json-content](https://github.com/alexbruno/hexo-generator-json-content)

[hexo-generator-search](https://github.com/PaicHyperionDev/hexo-generator-search)

这两个插件分别可以在使用 Hexo generate 打包的时候，在 public 目录下生成 content.json 或 search.json 文件，这两个文件会包含项目中所有的博客页面信息，用以在自定义搜索时匹配想要搜索的文章。

优点：自己动手，丰衣足食，可以根据自己的需求来做，样式也是自己设计，与博客最契合。

缺点：需要自己写搜索匹配和渲染列表的代码，因为是纯前端实现，没有服务端的处理，对语义的分词处理不行，无法做到精准搜索真正想搜的文章。

尽管自定义站内搜索有这个很致命的问题，但是我还是要介绍如何实现它。

### hexo-generator-json-content

**1. 前置准备**

安装插件

```bash
$ npm i hexo-generator-json-content --save
```

安装完成后，需要对 `_config.yml` 进行配置，我的配置如下：

```yml
# hexo-generator-json-content
jsonContent:
  meta:             false
  keywords:         false   # 暂时没用上，后面会用起来
  dateFormat:       'YYYY-MM-DD'
  pages:            false   # 因为我仅对文章进行搜索，不搜页面，所以 pages 为 false
  posts:
    title:          true    # 文章的标题
    slug:           false
    date:           true    # 文章的日期
    updated:        false
    comments:       false
    path:           true    # 文章的相对路径
    link:           false
    permalink:      false
    excerpt:        false
    keywords:       false
    text:           true    # 文章的内容（仅文字部分，非 markdown 源码）
    raw:            false
    content:        false
    categories:     false   # 因为我的博客已经有分类页面了，所以没必要再搜分类，设置 false
    tags:           false   # 同上
```
> 具体配置项说明，见[这里](https://github.com/alexbruno/hexo-generator-json-content)

以上，便完成了最基本的配置，在博客目录下运行 `hexo generate` 便会生成所有文章数据的 content.json 文件。

看下根据以上配置，生成 content.json 其中一篇文章的内容：

```JavaScript
[{
  "title": "git配置多个ssh-key",
  "date": "2017-09-15",
  "path": "2017/09/15/git配置多个ssh-key/",
  "text": "许多 Git 服务器都使用 SSH 公钥进行认证。。此处省略 n 多个字"
}]
```
根据 title 和 text 便可以通过用户输入的内容进行匹配相应的文章，date 标识文章的日期，path 用以跳转文章页面。这四条基本数据是最基本的搜索要求了。

hexo-generator-search 功能和 hexo-generator-json-content 类似，只是生成字段少，没 hexo-generator-json-content 强大。

**2. 实现搜索功能**

在首页添加搜索框，搜索按钮，获取用户输入的内容。为自己的 Hexo 博客添加搜索结果页面，这里需要对自己博客主题的源码进行修改。

> 注：因为每个主题代码布局不一样，这里不具体介绍怎么为自己的博客添加页面了，大致的流程就是 hexo new page, 然后在主题的源码里为这个 page 添加相应的布局代码

因为搜索功能时候需要交互的操作，所以 Hexo 一开始生成的只是一个空白的搜索结果页而已，需要在 js 匹配到结果后，再渲染到这个页面上。

添加搜索框，完善样式：

```jade
// themes/<theme-name>/layout/partial/nav.jade
...
.search
  input(id="search-input" type="text" placeholder="标题或内容" maxlength="100")
  i.fa.fa-search
...
```

效果：

![](/images/article/WX20171026-165642.png)

未搜索框添加功能：

```JavaScript
// themes/<theme-name>/source/js/index.js
$('#search-input').on('keypress', function(e){
  if (e.keyCode == 13) {
    handleSearch($(this).val());
  }
});

$('.search .fa.fa-search').on('click', function(){
  handleSearch($('#search-input').val());
});

function handleSearch(value) {
  if (value) {
    window.location.href = '/search/?w='+ value.trim();
  }
}
```

到这里，在输入框中要搜索的内容，按回车或者点搜索按钮即可触发页面的跳转，跳转到预定的 /search 页面。以参数的形式拼在 URL 后面。

跳转到搜索页面后，触发搜索匹配的逻辑：

```JavaScript
// themes/<theme-name>/source/js/index.js
var url = window.location.href;

// 判断是否是搜索页面
if (url.indexOf('search') > -1) {
  var searchVal = getKeyword();
  var resultList = [];
  if (!searchVal) { window.location.href = '/'; }
  $.get('../content.json', function(data) {
    data.forEach(function(item) {
      if (
        item.title.indexOf(searchVal) > -1 ||
        item.text.indexOf(searchVal) > -1
      ) {
        resultList.push(item);
      }
    });
    renderResultList(resultList);
  });
}

// 判断是否存在搜索关键字
function getKeyword() {
  var searchVal = decodeURIComponent(url.split('w=')[1]);
  if (url.indexOf('w=') < 0) { return null; }
  if (searchVal === '') { return null; }
  return searchVal;
}

// 渲染结果列表
function renderResultList(dataList) {
  var templateHtml = '<ul class="listing">';
  if (dataList.length) {
    dataList.forEach(function(item) {
      templateHtml +=
        '<div class="listing-item">' +
          '<div class="list-post">' +
            '<a href="/'+ item.path +'" title="'+ item.title +'">' +
              item.title +
            '</a>' +
            '<div class="post-time">' +
              '<span class="date">' +
                item.date +
              '</span>' +
            '</div>' +
          '</div>' +
        '</div>';
    });
  } else {
    templateHtml += '<p>返回首页重新搜索，<a href="/">点我</a></p>';
  }
  templateHtml += '</ul>';
  $('.post-information > .meta > .info').append('本次共搜索到 ' + dataList.length + ' 条结果');
  $('.search-content').html(templateHtml);
}
```
效果：

![](/images/article/WX20171026-173307.png)

以上，便完成了基本的自定义站内搜索功能，高端大气上档次，低调奢华有内涵。但是还有很多需要改进的地方，这里先列出来，后续优化掉。

---

### 待优化功能：

1.搜索分词的处理，提高搜索的精确度，现在是最简单的字符串精确匹配且区分大小写，但有时候搜索的内容并不能精确表意，比如 ssh-key，搜 sshkey 则搜不到。

2.渲染结果列表展示匹配到的内容，就像百度一样，搜索的结果又标题跟内容，在内容中高亮匹配到的内容，清晰了然，目前还仅仅只是展示了匹配到的文章标题。

---

**更新于2017年11月06日**

1.搜索分词的优化，通过调整部分 `hexo-generator-json-content` 源码，在文章中添加 keywords 关键字，使之在生成 content.json 时包含我指定的 keywords，来手动分词可能被搜索的内容，达到搜索的准确性提高。

2.渲染结果已高亮匹配的关键字，并从文章中包含关键字的位置截取部分内容作为概述展示在搜索结果中，调整了搜索结果列表页的样式。

![](/images/article/WX20171106-164813.png)

未完待续...
