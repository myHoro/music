<template>
  <div class="header">
    <div class="user-box">
      <div class="login" v-if="isLogin">
        <div><img src="" alt="" /></div>
        <p></p>
      </div>
      <div v-else class="no-login" @click="login"><i class="iconfont iconuser"></i>未登录</div>
    </div>
    <Search />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import Search from '@/components/search.vue'
@Component({
  components:{
    Search
  }
})
export default class Header extends Vue {
  isLogin = false;

  login(): void{
    console.log('此处弹出登录框')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 60px;
    box-shadow: 0 1px 2px #ccc;
    padding:0 20px;
    background: #f9f9f9;
  }
  .no-login{
    display: flex;
    align-items: center;
    color: #555;
    cursor:pointer;
  }
  .iconuser{
    font-size: 24px;
    margin-right: 10px;
  }
</style>
