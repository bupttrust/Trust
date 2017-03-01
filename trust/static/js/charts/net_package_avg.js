/**
 * Created by yuyang on 15/3/11.
 */
/**
 * Created by yuyang on 15/3/11.
 */
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
                text:'Network Packets localdomain  2014/12/27',
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

                    data : ['lo-read/s','em1-read/s','em2-read/s','em3-read/s','em4-read/s','vmnet1-read/s','vmnet8-read/s','lo-write/s','em1-write/s','em2-write/s','em3-write/s','em4-write/s','vmnet1-write/s','vmnet8-write/s']
                }
            ],
            yAxis : [
                {
                    type : 'value'
                }
            ],
            series : [
                {
                    name:'Avg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0,479.3,0,0,0,0,0,0,522.6,0,0,0,0,0]
                },
                {
                    name:'WAvg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0,131.8,0,0,0,0,0,0,149,0,0,0,0,0]
                },
                {
                    name:'Max.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0,77.9,0,0,0,0,0,0,89,0,0,0,0,0]
                }
            ]
        };








        var myChart1 = ec.init(document.getElementById('net_package_avg'));


        myChart1.setOption(option);
    }
);/**
 * Created by yuyang on 15/3/11.
 */
