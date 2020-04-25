<template>
  <div class="box">
    <div class="top-msg overTwo">{{msg}}</div>
    <div class="img-box">
      <img :src="require('@/assets/img/p1.jpg')" />
    </div>
    <div class="title overHidden">{{title}}</div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class ListCard extends Vue {
  @Prop() msg!: string
  @Prop() imgSrc!: string
  @Prop() title!: string
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .box{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  .top-msg{
    width: 100%;
    color: #fff;
    line-height: 20px;
    transform: translateY(-100%);
    transition: transform .25s ease;
    padding:6px 10px;
    background: rgba(0, 0, 0, .5);
    position: absolute;
    z-index: 9;
  }
  .box:hover .top-msg{
    transform: translateY(0);
  }
  .img-box{
    padding-top:100%;
    position: relative;
  }
  .img-box img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    position: absolute;
    top:0;
    left: 0;
  }
  .title{
    padding-top:5px;
  }
</style>
