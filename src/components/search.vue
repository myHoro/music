<template>
  <div class="search-box">
    <i class="iconfont iconsearch"></i><input class="input" type="text" v-model="searchKey" @focus="show = true" @keyup.enter="searchSumit" placeholder="搜索" />
    <Toggle :show="show" :domClass="['search-box']" @updata:show="show = false">
      <div class="search-msg" v-show="show">
        <div class="msg-item">
          <p>热门搜索</p>
          <ul class="result">
            <li v-for="(e, i) in list" :key="i" class="ihover" @click="goSearch(e.first)">{{e.first}}</li>
          </ul>
        </div>
        <div class="msg-item">
          <p>搜索记录</p>
          <ul class="result" v-show="searchKeyHistory.length">
            <li v-for="(e, i) in searchKeyHistory" :key="i" class="ihover" @click="goSearch(e)">{{e}}</li>
          </ul>
          <div v-show="!searchKeyHistory.length" class="no-search-key">暂无搜索记录</div>
        </div>
      </div>
    </Toggle>
  </div>
</template>

<script lang="ts">
import { searchHot } from '@/request/api'
import { Component, Prop, Vue } from 'vue-property-decorator';
import Toggle from './toggle.vue'
import store from '../store';
@Component({
  components: {
    Toggle
  }
})
export default class Search extends Vue {
  show = false
  inSearch(): void{
    this.show = true;
  }
  
  list = [];

  searchKey = '';
  searchKeyHistory: string[] = []
  searchSumit(){
    const i: number = this.searchKeyHistory.findIndex(e => e==this.searchKey)
    if(i==-1){
      this.searchKeyHistory.push(this.searchKey)
    }else{
      this.searchKeyHistory.splice(i, 1);
      this.searchKeyHistory.unshift(this.searchKey)
    }
    localStorage.setItem('search_key', this.searchKeyHistory.join(','))
    this.$router.push({name:'searchMusic', params:{keywords: this.searchKey}})
    //使用  /search/:params 的时候path无效，需要使用name属性进行路由导航，否则页面不会跳转
    this.show = false
  }
  goSearch(e: string){
    // const t = new Date().getTime()+''
    this.$router.push({name:'searchMusic', params:{keywords:e}})
    // this.$router.push('search/'+e)
    this.show = false
  }

  created(){
    searchHot().then((res: any) => {
      this.list = res.result.hots
    })
    if(localStorage.getItem('search_key')) this.searchKeyHistory = localStorage.getItem('search_key')!.split(',')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .search-box{
    display: flex;
    align-items: center;
    width: 200px;
    height: 30px;
    padding: 0 15px;
    border-radius: 5px;
    background: #e8e8e8;

    i{
      color:#555;
      font-size: 14px;
    }
    .input{
      flex: 1;
      width: 0;
      padding-left: 10px;
      background: none;
    }
  }
  
  .search-msg{
    width: 360px;
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
    &:first-child{
      padding-top: 20px;
    }
    .result{
      display: flex;
      flex-wrap: wrap;
      padding-top: 20px;

      li{
        border:1px solid #ccc;
        border-radius: 3px;
        margin-right: 10px;
        margin-bottom: 12px;
        padding:5px 10px;
        cursor: pointer;
      }
    }
    .no-search-key{
      text-align: center;
      font-size: 20px;
      color: #555;
      padding-top: 30px;
    }
  }
  
</style>
