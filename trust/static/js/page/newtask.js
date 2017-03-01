require(['jquery','bootstrap'], function($) {

    //--------------STEP1任务概述-----------//
    var TaskType = null;
    //选择基准测试
    $(".tab-1 .btn-next-single").click(function() {
        if ($(".tab-1 #TaskName").val() == "" || $(".tab-1 #TaskDescription").val() == "") {
            alert("请填写任务名称或者任务描述");
            return;
        }
        TaskType = "single";
        $(".tab-1").css("display", "none");
        $(".tab-2-1-1").css("display", "block");
    });

    //选择回归测试
    $(".tab-1 .btn-next-regress").click(function() {
        if ($(".tab-1 #TaskName").val() == "" || $(".tab-1 #TaskDescription").val() == "") {
            alert("请填写任务名称或者任务描述");
            return;
        }
        TaskType = "regress";
        $(".tab-1").css("display", "none");
        $(".tab-2-2").css("display", "block");
    });


    //--------------STEP2作业类型-----------//

    //单作业类型 作业流 产品模式
    var jobMode={
            'jobName':'',
            'modeId':''
        };
    $("#jobStream").change(function() {
                var removeTable = $(".selectedStream");
                removeTable.css("display", "none");
                removeTable.removeClass("selectedStream");

                var targetTable = $("#"+$(".tab-2-1-1 select#jobStream option:selected").text());
                targetTable.addClass("selectedStream");
                $(".selectedStream").css("display", "table");
        });


    $(".tab-2-1-1 .btn-next").click(function() {

        if($(".tab-2-1-1 select#jobStream option:selected").text() === "请选择作业流") {
                alert("请选择作业流！");
                return;
            }
        else{

            $.each($(".tab-2-1-1 .selectedStream tbody tr"), function(index, val) {
            var jobName = $(this).children('td').eq(0).text();
            var jobMode = $(this).children('td').eq(1).children("select").children('select option:selected').text();
            var newRow= "<tr><td>"+jobName+"</td><td>"+jobMode+"</td></tr>";
            $('.tab-4 .TaskJobModes tbody').append(newRow);
        });

            $(".tab-2-1-1").css("display", "none");
            $(".tab-5").css("display", "block");

            if (TaskType== "single"){
            $(".tab-5 .body1 tr").each(function(){
                if($(this).find("#node-related").find("br").length>1){
                    $(this).css("display", "none");
                }
            });
            }
        }


    });



    //回归测试
    $(".tab-2-2 .btn-next").click(function() {
        if(!$(".tab-2-2 input#begintime")[0].value || !$(".tab-2-2 input#endtime")[0].value){
            alert("请设置监测时间！");
            return;
        }
        $(".tab-2-2").css("display", "none");
        $(".tab-3-2-2").css("display", "block");
    });



    //--------------STEP3测试环境-----------//

    $(".tab-5 .btn-next").click(function() {

         if($("#well-nodes div")[0]==undefined){
            alert("请选择环境信息！");
            return;
        }
        if($("#well-nodes").children("div").length>1){
            alert("只能选择一个环境！");
            return;
        }

        $(".tab-5").css("display", "none");
        $(".tab-3-1-2").css("display", "block");

        $(".tab-5 .body1 tr").each(function(){
            if($(this).find("#node-related").find("br").length>1){
                $(this).css("display", "none");
            }
        });
    });


    $(".tab-5 .body1 tr").click(function(){
        $(".tab-5 .body1 tr").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".tab-5 .body2").on("click",'tr',function(){
        $(".tab-5 .body2 tr").removeClass("selected");
        $(this).addClass("selected");
    });

    //对部署节点排序
    var sortNodes = function($select) {
        $select.children().sort(function(a, b) {
            var aText = $(a).text().toUpperCase();
            var bText = $(b).text().toUpperCase();
            if (aText > bText) return 1;
            if (aText < bText) return -1;
            return 0;
        }).appendTo($select);
    };

    var addfunction = function() {
        var environment={
            'name':''
        };

         if($(".tab-5 .body1 .selected").length == 0){
                alert("请选择部署环境！");
                return;
            }
            var $outer = $('<div class="col-md-12 clearfix nodeouter"></div>');
            var $nodeWrapper = $("<div class='col-md-8 nodes'></div>");
            var $span=$("<span></span>");
            var $span_fix=$("<span>【部署环境】</span>");

            $nodeWrapper.append($span_fix);
            $nodeWrapper.append($span.append($(".tab-5 .body1 .selected #environment_name").text())).appendTo($outer);
            $("<div class=' node-del'><a class='btn btn-danger btn-sm pull-right' id='xxx'><i class='fa fa-times'></i></a></div>").appendTo($outer);
            $outer.appendTo("#well-nodes");
            environment.name=$(".tab-5 .body1 .selected #environment_name").text();


        $.ajax({
            url: '/newtask/simulationConfig/',
            type: 'post',
            async: false,
            data: JSON.stringify(environment),
            success:function (data) {
                $(".body2").html("");
                for (var i=0; i<data.length;i++) {
                    var $tr = $("<tr class></tr>");
                    var $td = $("<td></td>");
                    var $td_fix=$("<span id='simulationEnvironment_name'></span>");
                    var $td_name=data[i].name;
                    $tr.append($td.append($td_fix.append($td_name)));
                    var $td2 = $("<td></td>");
                    $td_fix=data[i].description;
                    $tr.append($td2.append($td_fix));
                    var $td3 = $("<td></td>");
                    $td_fix=environment.name;
                    $tr.append($td3.append($td_fix)).appendTo(".body2");
                }
            }
        })
        .done(function() {
            console.log("success");
        })
        .fail(function() {
            console.log("error");
        });

        $(".tab-5 select#selected-node-task option:selected").attr("selected", false);
        $(".tab-5 .body1 tr").removeClass("selected");
        $(".tab-5 #well-nodes a").unbind().click(delbutton1);
    };
    var delfunction = function() {
        $(".tab-5 #well-nodes a").each(delbutton1);
    };

    var delbutton1 = function() {
        var $delnode = $(this).parent().prev().children().last().text();
        var $optionWrapper = $("<option>" + $delnode + "</option>");
        $optionWrapper.appendTo(".tab-5 select#rawnodes");
        $(this).parent().parent().remove();
        sortNodes($(".tab-5 #rawnodes"));
        $(".tab-5 #well-environments a").each(delbutton2);
        $(".tab-5 .body2").children().remove();
    }

    $(".tab-5 #addNodestask").unbind().click(addfunction);
    $(".tab-5 #delNodestask").unbind().click(delfunction);

    var addEnvironment = function() {
        $(".tab-2-1-1 select#jobStream option:selected").each(function() {
            if($(".tab-5 .body1 #well-nodes").children.length == 0){
                alert("请选择部署环境！");
                return;
            }
            if($(".tab-5 .body2 .selected").length == 0){
                alert("请选择对比环境！");
                return;
            }
            var $outer = $("<div class='col-md-12 clearfix nodeouter'></div>");
            var $nodeWrapper = $("<div class='col-md-8 nodes'></div>");
            var $span=$("<span class='span'></span>");
            var $span_fix=$("<span>【对比环境】</span>");
            $nodeWrapper.append($span_fix);
            $nodeWrapper.append($span.append($(".tab-5 .body2 .selected #simulationEnvironment_name").text())).appendTo($outer);
            $("<div class=' node-del'><a class='btn btn-danger btn-sm pull-right' id='xxx'><i class='fa fa-times'></i></a></div>").appendTo($outer)
            $outer.appendTo("#well-environments");
        });
        $(".tab-5 select#selected-environment-task option:selected").attr("selected", false);
        $(".tab-5 .body2 tr").removeClass("selected");
        $(".tab-5 #well-environments a").unbind().click(delbutton2);
    };
    var delEnvironment = function() {
        $(".tab-5 #well-environments a").each(delbutton2);
    };

    var delbutton2 = function() {
        $(this).parent().parent().remove();
    };

    $(".tab-5 #addSimulationEnvironment").unbind().click(addEnvironment);
    $(".tab-5 #delSimulationEnvironment").unbind().click(delEnvironment);

    $(".tab-2 .btn-pre").click(function() {
        $(".tab-1").css("display", "block");
        $(".tab-2").css("display", "none");
    });

    //--------------STEP3参数设置-----------//


    //3-1-1选择参数
    $(".tab-3-1-1 .param-level .list-group-item").hover(
        function() {
            var $allSublevel = $(".tab-3-1-1 .param-sublevel");
            var $thisItem = $(".tab-3-1-1 .param-sublevel:eq(" + $(this).index() + ")");
            var $popright = $(".tab-3-1-1 .param-sublevel.pop-right");
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $thisItem.removeClass("pop-right");
                $thisItem.css("display", "none");
                return;
            }
            if ($allSublevel.hasClass("pop-right")) {
                $popright.css("display", "none");
                $popright.removeClass("pop-right");
                $(".tab-3-1-1 .param-level .list-group-item").removeClass("active");
            }
            $thisItem.addClass("pop-right");
            $thisItem.css("display", "block");
            $(this).addClass("active");
        },
        //不能去掉，不知道为什么，不然弹出不工作
        function() {}
    );

    $(".tab-3-2-1 .param-level .list-group-item").hover(
        function() {
            var $allSublevel = $(".tab-3-2-1 .param-sublevel");
            var $thisItem = $(".tab-3-2-1 .param-sublevel:eq(" + $(this).index() + ")");
            var $popright = $(".tab-3-2-1 .param-sublevel.pop-right");
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $thisItem.removeClass("pop-right");
                $thisItem.css("display", "none");
                return;
            }
            if ($allSublevel.hasClass("pop-right")) {
                $popright.css("display", "none");
                $popright.removeClass("pop-right");
                $(".tab-3-2-1 .param-level .list-group-item").removeClass("active");
            }
            $thisItem.addClass("pop-right");
            $thisItem.css("display", "block");
            $(this).addClass("active");
        },
        //不能去掉，不知道为什么，不然弹出不工作
        function() {}
    );
    //-------------Step4 参数设置 自定义与系统选择------- //
    $(".tab-3-1-1 .param-sublevel .list-group-item").click(function() {
        var $originparam = $(this);
        var text = $(this).context.text;
        var selNodes = $(".param-box .sltparams .list-group-item:contains('" + text + "')")[0];
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($(".param-box .sltparams"));
            $(this).addClass("active");

            var newselNodes = $(".param-box .sltparams .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                $(this).parent().remove();
                $originparam.removeClass("active");
            });
        }
        return;
    });

    $(".tab-3-2-1 .param-sublevel .list-group-item").click(function() {
        var $originparam = $(this);
        var text = $(this).context.text;
        var selNodes = $(".param-box .sltparams .list-group-item:contains('" + text + "')")[0];
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($(".param-box .sltparams"));
            $(this).addClass("active");

            var newselNodes = $(".param-box .sltparams .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                $(this).parent().remove();
                $originparam.removeClass("active");
            });
        }
        return;
    });

    $(".tab-3-1-1 .param-box select").change(function() {
        var selval = $(this).children('option:selected').val();
        switch (selval) {
            case "total":
                $(".sltparams .list-group-item").css("display", "block");
                break;
            case "cpu":
                $(".sltparams .list-group-item.CPUparam").css("display", "block");
                $(".sltparams .list-group-item:not(.CPUparam)").css("display", "none");
                break;
            case "memory":
                $(".sltparams .list-group-item.Memoryparam").css("display", "block");
                $(".sltparams .list-group-item:not(.Memoryparam)").css("display", "none");
                break;
            case "network":
                $(".sltparams .list-group-item.Networkparam").css("display", "block");
                $(".sltparams .list-group-item:not(.Networkparam)").css("display", "none");
                break;
            case "io":
                $(".sltparams .list-group-item.IOparam").css("display", "block");
                $(".sltparams .list-group-item:not(.IOparam)").css("display", "none");
                break;
            case "nfs":
                $(".sltparams .list-group-item.NFSparam").css("display", "block");
                $(".sltparams .list-group-item:not(.NFSparam)").css("display", "none");
                break;
            default:
                break;
        }
    });

    $(".tab-3-2-1 .param-box select").change(function() {
        var selval = $(this).children('option:selected').val();
        switch (selval) {
            case "total":
                $(".sltparams .list-group-item").css("display", "block");
                break;
            case "cpu":
                $(".sltparams .list-group-item.CPUparam").css("display", "block");
                $(".sltparams .list-group-item:not(.CPUparam)").css("display", "none");
                break;
            case "memory":
                $(".sltparams .list-group-item.Memoryparam").css("display", "block");
                $(".sltparams .list-group-item:not(.Memoryparam)").css("display", "none");
                break;
            case "network":
                $(".sltparams .list-group-item.Networkparam").css("display", "block");
                $(".sltparams .list-group-item:not(.Networkparam)").css("display", "none");
                break;
            case "io":
                $(".sltparams .list-group-item.IOparam").css("display", "block");
                $(".sltparams .list-group-item:not(.IOparam)").css("display", "none");
                break;
            case "nfs":
                $(".sltparams .list-group-item.NFSparam").css("display", "block");
                $(".sltparams .list-group-item:not(.NFSparam)").css("display", "none");
                break;
            default:
                break;
        }
    });

    $(".tab-3-1-1 .btn-pre").click(function() {
        $(".tab-5").css("display", "block");
        $(".tab-3-1-1").css("display", "none");

    });

    $(".tab-3-2-1 .btn-pre").click(function() {
        $(".tab-2-2").css("display", "block");
        $(".tab-3-2-1").css("display", "none");

    });

    $(".tab-3-1-2 .btn-pre").click(function() {
        $(".tab-5").css("display", "block");
        $(".tab-3-1-2").css("display", "none");
    });

    $(".tab-3-2-2 .btn-pre").click(function() {
        $(".tab-2-2").css("display", "block");
        $(".tab-3-2-2").css("display", "none");
    });

    //选择tab-3-1-2的系统配置的某一行
    $(".tab-3-1-2 #mainBody tr").click(function(){
        $(".tab-3-1-2 #mainBody tr").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".tab-3-2-2 #mainBody tr").click(function(){
        $(".tab-3-2-2 #mainBody tr").removeClass("selected");
        $(this).addClass("selected");
    });

    $(".tab-3-1-1 .btn-system").click(function(){
        $(".tab-3-1-1").css("display","none");
        $(".tab-3-1-2").css("display","block");
    });
    $(".tab-3-2-1 .btn-system").click(function(){
        $(".tab-3-2-1").css("display","none");
        $(".tab-3-2-2").css("display","block");
    });
    $(".tab-3-1-2 .btn-user").click(function(){
        $(".tab-3-1-2").css("display","none");
        $(".tab-3-1-1").css("display","block");
    });
    $(".tab-3-2-2 .btn-user").click(function(){
        $(".tab-3-2-2").css("display","none");
        $(".tab-3-2-1").css("display","block");
    });


    $(".tab-3-1-1 .btn-next").click(function() {
        if($(".sltparams a")[0]==undefined){
            alert("请选择任务检测参数！");
            return;
        }
        $(".tab-3-1-1 .btn-user").addClass("active");
        if($(".tab-3-1-2 .btn-system").hasClass("active")){
            $(".tab-3-1-2 .btn-system").removeClass("active");
        }

        $(".tab-3-1-1").css("display", "none");
        $(".tab-4").css("display", "block");

        $(".tab-4 .TaskType").html("单作业基准测试");

        if(document.getElementById("predata1").checked){
            $(".tab-4 .TaskData").html("预处理数据");
        }

        if(document.getElementById("origindata1").checked){
            $(".tab-4 .TaskData").html("原始数据");
        }

        $(".tab-4 .TaskName").html($(".tab-1 #TaskName")[0].value);
        $(".tab-4 .TaskDescription p").html($(".tab-1 #TaskDescription")[0].value);
        $('.tab-4 .TaskJobStream').html($('.tab-2-1-1 #jobStream option:selected').text());
        var $relateNodes = $(".tab-4 .relate-nodes");
        var $relateParams = $(".tab-4 .relate-params");
        $relateNodes.find("div").remove();
        $relateParams.find("div").remove();
        $(".tab-5 #well-nodes").clone().appendTo($relateNodes);

        $(".tab-5 #well-environments").clone().appendTo($relateNodes);

        $relateParams.find("div").removeClass("top").addClass("notop");

        $(".tab-4 .node-del").remove();
        $(".tab-3-1-1 .sltparams").clone().appendTo($relateParams);
        $(".tab-4 .btn-param-delete").remove();

    });

    $(".tab-3-2-1 .btn-next").click(function() {
        if($(".sltparams a")[0]==undefined){
            alert("请选择任务检测参数！");
            return;
        }
        $(".tab-3-2-1 .btn-user").addClass("active");
        if($(".tab-3-1-2 .btn-system").hasClass("active")){
            $(".tab-3-1-2 .btn-system").removeClass("active");
        }

        $(".tab-3-2-1").css("display", "none");
        $(".tab-4-2").css("display", "block");


        $(".tab-4-2 .TaskType").html("回归测试");

        if(document.getElementById("predata2").checked){
            $(".tab-4-2 .TaskData").html("预处理数据");
        }

        if(document.getElementById("origindata2").checked){
            $(".tab-4-2 .TaskData").html("原始数据");
        }

        $(".tab-4-2 .TaskName").html($(".tab-1 #TaskName")[0].value);
        $(".tab-4-2 .TaskDescription p").html($(".tab-1 #TaskDescription")[0].value);
        $('.tab-4-2 .JobStream p').html($('.tab-2-2 #jobStream option:selected').text());
        //var $relateNodes = $(".tab-4-2 .relate-nodes");
        var $relateParams = $(".tab-4-2 .relate-params");
        //$relateNodes.find("div").remove();
        $relateParams.find("div").remove();
        /*$(".tab-2-1-1 #well-nodes").clone().appendTo($relateNodes);
        $(".tab-4 .node-del").remove();*/
        $(".tab-3-2-1 .sltparams").clone().appendTo($relateParams);
        $(".tab-4-2 .btn-param-delete").remove();

    });

    $(".tab-3-1-2 .btn-next").click(function() {
        if(!$(".tab-3-1-2 #mainBody tr").hasClass("selected")){
            alert("请选择系统配置模板！");
            return;
        }
        $(".tab-3-1-2 .btn-system").addClass("active");
        if($(".tab-3-1-1 .btn-user").hasClass("active")){
            $(".tab-3-1-1 .btn-user").removeClass("active");
        }
        $(".tab-3-1-2").css("display", "none");
        $(".tab-4").css("display", "block");


        $(".tab-4 .TaskType").html("单作业基准测试");

        $(".tab-4 .TaskName").html($(".tab-1 #TaskName")[0].value);
        $(".tab-4 .TaskDescription p").html($(".tab-1 #TaskDescription")[0].value);
        $('.tab-4 .TaskJobStream').html($('.tab-2-1-1 #jobStream option:selected').text());

        if(document.getElementById("preData3").checked){
            $(".tab-4 .TaskData").html("预处理数据");
        }

        if(document.getElementById("originData3").checked){
            $(".tab-4 .TaskData").html("原始数据");
        }


        var $relateNodes = $(".tab-4 .relate-nodes");
        var $relateParams = $(".tab-4 .relate-params");
        $relateNodes.find("div").remove();
        $relateParams.find("div").remove();

        $(".tab-5 #well-nodes").clone().appendTo($relateNodes);
        $(".tab-5 #well-environments").clone().appendTo($relateNodes);
        $(".tab-4 .node-del").remove();

        var $sltparams=$('<div class="list-group sltparams"></div>');
        $.each($(".tab-3-1-2 #mainBody .selected .related_para"), function() {
             var $para=$('<a class="list-group-item CPUparam"></a>');
             $para.append($(this).text()).appendTo($sltparams)
        });
        $sltparams.appendTo($relateParams);
        $(".tab-4 .btn-param-delete").remove();
    });

    $(".tab-3-2-2 .btn-next").click(function() {
        if(!$(".tab-3-2-2 #mainBody tr").hasClass("selected")){
            alert("请选择系统配置模板！");
            return;
        }
        $(".tab-3-2-2 .btn-system").addClass("active");
        if($(".tab-3-2-1 .btn-user").hasClass("active")){
            $(".tab-3-2-1 .btn-user").removeClass("active");
        }
        $(".tab-3-2-2").css("display", "none");
        $(".tab-4-2").css("display", "block");
        
        $(".tab-4-2 .TaskType").html("回归测试");

        if(document.getElementById("preData4").checked){
            $(".tab-4-2 .TaskData").html("预处理数据");
        }

        if(document.getElementById("originData4").checked){
            $(".tab-4-2 .TaskData").html("原始数据");
        }

        $(".tab-4-2 .TaskName").html($("#TaskName")[0].value);
        $(".tab-4-2 .TaskDescription p").html($("#TaskDescription")[0].value);
        $('.tab-4-2 .JobStream p').html($('.tab-2-2 #jobStream option:selected').text());
        //var $relateNodes = $(".tab-4 .relate-nodes");
        var $relateParams = $(".tab-4-2 .relate-params");
        //$relateNodes.find("div").remove();
        $relateParams.find("div").remove();
        //$(".tab-2-1-1 #well-nodes").clone().appendTo($relateNodes);
        //$(".tab-2-1-1 #well-environments").clone().appendTo($relateNodes);
        //$(".tab-4 .node-del").remove();

        var $sltparams=$('<div class="list-group sltparams"></div>');
        $.each($(".tab-3-2-2 #mainBody .selected .related_para"), function() {
             var $para=$('<a class="list-group-item CPUparam"></a>');
             $para.append($(this).text()).appendTo($sltparams)
        });
        $sltparams.appendTo($relateParams);
        $(".tab-4-2 .btn-param-delete").remove();
    });

    //--------------STEP5确认-----------//
    $(".tab-4 .btn-pre").click(function() {
        if($(".tab-3-1-1 .btn-user").hasClass("active")){
            $(".tab-3-1-1").css("display", "block");
        }else{
            $(".tab-3-1-2").css("display", "block");
        }
        $(".tab-4").css("display", "none");
    });

    $(".tab-4-2 .btn-pre").click(function() {
        if($(".tab-3-2-1 .btn-user").hasClass("active")){
            $(".tab-3-2-1").css("display", "block");
        }else{
            $(".tab-3-2-2").css("display", "block");
        }
        $(".tab-4-2").css("display", "none");
    });

    //去重算法
    Array.prototype.uniqueIt = function (){
        var res = [];
        var obj = {};
        for(var i =0; i<this.length;i++){
            if(!obj[this[i]]){
                res.push(this[i]);
                obj[this[i]] =1;
            }
        }
        return res;
    }
    $(".tab-4 #btnNewTaskConfirm").click(function() {
        var atask = {
            "name": "",
            "introduction": "",
            "type": "",
            "process": "就绪",
            "nodejobs":{},
            "jobModes":{},
            "parameters":[],
            "simulations":[],
            "datatype":"",
        };
        atask.name = $(".tab-4 .TaskName").text();
        atask.type = $(".tab-4 .TaskType").text();
        atask.introduction = $(".tab-4 .TaskDescription").text();
        atask.datatype = $(".tab-4 .TaskData").text();

        $.each($(".tab-4 #well-environments .nodes .span"), function(index, val) {
             atask.simulations.push($(this).text());
        });

        $.each($(".tab-4 .relate-params a"), function (index, val) {
            atask.parameters.push($(this).text());
        });

        $.each($(".tab-4 #well-nodes .nodeouter"), function(index, val) {
            var $thisNode = $(this).children('.nodes').children('span').eq(1).text();
            atask.nodejobs[$thisNode]=new Array();
            //jobStream
            atask.nodejobs[$thisNode].push($(".tab-4 .TaskJobStream").text());
        });
        $.each($(".tab-4 .TaskJobModes tbody tr"), function(index, val) {
            var $thisJob = $(this).children('td').eq(0).text();
            atask.jobModes[$thisJob]= $(this).children('td').eq(1).text();
        });

        $.ajax({
            url: '/newtask/',
            type: 'post',
            dataType: 'json',
            async: false,
            data: JSON.stringify(atask),
        })

        .done(function() {
            console.log("success");
            window.location.href = '/index'
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    });

    $(".tab-4-2 #btnNewTaskConfirm").click(function() {
        var atask = {
            "name": "",
            "introduction": "",
            "type": "",
            "process": "就绪",
            "jobstream":"",
            //"nodejobs":{},
            "parameters":[],
            //"simulations":[],
            "start_date":"",
            "start_time":"",
            "end_date":"",
            "end_time":"",
            "datatype":"",
        };
        atask.name = $(".tab-4-2 .TaskName").text();
        atask.type = $(".tab-4-2 .TaskType").text();
        atask.introduction = $(".tab-4-2 .TaskDescription").text();
        atask.jobstream = $(".tab-4-2 .JobStream").text();
        atask.datatype = $(".tab-4-2 .TaskData").text();

        atask.start_date = ($(".tab-2-2 #begintime")[0].value).split(' ')[0];
        atask.start_time = ($(".tab-2-2 #begintime")[0].value).split(' ')[1];
        atask.end_date = ($(".tab-2-2 #endtime")[0].value).split(' ')[0];
        atask.end_time = ($(".tab-2-2 #endtime")[0].value).split(' ')[1];

        /*$.each($(".tab-4-2 #well-environments .nodes a"), function(index, val) {
             atask.simulations.push($(this).text());
        });*/

        $.each($(".tab-4-2 .relate-params a"), function (index, val) {
            atask.parameters.push($(this).text());
        });


        /*$.each($(".tab-4-2 #well-nodes .nodeouter"), function(index, val) {
            var $thisNode = $(this).children('.nodes').children('span').eq(1).text();
            atask.nodejobs[$thisNode]=new Array();
            atask.nodejobs[$thisNode].push($(this).children('.applications').children('span').eq(1).text());
        });*/

        $.ajax({
            url: '/newtask/',
            type: 'post',
            dataType: 'json',
            async: false,
            data: JSON.stringify(atask),
        })

        .done(function() {
            console.log("success");
            window.location.href = '/index'
        })
        .fail(function() {
            console.log("error");
        })
        .always(function() {
            console.log("complete");
        });

    });
});
