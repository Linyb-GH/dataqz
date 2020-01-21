<template>
  <div id="app">
    <!-- <router-view></router-view>
    <main-tab-bar/> -->
    <test/>
  </div>
</template>

<script>
  //import MainTabBar from './components/mainTabbar/MainTabBar'
  import Test from './components/iview/test'

  export default {
    name: 'App',
    components: {
      //MainTabBar,
      Test
    }
  }


</script>

<style>
  @import "./assets/css/base.css";
</style>
