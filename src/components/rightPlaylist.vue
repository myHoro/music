<template>
  <Toggle :domClass="['mini-play', 'right-playlist']" :show="tf" @updata:show="setTf" class="right-playlist">
    <div class="tabs">
      <p :class="{tabOn: tabOn==0}" @click="changeTab(0, '播放列表')">播放列表</p>
      <p :class="{tabOn: tabOn==1}" @click="changeTab(1, '历史记录')">历史记录</p>
    </div>
    <div class="list-title">
      <div>总共{{tabOn==0?playlistMusic.length:playlistHistory.length}}首</div>
      <p class="del" @click="clearList(tabOn)"><i class="iconfont icondel"></i>清空</p>
    </div>
    <div class="list-table-thead">
      <p style="width:225px">音乐</p><p style="width:210px">歌手</p><p style="width:65px">时长</p>
    </div>
    <div class="scroll-table">
      <div v-show="tabOn == 0">
        <ul>
          <li v-for="(e, i) in playlistMusic" :key="i"></li>
        </ul>
      </div>
      <div v-show="tabOn == 1">
        <table class="list-table" cellspacing="0">
          <tr v-for="(e, i) in playlistHistory" :key="e.id" class="ihover" :class="{on: i==0&&isPlay}" @click="playMusic(e)">
            <td width="225"><div style="width:225px" class="overHidden">{{e.name}}</div></td>
            <td width="210"><div style="width:210px" class="overHidden">{{e.artists}}</div></td>
            <td width="65">{{$utils.timeInterval(e.duration)}}</td>
          </tr>
        </table>
      </div>
    </div>
    <p v-show="(tabOn==0&&playlistMusic.length==0)||(tabOn==1&&playlistHistory.length==0)" class="no-tip">暂无歌曲</p>
  </Toggle>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';
import Toggle from '@/components/toggle.vue'
import store from '../store';
@Component({
  components: {
    Toggle
  }
})
export default class RightPlaylist extends Vue {
  get tf(){
    return store.state.playlistShow
  }
  setTf(){
    store.commit('SET_PLAYLISTSHOW', false)
  }

  tabOn = 1
  changeTab(on: number, txt: string){
    this.tabOn = on
  }
  clearList(e: number){
    if(e == 0){
      store.commit('SET_PLAYLISTMUSIC', {})
    }else{
      store.commit('SET_PLAYLISTHISTORY', {})
      localStorage.removeItem('play_history')
    }
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

  get isPlay(){
    return store.state.isPlaying
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.right-playlist{
  display: flex;
  flex-direction: column;
  width: 500px;
  box-shadow: -2px 0 5px #ccc;
  background: #fff;
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
    align-items: center;
    box-sizing: border-box;
    height: 45px;
    font-size: 16px;
    padding:0 15px;
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
  .list-table-thead{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 35px;
    font-size: 15px;
    p{
      box-sizing: border-box;
      padding:0 15px;
      &:last-child{
        padding: 0;
      }
    }
  }
  .scroll-table{
    flex: 1;
    overflow-y: auto;
    &::-webkit-scrollbar { /* 滚动条-容器 */
      width: 5px;
      background-color: #eee;
    }
    &::-webkit-scrollbar-thumb { /* 滚动条-块 */
      border-radius:1px;
      background: #ccc;
    }
    .list-table{
      width: 100%;
      color: #555;
      font-size: 14px;
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
        box-sizing: border-box;
          padding:0 15px
        }
      }
    }
  }
  
  .no-tip{
    text-align: center;
    font-size: 20px;
    color: #777;
    position: absolute;
    top:360px;
    left: 50%;
    transform: translateX(-50%);
  }
 }
</style>
