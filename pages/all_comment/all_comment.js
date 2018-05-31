const app = getApp();
var myPageSize = 20;
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
        var that = this;
        wx.request({
            url: app.globalData.QueryCommentUrl,
            method: 'POST',
            data: { goodsId: id, page: 1, pageSize: myPageSize},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                that.setData({
                    allComment:res.data.data
                });
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
    
    },


    /**
     * 滚动到底部，触发 scrolltolower 事件
     */
    getCommet:function(){
        // var that = this;
        // myPageSize += 20;
        // wx.request({
        //     url: app.globalData.QueryCommentUrl,
        //     method: 'POST',
        //     data: { goodsId: id, page: 1, pageSize: myPageSize },
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     success: function (res) {
        //         that.setData({
        //             allComment: res.data.data
        //         });
        //     }
        // });    
    }








    
})