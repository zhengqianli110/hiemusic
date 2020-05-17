<template>
  <div>
    <el-carousel indicator-position="outside" id="lunboimg" height="370px">
      <el-carousel-item v-for="(item, index) in imgArr" :key="index">
        <img :src="item.imageUrl" alt />
      </el-carousel-item>
    </el-carousel>
  </div>
</template>

<script>
export default {
  data() {
    return {
      imgArr: []
    };
  },
  created() {
    // 进来页面就发请求获取轮播图
    this.$axios({
      method: "get",
      url: "http://183.237.67.218:3000/banner",
      params: {
        xx: Math.random() * 100
      }
    }).then(res => {
      this.imgArr = res.data.banners;
    });
  }
};
</script>

<style scoped>
#lunboimg img {
  width: 100%;
}
</style>