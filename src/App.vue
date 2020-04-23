<template>
  <div id="app">
    <LayoutHeader />
    <LayoutMain />
    <MiniPlayer />
  </div>
</template>
<script lang="ts">
import LayoutHeader from '@/layout/header.vue'
import LayoutMain from '@/layout/main.vue'
import MiniPlayer from '@/components/miniPlayer.vue'
import { Component, Prop, Vue } from 'vue-property-decorator'
@Component({
  components:{
    LayoutHeader,
    LayoutMain,
    MiniPlayer
  }
})
export default class App extends Vue {

}
</script>