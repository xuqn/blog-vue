import Vue from 'vue';
import Router from 'vue-router';
import store from './store.js';

Vue.use(Router);

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('./views/home.vue'),
    },
    {
      path: '/detail/:blogId',
      name: 'detail',
      component: () => import('./views/detail.vue'),
    },
    {
      path: '/create',
      name: 'create',
      meta: { requiresAuth: true },
      component: () => import('./views/create.vue'),
    },
    {
      path: '/edit/:blogId',
      name: 'edit',
      meta: { requiresAuth: true },
      component: () => import('./views/edit.vue'),
    },
    {
      path: '/register',
      name: 'register',
      component: () => import('./views/register.vue'),
    },
    {
      path: '/login',
      name: 'login',
      component: () => import('./views/login.vue'),
    },
    {
      path: '/user/:userId',
      name: 'user',
      meta: { requiresAuth: true },
      component: () => import('./views/user.vue'),
    },
    {
      path: '/my',
      name: 'my',
      meta: { requiresAuth: true },
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/my.vue'),
    },
  ],
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.requiresAuth)) {
    store.dispatch('checklogin').then((isLogin) => {
      if (!isLogin) {
        next({
          path: '/login',
          query: { redirect: to.fullPath },
        });
      } else {
        next();
      }
    });
  } else {
    next();
  }
});

export default router;
