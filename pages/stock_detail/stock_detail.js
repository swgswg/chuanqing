const utils = require('../../utils/util.js');
const app = getApp();
var repurchaseReason_index = 0;  // 回购原因的索引
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo: {},
        goods_num: 1, 
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
        // 获取商品id
        let gid = options.gid;
        // 获取商品详情
        let that = this;
        // 获取商品信息
        utils.myWxRequest(app.globalData.getGoodsDetailByStockUrl, { id: gid, userId:app.globalData.userId }, function (res) {
            // console.log(res);
            let goodsInfo = res.data.data;
            console.log(goodsInfo);
            let commentInfo = goodsInfo.comment;
            for (let i = 0; i < commentInfo.length; i++) {
                commentInfo[i].img = commentInfo[i].img.split(',');
            }
            that.setData({
                goodsInfo: goodsInfo,
                commentInfo: commentInfo
            });
        });

        // 获取默认地址
        utils.myWxRequest(app.globalData.getAddrByDefaultUrl, { user_id: app.globalData.userId }, function (res) {
            that.setData({
                address: res.data.data
            });
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
    // // 增加数量
    // addCount(e) {
    //     let num = this.data.goods_num;
    //     num = num + 1;
    //     this.setData({
    //         goods_num: num
    //     });
    // },
    // // 减少数量
    // minusCount(e) {
    //     let num = this.data.goods_num;
    //     if (num <= 1) {
    //         return false;
    //     }
    //     num = num - 1;
    //     this.setData({
    //         goods_num: num
    //     });
    // },

    // 增加数量
    addCount: function (e) {
        let num = parseInt(this.data.goods_num);
        num = num + 1;
        this.setData({
            goods_num: num
        });
    },
    // 减少数量
    minusCount: function (e) {
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
        var that = this;
        // console.log(e.detail.value);
        if (e.detail.value == '') {
            that.setData({
                goods_num: 1
            });
        } else {
            that.setData({
                goods_num: e.detail.value
            });
        }
    },
    blurNum: function (e) {
        // console.log(e.detail.value);
        var that = this;
        that.setData({
            goods_num: e.detail.value
        });
    },

    /**
    * 查看全部评论
    */
    viewAllComment: function () {
        var that = this;
        wx: wx.navigateTo({
            url: '/pages/all_comment/all_comment?goodsId=' + that.data.goodsInfo.id
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
        let mynum = this.data.goods_num;
        let mygoodsInfo = {};
        mygoodsInfo.gid = this.data.goodsInfo.id;  // 商品id
        mygoodsInfo.name = this.data.goodsInfo.gname;  // 商品名称
        mygoodsInfo.num = mynum; // 商品数量
        mygoodsInfo.price = this.data.goodsInfo.price; // 商品价格
        mygoodsInfo.img = '../../images/hongjiu.png';  // 商品图片
        let addrId = this.data.address.id;
        let mysoldPrice = this.data.goodsInfo.price * mynum;  // 商品总价
        mygoodsInfo = [mygoodsInfo];
        app.globalData.buyGoods = { goodsInfo: mygoodsInfo, soldPrice: mysoldPrice, addressId: addrId };
        // console.log(app.globalData.buyGoods);
        wx.navigateTo({
            // url: '/pages/commit_order/commit_order?goodsId='+goodsId+'&num='+num+'&totalPrice='+totalPrice,
            url: '/pages/self_extraction/self_extraction'
        })
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