import Vue from 'vue';
import Router from 'vue-router';
import paths from './paths';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import AppLayout from '@/layouts/materialVue';
// import AuthLayout from '../components/auth/AuthLayout'
// import lazyLoading from './lazyLoading'

Vue.use(Router);
const router =  new Router({
  base: '/',
  // mode: 'hash',
  mode: 'history',
  linkActiveClass: 'active',
  routes: paths
});
// router gards
router.beforeEach((to, from, next) => {
  NProgress.start();
  next();
});

router.afterEach((to, from) => {
  // ...
  NProgress.done();
});

export default router;
