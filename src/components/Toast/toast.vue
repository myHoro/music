<template>
  <div class="toast" :class="pos" v-show="show">
    <transition name="fade">
      <div>{{msg}}</div>
    </transition>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class HelloWorld extends Vue {
  @Prop() msg = '';
  @Prop() show = false;
  @Prop({default: 'center'}) position!: string;

  get pos(): string {
    return this.position
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .toast{
    color: #fff;
    border-radius: 5px;
    background: rgba(0, 0, 0, .7);
    padding:10px;
    position: fixed;
    margin-left: 50%;
    transform: translateX(-50%);
    top:50px
  }
</style>
