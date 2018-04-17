<template>
    <el-container class="fun_wrap fun_content_wrap" v-bind:style="{height: wrapHeight + 'px',position: 'relative'}">
        <el-header>
            <div class="searbox_wrap">
                <div class="searFormRow">
                    <el-row class="sear_box">
                        <div :style="{'float':'left'}">
                            <el-form :inline="true" size="small" ref="form" :model="terminalManageSearParam">
                                <el-form-item label="终端号">
                                    <el-input class="sear_input" v-model="terminalManageSearParam.tboxId" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="终端生产厂商">
                                    <el-input class="sear_input" v-model="terminalManageSearParam.factoryName" clearable></el-input>
                                </el-form-item>
                                <el-form-item label="SIM卡号">
                                    <el-input class="sear_input" v-model="terminalManageSearParam.actualSimNo" clearable></el-input>
                                </el-form-item>
                                <el-form-item>
                                    <el-radio-group @change="installBtnChange" v-model="installBtnSelect">
                                        <el-radio :label="0">全部</el-radio>
                                        <el-radio :label="1">已安装</el-radio>
                                        <el-radio :label="2">未安装</el-radio>
                                    </el-radio-group>
                                </el-form-item>
                            </el-form>
                        </div>
                        <div :style="{'float':'left','margin-left':'20px'}">
                            <el-button size="mini" @click="getTableData" type="success">查询</el-button>
                        </div>
                        <div :style="{'width':'118px','float':'right'}" class="sup_box">
                            <span class="sup_box_span" @click="isSupClickEvent">
                                {{isSupText}}
                                <i class="fa"  v-bind:class="[isSupActive ? 'fa-chevron-down' : 'fa-chevron-up']"></i>
                            </span>
                        </div>
                    </el-row>
                    <el-row v-show="!isSupActive" :style="{marginTop: '10px'}">
                        <div :style="{'float':'left'}">
                            <el-form :inline="true" size="small" :model="terminalManageSearParam" :style="{'margin-left':'5px'}">
                                <el-form-item label="VIN码">
                                    <el-input v-model="terminalManageSearParam.carVin" clearable></el-input>
                                </el-form-item>
                            </el-form>
                        </div>
                    </el-row>
                </div>
                <el-row :span="24" class="btnGroupRow">
                    <el-col :span="4">
                        <el-button v-hasPermisson="'终端管理_删除'" prop='delete' type="danger" size="mini" icon="el-icon-delete" @click="deleteBtn">删除</el-button>
                        <!-- <el-button prop='search' type="success" size="mini" @click="searchBtn">查看</el-button>  -->
                    </el-col>
                    <el-col :span="8.5" :style="{'float':'right','margin-right':'30px'}">
                        <el-button v-hasPermisson="'终端管理_导入'" prop='import' class="myBtnType_Cyan" size="mini" icon="el-icon-download" plain @click="importBtn">导入</el-button>
                        <el-button prop='export' v-hasPermisson="'终端管理_导出'" class="myBtnType_Cyan" size="mini" icon="el-icon-upload2" plain @click="exportBtn">导出</el-button>
                        <!-- <el-button prop='edit' class="importBtn" icon="el-icon-upload2" plain @click="editBtn">修改</el-button> -->
                        <el-button prop='add' v-hasPermisson="'终端管理_新增'" type="primary" size="mini" icon="el-icon-plus" @click="addBtn">新增</el-button>
                    </el-col>
                </el-row>
            </div>


        </el-header>
        <el-main v-bind:class="[isSupActive ? 'heigthnormal' : 'heigthadd']">
            <el-table ref="terminalManagetable" @row-click="rowClickEvent" :model="form" @selection-change="tableSelectChange"  :data="terminalManageTab" :height="tableHeight" tooltip-effect="dark" :stripe="true" size="mini" highlight-current-row :border="true">
                <el-table-column :show-overflow-tooltip="showTipFlg" width="34" header-align="left" type="selection" label=""></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" width="50" header-align="left" type="index" label="序号"></el-table-column>
         		<el-table-column :show-overflow-tooltip="showTipFlg" width="120" header-align="left" prop="tboxId" label="终端号">
                    <template slot-scope="scope">
                        <div v-if="isEditPermisson" @click="cellClickEvent(scope.row)" :style="{'color':'#409EFF','cursor':'pointer'}">
                            <span class="el-icon-edit"></span>
                            <span >{{ scope.row.tboxId }}</span>
                        </div>
                        <div v-if="!isEditPermisson" @click="cellClickEvent(scope.row)" v-bind:style="{color:'#409EFF',cursor:'pointer'}">
                            <span class="fa fa-book"></span>
                            <span >{{ scope.row.tboxId }}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" width="120" header-align="left" prop="actualSimNo" label="实际SIM卡号"></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" width="120" header-align="left" prop="iccid" label="ICCID"></el-table-column>
                <!-- <el-table-column :show-overflow-tooltip="showTipFlg" width="104" header-align="left" prop=" onlineSimNo" label="线上SIM卡号"></el-table-column> -->
                <el-table-column :show-overflow-tooltip="showTipFlg" width="100" header-align="left" prop="factoryName" label="终端生产厂商"></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" width="100" header-align="left" prop="tboxModel" label="终端号型号"></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" width="100" header-align="left" prop="tboxVer" label="终端版本号"></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" header-align="left" prop="carVin" label="VIN"></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" header-align="left" prop="carNo" label="车牌号"></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" header-align="left" prop="produceDate" label="生产日期"> </el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" header-align="left" prop="buyDate" label="购买日期"> </el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" header-align="left" prop="expireDate" label="保修截止日期"> </el-table-column>
            </el-table>
        </el-main>
        <el-footer class="footer_page">
            <el-row :span="24">
                <el-col :span="15" :offset="9">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="currentPage"
                    :page-sizes="[15, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="TotalPages" background>
                    </el-pagination>
                </el-col>
            </el-row>
        </el-footer>
        <!-- 新增 -->
        <el-dialog v-drag="{width:700,height:372}" :close-on-click-modal="false" @open="openWindowEvent('form')" :title="winTitle" @close="closeWindow('form')" :visible.sync="addDialogFormVisible" width="700px">
           <el-form :model="form" ref="form" size="small" :rules="rules" :inline="true">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="终端号" class="verify" verify VerifyTerminal prop="tboxId" :label-width="formLabelWidth">
                            <el-input v-focus="btnSelect == 'add'" :style="{width: '182px'}" v-model="form.tboxId" auto-complete="off" placeholder="请输入..." clearable></el-input>
                            <!--@select="querySearchSelect"  :fetch-suggestions="querySearchAsync"-->
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="终端型号" class="verify" verify VerifyTerminalModel prop="tboxModel" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.tboxModel" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实际SIM卡号" prop="actualSimNo" class="verify" verify VerifySimNo :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model.number="form.actualSimNo" :maxlength="13" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ICCID" prop="iccid" verify can-be-empty VerifyICCID :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.iccid" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="终端生产厂商" prop="factoryId" :label-width="formLabelWidth">
                            <el-select v-model="form.factoryId" v-bind:style="{width:'182px'}" placeholder="请选择...">
                                <el-option v-for="item in factoryNameSelectData" :key="item.name" :label="item.name" :value="item.factoryId" clearable></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="终端版本号" prop="tboxVer" verify can-be-empty VerifyTeminalVer :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.tboxVer" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="生产日期" prop="produceDateStr" :label-width="formLabelWidth">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.produceDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买日期" prop="buyDateStr" :label-width="formLabelWidth">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.buyDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="保修截止日期" prop="expireDateStr" :label-width="formLabelWidth">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.expireDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上线SIM卡号" prop="onlineSimNo" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.onlineSimNo" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="24">
                        <el-form-item label="备注" verify can-be-empty VerifyNumABCZh prop="remark" :label-width="formLabelWidth">
                            <el-input  type="textarea" maxlength="100" :style="{'width':'508px'}"  v-model="form.remark" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer">
                <el-button size="mini" @click="closeWindow('form')" class="dialogClose">取 消</el-button>
                <el-button size="mini" type="success" @click="addSaveTboxEvent('form')">保 存</el-button>
            </div>
        </el-dialog>
        <!-- 修改 -->
        <el-dialog v-drag="{width:740,height:372}" :close-on-click-modal="false" :title="winTitle" @close="closeWindow('form')" :visible.sync="editDialogFormVisible" width="740px">
           <el-form :model="form" ref="form" size="small" :rules="rules" :inline="true" :disabled="btnSelect == 'edit' && !isEditPermisson">
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="终端号" class="verify" verify VerifyTerminal prop="tboxId" :label-width="formLabelWidth">
                            <el-input v-focus="btnSelect == 'add'" :disabled="true" :style="{width: '182px'}" v-model="form.tboxId" auto-complete="off" placeholder="请输入..."></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="终端型号" class="verify" verify VerifyTerminalModel prop="tboxModel" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.tboxModel" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="实际SIM卡号" class="verify" verify VerifySimNo prop="actualSimNo" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model.number="form.actualSimNo" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="ICCID" verify can-be-empty VerifyICCID prop="iccid" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.iccid" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="终端生产厂商" prop="factoryId" :label-width="formLabelWidth">
                            <el-select v-model="form.factoryId" v-bind:style="{width:'182px'}" placeholder="请选择...">
                                <el-option v-for="item in factoryNameSelectData" :key="item.name" :label="item.name" :value="item.factoryId" clearable></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="终端版本号" verify can-be-empty VerifyTeminalVer prop="tboxVer" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.tboxVer" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="生产日期" prop="produceDateStr" :label-width="formLabelWidth">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.produceDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="购买日期" prop="buyDateStr" :label-width="formLabelWidth">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.buyDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="12">
                        <el-form-item label="保修截止日期" prop="expireDateStr" :label-width="formLabelWidth">
                            <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.expireDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上线SIM卡号" prop="onlineSimNo" :label-width="formLabelWidth">
                            <el-input :style="{width: '182px'}" v-model="form.onlineSimNo" auto-complete="off" :disabled="true"></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="24">
                        <el-form-item label="备注" verify can-be-empty VerifyNumABCZh prop="remark" :label-width="formLabelWidth">
                            <el-input  type="textarea" maxlength="100" v-model="form.remark" placeholder="请输入..." :style="{'width':'528px'}" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="foot_botton_posi">
                <el-button @click="closeWindow('form')" size="mini" v-bind:class="[isshow ? 'showContent borderShow' : 'hideContent']">{{hideText}}</el-button>
                <el-button type="success" :disabled="btnSelect == 'edit' && !isEditPermisson" size="mini" @click="editSaveEvent('form')" v-bind:class="[isshow ? 'showContent' : 'hideContent']">{{showText}}</el-button>
            </div>
        </el-dialog>

        <!-- 导入 -->
        <el-dialog id="terminalImportWin" class="import_win" :close-on-click-modal="false" v-drag="{width:740,height:372}" :title="winTitle" @close="closeImportWindow" :visible.sync="importDialogFormVisible" width="740px">
            <el-form class="import_win_form" :inline="true">
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-button class="importContent" size="mini" @click="downImportExcel">下载模板</el-button>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row>
                    <el-col :span="24">
                        <el-form-item>
                            <el-upload
                                ref="upload"
                                :action="upLodImportBaseUrl"
                                :file-list="importFileList"
                                name="terminalTemplate"
                                :on-change="importFileChange"
                                :on-success="checkImport"
                                accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain">
                                    <el-button slot="trigger" size="mini" class="importContent">选取文件</el-button>
                                    <!-- <el-button :style="{marginTop: '10px'}" @click="importSubmitEvent" size="small">确认导入</el-button> -->
                                    <!-- <el-progress v-bind:style="{width: '220px',display: 'inline-block'}" :text-inside="true" :stroke-width="18" :percentage="0" status="success"></el-progress> -->
                            </el-upload>
                        </el-form-item>
                    </el-col>
                </el-row>

            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" class="dialogClose" @click="closeImportWindow">取 消</el-button>
                <el-button size="mini" type="success" @click="importSaveEvent">保 存</el-button>
            </div>
        </el-dialog>
    </el-container>
</template>

<script>
    import api from 'api/terminal'
    import axios from 'axios'
    // import ValidateUtil from 'utils/ValidateUtils'
    import date from 'utils/dateUtil'
    export default {
        name: 'terminalManage',
        data() {
            return {
                wrapHeight: 802, //功能模块的高度
                isSupText: '高级筛选', //高级筛选文字显示
                isshow: true,
                hideText: '取 消',
                showText: '保 存',
                isEditPermisson: this.GLOBAL.isHasPermisson('终端管理_修改'),
                isSupActive: true, //高级筛选是否开启
                addDialogFormVisible: false,  //新增模态是否展开
                editDialogFormVisible: false,  //修改
                importDialogFormVisible: false, //导入
                upLodImportBaseUrl: '',  //上传
                importFileList: [],  //导入文件列表
                factoryNameSelectData: [], //终端生产厂商下拉框
                forbidden: false,
                btnSelect: "",
                tableHeight: '',  //表格高度
                showTipFlg: true, //表格是否显示tip
                tableSelectData: [], //表格数据是否被选中
                winTitle: '修改终端信息',
                TotalPages: 200, //表格总页数
                currentPage: 1, //分页当前页
                pageSize: 15,
                formLabelWidth: '106px', //模态框lable宽度
                installBtnSelect: 0,
                terminalManageSearParam: {     //模态搜索框
                    tboxId: '',
                    factoryName: '',
                    actualSimNo: '',
                    carVin: '',
                    install: 0
                },
                rules: { //模态框表单验证规则
                    factoryId:[
                        {required: true, message: '请选择终端生产厂商', trigger: 'change'}
                    ],
                    remark:[{min:0, max:100, message: '最多可输入 100 个字符', trigger: 'blur'}]
                },
                terminalManageTab: [],  //表格数据
                form: {    //模态框表单数据
                    tboxId: '',
                    tboxModel: '',
                    actualSimNo: '',
                    iccid: '',
                    onlineSimNo: '',
                    factoryId: '',
                    factoryName: '',
                    tboxVer: '',
                    produceDateStr: '',
                    buyDateStr: '',
                    expireDateStr: '',
                    remark: '',
                    id: ''
                }

            }
        },
        created() {
            this.wrapHeight = this.$store.state.home.settings.deviceHeight - 22;
            this.tableHeight = this.wrapHeight - 183;
            this.getTableData();
            this.getFactoryName();
            this.upLodImportBaseUrl = axios.defaults.baseURL + '/terminals/getTerminalExcelData'   //获取导入终端信息

        },
        methods: {
            // 高级筛选
            isSupClickEvent(){
                this.isSupActive = !this.isSupActive;
                if(this.isSupActive){
                    this.isSupText = "高级筛选"
                    this.tableHeight = this.wrapHeight - 183;
                }else{
                    this.isSupText = "收起筛选";
                    this.tableHeight = this.wrapHeight - 183 - 47;
                }
            },
            // page分页
            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData();
            },
            installBtnChange(val){
                this.terminalManageSearParam.install = val
            },
            //获取表格数据
            getTableData(){
                var data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    tboxId: this.terminalManageSearParam.tboxId,
                    factoryName: this.terminalManageSearParam.factoryName,
                    actualSimNo: this.terminalManageSearParam.actualSimNo,
                    carVin: this.terminalManageSearParam.carVin,
                    install: this.terminalManageSearParam.install
                }

                api.getTerminalList(data).then((response) =>{
                    this.terminalManageTab = response.data.list;
                    this.TotalPages = response.data.total;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                })
            },
            openWindowEvent(){
                this.form.produceDateStr = date.defaulDateFormart(new Date())
                this.form.buyDateStr = date.defaulDateFormart(new Date())
            },
            //关闭弹窗
            closeWindow(formName) {
                this.addDialogFormVisible = false;
                this.editDialogFormVisible = false;
                this.$refs[formName].resetFields();
                for(var p in this.form){
                    this.form[p] = "";
                }
                this.$refs.terminalManagetable.clearSelection()
            },
           //触发点击不同的表格项获取当前
            tableSelectChange(val){
                this.tableSelectData = val;
            },
            //判断当前表格是否被选中
            isSelectTableData(){
                var seletLeng = this.tableSelectData.length;

                if(seletLeng == 0){
                    this.$notify({
                        title: '警告',
                        message: '请选择表格数据进行操作',
                        type: 'error',
                        offset: 200,
                        duration: 1500
                    });
                    return false;
                }
                return true;
            },

            // 弹窗事件
            deleteBtn(){
                this.deleteEvent();           //删除
            },
            searchBtn(){
                this.winTitle = "查看终端"     //查看
                this.searchEvent();
            },
            importBtn(){
                this.winTitle = "导入终端信息" //导入
                this.importDialogFormVisible = true;
                this.importFileList = [];
            },
            exportBtn(){
                this.exportEvent();             //导出
            },
            addBtn(){
                this.winTitle = "新增终端"      //新增
                this.addDialogFormVisible = true;
                this.btnSelect = "add"
            },
            cellClickEvent(row){
                this.editDialogFormVisible = true;
                this.winTitle = "修改终端信息";
                this.btnSelect = "edit"
                this.isshow = true;
                this.forbidden = false;
                var seletData = row;

                this.form.tboxId = seletData.tboxId;
                this.form.tboxModel = seletData.tboxModel;
                this.form.actualSimNo = seletData.actualSimNo;
                this.form.iccid = seletData.iccid;
                this.form.onlineSimNo = seletData.onlineSimNo;
                this.form.factoryId = seletData.factoryId;
                this.form.tboxVer = seletData.tboxVer;
                this.form.produceDateStr = seletData.produceDate;
                this.form.produceDateStr = seletData.produceDate;
                this.form.buyDateStr = seletData.buyDate;
                this.form.expireDateStr = seletData.expireDate;
                this.form.remark = seletData.remark;
                this.form.id = seletData.id;

            },
            rowClickEvent(row){
                this.$refs.terminalManagetable.toggleRowSelection(row);
            },
            //获取终端生产厂商
            getFactoryName(){
                var data = {
                    factoryName: this.form.factoryName
                }

                api.searchfactoryName(data).then((response) =>{
                    this.factoryNameSelectData = response.data;

                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            deleteEvent(){
                this.isshow = true;
                this.forbidden = true;
                var flg = this.isSelectTableData();

                if(flg) {
                    this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() =>{

                        var strLink = "";
                        var seletData = this.tableSelectData;

                        for(let item of seletData){
                            strLink += item.id + ',';
                        }

                        var keyLink = {ids: strLink}

                        api.deleteTableData(keyLink).then((response) =>{
                            if(response.code == 200) {
                                this.addDialogFormVisible = false;
                                this.editDialogFormVisible = false;
                                this.getTableData();
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '删除成功'
                                });
                            }
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                        })
                    }).catch(() =>{
                        this.$message({
                            type: 'info',
                            duration: 1500,
                            showClose: true,
                            message: '已取消删除'
                        });
                    })
                }
            },
            // 新增保存
            addSaveTboxEvent(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        api.addTbox(this.form).then(() =>{
                            this.addDialogFormVisible = false;
                            this.getTableData();
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '添加成功'
                            });
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                        });
                    }else {
                        return false;
                    }
                })

            },
            //修改保存
            editSaveEvent(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid) {
                        api.updateTbox(this.form).then((response) =>{
                            if (response.code === 200){
                                this.editDialogFormVisible = false;
                                this.getTableData();
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '修改成功'
                                });
                            }
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                        });
                    }else{
                        return false;
                    }
                })
            },
            //查看
            searchEvent(){
                this.winTitle = "查看终端信息";
                this.isshow = false;
                this.forbidden = true;
                var flg = this.isSelectTableData();

                if(flg){
                    var seletData = this.tableSelectData[this.tableSelectData.length - 1];

                    this.form.tboxId = seletData.tboxId;
                    this.form.tboxModel = seletData.tboxModel;
                    this.form.actualSimNo = seletData.actualSimNo;
                    this.form.iccid = seletData.iccid;
                    this.form.onlineSimNo = seletData.onlineSimNo;
                    this.form.factoryId = seletData.factoryId;
                    this.form.tboxVer = seletData.tboxVer;
                    this.form.produceDateStr = seletData.produceDate;
                    this.form.buyDateStr = seletData.buyDate;
                    this.form.expireDateStr = seletData.expireDate;
                    this.form.remark = seletData.remark;
                    this.form.id = seletData.id;

                    this.editDialogFormVisible = true;
                    this.isshow = false;
                }

            },
            //导入
            downImportExcel(){
                window.location = axios.defaults.baseURL + '/common/downloadTemplate?templateName=terminalTemplate.xls'
            },
            importFileChange(file){
                this.importFileList = [];
                this.importFileList.push(file)
            },
            checkImport(response){
                if(response.code != '200'){
                    this.importFileList = [];
                    this.$refs.upload.clearFiles();
                    this.$message({
                        type: 'error',
                        duration: 0,
                        showClose: true,
                        message: response.message
                    });
                    $('#terminalImportWin .el-icon-close')[1].trigger('click')
                }
            },
            closeImportWindow(){
                this.importDialogFormVisible = false
            },
            // 导入保存
            importSaveEvent(){
                api.importSaveTbox().then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '保存成功'
                    });
                    this.importDialogFormVisible = false
                    this.getTableData();

                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });

            },
            //导出
            exportEvent(){
                if(this.terminalManageTab.length <= 0){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '表格无数据'
                    });
                    return
                }
                var totalData = {
                    tboxId: this.terminalManageSearParam.tboxId,
                    factoryName: this.terminalManageSearParam.factoryName,
                    actualSimNo: this.terminalManageSearParam.actualSimNo,
                    carVin: this.terminalManageSearParam.carVin,
                    install: this.terminalManageSearParam.install,
                    headers: '终端号,SIM卡号,ICCID,终端生产厂商,终端型号,终端版本号,VIN,车牌,生产日期,购买日期,保修截止日期,备注',
                    fields: 'tboxId,actualSimNo,iccid,factoryName,tboxModel,tboxVer,carVin,carNo,produceDate,buyDate,expireDate,remark'
                }
                var dataStr = '';

                for(var item in totalData) {
                    dataStr += item + '=' + totalData[item] + '&'
                }
                window.location = axios.defaults.baseURL + '/terminals/downloadTerminal?' + dataStr
            }
        }
    }
</script>

<style scoped>
/* .heigthnormal{
    margin-top:45px;
} */
    /* .heigthadd{
        margin-top:90px;
    } */
    .foot_botton_posi{
        margin-right: 48px;
    }
    .showContent{
        display: inline;
    }
    .borderShow{
        border:solid 1px #ddd !important;
    }
    .hideContent{
        display: none
    }
    .el-input {
        width: 140px;
    }

    /* .el-button:focus, .el-button:hover{
        background-color: #57B94A;
    } */
    .el-table__header-wrapper{
        border-bottom: 4px solid #efefef;
    }
    .importBtn{
        background-color: #caf2ff !important;
        color:#1EBAFA !important;
    }
    .importBtn:hover{
        background-color: #ABE7FF !important;
    }
    .el-button{
        border-radius: 2px;
    }

</style>

