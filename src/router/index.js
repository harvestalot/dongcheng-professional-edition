import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/views/home'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Home',
            component: Home,
            children:[
                {
                    path: 'population_scale',
                    name: 'PopulationScale',
                    component: () => import('components/scale/Population.vue'),
                },
                {
                    path: 'construction_scale',
                    name: 'ConstructionScale',
                    component: () => import('components/scale/Construction.vue'),
                },
            ]
        },
    ]
})

// //  判断是否需要登录权限 以及是否登录
// router.beforeEach((to, from, next) => {
//     if (to.matched.some(res => res.meta.auth)) {// 判断是否需要登录权限
//         if (localStorage.getItem('username')) {// 判断是否登录
//             next()
//         } else {// 没登录则跳转到登录界面
//             next({
//                 path: '/login',
//             })
//         }
//     } else {
//         next()
//     }
// })
export default router;