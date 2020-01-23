require('./bootstrap');

import Vue from 'vue';
import App from './App.vue';

import VueFirestore from 'vue-firestore';
import VueProgressBar from 'vue-progressbar';
import VueSmartWidget from 'vue-smart-widget';
import VueParticles from 'vue-particles'

Vue.config.productionTip = false;

import '@/assets/css/tailwind.css';
import '@/assets/css/app.css';

Vue.use(VueFirestore);
Vue.use(VueSmartWidget);
Vue.use(VueParticles);
Vue.use(VueProgressBar, {
  color: '#03DAC6',
  failedColor: '#03DAC6',
  height: '2px'
});

new Vue({
  render: h => h(App),
}).$mount('#app');
