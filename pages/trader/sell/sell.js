// pages/trader/sell/sell.js
var util = require('../../../utils/util.js');
var Charts = require('.././../../utils/charts');
const app = getApp();
var undercarriage_flag = true;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        // data:"",
        sell:[
            { name:'路易拉菲2009男爵古堡干红葡萄酒红盒礼盒木盒750ml*2',price: '￥888', selling: 155, sells: '50', see: '888' },
            { name:'路易拉菲2009男爵古堡干红葡萄酒红盒礼盒木盒750ml*2',price: '￥888', selling: 155, sells: '50', see: '888' },
            { name:'路易拉菲2009男爵古堡干红葡萄酒红盒礼盒木盒750ml*2',price: '￥888', selling: 155, sells: '50', see: '888' },
            { name:'路易拉菲2009男爵古堡干红葡萄酒红盒礼盒木盒750ml*2',price: '￥888', selling: 155, sells: '50', see: '888' },
            { name:'路易拉菲2009男爵古堡干红葡萄酒红盒礼盒木盒750ml*2',price: '￥888', selling: 155,sells:'50',see:'888'}
        ],
        undercarriage:true,
        goods_num:1,
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
        var that=this
        util.myWxRequest(app.globalData.getIsSaleUrl, { userId: app.globalData.userId}, function (res) {
            console.log(res.data.data)
            that.setData({
                sell: res.data.data
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
     * 下架
     */
    undercarriage:function(){
        var that = this;
        // updateStockUrl
        // utils.myWxRequest(id:,num:);
        that.setData({
            undercarriage:false
        });

    },

    /**
     * 确定下架
     */
    confirmUndercarriage:function(e){
        let index = e.currentTarget.dataset.index;

    },

    /**
     * 取消下架
     */
    cancleUndercarriage:function(){
        this.setData({
            undercarriage: true,
            btn_text: '下架'
        });
    },
    
    // 增加数量
    addCount: function (e) {
        let that = this;
        let goods_num = e.currentTarget.dataset.index; 
        let num = parseInt(this.data.goods_num);
        num = num + 1;
        this.setData({
            goods_num: num
        });
       
    },
    // 减少数量
    minusCount: function (e) {
        let that = this;
        let num = parseInt(this.data.goods_num);
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        this.setData({
            goods_num: num
        });
        
    },

    /**
     * 修改商品数量
     */
    inputNum: function (e) {
        let that = this;
        that.setData({
            goods_num: e.detail.value
        });

    },
    blurNum: function (e) {
        let that = this;
        let num = e.detail.value;

        if (/^[1-9]+[0-9]*]*$/.test(num)) {
            that.setData({
                goods_num: num
            });
        } else {
            that.setData({
                goods_num: 1
            });
        }
       
    },
})