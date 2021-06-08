<template>
  <div id="app" class="wrapper">
      <router-view v-slot="{ Component }">
        <keep-alive>
          <Component :is="Component" v-if="$route.meta.keepAlive" />
        </keep-alive>
          <Component :is="Component"  v-if="!$route.meta.keepAlive"/>
      </router-view>
    <main-tab-bar/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import MainTabBar from '@/components/content/mainTabbar/MainTabBar'

export default defineComponent({
  name: 'App',
  components: {
    MainTabBar
  }
});
</script>
<style>
  @import "./assets/css/base.css";
</style>
