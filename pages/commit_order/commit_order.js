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
            goods_total:'432.00',
            transportation_expenses : '0.00',
            goods_info:[
                {
                    goods_img:'../../images/hongjiu.png',
                    goods_name:'路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2',
                    goods_price:'36.00',
                    goods_number:12
                },
                {
                    goods_img: '../../images/hongjiu.png',
                    goods_name: '路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2',
                    goods_price: '36.00',
                    goods_number: 12
                }
            ]
        },
        receipt:'',
        msg: ''
        
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 获取选择地址
        if(options.address){
            wx.request({
                url: app.globalData.getAddrByDefaultUrl,
                method: 'POST',
                // data: {userId:,page:1,pageSize:1},
                header: {
                    'content-type': 'application/x-www-form-urlencoded'
                },
                success: function (res) {
                    that.setData({
                        address: res.data.data.list
                    });
                }
            });
        }
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
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
            // url: '/pages/address/insert/insert?userId='+;
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
        wx.request({
            url: app.globalData.InsertOrderUrl,
            method: 'POST',
            data: { goodsId: goodsId,num:num,userId:userId,soldPrice:soldPrice,status:status,price:price,cartsId:cartsId },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                if(res.status == 1){
                    // 跳转到支付页面
                }
            }
        });
    },

    

})