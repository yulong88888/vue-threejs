import Vue from 'vue'
import Router from 'vue-router'
import App from './App.vue'
import Test1 from './views/Test1.vue'
import Test2 from './views/Test2.vue'

Vue.use(Router);

const router = new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '',
            name: 'index',
            component: App
        },
        {
            path: '/1',
            name: 'test1',
            component: Test1
        },
        {
            path: '/2',
            name: 'test2',
            component: Test2
        }
    ]
});

export default router;
