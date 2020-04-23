<template>
  <div class="main">
    <div class="main-menu">
      <Nav />
    </div>
    <div class="main-content"></div>
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
    width: 300px;
  }
  .main-content{
    flex: 1;
  }
</style>
