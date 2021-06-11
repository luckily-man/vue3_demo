import router from './src/router';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { getUserToken } from '@utils/auth/auth-token.js';



router.beforeEach((to, from, next) => {
    NProgress.start();


    let token = getUserToken('token');
    if (token) {
        if (to.path === '/login') {
            next({ path: '/home' })
            NProgress.done()
        }
    }
    next()
})

router.afterEach(() => {
    NProgress.done();
})