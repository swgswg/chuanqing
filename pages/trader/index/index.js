// pages/trader/index/index.js
const util = require('../../../utils/util.js');
const app = getApp();
const template = require('../../../template/template.js');
var input_value = '';

Page({

    /**
     * 页面的初始数据
     */
    data: {
        //国家循环
        goodsGroup:[],
        // 品牌图标
        brand:[
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        { img: '../../../images/c4.png' },
        {img:'../../../images/c4.png'}
        ],
        // 相关推荐信息
        recommend: [],
        serverUrl: app.globalData.aliyunServerURL
    },

    // 活动跳转事件
    activity: function(){
        wx.navigateTo({
        url: '/pages/seckill/seckill'
        })
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        // 加载页面tarBar模块
        template.tabbar("tabBar", 0, this, app.globalData.vipLevel);
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that=this
        //  国家页面  获取分类组
        util.myWxRequest(app.globalData.getGroupUrl, {}, function (res) {
            that.setData({
            goodsGroup: res.data.data,
            current_id: res.data.data[0].id
            });
        });

        // 相关推荐  
        util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, {}, function (res) {
            var arrays=res.data.data
            // var lengths=res.data.data.length
            that.setData({
                recommend: arrays
            });
        });

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
     * 搜索框失去焦点时
     */
    inputBlur: function (e) {
        let arrayVal = [];
        arrayVal.push(e.detail.value);
        input_value = e.detail.value;
        // 获取用户缓存
        // wx.getStorage({
        //     key: app.globalData.userId,
        //     success: function (res) {
        //         let storageVal = res.data;
        //     }
        // });
        // if (storageVal != '' && Array.isArray(storageVal)){
        //     storageVal.push(e.detail.value);
        // } else {
        //     storageVal = val;
        // }
        // wx.setStorage({
        //     key: app.globalData.userId,
        //     data: storageVal
        // })
        
        // 获取保存用户搜索数据
        util.getSetStorage(app.globalData.userId, e.detail.value, arrayVal);
    },

    /**
     * 点击完成按钮时触发
     */
    inputConfirm:function(e){
        let arrayVal = [];
        arrayVal.push(e.detail.value);
        // 搜索商品
        mySearch(e.detail.value);
        // 获取保存用户搜索数据
        util.getSetStorage(app.globalData.userId, e.detail.value, arrayVal);

    },
    /**
     * 搜索商品
     */
    searchGoods: function () {
        let val = input_value;
        mySearch(val);
    },

})


/**
* 搜索的方法
*/
function mySearch(val) {
  wx: wx.navigateTo({
    url: '/pages/goods_list/goods_list?goodsName=' + val,
  })
}

