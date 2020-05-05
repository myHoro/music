<template>
  <div class="discovery-box">
    <Swiper class="swiper-box" :img="img" />
    <div class="discovery-title">推荐歌单</div>
    <div class="show-tj">
      <router-link class="show-link" v-for="e in tjSongSheetList" :key="e.id" to="">
        <ListCard :msg="e.copywriter" :title="e.name" :imgSrc="$utils.imgSize(e.picUrl, 450)" />
      </router-link>
    </div>
    
    <div class="discovery-title">最新音乐</div>
    <ul class="discovery-newsong">
      <li v-for="(e, i) in newMusicList" :key="e.id" @click="playing(e)" class="discovery-newsong-li ihover">
        <div class="discovery-newsong-no">
          <template v-if="i<9">0</template>{{i+1}}
        </div>
        <div class="discovery-newsong-img">
          <img :src="$utils.imgSize(e.picUrl, 160)" />
          <i class="iconfont iconbf play-icon"></i>
        </div>
        <div class="discovery-newsong-msg">
          <p>{{e.name}}</p>
          <p>{{e.song.artists.map(e => e.name).join('/')}}</p>
        </div>
      </li>
    </ul>

    <div class="discovery-title">推荐MV</div>
    <ul class="mv-box">
      <li v-for="e in tjMv" :key="e.id">
        <div class="mv-msg">
          <div class="playCount">
            <i class="iconfont iconbf"></i>{{e.playCount}}
          </div>
          <img :src="$utils.imgSize(e.picUrl, 500, 260)" />
          <i class="iconfont iconbf mvplay"></i>
        </div>
        <div class="mvname-singer">
          <p class="mv-name overHidden">{{e.name}}</p>
          <p class="singer-name">{{e.artistName}}</p>
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
import { banner, tjSongSheet, newMusic, tjMv } from '@/request/api'
import store from '../store'
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
  tjMv = []
  playing(e: any){
    const data = {
      id:e.id,
      name:e.name,
      duration: e.song.duration,
      artists: e.song.artists.map((e: any) => e.name).join(','),
      picture:e.picUrl,
      mvid: e.song.mvid
    }
    this.$utils.startMusic(data)
  }

  created(){
    banner().then((res: any) => {
      // console.log(res)
      this.img = res.banners.map((e: any) => e.imageUrl)
    })
    
    tjSongSheet(10).then((res: any) => {
      // console.log(res)
      this.tjSongSheetList = res.result
    })

    newMusic().then((res: any) => {
      // console.log(res)
      this.newMusicList = res.result
    })

    tjMv().then((res: any) => {
      // console.log('MV',res)
      this.tjMv = res.result
    })
  }
}
</script>
<style lang="scss" scoped>
  .play-icon{
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
  }
  .discovery-box{
    max-width: 1500px;
    margin: 0 auto;
    padding:20px 100px;

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
      
      .show-link{
        display: block;
        width: 19%;
        margin-bottom: 20px;
      }
    }

    .discovery-newsong{
      display: grid;
      grid-template-columns: repeat(2, 1fr);
      grid-gap: 20px;

      .discovery-newsong-li{
        display: flex;
        padding:10px 20px;

        .discovery-newsong-no{
          line-height: 80px;
          font-size: 16px;
          padding-right: 15px;
        }
        .discovery-newsong-img{
          width: 80px;
          height: 80px;
          position: relative;

          img{
            display: block;
            width: 100%;
            height: 100%;
            object-fit: contain;
          }
        }
        .discovery-newsong-msg{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          padding:12px 0 12px 10px;
        }
      }
    }
    .mv-box{
      display: flex;
      justify-content: space-between;
      padding-bottom: 15px;
      li{
        width: 23%;
        cursor: pointer;
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
          
        }
        .mvname-singer{
          padding-top: 10px;
          .mv-name{
            font-size: 18px;
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