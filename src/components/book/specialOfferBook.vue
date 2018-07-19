<template>
  <a class="normal-container flex flex-justify" @click="detail">
    <div class="cover">
      <img :src="baseurl + cover">
    </div>
    <div class="book-info">
      <h3 class="title">
        {{title}}
      </h3>
      <p class="book-intro display-row2">{{intro}}</p>
      <p class="price">{{price}}{{visualcionName}}</p>
      <p class="detail">
        <span class="spPrice">现价:<b>{{specialPrice}}</b>{{visualcionName}}</span>
        <!-- <button v-if="show&&enabled" class='btn-order' @click="order">订购</button>
        <button v-if="show&&!enabled" class="btn-order disabled">已订购</button> -->
      </p>
    </div>
  </a>
</template>

<script>

import UrlConfig from '@/utils/urlConfig'

export default {
  name: 'sp-offer-book',
  data() {
    return {
      baseurl: UrlConfig.COVER_BASE_URL,
      visualcionName:'悠空币'
    }
  },
  bridge: undefined,
  props: ['bid','cover', 'author', 'title', 'intro', 'price', 'specialPrice','show','enabled'],
  methods: {
    detail() {
        this.$router.push('/book/'+this.bid);
    },
    order(){
      event.cancelBubble = true;
      //订购逻辑
    }
  }
}
</script>

<style scoped>
.normal-container {
  text-align:left;
  margin-top: .5rem;
  padding-bottom: .5rem;
  border-bottom: 1px solid #f1f1f1;
  width: 100%;
}

.cover {
  max-width: 5.3rem;
  margin-right: 1rem;
}

.cover img {
  width: 5.3rem;
  display: block;
  height: 7.17rem;
  border-radius: 0.3rem;
  border: 1px solid #eee;
}

.book-info {
  text-align:left;
  flex: 1;
  display: flex;
  justify-content: space-between;
  align-items: inherit;
  flex-direction: column;
  -webkit-flex: 1;
  -webkit-box-flex: 1;
}

.title {
  text-align:left;
  font-size: 1rem;
  font-weight: 400;
  text-align:left;
}

.book-intro {
  text-align:left;
  overflow: hidden;
  color: #666;
  font-size: 0.7rem;
  line-height: 1.2rem;
  height: 2.2rem;
}


.price {
  text-align:left;
  font-size: .6rem;
  text-decoration: line-through;
  color:#ccc;
}
.detail {
  text-align:left;
  font-size: .7rem;
}
.spPrice{
  color: #F25449;
}
.spPrice b{
  font-size: 1.2rem;
}

.btn-order{
  display: flex;
  display: -webkit-flex;
  background: #F25449;
  border: none;
  color: #fff;
  padding: 0 .6rem;
  height: 1.4rem;
  line-height: 1.4rem;
  border-radius: .2rem;
  -webkit-border-radius: .2rem;
}
.btn-order.disabled{
  background: #ccc;
}
</style>