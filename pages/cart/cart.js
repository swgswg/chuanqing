// pages/cart/cart.js
const util = require('../../utils/util.js');
const template = require('../../template/template.js');
const app = getApp();
var flag = true;
var mypageSize = 10;
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
        carts: {},               // 购物车列表
        hasList: false,          // 列表是否有数据
        totalPrice: 0.00,        // 总价，初始为0
        selectAllStatus: false,  // 全选状态  
        editStatus: true,        // 编辑按钮
        editText:'编辑',          // 编辑还是完成
        youLike:null,
        youlike_hidden: false,
        serverUrl: app.globalData.aliyunServerURL  
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        template.tabbar("tabBar", 2, this, app.globalData.vipLevel); //0表示第一个tabbar
        var that = this;
        // 显示购物车
        util.myWxRequest(app.globalData.getCartsUrl, { page: 1, pageSize: mypageSize, userId: app.globalData.userId }, function (res) {
            //0：{ cartsPrice: 4999,cid:14, gid: 2,goodsDetail:"好喝的红酒", img:'',name: "王朝干红", price: 4999, num: 1, specification:"750ml*6", status:0 }
            let mycarts = res.data.data;
            // console.log(mycarts);
            let len = mycarts.lenght;
            if (len == 0) {
                that.setData({
                    hasList: false,
                });
            } else {
                for (let i = 0; i < len; i++) {
                    mycarts[i].selected = false;
                }
                that.setData({
                    hasList: true,
                    carts: mycarts
                });
            }
        });

        // 猜你喜欢
        wx.getStorage({
            key: app.globalData.userId,
            success: function (res) {
                let stroge = util.mostValue(res.data); // 获取用户搜索次数最多的商品名称
                if(stroge == '' || stroge == []){
                    // 如果没有缓存就按销量来
                    util.myWxRequest(app.globalData.getGoodsBySaleCountUrl, {}, function (res) {
                        that.setData({
                            youLike: res.data.data
                        });
                    });
                } else {
                    // 根据用户搜索次数最多的商品来
                    util.myWxRequest(app.globalData.getGoodsByConditionUrl, { name: stroge, page: 1, pageSize: 4 }, function (res) {
                        that.setData({
                            youLike: res.data.data.pageInfo.list
                        });
                    });
                }
                
                
            }
        })
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
     * 去逛逛
     */
    goShopping:function(){
        wx.switchTab({
            url: '/pages/trader/index/index'
        })
    },
    /**
     * 点击显示更多
     */
    showMore:function(){
        let that = this;
        mypageSize += 10;
        util.myWxRequest(app.globalData.getCartsUrl, { page: 1, pageSize: mypageSize, userId: app.globalData.userId }, function (res) {
            let carts = res.data.data;
            if (carts.length == 0) {
                that.setData({
                    hasList: false,
                });
            } else {
                that.setData({
                    hasList: true,
                    carts: carts
                });
            }
        });
    },

    /**
     * 计算总价
     */
    getTotalPrice:function(){
         // 获取购物车列表
        let carts = this.data.carts;                 
        let total = 0;
        // 循环列表得到每个数据
        for (let i = 0; i < carts.length; i++) {         
            if (carts[i].selected) { 
                // 判断选中才会计算价格
                total += parseInt(carts[i].num) * carts[i].price;     // 所有价格加起来
                // total += carts[i].cartsPrice;
            }
        }
        // 最后赋值到data中渲染到页面
        this.setData({                               
            carts: carts,
            totalPrice: total
        });
    },

    /**
     * 选择商品
     */
    selectList:function(e) {
        // 获取data- 传进来的index
        var index = e.currentTarget.dataset.index;  
        // console.log(index);  
        // 获取购物车列表
        var carts = this.data.carts;                    
         // 获取当前商品的选中状态
        var selected = carts[index].selected; 
        // 改变状态       
        carts[index].selected = !selected;   
        this.setData({
            carts: carts
        });
        // 重新获取总价
        this.getTotalPrice();                             
    },

    /**
     * 全选
     */
    selectAll:function(e) {
        // 是否全选状态
        let selectAllStatus = this.data.selectAllStatus;    
        selectAllStatus = !selectAllStatus;
        let carts = this.data.carts;
        for (let i = 0; i < carts.length; i++) {
            // 改变所有商品状态
            carts[i].selected = selectAllStatus;            
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
         // 重新获取总价
        this.getTotalPrice();                              
    },
    
    
    /**
     * 增加数量
     */
    addCount:function(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = parseInt(carts[index].num);
        num = num + 1;
        // 最大数量不能大于库存
        carts[index].num = num;
        // 修改购物车商品数量
        let cartsPrice = carts[index].price * num;
        // 同步修改数据库
        util.myWxRequest(app.globalData.updateCartsUrl, { id: carts[index].cid, cartsPrice: cartsPrice, num: num}, function(res){

        });
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },
    
    /**
     * 减少数量
     */
    minusCount:function(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = parseInt(carts[index].num);
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        carts[index].num = num;
        let cartsPrice = carts[index].price * num;
        // 同步修改数据库
        util.myWxRequest(app.globalData.updateCartsUrl, { id: carts[index].cid, cartsPrice: cartsPrice, num: num}, function(res){

        });
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    /**
     * 修改商品数量
     */
    inputNum:function(e){
        if (e.detail.value == ''){
            const index = e.currentTarget.dataset.index;
            let carts = this.data.carts;
            carts[index].num = 1;
            this.setData({
                carts: carts
            });
            this.getTotalPrice();
        }
    },

    blurNum:function(e){
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = parseInt(e.detail.value);
        carts[index].num = num;
        let cartsPrice = carts[index].price * num;
        util.myWxRequest(app.globalData.updateCartsUrl, { id: carts[index].cid, cartsPrice: cartsPrice, num: num},function(res){
           
        });
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },
    
    /**
     * 编辑按钮
     */
    cartEdit: function(){
        if (flag) {
            var editText = '完成';
            this.setData({
                youlike_hidden:true
            });
            flag = false;
        } else {
            var editText = '编辑';
            this.setData({
                youlike_hidden: false
            });
            flag = true;
        }
        this.setData({
            editStatus: !this.data.editStatus,
            editText: editText
        });
        this.cleanSelectAll();
    },

    /**
     * 清除所有选中
     */
    cleanSelectAll:function() {
        // 是否全选状态
        let selectAllStatus = this.data.selectAllStatus;
        selectAllStatus = false;
        let carts = this.data.carts;
        for (let i = 0; i < carts.length; i++) {
            // 改变所有商品状态
            carts[i].selected = selectAllStatus;
        }
        this.setData({
            selectAllStatus: selectAllStatus,
            carts: carts
        });
        // 重新获取总价
        this.getTotalPrice();
    },

    /**
     * 删除商品
     */
    deleteList: function() {
        let carts = this.data.carts;
        let mycid = [];
        for (let i = carts.length - 1; i >= 0; i--) {
            if (carts[i].selected) {
                // 判断选中才会执行删除
                mycid.push( carts[i].cid);
                carts.splice(i, 1);
            }
        } 
        // 同步删除数据库
        util.myWxRequest(app.globalData.deleteCartsUrl, { id: mycid  }, function (res) {
            wx.showToast({
                icon:'success',
                title: '删除成功'
            });
        })    
        this.setData({
            carts: carts
        });
        // 如果购物车为空
        if (!carts.length) {
            // 修改标识为false，显示购物车为空页面
            this.setData({
                hasList: false              
            });
        } else {  
            // 如果不为空 重新计算总价格
            this.getTotalPrice();           
        }
    },

    /**
     * 移入收藏
     */
    addCollection:function(){
        let carts = this.data.carts;
        let len = carts.length;
        let mycollection = [];
        for (var i = len - 1; i >= 0; i--) {
            if (carts[i].selected) {
                mycollection.push(carts[i].gid);
                carts.splice(i, 1);
            }
        }
        util.myWxRequest(app.globalData.insertCollectionUrl, { identify: mycollection , userId: app.globalData.userId, mytype:1}, function(res){
            wx.showToast({
                icon:'success',
                title: '收藏成功'
            });
        });
        this.setData({
            carts: carts
        });
        // 如果购物车为空
        if (!carts.length) {
            // 修改标识为false，显示购物车为空页面
            this.setData({
                hasList: false
            });
        } else {
            // 如果不为空 重新计算总价格
            this.getTotalPrice();
        }
    },

    /**
     * 结算
     */
    settleAccounts:function(){
        let that = this;
        let carts = that.data.carts;
        let len = carts.length - 1;
        let buy_goods = [];
        let mycid = [];
        let j = 0;
        for (var i = len; i >= 0; i--) {
            if (carts[i].selected) {
                buy_goods[j] = carts[i];
                j++;
                mycid.push(carts[i].cid);
                carts.splice(i, 1);
            }
        }
        // 同步删除购物车数据库
        // util.myWxRequest(app.globalData.deleteCartsUrl, { id: mycid }, function(res){});
        this.setData({
            carts: carts
        });
        if (that.data.totalPrice > 0){
            let totalPrice = that.data.totalPrice;
            app.globalData.buyGoods = { goodsInfo: buy_goods, soldPrice: totalPrice, transportation_expenses: '0.00', receipt: '', msg:''};
            wx: wx.navigateTo({
                url: '/pages/commit_order/commit_order'
            })
        } else {
            wx.showToast({
                icon:'none',
                title: '请选择商品'
            });
        }
    }


})