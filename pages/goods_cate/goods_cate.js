// pages/goods_cate/goods_cate.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsGroup:[
            { id: 1, name: '品牌' },
            { id: 2, name: '颜色' },
            { id: 3, name: '类型' },
            { id: 4, name: '品种' },
            { id: 5, name: '国家' },
        ],
        current_id:1,
        goodsClass:[
            { group_id: 1, id: 1, name: '赤霞珠', class_img:'../../images/icon_collect_selected.png'},
            { group_id: 1, id: 1, name: '赤霞珠', class_img: '../../images/icon_collect_selected.png' },
            { group_id: 1, id: 1, name: '赤霞珠', class_img: '../../images/icon_collect_selected.png' },
            { group_id: 1, id: 1, name: '赤霞珠', class_img: '../../images/icon_collect_selected.png' },
            { group_id: 1, id: 1, name: '赤霞珠', class_img: '../../images/icon_collect_selected.png' }
        ]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        // wx.request({
        //     url: '',
        //     data: { goods_group: current_id},
        //     success: function (res) {
        //         that.setData({
                        // goodsClass:
        //         });
        //     }
        // });
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
     * 点击商品组获取类别
     */
    goods_group:function(e){
        var that = this;
        // 获取组id
        var id = e.currentTarget.dataset.id;
        that.setData({
            current_id:id
        });
        // 发送请求,获取类别
        // wx.request({
        //     url: '',
        //     data: { goods_group: current_id},
        //     success: function (res) {
        //         that.setData({
                         // goodsClass:
        //         });
        //     }
        // });

    }
























})