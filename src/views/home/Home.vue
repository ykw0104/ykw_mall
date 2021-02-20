<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl1" class="tab-control" v-show="isTabFixed"></tab-control>
    <scroll class="content" ref="scroll" :probe-type="3" @scroll="contentScroll" :pull-up-load="true" @pullingUp="loadMore">
      <!-- 轮播图 -->
      <home-swiper :banners="banners" @swiperImageLoad="swiperImageLoad"></home-swiper>
      <recommend-view :recommends="recommends"></recommend-view>
      <feature-view />
      <tab-control :titles="['流行','新款','精选']" @tabClick="tabClick" ref="tabControl2"></tab-control>
      <good-list :goods="showGoods"></good-list>
    </scroll>
    <back-top @click.native="backClick" v-show="isShowBackUp"></back-top>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/goods/GoodsList.vue'
import Scroll from 'components/common/scroll/Scroll.vue'
import BackTop from 'components/content/backTop/BackTop'

import { getHomeMultidata, getHomeGoods } from 'network/home'
import { debounce } from 'components/common/utils/utils.js'

export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
    Scroll,
    BackTop,
  },
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        'pop': { page: 0, list: [] },
        'new': { page: 0, list: [] },
        'sell': { page: 0, list: [] },
      },
      currentType: 'pop',
      isShowBackUp: false,
      tabOffsetTop: 0,
      isTabFixed: false,  //tabcontrol是否已经吸顶
      saveY: 0
    }
  },
  created() {
    //1.请求多个数据
    this.getHomeMultidata()

    //2.请求商品数据
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')
  },
  mounted() {
    //1.图片加载完成的事件监听
    const refresh = debounce(this.$refs.scroll.refresh, 200)

    // 监听item中图片加载完成
    this.$bus.$on('itemImageLoad', () => {
      refresh()
    })
  },
  //页面进来时
  activated() {
    this.$refs.scroll.scrollTo(0, this.saveY, 0)
    this.$refs.scroll.refresh()
  },
  //页面离开时
  deactivated() {
    this.saveY = this.$refs.scroll.getScrollY()
  },
  computed: {
    showGoods() {
      return this.goods[this.currentType].list
    }
  },
  methods: {
    /**
     * 事件监听相关
     */

    tabClick(index) {
      switch (index) {
        case 0:
          this.currentType = 'pop'
          break
        case 1:
          this.currentType = 'new'
          break
        case 2:
          this.currentType = 'sell'
          break
      }
      this.$refs.tabControl1.currentIndex = index;
      this.$refs.tabControl2.currentIndex = index;
    },
    backClick() {
      this.$refs.scroll.scrollTo(0, 0, 800)  //0.8秒后返回顶部
    },
    contentScroll(position) {
      //1.大于1000的时候回到顶部的按钮会出现
      this.isShowBackUp = (-position.y) > 1000
      //2.决定tabControl是否吸顶(position:fixed)
      this.isTabFixed = (-position.y) > this.tabOffsetTop
    },
    //上拉加载更多
    loadMore() {
      this.getHomeGoods(this.currentType)
    },
    swiperImageLoad() {
      //2.获取tabControl的offsetTop
      this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
    },
    /**
     * 网络请求相关
     */
    getHomeMultidata() {
      //1.请求多个数据
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list
        this.recommends = res.data.recommend.list
      })
    },
    getHomeGoods(type) {
      const page = this.goods[type].page + 1

      //2.请求商品数据
      getHomeGoods(type, page).then(res => {
        //存放数据
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

        //完成上拉加载更多
        this.$refs.scroll.finishPullUp()
      })
    }
  }
}
</script>
<style scoped>
#home {
  /* padding-top: 44px; */
  height: 100vh;
  position: relative;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  /* position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9; */
}

.content {
  overflow: hidden;

  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0px;
  right: 0px;
}

.tab-control {
  position: relative;
  z-index: 9;
}
/* .content {
  height: calc(100%-93px);
  overflow: hidden;
  margin-top: 51px;
} */
</style>