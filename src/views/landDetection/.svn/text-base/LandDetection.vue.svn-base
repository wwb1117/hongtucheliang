<template>
    <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-1 col-md-1 control-label">检测方案：</label>
                                <label class="checkbox-inline i-checks" v-for="checkPlain in checkPlainList" @click="showCheckItem(checkPlain)">
                                    <input type="radio" id="checkPlain.id" v-bind:value="checkPlain.id" v-model="checkParams.checkPlainId"><i></i> {{checkPlain.name}}
                                </label>
                            </div>
                            <div class="form-group">
                                <label class="col-sm-1 col-md-1 control-label">检测项：</label>
                                 <label class="checkbox-inline i-checks"v-for="checkItem in itemList">
                                    <input type="checkbox" id="checkItem.id" v-bind:value="checkItem.id" v-model="checkedItemIds" disabled><i></i> {{checkItem.itemName}}
                                </label>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="row">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div class="panel panel-default">
                                <div class="panel-body">
                                    <div class="form-group" style="margin-top: 10px;">
                                        <label class="col-sm-2 col-md-2 control-label">VIN码：</label>
                                        <div class="col-sm-10 col-md-10">
                                            <input type="text" class="form-control" placeholder="VIN">
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">部门：</label>
                                        <div class="col-sm-10 col-md-10">
                                            <select name="account" class="form-control">
                                                <option>部门 1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <label class="col-sm-2 col-md-2 control-label">人员：</label>
                                        <div class="col-sm-10 col-md-10">
                                            <select name="account" class="form-control m-b">
                                                <option>人员 1</option>
                                            </select>
                                        </div>
                                    </div>
                                    <div class="form-group">
                                        <div class="col-sm-10 col-md-10 col-sm-offset-2 col-md-offset-2">
                                            <button type="button" class="btn btn-primary btn-sm">查询</button>
                                            <button type="button" class="btn btn-success btn-sm">批量检测</button>
                                            <button type="button" class="btn btn-danger btn-sm">自动检测</button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-lg-6 col-md-6 col-sm-12 col-xs-12">
                            <div class="row">
                                <div class="col-md-3 col-sm-6 col-xs-12 J-inwork-item video-link-wrap">
                                    <div class="card bd-inwork-item">
                                        <div class="bd-card-mod">
                                            <div class="img-outer">
                                                <div class="img-inner">
                                                    <div class="info-box">
                                                        <span class="info-box-icon bg-aqua">
                                                            <i class="fa fa-file-o"></i>
                                                        </span>
                                                        <div class="info-box-content">
                                                            <span class="info-box-number">10010</span>
                                                        </div>
                                                    </div>
                                                    <div class="bd-work-coverbg">
                                                        <div class="bd-work-slogan">
                                                            <p style="box-sizing: border-box; margin: 0px 0px 10px; color: #fff;">
                                                                已检测
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 col-xs-12 J-inwork-item video-link-wrap">
                                    <div class="card bd-inwork-item">
                                        <div class="bd-card-mod">
                                            <div class="img-outer">
                                                <div class="img-inner">
                                                    <div class="info-box1">
                                                        <span class="info-box-icon bg-aqua1">
                                                            <i class="icon-grid"></i>
                                                        </span>
                                                        <div class="info-box-content">
                                                            <span class="info-box-number">10010</span>
                                                        </div>
                                                    </div>
                                                    <div class="bd-work-coverbg">
                                                        <div class="bd-work-slogan">
                                                            <p style="box-sizing: border-box; margin: 0px 0px 10px; color: #fff;">
                                                                未检测
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 col-xs-12 J-inwork-item video-link-wrap">
                                    <div class="card bd-inwork-item">
                                        <div class="bd-card-mod">
                                            <div class="img-outer">
                                                <div class="img-inner">
                                                    <div class="info-box2">
                                                        <span class="info-box-icon bg-aqua2">
                                                            <i class="fa fa-database"></i>
                                                        </span>
                                                        <div class="info-box-content">
                                                            <span class="info-box-number">10010</span>
                                                        </div>
                                                    </div>
                                                    <div class="bd-work-coverbg">
                                                        <div class="bd-work-slogan">
                                                            <p style="box-sizing: border-box; margin: 0px 0px 10px; color: #fff;">
                                                                检测成功
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-md-3 col-sm-6 col-xs-12 J-inwork-item video-link-wrap">
                                    <div class="card bd-inwork-item">
                                        <div class="bd-card-mod">
                                            <div class="img-outer">
                                                <div class="img-inner">
                                                    <div class="info-box3">
                                                        <span class="info-box-icon bg-aqua3">
                                                            <i class="fa fa-bookmark-o"></i>
                                                        </span>
                                                        <div class="info-box-content">
                                                            <span class="info-box-number">10010</span>
                                                        </div>
                                                    </div>
                                                    <div class="bd-work-coverbg">
                                                        <div class="bd-work-slogan">
                                                            <p style="box-sizing: border-box; margin: 0px 0px 10px; color: #fff;">
                                                                检测失败
                                                            </p>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="row">
                                <div class="col-sm-12">
                                    <div class="panel b-a">
                                        <div class="panel-heading b-b b-light">
                                            <span class="badge bg-warning pull-right">10</span>
                                            <span href class="font-bold">检测消息反馈</span>
                                        </div>
                                        <div class="scroll-wrap" style="height:155px;overflow:hidden;">
                                            <ul class="list-group list-group-lg no-bg scroll-content" :style="{ top }">
                                                <li class="list-group-item clearfix" v-for="(message, index) in msgList">
                                                    <span class="clear">
                                                    <span class="font-bold">检测异常{{index}}</span>
                                                        <small class="text-muted clear text-ellipsis">{{message.price}}</small>
                                                    </span>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <div class="row" style="margin-top:-15px">
               <div class="panel panel-default">
                    <div class="panel-body">
                        <el-table :data="lectotypeListData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" ref="multipleTable">
                            <el-table-column type="selection" width="55"></el-table-column>
                            <el-table-column prop="module" label="序号" width="60">
                                <template slot-scope="scope">
                                    <span>{{ pageSize * (pageNum - 1)  + 1 + scope.$index  }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value"></el-table-column>
                            <el-table-column label="状态">
                                <template slot-scope="scope">
                                    <button type="button" class="btn btn-info btn-xs"  @click="dialogTableVisible = true"><i class="fa fa-info"></i> 检测中</button>
                                </template>
                            </el-table-column>
                            <el-table-column label="操作" :width="160">
                                <template slot-scope="scope">
                                    <button type="button" class="btn btn-success btn-xs"  @click="editLectotype(lectotypeListData[scope.$index])"><i class="fa fa-wrench"></i> 检 测</button>
                                    <button type="button" class="btn btn-danger btn-xs" @click="deleteLectotype(lectotypeListData[scope.$index].id)"><i class="fa fa-filter"></i> 通 过</button>
                                </template>
                            </el-table-column>
                        </el-table>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="检测结果" :visible.sync="dialogTableVisible">
            <el-tabs v-model="activeName">
                <el-tab-pane label="常规检测" name="first">
                    <el-table :data="tableData" style="width: 100%">
                        <el-table-column
                            prop="date"
                            label="检测项"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="name"
                            label="检测结果"
                            width="180">
                        </el-table-column>
                        <el-table-column
                            prop="address"
                            label="检测时间">
                        </el-table-column>
                    </el-table>
                </el-tab-pane>
                <el-tab-pane label="锁车检测" name="second">
                    <el-steps :space="200" :active="1">
                        <el-step title="激活" description="激活指令已下发"></el-step>
                        <el-step title="激活中" description="正在激活中"></el-step>
                        <el-step title="未锁车" description="激活成功，未锁车"></el-step>
                        <el-step title="锁车" description="下发锁车指令"></el-step>
                        <el-step title="锁车中" description="正在锁车中"></el-step>
                        <el-step title="已锁车" description="锁车成功"></el-step>
                        <el-step title="解锁" description="正在锁车中"></el-step>
                    </el-steps>
                </el-tab-pane>
                <el-tab-pane label="抓拍检测" name="third">
                    <el-row>
                        <el-col :span="5" v-for="(o, index) in 4" :key="o" :offset="index > 0 ? 1 : 0">
                            <el-card :body-style="{ padding: '0px' }">
                            <img src="static/img/hamburger.png" class="image">
                            <div style="padding: 14px;">
                                <div class="time">2017-11-10 16:26:38</div>
                                <div>
                                    <span>摄像头{{index}}</span>
                                    <el-button type="text" class="button"> 检测</el-button>
                                </div>
                            </div>
                            </el-card>
                        </el-col>
                    </el-row>
                </el-tab-pane>
            </el-tabs>
        </el-dialog>
    </div>
</template>

<script>
    import lectotypeApi from 'api/lectotypeList'
    import checkPlanApi from 'api/checkPlan'
    import checkItemApi from 'api/checkItem'
    import SockJS from 'sockjs-client'
    import Stomp from 'stompjs'

    export default {
        props: ["isRefresh"],
        data() {
            return {
                activeName: 'second',
                dialogTableVisible:false,
                checkParams:{checkPlainId:''},
                // 所有检测项列表
                itemList:[],
                // 当前检测方案所选中的检测项列表
                checkedItemIds:[],
                columns: [{
                    value: 'name',
                    label: 'VIN'
                }, {
                    value: 'value',
                    label: '车牌号'
                }, {
                    value: 'createUser',
                    label: '部门'
                }, {
                    value: 'createTime',
                    label: '人员'
                }, {
                    value: 'updateUser',
                    label: '状态'
                }],
                // 车辆选型 列表数据
                lectotypeListData:[],
                checkPlainList:[],
                searchParams: {},
                totals: 0,
                pageNum: 1,
                pageSize: 10,
                loading: true,
                stompClient: null,
                subObj:{},
                msgList:[],
                activeIndex: 0,
                tableData: [{
                    date: '大灯',
                    name: '正常',
                    address: '2017-11-10 16:26:38'
                }, {
                    date: '大灯',
                    name: '正常',
                    address: '2017-11-10 16:26:38'
                }, {
                    date: '大灯',
                    name: '正常',
                    address: '2017-11-10 16:26:38'
                }, {
                    date: '大灯',
                    name: '正常',
                    address: '2017-11-10 16:26:38'
                }]
            }
        },
        computed: {
            top() {
                return - this.activeIndex * 51 + 'px';
            }
        },
        methods: {
            pageSizeChange(val) {
                this.pageSize = val
                this.getLectotypeList(this.searchParams)
            },
            pageCurrentChange(val) {
                this.pageNum = val
                this.getLectotypeList(this.searchParams)
            },
            initData(){
                this.getCheckPlanByUser()
                this.getAllCheckItem()
                this.pageNum = 1
                this.pageSize = 10
                this.getLectotypeList(this.searchParams)
                this.connected()
            },
             // 获取车辆选型列表
            getLectotypeList(params){
                params.pageNum = this.pageNum
                params.pageSize = this.pageSize
                lectotypeApi.getLectotypeList(params).then(response => {
                    if (response.code === 200){
                        this.lectotypeListData = response.data.rows;
                        this.totals = response.data.total;
                        this.loading = false;
                    }else{
                        this.$message.error("获取车辆选型数据出错！")
                    }
                }).catch(error => {
                    this.$message.error("获取车辆选型数据出错！")
                    console.log(error)
                });
            },
            getAllCheckItem(){
                checkItemApi.getAllCheckItem().then(response =>{
                    if (response.code === 200){
                        this.itemList = response.data;
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            getCheckPlanByUser(){
                checkPlanApi.getCheckPlanByUser().then(response =>{
                    if (response.code === 200){
                        this.checkPlainList = response.data;
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            showCheckItem(checkPlain){
                this.checkedItemIds = []
                let checkedItemList = checkPlain.checkItemName

                if(checkedItemList){
                    for(let i = 0;i < checkedItemList.length;i++){
                        this.checkedItemIds.push(checkedItemList[i].itemId)
                    }
                }
            },
            connected: function () {
                console.log("第一步：封装客户端")
                let ws = new SockJS("http://www.hopechart.com/api/test-info/")

                this.stompClient = Stomp.over(ws)

                console.log("第二步：和服务端建立连接")
                this.stompClient.connect({}, this.subscribe);
            },
            subscribe:function(){
                console.log("第二步：订阅相关主题")
                this.subObj = this.stompClient.subscribe('/stock/price', this.pushMsg);
            },
            pushMsg(msg){
                this.msgList.push(JSON.parse(msg.body))
            },
            scroll(){
                if(this.activeIndex < this.msgList.length && this.msgList.length > 3) {
                    this.activeIndex += 1;
                } else {
                    this.activeIndex = 0;
                }
            },
            showCheckResult(){

            }
        },
        activated() {
            if (this.isRefresh) {
                this.initData()
            }
        },
        beforeDestroy(){
            this.stompClient.disconnect(this.unsubscribe())
        },
        mounted() {
            setInterval(this.scroll, 1000);
        }
    }
</script>

<style scoped>
    /*
                                              */
    body {
        font-family: 思源黑体;
    }
    .video-link-wrap {
        padding-right: 0 !important;
    }
    .bd-inwork-item {
        cursor: pointer;
        /*margin-right: 24px !important;*/
        border: none;
        border-radius: 0;
        font-size: 16px;
        color: #ffffff;
        line-height: 16px;
        text-align: center;
        background-color: transparent;
    }
    .bd-inwork-item .bd-card-title {
        padding: 15px 0;
    }
    .bd-card-mod {
        position: relative;
    }
    .bd-card-mod .img-outer {
        padding-bottom: 62%;
    }
    .bd-card-mod .card-img {
        width: 100%;
        height: 100%;
    }
    .bd-work-coverbg {
        display: none;
        position: absolute;
        height: 45px;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(0, 0, 0, 0.30);
    }
    .bd-work-cover {
        display: none;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0%;
        text-align: center;
        transform: -webkit-translate(0%, -50%);
        transform: -moz-translate(0%, -50%);
        transform: -o-translate(0%, -50%);
        transform: -ms-translate(0%, -50%);
        transform: translate(0%, -50%);
    }
    .bd-work-cover img {
        margin-bottom: 7px;
    }
    .bd-work-slogan {
        font-size: 17px;
        line-height: 45px;
        color: #ffffff;
    }
    .bd-work-cover {
        display: none;
        width: 100%;
        position: absolute;
        top: 50%;
        left: 0%;
        text-align: center;
        vert-align: middle;
        transform: -webkit-translate(0%, -50%);
        transform: -moz-translate(0%, -50%);
        transform: -o-translate(0%, -50%);
        transform: -ms-translate(0%, -50%);
        transform: translate(0%, -50%);
    }
    .bd-inwork-item:hover .bd-work-cover {
        display: block;
    }
    .bd-inwork-item:hover .bd-work-coverbg {
        display: block;
        height: 45px;
    }
    .bd-inwork-item:hover .bd-card-title {
        color: #000;
        background: #f8f8f8;
        outline: 1px solid #d6d6d6;
        box-shadow: 0 0 24px 0 rgba(0, 0, 0, 0.20);
    }
    .bd-inwork-item:hover .bd-font-bottomline {
        display: block;
        animation: mymove 1s;
        -webkit-animation: mymove 1s;
        /* Safari å’Œ Chrome */
        -webkit-animation: mymove 1s;
        -moz-animation: mymove 1s;
        -o-animation: mymove 1s;
        animation-fill-mode: forwards;
        margin: 0 auto;
        margin-top: 14px;
        border-bottom: 4px #000000 solid;
        border-radius: 6px;
    }
    @keyframes mymove {
        100% {
            width: 100%;
        }
    }
    @-moz-keyframes mymove {
        100% {
            width: 100%;
        }
    }
    @-webkit-keyframes mymove {
        100% {
            width: 100%;
        }
    }
    @-o-keyframes mymove {
        100% {
            width: 100%;
        }
    }
   .scroll-wrap{
        overflow: hidden;
    }

    .scroll-content{
        position: relative;
        transition: top 0.5s;
    }
    .bd-inwork-item {
        cursor: pointer;
        height: 45px;
        margin-bottom: 10px;
        /*margin-right: 24px !important;*/
        border: none;
        border-radius: 0;
        font-size: 16px;
        color: #ffffff;
        line-height: 16px;
        text-align: center;
        background-color: transparent;
    }
    .bd-card-mod {
        position: relative;
    }
    .info-box {
        display: block;
        height: 45px;
        background-color: #8e85c8 !important;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        color: #fff !important;
        z-index: -1;
    }
    .info-box a {
        color: #fff !important;
        z-index: 1;
    }
    .info-box1 {
        display: block;
        min-height: 45px;
        background-color: #33b87b !important;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        margin-bottom: 15px;
        color: #fff !important;
    }
    .info-box1 a {
        color: #fff !important;
        z-index: 1;
    }
    .info-box2 {
        display: block;
        min-height: 45px;
        background-color: #e46f61 !important;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        margin-bottom: 15px;
        color: #fff !important;
    }
    .info-box2 a {
        color: #fff !important;
        z-index: 1;
    }
    .info-box3 {
        display: block;
        min-height: 45px;
        background-color: #33cdf2 !important;
        width: 100%;
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.1);
        border-radius: 2px;
        margin-bottom: 15px;
        color: #fff !important;
    }
    .info-box3 a {
        color: #fff !important;
        z-index: 1;
    }
    .info-box-content {
        padding: 5px 10px;
        margin-left: 50px;
    }
    .info-box-number {
        font-weight: 400;
        font-size: 14px;
        text-align: center;
        vertical-align: middle;
    }
    .bg-aqua {
        background-color: #7266ba !important;
        color: #fff !important;
        z-index: 2;
    }
    .bg-aqua1 {
        background-color: #00a65a !important;
        color: #fff !important;
    }
    .bg-aqua2 {
        background-color: #dd4b39 !important;
        color: #fff !important;
    }
    .bg-aqua3 {
        background-color: #00c0ef !important;
        color: #fff !important;
    }
    a.info-box:hover {
        /*    background-color: #6254b2;*/
        display: block;
        background-color: rgba(0, 0, 0, 0.1);
        box-shadow: 0 1px 1px rgba(0, 0, 0, 0.2);
        border-radius: 2px;
        z-index: 1001;
    }
    .info-box-icon {
        border-top-left-radius: 2px;
        border-top-right-radius: 0;
        border-bottom-left-radius: 2px;
        border-bottom-right-radius: 0;
        display: block;
        float: left;
        height: 45px;
        width: 50px;
        text-align: center;
        font-size: 22px;
        line-height: 45px;
        background-color: rgba(0, 0, 0, 0.2);
    }
    .list-group-lg .list-group-item {
        padding-top: 0;
        padding-bottom: 15px;
    }
    .panel>.list-group,
    .panel>.panel-collapse>.list-group {
        height: 152px;
        margin-bottom: 0;
    }
    .desc {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        -webkit-transition: all 450ms ease 295ms;
        -moz-transition: all 450ms ease 295ms;
        -ms-transition: all 450ms ease 295ms;
        transition: all 450ms ease 295ms;
        opacity: 0;
        display: none;
        background-repeat: no-repeat;
        /* display: block;*/
        margin-top: 0px;
        margin-right: 0px;
        /*  width: 285px;
                                                        height: 200px;*/
        background: rgba(37, 42, 60, 0.88);
        overflow: hidden;
        padding: 10px;
    }
    .button {
        padding: 0;
        float: right;
    }
    .image {
        width: 100%;
        display: block;
    }
    .time {
        font-size: 12px;
        color: #999;
        white-space:nowrap;
    }

</style>
