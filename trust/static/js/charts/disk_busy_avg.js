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
                text:'Disk %Busy localdomain (Kbytes)  2014/12/27',
                x:'center'
            },
            tooltip : {
                trigger: 'axis'
            },
            legend: {
                data:['Avg.','WAvg.','Max.','SortKey'],
                x:'left'
            },

            calculable : true,
            xAxis : [
                {
                    type : 'category',

                    data : ['sda','sda1','sda2','dm-0','dm-1','dm-2']
                }
            ],
            yAxis : [
                {
                    type : 'value',
                    max:100
                }
            ],
            series : [
                {
                    name:'Avg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0.6,0.6,0.3,0.2,0.0,0.0]
                },
                {
                    name:'WAvg.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0,0,0,0,0,0]
                },
                {
                    name:'Max.',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0.7,0.7, 0.4,0.5,0,0]
                },

                {
                    name:'SortKey',
                    type:'bar',
                    stack: '总量',
                    itemStyle: {normal: {areaStyle: {type: 'default'}}},
                    data:[0.6,0.6,0.4,0.3,0,0]
                }
            ]
        };








        var myChart1 = ec.init(document.getElementById('disk_busy_avg'));


        myChart1.setOption(option);
    }
);/**
 * Created by yuyang on 15/3/11.
 */
