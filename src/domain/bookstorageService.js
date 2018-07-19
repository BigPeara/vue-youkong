/**
 * 书库操作业务类
 * filename:bookstorage.js
 * created by charlesshang
 */

import HttpUtil from '@/utils/httpUtil'

export default {
    /**
     * 精选列表
     * @param {*精选页面视图模型}  
     */
    wellchosen($vm) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/BookStorage/wellchosen', {
                mids: '193',
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });
    },
    /**
     * 获取书籍详细信息
     * @param {*书籍详情页视图模型}  
     */
    bookDetail($vm, bid) {
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/ReadingCenter/BookInfo', {
                bid: bid
            }).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 获取书籍详细信息
     * @param {*章节目录}  
     * @param {*书城首页轮播}  
     */
    bookIndex($vm, bid) {
        return new Promise(function(resolve, reject) {
            HttpUtil.requestPager('api/BookStorage/Index', {}).then(response => {
                resolve(response.data);
            });
        });
    },
    /**
     * 书籍目录
     */
    cataloguelist($vm, bid) {
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/ReadingCenter/ChapterList', {
                bid: bid
            }).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 书籍分类
     */
    bookClassInit($vm) {
        return new Promise(function(resolve, reject) {
            HttpUtil.request('api/v2/BookStorage/BookClassInit', {}).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 获取书籍详细信息
     * @param {*评论列表}  
     */
    getComments($vm, bid) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/OperationCenter/GetComments', {
                bid: bid,
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });

    },
    /**
     * 获取书库分类搜索
     * @param {*分类搜索}  
     */
    filter($vm, bid) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/BookStorage/Filter', {
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex,
                type: $vm.queryCondition.type,
                order: $vm.queryCondition.order,
                state: $vm.queryCondition.state,
                vip: $vm.queryCondition.vip || 0,
                channelid: $vm.queryCondition.channelid
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });
    },
    /**
     * 热门搜索
     * @param {*热门搜索按钮}  
     */
    searchHot($vm) {
        return new Promise(function(resolve, reject) {
            HttpUtil.requestPager('api/BookStorage/SearchHot', {}).then(
                response => {
                    resolve(response.data);
                });
        });
    },
    /**
     * 获取章节内容
     * @param {*视图模型对象}  
     * @param {*书籍Id} bid 
     * @param {*章节Id} cid 
     */
    chapterContent($vm, bid, cid) {
        return new Promise(function(resolve, reject) {
            HttpUtil.post('api/v2/ReadingCenter/ChapterContent', {
                bid: bid,
                cid: cid,
                next: 0
            }, () => {
                $vm.isloading = true;
                $vm.chapter.Contents = "奋力加载中...";
            }, () => {

            }).then(
                response => {
                    $vm.isloading = false;
                    resolve(response.data);
                });
        });
    },
    /**
     * 搜索结果
     * @param {*搜索结果}  
     */
    search($vm) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/BookStorage/Search', {
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex,
                type: $vm.works.type,
                labels: $vm.works.labels,
                content: $vm.works.content
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data);
                });
        });
    },
    /**
     * 
     * @param {短片列表}  
     */
    getShorts($vm) {
        return new Promise(function(resolve, reject) {
            if ($vm.pager.loadFinished || $vm.pager.isloading)
                return;
            $vm.pager.isloading = true;
            HttpUtil.requestPager('api/BookStorage/SpecialOfferBookList', {
                pageSize: $vm.pager.pageSize,
                pageIndex: $vm.pager.pageIndex
            }).then(
                response => {
                    $vm.pager.isloading = false;
                    $vm.pager.records += response.data.list.length;
                    $vm.pager.pageIndex++;
                    if ($vm.pager.records >= response.Total)
                        $vm.pager.loadFinished = true;
                    resolve(response.data.list);
                });
        });
    }
}