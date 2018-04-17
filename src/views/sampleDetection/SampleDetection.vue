<template>
    <div class="wrapper-md">
        <!-- 查询条件 start-->
        <div class="row">
            <div class="col-md-12 col-sm-12">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-1 control-label">检测方案：</label>
                                <div class="col-sm-5">
                                    <select name="account" class="form-control m-b">
                                        <option>重卡检测</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                    </select>
                                </div>
                                <div class="col-sm-6">
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option1"><i></i> 激活
                                    </label>
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option2"><i></i> 锁车
                                    </label>
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option3"><i></i> 解锁
                                    </label>
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option4"><i></i> 关闭
                                    </label>
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option4"><i></i> 关闭
                                    </label>
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option4"><i></i> 关闭
                                    </label>
                                    <label class="checkbox-inline i-checks">
                                        <input type="checkbox" value="option4"><i></i> 关闭
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label class="col-md-1 control-label">VIN码：</label>
                                <div class="col-sm-2">
                                    <select name="account" class="form-control m-b">
                                        <option>VIN码</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                    </select>
                                </div>
                                <label class="col-md-1 control-label">部门：</label>
                                <div class="col-sm-2">
                                    <select name="account" class="form-control m-b">
                                        <option>部门</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                    </select>
                                </div>
                                <label class="col-md-1 control-label">人员：</label>
                                <div class="col-sm-2">
                                    <select name="account" class="form-control m-b">
                                        <option>人员</option>
                                        <option>option 2</option>
                                        <option>option 3</option>
                                        <option>option 4</option>
                                    </select>
                                </div>
                                <div class="col-sm-3">
                                    <button type="button" class="btn btn-danger btn-sm">抽 检</button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-12">
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        检测操作
                    </div>
                    <div class="table-responsive">
                        <div class="col-sm-12 col-md-12">
                            <table class="table table-striped b-t b-light table-bordered" data-target="table">
                                <tr data-toggle="collapse" data-target="#collapseThree">
                                    <th>
                                        VIN码
                                    </th>
                                    <td>1610079413</td>
                                    <th>下线时间</th>
                                    <td>2017-5-10 10:00：59</td>
                                    <th>状态</th>
                                    <td>
                                        通过
                                        <a><i class="fa fa-check text-success text"></i></a>
                                    </td>
                                </tr>
                                <tr id="collapseThree" class="collapse in">
                                    <td colspan="6">
                                        <table class="table b-t b-light table-striped" data-target="table">
                                            <thead>
                                                <tr>
                                                    <th>最后上报时间</th>
                                                    <th>类型</th>
                                                    <th>状态</th>
                                                    <th>操作</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>
                                                        2017-5-10 10:00
                                                    </td>
                                                    <td>定位</td>
                                                    <td>
                                                        未通过
                                                    </td>
                                                    <td data-value="1"><a class="label bg-success" title="Active">检测</a></td>
                                                    <!-- <td>
                                                    <a href ui-toggle-class><i
                                                            class="fa fa-check text-success text-active"></i><i
                                                            class="fa fa-times text-danger text"></i></a>
                                                </td>-->
                                                </tr>
                                                <tr>
                                                    <td>
                                                        2017-5-10 10:00
                                                    </td>
                                                    <td>定位</td>
                                                    <td>
                                                        通过
                                                    </td>
                                                    <td data-value="1"><a class="label bg-success" title="Active">提交</a></td>
                                                    <!--  <td>
                                                    <a href ui-toggle-class><i
                                                            class="fa fa-check text-success text-active"></i><i
                                                            class="fa fa-times text-danger text"></i></a>
                                                </td>-->
                                                </tr>
                                            </tbody>
                                        </table>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        VIN码
                                    </th>
                                    <td>1610079413</td>
                                    <th>下线时间</th>
                                    <td>2017-5-10 10:00：59</td>
                                    <th>状态</th>
                                    <td>
                                        通过
                                        <a><i class="fa fa-check text-success text"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        VIN码
                                    </th>
                                    <td>1610079413</td>
                                    <th>下线时间</th>
                                    <td>2017-5-10 10:00：59</td>
                                    <th>状态</th>
                                    <td>
                                        通过
                                        <a><i class="fa fa-check text-success text"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        VIN码
                                    </th>
                                    <td>1610079413</td>
                                    <th>下线时间</th>
                                    <td>2017-5-10 10:00：59</td>
                                    <th>状态</th>
                                    <td>
                                        未通过
                                        <a><i class="fa fa-times text-danger text"></i></a>
                                    </td>
                                </tr>
                                <tr>
                                    <th>
                                        VIN码
                                    </th>
                                    <td>1610079413</td>
                                    <th>下线时间</th>
                                    <td>2017-5-10 10:00：59</td>
                                    <th>状态</th>
                                    <td>
                                        未通过
                                        <a><i class="fa fa-times text-danger text"></i></a>
                                    </td>
                                </tr>
                            </table>
                        </div>
                    </div>
                    <footer class="panel-footer">
                        <div class="row">
                            <div class="col-sm-4 hidden-xs">
                                <select class="input-sm form-control w-sm inline v-middle">
                                    <option value="0">Bulk action</option>
                                    <option value="1">Delete selected</option>
                                    <option value="2">Bulk edit</option>
                                    <option value="3">Export</option>
                                </select>
                                <button class="btn btn-sm btn-default">Apply</button>
                            </div>
                            <div class="col-sm-4 text-center">
                                <small class="text-muted inline m-t-sm m-b-sm">showing 20-30 of 50 items</small>
                            </div>
                            <div class="col-sm-4 text-right text-center-xs">
                                <ul class="pagination pagination-sm m-t-none m-b-none">
                                    <li><a href><i class="fa fa-chevron-left"></i></a></li>
                                    <li><a href>1</a></li>
                                    <li><a href>2</a></li>
                                    <li><a href>3</a></li>
                                    <li><a href>4</a></li>
                                    <li><a href>5</a></li>
                                    <li><a href><i class="fa fa-chevron-right"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HQIndex'
    }
</script>

<style scoped>
    /*
        */
    body {
        font-family: 微软雅黑;
    }
    /* thumbnail */
    .thumbnail {
        /* width: 1100px;*/
        position: relative;
    }
    .thumbnail .border {
        padding-bottom: 15px;
        padding-left: 15px;
        overflow: hidden;
    }
    .thumbnail .title {
        height: 40px;
        background-color: #dff0d8;
        line-height: 40px;
        color: #3c763d;
        padding: 0 20px;
    }
    .thumbnail .border li {
        position: relative;
        /* width: 33.33%;*/
        float: left;
        overflow: hidden;
    }
    .thumbnail li .list-group {
        border-radius: 2px;
        padding: 10px 20px;
        margin: 0;
    }
    .thumbnail .border li:hover {
        cursor: pointer;
    }
    .thumbnail .border li:hover .desc {
        opacity: 1;
        display: block\9;
        -webkit-transition: all 300ms ease-out 0ms;
        -moz-transition: all 300ms ease-out 0ms;
        -ms-transition: all 300ms ease-out 0ms;
        transition: all 300ms ease-out 0ms;
    }
    .thumbnail .border li:hover .text {
        opacity: 1;
        visibility: visible;
        -webkit-transform: translateY(0px);
        -moz-transform: translateY(0px);
        -ms-transform: translateY(0px);
        transform: translateY(0px);
        -webkit-transition: -webkit-transform 335ms ease 225ms, opacity 335ms ease 225ms;
        -moz-transition: -moz-transform 335ms ease 225ms, opacity 335ms ease 225ms;
        -ms-transition: -ms-transform 335ms ease 225ms, opacity 335ms ease 225ms;
        transition: transform 335ms ease 225ms, opacity 335ms ease 225ms;
    }
    .thumbnail .cell {
        width: 285px;
        display: block;
        position: relative;
        /* z-index: 1;*/
        margin-top: 15px;
        margin-right: 15px;
        background-color: #f9f9f9;
        border: 1px solid #d6e9c6;
        padding: 0;
        font-size: 12px;
        border-radius: 2px;
        -webkit-box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.1);
        box-shadow: 0 2px 6px 0 rgba(0, 0, 0, 0.2);
    }
    .thumbnail .cell i {
        position: absolute;
        left: 0;
        top: -4px;
    }
    .thumbnail .cell .imgbox {
        float: left;
        margin-right: 10px;
        width: 50px;
        height: 50px;
        overflow: hidden;
        position: relative;
        z-index: 1;
    }
    .thumbnail .cell .imgbox img {
        position: absolute;
        width: 50px;
        height: 50px;
        border-radius: 50px;
    }
    .thumbnail .cell .imgbox .img-bg {
        top: 0;
        left: 0;
        z-index: 2;
    }
    .thumbnail .cell .imgbox .img-icon {
        top: 0;
        left: 0;
        z-index: 3;
    }
    .thumbnail .cell .h4 {
        color: #333;
        height: 32px;
        line-height: 16px;
        font-weight: 400;
        overflow: hidden;
        margin-bottom: 5px;
    }
    .thumbnail .cell span {
        color: #808080;
    }
    .thumbnail .desc {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        -webkit-transition: all 450ms ease 295ms;
        -moz-transition: all 450ms ease 295ms;
        -ms-transition: all 450ms ease 295ms;
        transition: all 450ms ease 295ms;
        opacity: 0;
        display: none\9;
        background-repeat: no-repeat;
        display: block;
        margin-top: 15px;
        margin-right: 15px;
        width: 285px;
        height: 200px;
        background: rgba(37, 42, 60, 0.88);
        overflow: hidden;
        padding: 10px;
    }
    .thumbnail .text {
        color: #fff;
        line-height: 1.5em;
        overflow: hidden;
        display: block;
        /*  width: 215px;
            height: 71px;*/
        visibility: hidden;
        opacity: 0;
        -webkit-transform: translateY(66px);
        -moz-transform: translateY(66px);
        -ms-transform: translateY(66px);
        transform: translateY(66px);
        -webkit-transition: -webkit-transform 105ms ease 30ms, opacity 105ms ease 30ms;
        -moz-transition: -moz-transform 105ms ease 30ms, opacity 105ms ease 30ms;
        -ms-transition: -ms-transform 105ms ease 30ms, opacity 105ms ease 30ms;
        transition: transform 105ms ease 30ms, opacity 105ms ease 30ms;
    }
    @-webkit-keyframes ffk-animate {
        0% {
            -webkit-transform: rotateY(0deg);
        }
        100% {
            -webkit-transform: rotateY(-20deg);
        }
    }
    @-moz-keyframes ffk-animate {
        0% {
            -webkit-transform: rotateY(0deg);
        }
        100% {
            -webkit-transform: rotateY(-20deg);
        }
    }
    @-ms-keyframes ffk-animate {
        0% {
            -webkit-transform: rotateY(0deg);
        }
        100% {
            -webkit-transform: rotateY(-20deg);
        }
    }
    @keyframes ffk-animate {
        0% {
            -webkit-transform: rotateY(0deg);
        }
        100% {
            -webkit-transform: rotateY(-20deg);
        }
    }
    @-webkit-keyframes ffk-animate2 {
        0% {
            -webkit-transform: rotateY(-20deg);
        }
        100% {
            -webkit-transform: rotateY(0deg);
        }
    }
    @-moz-keyframes ffk-animate2 {
        0% {
            -webkit-transform: rotateY(-20deg);
        }
        100% {
            -webkit-transform: rotateY(0deg);
        }
    }
    @-ms-keyframes ffk-animate2 {
        0% {
            -webkit-transform: rotateY(-20deg);
        }
        100% {
            -webkit-transform: rotateY(0deg);
        }
    }
    @keyframes ffk-animate2 {
        0% {
            -webkit-transform: rotateY(-20deg);
        }
        100% {
            -webkit-transform: rotateY(0deg);
        }
    }
    .modal-header {
        border: none !important;
    }
    .modal-footer {
        border: none !important;
    }
</style>
