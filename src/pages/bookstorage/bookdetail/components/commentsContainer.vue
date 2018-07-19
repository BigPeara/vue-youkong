<template>
  <div class="comment-container">
      <!-- <div>评论操作</div> -->
      <div class="comment-list">
        <!-- 评论组件 -->
          <comment-item v-for="(item,$index) in comments" v-if="$index < 5" :comment="item" class="comments" :key="$index"></comment-item>
      </div>
      <router-link v-if="commentCount>5" :to="'/bookstorage/commentPage/'+booktitle+'/'+ bid" class="btn-reply">查看更多评论</router-link>     
  </div>
</template>

<script>
//引入了评论的组件
import CommentItem from './commentItem' 

export default {
  name: "comments-container",
  data() { 
    return {
        showMore:true
    }
  },
  props:{
      booktitle:String,
      bid:String,
      commentCount:Number,
      comments:Array,
      title:String,
  },
  components:{
      CommentItem
  },
  created(){
      
  },
  updated(){
      console.log(this.$props.comments.length < this.$props.commentCount);
      console.log(this.$props.comments.length +'_'+ this.$props.commentCount);
  }
};
</script>
<style scoped>
.comment-container{
  background-color: #fff;
  margin-top: 0.625rem;
  padding-bottom: 0.625rem;
}
.comment-container .btn-reply {
  width: 92%;
  display: block;
  height: 2rem;
  line-height: 2rem;
  color: #f76c5b;
  font-size: 0.9375rem;
  text-align: center;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
  border: 1px solid #f76c5b;
  margin: 0.5rem auto 0.5rem;
}

</style>

