import { createRouter, createWebHistory } from 'vue-router'
import { setupLayouts } from 'virtual:generated-layouts'
import generatedRoutes from 'virtual:generated-pages'
import type { RouteLocationNormalized } from 'vue-router'
import { getHomeRouteForLoggedInUser, getUserData, isUserLoggedIn } from './utils'
import ability from '@/plugins/casl/ability'

// import { canNavigate } from '@layouts/plugins/casl'


const canNavigate = (to: RouteLocationNormalized) => {
 return true
  //return to.matched.some(route => ability.can(route.meta.action, route.meta.subject))
}

const test = (to: RouteLocationNormalized) => {
  // @ts-expect-error We should allow passing string | undefined to can because for admin ability we omit defining action & subject
  return to.matched.some(route => ability.can(route.meta.action, route.meta.subject))
}

const routes = setupLayouts(generatedRoutes)

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    // {
    //   path: '/',
    //   name: 'home',
    //   component: HomeView,
    // },
    ...routes,
  ],
})


router.beforeEach((to, _, next) => {
  const isLoggedIn = isUserLoggedIn()

  // console.log('isLoggedIn :>> ', isLoggedIn)

  // console.log('canNavigate(to) :>> ', canNavigate(to))

  if (!canNavigate(to)) {
    // Redirect to login if not logged in
    // ℹ️ Only add `to` query param if `to` route is not index route
    if (!isLoggedIn)
      return next({ name: 'login', query: { to: to.name !== 'index' ? to.fullPath : undefined } })

    // If logged in => not authorized
    return next({ name: 'not-authorized' })
  }

  // Redirect if logged in
  if (to.meta.redirectIfLoggedIn && isLoggedIn) {
    const userData = getUserData()
    next(getHomeRouteForLoggedInUser(userData ? userData.role : null))
  }

  return next()
})

export default router
