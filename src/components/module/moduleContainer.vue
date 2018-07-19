<template>
  <div class="module">
    <div v-if="title" class="titlebar flex flex-box flex-justify">
      <div class="title">
        <i v-if="icon" :class="'icon-title icon-title-'+ icon"></i>
        {{title}}
      </div>
      <div v-if="!hideMore" class="more" @click="more">
        <slot name="extend"></slot>
      </div>
    </div>
    <div class="container">
      <div v-if="bookType==='simple'" :class="direction=='row'?'content flex-row':'content flex-column'">
        <simple-book v-for="(book,$index) in bookList" v-bind:key="book.id" v-if="complex?($index>0):($index<3)" :bid='book.id' :cover='book.cover' :title="book.booktitle" :author='book.author' :complex='complex' ></simple-book>
      </div>
      <div v-if="bookType==='special'" :class="direction=='row'?'content flex-row':'content flex-column'">
        <special-book v-for="(book,$index) in bookList" v-bind:key="book.bid" v-if="$index < 3" :bid='book.bid' :cover='book.cover' :title="book.booktitle" :author='book.author' :specialPrice='book.specialPrice' :show='book.visible' :enabled='book.enabled' ></special-book>
      </div>
      <div v-else-if="bookType==='normal'" class="content flex-column" :style="{'display':direction=='column'?'block':'flex'}">
        <normal-book v-for="(book,$index) in bookList" v-bind:key="book.id" v-if="$index < (complex?1:4)" :bid='book.id' :cover='book.cover' :title="book.booktitle" :author='book.author' :complex='complex' :state='book.state' :bookLength='book.booklength' :intro='book.Introduction' :tclass="book.tclass" :style="{'margin-bottom':(bookList.length>1&&!complex) ?'0':'0.5rem','padding-bottom':(bookList.length>1&&!complex)?'.9375rem':'0'}"></normal-book>
      </div>
      <slot v-if="bookType==='null'"></slot>
    </div>
    <div class="footer">
      <slot name="footer"></slot>
    </div>
  </div>
</template>
<script>
import SimpleBook from '@/components/book/simpleBook'
import SpecialBook from '@/components/book/specialOfferBook'
import NormalBook from '@/components/book/normalBook'
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'module-container',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL,
    }
  },
  props:
  [
    'title',
    'direction',
    'bookType',
    'bookList',
    'mid',
    'hideMore',
    'complex',
    'icon',
    'bar'
  ],

  methods: {
    more() {
      
    }
  },
  components: {
    SimpleBook,
    SpecialBook,
    NormalBook
  },
  updated(){
  }
}
</script>

<style>
.module {
  min-height: 100px;
  background: #fff;
}

.module .titlebar {
  padding: .8rem;
}

.module .container {
  padding: 0 .8rem 0;
}

.titlebar .title {
  color: #333;
  line-height: 1.125rem;
  font-weight: 500;
  font-size:1.125rem;
  font-weight: Medium;
}
.titlebar .more img{
  height:1rem;
  width:2.588rem;
}
.module .content {
  display: flex;
  justify-content: space-between;
  align-items: flex-start;
  justify-content: space-between;
  padding: 0rem 0 .8rem 0;
}

.module .content.flex-column a:first-child {
  padding-top: 0;
}

.module .content.flex-column a:last-child {
  border: none;
}
.footer{
  padding:0 .8rem 0;  
}
</style>
