const app = getApp();
var utils = require('../../utils/util.js');
var myPageSize = 20;
var goodsid = null;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        allComment: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        goodsid = options.goodsId;     
        utils.myWxRequest(app.globalData.QueryCommentUrl, { goodsId: goodsid, page: 1, pageSize: myPageSize }, function(){
            that.setData({
                allComment: res.data.data.PageInfo.list
            });
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
    
    },


    /**
     * 滚动到底部，触发 scrolltolower 事件
     */
    getCommet:function(){
        let that = this;
        myPageSize += 20;
        utils.myWxRequest(app.globalData.QueryCommentUrl, { goodsId: goodsid, page: 1, pageSize: myPageSize }, function () {
            that.setData({
                allComment: res.data.data.PageInfo.list
            });
        });    

    }
    
})