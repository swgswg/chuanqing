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
    userId:1,
    payInfo:null,
    globalDataBaseUrl: baseUrl,
    getAllCommetnUrl:baseUrl+'redwine/order/QueryComment',
    getGroupUrl:baseUrl+'redwine/goodsGroup/getGroup',
    getGoodsClassUrl: baseUrl +'redwine/goodsClass/getGoodsClass',
    getGoodsByClassUrl: baseUrl +'redwine/goods/getGoodsByClass',
    getGoodsDetailUrl: baseUrl +'redwine/goods/getGoodsDetail',
    QueryCommentUrl: baseUrl +'redwine/order/QueryComment',
    insertCollectionUrl: baseUrl +'redwine/collection/insertCollection',
    getGoodsBySaleCountUrl: baseUrl + 'redwine/goods/getGoodsBySaleCount',
    getAddrByDefaultUrl: baseUrl + 'redwine/addr/getAddrByDefault',
    getCartsUrl: baseUrl + 'redwine/carts/getCarts',
    deleteCartsUrl: baseUrl + 'redwine/carts/deleteCarts',
    InsertOrderUrl: baseUrl + 'redwine/order/InsertOrder',
    getAddrUrl: baseUrl + 'redwine/addr/getAddr',
    QueryOrderUrl: baseUrl + 'redwine/order/QueryOrder',
    InsertCommentUrl: baseUrl + '/redwine/order/InsertComment',
    insertCartsUrl: baseUrl + 'redwine/carts/insertCarts',
    updateCartsUrl: baseUrl + 'redwine/carts/updateCarts',

    
    userLoginUrl: baseUrl+ 'redwine/user/userLogin'
  }

})