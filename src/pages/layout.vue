<template>
  <div id="app">
    <page-header></page-header>
    <banner style="margin-top:20px;"></banner>
    <router-view/>
    <page-foot></page-foot>
  </div>
</template>

<script>
import PageHeader from '@/pages/header/index';
import PageFoot from '@/pages/footer';
import Banner from '@/pages/bannerbar';
export default {
    name: 'app',
    components:{
      PageHeader,PageFoot,Banner
    }
};
</script>

<style>
#app {
    /* font-family: 'Avenir', Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px; */
    background-color: #f9f9f9;
}
</style>
