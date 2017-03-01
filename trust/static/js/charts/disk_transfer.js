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
            title : {
                text: 'Disk Transfer KB/s localdomain (Kbytes)  2014/12/27',

                x: 'center'
            },
            tooltip : {
                trigger: 'axis'

            },
            legend: {
                data:['sda','sda1','sda2','dm-0','dm-1','dm-2'],
                x: 'left'
            },

            dataZoom : {
                show : true,
                realtime : true,
                start : 0,
                end : 100
            },
            xAxis : [
                {
                    type : 'category',
                    boundaryGap : false,
                    axisLine: {onZero: false},
                    data : ['14:46:01', '14:46:31', '14:47:01', '14:47:31', '14:48:01', '14:48:31', '14:49:01', '14:49:31', '14:50:01', '14:50:31', '14:51:01', '14:51:31', '14:52:01', '14:52:31', '14:53:01', '14:53:31', '14:54:01', '14:54:31', '14:55:01', '14:55:31', '14:56:01', '14:56:31', '14:57:01', '14:57:31', '14:58:01', '14:58:31', '14:59:01', '14:59:31', '15:00:01', '15:00:31', '15:01:01', '15:01:31', '15:02:01', '15:02:31', '15:03:01', '15:03:31', '15:04:01', '15:04:31', '15:05:01', '15:05:31', '15:06:01', '15:06:31', '15:07:01', '15:07:31', '15:08:01', '15:08:31', '15:09:01', '15:09:31', '15:10:01', '15:10:31', '15:11:01', '15:11:31', '15:12:01', '15:12:31', '15:13:01', '15:13:31', '15:14:01', '15:14:31', '15:15:01', '15:15:31', '15:16:01', '15:16:31', '15:17:01', '15:17:31', '15:18:02', '15:18:32', '15:19:02', '15:19:32', '15:20:02', '15:20:32', '15:21:02', '15:21:32', '15:22:02', '15:22:32', '15:23:02', '15:23:32', '15:24:02', '15:24:32', '15:25:02', '15:25:32', '15:26:02', '15:26:32', '15:27:02', '15:27:32', '15:28:02', '15:28:32', '15:29:02', '15:29:32', '15:30:02', '15:30:32', '15:31:02', '15:31:32', '15:32:02', '15:32:32', '15:33:02', '15:33:32', '15:34:02', '15:34:32', '15:35:02', '15:35:32', '15:36:02', '15:36:32', '15:37:02', '15:37:32', '15:38:02', '15:38:32', '15:39:02', '15:39:32', '15:40:02', '15:40:32', '15:41:02', '15:41:32', '15:42:02', '15:42:32', '15:43:02', '15:43:32', '15:44:02', '15:44:32', '15:45:02', '15:45:32', '15:46:02', '15:46:32', '15:47:02', '15:47:32', '15:48:02', '15:48:32', '15:49:02', '15:49:32', '15:50:02', '15:50:32', '15:51:02', '15:51:32', '15:52:02', '15:52:32', '15:53:02', '15:53:32', '15:54:02', '15:54:32', '15:55:02', '15:55:32', '15:56:02', '15:56:32', '15:57:02', '15:57:32', '15:58:02', '15:58:32', '15:59:02', '15:59:32', '16:00:02', '16:00:32', '16:01:03', '16:01:33', '16:02:03', '16:02:33', '16:03:03', '16:03:33', '16:04:03', '16:04:33', '16:05:03', '16:05:33', '16:06:03', '16:06:33', '16:07:03', '16:07:33', '16:08:03', '16:08:33', '16:09:03', '16:09:33', '16:10:03', '16:10:33', '16:11:03', '16:11:33', '16:12:03', '16:12:33', '16:13:03', '16:13:33', '16:14:03', '16:14:33', '16:15:03', '16:15:33']
                }
            ],
            yAxis : [
                {

                    type : 'value'

                }
            ],
            series : [
                {
                    name:'sda',
                    type:'line',
                    //itemStyle: {normal: {lineStyle: {type: 'default'}}},
                    data :['0', '1.4', '0.8', '0.3', '0.8', '0.7', '0.7', '0.4', '0.5', '0.5', '0.5', '0.4', '0.5', '0.6', '0.8', '0.7', '0.4', '0.5', '0.5', '0.4', '0.5', '0.5', '0.6', '0.4', '0.7', '0.8', '0.5', '0.4', '0.4', '0.5', '0.5', '0.4', '0.6', '0.6', '0.7', '0.7', '0.3', '0.5', '0.5', '0.4', '0.4', '0.6', '0.5', '0.3', '0.7', '0.7', '0.4', '0.4', '0.4', '0.5', '0.5', '0.4', '0.5', '0.6', '0.7', '0.7', '0.3', '0.5', '0.5', '0.4', '0.5', '0.5', '0.4', '0.3', '0.7', '0.7', '0.4', '0.4', '0.5', '0.6', '0.5', '0.4', '0.5', '0.6', '0.7', '0.7', '0.4', '0.6', '0.5', '0.4', '0.5', '0.5', '0.4', '0.4', '0.7', '0.7', '0.4', '0.4', '0.5', '0.5', '0.5', '0.4', '0.4', '0.6', '0.7', '0.7', '0.4', '0.6', '0.5', '0.3', '0.4', '0.5', '0.5', '0.4', '0.6', '0.8', '0.5', '0.3', '0.4', '0.5', '0.5', '0.4', '0.4', '0.6', '0.8', '0.7', '0.4', '0.5', '0.5', '0.5', '0.7', '0.5', '0.5', '0.4', '0.6', '0.8', '0.5', '0.3', '0.5', '0.5', '0.4', '0.4', '0.4', '0.6', '0.8', '0.6', '0.4', '0.5', '0.4', '0.4', '0.5', '0.5', '0.4', '0.4', '0.7', '0.7', '0.4', '0.3', '0.5', '0.5', '0.6', '0.4', '0.7', '1.3', '1.2', '0.7', '0.4', '0.5', '0.4', '0.5', '0.5', '0.5', '0.5', '0.4', '0.9', '0.5', '0.4', '0.5', '0.4', '0.5', '0.5', '0.5', '0.5', '0.5', '0.6', '0.7', '0.3', '0.6', '0.5', '0.5']
                },
                {
                    name:'sda1',
                    type:'line',
                    data :['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']
                },
                {
                    name:'sda2',
                    type:'line',
                    data:['0', '1.4', '0.8', '0.3', '0.8', '0.7', '0.7', '0.4', '0.5', '0.5', '0.5', '0.4', '0.5', '0.6', '0.8', '0.7', '0.4', '0.5', '0.5', '0.4', '0.5', '0.5', '0.6', '0.4', '0.7', '0.8', '0.5', '0.4', '0.4', '0.5', '0.5', '0.4', '0.6', '0.6', '0.7', '0.7', '0.3', '0.5', '0.5', '0.4', '0.4', '0.6', '0.5', '0.3', '0.7', '0.7', '0.4', '0.4', '0.4', '0.5', '0.5', '0.4', '0.5', '0.6', '0.7', '0.7', '0.3', '0.5', '0.5', '0.4', '0.5', '0.5', '0.4', '0.3', '0.7', '0.7', '0.4', '0.4', '0.5', '0.6', '0.5', '0.4', '0.5', '0.6', '0.7', '0.7', '0.4', '0.6', '0.5', '0.4', '0.5', '0.5', '0.4', '0.4', '0.7', '0.7', '0.4', '0.4', '0.5', '0.5', '0.5', '0.4', '0.4', '0.6', '0.7', '0.7', '0.4', '0.6', '0.5', '0.3', '0.4', '0.5', '0.5', '0.4', '0.6', '0.8', '0.5', '0.3', '0.4', '0.5', '0.5', '0.4', '0.4', '0.6', '0.8', '0.7', '0.4', '0.5', '0.5', '0.5', '0.7', '0.5', '0.5', '0.4', '0.6', '0.8', '0.5', '0.3', '0.5', '0.5', '0.4', '0.4', '0.4', '0.6', '0.8', '0.6', '0.4', '0.5', '0.4', '0.4', '0.5', '0.5', '0.4', '0.4', '0.7', '0.7', '0.4', '0.3', '0.5', '0.5', '0.6', '0.4', '0.7', '1.3', '1.2', '0.7', '0.4', '0.5', '0.4', '0.5', '0.5', '0.5', '0.5', '0.4', '0.9', '0.5', '0.4', '0.5', '0.4', '0.5', '0.5', '0.5', '0.5', '0.5', '0.6', '0.7', '0.3', '0.6', '0.5', '0.5']
                },
                {
                    name:'dm-0',
                    type:'line',
                    data:['0', '2.1', '0.5', '0.2', '1.2', '0.9', '0.5', '0.2', '0.5', '0.6', '0.5', '0.2', '0.5', '0.7', '1.2', '0.6', '0.4', '0.6', '0.5', '0.2', '0.5', '0.6', '0.5', '0.3', '1.2', '0.9', '0.5', '0.2', '0.5', '0.6', '0.5', '0.4', '0.6', '0.7', '1.1', '0.6', '0.4', '0.6', '0.5', '0.2', '0.5', '0.6', '0.4', '0.3', '1.1', '0.9', '0.4', '0.2', '0.5', '0.6', '0.4', '0.2', '0.5', '0.6', '1.1', '0.6', '0.4', '0.6', '0.4', '0.2', '0.5', '0.6', '0.4', '0.3', '1.1', '0.9', '0.4', '0.2', '0.5', '0.6', '0.4', '0.2', '0.5', '0.6', '1.1', '0.6', '0.4', '0.6', '0.4', '0.2', '0.5', '0.6', '0.4', '0.3', '1.1', '0.9', '0.4', '0.2', '0.5', '0.6', '0.4', '0.2', '0.5', '0.6', '1.1', '0.6', '0.4', '0.6', '0.4', '0.2', '0.5', '0.6', '0.4', '0.3', '1.1', '0.9', '0.4', '0.2', '0.5', '0.6', '0.5', '0.2', '0.5', '0.7', '1.1', '0.6', '0.4', '0.6', '0.5', '0.6', '1.1', '0.6', '0.5', '0.3', '1.2', '0.9', '0.5', '0.2', '0.5', '0.6', '0.5', '0.2', '0.5', '0.7', '1.2', '0.6', '0.4', '0.6', '0.5', '0.2', '0.5', '0.6', '0.5', '0.3', '1.2', '0.9', '0.5', '0.2', '0.5', '0.6', '0.7', '0.3', '0.7', '1.5', '1.4', '0.5', '0.5', '0.6', '0.5', '0.3', '0.4', '0.5', '0.5', '0.3', '1.4', '0.5', '0.5', '0.3', '0.4', '0.5', '0.5', '0.3', '0.4', '0.6', '1.1', '0.6', '0.4', '0.5', '0.5', '0.3']
                },
                {
                    name:'dm-1',
                    type:'line',
                    data:['0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0', '0']

                },
                {
                    name:'dm-2',
                    type:'line',
                    data:['0', '0.7', '0.8', '0.3', '0.3', '0.4', '0.3', '0.3', '0.3', '0.3', '0.2', '0.3', '0.3', '0.4', '0.3', '0.3', '0.3', '0.3', '0.2', '0.3', '0.3', '0.4', '0.3', '0.4', '0.3', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.4', '0.3', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.4', '0.3', '0.2', '0.3', '0.2', '0.3', '0.3', '0.4', '0.3', '0.3', '0.3', '0.3', '0.2', '0.3', '0.3', '0.4', '0.3', '0.3', '0.2', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '0.4', '0.3', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.4', '0.3', '0.3', '0.3', '0.3', '0.2', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.4', '0.3', '0.2', '0.3', '0.2', '0.3', '0.3', '0.4', '0.3', '0.3', '0.2', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.2', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '0.4', '0.3', '0.3', '0.3', '0.3', '0.2', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.4', '0.3', '0.2', '0.3', '0.2', '0.4', '0.3', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.2', '0.3', '0.3', '0.3', '0.2', '0.4', '0.3', '1.7', '0.6', '0.3', '0.2', '0.3', '0.2', '0.4', '0.3', '0.4', '0.3', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.2', '0.4', '0.3', '0.3', '0.2', '0.3', '0.2', '0.4', '0.2', '0.4']
                }
            ]
        };




        var myChart1 = ec.init(document.getElementById('disk_transfer'));

        myChart1.setOption(option);
    }
);/**
 * Created by yuyang on 15/3/11.
 */
