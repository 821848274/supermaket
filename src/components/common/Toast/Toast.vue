<template>
  <div class="toast" v-show="isShow">
    <div>{{message}}</div>
  </div>

</template>

<script>
export default {
  name: "Toast",
  props:{
    message:{
      type:String,
      default:''
    },
    isShow:{
      type:Boolean,
      default: false
    }
  },
  methods:{
    showMessage(message,time){
      this.isShow = !this.isShow
      this.message = message

      setTimeout(() => {
        this.isShow = !this.isShow
        this.message = ''
      },time)
    }
  }
}
</script>

<style scoped>
.toast{
  position: fixed;

  background-color: rgba(0,0,0,.75);
  padding: 5px 8px;
  z-index: 999;
  border-radius: 5px;

  top: 50%;
  left: 50%;
  transform: translate(-50%,-50%);
}
</style>