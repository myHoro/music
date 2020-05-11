<template>
  <div class="main">
    <div class="main-menu">
      <Nav />
    </div>
    <div class="main-content">
      <router-view v-if="isReload" />
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Provide } from 'vue-property-decorator';
import Nav from './nav.vue'
@Component({
  components:{
    Nav
  }
})
export default class Main extends Vue {
  isReload = true
  reflesh() {
    this.isReload = false;
    this.$nextTick(function(){
      this.isReload = true;
    })
  }
  @Provide() reload = this.reflesh
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .main{
    display: flex;
    height: calc(100vh - 130px);
    .main-menu{
      width: 250px;
    }
    .main-content{
      flex: 1;
      min-width: 1000px;
      overflow: auto;
    }
  }
</style>
