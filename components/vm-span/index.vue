<template>
  <!-- 纯色码 -->
  <span v-if="onoff && color!=='' " class="kvm_span_container"
    :class="{ kvm_span_container_block: width !== '' || height !== '' || text === '' }" :style="{
      color,
      borderRadius,
      backgroundColor,
      width: Boolean(Number(width)) ? width + 'px' : width,
      height: Boolean(Number(height)) ? height + 'px' : height,
      lineHeight: Boolean(Number(lineHeight)) ? lineHeight + 'px' : lineHeight,
    }">

    <!-- 使用插槽 -->
    <template v-if="text === ''">
      <div class="mask" :style="{backgroundColor:color}" />
      <slot />
    </template>

    <!-- 使用prop传递文字 -->
    <template v-else>{{ text }}</template>

  </span>

  <!-- 普通马赛克 -->
  <span v-else-if="onoff && color===''" class="kvm_span_container"
    :class="{ kvm_span_container_block: width !== '' || height !== '' || text === '' }" :style="{
      borderRadius,
      width: Boolean(Number(width)) ? width + 'px' : width,
      height: Boolean(Number(height)) ? height + 'px' : height,
      lineHeight: Boolean(Number(lineHeight)) ? lineHeight + 'px' : lineHeight,
    }">

    <!-- 使用插槽 -->
    <template v-if="text === '' ">
      <div class="mask" :style="{background:`url(${require('../../assets/images/mo.jpg')})`}" />
      <slot />
    </template>

    <!-- 使用prop传递文字 -->
    <template v-else>
      <div class="mask" :style="{background:`url(${require('../../assets/images/mo.jpg')})`,}" />
      {{ text }}
    </template>

  </span>

  <!-- 无码 -->
  <span v-else :class="{ kvm_span_container_block: width !== '' || height !== '' || text === '' }"
    class="kvm_span_container" :style="{
      borderRadius,
      width: Boolean(Number(width)) ? width + 'px' : width,
      height: Boolean(Number(height)) ? height + 'px' : height,
      lineHeight: Boolean(Number(lineHeight)) ? lineHeight + 'px' : lineHeight,
    }">

    <!-- 使用插槽 -->
    <template v-if="text === ''">
      <slot />
    </template>

    <!-- 使用prop传递文字 -->
    <template v-else>{{ text }}</template>

  </span>
</template>

<script>
import { ref, watch } from 'vue'
export default {
  name: 'vm-span',
  props: {
    text: { type: String, default: '' },
    color: { type: String, default: '' },
    onoff: { type: Boolean, default: true },
    width: { type: [Number, String], default: '' },
    height: { type: [Number, String], default: '' },
    radius: { type: [Number, String], default: '' },
    lineHeight: { type: [Number, String], default: '' }
  },
  setup(props) {
    // borderRadius: 该值控制直角边弧度的大小
    // backgroundColor 纯色打码的颜色
    // 监听props，props每次改变后都要重新接收外部发送过来的值
    const borderRadius = ref(0)
    const backgroundColor = ref(props.color === '' ? '#000000' : props.color)
    watch(props, () => {
      if (props.radius === 'no') {
        borderRadius.value = 0 + 'px'
      } else if (props.radius === 'small') {
        borderRadius.value = 2 + 'px'
      } else if (props.radius === 'large') {
        borderRadius.value = 4 + 'px'
      } else if (props.radius === 'round') {
        borderRadius.value = 20 + 'px'
      } else if (Boolean(Number(props.radius)) === true) {
        borderRadius.value = props.radius + 'px'
      } else if (Boolean(Number(props.radius)) === false) {
        borderRadius.value = props.radius
      }
    }, {
      immediate: true
    })

    return { borderRadius, backgroundColor }
  }
}
</script>

<style scoped>
.kvm_span_container {
  overflow: hidden;
  position: relative;
}
.kvm_span_container .mask {
  z-index: 6;
  width: 100%;
  height: 100%;
  position: absolute;
}
.kvm_span_container_block {
  display: inline-block;
}
</style>
