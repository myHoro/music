<template>
  <div class="right-playlist" :class="{'right-playlist-show':tf}">
    <div class="tabs">
      <p :class="{tabOn: tabOn==0}" @click="changeTab(0, '播放列表')">播放列表</p>
      <p :class="{tabOn: tabOn==1}" @click="changeTab(1, '历史记录')">历史记录</p>
    </div>
    <div v-show="tabOn == 0">
      <div class="list-title">
        <div>总共{{playlistMusic.length}}首</div>
        <p><i class="iconfont icondel"></i>清空</p>
      </div>
      <ul>
        <li v-for="(e, i) in playlistMusic" :key="i"></li>
      </ul>
    </div>
    <div v-show="tabOn == 1">
      <div class="list-title">
        <div>总共{{playlistHistory.length}}首</div>
        <p class="del"><i class="iconfont icondel"></i>清空</p>
      </div>
      <table class="list-table" cellspacing="0">
        <tr class="thead"><td width="220">音乐</td><td width="200">歌手</td><td width="80">时长</td></tr>
        <tr v-for="(e, i) in playlistHistory" :key="e.id" class="ihover" :class="{on: i==0}" @click="playMusic(e)">
          <td><div class="overHiiden">{{e.name}}</div></td>
          <td><div class="overHiiden">{{e.singer}}</div></td>
          <td>{{$utils.timeInterval(e.time)}}</td>
        </tr>
      </table>
    </div>
    <p v-show="(tabOn==0&&playlistMusic.length==0)||(tabOn==1&&playlistHistory.length==0)" class="no-tip">暂无歌曲</p>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import store from '../store';
@Component({
  components: {
    
  }
})
export default class RightPlaylist extends Vue {
  get tf(){
    return store.state.playlistShow
  }
  @Watch('tf') tfChange(e: boolean){
    setTimeout(() => {
      if(e){
        this.canClick()
      }else{
        this.removeClick()
      }
    },0)
  }
  clickOut(e: any){
    const isMini = e.path.some((item: any) => item.className&&item.className.includes('mini-play'))
    // 判断是否点击的是mini-play区域
    const isPlaylist = e.path.some((item: any) => item.className&&item.className.includes('right-playlist'))
    // 判断是否点击的是playlist区域
    if(!(isMini || isPlaylist)) store.commit('SET_PLAYLISTSHOW', false)
    // 当点击这2块区域时，不调用commit方法
  }
  canClick(){
    document.addEventListener('mousedown', this.clickOut)
  }
  removeClick(){
    document.removeEventListener('mousedown', this.clickOut)
  }
  beforeDestroy() {
    this.removeClick()
  }


  tabOn = 1
  changeTab(on: number, txt: string){
    this.tabOn = on
  }
  get playlistMusic(){
    return store.state.playlistMusic
  }
  get playlistHistory(){
    return store.state.playlistHistory
  }
  playMusic(e: any){
    this.$utils.startMusic(e)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .right-playlist{
    width: 500px;
    box-shadow: -2px 0 5px #ccc;
    background: #fff;
    transform: translateX(500px);
    transition: transform .3s;
    position: fixed;
    right: 0;
    top:0;
    bottom: $miniPlayerHeight;
    z-index: 8;
    .tabs{
      display: flex;
      justify-content: center;
      font-size: 18px;
      color: #777;
      padding-top: 10px;
      p{
        cursor: pointer;
        margin:10px 15px;
      }
      .tabOn{
        color: #000;
      }
    }
    .list-title{
      display: flex;
      justify-content: space-between;
      font-size: 16px;
      padding:10px 15px;
      border-bottom: 1px solid #eee;
      .del{
        display: flex;
        align-items: center;
        cursor: pointer;
        font-size: 14px;
        .icondel{
          font-size: 20px;
          margin-right: 3px;
          vertical-align: middle;
        }
      }
    }
    .list-table{
      width: 100%;
      color: #555;
      font-size: 14px;
      .thead{
        td{
          font-size: 16px;
          padding:5px 15px 0 15px;
          &:last-child{
            padding: 0;
          }
        }
      }
      .on td{
        color: $blue !important;
      }
      td{
        height: 36px;
        &:first-child{
          color: #000;
          font-size: 15px;
        }
        div{
          padding:0 15px
        }
      }
    }
    .no-tip{
      text-align: center;
      font-size: 20px;
      color: #777;
      padding-top: 50px;
    }
  }
  .right-playlist-show{
    transform: translateY(0);

  }
</style>
