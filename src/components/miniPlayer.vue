<template>
  <div class="mini-play">
    <div class="progress"><ProgressBar :volume="percent" @change="getPercent" /></div>
    <div class="mini-main">
      <div class="common-mini mini-L"></div>
      <div class="common-mini mini-C">
        <i class="iconfont iconpre"></i>
        <i @click="play" class="iconfont" :class="isPlay?'iconpause':'iconstart'"></i>
        <i class="iconfont iconnext"></i>
      </div>
      <div class="common-mini mini-R">
        <div class="play-type">
          <i class="iconfont iconplaysx"></i>
        </div>
        <div class="play-music-list">
          <i class="iconfont iconmusiclist"></i>
        </div>
        <div class="play-sound">
          <i @click="noVolume" class="iconfont" :class="volume==0?'iconnosound':'iconsound'"></i>
          <div class="sound-box">
            <ProgressBar :showbtn="true" :volume="volume" @change="getVolume" />
          </div>
        </div>
      </div>
    </div>
    <audio
      :src="`https://music.163.com/song/media/outer/url?id=${playingMsuic.id}.mp3`"
      @canplay="isCanPlay"
      @timeupdate="updateTime"
      @ended="end"
      ref="audio">
    </audio>
  </div>
</template>

<script lang="ts">
import store from '../store/index'

import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import ProgressBar from './progressBar.vue'
@Component({
  components:{
    ProgressBar
  }
})
export default class MiniPlayer extends Vue {
  dVolume!: number
  volume = this.defaultVolume
  get defaultVolume(){
    return Number(localStorage.getItem('default_volume')) || .7
  }
  getVolume(e: number){
    this.audio.volume = e
    this.saveDefaultVolume(e)
  }
  noVolume(){ //静音
    if(this.volume!=0){
      this.dVolume = this.volume
      this.volume = this.audio.volume = 0
      this.saveDefaultVolume(0)
    }else{
      this.volume = this.audio.volume = this.dVolume
      this.saveDefaultVolume(this.dVolume)
    }
  }
  saveDefaultVolume(e: any){ //记录设置的音量值
    localStorage.setItem('default_volume', e)
  }

  isPlay = true
  play(): void{
    this.isPlay = !this.isPlay
    if(this.isPlay == true){
      this.audio.play()
    }else{
      this.audio.pause()
    }
  }

  percent = 0;
  isCanPlay(e: any){ // 音频准备完毕。可以播放
    this.isPlay = true
    this.audio.play()
  }
  updateTime(e: any){ //audio -> timeupdate 事件，播放实时进度
    const time = e.target.currentTime;
    this.percent = time/(this.playingMsuic.time/1000);
  }
  getPercent(e: number){ //调节歌曲进度
    this.audio.currentTime = this.playingMsuic.time/1000*e
  }
  end(){ //播放完毕触发
    this.isPlay = false;
  }
  
  get playingMsuic(){ //获取播放音乐数据
    console.log(this.$store.state.playingMusic)
    return this.$store.state.playingMusic
  }

  get audio(): any{ //audio播放器
    return this.$refs.audio
  }

  mounted(){
    this.audio.volume = this.volume //页面加载完毕，设置音量为默认音量
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .mini-play{
    height: 70px;
  }
  .mini-main{
    display: flex;
    justify-content: space-between;
    height: 67px;
  }
  .progress{
    display: flex;
    align-items: center;
    height: 3px;
    position: relative;
    z-index: 9;
  }
  .common-mini{
    flex: 1;
    display: flex;
    align-items: center;
    box-sizing: border-box;
    width: 0;
    height: 100%;
  }
  .mini-L{
    padding-left: 20px;
  }
  .mini-C{
    justify-content: center;
    color: #29a1f7;
  }
  .iconstart, .iconpause{
    font-size: 60px;
    margin: 0 20px;
  }
  .iconpre, .iconnext{
    font-size: 30px;
  }
  .mini-R{
    justify-content: flex-end;
    padding-right: 20px;
  }
  .mini-R i{
    font-size: 20px;
    margin-left: 18px;
  }
  .play-sound{
    display: flex;
    align-items: center;
  }
  .iconsound, .iconnosound{
    margin-right: 10px;
  }
  .sound-box{
    width: 150px;
  }
</style>
