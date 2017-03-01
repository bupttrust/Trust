$(document).ready(function () {
    $('#export').click(function (event) {
        var filename=$(".name").text();
        $(".div").css("display","block");
        $("#report-div").wordExport(filename);
        $(".div").css("display","none");
    });
});
