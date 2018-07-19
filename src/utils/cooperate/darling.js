export default {
    getUserInfo(appId) {
        var u = navigator.userAgent;
        var isAndroid = u.indexOf('Android') > -1 || u.indexOf('Adr') > -1; //安卓浏览器
        var isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/); //ios浏览器
        if (isAndroid) {
            window.android.darlingGetUserInfoAll(appId);
        } else if (isiOS) {
            window.webkit.messageHandlers.darlingGetUserInfoAll.postMessage({ appId: appId });
        }

    }
}