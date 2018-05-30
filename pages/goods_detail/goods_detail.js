// pages/goods_detail/goods_detail.js
var util = require('../../utils/util.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:{
            id:1,
            goods_name: '路易拉菲2009男爵古堡干红葡萄酒红酒礼盒木盒装750ml * 2',
            goods_img: [
                '../../images/swiper.png',
                '../../images/swiper.png',
                '../../images/swiper.png'
            ],
            goods_price:'119.00',
            member_price:'99.00'
        },
        goods_num:1,  
        imgUrls: [
            '../../images/swiper.png',
            '../../images/swiper.png',
            '../../images/swiper.png'
        ],
        commentImg: [
            '../../images/comment-img.png',
            '../../images/comment-img.png',
            '../../images/comment-img.png',
            '../../images/comment-img.png'
        ],
        youLike:[
            { img: '../../images/youlike.png', name: '拉菲尚品波尔多', price: "¥108.00" },
            { img: '../../images/youlike.png', name: '拉菲尚品波尔多', price: "¥108.00" },
            { img: '../../images/youlike.png', name: '拉菲尚品波尔多', price: "¥108.00" },
            { img: '../../images/youlike.png', name: '拉菲尚品波尔多', price: "¥108.00" },
            { img: '../../images/youlike.png', name: '拉菲尚品波尔多', price: "¥108.00" },
            { img: '../../images/youlike.png', name: '拉菲尚品波尔多', price: "¥108.00" }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // 获取商品闯过来的id,发送请求获取商品信息
        wx.request({
            url: '', 
            data: {goods_id: options.id},
            success: function (res) {
                that.setData({
                    goodsInfo:{}
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
     * 立即购买按钮
     */
    immediatePurchase: function(){
        // 获取商品id 数量

    },
    // 增加数量
    addCount(e) {
    let num = this.data.goods_num;
    num = num + 1;
    this.setData({
        goods_num: num
    });
    },
    // 减少数量
    minusCount(e) {
        let num = this.data.goods_num;
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        this.setData({
            goods_num: num
        });
    },


    /**
     * 添加到购物车按钮
     */
    addToCart: function (e) {
        // 获取id
        var id = e.currentTarget.dataset.id;
        // 调用 加入购物车 全局方法
        util.addToCartFun(id);
    }


})