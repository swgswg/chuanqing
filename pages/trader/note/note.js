// pages/trader/note/note.js
var util = require('../../../utils/util.js');
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 账户余额年月
      Mtime:"",
      Ytime:"",
      two:"12",
      one:"01",
    // 订单明细参数
      order:"",
    // 本月成交额参数
      yprice:'',
    // 时间参数
      times:"",
      serverUrl: app.globalData.aliyunServerURL  
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

      // 账户余额日期时间
      var years = util.formatDate(new Date().getTime(), 'YY')
      var months = util.formatDate(new Date().getTime(), 'MM')
      this.setData({
        Mtime: months,
        Ytime: years
      });

      //订单详细  按月份查找数据
      var that=this
      util.myWxRequest(app.globalData.getSaleTrackByMonthkUrl, { dealerCode: app.globalData.dealerCode, createTime: that.data.Ytime + '-' + that.data.Mtime },
        function (res) {
            that.setData({
              order: res.data.data
            });
            // 转化时间戳
            var arrays = res.data.data
            var lengths = res.data.data.length
            var sum = 0;
            for (var i = 0; i < lengths; i++) {

                // 转化时间格式
                var createTime = arrays[i].createTime
                var time = util.formatDate(createTime, 'YY-MM-DD hh:mm:ss')
                // var years = util.formatDate(createTime, 'YY-MM')
                that.setData({
                  times: time
                });

                //本月成交额
                sum += parseFloat(parseInt((arrays[i].num)) * parseFloat((arrays[i].price)))
                that.setData({
                  yprice: sum
                });
                
            }
        })
  },

  /**
   *  账户余额月份前进
   */
  go: function(){
    let MM = parseInt(this.data.Mtime)
    let YY= parseInt(this.data.Ytime)
    MM++
    if(MM<10){
        this.setData({
           Mtime: "0"+MM
        })
    }else{
        this.setData({
           Mtime: MM
        })
    }
    if(MM>12){
        this.setData({
            Ytime: YY+1,
            Mtime: this.data.one
        })
    }
    
    //  具体月份订单
    var that=this
    util.myWxRequest(app.globalData.getSaleTrackByMonthkUrl, { dealerCode: app.globalData.dealerCode, createTime: that.data.Ytime + '-' + that.data.Mtime },
      function (res) {
        that.setData({
          order: res.data.data
        });
        // 转化时间戳
        var arrays = res.data.data
        var lengths = res.data.data.length
        var sum = 0;
        for (var i = 0; i < lengths; i++) {

          // 转化时间格式
          var createTime = arrays[i].createTime
          var time = util.formatDate(createTime, 'YY-MM-DD hh:mm:ss')
          // var years = util.formatDate(createTime, 'YY-MM')
          that.setData({
            times: time
          });

          //本月成交额
          sum += parseFloat(parseInt((arrays[i].num)) * parseFloat((arrays[i].price)))
          that.setData({
            yprice: sum
          });

        }
      })

  },

  /**
   *  月份后退
   */
  back: function(){
    let MM = parseInt(this.data.Mtime)
    let YY = parseInt(this.data.Ytime)
    MM--
      if (MM < 10) {
          this.setData({
            Mtime: "0" + MM
          })
      } else {
          this.setData({
            Mtime: MM
          })
      }
      if (MM <=0) {
          this.setData({
            Ytime: YY - 1,
            Mtime: this.data.two
          })
      }


      /**
       * 具体月份订单
      */
      var that = this
      util.myWxRequest(app.globalData.getSaleTrackByMonthkUrl, { dealerCode: app.globalData.dealerCode, createTime: that.data.Ytime + '-' + that.data.Mtime },
        function (res) {
          that.setData({
            order: res.data.data
          });
          // 转化时间戳
          var arrays = res.data.data
          var lengths = res.data.data.length
          var sum = 0;
          for (var i = 0; i < lengths; i++) {

            // 转化时间格式
            var createTime = arrays[i].createTime
            var time = util.formatDate(createTime, 'YY-MM-DD hh:mm:ss')
            // var years = util.formatDate(createTime, 'YY-MM')
            that.setData({
              times: time
            });

            //本月成交额
            sum += parseFloat(parseInt((arrays[i].num)) * parseFloat((arrays[i].price)))
            that.setData({
              yprice: sum
            });

          }
        })

  },

  /**
   * 下拉事件
   * */

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
    console.log('kkkk')
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})