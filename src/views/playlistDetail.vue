<template>
  <div class="playlist-detail-box">
    <div class="msg">
      <div class="msg-left"><img :src="$utils.imgSize(msg.coverImgUrl, 400)" /></div>
      <div class="msg-right">
        <h2>{{msg.name}}</h2>
        <div class="creator">
          <img :src="$utils.imgSize(msg.creator.avatarUrl, 80)" />
          <p class="name">{{msg.creator.nickname}}</p>
          <p class="time">{{msg.createTime}} 创建</p>
        </div>
        <div><button class="play-btn"><i class="iconfont iconbf" />播放全部</button></div>
        <div class="jj">标签：{{msg.tags.join('/')}}</div>
        <div class="jj desc">简介：{{msg.description}}</div>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { playlistDetail } from '@/request/api'
@Component
export default class PlaylistDetail extends Vue {
  @Prop() id!: number
  msg = {}

  created(){
    console.log(this.id)
    playlistDetail(this.id).then((res: any) => {
      console.log(res)
      this.msg = res.playlist
    })
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .playlist-detail-box{
    .msg{
      display: flex;
      padding:50px;
      .msg-left{
        width: 250px;
        height: 250px;
        img{
          display: block;
          width: 100%;
          height: 100%;
        }
      }
      .msg-right{
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        flex: 1;
        width: 0;
        padding-left: 25px;
        h2{
          font-weight: normal;
        }
        .creator{
          display: flex;
          align-items: center;
          margin-top: 15px;
          img{
            display: block;
            width: 36px;
            height: 36px;
            border-radius: 50%;
          }
          .name{
            font-size: 18px;
            padding:0 10px;
          }
        }
        .play-btn{
          background: $blue;
          color:#fff;
          font-size: 16px;
          border-radius: 3px;
          padding:6px 12px;
          margin-top: 15px;
          cursor: pointer;
          i{
            margin-right: 5px;
          }
        }
        .jj{
          color: #555;
          font-size: 16px;
          margin-top: 10px;
        }
        .desc{
          @include text-ellipsis-multi(3)
        }
      }
    }
  }
</style>
