<template>
  <div class="playlist-detail-box">
    <div class="msg">
      <div class="msg-left"><img :src="$utils.imgSize(msg.coverImgUrl, 400)" /></div>
      <div class="msg-right">
        <h2>{{msg.name}}</h2>
        <div class="creator" v-if="msg.creator">
          <img v-if="msg.creator.avatarUrl" :src="$utils.imgSize(msg.creator.avatarUrl, 80)" />
          <p class="name">{{msg.creator.nickname}}</p>
          <p class="time">{{$utils.formatDate(msg.createTime)}} 创建</p>
        </div>
        <div><button class="play-btn"><i class="iconfont iconbf" />播放全部</button></div>
        <div class="jj" v-if="msg.tags">标签：{{msg.tags.join('/')}}</div>
        <div class="jj desc">简介：{{msg.description}}</div>
      </div>
    </div>
    <div class="tabs-box">
      <div class="tab">
        <p :class="{on: tabOn==0}" @click="changeTab(0)">歌曲列表</p>
        <p :class="{on: tabOn==1}" @click="changeTab(1)">评论</p>
      </div>
      <div class="search-box" v-show="tabOn==0">
        <i class="iconfont iconsearch" /><input type="text" v-model="searchValue" placeholder="搜索歌单音乐" autocomplete="off" />
      </div>
    </div>
    <table cellspacing="0" coll class="music-table">
      <tr class="thead"><td height="40"></td><td></td><td>音乐标题</td><td>歌手</td><td>专辑</td><td>时长</td></tr>
      <tr v-for="(e, i) in filterList" :key="e.id" class="ihover" :class="{on: i==on}" @click="playing(i)">
        <td class="no" width="30">
          <span v-show="i!=on">{{i+1}}</span>
          <i v-show="i==on" class="iconfont iconsound"></i>
        </td>
        <td width="80"><img :src="$utils.imgSize(e.picture, 100)" /></td>
        <td class="name">{{e.name}}<i v-if="e.mvid" class="iconfont iconvideo"></i></td>
        <td>{{e.artists}}</td>
        <td>{{e.from}}</td>
        <td class="time">{{$utils.timeInterval(e.duration)}}</td>
      </tr>
    </table>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { playlistDetail, songList } from '@/request/api'
@Component
export default class PlaylistDetail extends Vue {
  @Prop() id!: number
  msg = {}

  on = -1
  songList = []
  playing( i: number){
    this.on = i
    const e: any = this.songList[i]
    this.$utils.startMusic(e)
  }

  async created(){
    playlistDetail(this.id).then((res: any) => {
      console.log(res)
      this.msg = res.playlist;
      const ids = res.privileges.map((e: any) => e.id).join(',')
      songList(ids).then((song: any) => {
        const songList = song.songs.map((e: any) => {
          const obj = {
            id:e.id,
            name: e.name,
            picture: e.al.picUrl||require('@/assets/img/default-pic.jpg'),
            artists: e.ar.map((item: any) => item.name).join('/'),
            from:e.al.name,
            duration:e.dt, //ms
            mvid:e.mv
          }
          return obj
        })
        this.songList = songList
        this.filterList = JSON.parse(JSON.stringify(songList))
      })
    })
  }

  tabOn = 0
  changeTab(e: number): void{
    this.tabOn = e
  }

  searchValue = ''
  filterList = []
  @Watch('searchValue') filterSongs(e: string){
    if(e){
      this.filterList = this.songList.filter(({ name, artists, from }) => {
        return `${name}${artists}${from}`.toLowerCase().includes(e.toLowerCase())
      })
    }else{
      this.filterList = this.songList
    }
  }
  // get filterSongs(){
  //   return this.songList.filter(({ name, artists, from }) => {
  //     console.log('search',name, artists, from)
  //     // `${name}${artists}${from}`
  //     // .toLowerCase()
  //     // .includes(this.searchValue.toLowerCase())
      
  //   })
  // }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .playlist-detail-box{
    .msg{
      display: flex;
      padding:50px;
      .msg-left{
        width: 240px;
        height: 240px;
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
          .time{
            color: #555;
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
          @include text-ellipsis-multi(3);
          line-height: 20px;
        }
      }
    }
    .tabs-box{
      display: flex;
      justify-content: space-between;
      align-items: center;
      border-bottom: 1px solid #eee;
      padding:0 50px;
      .tab{
        display: flex;
        font-size: 16px;
        color: #555;
        p{
          height: 40px;
          line-height: 40px;
          margin-right:50px;
          cursor: pointer;
          &.on{
            color: $blue;
            font-weight: bold;
            border-bottom: 2px solid $blue;
          }
        }
      }
      .search-box{
        display: flex;
        align-items: center;
        width: 160px;
        height: 30px;
        padding: 0 15px;
        border-radius: 5px;
        background: #e8e8e8;
        i{
          color:#555;
          font-size: 14px;
        }
        input{
          flex: 1;
          width: 0;
          padding-left: 10px;
          background: none;
        }
      }
    }
    .music-table{
      width: 100%;
      tr{
        &.thead{
          td{
            color: #000
          };
        }
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
