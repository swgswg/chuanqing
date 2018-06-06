const utils = require('../../utils/util.js');
const app = getApp();
var pageSize = 20;
var page = 1;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        stock:null
    },

    // 库存详情
    kcinfo: function(){
        wx.navigateTo({
        url: '/pages/stock_detail/stock_detail'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 获取库存商品
        utils.myWxRequest(app.globalData.getCountUrl, { userId: app.globalData.userId, page: page, pageSize: pageSize},function(res){
            that.setData({
                stock: res.data.data
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
     * scroll-view 滚动到底部
     */
    scrolltolower:function(){
        pageSize += 20;
        let that = this;
        // 获取库存商品
        utils.myWxRequest(app.globalData.getCountUrl, { userId: app.globalData.userId, page: page, pageSize: pageSize }, function (res) {
            that.setData({
                stock: res.data.data
            });
        });
    },

    /**
     * 跳转到库存详情
     */
    stockDetail:function(e){
        // 获取商品id
        let gid = e.currentTarget.dataset.gid;
        // 跳转
        wx.navigateTo({
            url: '/pages/stock_detail/stock_detail?gid='+gid,
        })
    },
})