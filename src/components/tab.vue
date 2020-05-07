<template>
  <div>
    <ul class="tab-ul">
      <li v-for="(e, i) in item" :key="i" @click="choose(i)" :class="{on: on==i}">{{e.name}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue, Watch } from 'vue-property-decorator';
interface Items {
  name: string;
  value: string;
}
@Component
export default class Tab extends Vue {

  @Prop() item!: Items[]
  on = 0
  
  @Prop() nameOn!: any
  @Watch('nameOn') onByName(e: any){
    this.on = this.item.findIndex(item => item.name == e)
  }
  @Prop() valueOn!: any
  @Watch('valueOn') onByValue(e: any){
    this.on = this.item.findIndex(item => item.value == e)
  }
  // @Emit方法，即以前的this.$emit('func',value)
  // @Emit('type') 即 -> func, return的值 -> value, choose -> 触发Emit的方法事件
  // @Emit('type') choose(i: number): string{
  //   this.on = i;
  //   return this.item[i];
  // }

  // 若没定义type【@Emit()】  则触发方法事件（choose）即为触发emit（func）的事件
  choose(i: number){
    if(this.on == i) return;
    this.on = i;
    this.$emit('name', this.item[i].name)
    this.$emit('value', this.item[i].value)
  }

}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .tab-ul{
    display: flex;
    justify-content: flex-end;
    padding:10px 0;

    li{
      color: #666;
      padding: 10px 0;
      margin-left: 25px;
      cursor: pointer;
      &:hover{
        color: $blue;
      }
    }
    .on{
      color: $blue;
    }
  }
</style>
