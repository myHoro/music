<template>
  <div class="search-music">
    <div class="table-box">
      <ul class="song-ul">
        <li class="song-head">
          <p class="no"></p>
          <p class="common">音乐标题</p>
          <p class="common">歌手</p>
          <p class="common">专辑</p>
          <p class="times">时长</p>
        </li>
        <li v-for="(e, i) in list" :key="e.id" @click="playing(i)" class="song-main" :class="{on: e.id==playingMusic.id}">
          <div class="no">
            <i v-if="e.id==playingMusic.id" class="iconfont iconsound"></i>
            <span v-else>{{i+1}}</span>
          </div>
          <div class="common">
            <div class="song-name">
              <p class="overHidden">{{e.name}}</p>
              <p><i v-if="e.mvid" class="iconfont iconvideo" /></p>
            </div>
            <p v-if="e.alias.length" class="alias">{{e.alias.join('、')}}</p>
          </div>
          <div class="common overHidden">{{e.artists}}</div>
          <div class="common overHidden">{{e.from}}</div>
          <div class="times">{{$utils.timeInterval(e.duration)}}</div>
        </li>
      </ul>
    </div>
    <Pagination :total="totalPage" @change="getCurrentPage" :nowPage.sync="nowPageIndex" style="padding-right:20px" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Inject, Vue, Watch } from 'vue-property-decorator';
import { searchKeywords } from '@/request/api'

import Pagination from '@/components/pagination.vue'
import store from '../../store';
@Component({
  components: {
    Pagination
  }
})

export default class SearchMusic extends Vue {
  @Inject() searchRoot!: any
  
  playing(i: number){
    this.$utils.startMusic(this.list[i])
  }

  limit = 50
  pageIndex = 1
  totalPage = 0
  list = []

  getList(){
    const data = {
      limit: this.limit,
      offset: this.$utils.pageOffset(this.pageIndex, this.limit),
      keywords: this.searchRoot.keywords
    }
    searchKeywords(data).then((res: any) => {
      // console.log(res)
      const d = res.result
      this.totalPage = this.$utils.pageTotal(this.limit, d.songCount)
      this.list = d.songs.map((e: any) => {
        const data = this.$utils.createSongMsg(e)
        data.alias = e.alias
        return data
      })
      this.searchRoot.setCount(d.songCount)
    })
  }
  getCurrentPage(e: number){
    this.pageIndex = e;
    this.getList()
  }

  nowPageIndex = 0
  @Watch('searchRoot.keywords') paramChange(e: any){
    this.pageIndex = this.nowPageIndex = 1
    this.getList()
  } 

  get playingMusic(){
    return store.state.playingMusic
  }
  created(){
    this.getList()
    this.searchRoot.setNameOn('歌曲')
    //this.searchRoot.nameOn = '歌曲';
    //直接修改父级页面的变量不会生效，页面不会相应，需要在父级页面添加一个修改的方法，调用其方法，并把要修改的值传给此方法，才会生效
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.search-music{
  padding-bottom: 30px;
  .table-box{
    color: #222;
    padding-bottom: 30px;
    .song-ul{
      li{
        display: flex;
        padding:10px 0;
        align-items: center;
        .common{
          flex:1;
          box-sizing: border-box;
          width: 0;
          padding:0 10px;
          .song-name{
            display: flex;
            align-items: center;
            span{
              display: block;
            }
            .iconvideo{
              cursor: pointer;
              color: $blue;
              font-size:24px;
              margin-left: 10px;
            }
          }
        } 
        .no{
          width: 80px;
          text-align: center;
          color: #bbb;
          .iconsound{
            color: $blue;
            font-size: 18px;
          }
        }
        .times{
          width: 65px;
        }
      }
      .song-head{
        p{
          font-size: 18px;
          color: #999;
          padding-bottom: 5px;
          &:nth-child(2){
            color: #000;
          }
        }
      }
      .song-main{
        &:nth-child(odd){
          background: #f9f9f9;
        }
        &:hover{
          background:#e9e9e9
        }
        div{
          font-size: 16px;
          .alias{
            color: #bbb;
            font-size: 14px;
            padding-top: 15px;
          }
        }
      }
      
      .on{
        color: $blue;
      }
    }
  }
}
</style>
