// pages/goods_detail/goods_detail.js
var util = require('../../utils/util.js');
const app = getApp();
var myuserId = app.globalData.userId;
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:{
            // id:1,
            // gname: '路易拉菲2009男爵古堡干红葡萄酒红酒礼盒木盒装750ml * 2',
            // picture: [
            //     '../../images/swiper.png',
            //     '../../images/swiper.png',
            //     '../../images/swiper.png'
            // ],
            // price:'119.00',
            // member_price:'99.00'
        },
        goods_num:1,  
        commentInfo:[
            // {
            //     img:'../../images/swiper.png,../../images/swiper.png,../../images/swiper.png',
            //     detail:
            //     userName:
            //     total:
            // }
        ],
        
        address : {},
        youLike:[
            // { img: '../../images/youlike.png', gname: '拉菲尚品波尔多', price: "¥108.00" },
            // { img: '../../images/youlike.png', gname: '拉菲尚品波尔多', price: "¥108.00" },
            // { img: '../../images/youlike.png', gname: '拉菲尚品波尔多', price: "¥108.00" },
            // { img: '../../images/youlike.png', gname: '拉菲尚品波尔多', price: "¥108.00" },
            // { img: '../../images/youlike.png', gname: '拉菲尚品波尔多', price: "¥108.00" },
            // { img: '../../images/youlike.png', gname: '拉菲尚品波尔多', price: "¥108.00" }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options.id);
        var that = this;
        // 获取商品信息
        util.myWxRequest(app.globalData.getGoodsDetailUrl, { id: options.id }, function(res){
            // console.log(res.data);
            that.setData({
                goodsInfo:res.data.data,
                commentInfo: res.data.data.comment
            });
        });

        // 获取商品关联的评论
        // util.myWxRequest(app.globalData.QueryCommentUrl, { goodsId: options.id, page: 1, pageSize: 2 }, function (res) {
        //     // console.log(res.data);
        //     that.setData({
        //         commentInfo: res.data.data
        //     });
        // });
  
        // 获取猜你喜欢
        util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, { id: options.id }, function (res) {
            that.setData({
                youLike: res.data.data
            });
        });

        // 获取用户的默认地址
        util.myWxRequest(app.globalData.getAddrByDefaultUrl, { user_id: myuserId }, function (res) {
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
            url: '/page/all_comment/all_comment?goodsId='+that.data.goodsIngo.id
        });
    },

    /**
    * 立即购买
    */
    immediatePurchase: function () {
        let mynum = this.data.goods_num;
        let mygoodsInfo = {};
        mygoodsInfo.goodsId = this.data.goodsInfo.id;  // 商品id
        mygoodsInfo.goodsName = this.data.goodsInfo.gname;  // 商品名称
        mygoodsInfo.num = mynum; // 商品数量
        mygoodsInfo.price = this.data.goodsInfo.price; // 商品价格
        mygoodsInfo.goodsImg = '../../images/hongjiu.png';  // 商品图片
        let mysoldPrice = this.data.goodsInfo.price * mynum;  // 商品总价
        mygoodsInfo = [mygoodsInfo];
        app.globalData.buyGoods = { goodsInfo: mygoodsInfo, soldPrice: mysoldPrice};
        // console.log(app.globalData.buyGoods);
        wx.navigateTo({
            // url: '/pages/commit_order/commit_order?goodsId='+goodsId+'&num='+num+'&totalPrice='+totalPrice,
            url: '/pages/commit_order/commit_order'
        })
    }

})