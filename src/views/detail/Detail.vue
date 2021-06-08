<template>
  <div id="detail">
    <detail-nav-bar class="detail-nav" @titleClick="titleClick" ref="nav"/>
    <scroll class="content" 
            ref="scroll" 
            :probe-type="3" 
            @scroll="contentScroll">
      <detail-swiper :top-images = "topImages"/>
      <detail-base-info :goods = "goods" />
      <detail-shop-info :shop = "shop"/>
      <detail-goods-info :detail-Info = "detailInfo" @datailImageLoad="datailImageLoad"/>
      <detail-param-info ref="params" :param-info = "paramInfo"/>
      <detail-comment-info ref="comment" :comment-info = "commentInfo"/>
      <goods-list ref="recommend" :goods = "recommends" />
      <!-- <div>{{$store.state.cartList.length}}</div> -->
    </scroll>
    <detail-bottom-bar @addCart="addToCart" />

    <back-top @click.native="backClick" v-show="isShowBackTop" />
    <toast :message="message" :show='show' />
  </div>
</template>

<script>
import DetailNavBar from './childComps/DetailNavBar'
import DetailSwiper from './childComps/DetailSwiper'
import DetailBaseInfo from './childComps/DetailBaseInfo'
import DetailShopInfo from './childComps/DetailShopInfo'
import DetailGoodsInfo from './childComps/DetailGoodsInfo'
import DetailParamInfo from './childComps/DetailParamInfo'
import DetailCommentInfo from './childComps/DetailCommentInfo'
import DetailBottomBar from './childComps/DetailBottomBar'

import Scroll from '@/components/common/scroll/Scroll'
import GoodsList from "@/components/content/goods/GoodsList"
import BackTop from '@/components/content/backTop/BackTop'
import Toast from '@/components/common/toast/Toast'

import {debouce} from '@/common/utils';
import { mapActions } from 'vuex'
import {getDetail, Goods, shop, GoodsParam, getRecommend} from '@/network/detail'

export default {
  name:"Detail",
  components:{
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailBottomBar,
    GoodsList,
    Scroll,
    BackTop,
    Toast
  },
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommends: [],
      themeTopYs: [],
      newRefresh: null,
      getThemeTopY: null,
      currentIndex: null,
      isShowBackTop: false,
      message: '',
      show: false
    }
  },
  mounted() {
    this.newRefresh = debouce(this.$refs.scroll.refresh, 100)
  },
  created() {
    //保存iid
    this.iid = this.$route.params.iid
    // this.item_id = this.$route.params.item_id
    //根据iid请求数据
    getDetail(this.iid).then(res => {
      // console.log(res);
      const data = res.result;
      this.topImages = data.itemInfo.topImages
      //2.获取商品信息
      this.goods = new Goods(data.itemInfo, data.columns, data.shopInfo.services)
      // console.log(this.goods)
      //3.创建店铺信息
      this.shop = new shop(data.shopInfo)
      // console.log(this.shop)
      //4.获取商品详情数据
      this.detailInfo = data.detailInfo;
      //5.获取商品信息
      this.paramInfo = new GoodsParam(data.itemParams.info, data.itemParams.rule)
      // console.log(this.paramInfo)
      //6.取出评论信息
      if(data.rate.cRate !==0){
        this.commentInfo = data.rate.list[0]
        }
      //9.给获取top值加个防抖
      this.getThemeTopY = debouce(() =>{
        //9.获取各个组件距离顶部距离(等图片加载完后)
        this.themeTopYs = []
        this.themeTopYs.push(0); 
        this.themeTopYs.push(this.$refs.params.$el.offsetTop-'44')
        this.themeTopYs.push(this.$refs.comment.$el.offsetTop-'44')
        this.themeTopYs.push(this.$refs.recommend.$el.offsetTop-'44')  
        this.themeTopYs.push(Number.MAX_VALUE)  
          // console.log(this.themeTopYs);
      },100)
        
    }),
    //7.请求推荐数据
      getRecommend().then(res => {
        // console.log(res)
        this.recommends = res.data.list
        // console.log(this.recommends)
      })
    },
    methods: {
      ...mapActions(['addCart']),
      addToCart(){
        //1.获取购物车需要展示的信息
        const product = {}
        product.image = this.topImages[0]
        product.title = this.goods.title;
        product.desc = this.goods.desc;
        product.price = this.goods.realPrice
        product.iid = this.iid
        //将商品添加到购物车
        this.addCart(product).then(res => {
          this.show = true
          this.message = res;
          setTimeout(() => {
            this.show = false
            this.message = ''
          },1500)
        })
        // this.$store.commit('addCart', product)
        // this.$store.dispatch('addCart',product).then(res =>{
        // console.log(res)
        // })
      },
      //回到顶部按钮
      backClick(){
        // console.log(this.$refs)
        this.$refs.scroll.scrollTo(0, 0, 500)
      },
      datailImageLoad(){
        this.newRefresh()//防抖了的
        // this.$refs.scroll.refresh()（未防抖的）
        // console.log('++++++++')
        this.getThemeTopY()
      },
      titleClick(index){
        // console.log(index)
        this.$refs.scroll.scrollTo(0, -this.themeTopYs[index], 200)
        // console.log(this.$refs)
      },
      //监听滚动，根据滚动看顶部联动
      contentScroll(position){
        //1.监听BackTop是否显示
        this.isShowBackTop = (-position.y) > 500
        // console.log(position)
        //1.获取Y值
        const positionY = -position.y
        //2.positionY和主题中值进行对比
        let length = this.themeTopYs.length
        for(let i = 0 ; i < length-1; i++){
          // console.log(i)

          // if(positionY > this.themeTopYs[i] && positionY<this.themeTopYs[i+1]){
          //   console.log(i)

          // if(this.currentIndex !== i && ((i < length - 1 && positionY >= this.themeTopYs[i] && positionY < 
          //     this.themeTopYs[i+1]) || (i === length - 1 && positionY >= this.themeTopYs[i])))
          if(this.currentIndex !== i && (positionY >= this.themeTopYs[i] && positionY < this.themeTopYs[i+1]))
          {
                // console.log(i)
              this.currentIndex = i;
              // console.log(this.currentIndex)
              this.$refs.nav.currentIndex = this.currentIndex
              }
        }
      }
    }
  }
</script>

<style scoped>
  #detail{
    position: relative;
    z-index: 9;
    background-color: #fff;
    height: 100vh;
  }
  .content{
    height: calc(100% - 44px - 49px);
    /* padding-top: 44px; */
  }
  .detail-nav{
    position: relative;
    z-index: 9;
    background-color: #fff;
  }
</style>