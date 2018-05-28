// pages/cart/cart.js
var flag = true;
Page({

    
    /**
     * 页面的初始数据
     */
    data: {
        carts: [],               // 购物车列表
        hasList: false,          // 列表是否有数据
        totalPrice: 0.00,        // 总价，初始为0
        selectAllStatus: false,  // 全选状态  
        editStatus: true,        // 编辑按钮
        editText:'编辑'           // 编辑还是完成
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
        this.setData({
            hasList: true,
            carts: [
                { id:1, goods_name: '路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2', goods_img: '../../images/hongjiu.png', num: 1, goods_price: 39.00, selected: false },
                { id: 2, goods_name: '路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2', goods_img: '../../images/hongjiu.png', num: 2, goods_price: 139.00, selected: false },
                { id: 3, goods_name: '路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2', goods_img: '../../images/hongjiu.png', num: 1, goods_price: 39.00, selected: false },
                { id: 4, goods_name: '路易拉菲2009男爵古堡干红葡萄酒礼盒木盒装750ml*2', goods_img: '../../images/hongjiu.png', num: 1, goods_price: 39.00, selected: false }
            ]
        })
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
     * 计算总价
     */
    getTotalPrice(){
         // 获取购物车列表
        let carts = this.data.carts;                 
        let total = 0;
        // 循环列表得到每个数据
        for (let i = 0; i < carts.length; i++) {         
            if (carts[i].selected) { 
                // 判断选中才会计算价格
                total += carts[i].num * carts[i].goods_price;     // 所有价格加起来
            }
        }
        // 最后赋值到data中渲染到页面
        this.setData({                               
            carts: carts,
            totalPrice: total.toFixed(2)
        });
    },

    /**
     * 选择商品
     */
    selectList(e) {
        // 获取data- 传进来的index
        const index = e.currentTarget.dataset.index;    
        // 获取购物车列表
        let carts = this.data.carts;                    
         // 获取当前商品的选中状态
        const selected = carts[index].selected; 
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
    selectAll(e) {
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
    // 增加数量
    addCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        num = num + 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },
    // 减少数量
    minusCount(e) {
        const index = e.currentTarget.dataset.index;
        let carts = this.data.carts;
        let num = carts[index].num;
        if (num <= 1) {
            return false;
        }
        num = num - 1;
        carts[index].num = num;
        this.setData({
            carts: carts
        });
        this.getTotalPrice();
    },

    // 编辑按钮
    cartEdit: function(){
        if (flag) {
            var editText = '完成';
            flag = false;
        } else {
            var editText = '编辑';
            flag = true;
        }
        this.setData({
            editStatus: !this.data.editStatus,
            editText: editText
            
        });
        this.cleanSelectAll();
    },

    // 清除所有选中
    cleanSelectAll() {
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

    // 删除商品按钮
    deleteList: function() {
        let carts = this.data.carts;
        for (let i = carts.length -1; i >= 0; i--) {
            if (carts[i].selected) {
                // 判断选中才会执行删除
                carts.splice(i, 1);
            }
        }        
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
    }
})