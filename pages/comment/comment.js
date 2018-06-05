// pages/comment/comment.js
var util = require('../../utils/util.js');
var uploadAliyun = require('../../weixinFileToaliyun/uploadAliyun.js');
Page({

    /**
     * 页面的初始数据
     */
    data: {
        goodsInfo:{
            id:1,
            img:'../../images/comment-img.png',
            name:'奔富洛神山庄设拉子赤霞珠红葡萄酒750ml进口红酒葡萄酒'
        },
        commentDetail: '',
        commentImg: '',
        src:[],
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
    // addImg:function(){
    //     var that = this;
    //     var myurl = '';
    //     var newsrc = that.data.src;
    //     util.myUploadFile(myurl, function(res){
    //         // console.log(res.data);
    //         newsrc.push(res.data);
    //         console.log(newsrc);
    //         that.setData({
    //             src: newsrc
    //         });
    //     });
    // },

    addImg:function(){
        let that = this;
        let newsrc = that.data.src;
        wx.chooseImage({
            count: 1, 
            sizeType: ['original', 'compressed'], 
            sourceType: ['album', 'camera'], 
            success: function (res) {
                // console.log(res);
                var tempFilePaths = res.tempFilePaths;
                var filePath = tempFilePaths[0];
                var fileW = '/images/';
                uploadAliyun(filePath, fileW, function (aliyunFileKey){
                    // console.log(aliyunFileKey);
                    newsrc.push('http://jiaoyuvideo.oss-cn-beijing.aliyuncs.com/' + aliyunFileKey);
                    console.log(newsrc);
                    that.setData({
                        src: newsrc
                    });
                }, function(){});
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
            userId: userId, 
            goodsId: this.data.goodsInfo.id,
            detail: detail,
            describes: describes,
            logistics: logistics,
            QoS: QoS,
            img: this.data.src.join(',')
        };
        util.myWxRequest(myurl, mydata, function(res){
            wx.showToast({
                icon: 'success',
                title: '评论成功'
            });
            setTimeout(function(){
                wx.navigateTo({
                    url: '',
                })
            },1500);
            
        });
    }
})