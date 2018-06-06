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
        payment : true,
        enterPaymentPassword:true
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let goodsInfo = [];
        let commit_order = {};
        let prevUrl = util.getPrevPageUrl();

        // 通过商品详情传过来的
        if (prevUrl == 'pages/goods_detail/goods_detail' || prevUrl == 'pages/address/insert/insert'){
            let commit_order = app.globalData.buyGoods;
            that.setData({
                commit_order: commit_order
            });
           
        } else if (prevUrl == 'pages/cart/cart' || prevUrl == '/pages/cart/cart') {
            // 通过购物车传过来的
            let buygoods = app.globalData.buyGoods;
            that.setData({
                commit_order: buygoods
            }); 
        }

        // 获取地址
        if (app.globalData.buyGoods.addressId){
            // 通过地址id获取地址
            util.myWxRequest(app.globalData.getAddrByIdUrl, { id: app.globalData.buyGoods.addressId }, function (res) {
                that.setData({
                    address: res.data.data
                });
            });   
        } else {
            // 获取默认地址
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
        // 显示支付方式
        // that.setData({
        //     payment: false
        // });
        let commit_order = that.data.commit_order;
        let goodsInfo = commit_order.goodsInfo;
        let len = goodsInfo.length;
        let gid = '';  // 商品id
        let num = '';  // 商品数量
        let price = ''; // 商品价格
        let cid = '';  // 商品购物车id
        for(let i=0; i < len; i++){
            gid += goodsInfo[i].gid + ',';
            num += goodsInfo[i].num + ',';
            price += goodsInfo[i].price + ',';
            if (goodsInfo[i].cid){
                cid += goodsInfo[i].cid + ',';
            }
        }
        gid = gid.slice(0, gid.lastIndexOf(','));
        num = num.slice(0, num.lastIndexOf(','));
        price = price.slice(0, price.lastIndexOf(','));
        cid = cid.slice(0, cid.lastIndexOf(','));
        let mystatus = 0;
        if(cid){
           mystatus =1; 
        } else {
            mystatus = 0;
        }
        let mydata = { goodsId: gid, num: num, userId: app.globalData.userId, soldPrice: commit_order.soldPrice, status: mystatus, price: price, cartsId: cid, addrId: that.data.address.id}
        util.myWxRequest(app.globalData.InsertOrderUrl, mydata, function (res) {
            app.globalData.buyGoods = '';
            wx.navigateTo({
                url: '/pages/pay_success/pay_success'
            })
        });
    },

    /**
     * 支付订单
     */
    slecetPay:function(){

    },
    /**
     * 添加新的支付方式
     */
    addNewPay:function(){

    }
    

})