require('./bootstrap');

import Vue from 'vue';
import App from './App.vue';
import VueFirestore from 'vue-firestore';

import '@/assets/css/tailwind.css';
import '@/assets/css/app.css';

import VueSmartWidget from 'vue-smart-widget';

Vue.config.productionTip = false;

Vue.use(VueFirestore);
Vue.use(VueSmartWidget);

new Vue({
  render: h => h(App),
}).$mount('#app');
