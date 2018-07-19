<template>
 <mt-loadmore :top-method="loadTop" :autoFill="true" ref="reload" @top-status-change="handleTopChange">
  <div 
  v-infinite-scroll="loadData"
  infinite-scroll-disabled="loading"
  infinite-scroll-distance="5"
  class="wrapper">
        <special-book v-for="book in bookList" v-bind:key="book.bid" 
        :bid='book.bid' 
        :cover='book.cover' 
        :title="book.booktitle" 
        :intro='book.intro' 
        :author='book.author' 
        :price='book.price' 
        :specialPrice='book.specialPrice' 
        :show='book.visible' 
        :enabled='book.enabled' ></special-book>
  </div>
  <ws-footer-line :pager="pager" />
  <div slot="top" class="mint-loadmore-top">
    <p v-show="topStatus !== 'loading'" >
      <span :class="[{ 'rotate': topStatus === 'drop' }]">↓</span>
      &nbsp;
      <span>{{topStatus==='drop'?'松开立即刷新':'下拉可以刷新'}}</span>
    </p>
    <p v-show="topStatus === 'loading'" class="flex flex-box flex-center">
        <mt-spinner color='#999' type="fading-circle" :size='16' class="flex flex-box"></mt-spinner>
        <span>&nbsp;数据加载中...</span>
    </p>
  </div>
  </mt-loadmore>
</template>
<script>
import BookStorageService from "@/domain/bookstorageService"
import SpecialBook from '@/components/book/specialOfferBook'
import WsFooterLine from "@/components/footer/footerline";
export default {
  name: "bookstorage-shots",
  data() {
    return {
      bookList: [],
      pager:{
        pageIndex:1,
        pageSize:10,
        records:0,
        loadFinished:false,
        isloading:false,
        reset() {
          this.records = 0;
          this.pageIndex = 1;
          this.loadFinished = false;
        }
      },
      created:false,
      topStatus: 'pull'
    };
  },
  created(){
    this.loadData();
    this.created = true;
  },
  methods:{
    loadData(){
      if(!this.created) return;
      BookStorageService.getShorts(this).then(data => {
        for(var b in data){ 
          this.bookList.push(data[b]);
        };
      });
    },
    reload(){
      if(!this.created) return;
      this.pager.reset();
      this.bookList=[];
      BookStorageService.getShorts(this).then(data => {
        for(var b in data){ 
          this.bookList.push(data[b]);
        };
        setTimeout(()=>{
        this.$refs.reload.onTopLoaded();
        this.topStatus="pull";
        },500);
      });
    },
    loadTop() {
      this.reload();
    },
    handleTopChange(status) {
      this.topStatus = status;
    }
  },
  components: {
    SpecialBook,
    WsFooterLine
  }
};
</script>

<style scoped>
.wrapper{
  padding:1rem;
  background:#fff;
}
</style>

