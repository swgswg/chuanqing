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
    var prevPage = pages[pages.length - 2] //获取当前页面的对象
    var url = prevPage.route //上一个页面url
    return url
}

/**
 * 加入购物车
 */
function addToCart(id){
    // 获取商品的id
    // var id = e.currentTarget.dataset.id;
    // 调用接口
    wx.request({
        url: '',
        method:'POST',
        data:{id:id},
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

module.exports = {
  formatTime: formatTime,
  getCurrentPageUrl: getCurrentPageUrl,
  getCurrentPageUrlWithArgs: getCurrentPageUrlWithArgs,
  getPrevPageUrl: getPrevPageUrl,
  addToCart: addToCart
}
