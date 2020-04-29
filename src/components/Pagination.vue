<template>
  <div class="pagination">
    <button class="btn-prev"><i class="iconfont iconarrow-left"></i></button>
    <ul class="pager">
      <li class="" v-for="e in total" :key="e">{{e+1}}</li>
    </ul>
    <button class="btn-next"><i class="iconfont iconarrow-right"></i></button>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() total!: number
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>
