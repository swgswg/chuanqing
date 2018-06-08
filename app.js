//app.js
var baseUrl = 'http://192.168.3.89:8080/';
App({
    onLaunch: function () {
        // 展示本地存储能力
        var logs = wx.getStorageSync('logs') || []
        logs.unshift(Date.now())
        wx.setStorageSync('logs', logs)

        // 登录
        // wx.login({
        //   success: res => {
        //     // 发送 res.code 到后台换取 openId, sessionKey, unionId
        //   }
        // )}
        //   wx.login({
        //       success: function (res) {
        //           if (res.code) {
        //               //发起网络请求
        //               wx.request({
        //                   url: 'http://192.168.3.25:8080/redwine/user/userLogin',
        //                   method: 'POST',
        //                   data: {code: res.code},
        //                   header: {
        //                       'content-type': 'application/x-www-form-urlencoded'
        //                   },
        //                   success: function (data) {
        //                       console.log(data);
        //                     //   that.setData({
        //                     //       goodsInfo: {}
        //                     //   });
        //                   }
        //               })
        //           } else {
        //               console.log('登录失败！' + res.errMsg)
        //           }
        //       }
        //   });
        // 获取用户信息
        wx.getSetting({
            success: res => {
                if (res.authSetting['scope.userInfo']) {
                    // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
                    wx.getUserInfo({
                        success: res => {
                            // 可以将 res 发送给后台解码出 unionId
                            this.globalData.userInfo = res.userInfo

                            // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
                            // 所以此处加入 callback 以防止这种情况
                            if (this.userInfoReadyCallback) {
                                this.userInfoReadyCallback(res)
                            }
                        }
                    })
                }
            }
        })
    },
    globalData: {
        userInfo: null,
        buyGoods:null,
        // 用户id
        userId:1,
        // 用户会员等级
        vipLevel: 1,
        // 阿里云OOS地址
        aliyunServerURL: 'http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/',
        payInfo:null,
        dealerCode:'pingtai',
        globalDataBaseUrl: baseUrl,
        // 获取所有评论
        getAllCommetnUrl:baseUrl+'redwine/order/QueryComment',
        // 获取商品组
        getGroupUrl:baseUrl+'redwine/goodsGroup/getGroup',
        // 获取商品类
        getGoodsClassUrl: baseUrl +'redwine/goodsClass/getGoodsClass',
        getGoodsByClassUrl: baseUrl +'redwine/goods/getGoodsByClass',
        // 获取商品详情
        getGoodsDetailUrl: baseUrl +'redwine/goods/getGoodsDetail',
        // 查询单个商品的评论
        QueryCommentUrl: baseUrl +'redwine/order/QueryComment',
        // 加入收藏
        insertCollectionUrl: baseUrl +'redwine/collection/insertCollection',
        getGoodsBySaleCountUrl: baseUrl + 'redwine/goods/getGoodsBySaleCount',
        // 获取默认地址
        getAddrByDefaultUrl: baseUrl + 'redwine/addr/getAddrByDefault',
        getCartsUrl: baseUrl + 'redwine/carts/getCarts',
        deleteCartsUrl: baseUrl + 'redwine/carts/deleteCarts',
        InsertOrderUrl: baseUrl + 'redwine/order/InsertOrder',
        getAddrUrl: baseUrl + 'redwine/addr/getAddr',
        QueryOrderUrl: baseUrl + 'redwine/order/QueryOrder',
        InsertCommentUrl: baseUrl + '/redwine/order/InsertComment',
        insertCartsUrl: baseUrl + 'redwine/carts/insertCarts',
        updateCartsUrl: baseUrl + 'redwine/carts/updateCarts',
        getGoodsByConditionUrl: baseUrl + 'redwine/goods/getGoodsByCondition',
        // 库存
        getCountUrl: baseUrl + 'redwine/dealer/getCount',
        // 库存详情
        getGoodsDetailByStockUrl: baseUrl + 'redwine/goods/getGoodsDetailByStock',
        insertOwnOrderUrl: baseUrl+'redwine/dealer/insertOwnOrder',
        //修改个人信息
        updateUserInfoUrl: baseUrl + 'redwine/userInfo/updateUserInfo',
        // 修改呢称
        updateUserInfoNickName: baseUrl + 'redwine/userInfo/updateUserInfoNickName',
        //修改性别
        updateUserInfoSex: baseUrl + 'redwine/userInfo/updateUserInfoSex',
        //修改生日
        updateUserInfoBirth: baseUrl +  'redwine/userInfo/updateUserInfoBirth',
        // 添加地址
        addAddrUrl: baseUrl + 'redwine/addr/addAddr',
        //删除地址
        deleteAddrUrl: baseUrl + 'redwine/addr/deleteAddr',
        //获取单个地址
        getAddrByIdUrl: baseUrl + 'redwine/addr/getAddrById',
        // 修改地址
        updateAddrUrl: baseUrl + 'redwine/addr/updateAddr',
        //设置默认
        updateAddrDefault: baseUrl + 'redwine/addr/updateAddrDefault',
        // 正在销售页面
        getIsSaleUrl: baseUrl + 'redwine/dealer/getIsSale',
        // 订单明细
        getsaleTrackUrl: baseUrl + 'redwine/saleTrack/getsaleTrack',
        // 按月份查找数据
        getSaleTrackByMonthkUrl: baseUrl + 'redwine/saleTrack/getSaleTrackByMonth',
        // 下架
        updateStockUrl: baseUrl + 'redwine/goods/updateStock',
        

    }
})