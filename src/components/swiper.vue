<template>
  <div @mouseenter="hovers" @mouseleave="hovers">
    <div class="swpier">
      <div class="btn pre-btn" @click="pre"><i class="iconfont iconarrow-left"></i></div>
      <div class="btn next-btn" @click="next"><i class="iconfont iconarrow-right"></i></div>
      <ul class="img-list" :style="{width:img.length*100+'%',transform:'translateX(-'+on*100/img.length+'%)'}">
        <li v-for="(e, i) in img" :key="i" class="swiper-item"><img :src="e" /></li>
      </ul>
    </div>
    <div class="indicator">
      <span v-for="(e, i) in img.length" :key="i" :class="{on:i==on}" @click="on = i"></span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  timer: any = null

  @Prop() img!: string[]
  get showImg(){
    return [this.img[this.img.length], ...this.img, this.img[0]]
  }
  @Prop({
    type: Number,
    default: 3000
  }) intervalTime !: number
  on = 0
  pre(){
    this.on>0 ? --this.on:this.on=this.img.length-1
  }
  next(){
    this.on<this.img.length-1 ? ++this.on:this.on=0
  }
  auto(){
    this.timer = setInterval(() => {
      this.next()
    }, this.intervalTime)
  }

  hovers(e: any){ //鼠标移入移出，暂停播放
    if(e.type == 'mouseenter'){
      clearInterval(this.timer)
    }else{
      this.auto()
    }
  }
  // @Watch('on') change(e: number): void{
  //   console.log(e)
  //   if(e == 4){
  //     setTimeout(()=>{
  //       this.on = 1
  //     },800)
  //   }
  // }
  created(){
    this.auto()
  }
  destroyed(){
    clearInterval(this.timer)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .swpier{
    height: 100%;
    overflow: hidden;
    margin: 0 auto;
    position: relative;
  }
  .btn{
    display: flex;
    justify-content: center;
    align-items: center;
    width: 46px;
    height: 46px;
    border-radius: 23px;
    cursor: pointer;
    background: rgba(255, 255, 255, .2);
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    z-index: 9;
  }
  .btn:hover{
    background: rgba(255, 255, 255, .5);
  }
  .pre-btn{
    left: 20px;
  }
  .next-btn{
    right: 20px;
  }
  .btn i{
    color: #fff;
    font-size: 22px;
  }
  .pre-btn{
    left: 10px;
  }
  .img-list{
    display: flex;
    flex-wrap: nowrap;
    height: 100%;
    transition: transform .5s;
    position: relative;
  }
  .noAnimate{
    transition: none;
  }
  .swiper-item{
    width: 100%;
  }
  .swiper-item img{
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  .indicator{
    text-align: center;
    padding-top: 10px;
  }
  .indicator span{
    display: inline-block;
    width: 36px;
    height: 4px;
    background: #ccc;
    margin:0 5px;
  }
  .indicator span.on{
    background: #666;
  }
</style>
