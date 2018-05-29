// pages/goods_list/goods_list.js
var util = require('../../utils/util.js');
var multiple_flag = true;
var sales_volume_flag = true;
var new_product_flag = true;
var my_price_flag = true;
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
        ],
        mysort:{
            ping:'../../images/ping.png',
            shang:'../../images/shang.png',
            xia:'../../images/xia.png'
        },
        zonghe_png:'../../images/ping.png',
        xiaoliang_png:'../../images/ping.png',
        xinpin_png:'../../images/ping.png',
        jiage_png:'../../images/ping.png'
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        var that = this;
        wx.getSystemInfo({
            success: function(res) {
                // console.log(res);
                that.setData({
                    height: res.windowHeight-38
                })
            },
        });
        
        /**
         * 动态设置页面标题
         */
        // if (options){
        //     wx.setNavigationBarTitle({
        //         title: options.goods_class_name
        //     });
        // }
    

        // 通过类别id获取商品
        // wx.request({
        //     url: '',
        //     data: { goods_class_id: options.id },
        //     success: function (res) {
        //         that.setData({
        //             goods: {}
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
    },

    /**
     * 综合排序
     */
    multiple:function(){
        var that = this;
        if (multiple_flag){
            that.setData({
                zonghe_png:'../../images/xia.png'
            });
            multiple_flag = false;
        } else {
            that.setData({
                zonghe_png: '../../images/shang.png'
            });
            multiple_flag = true;
        }
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
     * 销量排序
     */
    sales_volume:function(){
        var that = this;
        if (sales_volume_flag) {
            that.setData({
                xiaoliang_png: '../../images/xia.png'
            });
            sales_volume_flag = false;
        } else {
            that.setData({
                xiaoliang_png: '../../images/shang.png'
            });
            sales_volume_flag = true;
        }
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
     * 新品排序
     */
    new_product:function(){
        var that = this;
        if (new_product_flag) {
            that.setData({
                xinpin_png: '../../images/xia.png'
            });
            new_product_flag = false;
        } else {
            that.setData({
                xinpin_png: '../../images/shang.png'
            });
            new_product_flag = true;
        }
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
     * 价格排序
     */
    my_price:function(){
        var that = this;
        if (my_price_flag) {
            that.setData({
                jiage_png: '../../images/xia.png'
            });
            my_price_flag = false;
        } else {
            that.setData({
                jiage_png: '../../images/shang.png'
            });
            my_price_flag = true;
        }
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
    }













    
});
// function click_sort(a,mythis){
//     if (a + '_flag') {
//         mythis.setData({
//             zonghe_png: '../../images/xia.png'
//         });
//         (a + '_flag') = false;
//     } else {
//         mythis.setData({
//             zonghe_png: '../../images/shang.png'
//         });
//         (a + '_flag') = true;
//     }
// }