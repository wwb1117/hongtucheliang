<template>
    <div class="wrapper">
        <div class="row">
            <!-- 扫描录入 START -->
            <div class="col-md-13 col-md-push-13">
                <form name="formValidate" class="form-horizontal form-validation">
                    <div class="panel panel-default">
                        <div class="panel-body">
                            <!-- 扫描加车 START -->
                            <div class="col-md-6 col-sm-12 b-r">
                                <el-form ref="form" :model="carInfo" :label-position="'top'" :rules="rules" label-width="80px">
                                    <div class="form-group" style="margin-bottom:0;">
                                        <div class="col-sm-12 col-md-12">
                                            <el-form-item label="VIN码" prop="vin">
                                                <el-input :autofocus="autofocusVin" placeholder="请扫入vin码" @blur="checkVinAndTer" v-model="carInfo.vin" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="form-group" style="margin-bottom:0;">
                                        <div class="col-sm-12 col-md-12">
                                            <el-form-item label="终端号" prop="terminal">
                                                <el-input placeholder="请扫入终端号" @blur="checkVinAndTer" v-model="carInfo.terminal" size="small"></el-input>
                                            </el-form-item>
                                        </div>
                                    </div>
                                     <div class="form-group" style="margin-bottom:0;">
                                        <div class="col-sm-12 col-md-12">
                                            <el-form-item label="燃料类型" prop="fuelType">
                                                <el-select v-model="carInfo.fuelType" filterable placeholder="请选择" size="small" style="display:block;">
                                                    <el-option
                                                    v-for="fuelType in fuelTypeList"
                                                    :key="fuelType.id"
                                                    :label="fuelType.typeName"
                                                    :value="fuelType.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <div class="form-group" style="margin-bottom:0;">
                                        <div class="col-sm-6 col-md-6">
                                            <el-form-item label="油感类型" prop="oilType">
                                                <el-select v-model="carInfo.oilType" filterable placeholder="请选择" size="small" style="display:block;">
                                                    <el-option
                                                    v-for="oilType in oilTypeList"
                                                    :key="oilType.id"
                                                    :label="oilType.name"
                                                    :value="oilType.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                         <div class="col-sm-6 col-md-6">
                                            <el-form-item label="油箱类型" prop="tankType">
                                                <el-select v-model="carInfo.tankType" filterable placeholder="请选择" size="small" style="display:block;">
                                                    <el-option
                                                    v-for="tankType in tankTypeList"
                                                    :key="tankType.id"
                                                    :label="tankType.typeDescription"
                                                    :value="tankType.id">
                                                    </el-option>
                                                </el-select>
                                            </el-form-item>
                                        </div>
                                    </div>

                                    <div class="form-group" style="margin-bottom:0;">
                                        <div class="col-sm-12 col-md-12">
                                            <el-form-item label="锁车功能" prop="lockFlag" size="small">
                                                <el-radio-group v-model="carInfo.lockFlag">
                                                    <el-radio label="1">具备</el-radio>
                                                    <el-radio label="0">不具备</el-radio>
                                                </el-radio-group>
                                            </el-form-item>
                                        </div>
                                    </div>
                                    <el-form-item>
                                        <button type="button" class="btn btn-primary" @click="saveCar('form')">提交</button>
                                        <button type="button" class="btn btn-danger" @click="resetForm('form')">重置</button>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <!-- 终端信息 START-->
                            <div class="col-md-6 col-sm-12">
                                <TerminalInfo :terminalInfo = "terminalInfo" v-show="terInfoFlag"></TerminalInfo>
                                <div class="panel" v-show="!terInfoFlag">
                                    <div class="panel-body">
                                        <p align="center">暂无终端信息</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
            <!-- 历史数据 START -->
            <CarThumbnail :carHisList = "carHisList" :fuelTypeList = "fuelTypeList" :oilTypeList = "oilTypeList" :tankTypeList = "tankTypeList"></CarThumbnail>
        </div>
    </div>
</template>

<script>
    import TerminalInfo from 'views/scanAddCar/TerminalInfo'
    import CarThumbnail from 'views/scanAddCar/CarThumbnail'
    import OilTypeApi from 'api/oilTypeList'
    import TankTypeApi from 'api/tankTypeList'
    import FuelTypeApi from 'api/fuelTypeList'
    import CarManageApi from 'api/carManage'
    import TerminalApi from 'api/terminal'

    import { trim } from 'utils/StringUtil'
    export default {
        props: ["isRefresh"],
        components:{
            TerminalInfo,
            CarThumbnail
        },
        data(){
            return{
                //燃油类型列表
                fuelTypeList:[],
                //油箱类型列表
                tankTypeList:[],
                //油感类型列表
                oilTypeList:[],
                //历史数据列表
                carHisList:[],
                //车辆基本信息
                carInfo:{vin:'', terminal:'', fuelType:''},
                //终端基本信息
                terminalInfo:{},
                terInfoFlag:false,
                autofocusVin:true,
                rules: {
                    vin: [{
                        required: true,
                        message: '请输入VIN码',
                        trigger: 'blur'
                    },
                    {
                        max: 17,
                        message: '字段允许长度为 17 个字符',
                        trigger: 'blur'
                    },
                    {
                        min: 17,
                        message: '字段允许长度为 17 个字符',
                        trigger: 'blur'
                    }],
                    terminal: [{
                        required: true,
                        message: '请输入终端号',
                        trigger: 'blur'
                    },
                    {
                        max: 10,
                        message: '字段允许长度为 10 个字符',
                        trigger: 'blur'
                    },
                    {
                        min: 10,
                        message: '字段允许长度为 10 个字符',
                        trigger: 'blur'
                    }],
                    fuelType:  {
                        required: true,
                        message: '请选择燃料类型',
                        trigger: 'change'
                    },
                    lockFlag: [{
                        required: true,
                        message: '请选择锁车状态',
                        trigger: 'change'
                    }
                    ],
                    tankType: {
                        required: true,
                        message: '请选择油箱类型',
                        trigger: 'change'
                    },
                    oilType: {
                        required: true,
                        message: '请选择油感类型',
                        trigger: 'change'
                    }
                }
            }
        },
        methods:{
            //初始化方法
            initData:function(){
                this.getOilTypeList()
                this.getTankTypeList()
                this.getFuelTypeList()
                this.getCarHisList()
            },
            //保存车辆信息
            saveCar:function(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        CarManageApi.saveCar(this.carInfo).then(response =>{
                            if (response.code === 200) {
                                //历史数据只展示四条，超过四条则加入新的，剔除旧的
                                if(this.carHisList.length >= 4){
                                    this.carHisList.splice(-1, 1)
                                }
                                this.carHisList.splice(0, 0, response.data)
                            } else {
                                this.$message.error("扫描加车失败！")
                            }
                        }).catch(error => {
                            this.$message.error("扫描加车异常！")
                            console.log(error)
                        });
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

            },
            //获取燃料类型
            getFuelTypeList(){
                FuelTypeApi.getAllFuelType().then(response => {
                    if (response.code === 200) {
                        this.fuelTypeList = response.data;
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            //获取油感类型
            getOilTypeList(){
                OilTypeApi.getAllOilType().then(response => {
                    if (response.code === 200) {
                        this.oilTypeList = response.data;
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            //获取油箱类型
            getTankTypeList(){
                TankTypeApi.getAllTankType().then(response => {
                    if (response.code === 200) {
                        this.tankTypeList = response.data;
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            //获取终端信息
            getTerminalInfo(){
                TerminalApi.getTerminalInfo(this.carInfo.terminal).then(response => {
                    if (response.code === 200) {
                        if(response.data){
                            this.terminalInfo = response.data;
                            this.terInfoFlag = true
                            this.carInfo.dataNo = this.terminalInfo.dataNo
                        }else{
                            this.terminalInfo = {}
                            this.terInfoFlag = false
                        }
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            //获取车辆历史数据列表
            getCarHisList(){
                let param = {}
                let seachCarParam = {}
                let userId = JSON.parse(sessionStorage.getItem('user')).id

                param.pageNum = 1
                param.pageSize = 4
                seachCarParam.createUser = userId
                CarManageApi.getCarList(param).then(response => {
                    if (response.code === 200) {
                        this.carHisList = response.data.rows;
                    }
                }).catch(error => {
                    console.log(error)
                });
            },
            //校验vin码终端号
            checkVinAndTer(){
                let vin = this.carInfo.vin;
                let terminal = this.carInfo.terminal;

                 //终端号只允许输入数字
                if(terminal){
                    terminal = trim(terminal.replace(/[^\d.]/g, ''))
                }

                if(trim(vin).length == 17 && terminal.length == 11){
                    return;
                }

                if(trim(vin).length == 11 || terminal.length == 17){
                    this.exchangeVinAndTer(trim(vin), terminal)
                }

                if(this.carInfo.terminal){
                    this.getTerminalInfo()
                }
            },
            //交换vin码终端号信息
            exchangeVinAndTer(vin, terminal){
                if(vin.length == 11 && terminal.length !== 11 ||
                    vin.length !== 17 && terminal.length == 17){
                    this.carInfo.vin = terminal
                    this.carInfo.terminal = vin
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

<style scoped>
    @import './scan-add-car.css';
</style>
