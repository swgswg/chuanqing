// pages/trader/note/note.js
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
      order:"",
      yprice:'',
      times:""
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
    //订单详细
    var that=this
    util.myWxRequest(app.globalData.getsaleTrackUrl, { dealerCode: app.globalData.dealerCode }, function (res) {
      console.log(res.data.data)
      console.log(res.data.data)

      that.setData({
        order: res.data.data
      });
      // 转化时间戳
      var arrays = res.data.data
      var lengths=res.data.data.length
      var sum =0;
        for (var i=0;i< lengths;i++){
          // 转化时间格式
              var createTime = arrays[i].createTime
              var time = util.formatDate(createTime, 'YY-MM-DD hh:mm:ss')
              that.setData({
                times: time
              });
          //本月成交额
              sum +=parseFloat(parseInt((arrays[i].num))*parseFloat((arrays[i].price)))
              that.setData({
                yprice: sum
              });
                
        }

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