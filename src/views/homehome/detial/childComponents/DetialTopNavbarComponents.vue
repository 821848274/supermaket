<template>
  <div class="">
    <nav-bar class="">
      <div slot="left" class="backItem" @click="backItemClick">
        <img src="~assets/img/common/back.svg" alt="">
      </div>
      
      <div slot="center" class="title">
        <div  v-for="(item,index) in titles" class="title-item" :class="{active:currentIndex === index}" @click="itemClick(index)">
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'

export default {
  name: "DetialTopNavbarComponents",
  components:{
    NavBar
  },
  data(){
    return {
      titles:['商品', '参数', '评论', '推荐'],
      currentIndex:0
    }
  },
  methods:{
    itemClick(index){
      this.currentIndex = index

      this.$emit('itemTextClick',index)
    },
    backItemClick(){
      this.$router.back()
    }
  }
}
</script>

<style scoped>


.title{
  display: flex;
}

.title-item{
  flex: 1;
  font-size: 12px;
}
.active{
  color: var(--color-high-text);
}

.backItem img{
  margin-top: 10px;
}
</style>