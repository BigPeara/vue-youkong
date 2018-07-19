<template>
  <router-link :to="'/book/' + bid" class="simple-container" @click="detail">
    <img class="cover" :src="baseurl+cover" />
    <p class="bookTitle display-row1">{{title}}</p>
    <p class="author display-row1"></p>
  </router-link>
</template>

<script>
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'simple-book',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL
    }
  },
  props: ['cover', 'title', 'author', 'bid'],
  methods: {
    detail() {
      
    }
  }
}
</script>

<style scoped>
.simple-container{
  text-align: left;
}
.bookTitle {
  color: #171717;
  font-size: 1rem;
  margin-top: 0.75rem;
  max-width: 5.9375rem;
}
.author {
  color: #999;
  max-width: 4.8125rem;
  font-size: 0.75rem;
  margin-top: 0.3rem;
}
.simple-container {
  max-width: 9rem;
  position:relative;
}
</style>
