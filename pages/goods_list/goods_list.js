// pages/goods_list/goods_list.js
var util = require('../../utils/util.js');
Page({
    /**
     * 页面的初始数据
     */
    data: {
        height:0,
        goods:[
            { id: 1, name: '张裕干红', price: '139.00', img: '../../images/hongjiu.png' },
            { id: 2, name: '张裕干红', price: '239.00', img: '../../images/hongjiu.png' },
            { id: 3, name: '张裕干红', price: '339.00', img: '../../images/hongjiu.png' },
            { id: 4, name: '张裕干红', price: '439.00', img: '../../images/hongjiu.png' },
            { id: 5, name: '张裕干红', price: '539.00', img: '../../images/hongjiu.png' },
            { id: 6, name: '张裕干红', price: '639.00', img: '../../images/hongjiu.png' },
            { id: 7, name: '张裕干红', price: '739.00', img: '../../images/hongjiu.png' },            
            { id: 8, name: '张裕干红', price: '839.00', img: '../../images/hongjiu.png' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                console.log(res);
                that.setData({
                    height: res.windowHeight-38
                })
            },
        })
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
        // wx.request({
        //     url: 'test.php',
        //     method: 'GET',
        //     data: {},
        //     header: {
        //         'content-type': 'application/json' 
        //     },
        //     success: function (res) {
        //         this.setData({
        //             goods:res.data
        //         });
        //     }
        // });
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
    add_to_cart:function(e){
        // 获取id
        var id = e.currentTarget.dataset.id;
        // 调用 加入购物车 全局方法
        util.addToCart(id);
    }
    
    
















    
})