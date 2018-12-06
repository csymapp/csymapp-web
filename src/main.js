// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue';
import App from './App';
import Vuetify from 'vuetify';
import router from './router';
import 'font-awesome/css/font-awesome.css';  
import './theme/default.styl';
import VeeValidate from 'vee-validate';
import colors from 'vuetify/es5/util/colors';
import Truncate from 'lodash.truncate';

import store from '@/services/config/store';
import { sync } from 'vuex-router-sync';
sync(store, router); // sync the store and router

import Buefy from 'buefy'
// import 'buefy/dist/buefy.css'

import VueSpinners from 'vue-spinners'
 
Vue.use(VueSpinners)

Vue.use(Buefy)

Vue.use(VeeValidate);

import VueDraggable from 'vue-draggable'
 
Vue.use(VueDraggable)

import VuetifyConfirm from 'vuetify-confirm'
Vue.use(VuetifyConfirm)

import VueTelInput from 'vue-tel-input'
import 'vue-tel-input/dist/vue-tel-input.css';
 
Vue.use(VueTelInput)


Vue.config.productionTip = false;

Vue.filter('truncate', Truncate);
Vue.use(VeeValidate, { fieldsBagName: 'formFields', events: 'blur', events: ''});
Vue.use(Vuetify, {
  // theme: {
  //   primary: colors.indigo.base, // #E53935
  //   secondary: colors.indigo.lighten4, // #FFCDD2
  //   accent: colors.indigo.base // #3F51B5
  // },
  options: {
    themeVariations: ['primary', 'secondary', 'accent'],
    extra: {
      mainToolbar: {
        color: 'primary',
      },
      sideToolbar: {
      },
      sideNav: 'primary',
      mainNav: 'primary lighten-1',
      bodyBg: '',
    }
  }
});
// Bootstrap application components



/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  store,
  template: '<App/>'
});
