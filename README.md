# vue-mosaic

Vue模块，用于在应用程序中对元素进行打码。该项目的一些值得注意的目标包括：

- 重量轻、易于使用
- 处理任何图像类型
- 支持Vue 3.0

# Tips

请使用最新版本`0.0.8`, 请勿使用更低版本，低版本为不稳定测试版

请使用最新版本`0.0.8`, 请勿使用更低版本，低版本为不稳定测试版

请使用最新版本`0.0.8`, 请勿使用更低版本，低版本为不稳定测试版

# Table of Contents

- [Demo](#Demo)
- [Requirements](#Requirements)
- [Installation](#Installation)

    - [文字打码](#1、文字打码)

    - [图片打码](#2、图片打码)

    - [懒加载](#3、懒加载)
- [Authors && Contributors](#Authors && Contributors)
- [License](#license)

# Demo

[Demo](http://dokidokis.gitee.io/vue-mosaic-demo/#/vm-pure-test)

# Requirements

vue 3.X

# Installation

```
$ npm install @kidoki/vue-mosaic
```

```js
// main.js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mosaic from '@kidoki/vue-mosaic'

createApp(App).use(store).use(router).use(mosaic).mount('#app')
```

### 1、文字打码

>  仅填入文字 则默认为普通马赛克

```html
<vm-pure text="这是一段文字" />

<!-- 允许通过插槽插入文字 , 插槽插入内容优先于属性text -->
<vm-pure>这是一段文字</vm-pure>
```

属性说明：

| 属性名      | 说明               | 备注                                                         |
| ----------- | ------------------ | ------------------------------------------------------------ |
| text        | 填入一段文字       |                                                              |
| color       | 马赛克颜色         | 不填写颜色则为普通马赛克                                     |
| onoff       | 是否进行打码       | 默认值是 true                                                |
| width       | 控制打码后的长度   | 默认为文字长度，不写单位则默认单位为 px                      |
| height      | 控制打码后的高度   | 不写单位则默认单位为 px                                      |
| line-height | 控制文字的行高     | 不写单位则默认单位为 px                                      |
| radius      | 设置打码后圆角弧度 | 预设值：no \ small \ largeround <br/>可填写数值：不写单位则默认单位为 px |

> radius 属性：组件内提供了以下几种预设圆角样式，以供选择
>
> 当然也可以不使用预设样式，属性支持填写具体数值，不写单位则默认单位px
>
> | no   | small | large | round |
> | ---- | ----- | ----- | ----- |
> | 0px  | 2px   | 4px   | 20px  |

### 2、图片打码

基本使用：

```html
<vm-img>
      <img src="/images/imei.webp">
</vm-img>
```



进阶使用：（控制马赛克样式）

```html
<vm-img :option="option" >
      <img src="../../assets/images/imei.webp" />
</vm-img>
```

```js
setup(){
	const option = ref([
		{ resolution: 24 },
		{ shape: 'circle', resolution: 24, size: 24, offset: 24, alpha: 1 }
	])
    return { option }
}
```

可以使用`option参数数组`来控制输出的马赛克效果。参数数组中每一个集合都是一个对象，代表了某种马赛克输出效果。

> 在上面的例子中，第一组参数`{ resolution : 24 }`控制脚本每24像素就画一个大的正方形像素，然后为每一个正方形像素的中心填充一个精确的颜色值。
>
> 第二组参数使用了所有的可用参数：`{ shape : 'circle', resolution : 24, size: 16, offset: 12, alpha: 0.5 }`。和第一组参数一样，它的分辨率是24px，像素的形状是圆形，每一个圆形的大小是16像素，每一个圆形的右边都有12像素的偏移量，最后这个圆形的透明度被设置为50%。
>
> | 参数名     | 说明                                                         |
> | ---------- | ------------------------------------------------------------ |
> | resolution | 被渲染像素之间的距离。必须设定                               |
> | shape      | 像素的形状。可选值：`square`、`circle` 和 `diamond`，默认值：`square`。可选。 |
> | size       | 渲染像素的大小。可选。默认值为`resolution`                   |
> | offset     | 像素之间的偏移值。可选，默认值为0.可以只设置一个值，这时为对角偏移。也可以设置为一个数组或对象：`[ 15, 5 ]`或`{ x: 15, y: 5 }`。 |
> | alpha      | 渲染像素的透明度，可选，默认值为1。                          |
> | maskColor  | 实时修改马赛克样式时为了防止图片暴露，会有一层加载色。该属性用于修改加载色的颜色，默认颜色为#fff |

属性说明：

| 属性名  | 说明                                    | 备注           |
| ------- | --------------------------------------- | -------------- |
| onoff   | 是否进行打码                            | 默认值是 true  |
| pattern | 马赛克图案选择<br/>不填写则为普通马赛克 | 可选值参照下图 |

pattern除了普通的马赛克样式，组件内提供了10种带图案的马赛克样式，以后持续更新

```html
<vm-img pattern="m1" >
      <img src="./images/imei.webp"/>
</vm-img>
```

[![ja8OOI.jpg](https://s1.ax1x.com/2022/07/06/ja8OOI.jpg)](https://imgtu.com/i/ja8OOI)

> 几句吐槽：最初的设想是通过 `<vm-img src="图片地址"/>` 来使用我的插件。不过期间遇到两个问题：
>
> - vue-cli编译时使用require()来解析相对路经。当我们从A组件发送url到B组件，相对路经会被原样输出。即使将相对路经写进require()，require必须使用静态的字符串，不能使用变量，**因为require是编译时执行的，而非运行时执行！**最终导致想法不得实现。
> - 只有同源图片可以使用马赛克效果，根据 [HTML5](http://www.htmleaf.com/html5/) 规范，浏览器在解析`getImageData()`方法时会阻止获取跨浏览器的图片。
> - flag：近期会想办法解决 _(:зゝ∠)_ 



### 3、懒加载

组件支持使用 **[vue-lazyload](https://github.com/hilongjw/vue-lazyload)** 来进行图片懒加载。

```
$ npm i vue-lazyload -S
```

```js
import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import mosaic from '@kidoki/vue-mosaic'
import VueLazyload from 'vue-lazyload'

createApp(App).use(store).use(router).use(mosaic).use(VueLazyload).mount('#app')
```

```html
<vm-img>
       <img v-lazy=" `./images/imei.webp` " >
</vm-img>
```

# Authors && Contributors

- [kidoki](https://github.com/aiyedoki)

# License

[MIT license](https://opensource.org/licenses/MIT)
