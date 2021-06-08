<template>
  <tab-bar>
      <tab-bar-item path="/home" activeColor="red">
        <template v-slot:item-icon><img src="@/assets/img/tabbar/home.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="@/assets/img/tabbar/home-active.svg" alt=""></template>
        <template v-slot:item-text><div>首页</div></template>
      </tab-bar-item>
      <tab-bar-item path="/category" activeColor="red">
        <template v-slot:item-icon><img src="@/assets/img/tabbar/category.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="@/assets/img/tabbar/category-active.svg" alt=""></template>
        <template v-slot:item-text><div>分类</div></template>
      </tab-bar-item>
      <tab-bar-item path="/cart" activeColor="red">
        <template v-slot:item-icon><img src="@/assets/img/tabbar/shopcar.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="@/assets/img/tabbar/shopcar-active.svg" alt=""></template>
        <template v-slot:item-text><div>购物车</div></template>
      </tab-bar-item>
      <tab-bar-item path="/profile" activeColor="red">
        <template v-slot:item-icon><img src="@/assets/img/tabbar/profile.svg" alt=""></template>
        <template v-slot:item-icon-active><img src="@/assets/img/tabbar/profile-active.svg" alt=""></template>
        <template v-slot:item-text><div>我的</div></template>
      </tab-bar-item>
    </tab-bar>
</template>

<script>
import TabBar from '@/components/common/tabbar/TabBar.vue'
import TabBarItem from '@/components/common/tabbar/TabBarItem.vue'


export default {
  name:"MainTabBar",
  components:{
    TabBar,
    TabBarItem
  }
}
</script>

<style>

</style>