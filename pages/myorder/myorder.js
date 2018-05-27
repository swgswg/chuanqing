// pages/myorder/myorder.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
        myorder:[
            {
                order_time:'2018-05-08', 
                // order_status: '卖家已发货',
                order_status: '2',
                order_goods:[
                    {
                        goods_img:'../../images/hongjiu.png',
                        goods_name:'奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒', 
                        goods_buyprice:'39.00',
                        goods_yuanjia:'39.00',
                        goods_guige: '750ml 6*1箱',
                        goods_number: '1'
                    },
                    {
                        goods_img: '../../images/hongjiu.png',
                        goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                        goods_buyprice: '39.00',
                        goods_yuanjia: '39.00',
                        goods_guige: '750ml 6*1箱',
                        goods_number: '1'
                    }
                ],
                order_total:'78.00',
                order_expressage: '0.00'
            },
            {
                order_time: '2018-05-08',
                // order_status: '卖家未发货',
                order_status: '1',
                order_goods: [
                    {
                        goods_img: '../../images/hongjiu.png',
                        goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                        goods_buyprice: '39.00',
                        goods_yuanjia: '39.00',
                        goods_guige: '750ml 6*1箱',
                        goods_number: '1'
                    },
                    {
                        goods_img: '../../images/hongjiu.png',
                        goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                        goods_buyprice: '39.00',
                        goods_yuanjia: '39.00',
                        goods_guige: '750ml 6*1箱',
                        goods_number: '1'
                    }
                ],
                order_total:'78.00',
                order_expressage: '0.00'
            },
            {
                order_time: '2018-05-08',
                // order_status: '交易成功',
                order_status: '3',
                order_goods: [
                    {
                        goods_img: '../../images/hongjiu.png',
                        goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                        goods_buyprice: '39.00',
                        goods_yuanjia: '39.00',
                        goods_guige: '750ml 6*1箱',
                        goods_number: '1'
                    },
                    {
                        goods_img: '../../images/hongjiu.png',
                        goods_name: '奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红葡萄酒',
                        goods_buyprice: '39.00',
                        goods_yuanjia: '39.00',
                        goods_guige: '750ml 6*1箱',
                        goods_number: '1'
                    }
                ],
                order_total:'78.00',
                order_expressage:'0.00'
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
  
  }
})