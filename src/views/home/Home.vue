<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <home-swiper :banners="banners"></home-swiper>
    <recommend-view :recommends="recommends"></recommend-view>
    <feature-view></feature-view>
    <tab-control class="tab-control" :titles="['流行','新款','精选']" @tabClick="tabClick"></tab-control>
    <good-list :goods="goods[currentType].list"></good-list>
    <ul>
      <li>1001</li>
      <li>1002</li>
      <li>1003</li>
      <li>1004</li>
      <li>1005</li>
      <li>1006</li>
      <li>1007</li>
      <li>1008</li>
      <li>1009</li>
      <li>10010</li>
      <li>10011</li>
      <li>10012</li>
      <li>10013</li>
      <li>10014</li>
      <li>10015</li>
      <li>10016</li>
      <li>10017</li>
      <li>10018</li>
      <li>10019</li>
    </ul>
  </div>
</template>

<script>
import HomeSwiper from './childComps/HomeSwiper'
import RecommendView from './childComps/RecommendView'
import FeatureView from './childComps/FeatureView'


import NavBar from 'components/common/navbar/NavBar'
import TabControl from 'components/content/tabControl/TabControl'
import GoodList from 'components/goods/GoodsList.vue'

import {
  getHomeMultidata,
  getHomeGoods
} from 'network/home'



export default {
  name: 'Home',
  components: {
    HomeSwiper,
    RecommendView,
    FeatureView,
    NavBar,
    TabControl,
    GoodList,
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
      currentType: 'pop'
    }
  },
  created() {
    this.getHomeMultidata()
    this.getHomeGoods('pop')
    this.getHomeGoods('new')
    this.getHomeGoods('sell')

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
      })
    }
  }
}
</script>
<style scoped>
#home {
  padding-top: 44px;
}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}

.tab-control {
  position: sticky;
  top: 44px;
  z-index: 9;
}
</style>