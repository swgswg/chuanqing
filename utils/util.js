const formatTime = date => {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()
  const hour = date.getHours()
  const minute = date.getMinutes()
  const second = date.getSeconds()

  return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
}

const formatNumber = n => {
  n = n.toString()
  return n[1] ? n : '0' + n
}

/*获取当前页url*/
function getCurrentPageUrl() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    return url
}

/*获取当前页带参数的url*/
function getCurrentPageUrlWithArgs() {
    var pages = getCurrentPages() //获取加载的页面
    var currentPage = pages[pages.length - 1] //获取当前页面的对象
    var url = currentPage.route //当前页面url
    var options = currentPage.options //如果要获取url中所带的参数可以查看options

    //拼接url的参数
    var urlWithArgs = url + '?'
    for (var key in options) {
        var value = options[key]
        urlWithArgs += key + '=' + value + '&'
    }
    urlWithArgs = urlWithArgs.substring(0, urlWithArgs.length - 1)

    return urlWithArgs
}

/*获取上一页url*/
function getPrevPageUrl() {
    var pages = getCurrentPages() //获取加载的页面
    var prevPage = pages[pages.length - 2] //获取上一级页面的对象
    var url = prevPage.route //上一个页面url
    return url
}

// function getPrevPage() {
//     //获取加载的页面
//     var pages = getCurrentPages();
//     //获取上一级页面的对象
//     var porevPage = pages[pages.length - 2];
//     if (porevPage) {
//         // //获取上一级页面的url
//         var url = prevPage.route;
//         if (url == 'pages/cart/cart') {
//             this.setData({
//                 btnText: '提交订单'
//             });
//         }
//     }
// }


/**
 * 加入购物车
 * @param id 商品id
 * @param price 商品价格
 * @param price 商品数量
 */
function addToCartFun(id,price,num){
    // console.log(id,price,num);
    wx.request({
        url: getApp().globalData.baseUrl +'redwine/carts/insertCarts',
        method:'POST',
        data: { goodsId: id, cartsPrice:price, num:num },
        success: function(res){
            if(res.status == 1){
                wx.showToast({
                    title: res.msg,
                    icon: 'succes',
                    duration: 1000,
                    mask: true
                });
            } else {
                wx.showToast({
                    title: '重新加入购物车',
                    image:'../../images/fail3.png',
                    duration: 1000,
                    mask: true
                });
            }
        }
    });
}


/**
 * wx.request二次封装
 */
function myWxRequest(myurl,mydata,mysufun){
    wx.request({
        url: myurl,
        method: 'POST',
        data: mydata,
        header: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        success: function (res) {
           if(res.status == 1){
               mysufun(res);
           } else {
               wx.showToast({
                   icon:'none',
                   title: '您的网络太差'
               });
           }
        }
    });
}

/**
 * 格式化时间戳 
 */
function formatDate(time, format = 'YY-MM-DD hh:mm:ss') {
    var date = new Date(time);

    var year = date.getFullYear(),
        month = date.getMonth() + 1,//月份是从0开始的
        day = date.getDate(),
        hour = date.getHours(),
        min = date.getMinutes(),
        sec = date.getSeconds();
    var preArr = Array.apply(null, Array(10)).map(function (elem, index) {
        return '0' + index;
    });////开个长度为10的数组 格式为 00 01 02 03

    var newTime = format.replace(/YY/g, year)
        .replace(/MM/g, preArr[month] || month)
        .replace(/DD/g, preArr[day] || day)
        .replace(/hh/g, preArr[hour] || hour)
        .replace(/mm/g, preArr[min] || min)
        .replace(/ss/g, preArr[sec] || sec);

    return newTime;
    // console.log(formatDate(1527253460000));//2017-05-12 10:05:44
    // console.log(formatDate(1527253460000, 'YY年MM月DD日'));//2017年05月12日
    // console.log(formatDate(1527253460000, '今天是YY/MM/DD hh:mm:ss'));//今天是2017/05/12 10:07:45
}

/**
 * 上传文件
 */
function myUploadFile(myurl, sufun){
    wx.chooseImage({
        success: function (res) {
            var tempFilePaths = res.tempFilePaths
            const uploadTask = wx.uploadFile({
                url: myurl, 
                filePath: tempFilePaths[0],
                name: 'file',
                formData: {
                    'user': 'test'
                },
                success: function (res) {
                    if(res.status == 1){
                        sufun(res);
                    } else {
                        wx.showToast({
                            icon: 'none',
                            title: '上传失败'
                        });
                    }
                    
                }
            });
            // uploadTask.onProgressUpdate((res) => {
            //     console.log('上传进度', res.progress)
            //     console.log('已经上传的数据长度', res.totalBytesSent)
            //     console.log('预期需要上传的数据总长度', res.totalBytesExpectedToSend)
            // })
            // uploadTask.abort() // 取消上传任务
        }
    })
}


module.exports = {
    formatTime: formatTime,
    getCurrentPageUrl: getCurrentPageUrl,
    getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
    getPrevPageUrl: getPrevPageUrl,
    addToCartFun: addToCartFun,
    myWxRequest: myWxRequest,
    formatDate: formatDate,
    myUploadFile: myUploadFile
}
