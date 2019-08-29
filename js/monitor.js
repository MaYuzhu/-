
(function (w) {
    var language = $.cookie('language')
    if(!$.cookie('username')) {
        location.href = './index.html'
    }

    //console.log($.cookie('language'))
    var unitName = {
        D: { name: lang_data[language].D, unit: "mm", print: ['a', 'b'] ,id:"jingli"},//静力水准仪
        C: { name: lang_data[language].C, unit: "mm", print: ['val_x'] ,id:"liefeng"},//裂缝计
        A: { name: lang_data[language].A, unit: "rad", print: ['x','y'] ,id:"qingjiao"},//倾角计
    }

    //设备布置图的标题
    $('.right .one .legend>:first-child').text(lang_data[language].ta1_name)
    $('.right .two .legend>:first-child').text(lang_data[language].ta2_name)

    $('.right .one .legend .icon_0 i').text(lang_data[language].A)
    $('.right .one .legend .icon_1 i').text(lang_data[language].C)
    $('.right .one .legend .icon_2 i').text(lang_data[language].D)

    $('.right .two .legend .icon_0 i').text(lang_data[language].A)
    $('.right .two .legend .icon_1 i').text(lang_data[language].C)

    var ajaxData = {
        allDevs:{
            buildcode : '1040B0001',
            starttime : sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24)),
            endtime : sys.dateFormat(sys.dateAdd(new Date(), 0)),
            timetype : "hour",
            language:$.cookie('language')
        },
        devs:{
            buildcode : '1040B0001',
            starttime : sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24)),
            endtime : sys.dateFormat(sys.dateAdd(new Date(), 0)),
            timetype : "hour",
            devicetype : 'A',
            language:$.cookie('language'),
        },
        dev:{
            starttime : sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24)),
            endtime : sys.dateFormat(sys.dateAdd(new Date(), 0)),
            timetype : "hour",
            devcode : " ",
            language:$.cookie('language')
        }

    }
    //console.log($.cookie('language'))

    //获取塔名与设备  http://192.168.20.15:8280/zzcismp/base/getProBuildsDevs.shtml?projcode=10400010&language=zh_CN
    $.ajax({
        url: url + '/zzcismp/base/getProBuildsDevs.shtml',
        async:true,
        cache:false,
        dataType:'jsonp',
        data:{
            projcode:'10400010',
            language:$.cookie('language')
        },
        success:function (json) {
            //console.log(json)
            if(json.builds instanceof Array && json.builds !== null){
                for(let ai=0;ai<json.builds.length;ai++){
                    $(`.left h2:eq(${ai})>p`).text(json.builds[ai].buildname)
                    let newArrA = []
                    //console.log(formateArrData(json.builds[i].devs, 'type', newArrA))
                    formateArrData(json.builds[ai].devs, 'type', newArrA)
                    //console.log(newArrA)
                    $(`.left .layui-colla-content:eq(${ai})`).empty()
                    //$('.layui-colla-content').empty()
                    for(let j=0;j<newArrA.length;j++){
                        //console.log(newArrA[j][0].type)
                        $(`.left .layui-colla-content:eq(${ai})`).append(`
                        <div class="group">
                            <p value=${newArrA[j][0].type} class="title_dev_name active">${unitName[newArrA[j][0].type].name}</p>
                            <ul></ul>
                        </div>`)

                        for(let k=0;k<newArrA[j].length;k++){
                            $(`.left .layui-colla-content:eq(${ai}) ul:eq(${j})`).append(`
                                <li value=${newArrA[j][k].devcode}>${newArrA[j][k].devname}</li>
                            `)
                            //塔加标记
                            $(`.ta_img${ai+1}>:nth-child(1),.ta_img${ai+1}>:nth-child(2)`).append(`
                                <div style="width: 12px;height: 12px" class='icon_${j} icon_${j}${k}'></div>
                            `)
                        }
                    }

                }
                $('.layui-colla-content li').each(function (index) {
                    $(this).click(function(){
                        $(this).parent().siblings().removeClass('active')
                        $(this).siblings().removeClass('active')
                        $(this).addClass('active')
                        //alert($(this).parent().siblings().attr('value'))
                        ajaxData.dev.devcode = $(this).attr('value')
                        var time_type = $(`.btn_yue[value=${$(this).parent().siblings().attr('value')}] .bg_blue`).attr('value')
                        //console.log($(this).parent().siblings().attr('value'))
                        ajaxData.dev.timetype = time_type
                        if(time_type == 'hour'){
                            ajaxData.dev.starttime = sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24))
                        }else {
                            ajaxData.dev.starttime = sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24 * 30))
                        }

                        devData($(this).parent().siblings().attr('value'))
                        var a1 = ($(this).attr('value').substr($(this).attr('value').length-1,1))*1
                        var a2 = ($(this).attr('value').substr($(this).attr('value').length-3,1))
                        switch (a2){
                            case 'A':
                                a2 = '0'
                                $('.shadow>.icon_0').siblings().hide()
                                $(`.shadow>.icon_${a2}${a1-1}`).show()
                                console.log(`.shadow>div.icon_${a2}${a1-1}`)
                                break
                            case 'C':
                                a2 = '1'
                                $('.shadow>.icon_1').siblings().hide()
                                $(`.shadow>.icon_${a2}${a1-1}`).show()
                                break
                            case 'D':
                                a2 = '2'
                                $('.shadow>.icon_2').siblings().hide()
                                $(`.shadow>.icon_${a2}${a1-1}`).show()
                                break
                            default:
                                a2 = null
                        }

                    })
                })
                $('.title_dev_name').each(function (index){
                    $(this).click(function(){
                        $(this).siblings().children().removeClass('active')
                        $(this).addClass('active')
                        //alert($(this).attr('value'))
                        ajaxData.devs.devicetype = $(this).attr('value')
                        devsData()
                        //显示设备位置
                        switch ($(this).attr('value')){
                            case 'A':
                                $('.shadow>div.icon_0').siblings().hide()
                                $('.shadow>div.icon_0').show()
                                break;
                            case 'C':
                                $('.shadow>div.icon_1').siblings().hide()
                                $('.shadow>div.icon_1').show()
                                break;
                            case 'D':
                                $('.shadow>div.icon_2').siblings().hide()
                                $('.shadow>div.icon_2').show()
                                break;
                            default:
                                $('.shadow>div.icon_0').hide()
                        }
                    })
                })
                $('#ta1 ,#ta2').click(function () {
                    $('.ta_img1>.shadow>div, .ta_img2>.shadow>div').hide()
                })

            }else if(json.status == 5){
                //layer.msg("没有登录或登录超时,请重新登录")
                layer.msg(lang_data[language].msg_no_login)
                location.href = './index.html'
            }
        },
        error:function () {
            layer.msg(lang_data[language].network_wrong)
        }
    })


    //获取所有设备数据
    function allData(){
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
            data:ajaxData.allDevs,
            success:function (json) {
                //console.log(json)
                let newArrA = []
                formateArrData(json, 'type', newArrA)
                //console.log(newArrA)
                var xData = []
                var devName = []
                var cData = []
                $('.right_content').empty()
                for(let i=0;i<newArrA.length;i++){
                    $('.right_content').append(`
                <p class="title_dev">${unitName[newArrA[i][0].type].name}</p>
                <div class="data_dev shadow">
                    <p class="btn_yue" value=${newArrA[i][0].type}>
                        <span value="day" class="layui-btn layui-btn-primary layui-btn-sm">
                            ${lang_data[language].month}
                        </span>
                        <span value="hour" class="layui-btn layui-btn-primary layui-btn-sm bg_blue">
                            ${lang_data[language].day}
                        </span>
                    </p>
                    <div id=${unitName[newArrA[i][0].type].id}></div>
                </div>`)
                    //数据处理
                    var xDataJly = []
                    var devNameJly = []
                    var cJly = []
                    var findMax = [];
                    for(let maxD=0;maxD<newArrA[i].length;maxD++){
                        findMax.push(newArrA[i][maxD].data.length)
                    }
                    for(let j=0;j<newArrA[i][indexOfArr(findMax)].data.length;j++){
                        xDataJly.push(newArrA[i][indexOfArr(findMax)].data[j].time.substring(5,16))
                    }
                    for(let k=0;k<newArrA[i].length;k++){
                        for(let m=0;m<unitName[newArrA[i][0].type].print.length;m++){
                            devNameJly.push(newArrA[i][k].devname +'-'+ unitName[newArrA[i][0].type].print[m])
                            var data_a = []
                            for(let l=0;l<newArrA[i][k].data.length;l++){
                                data_a.push(newArrA[i][k].data[l].data[unitName[newArrA[i][0].type].print[m]])
                            }
                            cJly.push({
                                name:newArrA[i][k].devname  +'-'+ unitName[newArrA[i][0].type].print[m],
                                type: 'line',
                                stack:'总量' + k + unitName[newArrA[i][0].type].print[m],
                                data:data_a,
                            })
                        }
                    }
                    devName.push(xDataJly)
                    xData.push(xDataJly)
                    cData.push(cJly)
                    createEchart({legendArr:null,xAxisArr:xData[i],seriesArr:cData[i],
                        id:unitName[newArrA[i][0].type].id,unit:unitName[newArrA[i][0].type].unit})
                }

                /*if(json instanceof Array){
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
                            //smooth: true,  折点处圆滑
                            name:Jly[i].devname +'-a',
                            type: 'line',
                            stack:'总量a'+i,
                            data:data_a,
                            //symbol: "none",
                            /!*itemStyle:{  //点上显示值
                                normal:{
                                    label:{show:true}
                                }
                            },
                            showAllSymbol:true*!/
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
                }else {
                    alert("请检查您的网络")
                }*/
                $('.btn_yue').on('click',function (event) {
                    var target = $(event.target)
                    target.addClass('bg_blue')
                    target.siblings().removeClass('bg_blue')
                    //alert(target.parent().attr('value'))
                    if(target.attr('value')=='day'){
                        ajaxData.devs.starttime = sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24 * 30))
                        ajaxData.dev.starttime = sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24 * 30))
                        ajaxData.devs.timetype = "day"
                        ajaxData.dev.timetype = "day"
                    }else if(target.attr('value')=='hour'){
                        ajaxData.devs.starttime = sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24))
                        ajaxData.dev.starttime = sys.dateFormat(sys.dateAdd(new Date(), -3600 * 24))
                        ajaxData.devs.timetype = "hour"
                        ajaxData.dev.timetype = "hour"
                    }
                    ajaxData.devs.devicetype = target.parent().attr('value')

                    var taNum = 'ta'+ajaxData.allDevs.buildcode

                    if($(`.${taNum} p[value=${target.parent().attr('value')}]`).is('.active')){
                        devsData()
                    }else {
                        devData(target.parent().attr('value'))
                    }
                })
            },
            error:function () {
                alert("请检查您的网络")
            }
        })
    }
    allData()
    //获取某一类设备数据
    function devsData(){
        $.ajax({
            url: url + '/zzcismp/tsd/getBuildDevsDataByType.shtml',
            async:true,
            cache:false,
            dataType:'jsonp',
            data:ajaxData.devs,
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
                        id:unitName[json[0].type].id,unit:unitName[json[0].type].unit})
                }

            },
            error:function () {
                layer.msg(lang_data[language].network_wrong)
            }
        })
    }
    //获取某一个设备数据
    function devData(id){
        $.ajax({
            url: url + '/zzcismp/tsd/getDevData.shtml',
            async:true,
            cache:false,
            dataType:'jsonp',
            data:ajaxData.dev,
            success:function (json) {
                //console.log(json)
                if(json.data.length>1){
                    var xData = []
                    var devName = []
                    var cDev = []
                    for(let i=0;i<json.data.length;i++){
                        xData.push(json.data[i].time.substring(5,16))
                    }
                    for(let m=0;m<unitName[json.type].print.length;m++){
                        devName.push(json.devname +'-'+ unitName[json.type].print[m])
                        var data_a = []
                        for(let l=0;l<json.data.length;l++){
                            data_a.push(json.data[l].data[unitName[json.type].print[m]])
                        }
                        cDev.push({
                            name:json.devname  +'-'+ unitName[json.type].print[m],
                            type: 'line',
                            stack:'总量' + m + unitName[json.type].print[m],
                            data:data_a,
                        })
                    }
                    createEchart({legendArr:devName,xAxisArr:xData,seriesArr:cDev,
                        id:unitName[id].id,unit:unitName[json.type].unit})
                }else {
                    layer.msg(lang_data[language].no_data)
                }

            },
            error:function () {
                layer.msg(lang_data[language].network_wrong)
            }
        })
    }

    //监听折叠
    layui.use(['element', 'layer'], function () {
        var element = layui.element
        var layer = layui.layer
        //监听折叠
        element.on('collapse', function (data) {
            //layer.msg('展开状态：' + data.show);
            if(data.title.context.id=='ta1' && data.show){
                //layer.msg('1打开')
                $('.one').removeClass('show_no')
                $('.two').addClass('show_no')
                ajaxData.allDevs.buildcode = '1040B0001'
                $('.ta1040B0001 .title_dev_name').addClass('active')
                $('.ta1040B0001 li').removeClass('active')
                allData()
            }else if(data.title.context.id=='ta2' && data.show){
                //layer.msg('2打开')
                $('.two').removeClass('show_no')
                $('.one').addClass('show_no')
                ajaxData.allDevs.buildcode = '1040B0002'
                $('.ta1040B0002 .title_dev_name').addClass('active')
                $('.ta1040B0002 li').removeClass('active')
                allData()
            }

        })

    })

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

})(window)




/*var l = ['123','456']
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
]*/

/*let tempArr = [
    { domain: 'a', index_name: '云淡风轻' },
    { domain: 'b', index_name: '递归' },
    { domain: 'c', index_name: '云淡风轻' },
    { domain: 'd', index_name: '遍历' },
    { domain: 'e', index_name: '云淡' },
    { domain: 'f', index_name: '云淡风轻' },
    { domain: 'g', index_name: '递归' },
    { domain: 'h', index_name: '云淡风轻' },
    { domain: 'i', index_name: '云淡' },
    { domain: 'j', index_name: '递归' }
]*/
