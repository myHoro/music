<template>
  <div class="right-playlist" v-show="tf">
    <div class="tabs">
      <p :class="{tabOn: tabOn==0}" @click="changeTab(0, '播放列表')">播放列表</p>
      <p :class="{tabOn: tabOn==1}" @click="changeTab(1, '历史记录')">历史记录</p>
    </div>
    <ul v-show="tabOn == 0"></ul>
    <ul v-show="tabOn == 1"></ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import store from '../store';
@Component({
  components: {
    
  }
})
export default class RightPlaylist extends Vue {
  get tf(){
    console.log(123)
    return store.state.playlistShow
  }
  
  tabOn = 0
  changeTab(on: number, txt: string){
    this.tabOn = on
  }
  

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .right-playlist{
    width: 500px;
    box-shadow: -2px 0 5px #ccc;
    background: #fff;
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
  }
</style>
