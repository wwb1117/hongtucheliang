<template>
    <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <label class="col-sm-1 control-label text-left" for="input-id-1">油箱类型:</label>
                                <div class="col-sm-2">
                                    <el-select style="border-radius:0px" size="small" v-model="searchParams.tank" filterable placeholder="请选择">
                                            <el-option v-for="item in tankTypeList" :key="item.id" :label="item.typeDescription" :value="item.id"></el-option>
                                    </el-select>
                                </div>
                                <div class="col-sm-8">
                                    <button type="button" class="btn btn-primary" @click="searchOilCalibration"><i class="fa fa-search"></i> 查 询</button>
                                    <button type="button" class="btn btn-info" @click="addOilCalibration"><i class="fa fa-plus"></i> 新 增</button>
                                </div>
                            </div>
                        </form>
                        <el-table :data="oilCalibrationListData" border v-loading="loading" element-loading-text="拼命加载中..." style="width: 100%" ref="multipleTable">
                            <el-table-column prop="module" fixed="left" label="序号" width="60">
                                <template slot-scope="scope">
                                    <span>{{ pageSize * (pageNum - 1)  + 1 + scope.$index  }}</span>
                                </template>
                            </el-table-column>
                            <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value" :width="column.width" :formatter="column.formatter"></el-table-column>
                            <el-table-column label="操作" fixed="right" :width="160">
                                <template slot-scope="scope">
                                    <button type="button" class="btn btn-warning btn-xs" @click="editOilCalibration(oilCalibrationListData[scope.$index])"><i class="fa fa-edit"></i> 编 辑</button>
                                    <button type="button" class="btn btn-danger btn-xs" @click="deleteOilCalibration(oilCalibrationListData[scope.$index].id)"><i class="fa fa-times"></i> 删 除</button>
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
        <el-dialog title="油箱类型" size="tiny" :visible.sync="dialogVisible" :close-on-click-modal="false">
            <el-form :inline="true" label-width="100px" :label-position="'right'" :model="oilCalibrationform" :rules="rules" ref="oilCalibrationform">
                <el-form-item label="油感类型：" prop="oil" >
                    <el-select size="small" v-model="oilCalibrationform.oil" filterable placeholder="请选择">
                        <el-option v-for="item in oilTypeList" :key="item.id" :label="item.name" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="油箱类型：" prop="tank">
                    <el-select size="small" v-model="oilCalibrationform.tank" filterable placeholder="请选择">
                        <el-option v-for="item in tankTypeList" :key="item.id" :label="item.typeDescription" :value="item.id"></el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="刻度值：" prop="scaleValue">
                    <el-input  size="small" v-model="oilCalibrationform.scaleValue" auto-complete="off" placeholder="请输入刻度值"></el-input>
                </el-form-item>
                <el-form-item label="标定值：" prop="calibrationValue">
                    <el-input size="small" v-model="oilCalibrationform.calibrationValue" auto-complete="off" placeholder="请输入标定值"></el-input>
                </el-form-item>
                <el-form-item label="备注：" prop="remark">
                    <el-input size="small" v-model="oilCalibrationform.remark" placeholder="可选填"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" type="primary" @click="submitForm('oilCalibrationform')">提交</el-button>
                <el-button size="small" @click="resetForm('oilCalibrationform')">重置</el-button>
            </span>
        </el-dialog>
    </div>
</template>

<script>
    import oilCalibrationApi from 'api/oilCalibration'
    import oilTypeListApi from 'api/oilTypeList'
    import tankTypeListApi from 'api/tankTypeList'
    import ValidateUtil from 'utils/ValidateUtils'

    export default {
        props: ["isRefresh"],
        data() {
            return {
                // 查询条件
                searchParams: {
                    tank: ''
                },
                // 分页参数
                totals: 0,
                pageNum: 1,
                pageSize: 10,

                // 加载效果
                loading: true,

                // 新增编辑弹框设置
                dialogVisible: false,
                oilCalibrationform: {},
                tankTypeList: [],
                oilTypeList: [],

                // 油量标定值列表
                oilCalibrationListData: [],
                columns: [{
                    value: 'oilName',
                    label: '油感类型',
                    width: '160'
                }, {
                    value: 'tankDescription',
                    label: '油箱类型',
                    width: '160'
                }, {
                    value: 'scaleValue',
                    label: '刻度值',
                    width: '120'
                }, {
                    value: 'calibrationValue',
                    label: '标定值',
                    width: '120'
                }, {
                    value: 'createUser',
                    label: '录入人员',
                    width: '160'
                }, {
                    value: 'createTime',
                    label: '录入时间',
                    width: '160'
                }, {
                    value: 'updateUser',
                    label: '修改人员',
                    width: '160'
                }, {
                    value: 'updateTime',
                    label: '修改时间',
                    width: '160'
                }, {
                    value: 'remark',
                    label: '备注'
                }],
                // 新增修改表单验证规则
                rules: {
                    oil: {
                        required: true,
                        message: '请选择油感类型',
                        trigger: 'change'
                    },
                    tank: {
                        required: true,
                        message: '请选择油箱类型',
                        trigger: 'change'
                    },
                    scaleValue: [{
                        required: true,
                        message: '请输入刻度值',
                        pattern: /.+/,
                        trigger: 'blur'
                    }, {
                        validator: ValidateUtil.Number,
                        trigger: 'blur'
                    }
                    ],
                    calibrationValue: [{
                        required: true,
                        message: '请输入标定值',
                        pattern: /.+/,
                        trigger: 'blur'
                    }, {
                        validator: ValidateUtil.Number,
                        trigger: 'blur'
                    }
                    ]
                }
            }
        },
        methods: {
            pageSizeChange(val) {
                this.pageSize = val
                this.getOilCalibrationList(this.searchParams)
            },
            pageCurrentChange(val) {
                this.pageNum = val
                this.getOilCalibrationList(this.searchParams)
            },
            // 初始化数据
            initData() {
                this.dialogVisible = false;
                this.resetForm('oilCalibrationform')
                this.pageNum = 1
                this.pageSize = 10
                this.getOilCalibrationList({})
            },
            searchOilCalibration() {
                this.oilCalibrationform = {}
                this.pageNum = 1
                this.getOilCalibrationList(this.searchParams)
            },
            getOilTypeList(){
                oilTypeListApi.getAllOilType().then(response => {
                    if (response.code === 200) {
                        this.oilTypeList = response.data;
                    } else {
                        this.$message.error("获取油箱类型数据出错！")
                    }
                }).catch(error => {
                    this.$message.error("获取油箱类型数据出错！")
                    console.log(error)
                });
            },
            getTankTypeList(){
                tankTypeListApi.getAllTankType().then(response => {
                    if (response.code === 200) {
                        this.tankTypeList = response.data;
                    } else {
                        this.$message.error("获取油箱类型数据出错！")
                    }
                }).catch(error => {
                    this.$message.error("获取油箱类型数据出错！")
                    console.log(error)
                });
            },
            getOilCalibrationList(params) {
                params.pageNum = this.pageNum
                params.pageSize = this.pageSize
                oilCalibrationApi.getOilCalibrationList(params).then(response => {
                    if (response.code === 200) {
                        this.getOilTypeList()
                        this.getTankTypeList()
                        this.oilCalibrationListData = response.data.rows;
                        this.totals = response.data.total;
                        this.loading = false;
                    } else {
                        this.$message.error("获取油感标定值出错！")
                    }
                }).catch(error => {
                    this.$message.error("获取油感标定值出错！")
                    console.log(error)
                });
            },
            // 删除操作
            deleteOilCalibration(id) {
                let deleteConfim = this.$confirm('此操作将永久删除该条数据, 是否继续?', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    closeOnClickModal: false,
                    type: 'warning'
                });

                // 点击确定按钮
                deleteConfim.then(() => {
                    oilCalibrationApi.deleleOilCalibration(id).then(response => {
                        if (response.code === 200) {
                            this.$message.success("删除油箱类型成功")
                            this.initData()
                        } else {
                            this.$message.error('删除油箱类型失败');
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
            editOilCalibration(oilCalibration) {
                this.oilCalibrationform.id = oilCalibration.id
                this.oilCalibrationform.oil = oilCalibration.oil
                this.oilCalibrationform.tank = oilCalibration.tank
                this.oilCalibrationform.scaleValue = oilCalibration.scaleValue
                this.oilCalibrationform.calibrationValue = oilCalibration.calibrationValue
                this.oilCalibrationform.remark = oilCalibration.remark
                this.dialogVisible = true
            },
            // 打开新增窗口
            addOilCalibration() {
                this.resetForm()
                this.dialogVisible = true;
            },
            // 新增修改保存数据
            submitForm(formName) {
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if (this.oilCalibrationform.id) {
                            this.updateOilCalibration()
                        } else {
                            this.saveOilCalibration()
                        }
                    } else {
                        return false;
                    }
                });

            },
            // 保存
            saveOilCalibration() {
                oilCalibrationApi.addOilCalibration(this.oilCalibrationform).then(response => {
                    if (response.code === 200) {
                        this.$message.success("新增油箱类型成功")
                        this.initData()
                    } else {
                        this.$message.error('新增油箱类型失败');
                    }
                }).catch(error => {
                    console.log(error)
                    this.$message.error('新增油箱类型异常');
                });
            },
            // 修改
            updateOilCalibration() {
                oilCalibrationApi.updateOilCalibration(this.oilCalibrationform).then(response => {
                    if (response.code == 200) {
                        this.$message.success("更新油箱类型成功")
                        this.initData()
                    } else {
                        this.$message.error('更新油箱类型失败');
                    }
                }).catch(error => {
                    this.$message.error('更新油箱类型异常');
                    console.log(error)
                });
            },
            // 重置表单
            resetForm(formName) {
                if(this.$refs[formName]){
                    this.$refs[formName].resetFields();
                }
                this.oilCalibrationform = {oil:'', tank:''}
            }
        },
        activated() {
            if (this.isRefresh) {
                this.initData()
            }
        }
    }
</script>

<style>

</style>
