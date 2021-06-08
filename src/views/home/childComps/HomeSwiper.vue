<template>
  <swiper>
      <swiper-item v-for="item in banners" :key="item">
        <a :href="item.link">
          <img :src="item.image" alt="" @load="imageLoad">
        </a>
      </swiper-item>
    </swiper>
</template>

<script>
import {Swiper, SwiperItem} from '@/components/common/swiper'
  // import Swiper from '@/components/common/swiper/Swiper'
  // import SwiperItem from '@/components/common/swiper/SwiperItem'

export default {
  name:"HomeSwiper",
  props:{
    banners:{
      type:Array,
      default(){
        return[]
      }
    }
  },
  components:{
    Swiper,
    SwiperItem
  },
  data() {
    return {
      isLoad:false
    }
  },
  methods: {
    imageLoad(){
      if(!this.isLoad){
        this.$emit('swiperImgeLoad')
        this.isLoad = true
      }
    }
  },
}
</script>

<style>

</style>