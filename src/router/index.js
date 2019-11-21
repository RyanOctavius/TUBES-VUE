import Vue from 'vue'
import Router from 'vue-router'
const DashboardLayout = () => import('../components/dashboardLayout.vue')
const Login = () => import('../components/login.vue')
const Signup = () => import('../components/signup.vue')
        function loadView(view) {
            return () => import(`../components/dashboardContents/${view}.vue`)
        }
        const routes = [{
            path: '/dashboard',
            component: DashboardLayout,
            children: [
                {
                    name: 'UserController',
                    path: '/user',
                    component: loadView('userController')
                },
                {
                    name: 'mobilController',
                    path: '/mobil',
                    component: loadView('mobilController')
                },
                {
                    name: 'motorController',
                    path: '/motor',
                    component: loadView('motorController')
                },
                {
                    name: 'serviceController',
                    path: '/service',
                    component: loadView('serviceController')
                },
                {
                    name: 'cartController',
                    path: '/cart',
                    component: loadView('cartController')
                }
            ]
        },
        {
            name: 'login',
            path: '',
            component: Login,
        },
        {
            name: 'signup',
            path: '/signup',
            component: Signup,
        }
        ];
        Vue.use(Router) 
            const router = new Router({mode: 'history', routes: routes})
        export default router
