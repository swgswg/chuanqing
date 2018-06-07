// pages/trader/user/user.js
var template = require('../../../template/template.js');
Page({

  /**
   * 页面的初始数据
   */
    data: {
      recommend: [
        { imgs: '../../../images/1.png', content: '法国整箱进口AOP郎迪干红葡萄酒', prices: '¥888' },
        { imgs: '../../../images/1.png', content: '法国整箱进口AOP郎迪干红葡萄酒', prices: '¥888' },
        { imgs: '../../../images/1.png', content: '法国整箱进口AOP郎迪干红葡萄酒', prices: '¥888' },
        { imgs: '../../../images/1.png', content:'法国整箱进口AOP郎迪干红葡萄酒',  prices: '¥888' }
      ],

      membershipPrivilege: [
        { img: '../../../images/1.png', price: '¥888' },
        { img: '../../../images/1.png', price: '¥888' },
        { img: '../../../images/1.png', price: '¥888' },
        { img: '../../../images/1.png', price: '¥888' },
        { img: '../../../images/1.png', price: '¥888' },
        { img: '../../../images/1.png', price: '¥888' }
      ]
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      template.tabbar("tabBar", 3, this, app.globalData.vipLevel); //0表示第一个tabbar
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