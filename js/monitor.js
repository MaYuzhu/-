
(function (w) {
    $('.layui-colla-content li').each(function (index) {
        $(this).click(function(){
            $('.layui-colla-content li').removeClass('active')
            $(this).addClass('active')
            //alert($(this).text())
        })
    })
    $('.btn_yue').on('click',function (event) {
        var target = $(event.target)
        target.addClass('bg_blue')
        target.siblings().removeClass('bg_blue')
    })


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
            starttime:'2019-07-02 10:30:38',
            endtime:'2019-08-02 10:30:38',
            timetype:'day',
            //devicetype:'D,A',
        },
        success:function (json) {
            //console.log(json)
            if(json){
                var Qjj = json.filter(qingjiaoji)
                var Lfj = json.filter(liefengji)
                var Jly = json.filter(jingli)
                //console.log(Lfj)
                //静力水准仪
                var xDataJly = []
                var devNameJly = []
                var cJly = []
                for(let i=0;i<Jly[0].data.length;i++){
                    xDataJly.push(Jly[0].data[i].time.substring(5,16))
                }
                for(let i=0;i<Jly.length;i++){
                    devNameJly.push(Jly[i].devname+'-a')
                    devNameJly.push(Jly[i].devname+'-b')
                    var data_a = []
                    var data_b = []
                    for(let j=0;j<Jly[0].data.length;j++){
                        data_a.push(Jly[i].data[j].data.a)
                        data_b.push(Jly[i].data[j].data.b)
                    }
                    cJly.push({
                        name:Jly[i].devname +'-a',
                        type: 'line',
                        stack:'总量a'+i,
                        data:data_a,
                        //symbol: "none",
                        /*itemStyle:{  //点上显示值
                            normal:{
                                label:{show:true}
                            }
                        },
                        showAllSymbol:true*/
                    })
                    cJly.push({
                        name:Jly[i].devname +'-b',
                        type: 'line',
                        stack:'总量b'+i,
                        data:data_b
                    })
                }
                //console.log(cJly)
                createEchart({legendArr:devNameJly,xAxisArr:xDataJly,seriesArr:cJly,id:'jingli'})
                //倾角计
                var xDataQjj = []
                var devNameQjj = []
                var cQjj = []
                for(let i=0;i<Qjj[0].data.length;i++){
                    xDataQjj.push(Qjj[0].data[i].time.substring(5,16))
                }
                for(let i=0;i<Qjj.length;i++){
                    devNameQjj.push(Qjj[i].devname+'-x')
                    devNameQjj.push(Qjj[i].devname+'-y')
                    var data_x = []
                    var data_y = []
                    for(let j=0;j<Qjj[0].data.length;j++){
                        data_x.push(Qjj[i].data[j].data.val_x)
                        data_y.push(Qjj[i].data[j].data.val_y)
                    }
                    cQjj.push({
                        name:Qjj[i].devname +'-x',
                        type: 'line',
                        stack:'总量a'+i,
                        data:data_x,
                    })
                    cQjj.push({
                        name:Qjj[i].devname +'-y',
                        type: 'line',
                        stack:'总量b'+i,
                        data:data_y
                    })
                }
                createEchart({legendArr:devNameQjj,xAxisArr:xDataQjj,seriesArr:cQjj,id:'qingjiao'})
                //裂缝计
                var xDataLfj = []
                var devNameLfj = []
                var cLfj = []
                for(let i=0;i<Lfj[0].data.length;i++){
                    xDataLfj.push(Lfj[0].data[i].time.substring(5,16))
                }
                for(let i=0;i<Lfj.length;i++){
                    devNameLfj.push(Lfj[i].devname)
                    var data = []
                    for(let j=0;j<Lfj[0].data.length;j++){
                        data.push(Lfj[i].data[j].data.val_x)
                    }
                    cLfj.push({
                        name:Lfj[i].devname,
                        type: 'line',
                        stack:'总量a'+i,
                        data:data
                    })
                }
                createEchart({legendArr:devNameLfj,xAxisArr:xDataLfj,seriesArr:cLfj,id:'liefeng'})
            }

        },
        error:function () {
            alert("请检查您的网络")
        }
    })

    function qingjiaoji(currentValue) {
        return currentValue.devalias == "倾角计"
    }
    function liefengji(currentValue) {
        return currentValue.devalias == "裂缝计"
    }
    function jingli(currentValue) {
        return currentValue.devalias == "静力水准仪"
    }
    
})(window)




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
var l1 = ['甲','乙','丙']
var x1 = [1,2,3,4,5,6,7]
var s1 = [
    {
        name:'甲',
        type: 'line',
        stack:'总量1',
        data:[100,90,200,180,80,120,50]
    },
    {
        name:'乙',
        type: 'line',
        stack:'总量2',
        data:[80,100,150,50,90,170,30]
    },
    {
        name:'丙',
        type: 'line',
        stack:'总量3',
        data:[30,140,100,80,50,100,80]
    }
]
//createEchart({legendArr:l,xAxisArr:x,seriesArr:s,id:'jingli'})
//createEchart({legendArr:l1,xAxisArr:x1,seriesArr:s1,id:'qingjiao'})
//createEchart({legendArr:l1,xAxisArr:x1,seriesArr:s1,id:'liefeng'})

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
            bottom: '5px',
            type: 'scroll',
        },
        xAxis: {
            type: 'category',
            boundaryGap: false,
            axisLabel: {
                //interval: 0,
                rotate: 10,
            },
            data: xAxisArr ,//[1,2,3,4,5,6]
        },
        yAxis: [{
            dataType: '',
            name: '单位：mm',
            type: 'value',
            min: function (value) {
                return (value.min - (((value.max - value.min) ? (value.max - value.min) : value.min) * 0.1)).toFixed(2);
            },
            max: function (value) {
                return (value.max + (((value.max - value.min) ? (value.max - value.min) : value.min) * 0.1)).toFixed(2);
            }
        }],
        series: seriesArr,

    }

    var lineDom = document.getElementById(id)

    var myChart = echarts.init(lineDom)

    myChart.setOption(options)

}