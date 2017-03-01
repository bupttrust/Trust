/**
 * Created by DGL on 2016/8/4.
 */
require(['jquery','bootstrap'], function($){
    $("#registerbtn").click(function(){
        if($("#id_username").val() == "" || $("#id_password").val() == "" || $("#id_password_2").val() == ""){
            alert("请输入用户名或密码！");
        }
        if ($("#id_password").val() !== $("#id_password_2").val()) {
            alert("输入密码不同！");
        }
        alert("注册成功！");

    });
});