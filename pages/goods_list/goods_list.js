// pages/goods_list/goods_list.js
var util = require('../../utils/util.js');
const app = getApp();
var multiple_flag = true;
var sales_volume_flag = true;
var new_product_flag = true;
var my_price_flag = true;
var myclassId = 0;
var myPageSize = 20;
var myPage = 1;
var condition = 1;
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
        myclassId = options.classid;
        // 动态设置页面标题
        if (options.classname){
            wx.setNavigationBarTitle({
                title: options.classname
            });
        }
        // 通过类别id获取商品列表
        getGoods(myPageSize, 1,that);
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
        let mygoodsId = e.currentTarget.dataset.id;
        let myuserId = 1;
        let mynum = 1;
        let mycartsPrice = e.currentTarget.dataset.price;
        // 调用 加入购物车 全局方法
        // console.log(mygoodsId, myuserId, mynum, mycartsPrice);
        util.addToCartFun(mygoodsId, myuserId, mynum, mycartsPrice);
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
            getGoods(myPageSize, 1, that);
            condition = 1;
            multiple_flag = false;
        } else {
            that.setData({
                zonghe_png: '../../images/shang.png'
            });
            getGoods(myPageSize, 1, that);
            condition = 1;
            multiple_flag = true;
        }
        that.setData({
            xiaoliang_png: '../../images/ping.png',
            xinpin_png: '../../images/ping.png',
            jiage_png: '../../images/ping.png'
        });
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
            getGoods(myPageSize, 2, that);
            condition = 2;
            sales_volume_flag = false;
        } else {
            that.setData({
                xiaoliang_png: '../../images/shang.png'
            });
            getGoods(myPageSize, 3, that);
            condition = 3;
            sales_volume_flag = true;
        }
        that.setData({
            zonghe_png: '../../images/ping.png',
            xinpin_png: '../../images/ping.png',
            jiage_png: '../../images/ping.png'
        });
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
            getGoods(myPageSize, 4, that);
            condition = 4;
            new_product_flag = false;
        } else {
            that.setData({
                xinpin_png: '../../images/shang.png'
            });
            getGoods(myPageSize, 5, that);
            condition = 5;
            new_product_flag = true;
        }
        that.setData({
            zonghe_png: '../../images/ping.png',
            xiaoliang_png: '../../images/ping.png',
            jiage_png: '../../images/ping.png'
        });
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
            getGoods(myPageSize, 6, that);
            condition = 6;
            my_price_flag = false;
        } else {
            that.setData({
                jiage_png: '../../images/shang.png'
            });
            getGoods(myPageSize, 7, that);
            condition = 7;
            my_price_flag = true;
        }
        that.setData({
            zonghe_png: '../../images/ping.png',
            xiaoliang_png: '../../images/ping.png',
            xinpin_png: '../../images/ping.png'
        });
    },

    /**
     * 滚动到底部触发
     */
    scrollToLower:function(){
        var that = this;
        myPageSize += 20;
        getGoods(myPageSize, condition, that);
    }

    
});

/**
 * 排序时获取商品列表
 */
function getGoods(myScrollPage,mySort,that){
    // console.log(myclassId, myPage, myPageSize, mySort);
    let mydata = { classId: myclassId, page: myPage, pageSize: myPageSize, condition: mySort };
    util.myWxRequest(app.globalData.getGoodsByClassUrl, mydata, function(res){
        that.setData({
            goods: res.data.data.PageInfo.list
        });
    });
    // wx.request({
    //     url: app.globalData.getGoodsByClassUrl,
    //     data: { classId: myclassId, page: myPage, pageSize: myPageSize, condition: mySort },
    //     method: 'POST',
    //     header: {
    //         'content-type': 'application/x-www-form-urlencoded'
    //     },
    //     success: function (res) {
    //         // console.log(res.data.data.PageInfo);
    //         that.setData({
    //             goods: res.data.data.PageInfo.list
    //         });
    //     }
    // });
}