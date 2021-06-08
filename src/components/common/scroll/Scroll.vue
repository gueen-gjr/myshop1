<template>
<!-- ref 绑定给子组件 -->
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll, { PullUpLoad } from 'better-scroll'

export default {
  name:"Scroll",
  props:{
    probeType:{
      type:Number,
      default: 0
    },
   pullUpLoad:{
     type:Boolean,
     default:false
   }
  },
  data(){
    return { 
      scroll:null
    }
  },
  mounted(){
    //1.创建better-scroll对象
    this.scroll = new Bscroll(this.$refs.wrapper,{
      observeDOM:true,
      observeImage:true,
      click:true,
      tabs:true,
      probeType: this.probeType,
      pullUpLoad: this.pullUpLoad,
      keepAlive: true
    })
    //2.监听滚动区域
    if (this.probeType === 2 || this.probeType === 3){
      this.scroll.on('scroll',(position) =>{
        this.$emit('scroll',position)
      })
    }
    //3.监听上拉事件
    if (this.pullUpLoad){
      this.scroll.on('pullingUp', () =>{
        // console.log('监听到滚动到底部');
        this.$emit('pullingUp')
      })
    }
  },
  methods: {
    scrollTo(x, y, time=300){
      this.scroll.scrollTo(x, y, time)
    },
    refresh(){
      // console.log("-----")
      this.scroll && this.scroll.refresh()
    },
    finishPullUp(){
      this.scroll.finishPullUp()
    },
    getScrollY(){
      return this.scroll ? this.scroll.y : 0
    }
    
  },
  
}
</script>

<style>

</style>