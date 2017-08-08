---
title: React组件间通讯
date: 2017-04-07 11:35:28
categories: 前端技术
tags:
- javascript
- react
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
上级的props和state改变，会导致子组件的生命周期改变。

### 子组件向父组件通讯

子组件向父组件通讯仍然可以通过props进行，以回调函数的形式进行数据交互，父组件讲一个函数以props传递给组数据。参数为子组件传递过来的数据，子组件出发通讯时，调用父组件props方法，把数据作为参数传过去，触发由子组件向父组件的通讯。

父组件
```javascript
import Child from './Child';
class Parent extends React.Component {
  render () {
    return (
      <Child
        onChange={(name) => {
          console.log(name);
        }}
      />
    )
  }
}
```
子组件
```javascript
class Child extends React.Component {
  handleChange(e) {
    this.props.onChange(e.target.value);
  }
  render() {
    <div>
      <input type="text" onChange={this.handleChange.bind(this)}>
    </div>
  }
}
```

上面例子可以看出，子组件中input出发onchange事件时，调用父组件传递的onChange方法，并且把值传递过去，实现子组件向父组件的通讯。

### 兄弟组件间通讯

两个组件之间没有联系，但有相同的父组件之间通讯，这里整合了父组件向子组件通讯以及子组件向父组件通讯的方法，其中一个组件向共同的父组件进行通讯，然后父组件再向对应的子组件进行通讯实现兄弟组件间的数据通讯。

```javascript
import Child1 from './Child1';
import Child2 from './Child2';

class Parent extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      message: ''
    };
  }

  handleChange(value) {
    this.setState({
      message: value
    });
  }

  render() {
    return (
      <div>
        <Child1 onChange={this.handleChange.bind(this)} />
        <Child2 msg={this.state.message} />
      </div>
    );
  }
}
```
Child1组件
```javascript
class Child1 extends React.Component {

  constructor(props) {
    super(props);
  }

  handleChange(e) {
    console.log(e.target.value);
    this.props.onChange(e.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}
```
Child2组件
```javascript
class Child2 extends React.Component {
  render() {
    return (
      <div>
        { this.props.msg }
      </div>
    );
  }
}
```

以上例子，Child1的inputonChange事件会将message传递给Parent组件，Parent收到message后，更新state，再传递给Child2，实现兄弟组件之间的通讯。

### 其他方式实现组件间通讯

#### Flux 和 Redux

[Flux](https://github.com/facebook/flux) 是 Facebook 推出的一种应用架构方案，用以组织代码，安排内部逻辑，是项目更便于开发和维护。

[Redux](http://redux.js.org/) 是 JavaScript 状态容器，提供可预测化得状态管理。可以让你构建一致化的应用，运行于不同的环境，并且易于测试。

#### 观察者模式

观察者模式也叫做***发布者-订阅者模式***，发布者发布事件，订阅者监听事件并作出反应。

> Redux 内部的实现，其实也是基于观察者模式的，reducer 的调用结果，存储在 store 内部的 state 中，并在每一次 reducer 的调用中并作为参数传入。

同样是兄弟组件之间通讯，用观察者模式进行改造，如下：

```javascript
class Parent extends React.Component {
  render() {
    return (
      <div>
        <Child1 />
        <Child2 />
      </div>
    );
  }
}
```
Child1组件
```javascript
import eventProxy from './eventProxy';

class Child1 extends React.Component {
  handleChange(e) {
    eventProxy.trigger('msg', e.target.value);
  }

  render() {
    return (
      <div>
        <input type="text" onChange={this.handleChange.bind(this)}/>
      </div>
    );
  }
}
```
Child2组件
```javascript
class Child2 extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      msg: ''
    };
  }

  componentDidMount() {
    eventProxy.on('msg', (msg) => {
      this.setState({
        msg
      });
    });
  }

  render() {
    return (
      <div>
        { this.state.msg }
      </div>
    );
  }
}
```

以上，同样可以实现兄弟组件之间的通讯，是不是很方便？！

来看看神奇的 eventProxy 源码：

```javascript
export default {
  onObj: {},
  oneObj: {},
  on: function(key, fn) {
    if(this.onObj[key] === undefined) {
      this.onObj[key] = [];
    }

    this.onObj[key].push(fn);
  },
  one: function(key, fn) {
    if(this.oneObj[key] === undefined) {
      this.oneObj[key] = [];
    }

    this.oneObj[key].push(fn);
  },
  off: function(key) {
    this.onObj[key] = [];
    this.oneObj[key] = [];
  },
  trigger: function() {
    let key, args;
    if(arguments.length == 0) {
      return false;
    }
    key = arguments[0];
    args = [].concat(Array.prototype.slice.call(arguments, 1));

    if(this.onObj[key] !== undefined
      && this.onObj[key].length > 0) {
      for(let i in this.onObj[key]) {
        this.onObj[key][i].apply(null, args);
      }
    }
    if(this.oneObj[key] !== undefined
      && this.oneObj[key].length > 0) {
      for(let i in this.oneObj[key]) {
        this.oneObj[key][i].apply(null, args);
        this.oneObj[key][i] = undefined;
      }
      this.oneObj[key] = [];
    }
  }
};
```

eventProxy中，总共有 on, one, off, trigger这4个函数：

*   on, one: 用于订阅者监听相应的事件，并将事件相应时的函数作为参数，on 与 one 的唯一区别就是，one 只会触发一次，on 是每次都会触发。
*   off: 用于解除所有订阅了某个事件的所有函数
*   trigger: 用于发布者发布事件，将除第一参数（事件名）的其他参数，作为新的参数，触发使用 on 与 one 进行订阅的函数。
