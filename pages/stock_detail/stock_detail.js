// pages/stock_detail/stock_detail.js
var repurchaseReason_index = 0;  // 回购原因的索引
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo: {
            id: 1,
            goods_name: '路易拉菲2009男爵古堡干红葡萄酒红酒礼盒木盒装750ml * 2',
            goods_img: [
                '../../images/swiper.png',
                '../../images/swiper.png',
                '../../images/swiper.png'
            ],
            goods_price: '119.00',
            member_price: '99.00',
            stock:155,
            selling:150
        },
        goods_num: 1, 
        imgUrls: [
            '../../images/swiper.png',
            '../../images/swiper.png',
            '../../images/swiper.png'
        ],
        commentImg:[
            '../../images/comment-img.png',
            '../../images/comment-img.png',
            '../../images/comment-img.png',
            '../../images/comment-img.png'
        ],
        repurchaseReason:[
            { key: 1, value: '回购原因1', checked: true },
            { key: 2, value: '回购原因2', checked: false },
            { key: 3, value: '回购原因3', checked: false },
            { key: 4, value: '回购原因4', checked: false },
            { key: 5, value: '回购原因5', checked: false }
        ],
        covering_layer_hidden:true,
        immediate_sale_hidden:true
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
     * 申请回购
     */
    application_for_repurchase:function(e){
       this.setData({
           covering_layer_hidden:false
       });
    },

    /**
     * 选择回购原因
     */
    radio_change: function (e) {
        // 获取回购原因的索引
        repurchaseReason_index = e.detail.value;
    },

    /**
     * 确认回购
     */
    confirmation_repurchase:function(e){
        // 获取商品id
        var id = e.currentTarget.dataset.id; 

        // 提交
        // wx.request({
        //     url: '',
        //     data: { goods_id: id, repurchaseReason_index:repurchaseReason_index },
        //     success: function (res) {
        //         that.setData({
        //             goodsInfo: {}
        //         });
        //     }
        // });
    },

    /**
     * 取消回购
     */
    cancel_repurchase:function(){
        this.setData({
            covering_layer_hidden: true
        });
    },

    /**
     * 自提按钮
     */
    self_extraction:function(){

    },

    /**
     * 立即出售按钮
     */
    immediate_sales:function(){
        this.setData({
            immediate_sale_hidden: false
        });
    },
    cancel_sale:function(){
        this.setData({
            immediate_sale_hidden: true
        });
    }

})