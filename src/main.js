import Vue from 'vue'
import App from './App.vue'

Vue.config.productionTip = false

// 导入子组件
import lunbo from './components/lunbo.vue'
import song from './components/song.vue'
import comments from './components/comments.vue'
import sing from './components/sing.vue'
import mv from './components/mv.vue'

// 导入路由
import VueRouter from '../node_modules/vue-router'
// 注册
Vue.use(VueRouter)
// 实例化
const router = new VueRouter({
  routes: [{
      path: '/',
      component: lunbo
    },
    {
      path: '/song',
      component: song
    },
    {
      path: '/comments',
      component: comments
    },
    {
      path: '/sing',
      component: sing
    },
    {
      path: '/mv',
      component: mv
    }
  ]
})
// 导入轮播图插件
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
// 注册轮播插件
Vue.use(ElementUI);

import axios from 'axios'
// 导入全局的 axios
Vue.prototype.$axios = axios

// 过滤器
Vue.filter("singer", function (arr) {
  let _arr = arr.map(item => {
    return item.name
  })
  return _arr.join('&')
})
new Vue({
  render: h => h(App),
  // 挂载路由
  router
}).$mount('#app')