<template>
  <div class="result-wrapper">
    <div class="song" v-for="(item, index) in songs" :key="index" @dblclick="comments(item.id)">
      <div class="name">
        <span class="iconfont icon-play" @click="starsong(item.id)"></span>
        {{item.name}}
        <span
          class="iconfont icon-editmedia"
          v-if="item.mvid!=0"
          @click="mvstar(item.mvid)"
        ></span>
      </div>
      <div class="singer">{{item.artists | singer}}</div>
      <div class="album">《{{item.album.name}}》</div>
      <div class="time">{{item.duration | timefile}}</div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      songs: ""
    };
  },
  //   过滤时间
  filters: {
    timefile(time) {
      let m = ("0000" + Math.floor(time / 1000 / 60)).slice(-2);
      let s = ("0000" + Math.floor((time / 1000) % 60)).slice(-2);
      return m + ":" + s;
    }
  },
  //   侦听事件
  watch: {
    "$route.query.name": function() {
      this.$axios({
        method: "get",
        url: "https://autumnfish.cn/search",
        params: {
          keywords: this.$route.query.name
        }
      }).then(res => {
        //   console.log(res);
        this.songs = res.data.result.songs;
      });
    }
  },
  // 进来拿到穿过来的歌名   发送axios 请求拿到歌曲
  created() {
    this.$axios({
      method: "get",
      url: "https://autumnfish.cn/search",
      params: {
        keywords: this.$route.query.name
      }
    }).then(res => {
      //   console.log(res);
      this.songs = res.data.result.songs;
    });
  },
  methods: {
    //  双击事件 获取点击的这个id  路由传值 给comments 组件
    comments(id) {
      this.$router.push({
        path: "/comments",
        query: {
          name: id
        }
      });
    },
    starsong(id) {
      this.$router.push({
        path: "/sing",
        query: {
          name: id
        }
      });
    },
    // 单击事件 传过去 mvid
    mvstar(id) {
      this.$router.push({
        path: "/mv",
        query: {
          name: id
        }
      });
    }
  }
};
</script>

<style>
</style>