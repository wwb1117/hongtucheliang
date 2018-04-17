<template>
    <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-1 control-label text-left" for="input-id-1">方案名称:</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" v-model="filter.name" id="input-id-1">
                                </div>
                                <div class="col-sm-8">
                                    <el-button type="success" slot="append" @click="query"><i class="fa fa-search"></i> 查询</el-button>
                                    <el-button type="primary" slot="append" @click="add"><i class="fa fa-plus"></i> 新增</el-button>
                                </div>
                            </div>
                            <el-table :data="tableData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" @row-click="handleCurrentChange" ref="multipleTable">
                                <el-table-column v-if="checkBox" type="selection" width="55">
                                </el-table-column>
                                <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value" :formatter="column.formatter">
                                </el-table-column>
                                <el-table-column fixed="right" label="操作" width="200">
                                    <template slot-scope="scope">
                                        <el-button type="warning" size="small" @click="updatePlan(scope.row)"><i class="fa fa-edit"></i> 编辑</el-button>
                                        <el-button  type="danger" size="small" @click="deletePlan(scope.row.id)"><i class="fa fa-times"></i> 删除</el-button>
                                    </template>
                                </el-table-column>
                            </el-table>
                            <div class="panel-footer">
                                <el-pagination :current-page="filter.pageNum" :page-sizes="[5,10,20,30,40,50]" :page-size="filter.pageSize" layout=" total,->,sizes, prev, pager, next, jumper, ->" :total="totals" @size-change="pageSizeChange" @current-change="pageCurrentChange"></el-pagination>
                            </div>
                        </form>
                    </div>
                </div>
                <el-dialog :title="titleOp" v-model="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="reset">
                    <form class="form-horizontal" method="post" id="#create" :model="create" ref="create">
                        <div class="form-group" style="margin-bottom: 10px;">
                            <label class="col-sm-2 control-label" for="">方案名称：</label>
                            <div class="col-sm-8">
                                <el-input type="text"  id="" v-model="create.name"></el-input>
                            </div>

                            </div>
                            <div class="form-group" style="margin-bottom: 10px;">
                            <label class="col-sm-2 control-label">方案描述：</label>
                            <div class="col-sm-8">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="create.description"></el-input>
                            </div>
                            </div>
                            <div v-for="type in typeList" class="form-group" style="margin-bottom: 10px;" >
                            <label class="col-sm-2 control-label">{{type.typeName}}：</label>
                            <div class="col-sm-8" style="margin-top: 8px;">
                            <el-checkbox-group v-model="lockList">
                                    <el-checkbox v-for="lock in type.types" :label="lock.id" :key="lock.id">{{lock.itemName}}</el-checkbox>
                                </el-checkbox-group>
                            </div>
                        </div>
                    </form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogCreateVisible = false">取 消</el-button>
                        <el-button type="primary" :loading="createLoading" @click="createMenu">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
    </div>
</template>

<script>
    import api from './../../api/checkPlan.js'
    export default {
        props: ["isRefresh"],
        data() {
            return {
                columns: [{
                    value: 'name',
                    label: '方案名称'
                }, {
                    value: 'checkItemName',
                    label: '具有的检测项',
                    formatter:function(row, column, cellValue){
                        let checkName = [];

                        for(var i = 0;i < cellValue.length;i++){
                            checkName.push(cellValue[i].itemName)
                        }
                        return checkName.join(',');
                    }
                }, {
                    value: 'state',
                    label: '状态',
                    formatter:function(row, column, cellValue){
                        if(cellValue ==  1){
                            return'启用';
                        }
                        return '禁用';
                    }
                }], //表格列配置数据,{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
                tableData: [], //表格数据s
                checkBox: false, //决定是否显示复选框
                filter: {
                    pageSize: 5, // 页大小
                    pageNum: 1, // 当前页
                    name: ''
                },
                titleOp:'',
                lockList: [],
                typeList:[],
                totals: 0,
                loading: true,
                createLoading:false,
                create: {
                    id:'',
                    name: '',
                    description:'',
                    checkItems:''
                },
                dialogCreateVisible:false,
                addFlag:true
            }
        },
        activated() {
            if (this.isRefresh) {
                this.filter.pageNum = 1;
                this.filter.pageSize = 5;
                this.filter.name = '';
                this.getCheckPlans();
            }
        },
        methods: {
            handleCurrentChange(row) {
                this.$refs.multipleTable.toggleRowSelection(row);
            },
            pageSizeChange(val) {
                this.filter.pageSize = val;
                this.getCheckPlans();
            },
            pageCurrentChange(val) {
                this.filter.pageNum = val;
                this.getCheckPlans();
            },
            query() {
                this.getCheckPlans();
            },
            getCheckPlans() {
                this.loading = true;
                api.getCheckPlanList(this.filter).then((response) => {
                    var data = response.data;

                    this.tableData = data.rows;
                    this.totals = data.total;
                    this.loading = false;
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                    this.loading = false;
                });
            },
            deletePlan(id){
                api.deleteCheckPlans({'id':id}).then((response) => {
                    var data = response.data;

                    if(data){
                        this.getCheckPlans();
                        this.$message.success('删除成功');
                    }

                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                });

            },
            add(){
                this.dialogCreateVisible = true;
                this.titleOp = '新增检测方案';
                this.getCheckItems();
            },
            getCheckItems(){
                api.getCheckItems().then((response) => {
                    var data = response.data;

                    this.typeList = data;
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                });
            },
             // 重置表单
            reset() {
                this.create.id = '';
                this.create.name = '';
                this.create.description = '';
                this.create.checkItems = '';
                this.lockList.length = 0;
                this.typeList.length = 0;
                this.addFlag = true;
            },
            createMenu(){
                this.create.checkItems = this.lockList.join(',');
                if(this.addFlag){
                    api.saveCheckPlans(this.create).then((response) => {
                        var data = response.data;

                        if(data){
                            this.dialogCreateVisible = false;
                            this.getCheckPlans();
                            this.reset();
                            this.$message.success('添加成功！');
                        }

                    }).catch((response) => {
                        this.$message.error('错了哦，这是一条错误消息' + response.message);
                    });
                }else{
                    api.updateCheckPlans(this.create).then((response) => {
                        var data = response.data;

                        if(data){
                            this.dialogCreateVisible = false;
                            this.getCheckPlans();
                            this.reset();
                            this.$message.success('修改成功！');
                        }

                    }).catch((response) => {
                        this.$message.error('错了哦，这是一条错误消息' + response.message);
                    });
                }

            },
            updatePlan(row){
                this.getCheckItems();
                this.titleOp = '修改检测方案';
                this.dialogCreateVisible = true;
                this.addFlag = false;
                this.create.id = row.id;
                this.create.name = row.name;
                this.create.description = row.description;
                for(var i = 0;i < row.checkItemName.length;i++){
                    this.lockList.push(row.checkItemName[i].itemId);
                }
            }
        }
    }
</script>
