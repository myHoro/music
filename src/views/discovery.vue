<template>
  <div class="discovery-box">
    <Swiper class="swiper-box" :img="img" />
    <div class="">推荐歌单</div>
    <div class="show">
      <ListCard v-for="e in 10" :key="e" msg="顶部信息" title="是标题" imgSrc="require('@/assets/img/p1.png')" />
      
      <ListCard msg="顶部信息撒萨芬阿谁的斯蒂芬阿斯达撒旦飒沓放大三打算阿萨德阿萨德啊1" title="是标题1" imgSrc="require('@/assets/img/p1.png')" />
    </div>
    
  </div>
</template>

<script lang="ts">
// @ is an alias to /src
import { Component, Vue } from 'vue-property-decorator'
import Swiper from '@/components/swiper.vue'
import ListCard from '@/components/listCard.vue'
@Component({
  components:{
    Swiper,
    ListCard
  }
})
export default class Login extends Vue {
  img = [
    require('@/assets/img/p1.jpg'),
    require('@/assets/img/p2.jpg'),
    require('@/assets/img/p3.jpg'),
  ]
}
</script>
<style scoped>
  .discovery-box{
    max-width: 1500px;
    margin: 0 auto;
  }
  .show{
    display: grid;
    grid-template-columns: repeat(5, 1fr);
    grid-gap: 20px 12px;
  }
  .swiper-box{
    height: 240px;
    border-radius: 5px;
    overflow: hidden;
    margin-bottom: 30px;
  }
</style>