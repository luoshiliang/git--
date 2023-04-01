import Vue from 'vue';
import VueRouter from 'vue-router';
Vue.use(VueRouter)
import Home from '../views/Home.vue'
import User from '../views/User.vue'
import MainA from '../views/MainA.vue'
import mail from '../views/Mail.vue'
import PageOne from '../views/PageOne.vue'
import PageTwo from '../views/PageTwo.vue'
import Login from '../views/Login.vue'
const router = new VueRouter({
    routes:[
        {
            path:'/',
            component:MainA,
            name:'Main',
            redirect:'/home',
            children:[
                // {path:'home',name:'home',component:Home},
                // {path:'user',name:'user',component:User},
                // {path:'mall',name:'mall',component:mail},
                // {path:'page1',name:'page1',component:PageOne},
                // {path:'page2',name:'page2',component:PageTwo}
            ]
        },
        {
            path:'/login',
            name:'login',
            component:Login
        }

    ]
})




export default router