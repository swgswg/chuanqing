// pages/myinfo/myinfo.js
var util = require('../../utils/util.js');
var template = require('../../template/template.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        userInfo:null,
        all_order: -1,
        pending_payment: 0,
        to_be_shipped: 1,
        to_be_received: 2,
        to_be_evaluated: 3,
        self_extraction: 4,
        accomplish: 5,
        membershipPrivilege:[],
        serverUrl: app.globalData.aliyunServerURL
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
        var that= this;
        // 会员尊享
        util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, { }, function (res) {
            that.setData({
                membershipPrivilege: res.data.data
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