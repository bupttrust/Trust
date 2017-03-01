$(document).ready(function() {
    $(".btn-editJobStream").click(function() {
        $("#editJobStreamModal").modal("show");
        var $thisrow = $(this).parent().parent();
        $("#editJobStreamModal input.jobstream-id").val($thisrow.attr('id'));
        $("#editJobStreamModal .form-group input.jobstream-name").val($thisrow.children(':eq(1)').text().replace(/(^\s+)|(\s+$)/g, ""));
        $("#editJobStreamModal .form-group input.jobstream-type").val($thisrow.children(':eq(2)').text().replace(/(^\s+)|(\s+$)/g, ""));
        $("#editJobStreamModal .form-group input.jobstream-des").val($thisrow.children(':eq(3)').text().replace(/(^\s+)|(\s+$)/g, ""));
    });

    $("#editJobStreamModal .modal-footer .btn-primary").unbind().click(function(){
    //  update data
        $.ajax({
            url: "/jobstream/edit",
            type: "POST",
            data: $('#form-edit-jobstream').serialize(),
        })
        .done(function (){
            $('#editJobStreamModal').modal("hide");
            window.location.reload();
            console.log('updateJobStreamSuccess!');
        });
    });

    $("#addJobStreamModal .modal-footer .btn-primary").click(function(){
		$.ajax({
		    url: "/jobstream/add",
		    type: "POST",
		    data: $('#form-add-jobstream').serialize(), 
		})
		.done(function (){
			$('#addJobStreamModal').modal("hide");
            window.location.reload();
 			console.log('addJobStreamSuccess!');	
 		});	
	});

    $(".btn-deleteJobStream").click(function(event){
		var $thisrow = $(this).parent().parent();
		event.stopPropagation();
		$("#deleteJobStreamModal").modal("show");
		$("#deleteJobStreamModal .btn-danger").unbind().click(function(){
 			$.ajax({
 				url:"/jobstream/delete",
     		    type: "POST",
     		    data: {id:$thisrow.attr('id')}
     		})
     		.done(function (){
     			$("#deleteJobStreamModal").modal("hide");
     			//$thisrow.remove();
                window.location.reload();
     		});
		});
	});
});