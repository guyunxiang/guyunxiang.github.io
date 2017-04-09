---
title: React组件间通讯
date: 2017-04-07 11:35:28
tags: react
---

React开发中难以避免组件之间进行数据通讯，React规定了明确的单项数据流，利用props将数据从父组件传递给自组件。所以，在父与子的组件通讯中，可以很容易的通过props实现。但是，实际开发中不仅仅只有父子关系的组件关联，还会有多种组件关联关系的数据通讯，这里整理几种组件关系下的通讯方式。

### 父组件向子组件通讯

父组件向子组件的通讯是单向的，react提供了props来进行父到子的数据传递。

父组件
```javascript
import Child from './Child';
class Parent extends React.Component {
  render() {
    const msg = 'hello world';
    return (
      <Child msg />
    );
  }
}
```
子组件
```javascript
class Child extends React.Component {
  render() {
    const { msg } = this.props;
    return (
      <div>{msg}</div>
    );
  }
}
```
这个例子可以看出，子组件可以直接调用this.props.msg使用父组件传递进来的数据。

未完待续...
