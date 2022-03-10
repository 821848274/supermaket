<template>
  <swiper class="detialswiper">
    <swiper-item class="detialswiper-item" v-for="(item,index) in swipers" :key="index">
      <img :src="item" alt="">
    </swiper-item>
  </swiper>
</template>

<script>
import {Swiper,SwiperItem} from "@/components/common/swiper/SwiperAll";

export default {
  name: "DetialSwiper",
  components:{
    Swiper,
    SwiperItem
  },
  props:{
    swipers : {
      type:Array,
      default() {
        return null;
      }
    }
  }
}
</script>

<style scoped>

.detialswiper{
  height: 300px;
  overflow: hidden;
}
</style>