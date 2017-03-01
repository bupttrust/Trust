require(['jquery','bootstrap'], function($) {
    //判断任务类型跳转到不同测试报告
    if ($("#task_type").text()=="回归测试"){
        $("#regressionReport").css("display", "block");
        $("#jobStreamEnvironmentInfo").css("display", "none");
        $("#nodeStatus").css("display", "none");

    }
    if ($("#task_type").text()=="单作业基准测试"){
        $("#report").css("display", "block");
    }

    var parameters=['系统CPU利用率', '用户CPU利用率', 'CPU空闲率',
        '磁盘读速率', '磁盘写速率', '每秒钟磁盘IO次数', 'IO请求平均等待时间', 'IO请求平均服务时间', 'IO请求平均队列长度',
        '交换区使用率', '空闲交换区', '活跃交换区',  '总内存大小', '内存使用率', '活跃内存', '空闲内存', '总交换区大小',
        '网络接收速度', '网络发送速度', '网卡发送速度','网卡接收速度',
        '网络文件系统接收量','网络文件系统发送量','网络文件系统发送包数量','网络文件系统接收包数量'];

    var analysis_data;
    var collect_data;
    var app_cpu={};
    var app_io = {};
    var app_memory = {};
    var app_network = {};
    var app_nfs = {};

    //var status = $("#task_status").text().substr(5,5)
    var status = $("#task_status").text()

    function collectDataProcess(){
        var parameter_selected=[];
        var parameter_selected_val=[];
        var parameter_selected_cpu=[];
        var parameter_selected_io=[];
        var parameter_selected_memory=[];
        var parameter_selected_network=[];
        var parameter_selected_nfs=[];
        $("#collect_start").attr("disabled", true);
        $("#analysis_start").attr("disabled",false);

        if (!!$("#cpu_panel tbody tr").length) {
            $("#cpu_panel").css("display", "block");
            $.each($("#cpu_panel tbody tr .parameter-name"), function(index, val) {
                parameter_selected.push($(this).text());
                parameter_selected_cpu.push($(this).text());
            });
        }
        if (!!$("#io_panel tbody tr").length) {
            $("#io_panel").css("display", "block");
            $.each($("#io_panel tbody tr .parameter-name"), function(index, val) {
                parameter_selected.push($(this).text());
                parameter_selected_io.push($(this).text());
            });
        }
        if (!!$("#memory_panel tbody tr").length) {
            $("#memory_panel").css("display", "block");
            $.each($("#memory_panel tbody tr .parameter-name"), function(index, val) {
                parameter_selected.push($(this).text());
                parameter_selected_memory.push($(this).text());
            });
        }
        if (!!$("#network_panel tbody tr").length) {
            $("#network_panel").css("display", "block");
            $.each($("#network_panel tbody tr .parameter-name"), function(index, val) {
                parameter_selected.push($(this).text());
                parameter_selected_network.push($(this).text());
            });
        }
        if (!!$("#nfs_panel tbody tr").length) {
            $("#nfs_panel").css("display", "block");
            $.each($("#nfs_panel tbody tr .parameter-name"), function(index, val) {
                parameter_selected.push($(this).text());
                parameter_selected_nfs.push($(this).text());
            });
        }
        for(var i=0;i<25;i++){
            parameter_selected_val[i]=new Array();
        }

        collect_data = window.setInterval(function(){
            $.ajax({
                url:'/task/collectTimer/',
                type:'post',
                data: {
                    "newStatus":"collect_timer",
                    "taskid":$("#taskid").val(),
                    "parameter":parameter_selected.join(","),
                },
                success:function (data) {
                    var jsonObj = eval('('+data+')')["content"];
                    for(var i=0;i<jsonObj.length;i++){
                        var parameter=jsonObj[i]["key"];
                        var index=parameters.indexOf(parameter);
                        var values=jsonObj[i]["value"];
                        parameter_selected_val[index].push(values[0],values[1],values[2],values[3],values[4]);
                    }
                }
            })
        },5000);   // 创建定时执行程序

        var eCharts;
        require.config({
        packages: [
            {
                name: 'zrender',
                location: 'zrender-master/src', // zrender与echarts在同一级目录
                main: 'zrender'
            },
            {
                name: 'echarts',
                location: 'echarts-master/src',
                main: 'echarts'
            }
        ]
    });
        require([
            'echarts',
            'echarts/chart/line',
            'echarts/component/legend',
            'echarts/component/axis',
            //'echarts/component/title',
            'echarts/component/tooltip'

        ], initTask);
        function initTask(ec) {
            eCharts = ec;
            var myChart_cpu = eCharts.init($("#cpu")[0]);
            var option_cpu = {
                tooltip: {
                    trigger: 'axis',
                },
                legend: {
                    data: parameter_selected_cpu,
                },
                xAxis: [
                {
                    type: 'category',
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
                ],
                yAxis: {
                    type: 'value',
                    scale: true,
                },
                grid:{
                    containLabel: true
                },
                series: []
            };
            for(var i=0;i<parameter_selected_cpu.length;i++){
                option_cpu.series[i]={};
                option_cpu.series[i].name=parameter_selected_cpu[i];
                option_cpu.series[i].type="line";
                option_cpu.series[i].data=function () {
                    var res = [];
                    var len = 200;
                    while (len--) {
                        res.push(0);
                    }
                    return res;
                }();
            }
            clearInterval(app_cpu.timeTicket);
            app_cpu.timeTicket = setInterval(function () {
                $.each($("#cpu_panel tbody tr .parameter-value"), function(index, val) {
                    var parameter = $(this).attr("id");
                    var index=parameters.indexOf(parameter);
                    $(this).text(parameter_selected_val[index][0]);
                    parameter_selected_val[index].shift();
                });
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);

            var firsttr=$("#CPU").children(":eq(0)");
	        var nexttr=firsttr;
	        for(var i=0;i<parameter_selected_cpu.length;i++){
		        if(i!=0){
			        nexttr=nexttr.nextAll().eq(0);
		        }
                var data=option_cpu.series[i].data;
                data.shift();
                data.push(nexttr.children(":eq(1)").text());
	        }

            option_cpu.xAxis[0].data.shift();
            option_cpu.xAxis[0].data.push(axisData);
            myChart_cpu.setOption(option_cpu);
        }, 1000);

            var myChart_io = eCharts.init($("#io")[0]);
            var option_io = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: parameter_selected_io,
            },
            xAxis: [
                {
                    type: 'category',
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
            },
            grid:{
                containLabel: true
            },
            series: []
        };
            for(var i=0;i<parameter_selected_io.length;i++){
                option_io.series[i]={};
                option_io.series[i].name=parameter_selected_io[i];
                option_io.series[i].type="line";
                option_io.series[i].data=function () {
                    var res = [];
                    var len = 200;
                    while (len--) {
                        res.push(0);
                    }
                    return res;
                }();
            }
            clearInterval(app_io.timeTicket);
            app_io.timeTicket = setInterval(function () {
                $.each($("#io_panel tbody tr .parameter-value"), function(index, val) {
                var parameter = $(this).attr("id");
                var index=parameters.indexOf(parameter);
                $(this).text(parameter_selected_val[index][0]);
                parameter_selected_val[index].shift();
                });
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);

            var firsttr=$("#IO").children(":eq(0)");
	        var nexttr=firsttr;
	        for(var i=0;i<parameter_selected_io.length;i++){
		        if(i!=0){
			        nexttr=nexttr.nextAll().eq(0);
		        }
                var data=option_io.series[i].data;
                data.shift();
                data.push(nexttr.children(":eq(1)").text());
	        }

            option_io.xAxis[0].data.shift();
            option_io.xAxis[0].data.push(axisData);
            myChart_io.setOption(option_io);
        }, 1000);

        var myChart_memory = eCharts.init($("#memory")[0]);
        var option_memory = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: parameter_selected_memory,
            },
            xAxis: [
                {
                    type: 'category',
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            grid:{
                containLabel: true
            },
            yAxis: {
                type: 'value',
                scale: true,
            },
            series: []
        };
        for(var i=0;i<parameter_selected_memory.length;i++){
                option_memory.series[i]={};
                option_memory.series[i].name=parameter_selected_memory[i];
                option_memory.series[i].type="line";
                option_memory.series[i].data=function () {
                    var res = [];
                    var len = 200;
                    while (len--) {
                        res.push(0);
                    }
                    return res;
                }();
            }
        clearInterval(app_memory.timeTicket);
        app_memory.timeTicket = setInterval(function () {
            $.each($("#memory_panel tbody tr .parameter-value"), function(index, val) {
                var parameter = $(this).attr("id");
                var index=parameters.indexOf(parameter);
                $(this).text(parameter_selected_val[index][0]);
                parameter_selected_val[index].shift();
            });
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);

            var firsttr=$("#Memory").children(":eq(0)");
	        var nexttr=firsttr;
	        for(var i=0;i<parameter_selected_memory.length;i++){
		        if(i!=0){
			        nexttr=nexttr.nextAll().eq(0);
		        }
                var data=option_memory.series[i].data;
                data.shift();
                data.push(nexttr.children(":eq(1)").text());
	        }

            option_memory.xAxis[0].data.shift();
            option_memory.xAxis[0].data.push(axisData);
            myChart_memory.setOption(option_memory);
        }, 1000);

        var myChart_network = eCharts.init($("#network")[0]);
        var option_network = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data: parameter_selected_network,
            },
            xAxis: [
                {
                    type: 'category',
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
            },
            grid:{
                containLabel: true
            },
            series: []
        };
        for(var i=0;i<parameter_selected_network.length;i++){
                option_network.series[i]={};
                option_network.series[i].name=parameter_selected_network[i];
                option_network.series[i].type="line";
                option_network.series[i].data=function () {
                    var res = [];
                    var len = 200;
                    while (len--) {
                        res.push(0);
                    }
                    return res;
                }();
            }
        clearInterval(app_network.timeTicket);
        app_network.timeTicket = setInterval(function () {
            $.each($("#network_panel tbody tr .parameter-value"), function(index, val) {
                var parameter = $(this).attr("id");
                var index=parameters.indexOf(parameter);
                $(this).text(parameter_selected_val[index][0]);
                parameter_selected_val[index].shift();
            });
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);

            var firsttr=$("#Network").children(":eq(0)");
	        var nexttr=firsttr;
	        for(var i=0;i<parameter_selected_network.length;i++){
		        if(i!=0){
			        nexttr=nexttr.nextAll().eq(0);
		        }
                var data=option_network.series[i].data;
                data.shift();
                data.push(nexttr.children(":eq(1)").text());
	        }

            option_network.xAxis[0].data.shift();
            option_network.xAxis[0].data.push(axisData);
            myChart_network.setOption(option_network);
        }, 1000);

        var myChart_nfs = eCharts.init($("#nfs")[0]);
        var option_nfs = {
            tooltip: {
                trigger: 'axis',
            },
            legend: {
                data:parameter_selected_nfs
            },
            xAxis: [
                {
                    type: 'category',
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
            },
            grid:{
                containLabel: true
            },
            series: []
        };
        for(var i=0;i<parameter_selected_nfs.length;i++){
                option_nfs.series[i]={};
                option_nfs.series[i].name=parameter_selected_nfs[i];
                option_nfs.series[i].type="line";
                option_nfs.series[i].data=function () {
                    var res = [];
                    var len = 200;
                    while (len--) {
                        res.push(0);
                    }
                    return res;
                }();
            }
        clearInterval(app_nfs.timeTicket);
        app_nfs.timeTicket = setInterval(function () {
            $.each($("#nfs_panel tbody tr .parameter-value"), function(index, val) {
                var parameter = $(this).attr("id");
                var index=parameters.indexOf(parameter);
                $(this).text(parameter_selected_val[index][0]);
                parameter_selected_val[index].shift();
            });
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);

            var firsttr=$("#NFS").children(":eq(0)");
	        var nexttr=firsttr;
	        for(var i=0;i<parameter_selected_nfs.length;i++){
		        if(i!=0){
			        nexttr=nexttr.nextAll().eq(0);
		        }
                var data=option_nfs.series[i].data;
                data.shift();
                data.push(nexttr.children(":eq(1)").text());
	        }

            option_nfs.xAxis[0].data.shift();
            option_nfs.xAxis[0].data.push(axisData);
            myChart_nfs.setOption(option_nfs);
        }, 1000);
    }
    };


    if(status==="数据采集中"){
        collectDataProcess();
    }

    if(status==="特征分析中"){
        $("#collect_start").attr("disabled", true);
        $("#analysis_start").attr("disabled", true);
        $("#task_cancel").attr("disabled", false);
        $(".report").attr("disabled", true);
        
        analysis_data = window.setInterval(function(){
            $.ajax({
                url:'/task/analysisTimer/',
                type:'post',
                data: {
                    "newStatus":"analysis_timer",
                    "taskid":$("#taskid").val(),
                },
                success:function (data) {

                    console.log(data);
                    data=data.split('|');
                    if(data[1]){
                      for(i=1; i<data.length; i++){
                        log=data[i].split(',');
                        log_level=log[0];
                        log_info=log[1];
                        $color_el='black';
                        if(log_level=="Warning")
                          $color_el='orange';
                        if(log_level=="Error")
                          $color_el='red';
                        var $el=$('<li style="color:'+$color_el+'">【'+log_level+'】    '+log_info+'</li>');
                        $el.appendTo($("ul#logs"));
                        $('#log_body').animate({scrollTop:$el.offset().top});
                        if(log_level=="Error"){
                          $("#analysis_start").attr("disabled", false);
                          $("#task_cancel").attr("disabled", true);
                          window.clearInterval(analysis_data);
                        }
                      }
                    }
                    if(data[0]=='OK'){
                      $("#task_status").html('任务已完成');
                      $("#collect_start").attr("disabled", true);
                      $("#analysis_start").attr("disabled", true);
                      $("#task_cancel").attr("disabled", true);
                      $(".report").attr("disabled", false);
                      window.clearInterval(analysis_data);
                    }

/*
                    log_level=data.split('|')[0];
                    log_info=data.split('|')[1];
                    console.log(log_level);
                    if(log_level==="Info"){
                        window.location.reload();
                    }
                    else if(log_level==="Error"){
                      $("#log_level").html(log_level);
                      $("#log_info").html(log_info);
                      document.getElementById('log_level').style.color='red';
                      document.getElementById('log_info').style.color='red';
                      $("#analysis_start").attr("disabled", false);
                      $("#task_cancel").attr("disabled", true);
                      window.clearInterval(analysis_data);
                    }
                    else{
                      $("#log_level").html(log_level);
                      $("#log_info").html(log_info);
                      document.getElementById('log_level').style.color='orange';
                      document.getElementById('log_info').style.color='orange';
                    }*/
                }
            })
        },5000);   // 创建定时执行程序
    }

    if(status==="任务已完成"){
        window.clearInterval(analysis_data);
        $("#collect_start").attr("disabled", true);
        $("#analysis_start").attr("disabled", true);
        $("#task_cancel").attr("disabled", true);
        $(".report").attr("disabled", false);
    }

    if(status==="任务已取消"){
        $("#collect_start").attr("disabled", true);
        $("#analysis_start").attr("disabled", true);
        $("#task_cancel").attr("disabled", true);
        $(".report").attr("disabled", true);
        console.log("jajajajj");
    }

      //开始采集按钮
    $("#collect_start").click(function() {
        var dateStr = new Date().toTimeString().split(" ")[0];
        $.ajax({
            url:'/task/updateStatus/',
            type:'post',
            data: {
                "newStatus":"collect_start",
                "taskid":$("#taskid").val(),
                "start_time":dateStr
            },
            success:function (data) {
                $("#start_time").text(dateStr);
                $("#task_status").text("数据采集中");
            }
        })

        collectDataProcess();
    });

     //开始分析按钮
    $("#analysis_start").click(function() {

        $.ajax({
            url:'/task/updateStatus/',
            type:'post',
            data: {
                "taskid":$("#taskid").val(),
                "newStatus":"analysis_start"
            },
            success:function (data) {
                window.location.reload();
                $("#task_status").text("特征分析中");
            }
        })
        $("#analysis_start").attr("disabled", true);
        analysis_data = window.setInterval(function(){
            $.ajax({
            url:'/task/analysisTimer/',
            type:'post',
            data: {
                "newStatus":"analysis_timer",
                "taskid":$("#taskid").val(),
            },
            success:function (data) {
                console.log(data);
                if(data==="completed"){
                    window.location.reload();
                }
            }
            })
        },5000);   // 创建定时执行程序

        window.clearInterval(collect_data);    // 在跳转之前调用，以清除定时执行程序
        clearInterval(app_cpu.timeTicket);
        clearInterval(app_io.timeTicket);
        clearInterval(app_memory.timeTicket);
        clearInterval(app_network.timeTicket);
        clearInterval(app_nfs.timeTicket);

    });

     //取消任务按钮
    $("#task_cancel").click(function() {

         $.ajax({
            url:'/task/updateStatus/',
            type:'post',
            data: {
                "taskid":$("#taskid").val(),
                "newStatus":"task_cancel"
            },
            success:function (data) {
                $("#task_status").text("任务已取消");
            }
        })
        $("#task_cancel").attr("disabled", true);
        window.clearInterval(analysis_data);
    });

});
