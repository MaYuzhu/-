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


//缅甸 我的
//图表展示
function createEchart({legendArr,xAxisArr,seriesArr,id,unit}) {
    var lineDom = document.getElementById(id)
    var myChart = echarts.init(lineDom)
    myChart.showLoading({
        text: lang_data[language].loading,
        textStyle: { fontSize : 30 , color: '#444' },
        effectOption: {backgroundColor: 'rgba(0, 0, 0, 0)'}
    })
    options = null;
    options = {
        tooltip:{
            trigger:'axis',
            axisPointer: {
                type: 'line'
            },
        },
        toolbox: {
            orient: 'horizontal',//方向
            right: '16',
            top: '2',//距上
            feature: {
                saveAsImage: {
                    type: "png",
                    name: "",
                    title: lang_data[language].download,
                }
            }
        },

        grid: {
            top: '60px',
            left: '20px',
            right: '30px',
            bottom: '30px',
            containLabel: true
        },
        legend: {
            data: legendArr, //['123','456'],
            bottom: '5px',
            type: 'scroll',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                //interval: 0,
                rotate: 30,
            },
            data: xAxisArr ,//[1,2,3,4,5,6]
        },
        yAxis: [{
            dataType: '',
            name: lang_data[language].unit +'：' + unit,
            type: 'value',
            min: function (value) {
                return (value.min - (((value.max - value.min) ? (value.max - value.min) : value.min) * 0.1)).toFixed(3);
            },
            max: function (value) {
                return (value.max + (((value.max - value.min) ? (value.max - value.min) : value.min) * 0.1)).toFixed(3);
            }
        }],
        series: seriesArr,

    }

    if (options && typeof options === "object") {
        myChart.setOption(options, true)
        myChart.hideLoading()
    }

}

//返回数组中最大值的index
function indexOfArr(arr){
    return arr.join(',').substring(0,arr.join(',').indexOf(Math.max.apply(null, arr))).replace(/[^,]/gi, "").length;
}

//按条件拆分数组
function formateArrData (initialArr, name, newArr) {
    // 判定传参是否符合规则
    if (!(initialArr instanceof Array) || !(newArr instanceof Array)) {
        return '请传入正确格式的数组'
    }
    if (!name) {
        return '请传入对象属性'
    }
    // 每一个类型的单独数组，注意此处不能return出每个alikeArr，
    // 因为递归的返回值只返回最后一次的值
    let alikeArr = []
    let propertyName = ''
    if (initialArr.length > 0) {
        propertyName = initialArr[0][`${name}`]
        let tempArr = []
        // 将拥有共同propertyName属性的对象放到此次遍历的alikeArr中，
        // 将其他的对象放入到tempArr中，等待下次遍历
        initialArr.forEach((val, key) => {
            if (val[`${name}`] === propertyName) {
                alikeArr.push(val)
            } else {
                tempArr.push(val)
            }
        })
        newArr.push(alikeArr)
        initialArr = tempArr
        return formateArrData(initialArr, name, newArr)
    } else {
        return newArr
    }
}

//时间选择
function getNowFormatDate() {
    var date = new Date();
    var seperator1 = "-";
    var seperator2 = ":";
    var month = date.getMonth() + 1;
    var strDate = date.getDate();
    if (month >= 1 && month <= 9) {
        month = "0" + month;
    }
    if (strDate >= 0 && strDate <= 9) {
        strDate = "0" + strDate;
    }
    var currentdate = date.getFullYear() + seperator1 + month + seperator1 + strDate
        + " " + date.getHours() + seperator2 + date.getMinutes()
        + seperator2 + date.getSeconds();
    return currentdate;
}

function getDateArrayBefore(date){//获取时间数组
    var darray = {};
    darray.year = date.year;
    darray.month = date.month - 1 - 6;
    var day = date.date;
    darray.date = day ;  //-1
    if(day==1){
        darray.month = date.month - 2;
        if(darray.month==3||darray.month==7||darray.month==8||darray.month==10){
            darray.date = 30;
        }else if(darray.month==1){
            darray.year%4==0?darray.date = 29:darray.date = 28
        }else {
            darray.date = 31;
        }

    }
    darray.hours = date.hours;
    darray.minutes = date.minutes;
    darray.seconds = date.seconds;
    return darray;
}

function getDateArray(date){//获取时间数组
    var darray = {};
    if(date.month  + 5 > 12){
        darray.year = date.year + 1;
        darray.month = date.month  + 5 -12;
    }else {
        darray.year = date.year;
        darray.month = date.month  + 5;
    }

    var day = date.date;
    /*if(date.hours == 0 && date.minutes == 0 && date.seconds == 0){
        day = day + 1;
    }else{
        darray.hours = date.hours;
        darray.minutes = date.minutes;
        darray.seconds = date.seconds;
    }*/
    darray.date = day ;  //+1
    darray.hours = date.hours;
    darray.minutes = date.minutes;
    darray.seconds = date.seconds;
    var darrayMsS = `${darray.year}/${darray.month+1}/${darray.date} ${darray.hours}:${darray.minutes}:${darray.seconds}`
    var darrayMs = (new Date(darrayMsS)).getTime();
    if(darrayMs>new Date().getTime()){
        darray = {
            year:new Date().getFullYear(),
            month:new Date().getMonth(),
            date:new Date().getDate(),
            hours:new Date().getHours(),
            minutes:new Date().getMinutes(),
            seconds:new Date().getSeconds()
        }
    }
    //console.log(darrayMs)
    return darray;
}