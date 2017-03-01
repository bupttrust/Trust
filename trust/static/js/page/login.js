/**
 * Created by DGL on 2016/8/4.
 */
require(['jquery','bootstrap'], function($) {
    $("#loginbtn").click(function(){
        if($("#id_username").val()=="" || $("#id_password").val()==""){
            alert("请输入用户名或密码！");
        }
        $.ajax({
            url: '/loginSubmit/',
            type: 'POST',
            async: false,
            success:function (data) {
                console.log(data);
                if(data=="ok"){
                    window.open("");
                }else if(data=="wrong password"){
                    alert("密码错误！");
                }else if(data=="wrong username"){
                    alert("用户不存在！");
                }else{
                    window.location.reload();
                }
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        });

    });


});