// pages/commit_order/commit_order.js
var utils = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        address: {
            // addrCity: '所在地区',
            // receiveName: '收货人姓名',
            // user_id: '收货人编号',
            // phone: '收货人电话',
            // addrDetail: '详细地址',
            // id: '地址编号'
        },
        order: null,
        receipt: '',
        msg: '',
        serverUrl: app.globalData.aliyunServerURL
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        // console.log(app.globalData.buyGoods);
        // 获取订单信息
        that.setData({
            order: app.globalData.buyGoods
        });
        // 地址信息
        utils.myWxRequest(app.globalData.getAddrByIdUrl, { id: app.globalData.buyGoods.addressId }, function (res) {
            that.setData({
                address: res.data.data
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
     * 选择地址
     */
    selectAddress: function () {
        wx.navigateTo({
            url: '/pages/address/insert/insert?userId=' + app.globalData.userId
        })
    },

    /**
     * 发票信息
     */
    receiptInfo: function (e) {
        this.setData({
            receipt: e.detail.value,
        });
    },

    /**
     * 备注
     */
    msg: function (e) {
        this.setData({
            msg: e.detail.value
        });
    },
    /**
     * 提交订单
     */
    commitOrder: function () {
        var that = this;
        let commit_order = that.data.order;
        // console.log(commit_order);
        let goodsInfo = commit_order.goodsInfo[0];
        console.log(that.data.address);
        let gid = goodsInfo.gid;  // 商品id
        let amount = goodsInfo.amount;  // 商品数量
        let price = goodsInfo.price; // 商品价格
        let mystatus = 0;  // 没有购物车编号
        let mydata = { goodsId: gid, amount: amount, userId: app.globalData.userId, soldPrice: commit_order.soldPrice, status: mystatus, price: price, addrId: that.data.address.id }
        // console.log(mydata)
        utils.myWxRequest(app.globalData.insertOwnOrderUrl, mydata, function (res) {
            app.globalData.buyGoods = '';
            wx.navigateTo({
                url: '/pages/pay_success/pay_success'
            })
        });
    },



})