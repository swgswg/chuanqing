var env = require('../../weixinFileToaliyun/env.js');
var uploadAliyun = require('../../weixinFileToaliyun/uploadAliyun.js');
var util = require('../../utils/util.js');
const app = getApp();
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:{
            id:1,
            img:'../../images/comment-img.png',
            gname:'奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红酒葡萄酒'
        },
        commentDetail: '',
        commentImg: '',
        src:[],
    },  

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let that = this;
        let goodsInfo = { id: options.goodsId, gname: options.goodsName, img: options.goodsImg};
        that.setData({
            goodsInfo: goodsInfo
        });
        // 根据商品id,获取商品详情
        // myWxRequest(app.globalData.getGoodsDetailUrl, { id: options.goodsId }, function(res){
        //     that.setData({
        //         goodsInfo:res.data.data
        //     });
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
     * 获取评论
     */
    bindTextAreaBlur:function(e){
        this.setData({
            commentDetail:e.detail.value
        });
    },

    /**
     * 添加图片
     */
    addImg:function(){
        let that = this;
        let newsrc = that.data.src;
        wx.chooseImage({
            count: 1, 
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function (res) {
                let tempFilePaths = res.tempFilePaths; 
                // 临时文件路径
                let filePath = tempFilePaths[0]; 
                let ext = filePath.slice(filePath.lastIndexOf('.'));
                let extArr = ['png', 'jpg', 'jpeg', 'gif'];
                if (extArr.indexOf(ext) != -1) {
                    // 上传文件
                    uploadAliyun(filePath, function (aliyunFileKey) {
                        newsrc.push(env.aliyunServerURL + aliyunFileKey);
                        that.setData({
                            src: newsrc
                        });
                    }, function () { });
                } else {
                    wx.showToast({
                        title: '图片格式不正确',
                        icon: 'none'
                    })
                }
            }   
        })   
    },


    /**
     * 删除图片
     */
    cancleImg:function(e){
        var index = e.currentTarget.dataset.src;
        var src = this.data.src;
        src.splice(index,1);
        console.log(src)
        this.setData({
            src: src
        });
    },

    /**
     * 发表评论
     */
    publishComment: function(e){
        var commentDetail = this.data.commentDetail;
        var myurl = getApp().globalData.InsertCommentUrl;
        var mydata = { 
            userId: userId,  // 用户id
            goodsId: this.data.goodsInfo.id, // 商品id 
            detail: this.data.commentDetail, // 评论内容
            describes: '',  // 描述相符
            logistics: '',  // 物流服务
            QoS: '',  // 服务态度
            img: this.data.src.join(',')
        };
        util.myWxRequest(myurl, mydata, function(res){
            wx.showToast({
                icon: 'success',
                title: '评论成功'
            });
            setTimeout(function(){
                wx.navigateTo({
                    url: '/pages/myorder/myorder',
                })
            },1500);
            
        });
    }
})