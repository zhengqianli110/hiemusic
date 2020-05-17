<template>
  <div class="video" v-if="mvinfo!=''" id="video">
    <div class="title-wrapper">
      <span class="tag">MV</span>
      <span class="title">{{mvinfo.name}}</span>
      <span class="artist">{{mvinfo.artists | singer}}</span>
    </div>
    <video :src="mvUrl" controls></video>
  </div>
</template>

<script>
import axios from "axios";
export default {
  data() {
    return {
      mvinfo: "",
      mvUrl: ""
    };
  },
  // 过滤器
  // filters: {
  //   singer(arr) {
  //     let _arr = arr.map(item => {
  //       return item.name;
  //     });
  //     return _arr.join("&");
  //   }
  // },
  created() {
    axios({
      method: "get",
      url: "https://autumnfish.cn/mv/detail",
      params: {
        mvid: this.$route.query.name
      }
    }).then(res => {
      // console.log(res);
      this.mvinfo = res.data.data;
    });
    // 请求mv的URL地址  获取歌曲mvurl
    axios({
      method: "get",
      url: "https://autumnfish.cn/mv/url",
      params: {
        id: this.$route.query.name
      }
    }).then(res => {
      // console.log(res);
      this.mvUrl = res.data.data.url;
    });
  }
};
</script>

<style>
</style>