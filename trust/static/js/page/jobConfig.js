$(document).ready(function() {

    $(".btn-editJob").click(function() {
        $("#editJobModal").modal("show");
        var $thisrow = $(this).parent().parent();
        $("#editJobModal input.job-id").val($thisrow.attr('id'));
        $("#editJobModal .form-group input.job-name").val($thisrow.children(':eq(1)').text());
        $("#editJobModal .form-group input.job-number").val($thisrow.children(':eq(3)').text());
  
    });

    $(".btn-editMode").click(function() {
        $("#editModeModal").modal("show");
        var $thisrow = $(this).parent();
        $("#editModeModal input.mode-id").val($thisrow.attr('id'));
        $("#editModeModal .form-group input.mode-name").val($thisrow.text().replace(/(^\s+)|(\s+$)/g, ""));
        
    });

    $(".btn-addMode").click(function() {
        $("#addModeModal").modal("show");
        var $thisrow = $(this).parent().parent();
        $("#addModeModal input.job-id").val($thisrow.attr('id'));        
    });

    $("#add-job").click(function() {
        $("#addJobModal").modal("show");  
        var $thisrow = $(this).parent();
        $("#addJobModal input.jobstream-id").val($thisrow.attr('id'));
    });

    $("#editJobModal .modal-footer .btn-primary").unbind().click(function(){
    //  update data
        $.ajax({
            url: "/job/edit",
            type: "POST",
            data: $('#form-edit-job').serialize(),
        })
        .done(function (){
            $('#editJobModal').modal("hide");
            window.location.reload();
            console.log('updateJobSuccess!');
        });
    });

    $("#editModeModal .modal-footer .btn-primary").unbind().click(function(){
    //  update data
        $.ajax({
            url: "/mode/edit",
            type: "POST",
            data: $('#form-edit-mode').serialize(),
        })
        .done(function (){
            $('#editModeModal').modal("hide");
            window.location.reload();
            console.log('updateModeSuccess!');
        });
    });

    $("#addModeModal .modal-footer .btn-primary").unbind().click(function(){
    //  update data
        $.ajax({
            url: "/mode/add",
            type: "POST",
            data: $('#form-add-mode').serialize(),
        })
        .done(function (){
            $('#addModeModal').modal("hide");
            window.location.reload();
            console.log('updateModeSuccess!');
        });
    });

    $("#addJobModal .modal-footer .btn-primary").unbind().click(function(){
    //  update data
        $.ajax({
            url: "/job/add",
            type: "POST",
            data: $('#form-add-job').serialize(),
        })
        .done(function (){
            $('#addJobModal').modal("hide");
            window.location.reload();
            console.log('updateJobSuccess!');
        });
    });
});