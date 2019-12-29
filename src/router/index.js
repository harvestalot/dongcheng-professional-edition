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
                {
                    path: 'overview_cultural',
                    name: 'OverviewCultural',
                    component: () => import('components/cultural/overview.vue'),
                },
                {
                    path: 'heritage_cultural',
                    name: 'HeritageCultural',
                    component: () => import('components/cultural/cultural_heritage.vue'),
                },
                {
                    path: 'historical_building_cultural',
                    name: 'HistoricalBuildingCultural',
                    component: () => import('components/cultural/historical_building.vue'),
                },
                {
                    path: 'people_monitor',
                    name: 'PeopleMonitor',
                    component: () => import('components/monitor/people.vue'),
                },
                {
                    path: 'cultural_activities_monitor',
                    name: 'CulturalActivitiesMonitor',
                    component: () => import('components/monitor/cultural_activities.vue'),
                },
                {
                    path: 'green_land_public_space',
                    name: 'GreenLandPublicSpace',
                    component: () => import('components/publicSpace/green_land.vue'),
                },
                {
                    path: 'Hutong_sanitation_public_space',
                    name: 'HutongSanitationPublicSpace',
                    component: () => import('components/publicSpace/Hutong_sanitation.vue'),
                },
                {
                    path: 'aggregation_degree_industry',
                    name: 'AggregationDegreeIndustry',
                    component: () => import('components/industry/aggregation_degree.vue'),
                },
                {
                    path: 'developing_industry',
                    name: 'DevelopingIndustry',
                    component: () => import('components/industry/developing.vue'),
                },
                {
                    path: 'road_condition_traffic',
                    name: 'RoadConditionTraffic',
                    component: () => import('components/traffic/road_condition.vue'),
                },
                {
                    path: 'parking_traffic',
                    name: 'ParkingTraffic',
                    component: () => import('components/traffic/parking.vue'),
                },
                {
                    path: 'community_problem',
                    name: 'CommunityProblemFeedback',
                    component: () => import('components/feedback/community_problem.vue'),
                },
            ] 
        },
        {
            path: '/about_us',
            name: 'AboutUs',
            component: () => import('components/about_us.vue'), 
        }
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