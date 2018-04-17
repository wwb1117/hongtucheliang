<template>
    <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-1 control-label text-left" for="input-id-1">燃料类型:</label>
                                <div class="col-sm-2">
                                    <input type="text" class="form-control" v-model="searchParams.typeName" placeholder="请输入燃料类型">
                                </div>
                                <div class="col-sm-8">
                                    <button type="button" class="btn btn-primary" @click="searchFuelType"><i class="fa fa-search"></i> 查 询</button>
                                    <button type="button" class="btn btn-success" @click="addFuelType"><i class="fa fa-plus"></i> 新 增</button>
                                </div>
                            </div>
                        </form>
                        <el-table :data="fuelTypeListData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" ref="multipleTable">
                            <el-table-column prop="module" label="序号" width="60">
                                <template slot-scope="scope">
                                            <span>{{ pageSize * (pageNum - 1)  + 1 + scope.$index  }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value" :width="column.width"></el-table-column>
                            <el-table-column label="操作" :width="160">
                                <template slot-scope="scope">
                                    <button type="button" class="btn btn-warning btn-xs" @click="editFuelType(fuelTypeListData[scope.$index])"><i class="fa fa-edit"></i> 编 辑</button>
                                    <button type="button" class="btn btn-danger btn-xs" @click="deleteFuelType(fuelTypeListData[scope.$index].id)"><i class="fa fa-times"></i> 删 除</button>
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
        <el-dialog title="燃料类型" size="tiny" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :inline="true" :model="fuelTypeform" :rules="rules" ref="fuelTypeform" label-width="80px" class="demo-ruleForm">
                <el-form-item label="编码：" prop="typeCode">
                    <el-input size="small" v-model="fuelTypeform.typeCode" auto-complete="off" placeholder="请输入燃油类型编码"></el-input>
                </el-form-item>
                <el-form-item label="名称：" prop="typeName">
                    <el-input size="small" v-model="fuelTypeform.typeName" auto-complete="off" placeholder="请输入燃油类型名称"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input size="small" v-model="fuelTypeform.remark" placeholder="可选填"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="submitForm('fuelTypeform')">提交</el-button>
                <el-button size="small" @click="resetForm('fuelTypeform')">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import fuelTypeApi from 'api/fuelTypeList'
    import ValidateUtil from 'utils/ValidateUtils'

    export default {
        props: ["isRefresh"],
        data() {
            var checkCode = (rule, value, callback) => {
                let param = {}

                param.typeCode = value
                fuelTypeApi.checkFuelType(param).then((response) =>{
                    if (response.code == 200){
                        if(this.operateItem.id){
                            if(value == this.operateItem.typeCode && parseInt(response.data, 10) == 1){
                                return callback()
                            }else if(value !== this.operateItem.typeCode && parseInt(response.data, 10) == 0){
                                return callback()
                            }
                            return callback(new Error('燃油类型编码不能重复！'))
                        }else if(parseInt(response.data, 10) > 0){
                            return callback(new Error('燃油类型编码不能重复！'))
                        }

                        return callback()
                    }

                    return callback()
                }).catch(err =>{
                    console.log(err);
                    return callback()
                });
            };

            var checkName = (rule, value, callback) => {
                let param = {}

                param.typeName = value
                fuelTypeApi.checkFuelType(param).then((response) =>{
                    if (response.code == 200){
                        if(this.operateItem.id){
                            if(value == this.operateItem.typeName && parseInt(response.data, 10) == 1){
                                return callback()
                            }else if(value !== this.operateItem.typeName && parseInt(response.data, 10) == 0){
                                return callback()
                            }
                            return callback(new Error('燃油类型名称不能重复！'))
                        }else if(parseInt(response.data, 10) > 0){
                            return callback(new Error('燃油类型名称不能重复！'))
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
                    value: 'typeCode',
                    label: '燃料类型编码'
                }, {
                    value: 'typeName',
                    label: '燃料类型名称'
                }, {
                    value: 'createUser',
                    label: '录入人员'
                }, {
                    value: 'createTime',
                    label: '录入时间',
                    width: '160'
                }, {
                    value: 'updateUser',
                    label: '修改人员'
                }, {
                    value: 'updateTime',
                    label: '修改时间',
                    width: '160'
                }, {
                    value: 'remark',
                    label: '备注'
                }],
                // 燃料类型 列表数据
                fuelTypeListData: [],
                // 查询条件
                searchParams: {
                    typeName: ''
                },
                totals: 0,
                pageNum: 1,
                pageSize: 10,
                loading: true,
                operateItem:{},
                dialogVisible: false,
                fuelTypeform: {
                    typeName: '',
                    typeCode: '',
                    remark: ''
                },
                formLabelWidth: '120px',
                // 新增修改表单验证规则
                rules: {
                    typeCode: [{
                        required: true,
                        message: '请输入燃油类型编码',
                        pattern: /.+/,
                        trigger: 'blur'
                    },
                    {
                        validator: ValidateUtil.Number,
                        trigger: 'blur'
                    },
                    {
                        validator: checkCode,
                        trigger: 'blur'
                    }
                    ],
                    typeName: [{
                        required: true,
                        message: '请输入燃油类型',
                        trigger: 'blur'
                    },
                    {
                        validator: checkName,
                        trigger: 'blur'
                    },
                    {
                        max: 50,
                        message: '字段允许最大长度为 50 个字符',
                        trigger: 'blur'
                    }
                    ]
                }
            }
        },
        methods: {
            pageSizeChange(val) {
                this.pageSize = val
                this.getFuelTypeList(this.searchParams)
            },
            pageCurrentChange(val) {
                this.pageNum = val
                this.getFuelTypeList(this.searchParams)
            },
            initData() {
                this.dialogVisible = false;
                this.fuelTypeform = {}
                this.pageNum = 1
                this.pageSize = 10
                this.searchParams.typeName = ""
                this.getFuelTypeList(this.searchParams)
            },
            searchFuelType() {
                this.fuelTypeform = {}
                this.pageNum = 1
                this.getFuelTypeList(this.searchParams)
            },
            // 获取燃油类型列表
            getFuelTypeList(params) {
                params.pageNum = this.pageNum
                params.pageSize = this.pageSize
                fuelTypeApi.getFuelTypeList(params).then(response => {
                    if (response.code === 200) {
                        this.fuelTypeListData = response.data.rows;
                        this.totals = response.data.total;
                        this.loading = false;
                    } else {
                        this.$message.error("获取燃油类型数据出错！")
                    }
                }).catch(error => {
                    this.$message.error("获取燃油类型数据出错！")
                    console.log(error)
                });
            },
            // 删除操作
            deleteFuelType(id) {
                let deleteConfim = this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                });
                // 点击确定按钮

                deleteConfim.then(() => {
                    fuelTypeApi.deleleFuelType(id).then(response => {
                        if (response.code === 200) {
                            this.$message.success("删除燃油类型成功")
                            this.initData()
                        } else {
                            this.$message.error('删除燃料类型失败');
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
            editFuelType(fuelType) {
                this.resetForm('fuelTypeform')
                this.operateItem = fuelType
                this.fuelTypeform.id = fuelType.id
                this.fuelTypeform.typeCode = fuelType.typeCode
                this.fuelTypeform.typeName = fuelType.typeName
                this.fuelTypeform.remark = fuelType.remark
                this.dialogVisible = true;
            },
            addFuelType(){
                this.resetForm('fuelTypeform')
                this.operateItem = {}
                this.dialogVisible = true;
            },
            // 保存燃料类型
            saveFuelType() {
                fuelTypeApi.addFuelType(this.fuelTypeform).then(response => {
                    if (response.code === 200) {
                        this.$message.success("新增燃料类型成功")
                        this.initData()
                    } else {
                        this.$message.error('新增燃料类型失败');
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('新增燃料类型异常');
                });
            },
            // 更新数据
            updateFuelType() {
                fuelTypeApi.updateFuelType(this.fuelTypeform).then(response => {
                    if (response.code == 200) {
                        this.$message.success("更新燃料类型成功")
                        this.initData()
                    } else {
                        this.$message.error('更新燃料类型失败');
                    }
                }).catch(error => {
                    this.$message.error('更新燃料类型异常');
                    console.log(error)
                });
            },
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.fuelTypeform.id) {
                            this.updateFuelType()
                        } else {
                            this.saveFuelType()
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
