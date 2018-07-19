<template>
<transition name="ws-actionsheet-pop">
<div class="ws-actionsheet" v-show="visible" @click="close" >
    <div class="ws-actionsheet-wrapper">
      <ul>
        <li @click="collect" v-if="!bookCase" ><i class="icon icon-bookrack"></i>加入书架</li>
        <li @click="remove" v-if="bookCase" ><i class="icon icon-bookrack"></i>移除书架</li>
        <li><i class="icon icon-read-list"></i><router-link :to="'/book/cataloguelist/'+bid">查看目录</router-link></li>
        <li><i class="icon icon-page"></i><router-link :to="'/book/'+bid">书籍详情</router-link></li>
        <li><i class="icon icon-clock"></i><router-link to="/bookcase/1">阅读记录</router-link></li>
        <li><i class="icon icon-index"></i><router-link to="/bookstorage">返回首页</router-link></li>
      </ul>
      <div class="li-cancel" @click="close">
          取消
      </div>
    </div>
  </div>
</transition>
  
</template>

<script type="text/babel">
import BookCaseService from '@/domain/bookcaseService'
export default {
  props: {
    title: String,
    actions:Array,
    visible:Boolean,
    bid:String,
    cid:String
  },
  data() {
    return {
      bookCase:undefined,
    };
  },
  created(){
    this.init();
  },
  methods: {
    init(){
      this.bookCase = BookCaseService.isExistInBookCase(this.bid);
    },
    close(evt) {
      if(evt.target.className!='ws-actionsheet'&&evt.target.className!='li-cancel') return;
      this.$parent.menuVisbile =false;
    },
    collect(){
      BookCaseService.add(
        this,
        this.bid,
        this.cid
        ).then(data=>{
          this.bookCase = this.bid;
      });
      this.$parent.menuVisbile =false;
    },
    remove(){
      BookCaseService.delete(
        this,
        this.bid
        ).then(data=>{
          this.bookCase = undefined;
      });
      this.$parent.menuVisbile =false;
    }
  }
};
</script>

<style scoped>
.ws-actionsheet {
  background: rgba(0, 0, 0, 0.5);
  position: fixed;
  width: 100%;
  height: 100vh;
  top: 0;
  left: 0;
  transition: opacity .2s linear;
}
.ws-actionsheet-wrapper {
  position: fixed;
  width: 100%;
  background: #ffffff;
  color: #333;
  bottom: 0;
  left: 0;
}
.ws-actionsheet-wrapper ul{
  padding: 0 1rem;
}
.ws-actionsheet-wrapper ul li{
    height: 3.33rem;
    border-top: 1px solid #d6d6d6;
    line-height: 3.33rem;
}
.ws-actionsheet-wrapper ul li .icon{
    margin-right: 0.5rem;
    font-size: 1rem;
}
.ws-actionsheet-wrapper ul li:first-child{
    height: 3.33rem;
    border-top: 0px solid #d6d6d6;
    line-height: 3.33rem;
}
.li-cancel{
    height: 3.33rem;
    border-top: 5px solid #868686;
    line-height: 3.33rem;
    color:#F76C5B;
}

.ws-actionsheet-pop-enter, .ws-actionsheet-pop-leave-active {
  opacity: 0;
}
</style>
