// pages/goods_detail/goods_detail.js
var util = require('../../utils/util.js');
const app = getApp();
var myuserId = app.globalData.userId;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:{},
        goods_num:1,  
        commentInfo:[],
        address : {},
        youLike:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let goods_id = '';
        // 获取商品信息
        util.myWxRequest(app.globalData.getGoodsDetailUrl, { id: options.id }, function(res){
            let goodsInfo = res.data.data;
            let commentInfo = goodsInfo.comment;
            for(let i = 0; i < commentInfo.length; i++){
                commentInfo[i].img = commentInfo[i].img.split(',');
            }
            that.setData({
                goodsInfo: goodsInfo,
                commentInfo: commentInfo
            });
        });
  
        // 获取猜你喜欢
        util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, { }, function (res) {
            that.setData({
                youLike: res.data.data
            });
        });

        if ( options.addrId ){
            // 换地址 getAddrByIdUrl
            util.myWxRequest(app.globalData.getAddrByIdUrl, { id: options.addrId }, function (res) {
                that.setData({
                    address: res.data.data
                });
            });
        } else {
            // 获取用户的默认地址
            util.myWxRequest(app.globalData.getAddrByDefaultUrl, { user_id: myuserId }, function (res) {
                that.setData({
                    address: res.data.data
                });
            });
        }
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
    addCount:function(e) {
        let num = parseInt(this.data.goods_num);
        num = num + 1;
        this.setData({
            goods_num: num
        });
    },
    // 减少数量
    minusCount: function(e) {
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
     * 猜你喜欢
     */
    clickToGoodsDetail:function(e){
        let that = this;
        let goodsId = e.currentTarget.dataset.id;
        // 获取点击商品详情
        util.myWxRequest(app.globalData.getGoodsDetailUrl, { id: goodsId }, function (res) {
            let goodsInfo = res.data.data;
            let commentInfo = goodsInfo.comment;
            for (let i = 0; i < commentInfo.length; i++) {
                commentInfo[i].img = commentInfo[i].img.split(',');
            }
            that.setData({
                goodsInfo: goodsInfo,
                commentInfo: commentInfo
            });
            wx.pageScrollTo({
                scrollTop: 0,
                duration: 100
            });
        });

    },

    /**
     * 添加到购物车
     */
    addToCart: function (e) {
        var that = this;
        let mygoodsId = e.currentTarget.dataset.id;
        let myuserId = app.globalData.userId;
        let mynum = that.data.goods_num;
        let mycartsPrice = that.data.goodsInfo.price * mynum;
        // 调用 加入购物车 全局方法
        // console.log(mygoodsId, myuserId, mynum, mycartsPrice);
        util.addToCartFun(mygoodsId, myuserId, mynum, mycartsPrice);
    },

    /**
     * 加入收藏
     */
    joinTheCollection:function(e){
        var that = this;
        let goodsId = that.data.goodsInfo.id;
        let id = e.currentTarget.dataset.goodsid;
        if(goodsId == id){
             util.myWxRequest(app.globalData.insertCollectionUrl, { identify: id, userId: app.globalData.userId, mytype: 1 }, function (res) {
                wx.showToast({
                    icon:'success',
                    title: '收藏成功'
                });
            });
        } else {
            wx.showToast({
                icon:'none',
                title: '网络错误'
            });
        }
    },

    /**
     * 查看全部评论
     */
    viewAllComment:function(){
        var that = this;
        wx:wx.navigateTo({
            url: '/pages/all_comment/all_comment?goodsId='+that.data.goodsInfo.id
        });
    },

    /**
    * 立即购买
    */
    immediatePurchase: function () {
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
        app.globalData.buyGoods = { goodsInfo: mygoodsInfo, soldPrice: mysoldPrice, addressId: addrId};
        // console.log(app.globalData.buyGoods);
        wx.navigateTo({
            // url: '/pages/commit_order/commit_order?goodsId='+goodsId+'&num='+num+'&totalPrice='+totalPrice,
            url: '/pages/commit_order/commit_order'
        })
    }

})