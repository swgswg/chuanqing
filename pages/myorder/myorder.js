// pages/myorder/myorder.js
const util = require('../../utils/util.js');
const app = getApp();
var page = 1;
var pageSize = 20;
// var all_order = -1;      // 全部
// var pending_payment = 0; // 待支付
// var to_be_shipped = 1;   // 待发货
// var to_be_received = 2;  // 待收货
// var to_be_evaluated = 3; // 待评价
// var self_extraction = 4; // 自提
// var accomplish = 5;      // 已完成
Page({

    /**
     * 页面的初始数据
     */
    data: {
        all_order:-1,
        pending_payment:0,
        to_be_shipped:1,
        to_be_received:2,
        to_be_evaluated:3,
        self_extraction:4,
        accomplish:5,
        myorder:null,
        current_orderStatus:-1,
        commet_afterSale:true,
        index:null,
        serverUrl: app.globalData.aliyunServerURL
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // console.log(options.status);
        // 获取订单
        queryOrder(options.status, that);
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
     * 全部
     */
    allOrders:function(e){
        let that = this;
        let mystatus = e.currentTarget.dataset.mystatus;
        console.log(mystatus);
        // 获取订单
        queryOrder(mystatus, that);
        
    },
    /**
     * 待发货
     */
    toBeShipped:function(e){
        let that = this;
        let mystatus = e.currentTarget.dataset.mystatus;
        console.log(mystatus);
        // 获取订单
        queryOrder(mystatus, that);
    },

    /**
     *待收货
     */
    toBeReceived:function(e){
        let that = this;
        let mystatus = e.currentTarget.dataset.mystatus;
        console.log(mystatus);
        // 获取订单
        queryOrder(mystatus, that);

    },

    /**
     * 待评价
     */
    toBeEvaluated:function(e){
        let that = this;
        let mystatus = e.currentTarget.dataset.mystatus;
        console.log(mystatus);
        // 获取订单
        queryOrder(mystatus, that);

    },



    /**
     * 自提
     */
    toBeSelf:function(e){
        var that = this;
        that.setData({
            current_orderStatus: that.data.self_extraction
        });
    },

    /**
     * 查看物流
     */
    checkLogistics:function(e){
        var orderId = e.currentTarget.dataset.orderid;
    },

    /**
     * 提醒发货
     */
    reminderDelivery:function(e){
        var orderId = e.currentTarget.dataset.orderid;
        wx.showToast({
            icon: 'success',
            title: '成功提醒卖家',
        });
    },

    /**
     * 确认收货
     */
    confirmReceipt:function(e){
        var orderId = e.currentTarget.dataset.orderid;
        wx.showModal({
            title: '确认收货',
            content: '确认您已经收到货物',
            success: function (res) {
                if (res.confirm) {
                    setTimeout(function(){
                        wx.showToast({
                            icon: 'success',
                            title: '收货成功',
                        });
                        // 同步修改订单状态
                    },1000);
                } else if (res.cancel) {
                    console.log('用户点击取消')
                }
            }
        });
    },

    /**
     * 申请售后按钮
     */
    afterSaleBtn:function(e){
        var that = this;
        // 获取索引
        let index = e.currentTarget.dataset.index;
        that.setData({
            index: index,
            commet_afterSale: false
        });
    },

    /**
     * 评价按钮
     */
    insertCommentBtn:function(e){
        var that = this;
        // 获取索引
        let index = e.currentTarget.dataset.index;
        that.setData({
            index: index,
            commet_afterSale: false
        });
    }


})

/**
 * 根据状态获取订单
 */
function queryOrder(mystatus,that){
    let mydata = null;
    switch (mystatus) {
        // 待发货
        case that.data.to_be_shipped:
            mydata = {
                page: page, pageSize: pageSize, userId: app.globalData.userId, stauts: that.data.to_be_shipped
            }
            break;
        // 待收货
        case that.data.to_be_received:
            mydata = {
                page: page, pageSize: pageSize, userId: app.globalData.userId, stauts: that.data.to_be_received
            }
            break;
        // 待评价
        case that.data.to_be_evaluated:
            mydata = {
                page: page, pageSize: pageSize, userId: app.globalData.userId, stauts: that.data.to_be_evaluated
            }
            break;
        // 自提
        case that.data.self_extraction:
            mydata = {
                page: page, pageSize: pageSize, userId: app.globalData.userId, status: that.data.self_extraction
            }
            break;
        // 已完成
        case that.data.accomplish:
            mydata = {
                page: page, pageSize: pageSize, userId: app.globalData.userId, status: that.data.accomplish
            }
            break;
        // 默认为 全部
        default:
            mydata = {
                page: page, pageSize: pageSize, userId: app.globalData.userId
            }
            break;
    }
    // 获取订单
    util.myWxRequest(app.globalData.QueryOrderUrl, mydata, function (res) {
        // 获取订单
        let order = res.data.data.PageInfo.list;
        console.log(order);
        for (let i = 0; i < order.length; i++) {
            let goods = order[i].goods;
            let len = goods.length;
            var sumPrice = 0;
            for (let j = 0; j < len; j++) {
                order[i].status = goods[j].status;
                order[i].createTime = goods[j].createTime;
                sumPrice += parseInt(goods[j].num) * parseFloat(goods[j].price);
                order[i].goodsnum = len;
            }
            order[i].sumPrice = sumPrice;
        }
        that.setData({
            myorder: order,
            current_orderStatus: mystatus
        });
    });

}