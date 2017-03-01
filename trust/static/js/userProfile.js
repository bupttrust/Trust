$(document).ready(function() {

    $(".btn-editUser").click(function() {
        $("#editUserModal").modal("show");
        var $thisrow = $(this).parent().parent();

        $("#editUserModal input.user-id").val($thisrow.attr('id'));
        $("#editUserModal .form-group input.user-name").val($thisrow.children(':eq(1)').text());
        $("#editUserModal .form-group input.user-password").val($thisrow.children(':eq(2)').text());
        $("#editUserModal .form-group input.user-real_name").val($thisrow.children(':eq(3)').text());
        $("#editUserModal .form-group input.user-phone_number").val($thisrow.children(':eq(4)').text());
        $("#editUserModal .form-group input.user-id_number").val($thisrow.children(':eq(5)').text());
        $("#editUserModal .form-group input.user-sex").val($thisrow.children(':eq(6)').text());
        $("#editUserModal .form-group input.user-department").val($thisrow.children(':eq(7)').text());
        $("#editUserModal .form-group input.user-introduction").val($thisrow.children(':eq(8)').text());
        $("#editUserModal .form-group input.user-level").val($thisrow.children(':eq(9)').text());
    });

    $("#editUserModal .modal-footer .btn-primary").unbind().click(function(){
    //  update data
        $.ajax({
            url: "/userprofile/edit",
            type: "POST",
            data: $('#form-edit-user').serialize(),
        })
        .done(function (){
            $('#editUserModal').modal("hide");
            window.location.reload();
            console.log('updateUserInfoSuccess!');
        });
    });


    $(".btn-deleteUser").click(function() {
        var $thisrow = $(this).parent().parent();
        event.stopPropagation();
        $("#deleteUserModal").modal("show");
        $("#deleteUserModal .btn-danger").unbind().click(function(){
            $.ajax({
                url:"/userprofile/delete",
                type: "POST",
                data: {id:$thisrow.attr('id')}
            })
            .done(function (){
                $("#deleteUserModal").modal("hide");
                //$thisrow.remove();
                  window.location.reload();
                console.log("UserDataDelete")
            });

        });
    });


    $("#newUserModal .modal-footer .btn-primary").click(function() {
       $("#newUserModal :input[name]").each(function(){
            if($(this).val()==''){
                alert('表完不完整!');
                return false;
            }
        });
        $.ajax({
            url: "/userprofile/add",
            type: "POST",
            data: $('#form-add-user').serialize(),
        })
        .done(function (){
            $('#newUserModal').modal("hide");
            window.location.reload();
            console.log('newUserAddedSuccess!');
        });
    });

});