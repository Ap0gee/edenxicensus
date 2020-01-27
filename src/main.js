require('./bootstrap');

import Vue from 'vue';
import App from './App.vue';
import FirebaseService from '@/services/firebase.service';

import VueFirestore from 'vue-firestore';
import VueProgressBar from 'vue-progressbar';
import VueSmartWidget from 'vue-smart-widget';
import VueParticles from 'vue-particles'
import VueTailwind from 'vue-tailwind';
import VueTailwindTheme from '../vue-tailwind-theme';

Vue.config.productionTip = false;

import '@/assets/css/tailwind.css';
import '@/assets/css/app.css';

import { library } from '@fortawesome/fontawesome-svg-core'
import FontAwesomeIcon from "@fortawesome/vue-fontawesome/src/components/FontAwesomeIcon";
import { faArrowUp, faArrowDown, faCaretDown } from "@fortawesome/free-solid-svg-icons";
import TDropdownCustom from "@cX/ui/dropdown/TDropdownCustom";

library.add(faArrowUp, faArrowDown, faCaretDown);

Vue.use(VueFirestore);
Vue.use(VueSmartWidget);
Vue.use(VueParticles);
Vue.use(VueProgressBar, {
  color: '#03DAC6',
  failedColor: '#03DAC6',
  height: '2px'
});
Vue.use(TDropdownCustom, {

});
Vue.use(VueTailwind, {
  theme: VueTailwindTheme
});


Vue.component('font-awesome-icon', FontAwesomeIcon);

Vue.prototype.$FirebaseService = new FirebaseService(window._config.FIREBASE_CONFIG);

new Vue({
  render: h => h(App),
}).$mount('#app');
