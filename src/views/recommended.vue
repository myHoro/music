<template>
  <div class="recommend">
    <router-link to="" class="topPlaylist" v-if="topPlaylist.id">
      <div class="img"><img :src="$utils.imgSize(topPlaylist.coverImgUrl, 300)" /></div>
      <div class="msg">
        <div class="tag">精品歌单</div>
        <div class="name">{{topPlaylist.name}}</div>
        <div class="desc">{{topPlaylist.description}}</div>
      </div>
      <div class="bg" :style="{backgroundImage:'url('+topPlaylist.coverImgUrl+')'}"></div>
    </router-link>
    <Tab :item="tab" @choose="getType" />
    <div class="playlist">
      <router-link v-for="(e, i) in list" :key="i" to="" class="playlist-link">
        <ListCard :msg="'播放量：'+$utils.formatNumber(e.playCount)" :title="e.name" :imgSrc="$utils.imgSize(e.coverImgUrl, 500)" />
      </router-link>
    </div>
    <Pagination :total="total" @change="getCurrentPage" />
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { topPlaylist, playlist } from '@/request/api'
import Tab from '@/components/tab.vue'
import ListCard from '@/components/listCard.vue'
import Pagination from '@/components/Pagination.vue'
@Component({
  components: {
    Tab,
    ListCard,
    Pagination
  }
})

export default class Recommend extends Vue {
  topPlaylist = {}
  tab: string[] = [ "全部", "欧美", "华语", "流行", "说唱", "摇滚", "民谣", "电子", "轻音乐", "影视原声", "ACG", "怀旧", "治愈", "旅行" ]
  
  cat = '全部'
  pageIndex = 1;
  limit = 25;
  total = 0;
  list = [];
  getType(e: string){
    this.pageIndex = 1
    this.cat = e
    this.getPlaylist();
  }
  getCurrentPage(e: number){
    console.log(e)
    this.pageIndex = e;
    this.getPlaylist()
  }
  getPlaylist(){
    this.list = []
    playlist({
      limit: this.limit,
      offset: this.$utils.pageOffset(this.pageIndex, this.limit),
      cat: this.cat
    }).then((res: any) => {
      if(this.pageIndex == 1){
        this.total = this.$utils.pageTotal(this.limit, res.total)
      }
      this.list = res.playlists
    })
  }

  created(){
    topPlaylist({
      limit: 1,
      cat: '全部'
    }).then((res: any) => {
      // console.log(res.playlists[0])
      this.topPlaylist = res.playlists[0]
    });
    this.getPlaylist()
  }
}
</script>
<style lang="scss" scoped>
  .recommend{
    max-width: 1500px;
    margin: 0 auto;
    padding: 30px 100px 60px 100px;

    .topPlaylist{
      display: flex;
      border-radius: 8px;
      padding:20px;
      overflow: hidden;
      position: relative;
      .img{
        position: relative;
        z-index: 1;
        img{
          display: block;
          width:180px;
          height: 180px;
          border-radius: 3px;
        }
      }
      .msg{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding:10px 15px 10px;
        position: relative;
        z-index: 1;

        .tag{
          font-size: 16px;
          align-self:flex-start;
          color: #29a1f7;
          border:1px solid #29a1f7;
          border-radius: 5px;
          padding:6px 12px;
        }
        .name{
          color: #fff;
          font-size: 24px;
        }
        .desc{
          color: #bbb;
          line-height: 20px;
        }
      }
      .bg{
        width: 100%;
        height: 100%;
        filter: blur(18px);
        background-size: cover;
        position: absolute;
        top:0;
        left: 0;
        z-index: 0;
      }
    }

    .playlist{
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      padding-bottom: 15px;

      .playlist-link{
        width: 19%;
        margin-bottom: 25px;
      }
    }
  }
  
</style>