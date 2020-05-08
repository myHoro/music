<template>
  <div class="new-mvs">
    <div class="filter">
      <p>地区：</p>
      <Tab :item="areaArr" @value="getArea" align="left" />
    </div>
    <div class="filter">
      <p>类型：</p>
      <Tab :item="typeArr" @value="getType" align="left" />
    </div>
    <div class="filter">
      <p>排序：</p>
      <Tab :item="sortArr" @value="getSort" align="left" />
    </div>
    <ul class="mvs-box">
      <router-link tag="li" v-for="e in list" :key="e.id" to="">
        <div class="mv-msg">
          <div class="playCount">
            <i class="iconfont iconbf"></i>{{$utils.formatNumber(e.playCount)}}
          </div>
          <img :src="$utils.imgSize(e.cover, 500, 260)" />
          <i class="iconfont iconbf mvplay"></i>
          <span class="time">{{$utils.timeInterval(e.duration)}}</span>
        </div>
        <div class="mvname-singer">
          <p class="mv-name overHidden">{{e.name}}</p>
          <p class="singer-name">{{e.artistName}}</p>
        </div>
      </router-link>
    </ul>
    <Pagination :total="total" :nowPage.sync="nowPageIndex" @change="getCurrentPage" />
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { newMvs } from '@/request/api'

import Tab from '@/components/tab.vue';
import Pagination from '@/components/pagination.vue';
  @Component({
    components:{
      Tab,
      Pagination
    }
  })
export default class NewMvs extends Vue {
  areaArr = [
    {name:'全部', value:'全部'},
    {name:'内地', value:'内地'},
    {name:'港台', value:'港台'},
    {name:'欧美', value:'欧美'},
    {name:'日本', value:'日本'},
    {name:'韩国', value:'韩国'},
  ]
  typeArr = [
    {name:'全部', value:'全部'},
    {name:'官方版', value:'官方版'},
    {name:'原声', value:'原声'},
    {name:'现场版', value:'现场版'},
    {name:'网易出品', value:'网易出品'}
  ]
  sortArr = [
    {name:'上升最快', value:'上升最快'},
    {name:'最热', value:'最热'},
    {name:'最新', value:'最新'},
  ]
  nowPageIndex = 0
  getArea(e: string){
    this.area = e
    this.pageIndex = this.nowPageIndex = 1
    this.getList()
  }
  getType(e: string){
    this.type = e
    this.pageIndex = this.nowPageIndex = 1
    this.getList()
  }
  getSort(e: string){
    this.order = e
    this.pageIndex = this.nowPageIndex = 1
    this.getList()
  }
  pageIndex = 1
  limit = 24
  type = '全部'
  order = '上升最快'
  area = '全部'
  total = 0
  list = []
  getList(){
    newMvs({
      limit:this.limit,
      offset: this.$utils.pageOffset(this.pageIndex, this.limit),
      type:this.type,
      order:this.order,
      area:this.area
    }).then((res: any) => {
      console.log(res)
      if(this.pageIndex == 1){
        this.total = this.$utils.pageTotal(this.limit, res.count)
      }
      this.list = res.data
    })
  }
  getCurrentPage(e: number){
    this.pageIndex = e
    this.getList()
  }

  created(){
    this.getList()
  }
}
</script>
<style lang="scss" scoped>
.play-icon{
  width: 32px;
  height: 32px;
  text-align: center;
  line-height: 32px;
  color: $blue;
  font-size: 22px;
  background: rgba(255, 255, 255, .5);
  border-radius: 50%;
  position: absolute;
  top:50%;
  left: 50%;
  transform: translate(-50%, -50%);
}
.new-mvs{
  max-width: 1500px;
  margin: 0 auto;
  padding: 10px 100px 60px 100px;
  .filter{
    display: flex;
    align-items: center;
  }
  .mvs-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-top: 20px;
    padding-bottom: 15px;
    li{
      width: 23%;
      cursor: pointer;
      margin-bottom: 30px;
      &:hover{
        .play-icon{
          display: block;
        }
      }
      .mv-msg{
        position: relative;
        padding-top: 56%;

        img{
          width: 100%;
          height: 100%;
          border-radius: 6px;
          position: absolute;
          top:0;
          left: 0;
        }
        .playCount{
          display: flex;
          align-items: center;
          color: #fff;
          font-size: 16px;
          position: absolute;
          top:6px;
          right: 10px;
          z-index: 3;

          i{
            font-size: 18px;
            margin-right: 5px;
          }
        }
        .mvplay{
          @extend .play-icon;
          display: none;
          width: 46px;
          height: 46px;
          line-height: 46px;
          font-size: 28px;
        }
        .time{
          position: absolute;
          right: 10px;
          bottom: 5px;
          color: #fff;
        }
      }
      .mvname-singer{
        padding-top: 5px;
        .mv-name{
          font-size: 16px;
        }
        .singer-name{
          font-size: 14px;
          color: #777;
          padding-top: 5px;
        }
      }
    }
  }
}
</style>
<style scoped>
  .filter >>> .tab-ul{
    padding:0 ;
  }
</style>