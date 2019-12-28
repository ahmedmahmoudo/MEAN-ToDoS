import Vue from 'vue';
import App from './App.vue';
import VueRouter from 'vue-router';
import Store from './stores/store';
import VueCookies from 'vue-cookies';

import router from './router';

import BootstrapVue from 'bootstrap-vue';
import 'bootstrap/dist/css/bootstrap.css';
import 'bootstrap-vue/dist/bootstrap-vue.css';
import { library } from '@fortawesome/fontawesome-svg-core';
import { faUserSecret, faBookMedical, faShareSquare, faFilePdf, faUser, faPlus } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import Vuelidate from 'vuelidate'

Vue.config.productionTip = false;


Vue.component('awesome-icon', FontAwesomeIcon);
library.add(faUserSecret, faBookMedical, faShareSquare, faFilePdf, faUser, faPlus);


Vue.use(VueRouter);
Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(VueCookies);


new Vue({
  render: h => h(App),
  router,
  store: Store
}).$mount('#app');


