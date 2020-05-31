import Vue from 'vue'
import Router from 'vue-router'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _e6911e3c = () => interopDefault(import('../pages/about.vue' /* webpackChunkName: "pages/about" */))
const _08112fa0 = () => interopDefault(import('../pages/track.vue' /* webpackChunkName: "pages/track" */))
const _a72168b2 = () => interopDefault(import('../pages/index.vue' /* webpackChunkName: "pages/index" */))

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
    component: _e6911e3c,
    name: "about"
  }, {
    path: "/track",
    component: _08112fa0,
    name: "track"
  }, {
    path: "/",
    component: _a72168b2,
    name: "index"
  }],

  fallback: false
}

export function createRouter () {
  return new Router(routerOptions)
}
