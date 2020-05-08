<template>
  <div class="songlist-main">
    <div class="songlist-box">
      <router-link v-for="e in list" :key="e.id" to="" class="list-link">
        <ListCard :msg="'播放量：'+$utils.formatNumber(e.playCount)" :title="e.name" :imgSrc="$utils.imgSize(e.coverImgUrl, 500)" />
      </router-link>
    </div>
    <Pagination :total="totalPage" @change="getCurrentPage" style="padding-right:20px" />
  </div>
</template>

<script lang="ts">
import { Component, Inject, Vue } from 'vue-property-decorator';
import { searchKeywords } from '@/request/api'
import ListCard from '@/components/listCard.vue'
import Pagination from '@/components/pagination.vue'
@Component({
  components: {
    ListCard,
    Pagination
  }
})
export default class SearchSongList extends Vue {
  @Inject() searchRoot!: any

  limit = 25
  pageIndex = 1
  totalPage = 0
  list = []

  getList(){
    const data = {
      limit: this.limit,
      offset: this.$utils.pageOffset(this.pageIndex, this.limit),
      keywords: this.searchRoot.keywords,
      type:1000
    }
    searchKeywords(data).then((res: any) => {
      // console.log(res)
      const d = res.result
      this.list = d.playlists
      this.totalPage = this.$utils.pageTotal(this.limit, d.playlistCount)
      this.searchRoot.setCount(d.playlistCount)
    })
  }
  getCurrentPage(e: number){
    this.pageIndex = e;
    this.getList()
  }
  created(){
    this.getList()
    this.searchRoot.setNameOn('歌单')
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
.songlist-main{
  max-width: 1500px;
  margin: 0 auto;
  padding:30px 100px 50px 100px; 
  .songlist-box{
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding-bottom: 20px;
    .list-link{
      width: 19%;
      margin-bottom: 30px;
    }
  }
}
  
</style>
