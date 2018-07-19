<template>
  <router-link :to="'/book/'+bid" class="normal-container" @click="detail">
    <img class="cover" :src="baseurl + cover">
    <div class="book-info">
      <h3 class="title">
        {{title}}
      </h3>
      <p class="book-intro" :style="{'-webkit-line-clamp':complex?'3':'2','height':complex?'4.5rem':'3rem'}">{{intro}}</p>
      <p class="other">
        <span class="author"  v-if="!complex">
          <i class="icon icon-user author-info"></i>
          <i class="author-info author-text">{{author}}</i>
        </span>
        <i class="detail"  v-if="!complex">
          <button :style="{'background':state==9?'#d8d8d8':'#F7BDB6'}">{{state==9?'完结':'连载'}}</button>
          <!-- <button>{{tclass}}</button> -->
          <!-- <span>{{bookLength>10000?(Math.floor(bookLength/10000) +'万字'):(bookLength+'字')}}</span> -->
        </i>
      </p>
    </div>
  </router-link>
</template>

<script>

import UrlConfig from '@/utils/urlConfig'
// 'intro'
export default {
  name: 'normal-book',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL
    }
  },
  bridge: undefined,
  props: ['cover', 'author', 'title','intro', 'state', 'tclass', 'bookLength', 'bid','complex'],
  methods: {
    detail() {
      Native.WindowOpener(this.bridge).bookDetail(this.$props.bid);
    }
  }
}
</script>

<style scoped>
.normal-container {
  padding: .9375rem 0;
  border-bottom: 1px solid #f1f1f1;
  display: flex;
  display: -webkit-flex;
  display: -webkit-box;
  justify-content: space-between;
  width: 100%;
  -webkit-justify-content: space-between;
  -webkit-box-pack: justify;
}
.book-info {
  margin-left: 1rem;
  display: flex;
  justify-content: space-between;
  align-items: inherit;
  flex-direction: column;
  flex: 1;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
  text-align: left;
}

.title {
  font-size: 1rem;
  font-weight: 400;
  color: #000;
  text-align: left;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.book-intro {
  overflow: hidden;
  display: -webkit-flex;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  word-break: break-all;
  color: #666;
  font-size: 0.8125rem;
  line-height: 1.5rem;
  height: 3rem;
}


.other {
  font-size: 1.2rem;
  display: flex;
  display: -webkit-box;
  display: -webkit-flex;
  justify-content: space-between;
  align-items: center;
}

.author {
  display: flex;
  flex: 1;
  font-size: .75rem;
  color: #b0b0b0;
  max-width: 8rem;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  width: initial;
  height: initial;
  text-align: left;
  align-items: center;
}
.author-info{display: block;}
.author-text{margin-top: .1rem;}
.icon-user{
  font-size: .85rem;
  margin-right: .4rem;
}

.detail {
  -webkit-flex: 1;
  flex: 1;
  -webkit-box-flex: 1;
  font-size: .7rem;
  text-align: right;
}

.detail button {
  border:none;
  height: 1.0625rem;
  font-size: 0.6875rem;
  color: #fff;
  min-width: 2rem;
  border-radius: 1rem;
  -webkit-border-radius:1rem;
}
</style>