<template>
  <div class="new-song">
    <Tab :item="tab" @value="getType" />
    <table cellspacing="0" coll class="music-table">
      <tr v-for="(e, i) in list" :key="e.id" class="ihover" :class="{on: i==on}" @click="playing(i)">
        <td class="no">
          <span v-show="i!=on">{{i+1}}</span>
          <i v-show="i==on" class="iconfont iconsound"></i>
        </td>
        <td><img :src="$utils.imgSize(e.picture, 100)" /></td>
        <td class="name">{{e.name}}<i v-if="e.mvid" class="iconfont iconvideo"></i></td>
        <td>{{e.artists}}</td>
        <td>{{e.from}}</td>
        <td class="time">{{$utils.timeInterval(e.duration)}}</td>
      </tr>
    </table>
    <!-- <ul class="list">
      <li v-for="e in list" :key="e.id">
        <div class="no"></div>
        <div class="img"></div>
        <div class="name"></div>
        <div class="singer"></div>
        <div class="from"></div>
        <div class="time"></div>
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue, Watch } from 'vue-property-decorator'
import { newsong } from '@/request/api'
import Tab from '@/components/tab.vue'
import store from '../store'
import { mapState } from 'vuex'
@Component({
  components:{
    Tab
  }
})
export default class NewSong extends Vue {
  tab = [
    { name:'全部', value:'0' },
    { name:'华语', value:'7' },
    { name:'欧美', value:'96' },
    { name:'日本', value:'8' },
    { name:'韩国', value:'16' }
  ]
  type = '0'
  getType(e: string){
    this.type = e
    this.getNewSong()
  }

  list = []
  getNewSong(){
    newsong(this.type).then((res: any) => {
      this.list = res.data.map((item: any) => {
        return this.$utils.createSongMsg(item)
      })
      if(this.playingMusic.id){
        this.on = this.list.findIndex((item: any) => {
          return item.id == this.playingMusic.id
        })
      }
    })
  }

  on = -1;
  playing( i: number){
    this.on = i
    const e: any = this.list[i]
    this.$utils.startMusic(e)
  }
  get isPlaying(){
    return store.state.isPlaying
  }
  @Watch('isPlaying') changePlaying(e: boolean){
    if(!e) this.playing(this.on+1)
  }

  get playingMusic(): any{
    return store.state.playingMusic
  }
  
  created(){
    this.getNewSong()
  }
}
</script>
<style lang="scss" scoped>
  .new-song{
    max-width: 1500px;
    margin:0 auto;
    padding: 10px 100px 50px 100px;

    .music-table{
      width: 100%;
      tr{
        td{
          color: #777;
          font-size: 15px;
          padding:8px 10px;
          img{
            display: block;
            width: 80px;
            height: 80px;
            border-radius: 3px;
          }
        }
        .no{
          padding-right: 0;
          padding-left: 25px;
          .iconsound{
            color: $blue;
            font-size: 22px;
          }
        }
        .name{
          font-size: 16px;
          color: #000;
          .iconvideo{
            color: $blue;
            font-size: 20px;
            vertical-align: middle;
            cursor: pointer;
            margin-left: 10px;;
          }
        }
        .time{
          padding-right: 25px;
        }
      }
      .on{
        background: #f6f6f6;
        border-radius: 5px;
        .name{
          color: $blue;
          font-weight: bold;
          .iconvideo{
            font-weight: normal;
          }
        }
      }
    }
  }
</style>