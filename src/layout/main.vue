<template>
  <div class="main">
    <div class="main-menu">
      <Nav />
    </div>
    <div class="main-content">
      <router-view />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Nav from './nav.vue'
@Component({
  components:{
    Nav
  }
})
export default class Main extends Vue {
  
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .main{
    display: flex;
    height: calc(100vh - 130px);
  }
  .main-menu{
    width: 250px;
  }
  .main-content{
    flex: 1;
    min-width: 1000px;
    overflow: auto;
  }
  ::-webkit-scrollbar { /* 滚动条-容器 */
    width: 5px;
    background-color: #eee;
  }
  ::-webkit-scrollbar-thumb { /* 滚动条-块 */
    border-radius:1px;
    background: #ccc;
  }
</style>
