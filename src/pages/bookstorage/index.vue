<template>
  <div class="main-container">
    <router-link :to="'/bookstorage/search'">
      <div class="search"><i class="icon icon-search"></i>搜作品~搜作者~</div>
    </router-link>
    <!--轮播图-->
    <swipe-container :bookList='gundong' ></swipe-container>
    <!--导航-->
    <div class="nav-container">
      <nav-item title="分类" icon='free' linkUrl='/bookstorage/classify/c/0'></nav-item>
      <nav-item title="排行" icon='rank' linkUrl='/bookstorage/rank' ></nav-item>
      <nav-item title="充值" icon='monthly' linkUrl='/pay'></nav-item>
      <nav-item title="完本" icon='manito' linkUrl='/bookstorage/complete'></nav-item>
    </div>
    <module-container title="热销短篇" direction='column' bookType='simple' :bookList='rexiaodp'  mid='152' icon="recomm" >
      <router-link :to="'/bookstorage/shorts'" slot="extend">
        <img src="../../assets/img/icon-more.png" />
      </router-link>
    </module-container>
    <ws-cutoff-rull />
    <module-container title="女生热门" direction='column' bookType='normal' :bookList='nvshengrm'  mid='152' :complex='true'  icon="nvsheng" />
    <module-container direction='row' bookType='simple' :bookList='nvshengrm' mid='152' :complex='true' >
      <ws-button :actived='true' :style="{paddingBottom:'0.625rem'}"  :hollow='true' :text="'更多精彩...'" :radius='true' :block='true' @click="more(2)"  slot="footer"></ws-button>
    </module-container>
    <ws-cutoff-rull />
    <module-container title="男生热门" direction='column' bookType='normal' :bookList='nanshengrm'  mid='152' :complex='true' icon="nansheng" />
    <module-container direction='row' bookType='simple' :bookList='nanshengrm' mid='152' :complex='true'>
      <ws-button :actived='true' :style="{paddingBottom:'0.625rem'}" :hollow='true' :text="'更多精彩...'" :radius='true' :block='true' @click="more(1)"  slot="footer"></ws-button>
    </module-container>
    <ws-cutoff-rull />
    <module-container title="精品推荐" direction='column' bookType='normal' :bookList='jingpintj' icon="salewell"/>
  </div>
</template>

<script>
import ModuleContainer from "@/components/module/moduleContainer";
import WsButton from '@/components/button/button'
import NavItem from "@/components/nav/navItem";
import SwipeContainer from "@/components/swipe/swipeContainer";
import WsCutoffRull from '@/components/cell/cutoffRull'

import UrlConfig from '@/utils/urlConfig'

import BookStorageService from "@/domain/bookstorageService"

export default {
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL,
      gundong: [],
      rexiaodp: [],
      nvshengrm: [],
      nanshengrm: [],
      jingpintj: []
    };
  },
  created(){
    this.loadData();
  },
  methods: {
    loadData() {
      BookStorageService.bookIndex(this.$data).then(data => {
          this.gundong=data.gundong;
          this.rexiaodp=data.rexiaodp;
          this.nvshengrm=data.nvshengrm;
          this.nanshengrm=data.nanshengrm;
          this.jingpintj=data.jingpintj;
          this.searchKey=data.searchKeys.split(";");
          this.keyName=this.searchKey[0];
    })
    },
    loadSpecials(){
     
    },
    more(c){
      this.$router.push('/bookstorage/classify/c/'+c);
    }
  },
  components: {
    NavItem,
    ModuleContainer,
    SwipeContainer,
    WsCutoffRull,
    WsButton
  }
};
</script>

<style scoped>
.part-container {
  background: #fff;
  padding: 1.5rem 1.5rem 0;
  margin-top: 1rem;
}

.book-container {
  padding: 1.8rem 0 1.3rem;
  display: flex;
  display: -webkit-flex;
  justify-content: space-between;
  -webkit-justify-content: space-between;
  -webkit-box-pack: justify;
}

.nav-container {
  background: #fff;
  height: 6rem;
  margin-bottom: 0.5rem;
  padding: 0;
  width: 100%;
}
.search{
  position: absolute;
  text-align: center;
  top: 0.5rem;
  font-size: 0.8125rem;
  width: 92%;
  left: 4%;
  color: #fff;
  background: rgba(255, 255, 255, 0.4);
  height: 1.75rem;
  z-index: 20;
  border-radius: 0.875rem;
  -webkit-border-radius:0.875rem;
}
.search .icon{
  font-size: 1rem;
  margin-right: 0.3rem;
}
</style>
