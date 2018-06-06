// pages/address/insert/insert.js
var util = require('../../../utils/util.js');
const app = getApp();

Page({

  /**
   * 页面的初始数据
   */
  data: {
    array:""
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    // 请求获取所有数据
    var that=this
    util.myWxRequest(app.globalData.getAddrUrl, { user_id: app.globalData.userId}, function (res) {
      that.setData({
          array:res.data.data
      })
    });
  },

  // 设置默认
  moren: function(e){
    util.myWxRequest(app.globalData.updateAddrDefault, { id: e.currentTarget.dataset.id }, function (res) {
      wx.redirectTo({
        url: '/pages/address/insert/insert'
      })
      wx.showToast({
        icon: 'success',
        title: '设置成功'
      });
    });
  },

  // 删除地址
  deletes: function(e){
    util.myWxRequest(app.globalData.deleteAddrUrl, { id: e.currentTarget.dataset.id }, function (res) {
      wx.redirectTo({
        url: '/pages/address/insert/insert'
      })
      wx.showToast({
        icon: 'success',
        title: '删除成功'
      });
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