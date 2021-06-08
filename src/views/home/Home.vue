<template>
  <div id="home">
    <nav-bar class="home-nav"><template v-slot:center><div>购物街</div></template></nav-bar>
      <tab-control  :titles="['流行','新款','精选']" 
                      @tabClick="tabClick"
                      ref="tabControl1"
                      class="tab-control" v-show="isTabFixed" />
      <scroll class="content" 
              ref="scroll" 
              @scroll="contentScroll"
              :probe-type="3" 
              :pull-up-load='true'
              @pullingUp="loadMore">
        <home-swiper  :banners="banners" @swiperImgeLoad="swiperImgeLoad" />
        <recommend-view :recommends="recommends" />
        <feature-view/>
        <tab-control  :titles="['流行','新款','精选']" 
                      @tabClick="tabClick"
                      ref="tabControl2" />
       <goods-list :goods="showGoods" />
      </scroll>
    <back-top @click.native="backClick" v-show="isShowBackTop" />
  </div>
</template>

<script>
  import NavBar from '@/components/common/navbar/NavBar'
  import HomeSwiper from './childComps/HomeSwiper'
  import RecommendView from './childComps/RecommendView'
  
  import GoodsList from "@/components/content/goods/GoodsList"
  import FeatureView from './childComps/FeatureView'
  import TabControl from '@/components/content/tabControl/TabControl'
  import Scroll from '@/components/common/scroll/Scroll'
  import BackTop from '@/components/content/backTop/BackTop'

  import {getHomeMultidata, getHomeGoods} from "@/network/home"

  export default {
    name:"Home",
    components: {
      NavBar,
      HomeSwiper,
      RecommendView,
      FeatureView,
      TabControl,
      GoodsList,
      Scroll,
      BackTop
    },
    data() {
      return {
        banners: [],
        recommends: [],
        goods:{
          'pop':{page:0, list:[]},
          'new':{page:0, list:[]},
          'sell':{page:0, list:[]}
        },
        currentType:'pop',
        isShowBackTop: false,
        tabOffsetTop: 0,
        isTabFixed:false,
        saveY:0
      }
    },
    computed:{
      showGoods() {
        return this.goods[this.currentType].list
      },
    },
      unmounted() {
        console.log('home destroyed');
      },
      activated() {
        //进入组件激活的时候
        // console.log('activated');
        this.$refs.scroll.scrollTo(0, this.saveY, 50)
        this.$refs.scroll.refresh()
      },
      deactivated(){
        // 不活跃的时候
        // console.log('deactivated');
        this.saveY = this.$refs.scroll.getScrollY()
      },
    created() {
      //1.请求多个数据
      this.getHomeMultidata()
      // 请求商品数据
      this.getHomeGoods('pop')
      this.getHomeGoods('new')
      this.getHomeGoods('sell')
    },
    unmounted() {
      // console.log('home destryed')
    },
    methods: {
      //监听轮播图加载完成
      swiperImgeLoad(){
        //3.获取tabControl的offsetTop
        //所有组件都有一个属性$el：用于获取组件中的元素
        // console.log(this.$refs.tabControl.$el.offsetTop);
        this.tabOffsetTop = this.$refs.tabControl2.$el.offsetTop
      },
      //监听下拉加载更多
      loadMore(){
        // console.log('加载更多');
        this.getHomeGoods(this.currentType)
      },
      //完成下拉加载更多后调用
      finishPullUp(){
        this.scroll && this.scroll.finishPullUp
      },
      //监听滑动距离
      contentScroll(position){
        //1.监听BackTop是否显示
        this.isShowBackTop = (-position.y) > 500
        //2.决定tabControl是否吸顶（position：fixed）
        this.isTabFixed = (-position.y) > this.tabOffsetTop
      },
      // 回到顶部点击
      backClick(){
        // console.log(this.$refs)
        this.$refs.scroll.scrollTo(0, 0, 500)
      },

      /** 事件监听相关 **/
        tabClick(index){
          switch (index){
            case 0:
              this.currentType = 'pop'
              break
            case 1:
              this.currentType = 'new'
              break
            case 2:
              this.currentType = 'sell'
              break
          }
          this.$refs.tabControl1.currentIndex = index;
          this.$refs.tabControl2.currentIndex = index;
        },
      /** 网络请求相关 **/
      //给上面的this.getHomeMultidata()调用
        getHomeMultidata(){
          getHomeMultidata().then(res => {
          // console.log(res);
          this.banners = res.data.banner.list;
          this.recommends = res.data.recommend.list;
        })
      },
      //给上面的this.getHomeGoods()调用
      getHomeGoods(type){
          const page = this.goods[type].page + 1
          getHomeGoods(type, page).then(res => {
          // console.log(res);
          this.goods[type].list.push(...res.data.list)
          this.goods[type].page += 1

          //下拉加载更多
          this.$refs.scroll.finishPullUp()
        })
      }
    },
  }
</script>

<style scoped>
  #home{
    height: 100vh;
  }
  .home-nav{
    background-color: var(--color-tint);
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
  
  .content{
    /* height: calc(100% - 93px); */
    overflow: hidden;
    position: absolute;
    top: 44px;
    bottom: 49px;
    left: 0;
    right: 0;
  }
  
  /* .content{
    height: calc(100% - 93px);
    overflow: hidden;
    margin-top: 44px;
  } */
  .tab-control{
    position: relative;
    z-index: 9;
  }
  
</style>