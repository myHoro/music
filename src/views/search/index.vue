<template>
  <div class="search-page">
    <div class="tip">
      <span class="keywords">{{keywords}}</span>
      <span class="result">共找到{{count}}个结果</span>
    </div>
    <Tab :item="tabs" align="left" class="searchTab" @value="getValue" :name-on="nameOn" />
    <router-view></router-view>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Watch, Inject, Vue } from 'vue-property-decorator';
import Tab from '@/components/tab.vue'
@Component({
  components: {
    Tab
  }
})
export default class SearchMain extends Vue {
  tabs = [
    {name:'歌曲', value:'searchMusic'},
    {name:'歌单', value:'searchSongList'},
    {name:'MV', value:'searchMvs'}
  ]

  rOn = 'searchMusic'
  getValue(e: string){
    if(e != this.rOn){
      this.rOn = e;
      this.$router.push({name:e})
    }
  }
  
  nameOn = ''
  setNameOn(e: any){
    this.nameOn = e
  }
  
  valueOn = ''
  @Prop() keywords!: string

  count = 0;
  setCount(count: number){
    this.count = count
  }
  
  @Inject() reload!: any
  @Watch('$route') routeChange(){ //直接监听路由变化刷新吧，方便...
    this.reload()
  }

  @Provide() searchRoot = this
  // provide(){ //privete, 可以返回对象让子路由通过 inject:['searchRoot']获取
  //  return {
  //   searchRoot: this //将this 返回，子路由可通过searchRoot调用/获取当前路由的方法/数据
  //  }
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .search-page{
    .tip{
      padding: 20px 30px;
      .keywords{
        font-size: 32px;
        margin-right: 8px;
      }
      .result{
        font-size: 18px;
        color: #bbb;
      }
    }
    .searchTab{
      border-bottom: 1px solid #eee;
    }
  }
</style>
<style scoped>
  .searchTab >>> .tab-ul{
    font-size: 20px;
    padding-left: 10px;
  }
</style>
