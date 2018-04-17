<template>
    <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-12 col-md-1 col-lg-1 control-label text-left" for="input-id-1">用户名称:</label>
                                <div class="col-sm-12 col-md-2 col-lg-2">
                                    <input type="text" class="form-control" v-model="filter.user" id="input-id-1">
                                </div>
                                <label class="col-sm-12 col-md-1 col-lg-1 control-label text-left" for="input-id-2">一级菜单:</label>
                                <div class="col-sm-12 col-md-2 col-lg-2">
                                    <input type="text" class="form-control" v-model="filter.firstModule" id="input-id-2">
                                </div>
                                <label class="col-sm-12 col-md-1 col-lg-1 control-label text-left" for="input-id-3">二级菜单:</label>
                                <div class="col-sm-12 col-md-2 col-lg-2">
                                    <input type="text" class="form-control" v-model="filter.secondModule" id="input-id-3">
                                </div>
                                <div class="col-sm-12 col-md-3 col-lg-3">
                                    <button type="button" class="btn btn-sm btn-primary" slot="append" icon="search" @click="query"><i class="fa fa-search"></i> 查 询</button>
                                </div>
                            </div>
                        </form>
                        <el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" @row-click="handleCurrentChange" ref="multipleTable">
                            <el-table-column prop="module" label="序号" width="80">
                                <template slot-scope="scope">
                                        <span>{{ pageSizes * (pageNums - 1)  + 1 + scope.$index  }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value"></el-table-column>
                        </el-table>
                    </div>
                    <div class="panel-footer">
                        <el-pagination :current-page="filter.pageNum" :page-sizes="[10,20,30,40,50]" :page-size="filter.pageSize" layout=" total,->,sizes, prev, pager, next, jumper, ->" :total="totals" @size-change="pageSizeChange" @current-change="pageCurrentChange"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    import api from './../../api/log.js'
    export default {
        props: ["isRefresh"],
        data() {
            return {
                columns: [{
                    value: 'operator',
                    label: '用户名称'
                }, {
                    value: 'firstModule',
                    label: '一级名称'
                }, {
                    value: 'secondModule',
                    label: '二级名称'
                }, {
                    value: 'description',
                    label: '功能点'
                }, {
                    value: 'ip',
                    label: '访问ip'
                }, {
                    value: 'operationTime',
                    label: '访问时间'
                }, {
                    value: 'result',
                    label: '执行结果'
                }], //表格列配置数据,{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
                tableData: [], //表格数据s
                filter: {
                    pageSize: 10, // 页大小
                    pageNum: 1, // 当前页
                    user: '',
                    firstModule: '',
                    secondModule: ''
                },
                totals: 0,
                loading: true,
                pageNums: 1,
                pageSizes: 10
            }
        },
        activated() {
            if (this.isRefresh) {
                this.filter.pageNum = 1;
                this.filter.pageSize = 10;
                this.filter.user = '';
                this.filter.firstModule = '';
                this.filter.secondModule = '';
                this.getLogs();
            }
        },
        methods: {
            handleCurrentChange(row) {
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            pageSizeChange(val) {
                this.pageSizes = val;
                this.filter.pageSize = val;
                this.getLogs();
            },
            pageCurrentChange(val) {
                this.pageNums = val;
                this.filter.pageNum = val;
                this.getLogs();
            },
            query() {
                this.getLogs();
            },
            // 获取日志列表
            getLogs() {
                this.loading = true;
                api.getLogList(this.filter).then((response) => {
                    var data = response.data;

                    this.tableData = data.list;
                    this.totals = data.total;
                    this.loading = false;
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                    this.loading = false;
                });
            }
        }
    }
</script>
