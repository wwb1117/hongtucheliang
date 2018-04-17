<template>
    <div class="wrapper-md">
        <div class="row">
            <!-- 数据看板 START -->
            <div class="col-md-12">
                <div class="row row-sm text-center">
                    <div class="col-xs-6 col-md-3">
                        <a class="block panel bg-defealt padder-v item">
                            <span class="block text-info font-thin h1">521</span>
                            <span class="text-muted text-xs">下线车辆数</span>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href class="block panel padder-v bg-primary item">
                            <span class="text-white font-thin h1 block">930</span>
                            <span class="text-muted text-xs">入库车辆数</span>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a href class="block panel padder-v bg-info item">
                            <span class="text-white font-thin h1 block">432</span>
                            <span class="text-muted text-xs">检测中车辆数</span>
                        </a>
                    </div>
                    <div class="col-xs-6 col-md-3">
                        <a class="block panel padder-v bg-block item">
                            <span class="block text-info font-thin h1">129</span>
                            <span class="text-muted text-xs">待检测车辆数</span>
                        </a>
                    </div>
                </div>
            </div>
            <!-- Echarts START -->
            <div class="col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">下线与入库效率分析</div>
                    <div class="panel-body">
                        <Echart :option="echartOption"></Echart>
                    </div>
                </div>
            </div>
            <!-- Echarts END -->
            <!-- 数据列表 START -->
            <div class="col-sm-12">
                <ul id="myTab" class="nav nav-tabs">
                    <li class="active">
                        <a href="#home" data-toggle="tab" class="font-bold">通过率数据统计</a>
                    </li>
                    <li>
                        <a href="#ios" data-toggle="tab" class="font-bold">通过下线数据统计</a>
                    </li>
                </ul>
                <div id="myTabContent" class="tab-content panel panel-default">
                    <div class="tab-pane fade in active" id="home">
                        <div class="table-responsive">
                            <table class="table m-b-none">
                                <tbody>
                                    <tr>
                                        <td>时间</td>
                                        <td>01:00</td>
                                        <td>02:00</td>
                                        <td>03:00</td>
                                        <td>04:00</td>
                                        <td>05:00</td>
                                        <td>06:00</td>
                                        <td>07:00</td>
                                    </tr>
                                    <tr>
                                        <td>下线</td>
                                        <td>01:00</td>
                                        <td>02:00</td>
                                        <td>03:00</td>
                                        <td>04:00</td>
                                        <td>05:00</td>
                                        <td>06:00</td>
                                        <td>07:00</td>
                                    </tr>
                                    <tr>
                                        <td>入库</td>
                                        <td>01:00</td>
                                        <td>02:00</td>
                                        <td>03:00</td>
                                        <td>04:00</td>
                                        <td>05:00</td>
                                        <td>06:00</td>
                                        <td>07:00</td>
                                    </tr>
                                    <tr>
                                        <td>效率</td>
                                        <td>01:00</td>
                                        <td>02:00</td>
                                        <td>03:00</td>
                                        <td>04:00</td>
                                        <td>05:00</td>
                                        <td>06:00</td>
                                        <td>07:00</td>
                                    </tr>
                                    <tr>
                                        <td>时间</td>
                                        <td>01:00</td>
                                        <td>02:00</td>
                                        <td>03:00</td>
                                        <td>04:00</td>
                                        <td>05:00</td>
                                        <td>06:00</td>
                                        <td>07:00</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div class="tab-pane fade" id="ios">
                        <div class="table-responsive">
                        </div>
                    </div>
                </div>
            </div>
            <!-- 数据列表 END -->
        </div>
    </div>
</template>

<script>
    import Echart from 'components/Echart'
    export default {
        name: 'HQIndex',
        data() {
            return {
                echartOption: {
                    color: ['#a193f1', '#64e0f6', '#99f25d', '#c23531'],
                    title: {
                        text: ''
                    },
                   /* tooltip: {
                        trigger: 'axis',
                        axisPointer: {
                            type: 'cross',
                            crossStyle: {
                                color: '#999'
                            }
                        }
                    }, */
                    legend: {
                        data: ['下线', '入库', '检测', '通过入库率']
                    },
                    grid: {
                        left: '3%',
                        right: '3%',
                        bottom: '2%',
                        containLabel: true
                    },
                    toolbox: {
                        feature: {
                            dataView: {
                                show: true,
                                readOnly: false
                            },
                            magicType: {
                                show: true,
                                type: ['line', 'bar']
                            },
                            restore: {
                                show: true
                            },
                            saveAsImage: {
                                show: true
                            }
                        }
                    },
                    xAxis: [{
                        type: 'category',
                        data: ['1月', '2月', '3月', '4月', '5月', '6月', '7月', '8月', '9月', '10月', '11月', '12月'],
                        axisPointer: {
                            type: 'shadow'
                        }
                    }],
                    yAxis: [{
                        type: 'value',
                        name: '',
                        min: 0,
                        max: 500,
                        interval: 100,
                        axisLabel: {
                            formatter: '{value} 个'
                        }
                    },
                    {
                        type: 'value',
                        name: '百分百',
                        min: 0,
                        max: 100,
                        interval: 20,
                        axisLabel: {
                            formatter: '{value} %'
                        }
                    }
                    ],
                    series: [{
                        name: '下线',
                        type: 'bar',
                        data: [10, 20, 30, 40, 50, 80, 100, 200, 150, 100, 110, 120]
                    },
                    {
                        name: '入库',
                        type: 'bar',
                        data: [10, 20, 30, 40, 80, 100, 200, 100, 120, 60, 40, 20]
                    },
                    {
                        name: '检测',
                        type: 'bar',
                        data: [20, 40, 60, 80, 100, 120, 300, 70, 100, 60, 40, 10]
                    },
                    {
                        name: '通过入库率',
                        type: 'line',
                        yAxisIndex: 1,
                        data: [2.0, 5.2, 8.3, 10.5, 12.3, 10.2, 20.3, 28.4, 23.0, 16.5, 12.0, 6.2]
                    }
                    ]
                }
            }
        },
        components: {
            Echart
        }
    }
</script>


<style scoped>
    /*
        */
    .bg-defealt {
        background-color: #e4eaec;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        color: #6254b2;
    }
    .text-info {
        /*  color: #23b7e5;*/
        color: #6254b2;
    }
    .bg-primary {
        color: #f4f3f9;
        background-color: #7266ba;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
    }
    .bg-info {
        color: #dcf2f8;
        background-color: #23b7e5;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
    }
    .bg-block {
        background-color: #fff;
        box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        -webkit-box-shadow: 0 3px 6px rgba(0, 0, 0, .1);
        color: #6254b2;
    }
    a {
        color: #444;
        /* color: #428bca; */
        text-decoration: none;
        cursor: pointer;
    }
    .nav-tabs>li.active>a,
    .nav-tabs>li.active>a:hover,
    .nav-tabs>li.active>a:focus {
        color: #444;
        cursor: default;
        background-color: #fff;
        border: 1px solid #ddd;
        border-bottom-color: transparent;
    }
    .nav-tabs>li:hover>a,
    .nav-tabs>li.active>a,
    .nav-tabs>li.active>a:hover {
        border-top-color: #3c8dbc;
        border-top-width: 3px;
    }
    .nav-tabs>li.active>a:focus {
        color: #555;
        cursor: default;
        background-color: #fff;
        border-top-color: #3c8dbc;
        border-top-width: 3px;
        border-bottom-color: transparent;
    }
</style>
