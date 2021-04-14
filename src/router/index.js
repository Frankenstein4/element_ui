import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'
import Welcome from '../components/Welcome.vue'
import Users from '../components/user/users.vue'
import Rights from '../components/power/Rights.vue'
import Roles from '../components/power/Roles.vue'
import Hello from '../components/HelloWorld.vue'

//const Good = ()=>import("@/components/goods/goods.vue")
const Good  = () => import(/* webpackChunkName: 'ImportFuncDemo' */ '@/components/goods/goods.vue')
Vue.use(VueRouter)


const originalPush = VueRouter.prototype.push
   VueRouter.prototype.push = function push(location) {
   return originalPush.call(this, location).catch(err => err)
}




  const routes = [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/hello',
      component:Hello
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home,
      redirect:'/welcome',
      children:[
        {
          path:'/welcome',
          component:Welcome
        },
        {
          path:'/users',
          component:Users
        },
        {
          path:'/rights',
          component:Rights
        },
        {
          path:'/roles',
          component:Roles
        },
        {
            path:'/goods',
            //component:Good
            component: resolve=>(require(["@/components/goods/goods"],resolve))
        },
        {
            path:'/params',
            //component:Good
            component: resolve=>(require(["@/components/goods/template"],resolve))
        }
      ]
    }
]

const router = new VueRouter({
  routes
})

//路由导航守卫
/* router.beforeEach((to,from,next)=>{
  if(to.path==="/login") return next();
 const token = window.sessionStorage.getItem('token');
 if(!token){
   return next("/login")
 }else{
   next()
 }
}) */

export default router
