<template>
  <div class="mvs-main">
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
    <Pagination :total="totalPage" @change="getCurrentPage" style="padding-right:20px" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue } from 'vue-property-decorator';

import { searchKeywords } from '@/request/api'
import ListCard from '@/components/listCard.vue'
import Pagination from '@/components/Pagination.vue'
@Component({
  components: {
    ListCard,
    Pagination
  }
})
export default class SearchMvs extends Vue {
  @Inject() searchRoot!: any

  limit = 24
  pageIndex = 1
  totalPage = 0
  list = []
  
  getList(){
    const data = {
      limit: this.limit,
      offset: this.$utils.pageOffset(this.pageIndex, this.limit),
      keywords: this.searchRoot.keywords,
      type:1004
    }
    searchKeywords(data).then((res: any) => {
      const d = res.result
      this.list = d.mvs
      this.totalPage = this.$utils.pageTotal(this.limit, d.mvCount)
      this.searchRoot.setCount(d.mvCount)
    })
  }
  getCurrentPage(e: number){
    this.pageIndex = e;
    this.getList()
  }
  created(){
    this.getList()
    this.searchRoot.setNameOn('MV')
  }
 
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
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
.mvs-main{
  max-width: 1500px;
  margin: 0 auto;
  padding:30px 100px 50px 100px; 
  .mvs-box{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
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
