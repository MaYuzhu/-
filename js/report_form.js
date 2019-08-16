(function (w) {

    var language = $.cookie('language')

    //html文字
    $('.date_form i:eq(0)').text(lang_data[language].start_time)
    $('.date_form i:eq(1)').text(lang_data[language].end_time)

    $('.shengcheng').text(lang_data[language].btn_generating)
    $('.xiazai a').text(lang_data[language].btn_down)

    layui.use('laydate', function(){
        var laydate = layui.laydate

        //执行一个laydate实例
        laydate.render({
            elem: '#start' ,//指定元素
            lang: lang_data[language].layer_lang
        })
        laydate.render({
            elem: '#end', //指定元素
            lang: lang_data[language].layer_lang
        })
    })
    //下载报表
    jQuery(document).ready(function($) {
        $("a.word_export").click(function(event) {
            alert(123)
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


