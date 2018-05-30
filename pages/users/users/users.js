// pages/users/users/users.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    date: "生日有礼填写后不可修改 >",
    baomi:0,
    array: ['不可见 > ', '男', '女']
  },

// 日期单击事件
  bindPicker: function (e) {
    this.setData({
      date:e.detail.value
    })
  },

//性别事件
  bindPickerChange: function (e) {
    this.setData({
      baomi: e.detail.value
    })
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