<template>
  <div class="tab-control">
    <div class="tab-control-item" v-for="(item,index) of titles" :key="item" :class="{active:index == currentIndex}" @click="itemClick(index)">
      <span>{{item}}</span>
    </div>
  </div>
</template>

<script>
export default {
  name: 'TabControl',
  components: {},
  props: {
    titles: {
      type: Array,
      default() {
        return []
      }
    }
  }
  ,
  data() {
    return {
      currentIndex: 0
    }
  },
  methods: {
    itemClick(index) {
      this.currentIndex = index
    }
  }
}
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 14px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
}
.tab-control-item {
  flex: 1;
}

.tab-control-item span {
  padding: 5px;
}

.active {
  color: var(--color-high-text);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>