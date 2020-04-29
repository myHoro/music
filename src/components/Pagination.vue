<template>
  <div class="pagination">
    <template v-if="max>1">
      <button :disabled="current==1" @click="prev" class="btn-prev" :class="{'not-allowed': current==1}"><i class="iconfont iconarrow-left"></i></button>
      <template v-if="max<=5">
        <ul class="pager">
          <li :class="{on: current==e}" v-for="(e) in max" :key="e" @click="changePage(e)">{{e}}</li>
        </ul>
      </template>
      <template v-else>
        <ul class="pager">
          <li v-show="current>=5" @click="changePage(1)">1</li>
          <template v-if="current<5">
            <li :class="{on: current==e}" v-for="e in 6" :key="e" @click="changePage(e)">{{e}}</li>
          </template>
          <li v-show="current>=5" class="prev-li" @click="bigChange(-5)">
            <span>···</span>
            <p><i class="iconfont iconpageprev"></i></p>
          </li>
          <template v-if="current>=5&&current<=max-3">
            <li @click="changePage(current-2)">{{current-2}}</li>
            <li @click="changePage(current-1)">{{current-1}}</li>
            <li class="on">{{current}}</li>
            <li @click="changePage(current+1)">{{current+1}}</li>
            <li @click="changePage(current+2)">{{current+2}}</li>
          </template>
          <li v-show="current<=max-3" class="next-li" @click="bigChange(5)">
            <span>···</span>
            <p><i class="iconfont iconpagenext"></i></p>
          </li>
          <template v-if="current>max-3">
            <li :class="{on: current==max-4}" @click="changePage(max-4)">{{max-4}}</li>
            <li :class="{on: current==max-3}" @click="changePage(max-3)">{{max-3}}</li>
            <li :class="{on: current==max-2}" @click="changePage(max-2)">{{max-2}}</li>
            <li :class="{on: current==max-1}" @click="changePage(max-1)">{{max-1}}</li>
          </template>
          <li :class="{on: current==max}" @click="changePage(max)">{{max}}</li>
        </ul>
      </template>
      <button :disabled="current==max" @click="next" class="btn-next" :class="{'not-allowed': current==max}"><i class="iconfont iconarrow-right"></i></button>
    </template>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Watch, Emit, Vue } from 'vue-property-decorator';

@Component
export default class Pagination extends Vue {
  @Prop() total!: number

  max = 0
  @Watch('total') changeTotal(e: number){
    this.max = e
  }

  current = 1
  showPage = []

  changePage(e: number){
    if(this.current!=e){
      this.current = e
      this.$emit('change', e)
    }
  }
  @Emit('change') prev(){
    --this.current
    return this.current
  }
  @Emit('change') next(){
    ++this.current
    return this.current
  }
  @Emit('change') bigChange(e: number){
    let result = this.current + e;
    if(e == -5){
      result = result>0 ? result:1
    }else{
      result = result>this.max ? this.max:result
    }
    this.current = result;
    return result;
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .pagination{
    display: flex;
    justify-content: flex-end;
    align-items: center;
    
    .btn-prev{
      margin-right: 10px;
    }
    .btn-next{
      margin-left: 10px;
    }
    .not-allowed{
      cursor: not-allowed;
    }
    .pager{
      display: flex;
      align-items: center;
      font-size: 14px;
      font-weight: bold;
      li{
        width: 24px;
        height: 24px;
        text-align: center;
        line-height: 24px;
        margin:0 12px;
        cursor: pointer;
      }
      .on{
        color: $blue;
        cursor:initial;
      }
      .prev-li, .next-li{
        font-size:24px;
        letter-spacing: 1px;
        font-weight: normal;
        p{
          display: none;
        }
        &:hover{
          span{
            display: none;
          }
          p{
            display: flex;
            justify-content: center;
            align-items: center;
          }
        }
      }
    }
  }
  
</style>
