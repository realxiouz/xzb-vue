<template>
  <div id="app">
    <page-head></page-head>
    <banner style="margin-top:20px;"></banner>
    <router-view/>
    <page-foot></page-foot>
  </div>
</template>

<script>
import PageHead from '@/pages/header/index';
import PageFoot from '@/pages/footer';
import Banner from '@/pages/bannerbar';
export default {
    name: 'app',
    components:{
      PageHead,PageFoot,Banner
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
