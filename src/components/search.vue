<template>
  <div class="search-box">
    <i class="iconfont iconsearch"></i><input class="input" type="text" @focus="inSearch" @blur="outSearch" placeholder="搜索" />
    <div class="search-msg" v-show="show">
      <div class="msg-item">
        <p>热门搜索</p>
        <ul class="result">
          <li class="ihover">周深</li>
          <li class="ihover">五月天</li>
          <li class="ihover">蒙面唱将猜猜猜·宫廷背包客</li>
          <li class="ihover">我们的歌</li>
        </ul>
      </div>
      <div class="msg-item">
        <p>搜索记录</p>
        <ul></ul>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Search extends Vue {
  show = false
  inSearch(): void{
    this.show = true;
  }
  outSearch(): void{
    this.show = false
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .search-box{
    display: flex;
    align-items: center;
    width: 200px;
    height: 30px;
    padding: 0 15px;
    border-radius: 5px;
    background: #ddd;
  }
  .search-box i{
    color:#555;
    font-size: 14px;
  }
  .input{
    flex: 1;
    width: 0;
    padding-left: 10px;
    background: none;
  }
  .search-msg{
    width: 320px;
    box-shadow: -3px 0 3px #eee;
    position: fixed;
    top:60px;
    bottom:70px;
    right: 0;
    background: #fff;
    z-index: 9;
  }
  .msg-item{
    color: #555;
    padding:20px;
  }
  .result{
    display: flex;
    flex-wrap: wrap;
    padding-top: 20px;
  }
  .result li{
    border:1px solid #ccc;
    border-radius: 3px;
    margin-right: 10px;
    margin-bottom: 15px;
    padding:5px 10px;
    cursor: pointer;
  }
</style>
