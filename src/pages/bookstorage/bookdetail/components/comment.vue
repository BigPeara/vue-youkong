<template>
  <div>
       <div class="comment-content">
        <ul class="coment-lists">
          <!-- 评论 -->
          <li class="comment-box flex">
            <img src="" alt="" class="head-portrait">
            <div class="frame">
              <p class="user-info" ><a href="" class="userName">{{userName}}</a><span class="general">普</span></p>
               <textarea placeholder="发表评论..."></textarea> 
               <button class="btn-publish">发表评论</button>
            </div>

          </li>
        </ul>
      </div>
  </div>
</template>

<script>
export default {
  name: "comment",
  data() {
    return {
      userName:"咕咕咚咚"
    };
  },
  
};
</script>
<style scoped>
.comment-content{
margin-top: 0.625rem;
background-color: #fff;
border-bottom:1px solid rgba(228,228,228,1);
}
.coment-lists{
  padding: 0.9375rem;
}
.head-portrait{
  width: 2.625rem;
  height: 2.625rem;
  -webkit-border-radius:50%;
  border-radius: 50%;
  background-color: #999;
  margin-right: 0.9375rem;

}
textarea{
    display: block;
    width: 100%;
    height: 4.0625rem;
    padding: 0.5rem 0 0 0.5rem;
    border: none;
    outline: none;
    resize : none;
    font-size: 0.75rem;
    background-color:rgba(223,242,241,1);
    -webkit-border-radius:0.3rem;
    border-radius: 0.3rem;
}
.frame{
text-align: left;
box-sizing: border-box;
-webkit-box-sizing: border-box;
flex: 1;
-webkit-box-flex:1;
}
.user-info{
  height: 2.6rem;
  line-height: 2.6rem;
  font-size:0.875rem;
  color:rgba(109,146,165,1);
}
.general{
  width: 1.1875rem;
  height: 1.1875rem;
  line-height: 1.1875rem;
  text-align: center;
  display: inline-block;
  background-color:#F76C5B;
  -webkit-border-radius:0.2rem;
  border-radius: 0.2rem;
  margin-left: 0.5rem;
  color:rgba(255,255,255,1);
}
.btn-publish{
  width: 26.13%;
  height: 2.0625rem;
  line-height: 2.0625rem;
  text-align:center;
  border: none;
  font-size:0.875rem;
  color:rgba(255,255,255,1);
  background-color:rgba(29,183,172,1);
  -webkit-border-radius:0.2rem;
  border-radius: 0.2rem;
  margin: 0.5rem 0 0 73.7%;

}

</style>

