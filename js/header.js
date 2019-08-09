
//var url = 'http://36.110.66.217:9090'
var url = 'http://192.168.20.15:8280'

//$.cookie('username');
$('.logout').text($.cookie('username')?'退出':'登录')
if($.cookie('username')){
    $('.user').show()
    $('.user span').text($.cookie('username'))
}else{
    $('.user').hide()
}
//获取浏览器语言
var type = navigator.appName;
var langAjax
if (type == "Netscape"){
    var lang = navigator.language;//获取浏览器配置语言，支持非IE浏览器
}else{
    var lang = navigator.userLanguage;//获取浏览器配置语言，支持IE5+ == navigator.systemLanguage
}
var lang = lang.substr(0, 2);//获取浏览器配置语言前两位
if (lang == "zh"){
    //console.log(lang);
    langAjax = 'en_US'
    //window.location.replace('url');//中文编码时打开链接
}else if (lang == "en"){
    //console.log(lang);
    langAjax = 'zh_CN'
}else{//其他语言编码时打开以下链接
    console.log(lang);
}

//跳转前判断是否登录
function isLogin(){
    if(!$.cookie('username')) {
        layer.msg("没有登录或超时,请登录")
        return false;
    }
    return true;
}


layui.use(['layer', 'form'], function(){
    var layer = layui.layer
        ,form = layui.form;

    $('.logout').on('click',function () {
        if($('.logout').text()=='登录'){
            $(document).keyup(function(event){
                if(event.keyCode ==13){
                    $('.layui-layer-btn0').click()
                }
            })
            layer.open({
                skin: 'layui-layer-my',
                type:0,
                //title:false,
                title: ['登录','font-size:16px;border-radius: 8px 8px 0 0;'],
                content: '<div class="login_input"><label>用户<input type="text" class="username"></label></div>' +
                '<div class="login_input"><label>密码<input type="password" class="pwd"></label>' +
                '</div><p class="tips" style="color:#bb0000;margin-left:8px;"></p>',
                //btn: '确&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;认',
                closeBtn: 2,
                shadeClose:true,
                resize:false,
                yes: function(index, layero){
                    //console.log(index, layero)
                    var username = $('.username').val()
                    var pwd = $('.pwd').val()
                    if(!username){
                        $('.tips').text("请输入用户名")
                        return
                    }
                    if(!pwd){
                        $('.tips').text("请输入密码")
                        return
                    }
                    //layer.close(index);
                    $.ajax({
                        url: url + '/zzcismp/user/login.shtml',
                        async:false,
                        cache:false,
                        dataType:'jsonp',
                        data:{username:username,password:pwd,language:langAjax},
                        success:function (res) {
                            console.log(res)
                            if(res.status===1){
                                layer.msg("登录成功",{time: 2000})
                                $.cookie('username',res.username,{ path: '/'}) //language:'en_US'
                                $.cookie('language',langAjax,{ path: '/'})
                                setTimeout(function () {
                                    location.reload()
                                },2000)
                            }else{
                                $('.tips').text("用户名或密码错误")
                                return
                            }

                        },
                        error:function () {
                            layer.msg("请检查您的网络")
                        }

                    })
                }
            });
        }else if($('.logout').text()=='退出'){
            $.removeCookie('username',{ path: '/'})
            layer.msg("退出成功",{time: 2000})
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


