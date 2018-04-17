<template>
    <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <div class="col-sm-6">
                                    <button type="button" class="btn btn-success" @click="addLectotype"><i class="fa fa-plus"></i> 新 增</button>
                                </div>
                            </div>
                        </form>
                        <el-table :data="lectotypeListData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" ref="multipleTable">
                            <el-table-column prop="module" label="序号" width="60">
                                <template slot-scope="scope">
                                        <span>{{ pageSize * (pageNum - 1)  + 1 + scope.$index  }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value" :width="column.width"></el-table-column>
                            <el-table-column label="操作" :width="160">
                                <template slot-scope="scope">
                                    <button type="button" class="btn btn-warning btn-xs"  @click="editLectotype(lectotypeListData[scope.$index])"><i class="fa fa-edit"></i> 编 辑</button>
                                    <button type="button" class="btn btn-danger btn-xs" @click="deleteLectotype(lectotypeListData[scope.$index].id)"><i class="fa fa-times"></i> 删 除</button>
                                </template>
				            </el-table-column>
                        </el-table>
                    </div>
                     <div class="panel-footer">
                        <el-pagination :current-page="pageNum" :page-sizes="[5,10,20,30,40,50]" :page-size="pageSize" layout=" total,->,sizes, prev, pager, next, jumper, ->" :total="totals" @size-change="pageSizeChange" @current-change="pageCurrentChange"></el-pagination>
                    </div>
                </div>
            </div>
        </div>
        <el-dialog title="车辆选型" size="tiny" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="lectotypeform" :rules="rules" ref="lectotypeform" label-width="80px" class="demo-ruleForm">
                <el-form-item label="名称：" prop="name">
                    <el-input size="small" v-model="lectotypeform.name" auto-complete="off" placeholder="请输入车辆选型描述"></el-input>
                </el-form-item>
                <el-form-item label="下发值：" prop="value">
                    <el-input size="small" v-model="lectotypeform.value" auto-complete="off" placeholder="请输入下发值"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input size="small" v-model="lectotypeform.remark" placeholder="可选填"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="submitForm('lectotypeform')">提交</el-button>
                <el-button size="small" @click="resetForm('lectotypeform')">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import lectotypeApi from 'api/lectotypeList'
    import ValidateUtil from 'utils/ValidateUtils';

    export default {
        props: ["isRefresh"],
        data() {
            var checkName = (rule, value, callback) => {
                let param = {}

                param.name = value
                lectotypeApi.checkLectotype(param).then((response) =>{
                    if (response.code == 200){
                        if(this.operateItem.id){
                            if(value == this.operateItem.name && parseInt(response.data, 10) == 1){
                                return callback()
                            }else if(value !== this.operateItem.name && parseInt(response.data, 10) == 0){
                                return callback()
                            }
                            return callback(new Error('车辆选型名称不能重复！'))
                        }else if(parseInt(response.data, 10) > 0){
                            return callback(new Error('车辆选型名称不能重复！'))
                        }

                        return callback()
                    }

                    return callback()
                }).catch(err =>{
                    console.log(err);
                    return callback()
                });
            };

            var checkValue = (rule, value, callback) => {
                let param = {}

                param.value = value
                lectotypeApi.checkLectotype(param).then((response) =>{
                    if (response.code == 200){
                        if(this.operateItem.id){
                            if(value == this.operateItem.value && parseInt(response.data, 10) == 1){
                                return callback()
                            }else if(value !== this.operateItem.value && parseInt(response.data, 10) == 0){
                                return callback()
                            }
                            return callback(new Error('车辆选型下发值不能重复！'))
                        }else if(parseInt(response.data, 10) > 0){
                            return callback(new Error('车辆选型下发值不能重复！'))
                        }
                        return callback()
                    }

                    return callback()
                }).catch(err =>{
                    console.log(err);
                    return callback()
                });
            };

            return {
                columns: [{
                    value: 'name',
                    label: '名称',
                    width:'140'
                }, {
                    value: 'value',
                    label: '下发值',
                    width:'80'
                }, {
                    value: 'createUser',
                    label: '录入人员'
                }, {
                    value: 'createTime',
                    label: '录入时间',
                    width:'160'
                }, {
                    value: 'updateUser',
                    label: '修改人员'
                }, {
                    value: 'updateTime',
                    label: '修改时间',
                    width:'160'
                }, {
                    value: 'remark',
                    label: '备注'
                }],
                // 车辆选型 列表数据
                lectotypeListData: [],
                // 查询条件
                searchParams: {
                    description:''
                },
                totals: 0,
                pageNum: 1,
                pageSize: 10,
                loading: true,

                operateItem:{},
                dialogVisible: false,
                lectotypeform: {},
                formLabelWidth: '120px',
                // 新增修改表单验证规则
                rules: {
                    name: [{
                        required: true,
                        message: '请输入下发选型名称',
                        trigger: 'blur'
                    },
                    {
                        max: 50,
                        message: '字段允许最大长度为 50 个字符',
                        trigger: 'blur'
                    },
                    {
                        validator: checkName,
                        trigger: 'blur'
                    }
                    ],
                    value: [{
                        required: true,
                        message: '请输入下发值',
                        pattern: /.+/,
                        trigger: 'blur'
                    },
                    {
                        validator: ValidateUtil.Number,
                        trigger: 'blur'
                    },
                    {
                        validator: checkValue,
                        trigger: 'blur'
                    }
                    ]
                }
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
                this.dialogVisible = false;
                this.lectotypeform = {}
                this.pageNum = 1
                this.pageSize = 10
                this.getLectotypeList(this.searchParams)
            },
            searchLectotype(){
                this.lectotypeform = {}
                this.pageNum = 1
                this.getLectotypeList(this.searchParams)
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
            // 删除操作
            deleteLectotype(id) {
                let deleteConfim = this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                });

                // 点击确定按钮
                deleteConfim.then(() => {
                    lectotypeApi.deleleLectotype(id).then(response => {
                        if (response.code === 200){
                            this.$message.success("删除车辆选型成功")
                            this.initData()
                        } else {
                            this.$message.error('删除车辆选型失败');
                        }
                    }).catch(error => {
                        console.log("出錯了" + error)
                        this.$message.error('删除成功');
                    });
                });
                // 点击取消按钮
                deleteConfim.catch(() => {
                    this.$message({
                        type: 'info',
                        message: '已取消删除'
                    });
                });
            },
            // 打开编辑窗口
            editLectotype(lectotype) {
                this.resetForm('lectotypeform')
                this.operateItem = lectotype
                this.lectotypeform.id = lectotype.id
                this.lectotypeform.name = lectotype.name
                this.lectotypeform.value = lectotype.value
                this.lectotypeform.remark = lectotype.remark
                this.dialogVisible = true;
            },
             // 打开新增窗口
            addLectotype() {
                this.resetForm('lectotypeform')
                this.operateItem = {}
                this.dialogVisible = true;
            },
            // 保存车辆选型
            saveLectotype() {
                lectotypeApi.addLectotype(this.lectotypeform).then(response => {
                    if (response.code === 200){
                        this.$message.success("新增车辆选型成功")
                        this.initData()
                    } else {
                        this.$message.error('新增车辆选型失败');
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('新增车辆选型异常');
                });
            },
            // 更新数据
            updateLectotype() {
                lectotypeApi.updateLectotype(this.lectotypeform).then(response => {
                    if (response.code == 200) {
                        this.$message.success("更新车辆选型成功")
                        this.initData()
                    } else {
                        this.$message.error('更新车辆选型失败');
                    }
                }).catch(error => {
                    this.$message.error('更新车辆选型异常');
                    console.log(error)
                });
            },
            // 新增修改保存数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.lectotypeform.id){
                            this.updateLectotype()
                        }else{
                            this.saveLectotype()
                        }
                    } else {
                        return false;
                    }
                });
            },
            // 重置表单
            resetForm(formName) {
                if(this.$refs[formName]){
                    this.$refs[formName].resetFields();
                }
            }

        },
        activated() {
            if (this.isRefresh) {
                this.initData()
            }
        }
    }
</script>
