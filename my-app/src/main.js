import Vue from 'vue';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import App from './App.vue';
import router from './router';
import store from './store'
import './api/mock'
import Cookie from 'js-cookie';
Vue.use(ElementUI);

//添加前置路由守卫
router.beforeEach((to,from,next) => {
    //token存不存在
    const token = Cookie.get('token')
    //token不存在说明当前用户未登录
    if(!token && to.name !== 'login'){
      next({
        name: 'login'
      })
    }else if(token && to.name === 'login'){//如果存在说明用户已经登录
      next({ name: 'home' })
    }else{
      next()
    }
})




Vue.config.productionTip = false

new Vue({
  store,
  router,
  el: '#app',
  render: h => h(App),
  created(){
    store.commit('addMenu',router)
  },
  beforeMount(){
    Vue.prototype.$bus = this
  }
});