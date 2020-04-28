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
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { topPlaylist } from '@/request/api'
@Component

export default class Recommend extends Vue {
  topPlaylist = {}

  created(){
    topPlaylist({
      limit: 1,
      cat: '全部'
    }).then((res: any) => {
      console.log(res.playlists[0])
      this.topPlaylist = res.playlists[0]
    })
  }
}
</script>
<style lang="scss" scoped>
  .recommend{
    padding: 30px 100px;

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
          padding:8px 12px;
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
  }
  
</style>