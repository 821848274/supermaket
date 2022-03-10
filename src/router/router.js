import Vue from 'vue'
import Router from 'vue-router'


const Homeview = () => import('@/views/homehome/Homeview.vue')
const Category  = () => import ('@/views/category/Category.vue')
const Cart  = () => import ('@/views/cart/Cart.vue')
const Profile  = () => import ('@/views/profile/Profile.vue')

const GoodDetialView  = () => import ('@/views/homehome/detial/GoodDetialView')

const originalPush=Router.prototype.push
Router.prototype.push=function push(location){
  return originalPush.call(this,location).catch(err=>err)
}

Vue.use(Router)

const routes = [
  {
    path:'',
    redirect:'/homeview'
  },
  {
    path:'/homeview',
    component:Homeview
  },
  {
    path:'/category',
    component:Category
  },
  {
    path:'/cart',
    component:Cart
  },
  {
    path:'/profile',
    component:Profile
  },
  {
    path:'/gooddetialview/:id',
    component:GoodDetialView
  }
]

export default new Router({
  routes,
  mode: 'history'
})
