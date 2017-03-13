$(document).ready(function() {
	$(".btn-editNode").click(function(){
    	$("#editNodeModal").modal("show");
    	var $thisrow = $(this).parent().parent();
    	$("#editNodeModal input.node-id").val($thisrow.attr('id'));
	   	$("#editNodeModal .form-group input.node-name").val($thisrow.children(':eq(1)').text());
    	$("#editNodeModal .form-group input.node-type").val($thisrow.children(':eq(2)').text());
    	$("#editNodeModal .form-group input.node-x").val($thisrow.children(':eq(3)').text());
		$("#editNodeModal .form-group input.node-y").val($thisrow.children(':eq(4)').text());
		$("#editNodeModal .form-group input.node-ip").val($thisrow.children(':eq(5)').text());
		$("#editNodeModal .form-group input.node-active").val($thisrow.children(':eq(6)').text());
		$("#editNodeModal .form-group input.node-desc").val($thisrow.children(':eq(8)').text());
		$("#editNodeModal .form-group input.node-memorySpeed").val($thisrow.children(':eq(7)').text());
		$("#editNodeModal .form-group input.node-disk").val($thisrow.children(':eq(8)').text());
		$("#editNodeModal .form-group input.node-gpu").val($thisrow.children(':eq(9)').text());
		$("#editNodeModal .form-group input.node-net").val($thisrow.children(':eq(10)').text());
		$("#editNodeModal .form-group select.node-os option:contains('"+ $thisrow.children(':eq(11)').text()+"')").attr("selected",true);
	});

	$("#editNodeModal .modal-footer .btn-primary").unbind().click(function(){
		//  update data
		$.ajax({
		    url: "/node/edit",
		    type: "POST",
		    data: $('#form-edit-node').serialize(), 
		})
		.done(function (){
			$('#editNodeModal').modal("hide");
            window.location.reload();
 			console.log('updateNodeInfoSuccess!');	
 		});
		
	});

	$(".btn-deleteNode").click(function(event){
		var $thisrow = $(this).parent().parent();
		event.stopPropagation();
		$("#deleteNodeModal").modal("show");
		$("#deleteNodeModal .btn-danger").unbind().click(function(){
 			$.ajax({
 				url:"/node/delete",
     		    type: "POST",
     		    data: {id:$thisrow.attr('id')}
     		})
     		.done(function (){
     			$("#deleteNodeModal").modal("hide");
     			//$thisrow.remove();
     			  window.location.reload();
     			console.log("NodeDataDelete")
     		});
			
		});
	});   

	$(".btn-resetNode").click(function(event){
		var $thisrow = $(this).parent().parent();
		event.stopPropagation();
		$("#resetNodeModal").modal("show");
		$("#resetNodeModal .btn-danger").unbind().click(function(){
 			$.ajax({
 				url:"/node/getServer",
     		    type: "POST",
     		    data: {name:($thisrow.children(':eq(1)').text())}
     		})
     		.done(function (){
     			$("#resetNodeModal").modal("hide");
     			//$thisrow.remove();
     			  window.location.reload();
     			console.log("NodeDataReset")
     		});

		});
	});


    $("#newNodeModal .modal-footer .btn-primary").click(function(){
    	$("#newNodeModal :input[name]").each(function(){
    		if($(this).val()==''){
    			alert('表格不完整!');
    			return false;
    		}
    	});
		$.ajax({
		    url: "/node/add",
		    type: "POST",
		    data: $('#form-add-node').serialize(), 
		})
		.done(function (){
			$('#newNodeModal').modal("hide");
            window.location.reload();
 			console.log('newNodeAddedSuccess!');	
 		});	
	});

});
