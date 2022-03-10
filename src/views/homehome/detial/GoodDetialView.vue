<template>
  <div class="gooddetialview-root">
    <detial-top-navbar-components class="gooddetialview-top-navbar" @itemTextClick="itemTextClick" ref="detialtopnavbarcomponents"></detial-top-navbar-components>

    <scroll class="gooddetialview-scroll" @scrollClick="scrollClick" :probeType="3" ref="GoodDetialScroll" >
      <detial-swiper :swipers="goodTopSwiperImgArr"></detial-swiper>
      <detail-base-info :goods="gootInfo"></detail-base-info>
      <detail-shop-info :shop="shopInfos"></detail-shop-info>
      <detail-goods-info :detailInfo="goodsInfo" @imageLoad="imageLoad" @freshScrollY="freshScrollY"></detail-goods-info>
      <detail-param-info :paramInfo="goodsParam" ref="detailparaminfo"></detail-param-info>
      <detail-comment-info :commentInfo="commentInfo" ref="detailcommentinfo"></detail-comment-info>
      <goods-list :goodslist="goodslist" ref="goodslist"></goods-list>
    </scroll>

    <detail-bottom-bar @addCart = "addCart"></detail-bottom-bar>
    <back-top  @click.native="backTopClick" v-show="isShow"></back-top>


  </div>
</template>

<script>
import DetialTopNavbarComponents from "@/views/homehome/detial/childComponents/DetialTopNavbarComponents"
import Scroll from "@/components/common/scroll/Scroll";
import GoodsList from "@/components/content/goods/GoodsList";
import BackTop from "@/components/content/backTop/BackTop";

import DetialSwiper from "@/views/homehome/detial/childComponents/DetialSwiper";
import DetailBaseInfo from './childComponents/DetailBaseInfo'
import DetailShopInfo from './childComponents/DetailShopInfo'
import DetailGoodsInfo from "@/views/homehome/detial/childComponents/DetailGoodsInfo";
import DetailParamInfo from './childComponents/DetailParamInfo'
import DetailCommentInfo from "@/views/homehome/detial/childComponents/DetailCommentInfo";
import DetailBottomBar from './childComponents/DetailBottomBar'

import {getDetialGood,Goods,Shop,GoodsParam,getRecommend} from '@/network/detial'
import {debounce} from '@/components/common/debounce/debounce'


export default {
  name: "GoodDetialView",
  components:{
    DetialTopNavbarComponents,
    Scroll,
    GoodsList,
    DetialSwiper,
    BackTop,

    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
  },
  data(){
    return {
      gootInfo:{},
      goodTopSwiperImgArr:[],
      shopInfos: {},
      goodsInfo:{},
      goodsParam:{},
      commentInfo:{},
      goodslist:[],
      scrollToY:[],
      currentIndex:0,
      isShow:false,

    }
  },
  methods:{
    addCart(){
      //获取购物车需要展示的信息，对象的形式
      const product = {};
      product.image = this.goodTopSwiperImgArr[0];
      product.title = this.gootInfo.title;
      product.desc = this.gootInfo.desc;
      product.price = this.gootInfo.realPrice;
      product.iid = this.$route.params.id
      product.newPrice = this.newPrice;

      /*console.log(this.$store.getters.cartGoodsList);*/
      //将商品添加购物车里 vuex
      this.$store.dispatch('addCart',product).then(res => {
        console.log(res)

        this.$toast.showMessage(res,2000)
      })
    },

    // 返回顶部
    backTopClick(){
      this.$refs.GoodDetialScroll.scrollTo(0,0)
    },

    scrollClick(position){

      // backTop 是否显示
      this.isShow = (-position.y) > 1000

      const scrollY = position.y
      /*console.log(postion.y);
      console.log(this.scrollToY);*/

       for (let i = 0;i < this.scrollToY.length-1;i++) {
         if(this.currentIndex !== i &&(scrollY <= this.scrollToY[i] && scrollY > this.scrollToY[i+1])){
           console.log(i);

           debounce(function () {
             this.currentIndex = i
             this.$refs.detialtopnavbarcomponents.currentIndex = i
           },300)
         }
       }
    },

    itemTextClick(index){
      this.$refs.GoodDetialScroll.scrollTo(0,this.scrollToY[index],500)

      console.log(this.scrollToY[index]);
    },


    freshScrollY(){

      this.freshScrollYArr()
    },
    imageLoad(){
      this.$refs.GoodDetialScroll.scroll.refresh()

      this.freshScrollYArr()
      /*console.log(this.scrollToY);
      console.log('imageLoadOK');*/

    },
    freshScrollYArr(){
      this.scrollToY.length = 0
      this.scrollToY.push(0)
      this.scrollToY.push(-this.$refs.detailparaminfo.$el.offsetTop)
      this.scrollToY.push(-this.$refs.detailcommentinfo.$el.offsetTop)
      this.scrollToY.push(-this.$refs.goodslist.$el.offsetTop)

      // 多余的值,用作计算
      this.scrollToY.push(-this.$refs.goodslist.$el.offsetTop*1.1)
    },

  },
  created() {
    getDetialGood(this.$route.params.id).then(res => {
      const data = res.result
      this.goodTopSwiperImgArr = data.itemInfo.topImages

      this.gootInfo = new Goods(data.itemInfo, data.columns, data.shopInfo.services)

      this.shopInfos = new Shop(data.shopInfo)

      this.goodsInfo = data.detailInfo

      this.goodsParam = new GoodsParam(data.itemParams.info, data.itemParams.rule)

      if (data.rate.cRate !== 0) {
        this.commentInfo = data.rate.list[0] || {};
      }

    })



    // 发送网络请求
    getRecommend().then(res => {

      this.goodslist = res.data.list

      this.$refs.GoodDetialScroll.refresh()

      /*console.log(this.goodslist);*/
    });
  },


}
</script>

<style scoped>
.gooddetialview-root{
  height: 100vh;

  position: relative;
  z-index: 999;
  background-color: #fff;
}
.gooddetialview-scroll{
  height: calc(100% - 44px);

}
.gooddetialview-top-navbar{
  position: relative;
  z-index: 999;
  background-color: #fff;
}
</style>