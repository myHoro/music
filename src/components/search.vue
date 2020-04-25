<template>
  <div class="search-box">
    <i class="iconfont iconsearch"></i><input class="input" type="text" @focus="inSearch" @blur="outSearch" placeholder="搜索" />
    <div class="search-msg" v-show="show">
      <div class="msg-item">
        <p>热门搜索</p>
        <ul class="result">
          <li v-for="(e, i) in list" :key="i" class="ihover">{{e.first}}</li>
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
import { searchHot } from '@/request/api'
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

  list = [];
  created(){
    searchHot().then((res: any) => {
      this.list = res.result.hots
    })
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
    background: #e8e8e8;
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
    box-shadow: -1px 0 5px rgba(0, 0, 0, .2);
    position: fixed;
    top:60px;
    bottom:70px;
    right: 0;
    background: #fff;
    z-index: 999;
  }
  .msg-item{
    color: #555;
    padding:0 20px 20px 20px;
  }
  .msg-item:first-child{
    padding-top: 20px;
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
    margin-bottom: 12px;
    padding:5px 10px;
    cursor: pointer;
  }
</style>
