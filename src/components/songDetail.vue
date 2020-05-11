<template>
  <div class="song-detail" :class="{show:show}">
    <div class="song-detail-main" v-if="song.id">
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
      <div class="song-other">
        <div class="comment-box">
          <h2>热门评论</h2>
          <ul class="comment-list">
            <li v-for="e in hotComment" :key="e.commentId" class="item">
              <div class="head-img"><img :src="$utils.imgSize(e.user.avatarUrl, 80)" /></div>
              <div class="content">
                <div class="content-top">
                  <span class="name">{{e.user.nickname}}：</span>{{e.content}}
                  <template v-if="e.beReplied.length">
                    <div v-for="r in e.beReplied" :key="r.beRepliedCommentId" class="reply">
                      <span>{{r.user.nickname}}：</span>{{r.content}}
                    </div>
                  </template>
                </div>
                <div class="content-bottom">
                  <span>{{e.time}}</span>
                  <span><i class="iconfont iconzan" />{{e.likedCount}}</span>
                </div>
              </div>
            </li>
          </ul>
          <h2 style="padding-top:20px">最新评论({{total}})</h2>
          <ul class="comment-list">
            <li v-for="e in commentList" :key="e.commentId">
              <div class="head-img"><img :src="$utils.imgSize(e.user.avatarUrl, 80)" /></div>
              <div class="content">
                <div class="content-top">
                  <span class="name">{{e.user.nickname}}：</span>{{e.content}}
                  <template v-if="e.beReplied.length">
                    <div v-for="r in e.beReplied" :key="r.beRepliedCommentId" class="reply">
                      <span>{{r.user.nickname}}：</span>{{r.content}}
                    </div>
                  </template>
                </div>
                <div class="content-bottom">
                  <span>{{e.time}}</span>
                  <span><i class="iconfont iconzan" />{{e.likedCount}}</span>
                </div>
              </div>
            </li>
          </ul>
          <Pagination :total="total" @change="getCurrentPage" />
        </div>
        <div class="tj">
          <h2>包含这首歌的歌单</h2>
          <ul class="simi">
            <li v-for="e in simiList" :key="e.id">
              <div class="img"><img :src="$utils.imgSize(e.coverImgUrl, 100)" /></div>
              <div class="simi-msg">
                <p class="simi-name">{{e.name}}</p>
                <p class="simi-playcout"><i class="iconfont iconbf" />{{e.playCount}}</p>
              </div>
            </li>
          </ul>
          <h2>相似歌曲</h2>
          <ul class="simi">
            <li v-for="e in simiMusicList" :key="e.id" @click="play(e)">
              <div class="img"><img :src="$utils.imgSize(e.picture, 100)" /></div>
              <div class="simi-msg">
                <p class="simi-name">{{e.name}}</p>
                <p class="simi-playcout">{{e.artists}}</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { commentMusic, simiPlaylist, simiMusic } from '@/request/api'
import store from '../store';
import Pagination from '@/components/pagination.vue'
@Component({
  components: {
    Pagination
  }
})
export default class SongDetail extends Vue {
  get show(){
    return store.state.songDetailShow
  }

  get playing(){ //播放状态
    return store.state.isPlaying
  }
  get song(): any{ //播放音乐
    return store.state.playingMusic
  }
  
  pageIndex = 1
  limit = 50
  total = 0
  commentList = []
  allComment = 0
  hotComment = []
  getComment(){
    commentMusic({
      id: this.song.id,
      limit: this.limit,
      offset: this.$utils.pageOffset(this.pageIndex, this.limit)
    }).then((res: any) => {
      if(this.pageIndex == 1){
        this.allComment = res.total
        this.total = this.$utils.pageTotal(this.limit, res.total)
        this.hotComment = res.hotComments
      }
      this.commentList = res.comments
    })
  }
  getCurrentPage(e: number){
    this.pageIndex = e;
    this.getComment()
  }

  simiList = []
  simiMusicList = []
  @Watch('song.id') palys(e: any){
    this.pageIndex = 1
    this.getComment()

    simiPlaylist(e).then((res: any) => {
      this.simiList = res.playlists
    })
    simiMusic(e).then((res: any) => {
      this.simiMusicList = res.songs.map((e: any) => {
        return this.$utils.createSongMsg(e)
      })
    })
  }

  play(e: any){
    this.$utils.startMusic(e)
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
    z-index: 20;
    &.show{ // 同级class
      transform: none
    }
    .song-detail-main{
      max-width: 1500px;
      margin: 0 auto;
      padding:0 50px 50px 50px;
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

      .song-other{
        display: flex;
        padding-top: 50px;
        .comment-box{
          flex: 1;
          h2{
            padding-bottom: 20px;
          }
          .comment-list{
            li{
              display: flex;
              margin-bottom: 20px;
              .head-img{
                width: 45px;
                padding-right:15px;
                img{
                  width: 45px;
                  height: 45px;
                  border-radius: 50%;
                }
              }
              .content{
                flex: 1;
                font-size: 15px;
                line-height: 24px;
                color: #444;
                border-bottom: 1px solid #eee;
                padding-bottom: 15px;
                .content-top{
                  .name{
                    color: $blue;
                  }
                  .reply{
                    font-size: 14px;
                    color: #555;
                    border-radius: 5px;
                    margin-top: 10px;
                    padding:10px 12px;
                    background: #e6e5e6;
                    span{
                      color: $blue;
                    }
                  }
                }
                .content-bottom{
                  display: flex;
                  justify-content: space-between;
                  color: #888;
                  padding-top: 10px;
                  i{
                    cursor: pointer;
                    margin-right: 5px;
                  }
                }
              }
            }
          }
          
        }
        .tj{
          width: 350px;
          padding-left: 50px;
          position: sticky;
          top:0;
          h2{
            padding-bottom: 20px;
          }
          .simi{
            padding-bottom: 30px;
            li{
              display: flex;
              cursor: pointer;
              margin-bottom: 15px;
              .img{
                img{
                  display: block;
                  width: 60px;
                  height: 60px;
                  border-radius: 5px;
                }
              }
              .simi-msg{
                flex: 1;
                display: flex;
                flex-direction: column;
                justify-content: space-between;
                width: 0;
                padding:5px 0;
                padding-left: 10px;
                .simi-name{
                  font-size: 16px;
                }
                .simi-playcout{
                  color: #bbb;
                  i{
                    margin-right: 5px;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
</style>
