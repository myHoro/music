<template>
  <div class="progress-box" ref="progress" @click="control">
    <div class="on-box">
      <div class="on" :style="{width: width+'px'}"></div>
      <div class="ball-box" :class="{show: showbtn}" :style="{transform:'translateX('+width+'px)'}"><p class="ball"></p></div>

    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class ProgressBar extends Vue {
  maxWidth = 0;
  width = 0;
  control(e: any): void{
    const box = (this.$refs.progress as HTMLElement).getBoundingClientRect();
    this.width = Math.max(0, Math.min(e.pageX - box.left, (this.$refs.progress as HTMLElement).clientWidth))

    // const box = this.$refs.progress.getBoundingClientRect();
    // ts不识别$refs对象，所以getBoundingClientRect()方法会又报错的波浪线，所以使用 as(类型断言) 将其当作Element对象引用
    // Math.max() 防止出现点击右边出现负值，使其最小只能为0
    // Math.min() 防止出现里面on的长度过长导致父级元素progress-box宽度增长和超出，限制其最长不能超过父级元素的宽度
    
    // this.width = e.layerX > this.maxWidth ? this.maxWidth:e.layerX;
    // e.layerX > this.maxWidth ? this.maxWidth:e.layerX; e.layerX 在width接近拉满的时候，点击后面返回的值会从右边开始计算间距
  }
  @Prop({
    type: Boolean,
    default: false
  }) showbtn!: boolean
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .progress-box{
    display: flex;
    align-items: center;
    width: 100%;
    height: 30px;
    cursor: pointer;
  }
  .on-box{
    width: 100%;
    height: 3px;
    background: #f0f0f0;
    position: relative;
  }
  .on{
    width: 20%;
    height: 3px;
    background: #29a1f7;
  }
  .progress-box:hover .ball-box{
    display: flex;
  }
  .show {
    display: block !important;
  }
  .ball-box{
    display: none;
    justify-content: center;
    align-items: center;
    width: 30px;
    height: 30px;
    position: absolute;
    left: -15px;
    top:-13.5px;

  }
  .ball{
    width: 14px;
    height: 14px;
    border-radius: 50%;
    background: #29a1f7;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
  }
</style>
