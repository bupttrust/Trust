/**
 * Created by DGL on 2016/7/18.
 */
$(document).ready(function() {
    //$(".task-log").scrollTop(9999);
    var eCharts;

    require.config({
        packages: [
            {
                name: 'zrender',
                location: 'zrender-master/src', // zrender与echarts在同一级目录
                main: 'zrender'
            },
            {
                name: 'echarts',
                location: 'echarts-master/src',
                main: 'echarts'
            }
        ]
    });

    require([
            'echarts',
            'echarts/chart/line',
            'echarts/component/legend',
            'echarts/component/axis',
            //'echarts/component/title',
            'echarts/component/tooltip'

        ], initTask
    );

    function initTask(ec) {

        eCharts = ec;
        if (!!$("#cpu_panel tbody tr").length) {
            $("#cpu_panel").css("display", "block");
        }
        if (!!$("#io_panel tbody tr").length) {
            $("#io_panel").css("display", "block");
        }
        if (!!$("#memory_panel tbody tr").length) {
            $("#memory_panel").css("display", "block");
        }
        if (!!$("#network_panel tbody tr").length) {
            $("#network_panel").css("display", "block");
        }
        var myChart_cpu = eCharts.init($("#cpu")[0]);
        var option_cpu = {
            /*
             title: {
             text: 'cpu-示例'
             },
             */
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{c}',
            },
            legend: {
                data: ['系统CPU利用率', '用户CPU利用率', 'CPU等待率', 'CPU空闲率', '浮点计算性能', '向量化比例', '浮点计算次数', '每秒浮点计算峰值', '代码执行效率', 'SSE指令向量化比例', '每秒执行指令总数', 'AVX指令向量化比例']

            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0.2, 0.2],
                min: 0,
                max: 100,
                /*
                 splitLine: {
                 show: false
                 }*/
            },
            series: [{
                name: '系统CPU利用率',
                type: 'line',
                data: (function () {
                    var res = [];
                    var len = 200;
                    while (len--) {
                        //res.push(Math.round(Math.random() * 10+20));
                        res.push(0);
                    }
                    return res;
                })()
            },
                {
                    name: '用户CPU利用率',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: 'CPU等待率',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: 'CPU空闲率',
                    type: 'line',
                   data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '浮点计算性能',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '向量化比例',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '浮点计算次数',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '每秒浮点计算峰值',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '代码执行效率',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: 'SSE指令向量化比例',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '每秒执行指令总数',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: 'AVX指令向量化比例',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },]
        };

        var app_cpu = {};
        clearInterval(app_cpu.timeTicket);
        app_cpu.timeTicket = setInterval(function () {
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);

            var data = option_cpu.series[0].data;
            data.shift();
            data.push($("#系统CPU利用率").text());
            data = option_cpu.series[1].data;
            data.shift();
            data.push($("#用户CPU利用率").text());
            data = option_cpu.series[2].data;
            data.shift();
            data.push($("#CPU等待率").text());
            data = option_cpu.series[3].data;
            data.shift();
            data.push($("#CPU空闲率").text());
            data = option_cpu.series[4].data;
            data.shift();
            data.push($("#浮点计算性能").text());
            data = option_cpu.series[5].data;
            data.shift();
            data.push($("#向量化比例").text());
            data = option_cpu.series[6].data;
            data.shift();
            data.push($("#浮点计算次数").text());
            data = option_cpu.series[7].data;
            data.shift();
            data.push($("#每秒浮点计算峰值").text());
            data = option_cpu.series[8].data;
            data.shift();
            data.push($("#SSE指令向量化比例").text());
            data = option_cpu.series[9].data;
            data.shift();
            data.push($("#每秒执行指令总数").text());
            data = option_cpu.series[9].data;
            data.shift();
            data.push($("#AVX指令向量化比例").text());

            option_cpu.xAxis[0].data.shift();
            option_cpu.xAxis[0].data.push(axisData);
            myChart_cpu.setOption(option_cpu);
        }, 1000);


        var myChart_io = eCharts.init($("#io")[0]);
        var option_io = {
            /*
             title: {
             text: 'io-示例'
             },
             */
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{c}',
            },
            legend: {
                data: ['磁盘读速率', '磁盘写速率', '磁盘利用率', '每秒钟磁盘IO次数', 'IO请求平均等待时间', 'IO请求平均服务时间', 'IO请求平均队列长度']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 200;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0.2, 0.2],
                min: 0,
                max: 100,
                /*
                 splitLine: {
                 show: false
                 }*/
            },
            series: [{
                name: '磁盘读速率',
                type: 'line',
                data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                name: '磁盘写速率',
                type: 'line',
                data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                name: '磁盘利用率',
                type: 'line',
               data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                name: '每秒钟磁盘IO次数',
                type: 'line',
                data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                name: 'IO请求平均等待时间',
                type: 'line',
                data: (function () {
                        var res = [];
                        var len = 200;
                        while (len--) {
                            //res.push(Math.round(Math.random() * 10+50));
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                name: 'IO请求平均服务时间',
                type: 'line',
               data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                }, {
                name: 'IO请求平均队列长度',
                type: 'line',
                data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                }]
        };

        var app_io = {};
        clearInterval(app_io.timeTicket);
        app_io.timeTicket = setInterval(function () {
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);
            var data = option_io.series[0].data;
            data.shift();
            data.push($("#磁盘读速率").text());
            data = option_io.series[1].data;
            data.shift();
            data.push($("#磁盘写速率").text());
            data = option_io.series[2].data;
            data.shift();
            data.push($("#磁盘利用率").text());
            data = option_io.series[3].data;
            data.shift();
            data.push($("#每秒钟磁盘IO次数").text());
            data = option_io.series[4].data;
            data.shift();
            data.push($("#IO请求平均等待时间").text());
            data = option_io.series[5].data;
            data.shift();
            data = option_io.series[6].data;
            data.shift();
            data.push($("#IO请求平均队列长度").text());


            option_io.xAxis[0].data.shift();
            option_io.xAxis[0].data.push(axisData);
            myChart_io.setOption(option_io);
        }, 1000);


 var myChart_memory = eCharts.init($("#memory")[0]);
        var option_memory = {
            /*
             title: {
             text: 'memory-示例'
             },
             */
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{c}',
            },
            legend: {
                data: ['交换区使用率', '空闲交换区', '内存带宽读速率', '内存带宽写速率', '总内存大小', '内存使用率', '活跃内存', '非活跃内存', '空闲内存', '总交换区大小']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0.2, 0.2],
                min: 0,
                max: 100,
                /*
                 splitLine: {
                 show: false
                 }*/
            },
            series: [{
                name: '交换区使用率',
                type: 'line',
                data: (function () {
                    var res = [];
                    var len = 10;
                    while (len--) {
                        res.push(0);
                    }
                    return res;
                })()
            },
                {
                    name: '空闲交换区',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '内存带宽读速率',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '内存带宽写速率',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '总内存大小',
                    type: 'line',
                      data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '内存使用率',
                    type: 'line',
                     data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '活跃内存',
                    type: 'line',
                      data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '非活跃内存',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '空闲内存',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                },
                {
                    name: '总交换区大小',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                }
            ]
        };
        var app_memory = {};
        clearInterval(app_memory.timeTicket);
        app_memory.timeTicket = setInterval(function () {
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);
            var data = option_memory.series[0].data;
            data.shift();
            data.push($("#交换区使用率").text());
            data = option_memory.series[1].data;
            data.shift();
            data.push($("#空闲交换区").text());
            data = option_memory.series[2].data;
            data.shift();
            data.push($("#内存带宽读速率").text());
            data = option_memory.series[3].data;
            data.shift();
            data.push($("#内存带宽写速率").text());
            data = option_memory.series[4].data;
            data.shift();
            data.push($("#总内存大小").text());
            data = option_memory.series[5].data;
            data.shift();
            data.push($("#内存使用率").text());
            data = option_memory.series[6].data;
            data.shift();
            data.push($("#活跃内存").text());
            data = option_memory.series[7].data;
            data.shift();
            data.push($("#非活跃内存").text());
            data = option_memory.series[8].data;
            data.shift();
            data.push($("#空闲内存").text());
            data = option_memory.series[9].data;
            data.shift();
            data.push($("#总交换区大小").text());

            option_memory.xAxis[0].data.shift();
            option_memory.xAxis[0].data.push(axisData);
            myChart_memory.setOption(option_memory);
        }, 1000);


        var myChart_network = eCharts.init($("#network")[0]);
        var option_network = {
            /*
             title: {
             text: 'network-示例'
             },
             */
            tooltip: {
                trigger: 'axis',
                formatter: '{b}<br/>{c}',
            },
            legend: {
                data: ['网络接受速度', '网络发送速度']
            },
            xAxis: [
                {
                    type: 'category',
                    boundaryGap: true,
                    data: (function () {
                        var now = new Date();
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.unshift(now.toTimeString().replace(/^\D*/, '').substr(0, 8));
                            now = new Date(now - 2000);
                        }
                        return res;
                    })()
                }
            ],
            yAxis: {
                type: 'value',
                scale: true,
                boundaryGap: [0.2, 0.2],
                min: 0,
                max: 100,
                /*
                 splitLine: {
                 show: false
                 }*/
            },
            series: [{
                name: '网络接受速度',
                type: 'line',
                data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                    return res;
                })()
            },
                {
                    name: '网络发送速度',
                    type: 'line',
                    data: (function () {
                        var res = [];
                        var len = 10;
                        while (len--) {
                            res.push(0);
                        }
                        return res;
                    })()
                }]
        };
        var app_network = {};
        clearInterval(app_network.timeTicket);
        app_network.timeTicket = setInterval(function () {
            var axisData = (new Date()).toTimeString().replace(/^\D*/, '').substr(0, 8);
            var data = option_memory.series[0].data;
            data.shift();
            data.push($("#网络接受速度").text());
            data = option_network.series[1].data;
            data.shift();
            data.push($("#网络发送速度").text());

            option_network.xAxis[0].data.shift();
            option_network.xAxis[0].data.push(axisData);
            myChart_network.setOption(option_network);
        }, 1000);

    }
});