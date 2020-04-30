<template>
  <div class="new-song">
    <Tab :item="tab" @value="getType" />
    <table>
      <tr v-for="(e, i) in list" :key="e.id" class="ihover" @click="playing">
        <td>{{i+1}}</td>
        <td><img :src="$utils.imgSize(e.album.blurPicUrl, 100)" /></td>
        <td>{{e.name}}</td>
        <td>{{e.album.name}}</td>
      </tr>
    </table>
    <!-- <ul class="list">
      <li v-for="e in list" :key="e.id">
        <div class="no"></div>
        <div class="img"></div>
        <div class="name"></div>
        <div class="singer"></div>
        <div class="from"></div>
        <div class="time"></div>
      </li>
    </ul> -->
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import { newsong } from '@/request/api'
import Tab from '@/components/tab.vue'
@Component({
  components:{
    Tab
  }
})
export default class NewSong extends Vue {
  tab = [
    { name:'全部', value:'0' },
    { name:'华语', value:'7' },
    { name:'欧美', value:'96' },
    { name:'日本', value:'8' },
    { name:'韩国', value:'16' }
  ]
  type = '0'
  getType(e: string){
    this.type = e
  }

  list = []
  getNewSong(){
    newsong(this.type).then((res: any) => {
      console.log(res)
      this.list = res.data
    })
  }

  playing(){
    console.log('start')
  }
  created(){
    this.getNewSong()
  }
}
</script>
<style lang="scss" scoped>
  .new-song{
    max-width: 1500px;
    padding: 10px 100px 50px 100px;
  }
</style>