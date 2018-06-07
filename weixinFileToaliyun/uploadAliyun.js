
const env = require('./env.js');
const Base64 = require('./Base64.js');
require('./hmac.js');
require('./sha1.js');
const Crypto = require('./crypto.js');
var utils = require('../utils/util.js');

const uploadFile = function (filePath, successCB, errorCB) {
    if (!filePath || filePath.length < 9) {
        wx.showModal({
            title: '上传…错误',
            content: '请重试',
            showCancel: false,
        });
        return;
    }

    let now = utils.formatDate(new Date().getTime(), 'YYMMDDhhmmss');
    let rand = utils.rand(1111,9999);
	  const aliyunFileKey = now + rand + filePath.slice(filePath.lastIndexOf('.'));
    // console.log(aliyunFileKey);
    
    const aliyunServerURL = env.aliyunServerURL;
    const accessid = env.accessid;
    const policyBase64 = getPolicyBase64();
    const signature = getSignature(policyBase64);

    wx.uploadFile({
        url: aliyunServerURL, //接口地址
        filePath: filePath,
        name: 'file',
        header: {
            "Content-Type": "multipart/form-data",
            'accept': 'application/json'
        },
        formData: {
            'key': aliyunFileKey,
            'OSSAccessKeyId': accessid,
            'policy': policyBase64,
            'Signature': signature,
            'success_action_status': '200',
        },
        success: function (res) {
            if (res.statusCode != 200) {
                errorCB(new Error('上传错误:' + JSON.stringify(res)))
                return;
            }
            console.log('上传成功', res);
            successCB(aliyunFileKey);
        },
        fail: function (err) {
            err.wxaddinfo = aliyunServerURL;
            errorCB(err);
        },
    })
}

const getPolicyBase64 = function () {
    let date = new Date();
    date.setHours(date.getHours() + env.timeout);
    let srcT = date.toISOString();
    const policyText = {
        "expiration": srcT, //设置该Policy的失效时间，超过这个失效时间之后，就没有办法通过这个policy上传文件了 指定了Post请求必须发生在2020年01月01日12点之前("2020-01-01T12:00:00.000Z")。
        "conditions": [
            ["content-length-range", 0, 20 * 1024 * 1024] // 设置上传文件的大小限制,1048576000=1000mb
        ]
    };

    const policyBase64 = Base64.encode(JSON.stringify(policyText));
    return policyBase64;
}

const getSignature = function (policyBase64) {
    const accesskey = env.accesskey;

    const bytes = Crypto.HMAC(Crypto.SHA1, policyBase64, accesskey, {
        asBytes: true
    });
    const signature = Crypto.util.bytesToBase64(bytes);

    return signature;
}

module.exports = uploadFile;