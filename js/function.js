//调用：accAdd(arg1,arg2)  
//返回值：arg1加上arg2的精确结果  
function accAdd(arg1, arg2) {
    var r1, r2, m;
    try { r1 = arg1.toString().split(".")[1].length } catch (e) { r1 = 0 }
    try { r2 = arg2.toString().split(".")[1].length } catch (e) { r2 = 0 }
    m = Math.pow(10, Math.max(r1, r2))
    return (arg1 * m + arg2 * m) / m
}
Number.prototype.add = function (arg) {
    return accAdd(arg, this);
}
//调用：accSub(arg1,arg2)  
//返回值：arg1减上arg2的精确结果  
function accSub(arg1, arg2) {
    return accAdd(arg1, -arg2);
}
Number.prototype.sub = function (arg) {
    return accSub(this, arg);
}
//调用：accMul(arg1,arg2)  
//返回值：arg1乘以arg2的精确结果  
function accMul(arg1, arg2) {
    var m = 0, s1 = arg1.toString(), s2 = arg2.toString();
    try { m += s1.split(".")[1].length } catch (e) { }
    try { m += s2.split(".")[1].length } catch (e) { }
    return Number(s1.replace(".", "")) * Number(s2.replace(".", "")) / Math.pow(10, m)
}
Number.prototype.mul = function (arg) {
    return accMul(arg, this);
}
//调用：accDiv(arg1,arg2)  
//返回值：arg1除以arg2的精确结果  
function accDiv(arg1, arg2) {
    var t1 = 0, t2 = 0, r1, r2;
    try { t1 = arg1.toString().split(".")[1].length } catch (e) { }
    try { t2 = arg2.toString().split(".")[1].length } catch (e) { }
    with (Math) {
        r1 = Number(arg1.toString().replace(".", ""))
        r2 = Number(arg2.toString().replace(".", ""))
        return (r1 / r2) * pow(10, t2 - t1);
    }
}
Number.prototype.div = function (arg) {
    return accDiv(this, arg);
}
Number.prototype.toFixedNumNoE = function (num) {
    var thisVal = this.toFixed(num);

    var result = null;
    for (var i = thisVal.length - 1; i >= 0; i--) {
        // console.log(thisVal.charAt(i));
        if (thisVal.charAt(i) == 0) {
            result = thisVal.substring(0, i);
        } else if (thisVal.charAt(i) == '.') {
            result = thisVal.substring(0, i);
            break;
        } else {
            result = thisVal;
            break;
        }
    }
    if (result == "-0")
        result = "0";
    return result;
}

// IE浏览器
function strFormatDate(str){
    return new Date(Date.parse(str.replace(/-/g, "/")));
}
String.prototype.stringToDate = function () {
    return new Date(Date.parse(this.replace(/-/g, "/")));
}

var sys = {};
//console.log
sys.println = function (obj) {
    console.log(obj);
}

// get
sys.getQueryString = function (name) {
    var reg = new RegExp("(^|&)" + name + "=([^&]*)(&|$)", "i");
    var r = window.location.search.substr(1).match(reg);
    var title = null;
    if (r != null) {
        // console.log(r);
        title = unescape(r[2]);

        if ((sys.myBrowser() != 'IE' && sys.myBrowser() != 'Edge') || r[2].indexOf("%") >= 0)
            title = decodeURI(escape(title));

    }
    return title;
}
// 时间对象格式化
sys.dateFormat = function (date, formatStr) {
    if (!(date instanceof Date)) {
        if (date.length == 13) {
            date = date + ":00:00"
        }
        data = new Date(date)
    }
    if (formatStr == null)
        formatStr = "YYYY-MM-DD HH:mm:SS";
    var str = formatStr;
    var Week = ['日', '一', '二', '三', '四', '五', '六'];

    str = str.replace(/yyyy|YYYY/, date.getFullYear());
    str = str.replace(/yy|YY/, (date.getYear() % 100) > 9 ? (date.getYear() % 100).toString() : '0' + (date.getYear() % 100));

    str = str.replace(/MM/, date.getMonth() >= 9 ? (date.getMonth() + 1) : '0' + (date.getMonth() + 1));
    str = str.replace(/M/g, date.getMonth() + 1);

    str = str.replace(/w|W/g, Week[date.getDay()]);

    str = str.replace(/dd|DD/, date.getDate() > 9 ? date.getDate().toString() : '0' + date.getDate());
    str = str.replace(/d|D/g, date.getDate());

    str = str.replace(/hh|HH/, date.getHours() > 9 ? date.getHours().toString() : '0' + date.getHours());
    str = str.replace(/h|H/g, date.getHours());
    str = str.replace(/mm/, date.getMinutes() > 9 ? date.getMinutes().toString() : '0' + date.getMinutes());
    str = str.replace(/m/g, date.getMinutes());

    str = str.replace(/ss|SS/, date.getSeconds() > 9 ? date.getSeconds().toString() : '0' + date.getSeconds());
    str = str.replace(/s|S/g, date.getSeconds());

    return str;
}
// 时间加减
sys.dateAdd = function(date,s){
    return new Date(date.getTime() + (s*1000));
}
// 数据字符时间格式化
sys.setDateFormat = function (date, Format) {
    if (Format != false)
        Format = true;
    var datetime = '';
    if (Format) {
        var dt = {}
        dt.Y = date.substr(0, 4);
        dt.m = date.substr(5, 2);
        dt.d = date.substr(8, 2);
        dt.H = date.substr(11, 2);
        dt.i = date.substr(14, 2);
        dt.s = date.substr(17, 2);

        for (var k in dt) {
            if (dt[k]) {
                datetime += dt[k];

                if (k == 'Y')
                    datetime += "年";
                if (k == 'm')
                    datetime += "月";
                if (k == 'd')
                    datetime += "日 ";
                if (k == 'H')
                    datetime += "时";
                if (k == 'i')
                    datetime += "分";
                if (k == 's')
                    datetime += "秒";
            }
        }
    } else {
        date = date.replace("年", "-");
        date = date.replace("月", "-");
        date = date.replace("日", "");
        date = date.replace("时", ":");
        date = date.replace("分", ":");
        date = date.replace("秒", "");

        datetime = date
    }
    return datetime;
}
//判断浏览器
sys.myBrowser = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串
    // console.log(userAgent);

    var isOpera = userAgent.indexOf("Opera") > -1;
    // console.log(userAgent);
    if (isOpera) {
        return "Opera"
    }; //判断是否Opera浏览器
    if (userAgent.indexOf("Edge") > -1) {
        return "Edge";
    }

    if (userAgent.indexOf("Firefox") > -1) {
        return "FF";
    } //判断是否Firefox浏览器
    if (userAgent.indexOf("Chrome") > -1) {
        return "Chrome";
    }
    if (userAgent.indexOf("Safari") > -1) {
        return "Safari";
    } //判断是否Safari浏览器
    if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器
    if (userAgent.indexOf("rv:11") > -1 && !isOpera) {
        return "IE";
    }; //判断是否IE浏览器

}
sys.ieEdition = function () {
    var userAgent = navigator.userAgent; //取得浏览器的userAgent字符串


    if (userAgent.indexOf("rv:11") > -1) {
        return 11;
    } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE 10.0;") > -1) {
        return 10;
    } else if (userAgent.indexOf("compatible") > -1 && userAgent.indexOf("MSIE 9.0;") > -1) {
        return 9;
    } else {
        return '<=8'
    }
}
sys.isRealNum = function (val) {
    // isNaN()函数 把空串 空格 以及NUll 按照0来处理 所以先去除
    if (val === "" || val == null) {
        return false;
    }
    if (!isNaN(val)) {
        return true;
    } else {
        return false;
    }
}

var db = {};
//用汉字识别设备代号（type）
db.devToType = function (dev) {
    var data = [
        {
            devalias: "北斗",
            alias: "",//别名
            type: "7"
        }, {
            devalias: "雨量计",
            alias: "",
            type: "F"
        }, {
            devalias: "渗压计",
            alias: "",
            type: "I"
        }, {
            devalias: "固定式测斜仪",
            alias: "深部测斜仪",
            type: "E"
        }, {
            devalias: "水位计",
            alias: "",
            type: "J"
        }, {
            devalias: "倾角计",
            alias: "",
            type: "A"
        }, {
            devalias: "裂缝计",
            alias: "",
            type: "C"
        }, {
            devalias: "沉降传感",
            alias: "静力水准仪",
            type: "D"
        },
    ];

    for (var k = 0; k <= data.length; k++) {
        if ([data[k].devalias, data[k].alias, data[k].type].indexOf(dev) > -1) {
            // sys.println(element);
            return data[k];
        }
    }
}
db.devDbK = function(dev){
    var allDev = {
        // 倾角
        A:[
            "x",
            "y",
            "val_x",
            "val_y"
        ],
        // 裂缝
        C:[
            "x",
            "val_x"
        ],
        // 静力
        D:[
            "a",
            "b"
        ],
        // 弦式应变计
        B:[
            "x"
        ]
    }

    return allDev[dev];
}

// 走势图相关方法
var charts = {};
// y轴名字
charts.yAxis_name = function (str) {
    var realLength = 0, len = str.length, charCode = -1;
    for (var i = 0; i < len; i++) {
        charCode = str.charCodeAt(i);
        if (charCode >= 0 && charCode <= 128)
            realLength += 1;
        else
            realLength += 2;
    }

    var name = '';
    for (var i = 1; i <= realLength; i++) {
        name += ' ';
    }
    return name + str;
}
var echarts_baidu = charts;