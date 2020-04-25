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
      <li v-for="(e, i) in newMusicList" :key="e.id">
        <div>{{i+1}}</div>
        <div><img :src="e.picUrl" alt=""></div>
        <div>
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
export default class Login extends Vue {
  img = []
  tjSongSheetList = []
  newMusicList = []
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
    font-size: 18px;
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
    margin-bottom: 15px;
  }
</style>