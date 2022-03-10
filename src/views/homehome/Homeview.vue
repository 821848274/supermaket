<template>
  <div id="home">
    <nav-bar class="home-nav"><div slot="center">购物街</div></nav-bar>

    <tab-control ref="refTabControl2" class="tab-control-item" :class="{tabControlItemTop:isShowFixed}" :titles="['流行', '新款', '精选']" @itemTextClick="itemTextClick" v-show="isShowFixed"></tab-control>

    <!--    <homeview-swiper :banners="banners"/>
        <recommend-view :recommends="recommends"/>-->
    <scroll class="scroll" ref="scroll" @scrollClick="scrollClick" :probeType="3" @loadMore="loadMore" :pullUpLoad="true">
      <homeview-swiper :banners="banners" @imgLoadOK="imgLoadOK"></homeview-swiper>
      <home-recommondview :recommond="recommends"></home-recommondview>

      <feature-view></feature-view>

      <tab-control ref="refTabControl1" class="tab-control-item" :titles="['流行', '新款', '精选']" @itemTextClick="itemTextClick"></tab-control>

      <goods-list :goodslist="showGoodsList"></goods-list>
    </scroll>
    <back-top class="backtop" @click.native="backTopClick" v-show="isShow"></back-top>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import TabControl from '@/components/content/tabcontrol/TabControl'
import GoodsList from '@/components/content/goods/GoodsList'
import Scroll from '@/components/common/scroll/Scroll'
import BackTop from "@/components/content/backTop/BackTop";

import HomeviewSwiper from './childrenCommons/HomeviewSwiper'
import HomeRecommondview from "@/views/homehome/childrenCommons/HomeRecommondview"
import FeatureView from "@/views/homehome/childrenCommons/FeatureView"

import {getHomeMultidata,getHomeGoods} from "@/network/home";


export default {
  name: "Homeview",
  components:{
    NavBar,
        TabControl,
        GoodsList,
        Scroll,
        BackTop,

        HomeviewSwiper,
        HomeRecommondview,
        FeatureView
  },
  data(){
    return {
      banners : [],
      recommends : [],
      goods:{
        'pop':{page:0,list:[]},
        'new':{page:0,list:[]},
        'sell':{page:0,list:[]}
      },
      currentType : 'pop',

      isShow:false,
      offsetTop:0,
      isShowFixed:false,
      saveY:0
    }
  },
  methods:{
    // 轮播图加载成功
    imgLoadOK(){
      this.offsetTop = this.$refs.refTabControl1.$el.offsetTop
    },
    // 上拉加载
    loadMore(){
      this.getHomeGoods(this.currentType)
      this.$refs.scroll.finishPullUp()
      this.$refs.scroll.refresh()
    },

    // 返回顶部按钮 隐藏/显示
    scrollClick(position){

      this.isShow = (-position.y) > 1000

      // 设置吸顶是否起作用
      this.isShowFixed = (-position.y) > this.offsetTop
    },

    // 返回顶部
    backTopClick(){
      this.$refs.scroll.scrollTo(0,0)
    },

    // 流行元素text标题
    itemTextClick(type){
      const typeArr = ['pop','new','sell']
      this.currentType = typeArr[type]

      this.$refs.refTabControl1.cruuentIndex = type
      this.$refs.refTabControl2.cruuentIndex = type
      // console.log(type);
    },


    // 网络获取数据相关
    getHomeMultidata(){
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      })
    },
    getHomeGoods(type){
      let sendPage = this.goods[type].page + 1;
      getHomeGoods(type,sendPage).then(res => {
        this.goods[type].list.push(...res.data.list)
        this.goods[type].page += 1

      })
    }
  },
  computed:{
    showGoodsList(){
      return this.goods[this.currentType].list
    }
  },
  created() {
    this.getHomeMultidata();
    // 请求商品数据
    this.getHomeGoods('pop');
    this.getHomeGoods('new');
    this.getHomeGoods('sell');
  },
  activated() {

    this.$refs.scroll.scroll.refresh()
    this.$refs.scroll.scroll.scrollTo(0,this.saveY,0)
  },
  deactivated() {
    this.saveY = this.$refs.scroll.scroll.y
  }
}
</script>

<style scoped>
#home {
  /*padding-top: 44px;*/
  height: 100vh;
  position: relative;

}

.home-nav {
  background-color: var(--color-tint);
  color: #fff;

 /* position: sticky;
  top: 0px;*/

  /*在使用浏览器原生滚动时, 为了让导航不跟随一起滚动*/
  /*position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 999;*/
}

.tab-control-item{
  /*position: sticky;*/
  /*top: 44px;*/

  /*z-index: 999;
  background-color: #fff;*/
}

.scroll{
  position: absolute;
  overflow: hidden;

  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;

  /*background-color: #fff;*/
  /*height:calc(100% - 49px);
  overflow: hidden;*/
}


.tab-control-item{
  position: relative;
  z-index: 999;
}
</style>