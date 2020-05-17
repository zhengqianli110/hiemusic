<template>
  <div id="player">
    <h2 class="title">黑云音乐</h2>
    <div class="search">
      <input type="text" @keyup.enter="searchsong" v-model="usersong" />
      <button>
        <span class="iconfont icon-search" @click="searchsong"></span>
      </button>
    </div>
    <div class="tab-wrapper">
      <!-- 对应的内容区域 -->
      <!-- 路由出口 -->
      <router-view></router-view>
      <div class="tab-content"></div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      usersong: ""
    };
  },
  methods: {
    // 点击事件 把要的歌曲通过 路由传参传过去
    searchsong() {
      if (this.usersong.trim() == "") {
        alert("你xx");
        return;
      }
      this.$router.push({
        path: "/song",
        query: {
          name: this.usersong
        }
      });
    }
  }
};
</script>

<style>
@import url("./assets/css/index.css");
@import url("./assets/css/iconfont.css");
</style>