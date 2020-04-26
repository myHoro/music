<template>
  <div class="discovery-box">
    <Swiper class="swiper-box" :img="img" />
    <div class="discovery-title">推荐歌单</div>
    <div class="show-tj">
      <router-link class="show-link" v-for="e in tjSongSheetList" :key="e.id" to="">
        <ListCard :msg="e.copywriter" :title="e.name" :imgSrc="e.picUrl" />
      </router-link>
    </div>
    
    <div class="discovery-title">最新音乐</div>
    <ul class="discovery-newsong">
      <li v-for="(e, i) in newMusicList" :key="e.id" @click="playing(e)" class="discovery-newsong-li ihover">
        <div class="discovery-newsong-no">
          <template v-if="i<9">0</template>{{i+1}}
        </div>
        <div class="discovery-newsong-img">
          <img :src="e.song.album.blurPicUrl" />
          <i class="iconfont iconbf"></i>
        </div>
        <div class="discovery-newsong-msg">
          <p>{{e.name}}</p>
          <p>{{e.song.artists[0].name}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import Swiper from '@/components/swiper.vue'
import ListCard from '@/components/listCard.vue'

import { banner, tjSongSheet, newMusic } from '@/request/api'
@Component({
  components:{
    Swiper,
    ListCard
  }
})
export default class Discovery extends Vue {
  img = []
  tjSongSheetList = []
  newMusicList = []

  playing(e: any){
    console.log(e)
    const data = {
      id:e.id,
      time: e.song.duration
    }
    this.$store.commit('SET_PLAYINGMUSIC', data)
  }

  created(){
    banner().then((res: any) => {
      console.log(res)
      this.img = res.banners.map((e: any) => e.imageUrl)
    })
    
    tjSongSheet(10).then((res: any) => {
      console.log(res)
      this.tjSongSheetList = res.result
    })

    newMusic().then((res: any) => {
      console.log(res)
      this.newMusicList = res.result
    })
  }
}
</script>
<style scoped>
  .discovery-box{
    max-width: 1500px;
    margin: 0 auto;
    padding:20px 45px;
  }
  .swiper-box{
    height: 240px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;
  }
  .discovery-title{
    font-size: 20px;
    padding-top: 30px;
    padding-bottom: 15px;
  }
  .show-tj{
    display: flex;
    justify-content: space-between;
    flex-wrap: wrap;
  }
  .show-link{
    display: block;
    width: 19%;
    margin-bottom: 20px;
  }
  .discovery-newsong{
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 20px;
  }
  .discovery-newsong-li{
    display: flex;
    padding:10px 20px
  }
  .discovery-newsong-no{
    line-height: 80px;
    font-size: 16px;
    padding-right: 15px;
  }
  .discovery-newsong-img{
    width: 80px;
    height: 80px;
    position: relative;
  }
  .discovery-newsong-img img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: contain;
  }
  .discovery-newsong-img i{
    width: 32px;
    height: 32px;
    text-align: center;
    line-height: 32px;
    color: #29a1f7;
    font-size: 22px;
    background: rgba(255, 255, 255, .5);
    border-radius: 50%;
    position: absolute;
    top:50%;
    left: 50%;
    transform: translate(-50%, -50%);
    /* top:0;
    right: 0;
    bottom: 0;
    left: 0;
    margin: auto; */
  }
  .discovery-newsong-msg{
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding:12px 0 12px 10px;
  }
</style>