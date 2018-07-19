<template>
  <div id="app">
    <transition name="slide-left" mode="out-in">
      <router-view class="child-view"></router-view>
    </transition>
    <!-- <router-view class="child-view"></router-view> -->
    <ws-tabbar v-show="!this.isReading">
      <ws-tab-item label="精选" icon='wellchosen' link="/wellchosen" :selected="currentRoutePath=='/wellchosen'" ></ws-tab-item>
      <ws-tab-item label="书城" icon='bookstorage' link="/bookstorage" :selected="currentRoutePath.indexOf('/bookstorage')==0||currentRoutePath.indexOf('/book/')==0||currentRoutePath=='/'"></ws-tab-item>
      <ws-tab-item label="书架" icon='bookcase' link="/bookcase/0" :selected="currentRoutePath.indexOf('/bookcase')==0" ></ws-tab-item>
      <ws-tab-item label="我的" icon='user' link="/mine" :selected="currentRoutePath.indexOf('/mine')==0||currentRoutePath.indexOf('/login')==0"></ws-tab-item>
  </ws-tabbar>
  </div>
</template>

<script>
import WsTabbar from "@/components/tab/tabbar.vue";
import WsTabItem from "@/components/tab/tabitem.vue";
import CookieConfig from "@/utils/cookieConfig";
import Authentication from "@/utils/authentication";
import PersonalCenterService from "@/domain/personalcenterService";
import SystemService from "@/domain/systemService";

import Darling from "@/utils/cooperate/darling";

export default {
  name: "App",
  data() {
    return {
      transitionName: "slide-right",
      currentRoutePath: "/wellchosen",
      isReading: false
    };
  },
  created() {
    this.currentRoutePath = this.$route.path;
    this.isReading = this.$route.meta.isReading;
    this.autoLogin();
  },
  watch: {
    $route(to, from) {
      this.currentRoutePath = to.path;
      this.isReading = to.meta.isReading;
    }
  },
  methods: {
    autoLogin() {
      var self = this;
      var channelid = this.$cookie.get("app_id") || "35795";
      if (channelid == "35795" || channelid == "36064") {
        try {
          //if (!Authentication.getLoginState())
          {
            SystemService.init().then(d => {
              window.darling = window.darling(channelid);
              window.darling.getUserInfoAll(channelid, function(response) {
                //alert(response);
                var responseObj = JSON.parse(response);
                if (responseObj.success == "1") {
                  PersonalCenterService.cooperateLogin(responseObj.obj)
                  .then(data => {
                    self.$router.push('/bookstorage');
                  });
                }
              });
            });
          }
        } catch (e) {
          //alert(e);
        }
      } else {
        SystemService.iosChecked();
        //静默登录
        if (!Authentication.getLoginState()) {
          SystemService.init().then(data => {
            PersonalCenterService.guestLogin(this);
          });
        }
      }
    }
  },
  components: {
    WsTabbar,
    WsTabItem
  }
};
</script>

<style>
body {
  background: #ececec;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  background: #ececec;
}
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter,
.fade-leave-active {
  opacity: 1;
}
.child-view {
  transition: all 0.3s cubic-bezier(0.55, 0, 0.1, 1);
  height: 100%;
}
.slide-left-enter,
.slide-right-leave-active {
  -webkit-transform: translate(100vw, 0);
  transform: translate(100vw, 0);
}
.slide-left-leave-active,
.slide-right-enter {
  -webkit-transform: translate(-100vw, 0);
  transform: translate(-100vw, 0);
}
</style>
