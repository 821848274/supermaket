<template>
  <div class="recommond">
    <div class="recommond-item" v-for="(item,index) in recommond" :key="index">
      <a :href="item.link" >
        <img :src="item.image" alt="">
        <div>{{item.title}}</div>
      </a>
    </div>
  </div>
</template>

<script>
export default {
  name: "HomeRecommondview",
  props:{
    recommond : {
      type:Array,
      default() {
        return [];
      }
    }
  }
}
</script>

<style scoped>
.recommond{
  display: flex;
  text-align: center;
  font-size: 12px;
  padding: 10px 0 20px;
}

.recommond-item{
  flex: 1;
}

.recommond-item img{
  width: 70px;
  height: 70px;
  margin-bottom: 10px;
}
</style>