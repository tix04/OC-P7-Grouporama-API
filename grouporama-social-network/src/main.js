import Vue from 'vue'
import {BootstrapVue, IconsPlugin} from 'bootstrap-vue'
import { createPopper } from '@popperjs/core';
import App from './App.vue'
import router from './router'
import store from './store'


import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import { faHome, faStickyNote} from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'

library.add(faHome, faStickyNote)

Vue.component('font-awesome-icon', FontAwesomeIcon)

Vue.config.productionTip = false
Vue.use(BootstrapVue)
Vue.use(IconsPlugin)
Vue.use( createPopper )


new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
