// pages/commit_order/commit_order.js
var util = require('../../utils/util.js');
const app = getApp();

Page({

    /**
     * 页面的初始数据
     */
    data: {
        address:{
            addrCity: '所在地区',
            receiveName:'收货人姓名',
            user_id:'收货人编号',
            phone: '收货人电话',
            addrDetail: '详细地址',
            id:'地址编号'
        },
        commit_order:{
            // goods_total:'432.00',
            // transportation_expenses : '0.00',
            // goods_info:[]
        },
        receipt:'',
        msg: '',
        payment : true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let goodsInfo = [];
        let commit_order = {};
        let prevUrl = util.getPrevPageUrl();

        // 获取选择地址
        if(options.address){
            util.myWxRequest(app.globalData.getAddrUrl, { userId: app.globalData.userId, page: 1, pageSize: 1 }, function (res) {
                that.setData({
                    address: res.data.data
                });
            });
        }

        // 通过商品详情传过来的
        if (prevUrl == 'pages/goods_detail/goods_detail' || prevUrl == '/pages/goods_detail/goods_detail'){
            let commit_order = app.globalData.buyGoods;
            that.setData({
                commit_order: commit_order
            });

            // 通过商品id获取商品信息
            // util.myWxRequest(app.globalData.getGoodsDetailUrl, { goodsId: buygoods.goodsId }, function (res) {
            //     // console.log(res);
            //     goods = res.data.data;
            //     good.goods_number = buygoods.num;
            //     goodsInfo.push(goods);
            //     commit_order = { goods_total: buygoods.price, transportation_expenses: '0.00', goodsInfo: goodsInfo, receipt: '', msg: '' }
            //     that.setData({
            //         commit_order: commit_order
            //     });
            // });
            // 通过用户id获取默认地址
            util.myWxRequest(app.globalData.getAddrByDefaultUrl, { user_id: app.globalData.userId }, function (res) {
                // console.log(res);
                that.setData({
                    address: res.data.data
                });
            });
        }

        // 通过购物车传过来的
        if (prevUrl == 'pages/cart/cart' || prevUrl == '/pages/cart/cart') {
            let buygoods = app.globalData.buyGoods;
            that.setData({
                commit_order: buygoods
            });
            // 通过用户id获取默认地址
            util.myWxRequest(app.globalData.getAddrByDefaultUrl, { user_id: app.globalData.userId }, function (res) {
                that.setData({
                    address: res.data.data
                });
            });
        }
        
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that = this;
        // 获取默认地址
        wx.request({
            url: app.globalData.getAddrByDefaultUrl,
            method: 'POST',
            // data: {userId:},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                that.setData({
                    address: res.data.data
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function () {
        // prevPageUrl = util.getPrevPageUrl();
        // if (prevPageUrl == '/pages/address/insert/insert'){
            
        // }
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
    receiptInfo:function(e){
        this.setData({
            receipt: e.detail.value, 
        });
    },

    /**
     * 备注
     */
    msg:function(e){
        this.setData({
            msg: e.detail.value
        });
    },
    /**
     * 提交订单
     */
    commitOrder:function(){
        var that = this;
        // 支付
        // this.setData({
        //     payment: false
        // });
        let commit_order = that.data.commit_order;
       
        let goodsInfo = commit_order.goodsInfo;
        let len = goodsInfo.length;
        let goodsId = '';
        let num = '';
        let price = '';
        let cartsId = '';
        for(let i=0; i < len; i++){
            goodsId += goodsInfo[i].goodsId + ',';
            num += goodsInfo[i].num + ',';
            price += goodsInfo[i].price + ',';
            if (goodsInfo[i].cartsId){
                cartsId += goodsInfo[i].cartsId + ',';
            }
        }
        goodsId = goodsId.slice(0, goodsId.lastIndexOf(','));
        num = num.slice(0, num.lastIndexOf(','));
        price = price.slice(0, price.lastIndexOf(','));

        let mydata = { goodsId: goodsId, num: num, userId: app.globalData.userId, soldPrice: commit_order.soldPrice, status: 1, price: price, cartsId: cartsId }
        util.myWxRequest(app.globalData.InsertOrderUrl, mydata, function (res) {
            console.log('ok');
            wx.navigateTo({
                url: '/pages/pay_success/pay_success'
            })
        });
    },

    

})