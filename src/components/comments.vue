<template>
  <div class="comment-wrapper">
    <div class="items">
      <div class="item" v-for="(item, index) in usercomments" :key="index">
        <div class="left">
          <img :src="item.user.avatarUrl" alt />
        </div>
        <div class="right">
          <div class="top">
            <span class="user">{{item.user.nickname}}:</span>
            <span class="content">{{item.content}}</span>
          </div>
          <div class="bottom">
            <div class="time">{{item.time | timefile}}</div>
            <div class="like-wrapper">
              <span>👍</span>
              ({{item.likedCount}})
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
export default {
  data() {
    return {
      usercomments: []
    };
  },
  filters: {
    timefile(arr) {
      return moment(arr).format("YYYY年 MM月 DD日, HH:mm:ss");
    }
  },
  // 进来这个页面 发送请求 拿到对应id的评论
  created() {
    this.$axios({
      method: "get",
      url: "https://autumnfish.cn/comment/music",
      params: {
        id: this.$route.query.name
      }
    }).then(res => {
      //   console.log(res);
      this.usercomments = res.data.hotComments;
    });
  }
};
</script>

<style>
</style>