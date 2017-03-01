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
                text:'Network I/O localdomain (KB/s)  2014/12/27',
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

                    data : ['lo-read','em1-read','em2-read','em3-read','em4-read','vmnet1-read','vmnet8-read','lo-write','em1-write','em2-write','em3-write','em4-write','vmnet1-write','vmnet8-write']
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
                    data:[0,150.6,0,0,0,0,0,0,217.3,0,0,0,0,0]
                },
                {
                    name:'WAvg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0,41.9,0,0,0,0,0,0,62.1,0,0,0,0,0]
                },
                {
                    name:'Max.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0,25,0,0,0,0,0,0,37.6,0,0,0,0,0]
                }
            ]
        };








        var myChart1 = ec.init(document.getElementById('net_avg'));


        myChart1.setOption(option);
    }
);/**
 * Created by yuyang on 15/3/11.
 */
