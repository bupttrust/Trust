require(['jquery','bootstrap'], function($) {
    var firstThreeTask = $("#mainBody").children(':lt(3)');
    $taskTable = $("#mainBody");

    //编辑按钮事件
    $taskTable.on('click', '.dataEdit', function(event){
        //填充modal框
        var taskTypes = ['性能优化分析','任务资源评估','系统运行状态评估'];
        var taskTypeOptions;
        $.each(taskTypes, function(index, val) {
            taskTypeOptions += "<option>"+ val +"</option>";
        });
        $(".editTaskModal select").append(taskTypeOptions);
        var $thisTask = $(this).parent().parent();
        $("#editTaskModal .form-group .task-name").val($thisTask.children(':eq(0)').children().text());
        $("#editTaskModal .form-group .task-desc").val($thisTask.children(':eq(1)').text());
        $("#editTaskModal .form-group .task-type option:contains('"+ $thisTask.children(':eq(2)').text()+"')").attr("selected",true);
        $("#editTaskModal input.task-id").val($thisTask.attr('id'));
       
        //弹出modal框
        $('#editTaskModal').modal().on('click', '.btn-primary', function(){
            $.ajax({
                url: '/index/edit/',
                type: 'post',
                data: $('#form-edit-task').serialize(),
                async: false,
            })
            .done(function(data) {
                $('#editTaskModal').modal("hide");
                window.location.reload();
                console.log("dataEditSuccess!");
            })
            .fail(function() {
                console.log("dataEditError!");
            })        
        });  
       
    });


    //删除任务按钮注册事件
    $taskTable.on('click', '.btn.dataDelete', function(event) {
        var thisTask = $(this).parent().parent();
        $("#deleteTaskModal").modal().on('click', '.btn-danger', function(event){
            $.ajax({
                url: "/index/delete/",
                type: "POST",
                data: {
                    id:thisTask.attr('id')
                }, 
            })
            .done(function(data) {

                $('#deleteTaskModal').modal("hide");
                thisTask.remove();
                window.location.reload();
                console.log("dataDeleteSuccess!");
            })
            .fail(function() {
                console.log("dataDeleteError!");
            })
        });

        event.stopPropagation(); 
    });
/*    //detail 显示
    var registDetailTask = function(){
        $(".trData").click(function(){
            id = $(this).attr("id");
            url = "/index/detail/"+id;
            //console.log(url);
            $.ajax({
                url: url,
                type: "GET",
                data: {"d":"324"},  //相当于 //data: "{'str1':'foovalue', 'str2':'barvalue'}",
            })
            .done(function(data) {
                var detail=""

                console.log(data);
            })
            .fail(function() {
                console.log("dataDeleteError!");
            });
        });
    };
*/

});