$(document).ready(function() {

    $(".btn-editEnvironment").click(function() {
        $("#editEnvironmentModal").modal("show");
        var $thisEnvironment = $(this).parent().parent();

        $("#editEnvironmentModal input.environment-id").val($thisEnvironment.attr('id'));
        $("#editEnvironmentModal .form-group input.environment-name").val($thisEnvironment.children(':eq(1)').text());
        $("#editEnvironmentModal .form-group input.environment-description").val($thisEnvironment.children(':eq(2)').text());

         var aNode = {
            "environment-id": "",
            "environment-name": "",
            "environment-description": "",
            "nodes":[]
        };
        aNode['environment-id'] = $thisEnvironment.attr('id');

         $('#editEnvironmentModal').modal().on('click', '.btn-primary', function(){
            if($('.sltnodes a').text() == ''){
                alert('请选择节点!');
                return false;
            }
            $.each($("#editEnvironmentModal .sltnodes a"), function () {
                if ($(this).text() != '')
                    aNode.nodes.push($(this).text());
            })
            aNode['environment-name'] = document.getElementById("edit-name").value;
            aNode['environment-description'] = document.getElementById("edit-description").value;

            $.ajax({
                url: "/environment/edit",
                type: "POST",
                datatype: 'json',
                data: JSON.stringify(aNode),
                async: false,
            })
            .done(function (){
                $('#editEnvironmentModal').modal("hide");
                window.location.reload();
                console.log('updateEnvironmentInfoSuccess!');
            })
            .fail(function() {
                console.log("dataEditError!");
            })
         });
    });




    $("#newEnvironmentModal .modal-footer .btn-primary").click(function() {
       $("#newEnvironmentModal :input[name]").each(function(){
            if($(this).val()==''){
                alert('表单填写不完整!');
                return false;
            }
        });
        
        if($('#newEnvironmentModal .sltnodes a').text() == ''){
            alert('请选择节点!');
            return false;
        }
        
        var aNode = {
            "environment-name": "",
            "environment-description": "",
            "nodes":[]
        };
        aNode['environment-name'] = document.getElementById("add-name").value;
        aNode['environment-description'] = document.getElementById("add-description").value;
        
        $.each($("#newEnvironmentModal .sltnodes a"), function () {
            if ($(this).text() != '')
                aNode.nodes.push($(this).text());
        })
        console.log(JSON.stringify(aNode));

        $.ajax({
            url: "/environment/add",
            type: "POST",
            datatype: 'json',
            data: JSON.stringify(aNode),
            async: false,
        })
        .done(function (){
            $('#newEnvironmentModal').modal("hide");
            window.location.reload();
            console.log('newEnvironmentAddedSuccess!');
        });
    });

});

 $("#editEnvironmentModal .nodes-sublevel .list-group-item").click(function() {
        var $originNodes = $(this);
        var text = $(this).context.text;
        var selNodes = $("#editEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')")[0]
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($("#editEnvironmentModal .nodes-box .sltnodes"));
            $(this).addClass("active");

            var newselNodes = $("#editEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                console.log($(this).parent());
                $(this).parent().remove();
                $originNodes.removeClass("active");
            });
        };
        return;
    });


  $("#newEnvironmentModal .nodes-sublevel .list-group-item").click(function() {
        var $originNodes = $(this);
        var text = $(this).context.text;
        var selNodes = $("#newEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')")[0]
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($("#newEnvironmentModal .nodes-box .sltnodes"));
            $(this).addClass("active");

            var newselNodes = $("#newEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                $(this).parent().remove();
                $originNodes.removeClass("active");
            });
        };
        return;
    });


    $(".btn-deleteEnvironment").click(function() {
        var $thisrow = $(this).parent().parent();
        event.stopPropagation();
        $("#deleteEnvironmentModal").modal("show");
        $("#deleteEnvironmentModal .btn-danger").unbind().click(function(){
            $.ajax({
                url:"/environment/delete",
                type: "POST",
                data: {id:$thisrow.attr('id')}
            })
            .done(function (){
                $("#deleteEnvironmentModal").modal("hide");
                  window.location.reload();
                console.log("EnvironmentDataDelete")
            });

        });
    });
