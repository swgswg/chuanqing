// pages/trader/index/index.js
var util = require('../../../utils/util.js');
const app = getApp();
var template = require('../../../template/template.js');
Page({


  /**
   * 页面的初始数据
   */
  data: {
  //国家循环
  goodsGroup:[],
  // 品牌图标
    brand:[
      { img: '../../../images/c4.png' },
      { img: '../../../images/c4.png' },
      { img: '../../../images/c4.png' },
      { img: '../../../images/c4.png' },
      { img: '../../../images/c4.png' },
      {img:'../../../images/c4.png'}
    ],
  // 相关推荐信息
    recommend: [],
    // 品牌图标
    brand:[
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        {img:'../../../images/c4.png'}
        ],
    // 相关推荐信息
    recommend: [
        { img: '../../../images/1.png', name: '拉菲尚品波尔多',content:'好好好好好哈哈哦哦',prices:'￥888' },
        { img: '../../../images/1.png', name: '拉菲尚品波尔多', content: '好好好好好哈哈哦哦', prices: '￥888' },
        { img: '../../../images/1.png', name: '拉菲尚品波尔多', content: '好好好好好哈哈哦哦', prices: '￥888' },
        { img: '../../../images/1.png', name: '拉菲尚品波尔多', content: '好好好好好哈哈哦哦', prices: '￥888' },
        { img: '../../../images/1.png', name: '拉菲尚品波尔多', content: '好好好好好哈哈哦哦', prices: '￥888' }
        ]
    },

    // 活动跳转事件
    activity: function(){
        wx.navigateTo({
        url: '/pages/seckill/seckill'
        })
    },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      template.tabbar("tabBar", 0, this, app.globalData.vipLevel); 
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
      var that=this
      //  国家页面  获取分类组
      util.myWxRequest(app.globalData.getGroupUrl, {}, function (res) {
        that.setData({
          goodsGroup: res.data.data,
          current_id: res.data.data[0].id
        });
      });

      // 相关推荐  
      util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, {}, function (res) {
          var arrays=res.data.data
          var lengths=res.data.data.length
          that.setData({
            recommend: arrays
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