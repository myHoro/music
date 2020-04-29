<template>
  <div class="list-card-box">
    <div class="list-card-top-msg overTwo">{{msg}}</div>
    <div class="list-card-img-box">
      <img :src="imgSrc" />
      <i class="iconfont iconbf"></i>
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
<style lang="scss" scoped>
  .list-card-box{
    border-top-left-radius: 5px;
    border-top-right-radius: 5px;
    overflow: hidden;
    position: relative;
    &:hover{
      .list-card-top-msg{
        transform: translateY(0);
      }
      .list-card-img-box{
        .iconbf{
          opacity: 1;
        }
      }
    }

    .list-card-top-msg{
      box-sizing: border-box;
      width: 100%;
      color: #fff;
      line-height: 20px;
      border-left: 1px solid #eee;
      border-right: 1px solid #eee;
      transform: translateY(-100%);
      transition: transform .25s ease;
      padding:6px 10px;
      background: rgba(0, 0, 0, .5);
      position: absolute;
      z-index: 9;
    }

    .list-card-img-box{
      padding-top:100%;
      position: relative;

      img{
        display: block;
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        object-fit: cover;
        border:1px solid #eee;
        border-radius: 5px;
        position: absolute;
        top:0;
        left: 0;
      }
      .iconbf{
        opacity: 0;
        transition: opacity .25s;
        width: 36px;
        height: 36px;
        text-align: center;
        line-height: 36px;
        color: #29a1f7;
        font-size: 26px;
        background: rgba(255, 255, 255, .5);
        border-radius: 50%;
        position: absolute;
        bottom:10px;
        right: 12px;
      }
    }
    .list-card-title{
      padding-top:5px;
    }
  }
</style>
