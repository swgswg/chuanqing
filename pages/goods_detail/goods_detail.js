// pages/goods_detail/goods_detail.js
var util = require('../../utils/util.js');
const app = getApp();
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
        // console.log(options.id);
        var that = this;
        // 获取商品信息
        wx.request({
            url: app.globalData.getGoodsDetailUrl,
            method:'POST', 
            data: { id: options.id },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                // console.log(res);
                that.setData({
                    goodsInfo:res.data.data
                });
            }
        });
        // 获取商品关联的评论
        wx.request({
            url: app.globalData.QueryCommentUrl,
            method: 'POST',
            data: { goodsId: options.id, page:1, pageSize:2 },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                // res.data.data.list.img = res.data.data.list.img.split(',')
                that.setData({
                    // goodsInfo:res.data.data
                });
            }
        });
        // 获取猜你喜欢
        wx.request({
            url: app.globalData.getGoodsBySaleCountUrl,
            method: 'POST',
            data: { id: options.id },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                that.setData({
                    youLike:res.data.data
                });
            }
        });
        // 获取用户的默认地址
        wx.request({
            url: app.globalData.getAddrByDefaultUrl,
            method: 'POST',
            data: { user_id: userId },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
                console.log(res.data)
                if(res.data.status == 1){
                    that.setData({
                        address: res.data.data
                    });
                } else {
                    wx.showToast({
                        title: res.data.message,
                        icon: 'none',
                        mask:true
                    })
                } 
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

    // 增加数量
    addCount:function(e) {
        let num = this.data.goods_num;
        num = num + 1;
        this.setData({
            goods_num: num
        });
    },
    // 减少数量
    minusCount: function(e) {
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
        var id = e.currentTarget.dataset.id;
        var num = this.data.goods_num;
        var totalPrice = num * (this.data.goodsInfo.price);
        // console.log(id,num,totalPrice);
        // 调用 加入购物车 全局方法
        util.addToCartFun(id,totalPrice,num);
    },

    /**
     * 加入收藏
     */
    joinTheCollection:function(e){
        var id = e.currentTarget.dataset.goodsId;
        wx.request({
            url: app.globalData.insertCollectionUrl,
            method: 'POST',
            // data: { goodsId: id ,userId:, myType:1},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            success: function (res) {
               
            }
        });
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
        var goodsId = this.data.goodsInfo.id;
        var num = this.data.goods_num;
        var totalPrice = this.data.goodsInfo.price*num;
        wx: wx.navigateTo({
            // url: '/pages/commit_order/commit_order?goodsId='+goodsId+'&num='+num+'&totalPrice='+totalPrice,
            url: '/pages/commit_order/commit_order'
        })
    }

})