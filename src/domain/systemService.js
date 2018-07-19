/**
 * 系统业务操作类
 * filename:bookcase.js
 * created by charlesshang
 */
import Vue from 'vue'
import VueCookie from 'vue-cookie'
import HttpUtil from '@/utils/httpUtil'
import Native from "@/utils/nativeUtil";

import { Toast } from 'mint-ui'
export default {
    /**
     * 发送短信
     */
    sendMsg($vm) {

        return new Promise(function(resolve, reject) {
            if ($vm.disabled) return;
            if (!$vm.value) {
                Toast('请输入手机号！');
                return;
            }
            HttpUtil.request('api/Sys/SendSmsAuthCode', {
                mob: $vm.value,
                pType: $vm.msgType
            }).then(
                response => {
                    Toast('发送成功!')
                    $vm.timer.index = setInterval(function() {
                        if ($vm.seconds-- == 1) {
                            $vm.seconds = $vm.interval;
                            window.clearInterval($vm.timer.index);
                            $vm.disabled = false;
                        }
                        $vm.setText();
                    }, 1000);
                    resolve(response.data);
                },
                err => {
                    $vm.disabled = false;
                    $vm.setText();
                });
            $vm.disabled = true;
            $vm.setText();
        });
    },
    init() {
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/Sys/SdkInit', {
                appid: VueCookie.get('app_id'),
            }).then(
                response => {
                    for (var p in response.data) {
                        if (p == 'client_ver') continue;
                        VueCookie.set(p, response.data[p], { expires: '1Y' });
                    }
                    resolve(response.data);
                },
                err => {});
        });
    },
    iosChecked() {
        if (VueCookie.get('ws_ios_checked') == 'true' || Native.platform != 'ios')
            return true;
        if (VueCookie.get('ws_ios_checked'))
            return;
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/Sys/SdkInit', {
                appid: VueCookie.get('app_id'),
            }).then(
                response => {
                    let checked =
                        response.data.client_ver >=
                        VueCookie.get("client_ver");
                    VueCookie.set('ws_ios_checked', checked)
                    resolve(response.data);
                },
                err => {});
        });
        // var appleAppId = VueCookie.get("apple_appid");
        // if (appleAppId) {
        //     Vue.http.get("https://itunes.apple.com/lookup?id=" + appleAppId, {})
        //         .then(
        //             response => {
        //                 let checked =
        //                     response.body.results[0].version >=
        //                     VueCookie.get("client_ver");
        //                 VueCookie.set('ws_ios_checked', checked)
        //             },
        //             error => {}
        //         );
        // }
    }
}