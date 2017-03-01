$(document).ready(function () {
    $(".btn-editTemplate").click(function () {
        $("#editTemplateModal").modal("show");
        var $thisTask = $(this).parent().parent();
        console.log($thisTask.children(':eq(3)').text());
        $("#editTemplateModal input.template-id").val($thisTask.attr('id'));
        $("#editTemplateModal .form-group input.template-name").val($thisTask.children(':eq(1)').text());
        $("#editTemplateModal .form-group input.template-desc").val($thisTask.children(':eq(2)').text());

        var aparameter = {
            "template-id": "",
            "template-name": "",
            "template-desc": "",
            "parameters":[]
        };
        aparameter['template-id'] = $thisTask.attr('id');

        $('#editTemplateModal').modal().on('click', '.btn-primary', function(){
            if($('.sltparams a').text() == ''){
                alert('请选择参数!');
                return false;
            }
            $.each($("#editTemplateModal .sltparams a"), function () {
                if ($(this).text() != '')
                    aparameter.parameters.push($(this).text());
            })
            aparameter['template-name'] = document.getElementById("edit-name").value;
            aparameter['template-desc'] = document.getElementById("edit-desc").value;

            $.ajax({
                url: '/template/edit',
                type: 'post',
                datatype: 'json',
                data: JSON.stringify(aparameter),
                async: false,
            })
            .done(function(data) {
                $('#editTemplateModal').modal("hide");
                window.location.reload();
                console.log("dataEditSuccess!");
            })
            .fail(function() {
                console.log("dataEditError!");
            })
        });
    });

    $("#newTemplateModal .modal-footer .btn-primary").click(function(){
    	
        if($('#newTemplateModal .sltparams a').text() == ''){
            alert('请选择参数!');
            return false;
        }
        var aparameter = {
            "template-name": "",
            "template-desc": "",
            "parameters":[]
        };
        aparameter['template-name'] = document.getElementById("templateName").value;
        aparameter['template-desc'] = document.getElementById("templateDesc").value;
        $.each($(".sltparams a"), function () {
            if ($(this).text() != '')
                aparameter.parameters.push($(this).text());
        })
        console.log(aparameter);

        $.ajax({
		    url: '/template/add',
            type: 'post',
            datatype: 'json',
            data: JSON.stringify(aparameter),
            async: false,
		})
		.done(function (){
			$('#newTemplateModal').modal("hide");
            window.location.reload();
 			console.log('newTemplateAddedSuccess!');
 		});
	});

    $("#editTemplateModal .param-level .list-group-item").hover(
        function() {
            var $allSublevel = $("#editTemplateModal .param-sublevel");
            var $thisItem = $("#editTemplateModal .param-sublevel:eq(" + $(this).index() + ")");
            var $popright = $("#editTemplateModal .param-sublevel.pop-right");
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $thisItem.removeClass("pop-right");
                $thisItem.css("display", "none");
                return;
            }
            if ($allSublevel.hasClass("pop-right")) {
                $popright.css("display", "none");
                $popright.removeClass("pop-right");
                $("#editTemplateModal .param-level .list-group-item").removeClass("active");
            }
            $thisItem.addClass("pop-right");
            $thisItem.css("display", "block");
            $(this).addClass("active");
        },
        function() {}
    );

    $("#editTemplateModal .param-sublevel .list-group-item").click(function() {
        var $originparam = $(this);
        var text = $(this).context.text;
        var selNodes = $("#editTemplateModal .param-box .sltparams .list-group-item:contains('" + text + "')")[0]
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($("#editTemplateModal .param-box .sltparams"));
            $(this).addClass("active");

            var newselNodes = $("#editTemplateModal .param-box .sltparams .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                $(this).parent().remove();
                $originparam.removeClass("active");
            });
        };
        return;
    });

    $("#editTemplateModal .param-box select").change(function() {
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

    $("#newTemplateModal .param-level .list-group-item").hover(
        function() {
            var $allSublevel = $("#newTemplateModal .param-sublevel");
            var $thisItem = $("#newTemplateModal .param-sublevel:eq(" + $(this).index() + ")");
            var $popright = $("#newTemplateModal .param-sublevel.pop-right");
            if ($(this).hasClass("active")) {
                $(this).removeClass("active");
                $thisItem.removeClass("pop-right");
                $thisItem.css("display", "none");
                return;
            }
            if ($allSublevel.hasClass("pop-right")) {
                $popright.css("display", "none");
                $popright.removeClass("pop-right");
                $("#newTemplateModal .param-level .list-group-item").removeClass("active");
            }
            $thisItem.addClass("pop-right");
            $thisItem.css("display", "block");
            $(this).addClass("active");
        },
        function() {}
    );

    $("#newTemplateModal .param-sublevel .list-group-item").click(function() {
        var $originparam = $(this);
        var text = $(this).context.text;
        var selNodes = $("#newTemplateModal .param-box .sltparams .list-group-item:contains('" + text + "')")[0]
        if (selNodes === undefined) {
            $(this).clone()
                .append(" <a class='btn btn-danger btn-sm pull-right btn-param-delete' id='xxx'><i class='fa fa-times'></i></a>")
                .appendTo($("#newTemplateModal .param-box .sltparams"));
            $(this).addClass("active");

            var newselNodes = $("#newTemplateModal .param-box .sltparams .list-group-item:contains('" + text + "')");
            newselNodes.find("a").click(function() {
                $(this).parent().remove();
                $originparam.removeClass("active");
            });
        };
        return;
    });

    $("#newTemplateModal .param-box select").change(function() {
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
    
    $(".btn-deleteTemplate").click(function(event){
		var $thisrow = $(this).parent().parent();
		event.stopPropagation();
		$("#deleteTemplateModal").modal("show");
		$("#deleteTemplateModal .btn-danger").unbind().click(function(){
 			$.ajax({
 				url:"/template/delete",
     		    type: "POST",
     		    data: {id:$thisrow.attr('id')}
     		})
     		.done(function (){
     			$("#deleteTemplateModal").modal("hide");
     			//$thisrow.remove();
                window.location.reload();
     		});
		});
	});
})