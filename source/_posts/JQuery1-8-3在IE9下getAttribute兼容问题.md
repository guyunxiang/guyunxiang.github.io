---
title: JQuery1.8.3在IE9下getAttribute兼容问题
date: 2014-12-05 11:00:06
categories: 前端技术
tags:
- JavaScript
- JQuery
---
jQuery 1.8.3 在 IE9 下 attr 报错问题

jQuery 1.8.3 在 IE9 中 attr 方法保存。

解决方案如下：

```javascript
r = e.getAttribute(n);
```

修改为：

```javascript
r = e.getAttribute ? e.getAttribute(n) : null;
```

根据不同版本修改的行数不一样，依实际情况而定
