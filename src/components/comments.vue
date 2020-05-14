<template>
  <ul class="comment-list">
    <li v-for="e in list" :key="e.commentId">
      <div class="head-img"><img :src="$utils.imgSize(e.user.avatarUrl, 80)" /></div>
      <div class="content">
        <div class="content-top">
          <span class="name">{{e.user.nickname}}：</span>{{e.content}}
          <template v-if="e.beReplied.length">
            <div v-for="r in e.beReplied" :key="r.beRepliedCommentId" class="reply">
              <span>{{r.user.nickname}}：</span>{{r.content}}
            </div>
          </template>
        </div>
        <div class="content-bottom">
          <span>{{$utils.formatDate(e.time)}}</span>
          <span><i class="iconfont iconzan" />{{e.likedCount}}</span>
        </div>
      </div>
    </li>
  </ul>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

@Component
export default class Comments extends Vue {
  @Prop() list!: any
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>
  .comment-list{
    li{
      display: flex;
      margin-bottom: 20px;
      .head-img{
        width: 45px;
        padding-right:15px;
        img{
          width: 45px;
          height: 45px;
          border-radius: 50%;
        }
      }
      .content{
        flex: 1;
        font-size: 15px;
        line-height: 24px;
        color: #444;
        border-bottom: 1px solid #eee;
        padding-bottom: 15px;
        .content-top{
          .name{
            color: $blue;
          }
          .reply{
            font-size: 14px;
            color: #555;
            border-radius: 5px;
            margin-top: 10px;
            padding:10px 12px;
            background: #e6e5e6;
            span{
              color: $blue;
            }
          }
        }
        .content-bottom{
          display: flex;
          justify-content: space-between;
          color: #888;
          padding-top: 10px;
          i{
            cursor: pointer;
            margin-right: 5px;
          }
        }
      }
    }
  }
</style>
