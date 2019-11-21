import Vue from 'vue'
import App from './App'
import Axios from 'axios'
import router from './router'
import vuetify from './plugins/vuetify';
import VueSession from '../node_modules/vue-session';
Vue.use(VueSession);
Vue.prototype.$http = Axios;
Vue.prototype.$apiUrl = 'http://127.0.0.1:8080/tubespaw';
Vue.config.productionTip = false
export const serverBus = new Vue ();
new Vue({
  render: h => h(App),
  router,
  vuetify,
  components: {
    App
  }
}).$mount('#app')