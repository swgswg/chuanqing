// pages/goods_cate/goods_cate.js
var input_value = '';
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
        goodsClass:[]
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.request({
            url: 'http://192.168.3.25:8080/redwine/goodsGroup/getGroup',
            data: {},
            method: 'POST',
            success: function (res) {
                // { groupId: 1, name: "法国", id: 1, classImg: "1.jpg" }
                that.setData({
                    goodsGroup: res.data.data
                });
            }
        });
        wx.request({
            url: 'http://192.168.3.25:8080/redwine/goodsClass/getGoodsClass',
            data: { groupId: 1 },
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method: 'POST',
            success: function (res) {
                that.setData({
                    goodsClass: res.data.data
                });
            }
        });
    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function () {
    
    },

    // 分类详情事件
    cateinfo: function(){
      wx.navigateTo({
        url: 'pages/goods_cate/goods_cate'
      })
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
     * 点击类别组获取类别
     */
    goodsGroup:function(e){
        var that = this;
        // 获取组id
        var id = e.currentTarget.dataset.id;
        that.setData({
            current_id:id
        });
        // 发送请求,获取类别
        wx.request({
            url: 'http://192.168.3.25:8080/redwine/goodsClass/getGoodsClass',
            data: {groupId:id},
            header: {
                'content-type': 'application/x-www-form-urlencoded'
            },
            method:'POST',
            success: function (res) {
                that.setData({
                    goodsClass:res.data.data
                });
            }
        });

    },

    /**
     * 搜索框失去焦点时
     */
    input_blur:function(e){        
        input_value = e.detail.value;
    },

    /**
     * 搜索商品
     */
    search_goods:function(){
        var input_val = input_value;
        my_search(input_val);
    },
    /**
     * 点击完成按钮时触发
     */
    input_confirm:function(e){
        // 获取输入的值
        var val = e.detail.value;
        // 搜索
        my_search(val);
    },

    /**
     * 点击类别跳转到商品
     */
    classToGoods: function (e) {
        var that = this;
        // 获取类别id
        var id = e.currentTarget.dataset.classid;
        var classname = e.currentTarget.dataset.classname;
        console.log(id,classname);
        wx.navigateTo({
            url: '../goods_list/goods_list?classid=' + id + '&classname=' + classname
        });
    }
    


});

/**
 * 搜索的方法
 */
function my_search(val) {
    console.log(val);
}


