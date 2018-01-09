<template>
  <div class="hello">
    <h1>{{ msg }}</h1>
    <h2>Essential Links</h2>
    <ul>
        <li><a href="https://vuejs.org" target="_blank">Core Docs</a></li>
        <li><a href="https://forum.vuejs.org" target="_blank">Forum</a></li>
        <li><a href="https://chat.vuejs.org" target="_blank">Community Chat</a></li>
        <li><a href="https://twitter.com/vuejs" target="_blank">Twitter</a></li>
        <br>
      <li><a href="http://vuejs-templates.github.io/webpack/" target="_blank">Docs for This Template</a></li>
    </ul>
    <h2>Ecosystem</h2>
    <ul>
      <li><a href="http://router.vuejs.org/" target="_blank">vue-router</a></li>
      <li><a href="http://vuex.vuejs.org/" target="_blank">vuex</a></li>
      <li><a href="http://vue-loader.vuejs.org/" target="_blank">vue-loader</a></li>
      <li><a href="https://github.com/vuejs/awesome-vue" target="_blank">awesome-vue</a></li>
    </ul>
    <h2>通过mock来的数据</h2>
    <ul>
      <li v-for="(item, index) in agentsbaseList" v-text="item" :key="index"></li>
    </ul>
    <ul class='icon'>
        <li ><icon-svg iconClass="qq"></icon-svg></li>
        <li ><icon-svg iconClass="wechat"></icon-svg></li>
        <li ><icon-svg iconClass="weibo"></icon-svg></li>
    </ul>
    <img ref="checkCode" src="http://192.168.1.103/api/code" alt="img test">
  </div>
</template>

<script>
import { mapActions, mapGetters } from 'vuex';
import {login} from '@/api/log'
import axios from  'axios'

export default {
    name: 'HelloWorld',
    data() {
        return {
            msg: 'Welcome to Your Vue.js App',
        };
    },
    computed: {
        ...mapGetters([
            'agentsbaseList',
        ]),
    },
    methods: {
        ...mapActions([
            'getAgentsBaseList',
        ]),
    },
    mounted() {
        this.getAgentsBaseList()
        .then(() => {
            // console.log(this.agentsbaseList);
        });
        // .catch((err) => {
        //     console.log(err);
        // });

        let p={
            name: 'test',
            password: '123',
            code: '1234'
        }
        console.log(login)
        login(p).then( res => console.log(res.data));
        // axios.post('/api/login', p).then( res => console.log(res.data)).catch( err => console.log(err.data))
        axios.get('/api/code').then( res => this.$refs.checkCode.src = res.data)


    },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang='scss'>
h1, h2 {
  font-weight: normal;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}

.icon{
    font-size: 48px;
    li{
        text-align:center;
        font-size: 60px;
        color: #fff;
        border: 1px solid #E1E1E1;
        padding: 10px;
        transition: all .3s;
        height: 70px;
        width: 70px;
        border-radius: 50%;
        &:nth-child(1){
            background-color: #6BBBEE;
        }
        &:nth-child(2){
            background-color: #6BBD52;
        }
        &:nth-child(3){
            background-color: #F76B6D;
        }

        &:hover:nth-child(1){
            color: #6BBBEE;
            background-color: #fff;
        }
        &:hover:nth-child(2){
            color: #6BBD52;
            background-color: #fff;
        }
        &:hover:nth-child(3){
            color: #F76B6D;
            background-color: #fff;
        }

    }
}
</style>
