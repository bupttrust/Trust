/**
 * @file 包装ajax请求
 * @author chenjunsong(chen.js1023@hotmail.com)
 */

define(['zepto','base/msg','base/util', 'comp/md5'], function($, msg, util, md5) {
    var exports = {};
    var baseUrl = __gupiao.env ? '/fm/api/' : './';
    var commonParams = {
    };
    var parseUrl = function(url) {
        var arr = url.split('?');
        var path = arr[0] || '';
        var query = arr[1] || '';
        return {
            path: path,
            data: util.url.urlParse(query)
        }
    };
    var checkError =  function(data, dataok, dataerror) {
        if (parseInt(data.errno, 10) === 0) {
            dataok && dataok(data);
        }
        else {
            if (dataerror) {
                dataerror(data);
            }
            else {
                msg.notify('defaultDataError', data);
            }
            msg.notify('dataError', data);
        }
    };
    var req = function (opts) {
        var queryString = '';
        var skey = '';
        var orgUrlObj;
        var expiresDate = new Date();
        if (!opts.cache) {
            opts.data = opts.data || {};
            opts.data._st_ = new Date().getTime();
        }
        if (opts.sign) {
            orgUrlObj = parseUrl(baseUrl + opts.url);
            opts.url = orgUrlObj.path;
            queryString = $.param($.extend(orgUrlObj.data, opts.data));
            opts.url += '?' + queryString;
            opts.data = {};
            skey = util.cookie('s_key');
            //寿命3分钟
            expiresDate.setTime(expiresDate.getTime() + 3 * 60 * 1000);
            util.cookie('s_sign', md5(skey + md5(queryString)), {
                path: orgUrlObj.path,
                expires: expiresDate 
            });
        }
        var xhr;
        var requestStartTime = new Date().getTime();
        try {
            xhr = $.ajax({
                url: /^\/|http/.test(opts.url) ? opts.url : (baseUrl + opts.url),
                //url:'http://cp01-forum-ky14.cp01.baidu.com:8899' + opts.url,
                type: opts.type || 'GET',
                data: opts.data,
                dataType: opts.dataType || 'json',
                timeout: opts.timeout || 5000,
                success: function (data) {
                    msg.notify('ajaxSuccess');
                    checkError(data, opts.dataok, opts.dataerror);
                },
                error: function (e) {
                    var now = new Date().getTime();
                    var errType = arguments[1] || 'timeout';
                    if ((now - requestStartTime) < 60) {
                        errType = 'offline';
                    }
                    msg.notify('ajaxError', errType);
                    if (errType === 'timeout') {
                        opts.error && opts.error();
                    }
                },
                complete: function () {
                    msg.notify('ajaxComplete');
                    opts.complete && opts.complete();
                }
            });
        }
        catch (e) {
            opts.error && opts.error();
        }
        return xhr;
    };

    var buildParams = function (params) {
        var p = [];
        var i;
        for (i in params) {
            if (params.hasOwnProperty(i)) {
                p.push(i + '=' + params[i]);
            }
        }
        return p.join('&');
    };
    

    exports.setDefaultParam = function (paramsObj) {
        $.extend(commonParams, paramsObj);
    };

    exports.test = function(opts){
        opts.url = opts.url;
        opts.data = $.extend({}, commonParams, opts.data || {});
        return req(opts);
    };

    exports.req = function(opts){
        // opts.url = 'http://cp01-forum-ky15.cp01.baidu.com:8087/finance/' + opts.url;
        
        opts.data = $.extend({}, commonParams, opts.data || {});
        return req(opts);
    };
    return exports;
});
