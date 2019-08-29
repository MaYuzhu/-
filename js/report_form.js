(function (w) {

    var language = $.cookie('language')
    if(!$.cookie('username')) {
        location.href = './index.html'
    }

    //html文字
    $('.date_form i:eq(0)').text(lang_data[language].start_time)
    $('.date_form i:eq(1)').text(lang_data[language].end_time)

    $('.shengcheng').text(lang_data[language].btn_generating)
    $('.xiazai a').text(lang_data[language].btn_down)

    //时间选择
    var start
    var end

    layui.use('laydate', function(){
        var laydate = layui.laydate

        start = laydate.render({
            elem: '#start',
            type: 'date',
            btns: ['confirm'],
            min: '1900-1-1 00:00:00',
            lang: lang_data[language].layer_lang,
            //max: 'nowTime',
            max:getNowFormatDate(),

            trigger: 'click', //采用click弹出
            done: function (value, date, endDate) {
                //console.log(value)
                if(value !== ''){
                    end.config.min = {
                        year: date.year,
                        month: date.month - 1,
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    };//开始日选好后，重置结束日的最小日期
                    end.config.value = {
                        year: date.year,
                        month: date.month - 1,
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    }; //将结束日的初始值设定为开始日

                    end.config.max = getDateArray(date)

                }else {
                    end.config.max.year = '';
                    end.config.max.month = '';
                    end.config.max.date = '';
                }

            }
        });

        end = laydate.render({
            elem: '#end',
            type: 'date',
            btns: ['confirm'],
            min: '1900-1-1 00:00:00',
            max: getNowFormatDate(),
            trigger: 'click', //采用click弹出
            done: function (value, date, endDate) {
                if(value !== ''){
                    start.config.max = {
                        year: date.year,
                        month: date.month - 1,
                        date: date.date,
                        hours: date.hours,
                        minutes: date.minutes,
                        seconds: date.seconds
                    }; //结束日选好后，重置开始日的最大日期
                    start.config.min = getDateArrayBefore(date)
                }else {
                    start.config.min.year = '';
                    start.config.min.month = '';
                    start.config.min.date = '';
                }

            }
        });
    })




    //文档部分
    $('.page1>:nth-child(1)').text(lang_data[language].word.word_1_title)
    $('.page1>:nth-child(2)').text(lang_data[language].word.word_1_title_f)
    $('.page1>:nth-child(3)').text(lang_data[language].word.jingtu)

    $('.page2>:nth-child(1)').text(lang_data[language].word.word_title1)
    $('.page2>:nth-child(2)').text(lang_data[language].word.word_1_text)
    $('.p1_text').text(lang_data[language].word.p1_text)

    $('.page3>:nth-child(1)').text(lang_data[language].word.word_title2)
    $('.page3>:nth-child(2)').text(lang_data[language].word.word_2_text)
    for(var i=0;i<7;i++){
        $(`.page3>div>p:eq(${i})`).text(lang_data[language].word[`p1_text${i+2}`])
    }

    $('.page4>:nth-child(1)').text(lang_data[language].word.word_3_text)
    $('.page4>:nth-child(3)').text(lang_data[language].word.word_4_text)
    for(var i=0;i<5;i++){
        $(`.page4>div>p:eq(${i})`).text(lang_data[language].word[`p1_text${i+9}`])
    }

    $('.page5>:nth-child(1)').text(lang_data[language].word.word_title3)
    $('.page5>:nth-child(3)').text(lang_data[language].word.b1_text1)
    $('.page5>:nth-child(5)').text(lang_data[language].word.b1_text2)

    $('.page6>:nth-child(1)').text(lang_data[language].word.word_title4)
    $('.page6>:nth-child(2)').text(lang_data[language].word.word_title4_1)

    for(var i=0;i<7;i++){
        $(`.ta1 tr:eq(0)>td:eq(${i})`).text(lang_data[language].word[`table${i+1}`])
        $(`.ta2 tr:eq(0)>td:eq(${i})`).text(lang_data[language].word[`table${i+1}`])
    }
    $('.ta1 tr:eq(1)>td:eq(0)').text(lang_data[language].word.word_D)
    $('.ta1 tr:eq(2)>td:eq(0)').text(lang_data[language].word.word_A)
    $('.ta1 tr:eq(3)>td:eq(0)').text(lang_data[language].word.word_C)

    $('.ta2 tr:eq(1)>td:eq(0)').text(lang_data[language].word.word_A)
    $('.ta2 tr:eq(2)>td:eq(0)').text(lang_data[language].word.word_C)


    $('.word_A').text(lang_data[language].word.word_A)
    $('.word_C').text(lang_data[language].word.word_C)
    $('.word_D').text(lang_data[language].word.word_D)

    for(var i=1;i<6;i++){
        $(`.page6>.tu4_${i}`).text(lang_data[language].word[`p4_${i}`])
    }

    $('.page7>:nth-child(1)').text(lang_data[language].word.word_title5)
    $('.tu_min>i:eq(0)').text(lang_data[language].C)
    $('.tu_min>i:eq(1)').text(lang_data[language].D)
    $('.tu_min>i:eq(2)').text(lang_data[language].A)
    $('.p5_1').text(lang_data[language].word.p5_1)
    $('.p5_2').text(lang_data[language].word.p5_2)

    var devs = {
        buildcode : ' ',
        /*starttime : sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24)),
        endtime : sys.dateFormat(sys.dateAdd(new Date(), 0)),*/
        starttime : sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24)),
        endtime : sys.dateFormat(sys.dateAdd(new Date(), 0)),
        timetype : "day",
        devicetype : ' ',
        language:$.cookie('language'),
    }

    //生成报表
    $('.shengcheng').on('click',function () {
        if(!$('#start').val()){
            layer.msg(lang_data[language].input_start_time)
            return
        }
        if(!$('#end').val()){
            layer.msg(lang_data[language].input_end_time)
            return
        }
        $('#page_content').show()
        $('.page1>:nth-child(4)').text($('#end').val().replace(/-/g," / "))
        var startTime = $('#start').val() + ' 00:00:00'
        var endTime = $('#end').val() + ' 00:00:00'
        //console.log(startTime,endTime)
        devs.starttime = startTime
        devs.endtime = endTime

        ajaxMax(startTime,endTime)

        ajaxAllDevs('1040B0001',"A","q1")
        ajaxAllDevs('1040B0001',"C","l1")
        ajaxAllDevs('1040B0001',"D","j1")
        ajaxAllDevs('1040B0002',"A","q2")
        ajaxAllDevs('1040B0002',"C","l2")

        //$('.xiazai').css({visibility:'visible'})
    })

    var unitName = {
        D: { name: lang_data[language].D, unit: "mm", print: ['a', 'b'] ,id:"jingli"},//静力水准仪
        C: { name: lang_data[language].C, unit: "mm", print: ['val_x'] ,id:"liefeng"},//裂缝计
        A: { name: lang_data[language].A, unit: "rad", print: ['x','y'] ,id:"qingjiao"},//倾角计
    }
    //最大值查询
    function ajaxMax(start,end) {
        $.ajax({
            url: url + '/zzcismp/report/reportSilverPagodaMonitoringData.shtml',
            async:true,
            cache:false,
            dataType:'jsonp',
            data:{startTime:start,endTime:end},
            success:function (json) {

                if(json !== null){
                    //console.log(json)

                    if(language == 'zh_CN'){
                        $('.maxValue').text(`本次监测周期内，葛道帕林寺、瑞山都塔各监测项目均无异常，
                    其中葛道帕林寺：
                    差异沉降累计变化值最大测点为${json['1040B0001'].staticForce.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0001'].staticForce.accumulativeMaxValue}，
                    其变化速率为${json['1040B0001'].staticForce.dayChangeRate}；
                    倾斜累计变化值最大测点为${json['1040B0001'].dipAngle.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0001'].dipAngle.accumulativeMaxValue}，
                    其变化速率为${json['1040B0001'].dipAngle.dayChangeRate}；
                    裂缝累计变化值最大测点为${json['1040B0001'].crackGauges.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0001'].crackGauges.accumulativeMaxValue}，
                    其变化速率为${json['1040B0001'].crackGauges.dayChangeRate}。
                    
                    瑞山都塔：
                    倾斜累计变化值最大测点为${json['1040B0002'].dipAngle.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0002'].dipAngle.accumulativeMaxValue}，
                    其变化速率为${json['1040B0002'].dipAngle.dayChangeRate}；
                    裂缝累计变化值最大测点为${json['1040B0002'].crackGauges.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0002'].crackGauges.accumulativeMaxValue}，
                    其变化速率为${json['1040B0002'].crackGauges.dayChangeRate}。
                    详见表3-1、表3-2`)
                    }else if(language == 'en_US'){
                        $('.maxValue').text(`During the monitoring period, there were no abnormalities in the monitoring items of Goldoparin Temple and Ruishan Duta.
                    Among them, the Golden Palin Temple：
                    The maximum measuring point of cumulative variation of differential settlement is${json['1040B0001'].staticForce.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0001'].staticForce.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0001'].staticForce.dayChangeRate}；
                    The maximum measuring point of the cumulative change value of inclination is${json['1040B0001'].dipAngle.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0001'].dipAngle.accumulativeMaxValue}，
                    The rate of change is${json['1040B0001'].dipAngle.dayChangeRate}；
                    The maximum measuring point of the cumulative change value of cracks is${json['1040B0001'].crackGauges.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0001'].crackGauges.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0001'].crackGauges.dayChangeRate}。
                    
                    SHWE SAN DAW PAGODA：
                    The maximum measuring point of the cumulative change value of inclination is${json['1040B0002'].dipAngle.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0002'].dipAngle.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0002'].dipAngle.dayChangeRate}；
                    The maximum measuring point of the cumulative change value of cracks is${json['1040B0002'].crackGauges.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0002'].crackGauges.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0002'].crackGauges.dayChangeRate}。
                    See Table 3-1 and Table 3-2 for details.`)
                    }else {
                        $('.maxValue').text(`During the monitoring period, there were no abnormalities in the monitoring items of Goldoparin Temple and Ruishan Duta.
                    Among them, the Golden Palin Temple：
                    The maximum measuring point of cumulative variation of differential settlement is${json['1040B0001'].staticForce.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0001'].staticForce.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0001'].staticForce.dayChangeRate}；
                    The maximum measuring point of the cumulative change value of inclination is${json['1040B0001'].dipAngle.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0001'].dipAngle.accumulativeMaxValue}，
                    The rate of change is${json['1040B0001'].dipAngle.dayChangeRate}；
                    The maximum measuring point of the cumulative change value of cracks is${json['1040B0001'].crackGauges.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0001'].crackGauges.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0001'].crackGauges.dayChangeRate}。
                    
                    SHWE SAN DAW PAGODA：
                    The maximum measuring point of the cumulative change value of inclination is${json['1040B0002'].dipAngle.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0002'].dipAngle.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0002'].dipAngle.dayChangeRate}；
                    The maximum measuring point of the cumulative change value of cracks is${json['1040B0002'].crackGauges.accumulativeMaxDevname}place，
                    Cumulative change value${json['1040B0002'].crackGauges.accumulativeMaxValue}，
                    The rate of change is as follows:${json['1040B0002'].crackGauges.dayChangeRate}。
                    See Table 3-1 and Table 3-2 for details.`)
                    }
                    /*$('.maxValue').text(`本次监测周期内，葛道帕林寺、瑞山都塔各监测项目均无异常，
                    其中葛道帕林寺：
                    差异沉降累计变化值最大测点为${json['1040B0001'].staticForce.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0001'].staticForce.accumulativeMaxValue}，
                    其变化速率为${json['1040B0001'].staticForce.dayChangeRate}；
                    倾斜累计变化值最大测点为${json['1040B0001'].dipAngle.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0001'].dipAngle.accumulativeMaxValue}，
                    其变化速率为${json['1040B0001'].dipAngle.dayChangeRate}；
                    裂缝累计变化值最大测点为${json['1040B0001'].crackGauges.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0001'].crackGauges.accumulativeMaxValue}，
                    其变化速率为${json['1040B0001'].crackGauges.dayChangeRate}。
                    
                    瑞山都塔：
                    倾斜累计变化值最大测点为${json['1040B0002'].dipAngle.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0002'].dipAngle.accumulativeMaxValue}，
                    其变化速率为${json['1040B0002'].dipAngle.dayChangeRate}；
                    裂缝累计变化值最大测点为${json['1040B0002'].crackGauges.accumulativeMaxDevname}点，
                    累计变化值为${json['1040B0002'].crackGauges.accumulativeMaxValue}，
                    其变化速率为${json['1040B0002'].crackGauges.dayChangeRate}。
                    详见表3-1、表3-2`)*/

                    //表3-1、表3-2
                    $('.ta1 tr:eq(1)>td:eq(1)').text(json['1040B0001'].staticForce.dayMaxDevname)
                    $('.ta1 tr:eq(1)>td:eq(2)').text(json['1040B0001'].staticForce.dayMaxValue)
                    $('.ta1 tr:eq(1)>td:eq(3)').text(json['1040B0001'].staticForce.accumulativeMaxDevname)
                    $('.ta1 tr:eq(1)>td:eq(4)').text(json['1040B0001'].staticForce.accumulativeMaxValue)
                    $('.ta1 tr:eq(1)>td:eq(5)').text(json['1040B0001'].staticForce.dayChangeRate)

                    $('.ta1 tr:eq(2)>td:eq(1)').text(json['1040B0001'].dipAngle.dayMaxDevname)
                    $('.ta1 tr:eq(2)>td:eq(2)').text(json['1040B0001'].dipAngle.dayMaxValue)
                    $('.ta1 tr:eq(2)>td:eq(3)').text(json['1040B0001'].dipAngle.accumulativeMaxDevname)
                    $('.ta1 tr:eq(2)>td:eq(4)').text(json['1040B0001'].dipAngle.accumulativeMaxValue)
                    $('.ta1 tr:eq(2)>td:eq(5)').text(json['1040B0001'].dipAngle.dayChangeRate)

                    $('.ta1 tr:eq(3)>td:eq(1)').text(json['1040B0001'].crackGauges.dayMaxDevname)
                    $('.ta1 tr:eq(3)>td:eq(2)').text(json['1040B0001'].crackGauges.dayMaxValue)
                    $('.ta1 tr:eq(3)>td:eq(3)').text(json['1040B0001'].crackGauges.accumulativeMaxDevname)
                    $('.ta1 tr:eq(3)>td:eq(4)').text(json['1040B0001'].crackGauges.accumulativeMaxValue)
                    $('.ta1 tr:eq(3)>td:eq(5)').text(json['1040B0001'].crackGauges.dayChangeRate)

                    $('.ta2 tr:eq(1)>td:eq(1)').text(json['1040B0002'].dipAngle.dayMaxDevname)
                    $('.ta2 tr:eq(1)>td:eq(2)').text(json['1040B0002'].dipAngle.dayMaxValue)
                    $('.ta2 tr:eq(1)>td:eq(3)').text(json['1040B0002'].dipAngle.accumulativeMaxDevname)
                    $('.ta2 tr:eq(1)>td:eq(4)').text(json['1040B0002'].dipAngle.accumulativeMaxValue)
                    $('.ta2 tr:eq(1)>td:eq(5)').text(json['1040B0002'].dipAngle.dayChangeRate)

                    $('.ta2 tr:eq(2)>td:eq(1)').text(json['1040B0002'].crackGauges.dayMaxDevname)
                    $('.ta2 tr:eq(2)>td:eq(2)').text(json['1040B0002'].crackGauges.dayMaxValue)
                    $('.ta2 tr:eq(2)>td:eq(3)').text(json['1040B0002'].crackGauges.accumulativeMaxDevname)
                    $('.ta2 tr:eq(2)>td:eq(4)').text(json['1040B0002'].crackGauges.accumulativeMaxValue)
                    $('.ta2 tr:eq(2)>td:eq(5)').text(json['1040B0002'].crackGauges.dayChangeRate)

                }else if(json.status == 5){
                    layer.msg(lang_data[language].msg_no_login)
                    location.href = './index.html'
                }else {
                    layer.msg(lang_data[language].no_data)
                }

            },
            error:function () {
                layer.msg(lang_data[language].network_wrong)
            }
        })
    }
    //图表数据请求
    function ajaxAllDevs(buildcode,devicetype,id) {
        devs.buildcode = buildcode
        devs.devicetype = devicetype
        $.ajax({
            url: url + '/zzcismp/tsd/getBuildDevsDataByType.shtml',
            async:true,
            cache:false,
            dataType:'jsonp',
            data:devs,
            success:function (json) {

                if(json instanceof Array && json !== null){
                    //console.log(json)
                    var xDataJly = []
                    var devNameJly = []
                    var cJly = []
                    var findMax = [];
                    for(let maxD=0;maxD<json.length;maxD++){
                        findMax.push(json[maxD].data.length)
                    }
                    for(let j=0;j<json[indexOfArr(findMax)].data.length;j++){
                        xDataJly.push(json[indexOfArr(findMax)].data[j].time.substring(5,16))
                    }
                    for(let k=0;k<json.length;k++){
                        for(let m=0;m<unitName[json[k].type].print.length;m++){
                            devNameJly.push(json[k].devname +'-'+ unitName[json[k].type].print[m])
                            var data_a = []
                            for(let l=0;l<json[k].data.length;l++){
                                data_a.push(json[k].data[l].data[unitName[json[k].type].print[m]])
                            }
                            cJly.push({
                                name:json[k].devname  +'-'+ unitName[json[k].type].print[m],
                                type: 'line',
                                stack:'总量' + k + unitName[json[k].type].print[m],
                                data:data_a,
                            })
                        }
                    }

                    createEchart({legendArr:devNameJly,xAxisArr:xDataJly,seriesArr:cJly,
                        id:id,unit:unitName[json[0].type].unit})

                }else if(json.status == 5){
                    layer.msg(lang_data[language].msg_no_login)
                    location.href = './index.html'
                }else {
                    layer.msg(lang_data[language].no_data)
                }

            },
            error:function () {
                layer.msg(lang_data[language].network_wrong)
            }
        })
    }
    //echarts图表
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
            /*toolbox: {
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
            },*/

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

            setTimeout(()=>{
                var resultBase64 = myChart.getDataURL({
                    type: 'png',
                    pixelRatio: 2,
                    backgroundColor: '#fff'
                })
                $(`#${id}_img`).attr('src',resultBase64)
                $('.xiazai').css({visibility:'visible'})
            },2000)
        }
    }


    //下载报表

    jQuery(document).ready(function($) {
        $("a.word_export").click(function(event) {
            $("#page_content").wordExport("报表")
        })
    })

    var myChart = echarts.init(document.getElementById('aaa'));
    var option = {
        toolbox : {
            feature : {
                saveAsImage : {
                    show : true
                }
            }
        },
        xAxis: {
            type: 'category',
            data: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun']
        },
        yAxis: {
            type: 'value'
        },
        series: [{
            data: [820, 932, 901, 934, 1290, 1330, 1320],
            type: 'line',
            smooth: true
        }]
    };
    myChart.setOption(option);
    $("#ntexport").click(function () {
        var mycanvas = $("#aaa").find("canvas")[0];
        var image = mycanvas.toDataURL("image/jpeg");
        var resultBase64 = myChart.getDataURL({
            type: 'png',
            pixelRatio: 2,
            backgroundColor: '#fff'
        })
        /*var $a = document.createElement('a');
        $a.setAttribute("href", image);
        $a.setAttribute("download", "test");        // 下载的图片名称
        $a.click();*/
        //window.location.href=image;
        $('#a').attr('src',resultBase64)
    });
    /*var mycanvas = $("#aaa").find("canvas")[0];

    var image = mycanvas.toDataURL("image/jpeg");
    console.log(image)
    var resultBase64 = myChart.getDataURL({
        type: 'png',
        pixelRatio: 2,
        backgroundColor: '#fff'
    })
    setTimeout(()=>$('#a').attr('src',resultBase64),2000)*/



})(window)


