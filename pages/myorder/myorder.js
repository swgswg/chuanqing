// pages/myorder/myorder.js
var util = require('../../utils/util.js');
const app = getApp();
var page = 1;
var pageSize = 20;
Page({

    /**
     * 页面的初始数据
     */
    data: {
            myorder:[
                {   
                    id:1,
                    order_time:'2018-05-08', 
                    // order_status: '卖家已发货',
                    order_status: '2',
                    order_total: '78.00',
                    order_expressage: '0.00',
                    order_goods:[
                        {
                            goods_img:'../../images/hongjiu.png',
                            goods_name:'奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒', 
                            goods_buyprice:'39.00',
                            goods_yuanjia:'39.00',
                            goods_guige: '750ml 6*1箱',
                            goods_number: '1'
                        },
                        {
                            goods_img: '../../images/hongjiu.png',
                            goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                            goods_buyprice: '39.00',
                            goods_yuanjia: '39.00',
                            goods_guige: '750ml 6*1箱',
                            goods_number: '1'
                        }
                    ]
                },
                {
                    id: 2,
                    order_time: '2018-05-08',
                    // order_status: '卖家未发货',
                    order_status: '1',
                    order_goods: [
                        {
                            goods_img: '../../images/hongjiu.png',
                            goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                            goods_buyprice: '39.00',
                            goods_yuanjia: '39.00',
                            goods_guige: '750ml 6*1箱',
                            goods_number: '1'
                        },
                        {
                            goods_img: '../../images/hongjiu.png',
                            goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                            goods_buyprice: '39.00',
                            goods_yuanjia: '39.00',
                            goods_guige: '750ml 6*1箱',
                            goods_number: '1'
                        }
                    ],
                    order_total:'78.00',
                    order_expressage: '0.00'
                },
                {
                    id: 3,
                    order_time: '2018-05-08',
                    // order_status: '交易成功',
                    order_status: '3',
                    order_goods: [
                        {
                            goods_img: '../../images/hongjiu.png',
                            goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                            goods_buyprice: '39.00',
                            goods_yuanjia: '39.00',
                            goods_guige: '750ml 6*1箱',
                            goods_number: '1'
                        }
                    ],
                    order_total:'39.00',
                    order_expressage:'0.00'
                }

            ],
            current_orderStatus:1
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取订单
        if(options){
            switch (options.orderStatus){
                // 全部
                case 1: 
                    mydata = {
                        page: page, pageSize: pageSize, userId: userId, goodsName: goodsName
                    }
                break;
                // 待发货
                case 2:
                    mydata = {
                        page: page, pageSize: pageSize, userId: userId, goodsName: goodsName
                    }
                break;
                // 待收货
                case 3:
                    mydata = {
                        page: page, pageSize: pageSize, userId: userId, goodsName: goodsName
                    }
                break;
                // 待评价
                case 4:
                    mydata = {
                        page: page, pageSize: pageSize, userId: userId, goodsName: goodsName
                    }
                break;
                // 默认为 全部
                default:
                    mydata = {
                        page: page, pageSize: pageSize, userId: userId, goodsName: goodsName
                    }
                break;
            }
            util.myWxRequest(app.globalData.QueryOrderUrl, mydata, function (res) {
                that.setData({
                    myorder: res.data.data.list
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
     * 全部
     */
    allOrders:function(e){
        var that = this;
        that.setData({
            current_orderStatus:1
        });
        // util.myWxRequest(myurl, mydata, mysufun); 
    },
    /**
     * 待发货
     */
    toBeShipped:function(e){
        var that = this;
        that.setData({
            current_orderStatus: 2
        });
    },

    /**
     *待收货
     */
    toBeReceived:function(e){
        var that = this;
        that.setData({
            current_orderStatus: 3
        });
    },

    /**
     * 待评价
     */
    toBeEvaluated:function(e){
        var that = this;
        that.setData({
            current_orderStatus: 4
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
     * 申请售后
     */
    applicationAfterSale:function(e){
        var orderId = e.currentTarget.dataset.orderid;
    },

    /**
     * 评价
     */
    insertComment:function(e){
        var orderId = e.currentTarget.dataset.orderid;
    }

})
// function selectOrder(myurl,mydata,mysufun){
//     wx.request({
//         url: myurl,
//         method: 'POST',
//         data: mydata,
//         header: {
//             'content-type': 'application/x-www-form-urlencoded'
//         },
//         success: function (res) {
//            if(res.status == 1){
//                sufun(res);
//            } else {
//                wx.showToast({
//                    title: '您的网络太差'
//                });
//            }
//         }
//     });
// }