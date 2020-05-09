<template>
  <div id="app">
    <LayoutHeader />
    <LayoutMain />
    <MiniPlayer />
    <RightPlaylist />
    <SongDetail />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator'
import LayoutHeader from '@/layout/header.vue'
import LayoutMain from '@/layout/main.vue'
import MiniPlayer from '@/layout/miniPlayer.vue'
import RightPlaylist from '@/components/rightPlaylist.vue'
import SongDetail from "@/components/songDetail.vue";
@Component({
  components:{
    LayoutHeader,
    LayoutMain,
    MiniPlayer,
    RightPlaylist,
    SongDetail
  }
})
export default class App extends Vue {

}
</script>