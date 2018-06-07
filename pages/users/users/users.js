// pages/users/users/users.js
var util = require('../../../utils/util.js');
const app = getApp();
var env = require('../../../weixinFileToaliyun/env.js');
var uploadAliyun = require('../../../weixinFileToaliyun/uploadAliyun.js');

Page({

  /**
   * 页面的初始数据
   */
  data: {
    // 生日
    date: "生日有礼填写后不可修改 >",
    // 性别
    baomi:0,
    array: ['不可见 > ', '男', '女'],
    // 呢称
    necheng:"还没有设置呢称",
    // 头像
    img:"",
    covering_layer_hidden: true,
    immediate_sale_hidden: true,
  },

// 日期单击事件
  bindPicker: function (e) {
    this.setData({
      date:e.detail.value
    })
  },
  cancel_sale: function () {
    this.setData({
      immediate_sale_hidden: true
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 呢称修改设置
    if (options.nechen){
      this.setData({
        necheng: options.nechen
      })
    }
  },

  // 修改性别
  update: function(e){
    var date = e.detail.value
    util.myWxRequest(app.globalData.updateUserInfoSex, { userId:app.globalData.userId, sex:date }, function (res) {
      wx.showToast({
        icon: 'success',
        title: '删除成功'
      });
    });
    this.setData({
      baomi: e.detail.value
    })
  },

  //修改生日
  birthday: function (e) {
    var date = e.detail.value
    util.myWxRequest(app.globalData.updateUserInfoBirth, { userId: app.globalData.userId, birth: date }, function (res) {
      wx.showToast({
        icon: 'success',
        title: '修改成功'
      });
    });
    this.setData({
      date: e.detail.value
    })
  },

  // 修改图片
  images: function(){
    util.myWxRequest(app.globalData.updateUserInfoUrl, { userId: app.globalData.userId, photo:this.data.img }, function (res) {
      wx.showToast({
        icon: 'success',
        title: '修改成功'
      });
    });
  },

  //拍摄照片
    photo: function(){
      wx.chooseImage({
        count: 1, // 默认9
        sizeType: ['original', 'compressed'], // 可以指定是原图还是压缩图，默认二者都有
        sourceType: ['camera'], // 可以指定来源是相册还是相机，默认二者都有
        success: function (res) {
          // 返回选定照片的本地文件路径列表，tempFilePath可以作为img标签的src属性显示图片
          var tempFilePaths = res.tempFilePaths
        }
      })
      this.setData({
        immediate_sale_hidden: true
      });
    },

  // 本地上传
    local: function(){
      let that = this;      
      wx.chooseImage({
        count: 1,
        sizeType: ['original', 'compressed'],
        sourceType: ['album', 'camera'],
          // 上传文件
          success: function (res) {
            let tempFilePaths = res.tempFilePaths;
            // 临时文件路径
            let filePath = tempFilePaths[0];
            let ext = filePath.slice(filePath.lastIndexOf('.'));
            let extArr = ['png', 'jpg', 'jpeg', 'gif'];
            if (extArr.indexOf(ext) != -1) {
              // 上传文件
              uploadAliyun(filePath, function (aliyunFileKey) {
                  let newsrc = env.aliyunServerURL + aliyunFileKey;
                  // console.log(env.aliyunServerURL);
                  that.setData({
                      img: newsrc
                  });
                  // 头像上传数据库
                  util.myWxRequest(app.globalData.updateUserInfoPhotoUrl, { photo: aliyunFileKey }, function (res) {
                      wx.showToast({
                        icon: 'success',
                        title: '修改成功'
                      });
                  })
              }, function () { });
            } else {
              wx.showToast({
                title: '图片格式不正确',
                icon: 'none'
              })
            }
        that.setData({
          immediate_sale_hidden: true
        })
          }
      })
    },
    
  // 头像上传事件
    immediate_sales: function () {
      this.setData({
        immediate_sale_hidden: false
      });
    },
    cancel_sale: function () {
      this.setData({
        immediate_sale_hidden: true
      });
    },


  // 地址管理
  guanli: function(){
    util.myWxRequest(app.globalData.getAddrUrl, { user_id: app.globalData.userId}, function (res) {
        var length = res.data.data.length
          if (length>0){
            wx.navigateTo({
              url: '/pages/address/insert/insert'
            })
          } else{
            wx.navigateTo({
              url: '/pages/address/address/address'
            })
          }
    });
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