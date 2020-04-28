<template>
  <div>
    <ul class="tab-ul">
      <li v-for="(e, i) in item" :key="i" @click="choose(i)" :class="{on: on==i}">{{e}}</li>
    </ul>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Tab extends Vue {
  @Prop() item!: string[]
  on = 0

  // @Emit方法，即以前的this.$emit('func',value)
  // @Emit('type') 即 -> func, return的值 -> value, choose -> 触发Emit的方法事件
  // @Emit('type') choose(i: number): string{
  //   this.on = i;
  //   return this.item[i];
  // }

  // 若没定义type【@Emit()】  则触发方法事件（choose）即为触发emit（func）的事件
  @Emit() choose(i: number): string{
    this.on = i;
    return this.item[i];
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
