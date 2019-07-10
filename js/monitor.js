
var xData = []
var yData = []

$.ajax({
    url: url + '/zzcismp/tsd/getBuildDevsData.shtml',
    // xhrFields:{
    //     withCredentials:true
    // },
    // traditional: true,
    // crossDomain: true,
    async:true,
    cache:false,
    dataType:'jsonp',
    data:{
        buildcode:'1000B0001',
        starttime:'2019-06-05 10:30:38',
        endtime:'2019-06-06 10:30:38',
        timetype:'hour',
        //devicetype:'D,A',
    },
    success:function (json) {
        console.log(json)
        if(json.status == 1){
            for(var i=0;i<6;i++){
                xData.push(json[i].devname)
                yData.push(json[i].data[1].data.x)
            }
            console.log(yData)
        }

    },
    error:function () {
        alert("请检查您的网络")
    }
})
foo({x:100,y:200,j:300})
function foo({x,y,k,j}) {
    console.log('x='+ x,'y='+ y,'k='+ k,'j='+j)
}

var l = ['123','456']
var x = [1,2,3,4,5,6]
var s = [
    {
        name:'123',
        type: 'line',
        stack:'总量',
        data:[100,90,200,180,80,120]
    },
    {
        name:'456',
        type: 'line',
        stack:'总量123',
        data:[80,100,150,50,90,170]
    }
]
var l1 = ['aaa','bbb','ccc']
var x1 = [1,2,3,4,5,6,7]
var s1 = [
    {
        name:'aaa',
        type: 'line',
        stack:'总量1',
        data:[100,90,200,180,80,120,50]
    },
    {
        name:'bbb',
        type: 'line',
        stack:'总量2',
        data:[80,100,150,50,90,170,30]
    },
    {
        name:'ccc',
        type: 'line',
        stack:'总量3',
        data:[30,140,100,80,50,100,80]
    }
]
createEchart({legendArr:l,xAxisArr:x,seriesArr:s,id:'jingli'})
createEchart({legendArr:l1,xAxisArr:x1,seriesArr:s1,id:'qingjiao'})

function createEchart({legendArr,xAxisArr,seriesArr,id}) {
    var options = {
        tooltip:{
            trigger:'axis',
            axisPointer: {
                type: 'line'
            },
        },
        toolbox: {
            orient: 'horizontal',//方向
            right: '10',//距左
            top: '2',//距上
            feature: {
                saveAsImage: {
                    type: "png",
                    name: "",
                    title: "下载",
                }
            }
        },
        grid: {
            top: '60px',
            left: '50px',
            right: '30px',
            bottom: '50px',
            //containLabel: true
        },
        legend: {
            data: legendArr, //['123','456'],
            bottom: '5px'
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                // interval: 0,
                rotate: 1
            },
            data: xAxisArr //[1,2,3,4,5,6]
        },
        yAxis: [{
            dataType: '',
            name: '单位：mm',
            type: 'value',
            min: function (value) {
                return (value.min - (((value.max - value.min) ? (value.max - value.min) : value.min) * 0.1)).toFixed(4);
            },
            max: function (value) {
                return (value.max + (((value.max - value.min) ? (value.max - value.min) : value.min) * 0.1)).toFixed(4);
            }
        }],
        series: seriesArr,

    }

    var lineDom = document.getElementById(id)

    var myChart = echarts.init(lineDom)

    myChart.setOption(options)

}