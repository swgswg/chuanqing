// pages/address/add/add.js
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    region: ['广东省', '广州市', '海珠区'],
  },

  // 选择地区
  bindRegionChange: function (e) {
    this.setData({
      diqu: e.detail.value
    })
  },
  // 地址提交数据
  formSubmit: function (e) {
    var addrCity = e.detail.value.addrCity
    var addrDetail = e.detail.value.addrDetail
    var phone = e.detail.value.phone
    var receiveName = e.detail.value.receiveName
    if (e.detail.value.checkbox[0]=='true'){
        var defaults=1;
      }else{
        var defaults = 0;
      }
    util.myWxRequest(app.globalData.addAddrUrl, { user_id: app.globalData.userId, receiveName: receiveName, phone: phone, addrCity, addrCity, addrDetail: addrDetail,is_default:defaults }, function (res) {

          wx.navigateTo({
              url: '/pages/address/insert/insert'
          })
          wx.showToast({
            icon: 'success',
            title: '添加成功'
          });
    });
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