$(document).ready(function() {

    $(".btn-editSimulationEnvironment").click(function() {
        $("#editSimulationEnvironmentModal").modal("show");
        var $thisSimulationEnvironment = $(this).parent().parent();

        $("#editSimulationEnvironmentModal input.simulationEnvironment-id").val($thisSimulationEnvironment.attr('id'));
        $("#editSimulationEnvironmentModal .form-group input.simulationEnvironment-name").val($thisSimulationEnvironment.children(':eq(1)').text());
        $("#editSimulationEnvironmentModal .form-group input.simulationEnvironment-description").val($thisSimulationEnvironment.children(':eq(2)').text());
        $("#edit-environment option:selected").val($thisSimulationEnvironment.children(':eq(3)').text());

         var aNode = {
            "simulationEnvironment-id": "",
            "simulationEnvironment-name": "",
            "simulationEnvironment-description": "",
             "simulationEnvironment-environment":"",
            "nodes":[]
        };
        aNode['simulationEnvironment-id'] = $thisSimulationEnvironment.attr('id');

         $('#editSimulationEnvironmentModal').modal().on('click', '.btn-primary', function(){
            if($('.sltnodes a').text() == ''){
                alert('请选择节点!');
                return false;
            }
            $.each($("#editSimulationEnvironmentModal .sltnodes a"), function () {
                if ($(this).text() != '')
                    aNode.nodes.push($(this).text());
            })
            aNode['simulationEnvironment-name'] = document.getElementById("edit-name").value;
            aNode['simulationEnvironment-description'] = document.getElementById("edit-description").value;
            aNode['simulationEnvironment-environment'] =  $("#edit-environment option:selected").val();
             
            $.ajax({
                url: "/simulationEnvironment/edit",
                type: "POST",
                datatype: 'json',
                data: JSON.stringify(aNode),
                async: false,
            })
            .done(function (){
                $('#editSimulationEnvironmentModal').modal("hide");
                window.location.reload();
                console.log('updateSimulationEnvironmentInfoSuccess!');
            })
            .fail(function() {
                console.log("dataEditError!");
            })
         });
    });




    $("#newSimulationEnvironmentModal .modal-footer .btn-primary").click(function() {
       $("#newSimulationEnvironmentModal :input[name]").each(function(){
            if($(this).val()==''){
                alert('表单填写不完整!');
                return false;
            }
        });
        
        if($('#newSimulationEnvironmentModal .sltnodes a').text() == ''){
            alert('请选择节点!');
            return false;
        }
        
        var aNode = {
            "simulationEnvironment-name": "",
            "simulationEnvironment-description": "",
            "simulationEnvironment-environment": "",
            "nodes":[]
        };
        aNode['simulationEnvironment-name'] = document.getElementById("add-name").value;
        aNode['simulationEnvironment-description'] = document.getElementById("add-description").value;
        aNode['simulationEnvironment-environment'] =  $("#add-environment option:selected").val();

        $.each($("#newSimulationEnvironmentModal .sltnodes a"), function () {
            if ($(this).text() != '')
                aNode.nodes.push($(this).text());
        })
        console.log(JSON.stringify(aNode));

        $.ajax({
            url: "/simulationEnvironment/add",
            type: "POST",
            datatype: 'json',
            data: JSON.stringify(aNode),
            async: false,
        })
        .done(function (){
            $('#newSimulationEnvironmentModal').modal("hide");
            window.location.reload();
            console.log('newSimulationEnvironmentAddedSuccess!');
        });
    });

});

 $("#editSimulationEnvironmentModal .nodes-sublevel .list-group-item").click(function() {
        var $originNodes = $(this);
        var text = $(this).context.text;
        var selNodes = $("#editSimulationEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')")[0]
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($("#editSimulationEnvironmentModal .nodes-box .sltnodes"));
            $(this).addClass("active");

            var newselNodes = $("#editSimulationEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                console.log($(this).parent());
                $(this).parent().remove();
                $originNodes.removeClass("active");
            });
        };
        return;
    });


  $("#newSimulationEnvironmentModal .nodes-sublevel .list-group-item").click(function() {
        var $originNodes = $(this);
        var text = $(this).context.text;
        var selNodes = $("#newSimulationEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')")[0]
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($("#newSimulationEnvironmentModal .nodes-box .sltnodes"));
            $(this).addClass("active");

            var newselNodes = $("#newSimulationEnvironmentModal .nodes-box .sltnodes .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                $(this).parent().remove();
                $originNodes.removeClass("active");
            });
        };
        return;
    });


    $(".btn-deleteSimulationEnvironment").click(function() {
        var $thisrow = $(this).parent().parent();
        event.stopPropagation();
        $("#deleteSimulationEnvironmentModal").modal("show");
        $("#deleteSimulationEnvironmentModal .btn-danger").unbind().click(function(){
            $.ajax({
                url:"/simulationEnvironment/delete",
                type: "POST",
                data: {id:$thisrow.attr('id')}
            })
            .done(function (){
                $("#deleteSimulationEnvironmentModal").modal("hide");
                  window.location.reload();
                console.log("SimulationEnvironmentDataDelete")
            });

        });
    });
