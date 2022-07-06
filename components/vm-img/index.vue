<template>
  <div v-if="pattern===''" class="vm-img-container">
    <span :class="{mask:maskShow}" :style="{backgroundColor:maskColor}" />
    <slot></slot>
  </div>

  <div v-else class="vm-img-container">
    <span :class="{mask:maskShow}" :style="{backgroundColor:maskColor}" />
    <span class="mask" :class="patternClass" v-if="onoff"></span>
    <slot></slot>
  </div>
</template>

<script>
import '../../close-pixelate.js'
import { onMounted, ref, watch } from 'vue'

export default {
  name: 'vm-img',
  props: {
    // option 传统马赛克样式的选项
    // onoff 是否打开遮罩
    // maskColor 遮罩的颜色
    // pattern 图案马赛克的样式
    option: { default: null },
    onoff: { type: Boolean, default: true },
    maskColor: { type: String, default: '#fff' },
    pattern: { type: String, default: '' }
  },
  setup(props) {
    // 传统马赛克：
    // maskShow 控制遮罩的显示和隐藏
    // onoff: true 代表需要打码和显示遮罩，反之。
    const maskShow = ref(true)
    if (props.pattern === '') {
      if (props.onoff) {
        maskShow.value = true
      } else {
        maskShow.value = false
      }
      // 如果onoff的值为true，
      // 那么页面DOM渲染完毕后要进行打码操作
      // 且打码后关闭遮罩
      onMounted(() => {
        if (props.onoff) {
          const img = document.querySelector('img')
          img.onload = () => {
            img.closePixelate(props.option ? props.option : [{ resolution: 24 }, { shape: 'circle', resolution: 24, size: 24, offset: 24, alpha: 1 }])
            maskShow.value = false
          }
        }
      })
    }

    // 带图案马赛克
    // patternClass 决定选择哪条 'vm-img-container m${number}' css
    const patternClass = ref({})
    if (props.pattern !== '') {
      // onoff 为 true 时代表需要打码和显示遮罩，反之。
      if (props.onoff) {
        maskShow.value = true
      } else {
        maskShow.value = false
      }
    }

    watch(props, () => {
      // 如果当前是普通马赛克 则打开遮罩
      if (props.pattern !== '') {
        maskShow.value = true
      }
      // patternClass 决定显示哪个图案的css, 然后关闭遮罩
      patternClass.value = {
        m1: props.pattern === 'm1',
        m2: props.pattern === 'm2',
        m3: props.pattern === 'm3',
        m4: props.pattern === 'm4',
        m5: props.pattern === 'm5',
        m6: props.pattern === 'm6',
        m7: props.pattern === 'm7',
        m8: props.pattern === 'm8',
        m9: props.pattern === 'm9',
        m10: props.pattern === 'm10'
      }
      // 如果马赛克效果关闭了 则同时关闭遮罩
      if (props.onoff === false) {
        maskShow.value = false
      }
    }, { immediate: true })

    return { maskShow, patternClass }
  }
}
</script>

<style  scoped>
.vm-img-container {
  position: relative;
  display: inline-block;
}
.vm-img-container .mask {
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  position: absolute;
  display: inline-block;
}
.vm-img-container .m1 {
  background: url("../../assets/images/m1.jpg");
}
.vm-img-container .m2 {
  background: url("../../assets/images/m2.jpg");
}
.vm-img-container .m3 {
  background: url("../../assets/images/m3.jpg");
}
.vm-img-container .m4 {
  background: url("../../assets/images/m4.jpg");
}
.vm-img-container .m5 {
  background: url("../../assets/images/m5.jpg");
}
.vm-img-container .m6 {
  background: url("../../assets/images/m6.jpg");
}
.vm-img-container .m7 {
  background: url("../../assets/images/m7.jpg");
}
.vm-img-container .m8 {
  background: url("../../assets/images/m8.jpg");
}
.vm-img-container .m9 {
  background: url("../../assets/images/m9.jpg");
}
.vm-img-container .m10 {
  background: url("../../assets/images/m10.jpg");
}
</style>
