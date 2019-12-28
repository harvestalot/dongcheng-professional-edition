import Vue from 'vue'
import Router from 'vue-router'
import Index from '@/views/index'
import Home from '@/views/components/home'

Vue.use(Router)

const router = new Router({
    routes: [
        {
            path: '/',
            name: 'Index',
            redirect: '/views',
            component: Index,
            children:[
                {
                    path: 'views',
                    name: 'Home',
                    component: Home,
                },
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
                {
                    path: 'traffic_facilities',
                    name: 'TrafficFacilities',
                    component: () => import('components/facilities/traffic.vue'),
                },
                {
                    path: 'education_facilities',
                    name: 'EducationFacilities',
                    component: () => import('components/facilities/education.vue'),
                },
                {
                    path: 'provide_facilities',
                    name: 'ProvideFacilities',
                    component: () => import('components/facilities/provide.vue'),
                },
                {
                    path: 'convenience_people_facilities',
                    name: 'ConveniencePeopleFacilities',
                    component: () => import('components/facilities/convenience_people.vue'),
                },
                {
                    path: 'sports_facilities',
                    name: 'SportsFacilities',
                    component: () => import('components/facilities/sports.vue'),
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