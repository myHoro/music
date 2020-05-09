<template>
  <div class="song-detail" :class="{show:show}">
    <div class="song-detail-main">
      <div class="song-msg">
        <div class="song-msg-left">
          <img class="play-ball" src="@/assets/img/play-bar-ball.png" />
          <img class="play-bar" :class="{'play-bar-paused':!playing}" src="@/assets/img/play-bar.png" />
          <div class="song-img-outer">
            <div class="song-img-in" :class="{'song-img-paused':!playing}">
              <img :src="$utils.imgSize(song.picture, 300)" />
            </div>
          </div>
        </div>
        <div class="song-msg-right"></div>
      </div>
    </div>
    
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import store from '../store';

@Component
export default class SongDetail extends Vue {
  get show(){
    return store.state.songDetailShow
  }

  get playing(){ //播放状态
    return store.state.isPlaying
  }
  get song(){ //播放音乐
    return store.state.playingMusic
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  @keyframes rotate{
    0% {
      transform:rotate(0)
    }
    100% {
      transform:rotate(1turn) //1turn 完整一圈
    }
  }
  .song-detail{
    width: 100%;
    // height: calc(100vh - #{$headerHeight} - #{$miniPlayerHeight});  //scss在calc中使用变量需要使用 #{} 方法
    transform: translateY(100%);
    transition: transform .3s;
    background: #fff;
    overflow-x: hidden;
    overflow-y: auto;
    position: fixed;
    top: $headerHeight;
    bottom: $miniPlayerHeight;
    &.show{ // 同级class
      transform: none
    }
    .song-detail-main{
      max-width: 1500px;
      margin: 0 auto;
      padding:0 50px;

      .song-msg{
        display: flex;
        .song-msg-left{
          flex: 1;
          position: relative;
          .play-ball{
            width: 26px;
            position: absolute;
            left: 50%;
            transform: translateX(-50%);
            top: -13px;
            z-index: 2;
          }
          .play-bar{
            width: 90px;
            transition: transform .2s;
            transform-origin: 0 0;
            position: absolute;
            left: 50%;
            margin-left: -6px;
            z-index: 1;
            &.play-bar-paused{
              transform: rotate(-30deg);
            }
          }
          .song-img-outer{
            box-sizing: border-box;
            width: 320px;
            height: 320px;
            border:7px solid #ccc;
            border-radius: 50%;
            margin: 0 auto;
            margin-top: 65px;
            .song-img-in{
              box-sizing: border-box;
              width: 100%;
              height: 100%;
              border-radius: 50%;
              background: linear-gradient(-45deg,#333540,#070708,#333540);
              padding:55px;
              animation: rotate 20s linear infinite;
              // border:30px solid #
              &.song-img-paused{
                animation-play-state: paused; //动画运行状态
              }
              img{
                width: 100%;
                height: 100%;
                border-radius: 50%;
              }
            }
          }
        }
        .song-msg-right{
          flex: 1;
        }
      }
    }
  }
</style>
