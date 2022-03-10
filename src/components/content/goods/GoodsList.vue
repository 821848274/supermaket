<template>
  <div class="goods">
    <goods-list-item :goodsitem="item" v-for="(item,index) in goodslist" :key="index"></goods-list-item>
  </div>
</template>

<script>
import GoodsListItem from "@/components/content/goods/GoodsListItem";
export default {
  name: "GoodsList",
  components:{
    GoodsListItem
  },
  props:{
    goodslist : {
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.goods {
  /*将对象作为弹性伸缩盒显示*/
  display: flex;

  /*控制flex容器是单行或者多行，同时横轴的方向决定了新行堆叠的方向。wrap：flex容器为多行。该情况下flex子项溢出的部分会被放置到新行，子项内部会发生断行*/
  flex-wrap: wrap;

  /*设置或检索弹性盒子元素在主轴（横轴）方向上的对齐方式 space-around:弹性盒子元素会平均地分布在行里，两端保留子元素与子元素之间间距大小的一半。*/
  justify-content: space-around;


  padding: 2px;
}
</style>