<template>
  <div id="app">
    <LayoutHeader />
    <LayoutMain />
    <MiniPlayer />
    <RightPlaylist>
      <div>
        ninds
        <p>sss</p>
      </div>
    </RightPlaylist>
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LayoutHeader from '@/layout/header.vue'
import LayoutMain from '@/layout/main.vue'
import MiniPlayer from '@/components/miniPlayer.vue'
import RightPlaylist from '@/components/rightPlaylist.vue'
@Component({
  components:{
    LayoutHeader,
    LayoutMain,
    MiniPlayer,
    RightPlaylist
  }
})
export default class App extends Vue {

}
</script>