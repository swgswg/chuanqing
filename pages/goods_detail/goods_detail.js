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
        goods_price:0,  
        commentInfo:[],
        address : {},
        youLike:[],
        changePrice:false,
        serverUrl: app.globalData.aliyunServerURL  
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let goods_id = '';
        // 获取商品信息
        util.myWxRequest(app.globalData.getGoodsDetailUrl, { id: options.id }, function(res){
            console.log(res);
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
        // util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, { }, function (res) {
        //     that.setData({
        //         youLike: res.data.data
        //     });
        // });

        // 获取猜你喜欢 根据类别来获取商品 


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
        let that = this;
        let num = parseInt(this.data.goods_num);
        num = num + 1;
        this.setData({
            goods_num: num
        });
        // 经销商购买商品达到一定数量,单价优惠
        // if(that.){
        //     judgeGoodsNum(num, that);
        // }
        
    },
    // 减少数量
    minusCount: function(e) {
        let that = this;
        let num = parseInt(this.data.goods_num);
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        this.setData({
            goods_num: num
        });
        // 购买商品达到一定数量,单价优惠
        // judgeGoodsNum(num, that);
    },

    /**
     * 修改商品数量
     */
    inputNum: function (e) {
        let that = this;
        // if (e.detail.value == '') {
        //     that.setData({
        //         goods_num: 1
        //     });
        // } else {
            that.setData({
                goods_num: e.detail.value
            });
        // }
        let num = that.data.goods_num;
        // 购买商品达到一定数量,单价优惠
        // judgeGoodsNum(num, that);

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
                goods_num:1
            });
        }
        // 购买商品达到一定数量,单价优惠
        // judgeGoodsNum(num, that);
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
        mygoodsInfo.price = this.data.goods_price; // 商品价格
        mygoodsInfo.img = '../../images/hongjiu.png';  // 商品图片
        let addrId = this.data.address.id;  // 地址id
        let mysoldPrice = this.data.goods_price * mynum;  // 商品总价
        mygoodsInfo = [mygoodsInfo];
        app.globalData.buyGoods = { goodsInfo: mygoodsInfo, soldPrice: mysoldPrice, addressId: addrId};
        // console.log(app.globalData.buyGoods);
        wx.navigateTo({
            // url: '/pages/commit_order/commit_order?goodsId='+goodsId+'&num='+num+'&totalPrice='+totalPrice,
            url: '/pages/commit_order/commit_order'
        })
    }, 

})
function judgeGoodsNum(num, that) {
    console.log(num);
    let dealerTerm = that.data.goodsInfo.dealerTerm;
    let price = that.data.goodsInfo.price;
    let dealerPrice = that.data.goodsInfo.dealerPrice;

    if (num >= dealerTerm) {
        that.setData({
            changePrice: true,
            goods_price: dealerPrice
        });
    } else if (num < that.data.goodsInfo.dealerTerm) {
        that.setData({
            changePrice: false,
            goods_price: price
        });
    }
}