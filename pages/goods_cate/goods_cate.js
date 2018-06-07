// pages/goods_cate/goods_cate.js
var util = require('../../utils/util.js');
var template = require('../../template/template.js');
const app = getApp();
var input_value = '';
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsGroup:[
            // { id: 1, name: '品牌' },
            // { id: 2, name: '颜色' },
            // { id: 3, name: '类型' },
            // { id: 4, name: '品种' },
            // { id: 5, name: '国家' },
        ],
        current_id:1,
        goodsClass:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        template.tabbar("tabBar", 1, this, app.globalData.vipLevel); //0表示第一个tabbar
        // 获取分类组
        util.myWxRequest(app.globalData.getGroupUrl, {}, function(res){
            that.setData({
                goodsGroup: res.data.data,
                current_id: res.data.data[0].id
            });
        });

        // 获取分类类别
        let groupid = that.data.current_id;
        util.myWxRequest(app.globalData.getGoodsClassUrl, { groupId: groupid}, function (res) {
            that.setData({
                goodsClass: res.data.data,
            });
        });
      
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    
    },

    // 分类详情事件
    cateinfo: function(){
      wx.navigateTo({
        url: 'pages/goods_cate/goods_cate'
      })
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
     * 点击类别组获取类别
     */
    goodsGroup:function(e){
        var that = this;
        // 获取组id
        var id = e.currentTarget.dataset.id;
        that.setData({
            current_id:id
        });
        // 获取类别
        util.myWxRequest(app.globalData.getGoodsClassUrl, { groupId: id }, function (res) {
            that.setData({
                goodsClass: res.data.data,
            });
        });

    },

    /**
     * 搜索框失去焦点时
     */
    inputBlur:function(e){        
        input_value = e.detail.value;
    },

    /**
     * 搜索商品
     */
    searchGoods:function(){
        let val = input_value;
        mySearch(val);
    },
    /**
     * 点击完成按钮时触发
     */
    inputConfirm:function(e){
        // 获取输入的值
        var val = e.detail.value;
        // 搜索
        mySearch(val);
    },

    /**
     * 点击类别跳转到商品
     */
    classToGoods: function (e) {
        var that = this;
        // 获取类别id
        var id = e.currentTarget.dataset.classid;
        var classname = e.currentTarget.dataset.classname;
        // console.log(id,classname);
        wx.navigateTo({
            url: '../goods_list/goods_list?classid=' + id + '&classname=' + classname
        });
    },

    

});

/**
 * 搜索的方法
 */
function mySearch(val) {
    wx: wx.navigateTo({
        url: '/pages/goods_list/goods_list?goodsName=' + val,
    })
}
