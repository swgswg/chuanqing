// pages/after_sale/after_sale.js
const app = getApp();
var utils = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:{
            img:'../../images/comment-img.png',
            gname:'奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红酒葡萄酒',
            specification:'750ml 6*1箱'
        }
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // 获取商品信息
        utils.myWxRequest(app.globalData.getGoodsDetailUrl, {id:options.goodsId}, function(res){
            that.setData({
                goodsInfo:res.data.data
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
    
    }
})