<template>
  <div class="ws-swipe-container" :style="styleRender">
    <mt-swipe :auto="4000"><!-- ul -->
      <mt-swipe-item v-bind:key="book.id" v-for="book in bookList"><!-- li -->
        <router-link :to="'/book/'+book.id">
          <div class="shandow gradient" @click="detail(book.id)"></div>
          <img :src="baseurl + book.cover" @click="detail(book.id)" />
        </router-link>
      </mt-swipe-item>
    </mt-swipe>
  </div>
</template>

<script>
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'ws-swipe-container',
  data() {
    //轮播图比例 640 * 236
    var height = window.innerWidth * 370 / 750;
    return {
      baseurl: UrlConfig.SWIPE_BASE_URL,
      styleRender: {
        height: height + 'px'
      }
    }
  },
  props: [
    'bookList'
  ],
  methods: {
    detail(bid) {
      //
    }
  }
}
</script>

<style>
.ws-swipe-container {
  height: 9.375rem;
}
.ws-swipe-container img {
  width: 100%;
}
.mint-swipe-indicator{
    background-color: #fff;
    opacity: .7;
}
.mint-swipe-indicator.is-active{
  background-color: #fff;
  opacity: 1;
}
.mint-swipe-indicators{bottom: 6px;}

.shandow {
  position: absolute;
  background:url('./../../assets/img/swiper_bg.png') repeat-x;
  top: 0;
  height: 100%;
  z-index: 9;
  width: 100%;
}
</style>

