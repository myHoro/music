<template>
  <ul class="nav-ul">
    <router-link tag="li" v-for="(e, i) in navs" :key="i" :to="e.path" class="nav-li ihover" active-class="on">
      <i :class="'iconfont icon'+e.meta.icon"></i>
      {{e.meta.title}}
    </router-link>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {navRoutes} from '@/router'
@Component({
  created(){
    console.log(navRoutes)
  }
})
export default class Main extends Vue {
  navs = navRoutes
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .nav-ul{
    background: #ededed;
    height: 100%;
  }
  .nav-li{
    display: flex;
    align-items: center;
    height: 50px;
    cursor: pointer;
    padding:0 20px;
  }
  .on{
    background: #e2e2e2;
    color: #29a1f7;
  }
  .nav-li i{
    font-size: 18px;
    margin-right: 10px;
  }
</style>
