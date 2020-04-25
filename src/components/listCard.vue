<template>
  <div class="list-card-box">
    <div class="list-card-top-msg overTwo">{{msg}}</div>
    <div class="list-card-img-box">
      <img :src="imgSrc" />
    </div>
    <div class="list-card-title overHidden">{{title}}</div>
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
  .list-card-box{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    position: relative;
  }
  .list-card-top-msg{
    box-sizing: border-box;
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
  .list-card-box:hover .list-card-top-msg{
    transform: translateY(0);
  }
  .list-card-img-box{
    padding-top:100%;
    position: relative;
  }
  .list-card-img-box img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 5px;
    position: absolute;
    top:0;
    left: 0;
  }
  .list-card-title{
    padding-top:5px;
  }
</style>
