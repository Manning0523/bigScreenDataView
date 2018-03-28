// 字符串格式化
String.prototype.format = function () {
    var result = this;
    if (arguments.length == 0)
        return null;
    for (var i = 0; i < arguments.length; i++) {
        var re = new RegExp('\\{' + (i) + '\\}', 'gm');
        result = result.replace(re, arguments[i]);
    }
    return result;
};

// jquery 取url参数和在url加参数
// 1、取值使用
//      $.Request("act");
// 2、url加参数
//      $.UrlUpdateParams(url, "a", 11111);
(function ($) {
    $.extend({
        Request: function (m) {
            var sValue = location.search.match(new RegExp("[\?\&]" + m + "=([^\&]*)(\&?)", "i"));
            return sValue ? sValue[1] : sValue;
        },
        UrlUpdateParams: function (url, name, value) {
            var r = url;
            if (r != null && r != 'undefined' && r != "") {
                value = encodeURIComponent(value);
                var reg = new RegExp("(^|)" + name + "=([^&]*)(|$)");
                var tmp = name + "=" + value;
                if (url.match(reg) != null) {
                    r = url.replace(eval(reg), tmp);
                }
                else {
                    if (url.match("[\?]")) {
                        r = url + "&" + tmp;
                    } else {
                        r = url + "?" + tmp;
                    }
                }
            }
            return r;
        }

    });
})(jQuery);

/** 
 * 时间对象的格式化; 
 */
Date.prototype.format = function (format) {
    /* 
     * eg:format="yyyy-MM-dd hh:mm:ss"; 
     */
    var o = {
        "M+": this.getMonth() + 1, // month  
        "d+": this.getDate(), // day  
        "h+": this.getHours(), // hour  
        "m+": this.getMinutes(), // minute  
        "s+": this.getSeconds(), // second  
        "q+": Math.floor((this.getMonth() + 3) / 3), // quarter  
        "S": this.getMilliseconds()
        // millisecond  
    }

    if (/(y+)/.test(format)) {
        format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4
                        - RegExp.$1.length));
    }

    for (var k in o) {
        if (new RegExp("(" + k + ")").test(format)) {
            format = format.replace(RegExp.$1, RegExp.$1.length == 1
                            ? o[k]
                            : ("00" + o[k]).substr(("" + o[k]).length));
        }
    }
    return format;
};


// ajax请求工具
var ajaxUtil = {

    // GET请求
    get: function (url) {
        url = $.UrlUpdateParams(url, "_dc", new Date().getTime());

        return $.ajax({
            type: "GET",
            contentType: "application/json",
            url: url.indexOf("http") === 0 ? "proxy.ashx?" + url : url
        });
    },

    // POST请求（postData既可是JSON对象，也可是序列化过的字符串）
    post: function (url, postData) {
        url = $.UrlUpdateParams(url, "_dc", new Date().getTime());

        if (postData && $.type(postData) !== "string") {
            postData = JSON.stringify(postData);
        }

        return $.ajax({
            type: "POST",
            contentType: "application/json",
            url: url.indexOf("http") === 0 ? "proxy.ashx?" + url : url,
            data: postData,
            processData: false
        });
    }
};
