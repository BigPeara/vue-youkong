<template>
<div class="wrapper" :class="[config.mode+'-mode']">
  <div class="reading-page">
      <div class="bar">
        <h4 class="chapter-title display-row1">{{chapter.Title}}</h4>
      </div>
      <div class="tools">
          <i class="icon icon-index" @click="home()"></i>
          <i class="icon icon-sun" v-show="config.mode=='night'" @click="setMode('sun')"></i>
          <i class="icon icon-moon" v-show="config.mode=='sun'" @click="setMode('night')" ></i>
          <i class="icon" @click="fontSizePlus">A+</i>
          <i class="icon" @click="fontSizeMinus">A-</i>
      </div>
      <div class="chapter-content" :style="{fontSize:(config.fontsize+'rem')}">
          <p v-for="(p,$index) in toPs(chapter.Contents)" :key="$index" v-if="!chapter.needSubscript||$index < 3" v-html="p"></p>
      </div>
      <div class="footer flex flex-justify" v-if="(!chapter.needSubscript&&!isloading)||!showPay">
          <router-link class="btn btn-page" :to=" '/book/'+$route.params.bid+(chapter.PrevID?'/'+chapter.PrevID:'')">{{chapter.PrevPageString}}</router-link>
          <i class="btn btn-menu icon icon-read-list" @click="showMenu"></i>
          <router-link class="btn btn-page" :to="'/book/'+$route.params.bid+(chapter.NextID?'/'+chapter.NextID:'')">{{chapter.NextPageString}}</router-link>
      </div>
      
      <action-sheet :visible='menuVisbile' :bid='$route.params.bid' :cid='$route.params.cid' />
    </div>
    <div class="footer subscribe" v-if="chapter.needSubscript&&showPay">
      <!--单章订购-->
      <div class="content" v-if="!chapter.special.isSpecial">
          <fieldset>  
            <legend >本章需购买后阅读</legend> 
            <p class="price">价格：<span>{{chapter.chapterMoney}}</span>悠空币</p>
            <p class="amount">余额：<span>{{userData.vipMoney}}</span>悠空币 + <span>{{userData.Extcredits2}}</span>阅读币</p>
            <ws-button :block='true' v-if="loginState&&(userData.vipMoney+userData.Extcredits2>=chapter.chapterMoney)" :actived='actived' :text="actived?'订阅':'请稍后...'" size='large' @click="subscribe"  />
            <ws-button :block='true' v-if="loginState&&(userData.vipMoney+userData.Extcredits2<chapter.chapterMoney)" :actived='actived'  text="余额不足，前往充值" size='large' @click="goPay"  />
            <ws-button :block='true' v-if="!loginState" :actived='true' text="您尚未登录，点此登录" size='large' @click="goLogin"  />
            <p class="thank">感谢您！支持作者，支持正版阅读！</p>
          </fieldset>
      </div>
      <!--全本订购-->
      <div class="content" v-if="chapter.special.isSpecial&&!chapter.special.hasBuyChapter">
          <fieldset>  
            <legend >全本订购超优惠</legend> 
            <p class="price del">全本原价：<span>{{chapter.special.price}}</span>悠空币</p>
            <p class="price">全本特价：<span>{{chapter.special.specialPrice}}</span>悠空币</p>
            <p class="amount">余额：<span>{{userData.vipMoney}}</span>悠空币 + <span>{{userData.Extcredits2}}</span>阅读币</p>
            <ws-button :block='true' v-if="loginState&&(userData.vipMoney>=chapter.special.specialPrice)" :actived='actived' :text="actived?'立即订购':'请稍后...'" size='large' @click="subscribeSpecial"  />
            <ws-button :block='true' v-if="loginState&&(userData.vipMoney<chapter.special.specialPrice)" :actived='actived'  text="余额不足，前往充值" size='large' @click="goPay"  />
            <ws-button :block='true' v-if="!loginState" :actived='true' text="您尚未登录，点此登录" size='large' @click="goLogin"  />
            <p class="thank">感谢您！支持作者，支持正版阅读！</p>
          </fieldset>
      </div>
    </div>
    <!-- <down-load v-if="!chapter.needSubscript" v-show="downloadVisible"/> -->
  </div>
</template>

<script>
import BookStorageService from "@/domain/bookstorageService";
import OperationService from "@/domain/operationService";
import BookCaseService from "@/domain/bookcaseService";
import ReadingConfig from "@/utils/readingConfig";
import Authentication from "@/utils/authentication";
import WsButton from "@/components/button/button";
import CodingUtil from "@/utils/codingUtil";
import ActionSheet from "./actionsheet";
import Dom from "@/utils/dom";
import DownLoad from "@/components/footer/download";
import CookieConfig from "@/utils/cookieConfig";
import SystemService from "@/domain/systemService";
import Native from "@/utils/nativeUtil";

export default {
  name: "reading-page",
  data() {
    return {
      chapter: {
        Contents: "",
        needSubscript: false
      },
      userData: {
        vipMoney: 0,
        Extcredits2: 0
      },
      config: {
        fontsize: 1.2,
        mode: "sun"
      },
      actived: true,
      menuVisbile: false,
      isloading: false,
      loginState: false,
      showPay:Native.platform == "android"
    };
  },
  watch: {
    $route: "loadData"
  },
  created() {
    this.loadConfig();
    this.loadData();
  },
  components: {
    WsButton,
    ActionSheet,
    DownLoad
  },
  methods: {
    toPs(text) {
      text = text.replace(/ /g, "&ensp;");
      return text.split("\r\n");
    },
    loadConfig() {
      let config = ReadingConfig.get();
      this.config = config;
      this.loginState = Authentication.getLoginState();
      this.showPay=SystemService.iosChecked();
    },
    loadData() {
      if (Authentication.getLoginState()) {
        BookCaseService.addReadRecords(
          this.$route.params.bid,
          this.$route.params.cid
        );
      }
      BookStorageService.chapterContent(
        this,
        this.$route.params.bid,
        this.$route.params.cid
      ).then(data => {
        this.userData = {
          vipMoney: data.vipMoney,
          Extcredits2: data.Extcredits2
        };
        let chapter = data.chapter[0];
        if (chapter.Contents != "") {
          chapter.Contents = CodingUtil.decodeUnicode(chapter.Contents);
          chapter.needSubscript = false;
        } else {
          chapter.Contents = CodingUtil.decodeUnicode(chapter.chapterIntro);
          chapter.needSubscript = true;
        }
        chapter.special=data.special;
        this.chapter = chapter;
        this.downloadVisible = true;
        window.scrollTo(0, 0);
      });
    },
    showMenu() {
      this.menuVisbile = true;
    },
    subscribe() {
      OperationService.subscribe(
        this,
        this.$route.params.bid,
        this.$route.params.cid
      ).then(data => {
        this.loadData();
      });
    },
    /**
     * 单本购买
     */
    subscribeSpecial() {
      OperationService.subscribeSpecial(
        this,
        this.$route.params.bid
      ).then(data => {
        this.loadData();
      });
    },
    goLogin() {
      this.$cookie.set(CookieConfig.WS_REDIRECT_URL, this.$route.path);
      this.$router.push("/login");
    },
    goPay() {
      this.$router.push("/pay");
    },
    home(){
      this.$router.push("/book/"+
          this.$route.params.bid);
    },
    setMode(mode) {
      this.config.mode = mode;
      ReadingConfig.setMode(mode);
    },
    fontSizePlus() {
      this.config.fontsize = ReadingConfig.changeFontSize(0.1);
    },
    fontSizeMinus() {
      this.config.fontsize = ReadingConfig.changeFontSize(-0.1);
    }
  }
};
</script>

<style scoped>
.wrapper {
  min-height: 100vh;
  background: url("img/readingPage-bg.png");
}
.reading-page {
  padding: 0.5rem 1rem;
  background: url("img/readingPage-bg.png");
}
.bar {
  height: 2.5rem;
  line-height: 2.5rem;
  border-bottom: 1px solid #dcdcdc;
}
.tools {
  text-align: right;
}
.tools .icon {
  color: #666;
  font-size: 1.1rem;
  padding: 0.3rem;
}
.chapter-title {
  font-size: 1.2rem;
  color: #b77373;
  text-align: left;
}
.chapter-content p {
  text-align: left;
  line-height: 1.8;
  margin-top: 1rem;
}
.chapter-info {
  font-size: 0.625rem;
  color: #999;
}
.footer {
  overflow: hidden;
  padding: 0.8rem 0;
  font-size: 1.5rem;
}
.footer .btn-page {
  width: 6.4375rem;
  height: 2rem;
  font-size: 0.875rem;
  color: #595959;
  border: 1px solid #dbd9db;
  background: #fff;
  line-height: 2rem;
  display: block;
  border-radius: 1rem;
  -webkit-border-radius: 1rem;
}

.footer .btn-menu {
  width: 2rem;
  height: 2rem;
  color: #595959;
  line-height: 2rem;
  display: block;
  border-radius: 3px;
  -webkit-border-radius: 3px;
}
.footer.subscribe {
  position: fixed;
  width: 100%;
  left: 0;
  bottom: 0;
  background: url("img/readingPage-bg.png");
  -moz-box-shadow: 0px 0px 10px #eee;
  -webkit-box-shadow: 0px 0px 10px #eee;
  box-shadow: 0px 0px 15px #eee;
}
.footer.subscribe .content {
  padding: 0.8rem 1rem;
}
.footer.subscribe fieldset {
  border: none;
  border-top: 1px solid #333;
  position: relative;
  text-align: center;
  font-size: 0.9375rem;
  padding: 0;
  margin-top: 1rem;
}
.footer.subscribe legend {
  padding: 0 0.8rem;
  background: #ececec;
  color: #333;
  font-size: 0.9375rem;
}
.night-mode.wrapper{
  background: #202020;
  color: #a0a0a0;
}
.night-mode .reading-page {
  background: #202020;
  color: #a0a0a0;
}
.night-mode .footer.footer.subscribe{
  background: #202020;
  color: #a0a0a0;
  -moz-box-shadow: 0px 0px 10px #202020;
  -webkit-box-shadow: 0px 0px 10px #202020;
  box-shadow: 0px 0px 15px #202020;
}
.night-mode .footer.subscribe legend {
  background: #202020;
  color: #a0a0a0;
}
.night-mode .footer.subscribe fieldset {
  border-top: 1px solid #a0a0a0;
}
.night-mode .footer .btn-page {
  color: #a0a0a0;
  border: 1px solid #a0a0a0;
  background: #202020;
}

.footer.subscribe fieldset p {
  line-height: 2rem;
}
.price,
.amount {
  text-align: left;
}
.price span,
.amount span {
  color: #F76C5B;
  margin-right: 0.3rem;
}
.price.del,
.price.del span {
  color: #999;
}
.price.del{
  text-decoration: line-through;
}
.thank {
  color: #999;
}
</style>
