$(document).ready(function(){
    $(".task-log").scrollTop(9999);
    var eCharts;
    var myChart;
    
    require.config({
        paths: {
            echarts: '/static/js'
        }
    });


    require(
        [
            'echarts',
            'echarts/chart/bar',
            'echarts/chart/line',
            'echarts/chart/map',
            'echarts/chart/radar'
        ],initTask
    );

    function initTask(ec){
        var idx = 1;
        var collectProgress = 0; 
        var recogTimeticket;
        var reportTimeticket;
        var $collect_bar = $("#data-collect .progress-bar");
        var $recog_bar = $("#feature-recog .progress-bar");
        var $report_bar = $("#node-report .progress-bar");
        DrawEchart(ec);
    }
    function DrawEchart(ec) {
        eCharts = ec;
        myChart = eCharts.init($("#cpu_io")[0]);
        myChart.showLoading({  
                text : "图表数据正在努力加载..."  
        }); 

        function getChartData(){
            $.ajax({
                url: '/echart/getData',
                type: 'get',
                async : false, //同步执行  
                dataType: 'json',
                data: {},
            })
            .done(function(result) {
                console.log("LoadeChartDataSuccess");
               //
                //console.log($.parseJSON(result['option']))
                var index = 0;
                
                myChart.hideLoading();  
                myChart.setOption(result.option);  
                console.log(result.option.legend);
                var ticket = setInterval(function(){
                    if(index >= result.data[0].length){
                        clearInterval(ticket);
                        return ;
                    }
                    //console.log(result.data[2][index])

                    myChart.addData([                        //动态加载数据接口
                        [
                            0,
                            result.data[0][index],
                            false,
                            true
                        ], 
                        [
                            1,
                            result.data[1][index],
                            false,
                            true
                        ],
                        [
                            4,
                            result.data[2][index],
                            false,
                            true
                        ]
                    ]);
                    index++;
                },50) 

            })
            .fail(function() {
                console.log("LoadeChartDataError");
            });  
        }

        setTimeout(getChartData,500); //ajax后台交互
    }




}); 