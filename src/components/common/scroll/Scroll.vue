<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'Scroll',
  data() {
    return {
      scroll: null
    }
  },
  props: {
    probeType: {
      type: Number,
      default: 0
    },
    pullUpLoad: {
      type: Boolean,
      default: false
    }
  },
  mounted() {
    //1.创建BScroll对象
    this.scroll = new BScroll(this.$refs.wrapper, {
      click: true,                //允许click事件
      probeType: this.probeType,      // 滚动监听
      pullUpLoad: this.pullUpLoad  //上拉监听
    })

    //2.监听滚动的区域
    this.scroll.on("scroll", (position) => {
      this.$emit('scroll', position)
    })

    //3.监听滚动到底部
    if (this.pullUpLoad) {
      this.scroll.on('pullingUp', () => {
        this.$emit('pullingUp')
      })
    }

  },
  methods: {
    //点击后置顶,默认0.3秒后置顶
    scrollTo(x, y, time = 300) {
      this.scroll && this.scroll.scrollTo(x, y, time)
    },
    //上拉完成后执行上拉完成方法
    finishPullUp() {
      this.scroll.finishPullUp()
    },
    //刷新重新计算高度
    refresh() {
      this.scroll && this.scroll.refresh()
    },
    //完成上拉加载更多后执行该函数y:0
    finishPullUp() {
      this.scroll && this.scroll.finishPullUp()
    },
    //获取y坐标
    getScrollY() {
      return this.scroll ? this.scroll.y : 0
    }
  },
}
</script>
<style scoped>
</style>