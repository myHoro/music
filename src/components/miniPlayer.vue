<template>
  <div class="mini-play">
    <div class="progress"><ProgressBar :volume="percent" :is-volume="false" @change="getPercent" /></div>
    <div class="mini-main">
      <div class="common-mini mini-L">
        <template v-if="playingMusic.id">
          <div class="music-img"><img :src="$utils.imgSize(playingMusic.img, 80)" /></div>
          <div class="music-singer-box">
            <div class="music-singer">
              <p>{{playingMusic.name}}</p> - <span>{{playingMusic.singer}}</span>
            </div>
            <div class="music-time">
              {{timeUse||'00:00'}}/{{$utils.timeInterval(playingMusic.time)}}
            </div>
          </div>
        </template>
      </div>
      <div class="common-mini mini-C">
        <i class="iconfont iconpre"></i>
        <i @click="play" class="iconfont" :class="isPlay?'iconpause':'iconstart'"></i>
        <i class="iconfont iconnext"></i>
      </div>
      <div class="common-mini mini-R">
        <div class="play-type">
          <i class="iconfont iconplaysx"></i>
        </div>
        <div class="play-music-list" @click="showPlaylist">
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
      :src="playingMusic.id?`https://music.163.com/song/media/outer/url?id=${playingMusic.id}.mp3`:''"
      @canplay="isCanPlay"
      @timeupdate="updateTime"
      @ended="end"
      @error="playError"
      ref="audio">
    </audio>
  </div>
</template>

<script lang="ts">
import { Component, Ref, Vue } from 'vue-property-decorator';
import ProgressBar from './progressBar.vue'
import store from '../store';

@Component({
  components:{
    ProgressBar
  }
})
export default class MiniPlayer extends Vue {
  @Ref() audio!: HTMLAudioElement

  dVolume!: number
  volume = this.defaultVolume
  get defaultVolume(){
    return Number(localStorage.getItem('default_volume')) || .7
  }
  getVolume(e: number){
    this.audio.volume = this.volume = e
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
    if(!this.playingMusic.id) return;
    this.isPlay = !this.isPlay
    if(this.isPlay == true){
      this.audio.play()
    }else{
      this.audio.pause()
    }
  }
  percent = 0;
  timeUse = '';
  isCanPlay(){ // 音频准备完毕。可以播放
    this.isPlay = true
    this.audio.play()
    store.commit('SET_ISPLAYING', true)
  }
  updateTime(e: any){ //audio -> timeupdate 事件，播放实时进度
    const time = e.target.currentTime;
    this.timeUse = this.$utils.timeInterval(e.target.currentTime*1000)
    this.percent = time/(this.playingMusic.time/1000);
  }
  getPercent(e: number){ //调节歌曲进度
    this.audio.currentTime = this.playingMusic.time/1000*e
  }
  end(){ //播放完毕触发
    this.isPlay = false;
    store.commit('SET_ISPLAYING', false)
  }
  playError(){
    if(this.playingMusic.id){
      alert('播放失败')
      store.commit('SET_ISPLAYING', false)
    }
    
  }
  get playingMusic(): any{ //获取播放音乐数据
    return store.state.playingMusic
  }

  get playlistShow(){
    return store.state.playlistShow
  }
  showPlaylist(){
    store.commit('SET_PLAYLISTSHOW', !this.playlistShow)
  }


  mounted(){
    this.audio.volume = this.volume //页面加载完毕，设置音量为默认音量
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .mini-play{
    height: 70px;

    .progress{
      display: flex;
      align-items: center;
      height: 3px;
      position: relative;
      z-index: 9;
    }
    
    .mini-main{
      display: flex;
      justify-content: space-between;
      height: 67px;
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
        .music-img{
          box-sizing: border-box;
          height: 100%;
          padding:5px 10px 5px;
          overflow: hidden;
          img{
            height: 100%;
            border-radius: 6px;
          }
        }
        .music-singer-box{
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          box-sizing: border-box;
          height: 100%;
          padding:12px 0;
          
          .music-singer{
            display: flex;
            align-items: baseline;
            p{
              font-size: 16px;
              padding-right: 5px;
            }
            span{
              font-size: 14px;
              color: #555;
              padding-left: 5px;
            }
          }
          .music-time{
            color: #555;
          }
        }
      }
      
      .mini-C{
        justify-content: center;
        color: #29a1f7;
        .iconstart, .iconpause{
          font-size: 60px;
          cursor: pointer;
          margin: 0 20px;
        }
        .iconpre, .iconnext{
          font-size: 30px;
          cursor: pointer;
        }
      }

      .mini-R{
        justify-content: flex-end;
        padding-right: 20px;
        i{
          font-size: 20px;
          margin-left: 18px;
          cursor: pointer;
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
      }
    }
  }
</style>