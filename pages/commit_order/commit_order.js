// pages/commit_order/commit_order.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      btnText:'确认自提',
    commit_order:[
        {
            consignee: ' Miss-蹊',
            consignee_tel: '13112343131',
            consignee_addr: '北京市西城区明月小区',
            goods_total:'432.00',
            goods_info:[
                {
                    goods_img:'../../images/hongjiu.png',
                    goods_name:'路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2',
                    goods_price:'36.00',
                    goods_number:12
                },
                {
                    goods_img: '../../images/hongjiu.png',
                    goods_name: '路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2',
                    goods_price: '36.00',
                    goods_number: 12
                }
            ]
        }
        
    ]
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
    //获取上一级页面
    var pages = getCurrentPages(); //获取加载的页面
    var porevPage = pages[pages.length - 2]; //获取上一级页面的对象
    if (porevPage){
        var url = prevPage.route;
        if (url == 'pages/cart/cart') {
            this.setData({
                btnText: '提交订单'
            });
        }
    }
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



})