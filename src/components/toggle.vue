<template>
  <div v-show="show">
    <slot></slot>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Vue } from 'vue-property-decorator';

@Component
export default class Toggle extends Vue {
  @Prop({ type: Array, default:() => [] }) domClass!: [] 
  @Prop({ type: Boolean, default: false }) show!: boolean

  @Watch('show') tfChange(e: boolean){
    setTimeout(() => {
      if(e){
        this.canClick()
      }else{
        this.removeClick()
      }
    },0)
  }
  
  clickOut(e: any){
    // 通过传进来的className，判断当前点击的元素是否是自身，或者是点击不隐藏的元素
    const isArr = []
    if(this.domClass.length){
      for(let i=0; i<this.domClass.length; i++){
        isArr.push(e.path.some((item: any) => item.className&&item.className.includes(this.domClass[i])))
      }
    }
    const isTF = isArr.some((e: any) => e)
    if((this.domClass.length&&!isTF))this.$emit('updata:show', false)
    // const isMini = e.path.some((item: any) => item.className&&item.className.includes('mini-play'))
    // 判断是否点击的是mini-play区域
    // const isPlaylist = e.path.some((item: any) => item.className&&item.className.includes('right-playlist'))
    // 判断是否点击的是playlist区域
    // this.$emit('updata:show', false)
    // if(){
    //   if(!isPlaylist) this.$emit('updata:show', false)
    // }else{

    // }
    // if(!(isTF || isPlaylist)) this.$emit('updata:show', false)
    // 当点击这2块区域时，不调用commit方法 store.commit('SET_PLAYLISTSHOW', false)
  }
  canClick(){
    document.addEventListener('mousedown', this.clickOut)
  }
  removeClick(){
    document.removeEventListener('mousedown', this.clickOut)
  }
  beforeDestroy() {
    this.removeClick()
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  
</style>
