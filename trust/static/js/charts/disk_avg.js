/**
 * Created by yuyang on 15/3/11.
 */

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
    ],
    function (ec) {
        //--- 折柱 ---
        var option;
        option = {
            title:{
                text:'Disk total KB/s localdomain  2014/12/27',
                x:'center'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['Avg.','WAvg.','Max.'],
                x:'left'
            },

            calculable : true,
            xAxis : [
                {
                    type : 'category',

                    data : ['Disk Read KB/s','Disk Write KB/s','IO/sec']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    max:45
                }
            ],
            series : [
                {
                    name:'Avg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0.0,10.5,1.9]
                },
                {
                    name:'WAvg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0.3,1.7,0.2]
                },
                {
                    name:'Max.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0.0,26.2,3.6]
                }
            ]
        };








        var myChart1 = ec.init(document.getElementById('disk_avg'));
        //var myChart2 = ec.init(document.getElementById('radar2'));
        //var myChart3 = ec.init(document.getElementById('radar3'));
        //var myChart4 = ec.init(document.getElementById('radar4'));
        //var myChart5 = ec.init(document.getElementById('radar5'));
        //var myChart6 = ec.init(document.getElementById('radar6'));
        //myChart1.setOption(option);
        //myChart2.setOption(option);
        //myChart3.setOption(option);
        //myChart4.setOption(option);
        //myChart5.setOption(option);
        myChart1.setOption(option);
    }
);/**
 * Created by yuyang on 15/3/11.
 */
