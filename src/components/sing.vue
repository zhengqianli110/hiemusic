<template>
  <div class="player" v-if="singinfo!=''">
    <div class="left">
      <img class="disc" src="../assets/img/disc.png" alt />
      <img class="cover" :src="singinfo.al.picUrl" alt />
    </div>
    <div class="right">
      <div class="title">
        <img src="../assets/img/tag.png" alt />
        <span>{{singinfo.name}}</span>
      </div>
      <div class="singer">
        歌手:
        <span>{{singinfo.ar | singer}}</span>
      </div>
      <div class="album">
        所属专辑:
        <span>{{singinfo.al.name}}</span>
      </div>
      <audio class="audio" controls :src="singUrl" @timeupdate="updatatime" ref="xxx"></audio>
      <ul class="lyric-container" v-if="geci!=''" id="ulbox">
        <li
          class="lyric"
          v-for="(item, index) in geci"
          :key="index"
          :class="{big:lryNum == index}"
        >{{item.split(']')[1]}}</li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      singUrl: "",
      singinfo: "",
      geci: [],
      currentTime: 0,
      lryNum: 0
    };
  },

  methods: {
    updatatime() {
      this.currentTime = this.$refs.xxx.currentTime;
    }
  },
  watch: {
    currentTime: function(num) {
      //   console.log(this);
      for (let i = 0; i < this.geci.length; i++) {
        let _time = this.geci[i].split("[")[1].split("]")[0];
        // console.log(_time);
        let _time1 = parseFloat(_time.split(":")[0] * 60);
        // console.log(_time1);
        // console.log(num);
        if (isNaN(_time1)) {
          _time1 = 0;
        }
        let _time2 = parseFloat(_time.split(":")[1]);
        if (isNaN(_time2)) {
          _time2 = 0;
        }
        let timenum = _time1 + _time2;
        if (!isNaN(timenum)) {
          if (timenum > num) {
            this.lryNum = i - 1;
            return;
          }
        }
      }
    }
  },
  created() {
    //   歌曲的url
    this.$axios({
      method: "get",
      url: "https://autumnfish.cn/song/url",
      params: {
        id: this.$route.query.name
      }
    }).then(res => {
      //   console.log(res);
      this.singUrl = res.data.data[0].url;
    });
    // 歌曲详情
    this.$axios({
      method: "get",
      url: "https://autumnfish.cn/song/detail",
      params: {
        ids: this.$route.query.name
      }
    }).then(res => {
      //   console.log(res);
      this.singinfo = res.data.songs[0];
    });
    // 获取歌词
    this.$axios({
      method: "get",
      url: "https://autumnfish.cn/lyric",
      params: {
        id: this.$route.query.name
      }
    }).then(res => {
      //   console.log(res);
      this.geci = res.data.lrc.lyric.split("\n");
    });
  }
};
</script>

<style scoped>
.big {
  color: red;
  font-size: 20px !important;
}
#ulbox {
  text-align: center;
}
</style>