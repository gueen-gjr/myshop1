<template>
  <div id="cart">
    <!-- 顶部导航 -->
    <nav-bar class="cart-nav">
      <template v-slot:center>
        <div>购物车(<span>{{length}}</span>)</div>
      </template>
    </nav-bar>
    <!-- 商品列表 -->
    <cart-list></cart-list>
    <!-- 底部汇总 -->
    <cart-botton-bar />
  </div>
</template>

<script>
import NavBar from '@/components/common/navbar/NavBar'
import CartList from './childComps/CartList'
import CartBottonBar from './childComps/CartBottonBar'

import { mapGetters } from 'vuex'

export default {
  name:"Cart",
  components:{
    NavBar,
    CartList,
    CartBottonBar
  },
  computed:{
    //取得加入购物车商品个数
    // cartLength(){
    //   return this.$store.state.cartList.length
    // }
    ...mapGetters({
      length:'cartLength',
    })
  }
}
</script>

<style>
  .cart{
    height: 100vh;
  }
  .cart-nav{
    background-color: var(--color-tint);
    color: white;

    /* position: fixed;
    left: 0;
    right: 0;
    top: 0;
    z-index: 9; */
  }
</style>