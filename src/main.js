// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import "babel-polyfill";
import Vue from 'vue'
import App from './App'
import router from './router'
// import Axios from 'axios'
import store from './store'
import Antd from 'ant-design-vue';
import 'ant-design-vue/dist/antd.css';
import '../my-theme/index.less';
import './assets/css/base.css';


Vue.config.productionTip = false

Vue.use(Antd);

// Vue.prototype.$Axios = Axios


import http from './service/http.js'
import ports from './service/ports_api.js'
Vue.prototype.http = http
Vue.prototype.ports = ports

/* eslint-disable no-new */
new Vue({
  el: '#views',
  router,
  store,  //将store暴露出来
  components: { App },
  template: '<App/>'
})
