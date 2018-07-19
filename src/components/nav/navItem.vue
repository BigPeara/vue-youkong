
<template>
  <div class="nav-item" @click="detail">
    <i :class="'icon-nav icon-nav-'+ icon"></i>
    <span>{{title}}</span>
  </div>
</template>

<script>
import Native from '@/utils/nativeUtil'
import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'nav-item',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL
    }
  },
  bridge: undefined,
  props: ['title', 'icon', 'linkUrl','native'],
  methods: {
    detail() {
      this.$router.push(this.linkUrl);
    }
  }
}
</script>

<style scoped>
.nav-item {
  border: 0px solid #eee;
  vertical-align: middle;
  margin: 1rem auto;
  text-align: center;
  float: left;
  width: 24.9%
}

.nav-item span {
  font-weight: 400;
  font-size: 1rem;
  display: block;
  margin-top: 0.5rem;
}
</style>
