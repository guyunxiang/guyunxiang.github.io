---
title: HTML5调用手机相机拍照
date: 2015-09-11 11:55:23
categories: 前端技术
tags:
- html5
---

### 前端调用手机相机拍照

实现方式常见有两种：

一种是通过video控件，通过捕获video的流，截取video中的图像实现拍照，

还有一种是通过 input[type='file'] 控件调用移动端的摄像头，实现拍照。

两种方法各有利弊，第一种可以实现对拍照界面的重写（比如添加拍照界面的遮罩层提示框等）

但是，第一种方式在 iPhone 环境下不兼容，不能使用。

第二种方式实际上是调用input[type='file']，会弹出一个选择框让用户选择是调用相机还是调用相册，

好处就是兼容优于上一种，不好的地方就是这种方法无法控制拍照，想要在移动端实现只能拍照不能选择照片或者在拍照界面添加引导遮罩层的方法是行不通了。

这里说一下第二种方式的实现方式：

首先在页面上添加一个input控件实现调用相机。

```html
<input id="takepicture" type="file" accept="image/*" capture="camera" style="display: none">
```

自定义方式调用相机：

```javascript
var takePictureOnclick = function(){
  var takePicture = document.getElementById('takepicture');
  ... // 添加需要处理的代码
  takePicture.click();
}
```

然后在 js 中添加对这个 input 的 onchange 事件，监听拍完照之后获取照片的流。

```javascript
// 监听照片拍摄,并获取照片流
var takePicture = document.getElementById('takepicture');
var takePictureUrl = function () {
  takePicture.onchange = function (event) {
    var files = event.target.files, file;
    if (files && files.length > 0) {
      file = files[0];
      try {
        var URL = window.URL || window.webkitURL;
        var blob = URL.createObjectURL(file);　　// 获取照片的文件流
        compressPicture(blob);　　// 压缩照片
      }
      catch (e) {
        try {
          var fileReader = new FileReader();
          fileReader.onload = function (event) {　　　　// 获取照片的base64编码
            compressPicture(event.target.result);　　// 压缩照片
          };
          fileReader.readAsDataURL(file);
        }
        catch (e) {
          alert(common.MESSAGE.title.error, '拍照失败,请联系客服或尝试更换手机再试!');
        }
      }
    }
  }
}();
```

这个 onchange 方法中，通过两种方式捕获用户拍照完之后的照片，第一种是捕获照片的文件流（存在一定兼容性问题），如果第一种方式不兼容则使用第二种方式获取照片的base64编码（这种方式兼容性较高），保险一点，两种方式都是用。

以上，就完成了前端的调用相机并拍照的功能。

---

### 前端照片压缩处理

前端的照片压缩没有什么好的解决方案。目前有的是通过canvas的两个API实现照片的压缩处理。

解决兼容性需要用到两个插件：

[点击这里](https://github.com/guyunxiang/html_compress/tree/master/lib)

实现代码：

```javascript
var compressPicture = function (blob) {
  var quality = 0.5, image = new Image();
  image.src = blob;
  image.onload = function () {
    var that = this;
    // 生成比例
    var width = that.width, height = that.height;
    width = width / 4;
    height = height / 4;
    // 生成canvas画板
    var canvas = document.createElement('canvas');
    var ctx = canvas.getContext('2d');
    canvas.width = width;
    canvas.height = height;
    ctx.drawImage(that, 0, 0, width, height);
    // 生成base64,兼容修复移动设备需要引入mobileBUGFix.js
    var imgurl = canvas.toDataURL('image/jpeg', quality);
    // 修复IOS兼容问题
    if (navigator.userAgent.match(/iphone/i)) {
      var mpImg = new MegaPixImage(image);
      mpImg.render(canvas, {
        maxWidth: width,
        maxHeight: height,
        quality: quality
      });
      imgurl = canvas.toDataURL('image/jpeg', quality);
    }
    // 上传照片
    uploadPicture(imgurl);
  };
};
```
