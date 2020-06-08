import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _8c08111c = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _b9491564 = () => interopDefault(import('../pages/login.vue' /* webpackChunkName: "pages/login" */))
const _632e0e64 = () => interopDefault(import('../pages/register.vue' /* webpackChunkName: "pages/register" */))
const _3555b630 = () => interopDefault(import('../pages/track.vue' /* webpackChunkName: "pages/track" */))
const _4c985b92 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

// TODO: remove in Nuxt 3
const emptyFn = () => {}
const originalPush = Router.prototype.push
Router.prototype.push = function push (location, onComplete = emptyFn, onAbort) {
  return originalPush.call(this, location, onComplete, onAbort)
}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: decodeURI('/'),
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/about",
    component: _8c08111c,
    name: "about"
  }, {
    path: "/login",
    component: _b9491564,
    name: "login"
  }, {
    path: "/register",
    component: _632e0e64,
    name: "register"
  }, {
    path: "/track",
    component: _3555b630,
    name: "track"
  }, {
    path: "/",
    component: _4c985b92,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
