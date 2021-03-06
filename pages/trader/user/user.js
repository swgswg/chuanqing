// pages/trader/user/user.js
var template = require('../../../template/template.js');
var util = require('../../../utils/util.js');
const app = getApp();

Page({
  /**
   * 页面的初始数据
   */
    data: {
      img:"",
      to_be_shipped: 1,
      to_be_received: 2,
      to_be_evaluated: 3,
      serverUrl: app.globalData.aliyunServerURL
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      console.log(app.globalData.vipLevel);
      template.tabbar("tabBar", 3, this, app.globalData.vipLevel);
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    var that=this
    util.myWxRequest(app.globalData.getUserInfoUrl, { userId: app.globalData.userId}, function (res) {
        that.setData({
          img:res.data.data[0]
        })
    });
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})