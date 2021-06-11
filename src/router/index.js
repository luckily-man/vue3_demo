import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/layout/home/home.vue'
import { getUserToken } from '@utils/auth/auth-token.js';

const routes = [
  {
    path: '/',
    redirect: '/home',
    hidden: true,
    component:Home,
    children:[{
      path: '/home',
      name: 'Home',
      component: () => import('../views/welcome/Home.vue'),
      meta: {
        title: 'home',
        icon: 'el-icon-edit'
      }
    },
    {
      path: '/about',
      name: 'About',
      component: () => import( '../views/about/About.vue')
    },
    {
      path: '/menuList',
      name: 'MenuList',
      component: () => import('../views/menu/menuList.vue')
    },
    {
      path: '/user-edit',
      name: 'UserEdit',
      redirect: '/user-edit/user-msg',
      component: () => import('../views/userEdit/userEdit.vue'),
      children:[{
        path: '/user-edit/user-msg',
        name: 'UserMsg',
        component: () => import('../views/userEdit/userMsg/userMsg.vue')
      },{
        path: '/user-edit/certification',
        name: 'Certification',
        component: () => import('../views/userEdit/certification/certification')
      },{
        path: '/user-edit/bind-phone',
        name: 'BindPhone',
        component: () => import('../views/userEdit/bindPhone/bindPhone.vue')
      },{
        path: '/user-edit/change-pwd',
        name: 'ChangePwd',
        component: () => import('../views/userEdit/changePwd/changePwd.vue')
      },{
        path: '/user-edit/bind-email',
        name: 'BindEmail',
        component: () => import('../views/userEdit/bindEmail/bindEmail.vue')
      }]
    },
    {
      path: '/v2/classList',
      name: 'classList',
      component: () => import('../views/classMenger/classList/classList.vue')
    },
    ]
  },
  
  
  {
    path: '/login',
    name: 'Login',
    component: () => import('../views/login/login.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

// const routerPush = router.prototype.push
// router.prototype.push = function push(location) {
//     return routerPush.call(this, location).catch(error => error)
// }

// const router = new Router({
//     scrollBehavior(to, from, savedPosition) {
//         if (savedPosition) {
//             return savedPosition
//         } else {
//             return {
//                 x: 0,
//                 y: 0
//             }
//         }
//     },
//     routes
// })


router.beforeEach((to, from, next) => {
    let token = getUserToken('token');
    let paths = ['/login', '/register'];
    if (!token && !paths.includes(to.path)) {
        return next('/login')
    }
    next()
})

export default router
