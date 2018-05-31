// pages/goods_list/goods_list.js
var util = require('../../utils/util.js');
var multiple_flag = true;
var sales_volume_flag = true;
var new_product_flag = true;
var my_price_flag = true;
var scrollPage = 20;
Page({
    /**
     * 页面的初始数据
     */
    data: {
        goods:[],
        mysort:{
            ping:'../../images/ping.png',
            shang:'../../images/shang.png',
            xia:'../../images/xia.png'
        },
        zonghe_png:'../../images/ping.png',
        xiaoliang_png:'../../images/ping.png',
        xinpin_png:'../../images/ping.png',
        jiage_png:'../../images/ping.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 动态设置页面标题
        if (options.classname){
            wx.setNavigationBarTitle({
                title: options.classname
            });
        }
        // 通过类别id获取商品
        wx.request({
            url: getApp().globalData.baseUrl+'redwine/goods/getGoodsByClass',
            data: { classId: options.classid, page: scrollPage },
            method:'POST',
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                that.setData({
                    goods: res.data.data
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
     * 添加到购物车按钮
     */
    addToCart:function(e){
        // 获取id
        var id = e.currentTarget.dataset.id;
        // 调用 加入购物车 全局方法
        util.addToCartFun(id);
    },

    /**
     * 综合排序
     */
    multiple:function(){
        var that = this;
        if (multiple_flag){
            that.setData({
                zonghe_png:'../../images/xia.png'
            });
            multiple_flag = false;
        } else {
            that.setData({
                zonghe_png: '../../images/shang.png'
            });
            multiple_flag = true;
        }
    },

    /**
     * 销量排序
     */
    salesVolume:function(){
        var that = this;
        if (sales_volume_flag) {
            that.setData({
                xiaoliang_png: '../../images/xia.png'
            });
            sales_volume_flag = false;
        } else {
            that.setData({
                xiaoliang_png: '../../images/shang.png'
            });
            sales_volume_flag = true;
        }
        
    },
    
    /**
     * 新品排序
     */
    newProduct:function(){
        var that = this;
        if (new_product_flag) {
            that.setData({
                xinpin_png: '../../images/xia.png'
            });
            new_product_flag = false;
        } else {
            that.setData({
                xinpin_png: '../../images/shang.png'
            });
            new_product_flag = true;
        }
     
    },
    /**
     * 价格排序
     */
    myPrice:function(){
        var that = this;
        if (my_price_flag) {
            that.setData({
                jiage_png: '../../images/xia.png'
            });
            my_price_flag = false;
        } else {
            that.setData({
                jiage_png: '../../images/shang.png'
            });
            my_price_flag = true;
        }
        
    },

    /**
     * 滚动到底部触发
     */
    scrollToLower:function(){
        scrollPage += 20;
        // wx.request({
        //     url: 'http://192.168.3.25:8080/',
        //     data: { classId: options.classid, page: scrollPage},
        //     method:'POST',
        //     header: {
        //         'content-type': 'application/x-www-form-urlencoded'
        //     },
        //     success: function (res) {
        //         that.setData({
        //             goods: res.data.data
        //         });
        //     }
        // });
    }













    
});
