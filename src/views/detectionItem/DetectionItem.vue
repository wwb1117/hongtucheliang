<template>
    <div class="wrapper-md">
        <div class="panel panel-default">
            <div class="panel-body">
                <form class="form-horizontal" role="form">
                    <div class="form-group">
                        <label class="col-sm-1 control-label text-left" for="input-id-1">方案名称:</label>
                        <div class="col-sm-2">
                            <input type="text" class="form-control" v-model="filter.itemName" id="input-id-1">
                        </div>
                        <div class="col-sm-8">
                            <el-button type="success" slot="append" @click="query"><i class="fa fa-search"></i> 查询</el-button>
                            <el-button type="primary" slot="append" @click="add"><i class="fa fa-plus"></i> 新增</el-button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
        <div class="panel panel-default">
            <div class="panel-body">
                <div class="el-table-self">
                    <el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" @row-click="handleCurrentChange" ref="multipleTable">
                        <el-table-column v-if="checkBox" type="selection" width="55">
                        </el-table-column>
                        <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value" :formatter="column.formatter">
                        </el-table-column>
                        <el-table-column fixed="right" label="操作" width="200">
                            <template slot-scope="scope">
                                    <el-button type="warning" size="small" @click="updateMethod(scope.row)"><i class="fa fa-edit"></i> 编辑</el-button>
                                    <el-button  type="danger" size="small" @click="deleteMethod(scope.row.id)"><i class="fa fa-times"></i> 删除</el-button>
                            </template>
                        </el-table-column>
                    </el-table>
                </div>
                <div class="pagination-footer">
                    <el-pagination :current-page="filter.pageNum" :page-sizes="[5,30,40,50]" :page-size="filter.pageSize" layout=" sizes, prev, pager, next, jumper, ->, total" :total="totals" @size-change="pageSizeChange" @current-change="pageCurrentChange">
                    </el-pagination>
                </div>
            </div>
        </div>
        <el-dialog :title="titleOp" v-model="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="reset">
            <form class="form-horizontal" method="post" id="#create" :model="create" ref="create">
                <div class="form-group" style="margin-bottom: 10px;">
                    <label class="col-sm-3 col-lg-2 col-md-3 control-label">检测类型：</label>
                    <div class="col-sm-9 col-lg-10 col-md-9">
                        <el-select v-model="create.type" clearable filterable placeholder="请选择">
                            <el-option v-for="item in options" :key="item.id" :label="item.propertyName" :value="item.id">
                            </el-option>
                        </el-select>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 10px;">
                    <label class="col-sm-3 col-lg-2 col-md-3 control-label">检测项：</label>
                    <div class="col-sm-9 col-lg-10 col-md-9">
                       <el-input v-model="create.itemName"></el-input>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 col-lg-2 col-md-3 control-label">标准值：</label>
                    <div class="col-sm-4 col-lg-5 col-md-4">
                        <el-input-number v-model="create.startStdValue" @change="handleChangeStart" ></el-input-number>
                    </div>
                    <div class="col-sm-5 col-lg-5 col-md-5">
                        <el-input-number v-model="create.endStdValue" @change="handleChangeEnd" ></el-input-number>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 10px;">
                    <label class="col-sm-3 col-lg-2 col-md-3 control-label">检测项描述：</label>
                    <div class="col-sm-9 col-lg-10 col-md-9">
                        <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="create.description"></el-input>
                    </div>
                </div>
                <div class="form-group" style="margin-bottom: 10px;">
                    <label class="col-sm-3 col-lg-2 col-md-3 control-label">失败原因描述：</label>
                    <div class="col-sm-9 col-lg-10 col-md-9">
                         <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="create.failMessage"></el-input>
                    </div>
                </div>
                <div class="form-group">
                    <label class="col-sm-3 col-lg-2 col-md-3 control-label">状态：</label>
                    <div class="ccol-sm-9 col-lg-10 col-md-9">
                        <el-switch v-model="create.state" on-text="" off-text="" on-value="1"  off-value="2" on-color="#13ce66"></el-switch>
                    </div>
                </div>
            </form>
            <div slot="footer" class="dialog-footer">
                <el-button @click="dialogCreateVisible = false">取 消</el-button>
                <el-button type="primary" :loading="createLoading" @click="createMethod">确 定</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import api from "./../../api/checkItem.js";
    export default {
        props: ["isRefresh"],
        data() {
            return {
                columns: [{
                    value: "type",
                    label: "检测项类型"
                },
                {
                    value: "itemName",
                    label: "检测项"
                },
                {
                    value: "startStdValue",
                    label: "标准值",
                    formatter: function(row, column, cellValue) {
                        return cellValue + "-" + row.endStdValue;
                    }
                },
                {
                    value: "state",
                    label: "状态",
                    formatter: function(row, column, cellValue) {
                        if (cellValue == 1) {
                            return "启用";
                        }
                        return "禁用";
                    }
                }
                ], //表格列配置数据,{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
                tableData: [], //表格数据s
                checkBox: false, //决定是否显示复选框
                filter: {
                    pageSize: 5, // 页大小
                    pageNum: 1, // 当前页
                    itemName: ""
                },
                titleOp: "",
                options: [],
                totals: 0,
                loading: true,
                createLoading: false,
                create: {
                    id: "",
                    type: "",
                    itemName: "",
                    startStdValue: "",
                    endStdValue: "",
                    description: "",
                    failMessage: "",
                    state: "1"
                },
                dialogCreateVisible: false,
                addFlag: true
            };
        },
        activated() {
            if (this.isRefresh) {
                this.filter.pageNum = 1;
                this.filter.pageSize = 5;
                this.filter.name = "";
                this.getDates();
            }
        },
        methods: {
            handleCurrentChange(row) {
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            pageSizeChange(val) {
                this.filter.pageSize = val;
                this.getDates();
            },
            pageCurrentChange(val) {
                this.filter.pageNum = val;
                this.getDates();
            },
            query() {
                this.getDates();
            },
            getDates() {
                this.loading = true;
                api.getCheckItemList(this.filter).then(response => {
                    var data = response.data;

                    this.tableData = data.rows;
                    this.totals = data.total;
                    this.loading = false;
                }).catch(response => {
                    this.$message.error("错了哦，这是一条错误消息" + response.message);
                    this.loading = false;
                });
            },
            deleteMethod(id) {
                this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'warning'
                }).then(() => {
                    api.deleteCheckItem({
                        id: id
                    }).then(response => {
                        var data = response.data;

                        if (data == 1) {
                            this.getDates();
                            this.$message.success("删除成功");
                        }
                    }).catch(response => {
                        this.$message.error("错了哦，这是一条错误消息" + response.message);
                    });
                }).catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    })
                });
            },
            add() {
                this.dialogCreateVisible = true;
                this.titleOp = "新增检测方案";
                this.getTypes();
            },
            getTypes() {
                api.getDetail().then(response => {
                    var data = response.data;

                    this.options = data;
                }).catch(response => {
                    this.$message.error("错了哦，这是一条错误消息" + response.message);
                });
            },
            // 重置表单
            reset() {
                this.create.id = "";
                this.create.type = "";
                this.create.itemName = "";
                this.create.startStdValue = "";
                this.create.endStdValue = "";
                this.create.description = "";
                this.create.failMessage = "";
                this.create.state = "1";
                this.addFlag = true;
            },
            createMethod() {
                if (this.addFlag) {
                    api.saveCheckItem(this.create).then(response => {
                        var data = response.data;

                        if (data == 1) {
                            this.dialogCreateVisible = false;
                            this.getDates();
                            this.reset();
                            this.$message.success("添加成功！");
                        }
                    }).catch(response => {
                        this.$message.error("错了哦，这是一条错误消息" + response.message);
                    });
                } else {
                    api.updateCheckItem(this.create).then(response => {
                        var data = response.data;

                        if (data == 1) {
                            this.dialogCreateVisible = false;
                            this.getDates();
                            this.reset();
                            this.$message.success("修改成功！");
                        }
                    }).catch(response => {
                        this.$message.error("错了哦，这是一条错误消息" + response.message);
                    });
                }
            },
            updateMethod(row) {
                this.getTypes();
                this.titleOp = "修改检测方案";
                this.dialogCreateVisible = true;
                this.addFlag = false;
                this.create.id = row.id;
                this.create.type = row.typeId;
                this.create.itemName = row.itemName;
                this.create.startStdValue = row.startStdValue;
                this.create.endStdValue = row.endStdValue;
                this.create.description = row.description;
                this.create.failMessage = row.failMessage;
                this.create.state = String(row.state);
            },
            handleChangeStart(value) {
                this.create.startStdValue = value;
            },
            handleChangeEnd(value) {
                this.create.endStdValue = value;
            }
        }
    };
</script>

<style>
    .el-select {
        width: 100%
    }
    .el-input-number {
        width: 100%
    }
</style>
