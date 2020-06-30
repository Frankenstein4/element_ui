import Vue from 'vue'
import VueRouter from 'vue-router'
//import Home from '../views/Home.vue'
import Login from '../components/Login.vue'
import Home from '../components/Home.vue'



Vue.use(VueRouter)

  const routes = [
    {
      path:'/',
      redirect:'/login'
    },
    {
      path:'/login',
      component:Login
    },
    {
      path:'/home',
      component:Home
    }
]

const router = new VueRouter({
  routes
})

//路由导航守卫
router.beforeEach((to,from,next)=>{
  if(to.path==="/login") return next();
 const token = window.sessionStorage.getItem('token');
 if(!token){
   return next("/login")
 }else{
   next()
 }
})

export default router
