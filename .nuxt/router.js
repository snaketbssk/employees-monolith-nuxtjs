import Vue from 'vue'
import Router from 'vue-router'
import { normalizeURL, decode } from 'ufo'
import { interopDefault } from './utils'
import scrollBehavior from './router.scrollBehavior.js'

const _cef3274e = () => interopDefault(import('..\\pages\\departaments\\index.vue' /* webpackChunkName: "pages/departaments/index" */))
const _fd09b1a4 = () => interopDefault(import('..\\pages\\employees\\index.vue' /* webpackChunkName: "pages/employees/index" */))
const _8df26d2e = () => interopDefault(import('..\\pages\\inspire.vue' /* webpackChunkName: "pages/inspire" */))
const _317815c2 = () => interopDefault(import('..\\pages\\skills\\index.vue' /* webpackChunkName: "pages/skills/index" */))
const _692dabb6 = () => interopDefault(import('..\\pages\\user\\index.vue' /* webpackChunkName: "pages/user/index" */))
const _c22b8654 = () => interopDefault(import('..\\pages\\departament\\create.vue' /* webpackChunkName: "pages/departament/create" */))
const _f04210aa = () => interopDefault(import('..\\pages\\employee\\create.vue' /* webpackChunkName: "pages/employee/create" */))
const _24b074c8 = () => interopDefault(import('..\\pages\\skill\\create.vue' /* webpackChunkName: "pages/skill/create" */))
const _66e6567e = () => interopDefault(import('..\\pages\\departament\\_guid.vue' /* webpackChunkName: "pages/departament/_guid" */))
const _d09725ee = () => interopDefault(import('..\\pages\\employee\\_guid.vue' /* webpackChunkName: "pages/employee/_guid" */))
const _24dcc610 = () => interopDefault(import('..\\pages\\skill\\_guid.vue' /* webpackChunkName: "pages/skill/_guid" */))
const _3528d5be = () => interopDefault(import('..\\pages\\index.vue' /* webpackChunkName: "pages/index" */))

const emptyFn = () => {}

Vue.use(Router)

export const routerOptions = {
  mode: 'history',
  base: '/',
  linkActiveClass: 'nuxt-link-active',
  linkExactActiveClass: 'nuxt-link-exact-active',
  scrollBehavior,

  routes: [{
    path: "/departaments",
    component: _cef3274e,
    name: "departaments"
  }, {
    path: "/employees",
    component: _fd09b1a4,
    name: "employees"
  }, {
    path: "/inspire",
    component: _8df26d2e,
    name: "inspire"
  }, {
    path: "/skills",
    component: _317815c2,
    name: "skills"
  }, {
    path: "/user",
    component: _692dabb6,
    name: "user"
  }, {
    path: "/departament/create",
    component: _c22b8654,
    name: "departament-create"
  }, {
    path: "/employee/create",
    component: _f04210aa,
    name: "employee-create"
  }, {
    path: "/skill/create",
    component: _24b074c8,
    name: "skill-create"
  }, {
    path: "/departament/:guid?",
    component: _66e6567e,
    name: "departament-guid"
  }, {
    path: "/employee/:guid?",
    component: _d09725ee,
    name: "employee-guid"
  }, {
    path: "/skill/:guid?",
    component: _24dcc610,
    name: "skill-guid"
  }, {
    path: "/",
    component: _3528d5be,
    name: "index"
  }],

  fallback: false
}

export function createRouter (ssrContext, config) {
  const base = (config._app && config._app.basePath) || routerOptions.base
  const router = new Router({ ...routerOptions, base  })

  // TODO: remove in Nuxt 3
  const originalPush = router.push
  router.push = function push (location, onComplete = emptyFn, onAbort) {
    return originalPush.call(this, location, onComplete, onAbort)
  }

  const resolve = router.resolve.bind(router)
  router.resolve = (to, current, append) => {
    if (typeof to === 'string') {
      to = normalizeURL(to)
    }
    return resolve(to, current, append)
  }

  return router
}
