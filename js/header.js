
var url = 'http://192.168.20.15:8280'
var langAjax
//获取浏览器语言
/*var type = navigator.appName;
if (type == "Netscape"){
    var lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
}else{
    var lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
}
var lang = lang.substr(0, 2);//获取浏览器配置语言前两位
if (lang == "zh"){
    //console.log(lang);
    langAjax = 'zh_CN'
    //window.location.replace('url');//中文编码时打开链接
}else if (lang == "en"){
    //console.log(lang);
    langAjax = 'en_US'
}else{//其他语言编码时打开以下链接
    langAjax = 'my_BU'
    //console.log(lang);
}*/

langAjax = $.cookie('language') ? $.cookie('language') : 'zh_CN'

$.cookie('language',langAjax)

var language = $.cookie('language')
    //$.cookie('username');
    //$('.logout').text($.cookie('username')?'退出':'登录')

if($.cookie('username')){
    $('.user').show()
    $('.user span').text($.cookie('username'))
}else{
    $('.user').hide()
}


initHtml()

function initHtml() {
    //$.cookie('language',langAjax)
    //var language = $.cookie('language')
    //console.log($.cookie('language'),$.cookie('username'))
    document.title = lang_data[language].title    //# 设置title的值。

    //设置导航栏
    for(let i=0;i<lang_data[language].menu.length;i++){
        $('.header_left').find(`i:eq(${i})`).text(lang_data[language].menu[i])
    }
    $('.header_right .user i').text(lang_data[language].user)
    $('.logout').text($.cookie('username')?lang_data[language].logout:lang_data[language].login)
    $('.logout').attr('value',$.cookie('username')?'false':'true')
}


//跳转前判断是否登录
function isLogin(){
    if(!$.cookie('username')) {
        layer.msg(lang_data[language].msg_no_login)
        return false;
    }
    return true;
}

//登录
layui.use(['layer', 'form'], function(){
    var layer = layui.layer
        ,form = layui.form;
    var language = $.cookie('language')
    $('.logout').on('click',function () {
        if($('.logout').attr('value')=='true'){
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    $('.layui-layer-btn0').click()
                }
            })
            layer.open({
                skin: 'layui-layer-my',
                type:0,
                //title:false,
                title: [lang_data[language].login,'font-size:16px;border-radius: 8px 8px 0 0;'],
                content: '<div class="login_input"><label>'+lang_data[language].username+'<input type="text" class="username"></label></div>' +
                '<div class="login_input"><label>'+lang_data[language].password+'<input type="password" class="pwd"></label>' +
                '</div><p class="tips" style="color:#bb0000;margin-left:8px;"></p>',
                btn: lang_data[language].confirm,
                closeBtn: 2,
                shadeClose:true,
                resize:false,
                yes: function(index, layero){
                    //console.log(index, layero)
                    var username = $('.username').val()
                    var pwd = $('.pwd').val()
                    if(!username){
                        $('.tips').text(lang_data[language].input_user)
                        return
                    }
                    if(!pwd){
                        $('.tips').text(lang_data[language].input_pwd)
                        return
                    }
                    //layer.close(index);
                    $.ajax({
                        url: url + '/zzcismp/user/login.shtml',
                        async:false,
                        cache:false,
                        dataType:'jsonp',
                        data:{username:username,password:pwd,language:language},
                        success:function (res) {
                            //console.log(res)
                            if(res.status===1){
                                layer.msg(lang_data[language].login_right,{time: 2000})
                                $.cookie('username',res.username,{ path: '/'})
                                setTimeout(function () {
                                    location.reload()
                                },2000)
                            }else{
                                $('.tips').text(lang_data[language].login_wrong)
                                return
                            }

                        },
                        error:function () {
                            layer.msg(lang_data[language].network_wrong)
                        }

                    })
                }
            })
        }else if($('.logout').attr('value')=='false'){
            $.removeCookie('username',{ path: '/'})
            layer.msg(lang_data[language].exit_s,{time: 2000})
            setTimeout(function () {
                location.href = './index.html'
                //location.reload()
            },2000)
        }
    })


});
//导航
layui.use('element', function(){
    var element = layui.element;
});
//语言切换
function changeLang(lang){
    //console.log(lang)
    if(lang == 'zh'){
        langAjax = 'zh_CN'
        $.cookie('language',langAjax)
        //console.log($.cookie('language'))
        initHtml()
        location.reload()
    }else if(lang == 'en'){
        langAjax = 'en_US'
        $.cookie('language',langAjax)
        //console.log($.cookie('language'))
        initHtml()
        location.reload()
    }else if(lang == 'my'){
        langAjax = 'my_MM'
        $.cookie('language',langAjax)
        //console.log($.cookie('language'))
        initHtml()
        location.reload()
    }
}


