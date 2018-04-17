<template>
    <div id="carmanege_wrap" class="fun_wrap" v-bind:style="{marginLeft: '0px', background: '#f0f3f4'}">
        <el-container v-bind:style="{height: wrapHeight + 'px',position: 'relative'}">
            <el-aside id="orgTreeBox" v-bind:style="{width: '230px', marginTop: '-20px', boxShadow: '1px -2px 3px 0px #dcdfe6'}" v-show="!this.$store.state.home.orgTreeIsHide">
                <vOrgTree v-on:orgNodeForCarManege="dataFromChild"></vOrgTree>
            </el-aside>
            <div v-show="this.$store.state.home.orgTreeIsHide" @click="orgTreeIsshow" class="orgtree_show_btn">
                <img src="static/img/orgtreeshow_icon.png" alt="">
            </div>
            <el-container v-bind:style="{minWidth: '850px'}" class="carmanage_right">
                <div v-show="dragLineShow" id="dragLine" class="drag_line"></div>
                <div v-show="!this.$store.state.home.orgTreeIsHide" v-bind:style="{height: wrapHeight + 'px'}" id="drag_line_btn" class="drag_line_btn" @mousedown="orgTreeMouseDownEvent"  @mouseup.stop.prevent="orgTreeMouseUpEvent"></div>
                <div v-show="!this.$store.state.home.orgTreeIsHide" @click="orgTreeIshide" class="orgtree_hide_btn">
                    <img src="static/img/orgtreehide_icon.png" alt="">
                </div>
                <el-container>
                    <el-header class="_carManageHead">
                        <el-row class="searFormRow">
                            <div :style="{'float':'left'}">
                                <el-form :inline="true" size="small" ref="carManageSearParam" :model="carManageSearParam" :rules="rules">
                                    <el-form-item label="车牌号" prop="carNo" verify can-be-empty VerifyCarNo>
                                        <el-input class="sear_input" v-model="carManageSearParam.carNo" placeholder="请输入..." clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="VIN码" prop="carVin" verify can-be-empty VerifyVin>
                                        <el-input class="sear_input" v-model="carManageSearParam.carVin" placeholder="请输入..." clearable></el-input>
                                    </el-form-item>
                                    <el-form-item label="终端号" prop="tboxId" verify can-be-empty VerifyTerminal>
                                        <el-input class="sear_input" v-model="carManageSearParam.tboxId" placeholder="请输入..." clearable></el-input>
                                    </el-form-item>
                                </el-form>
                            </div>
                            <div :style="{'width':'100px','float':'left', marginLeft: '20px', 'verticalAlign': 'top'}">
                                <el-button size="mini" type="success" @click="getTableData">查询</el-button>
                            </div>
                        </el-row>
                        <el-row class="btnGroupRow">
                            <el-col :span="6">
                                <el-button size="mini" v-hasPermisson="'车辆管理_删除'" type="danger" icon="el-icon-delete" @click="delectEvent">删除</el-button>
                                <el-button v-show="isshow" v-hasPermisson="'车辆管理_停用'" type="danger" size="mini" class="myBtnTypeStop" icon="fa fa-stop-circle-o" @click="stopBtn">停用</el-button>
                                <el-button v-show="!isshow" v-hasPermisson="'车辆管理_启用'" type="success" size="mini" icon="fa fa-play-circle-o" @click="startBtn">启用</el-button>
                            </el-col>
                            <el-col :span="18" v-bind:style="{textAlign: 'right', float: 'right'}">
                                <el-button v-hasPermisson="'车辆管理_导入'" size="mini" class="myBtnType_Cyan" v-show="isshow" icon="el-icon-download" @click="importEvent">导入</el-button>
                                <el-button v-hasPermisson="'车辆管理_批量修改'" size="mini" class="myBtnType_Cyan" v-show="isshow" icon="el-icon-edit-outline" @click="countEditEvent">批量修改</el-button>
                                <el-button v-hasPermisson="'车辆管理_导出'" size="mini" class="myBtnType_Cyan" icon="el-icon-upload2" @click="exportEvent">导出</el-button>
                                <!-- <el-button size="mini" class="myBtnType_Cyan" icon="el-icon-upload2" @click="editEvent">修改</el-button> -->
                                <el-button size="mini" v-hasPermisson="'车辆管理_新增'" type="primary" v-show="isshow" icon="el-icon-plus" @click="addEvent">新增</el-button>
                            </el-col>

                        </el-row>

                        <el-row :style="{position: 'relative'}">
                            <el-tabs class="myTabs_wrap" v-model="tabSelect" @tab-click="carStateClick">
                                <el-tab-pane label="正常车辆" name="normal"></el-tab-pane>
                                <el-tab-pane label="停用车辆" name="stop"></el-tab-pane>
                            </el-tabs>
                            <div :style="{position: 'absolute', right: '20px', top: '0px'}">
                                <el-popover
                                    ref="setTableCol"
                                    placement="bottom-start"
                                    width="100"
                                    @hide="tableCellCloseEvent"
                                    trigger="click">

                                    <EasyScrollbar :barOption="barOpt">
                                        <div v-bind:style="{maxHeight: '250px'}">
                                            <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                            <el-checkbox-group @change="handleCheckGroupChange" v-model="checkList">
                                                <el-checkbox v-for="(value, key) in tableCellKeyVal" :key="key" :label="key">{{value}}</el-checkbox>
                                            </el-checkbox-group>
                                        </div>
                                    </EasyScrollbar>
                                </el-popover>
                                <span v-popover:setTableCol class="fa-stack" :style="{color: '#999'}">
                                    <i class="fa fa-filter fa-2x"></i>
                                    <i :style="{paddingLeft: '15px', paddingTop: '5px'}" class="fa fa-align-center fa-stack-1x"></i>
                                </span>
                            </div>
                        </el-row>

                    </el-header>
                    <el-main>
                        <el-table ref="carManegetable" @row-click="rowClickEvent" @selection-change="tableSelectChange" :model="form"  :data="carManagesTab" :height="tableHeight" tooltip-effect="dark" :stripe="true" size="mini" highlight-current-row :border="true">
                            <el-table-column :show-overflow-tooltip="showTipFlg" width="34" header-align="left" type="selection" label=""></el-table-column>
                            <el-table-column :show-overflow-tooltip="showTipFlg" width="52" header-align="left" type="index" label="序号"></el-table-column>
                            <el-table-column v-if="isTableCellShow('carNo')" key="carNo" :show-overflow-tooltip="showTipFlg" header-align="left" prop="carNo" label="车牌号">
                                <template slot-scope="scope">
                                    <el-row>
                                        <div v-if="isEditPermisson" @click="cellClickEvent(scope.row)" :style="{'color':'#409EFF','cursor':'pointer','margin-left':'6px'}">
                                            <span class="el-icon-edit"></span>
                                            <span >{{ scope.row.carNo }}</span>
                                        </div>
                                        <div @click="cellClickEvent(scope.row)" v-if="!isEditPermisson" v-bind:style="{color:'#409EFF',cursor:'pointer'}">
                                            <span class="fa fa-book"></span>
                                            <span >{{ scope.row.carNo }}</span>
                                        </div>
                                    </el-row>
                                </template>
                            </el-table-column>
                            <el-table-column v-if="isTableCellShow('carVin')" key="carVin" :show-overflow-tooltip="showTipFlg" header-align="left" prop="carVin" label="VIN码"></el-table-column>
                            <el-table-column v-if="isTableCellShow('orgName')" key="orgName" :show-overflow-tooltip="showTipFlg" header-align="left" prop="orgName" label="组织名称"></el-table-column>
                            <el-table-column v-if="isTableCellShow('carModelName')" key="carModelName" :show-overflow-tooltip="showTipFlg" header-align="left" prop="carModelName" label="车辆型号"></el-table-column>
                            <el-table-column v-if="isTableCellShow('productionDate')" key="productionDate" :show-overflow-tooltip="showTipFlg" header-align="left" prop="productionDate" label="生产日期"> </el-table-column>
                            <el-table-column v-if="isTableCellShow('tboxId')" key="tboxId" :show-overflow-tooltip="showTipFlg" header-align="left" prop="tboxId" label="终端号"></el-table-column>
                            <el-table-column v-if="isTableCellShow('actualSimNo')" key="actualSimNo" :show-overflow-tooltip="showTipFlg" header-align="left" prop="actualSimNo" label="SIM卡号"></el-table-column>
                            <el-table-column v-if="isTableCellShow('iccid')" key="iccid" :show-overflow-tooltip="showTipFlg" header-align="left" prop="iccid" label="ICCID"></el-table-column>
                            <el-table-column v-if="isTableCellShow('createTime')" key="createTime" :show-overflow-tooltip="showTipFlg" header-align="left" prop="createTime" label="创建时间"></el-table-column>
                            <el-table-column v-if="isTableCellShow('createUserName')" key="createUserName" :show-overflow-tooltip="showTipFlg" header-align="left" prop="createUserName" label="创建者"></el-table-column>
                        </el-table>
                    </el-main>
                    <el-footer class="footer_page">
                        <el-row :span="24">
                            <el-col :span="20" :offset="2">
                                <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="currentPage" :page-sizes="[15, 20, 30, 50]" :page-size="pageSize" layout="total, sizes, prev, pager, next, jumper" background :total="TotalPages">
                                </el-pagination>
                            </el-col>
                        </el-row>
                    </el-footer>
                </el-container>
            </el-container>

            <el-dialog v-drag="{width:700,height:372}" :title="winTitle" @open="openWindowEvent('form')" @close="closeWindow('form')" :visible.sync="dialogFormVisible" :close-on-click-modal="false" width="700px">
                <el-form :model="form" :disabled="btnSelect == 'edit' && !isEditPermisson" ref="form" size="small" :rules="rules" :inline="true">
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="VIN码" class="verify" prop="carVin" verify VerifyVin :label-width="formLabelWidth">
                                <el-input v-focus="btnSelect == 'add'" :style="{width: '182px'}" @keyup.native="carVinAndNo" @change="checkCarVin" v-model="form.carVin" :maxlength="17" auto-complete="off" placeholder="请输入..." clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="生产日期" prop="productionDateStr" :label-width="formLabelWidth">
                                <el-date-picker type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" v-model="form.productionDateStr" clearable :style="{width: '182px'}"></el-date-picker>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="车牌号" class="verify" prop="carNo" verify VerifyCarNo :label-width="formLabelWidth">
                                <el-input :style="{width: '182px'}" v-model="form.carNo" auto-complete="off" placeholder="请输入..." clearable></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="终端号" class="verify" verify VerifyTerminal prop="tboxId" :label-width="formLabelWidth">
                                <div>
                                    <el-autocomplete
                                        v-model="form.tboxId"
                                        :style="{width: '182px'}"
                                        :fetch-suggestions="querySearchAsync"
                                        :trigger-on-focus="true"
                                        placeholder="请输入..."
                                        @select="querySearchSelect"
                                        ></el-autocomplete>
                                </div>
                                <!-- <el-input :style="{width: '182px'}" v-model="form.tboxId" auto-complete="off" placeholder="请输入..." clearable></el-input> -->
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="组织名称" prop="orgUuid" :label-width="formLabelWidth">
                                <el-popover
                                    ref="focusorgtree"
                                    placement="bottom-start"
                                    width="200"
                                    v-model="orgPopoverShow"
                                    trigger="click">
                                    <el-row>
                                        <el-input @keyup.native="carManageFormSearOrg" v-model="carMaFormSearWord" v-bind:style="{width: '178px'}" prefix-icon="el-icon-search">
                                        </el-input>
                                    </el-row>
                                    <el-row>
                                        <EasyScrollbar :barOption="barOpt">
                                            <div v-bind:style="{maxHeight: '250px', minHeight: '250px'}">
                                                <ul class="ztree" ref="carManege_ogrTree" id="carManege_ogrTree"></ul>
                                            </div>
                                        </EasyScrollbar>
                                    </el-row>
                                </el-popover>
                                <el-input v-bind:style="{width:'182px'}" readonly="readonly" v-model="form.orgName" v-popover:focusorgtree auto-complete="off" placeholder="请选择..." ></el-input>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="SIM卡号" prop="actualSimNo" :label-width="formLabelWidth">
                                <el-input :style="{width: '182px'}" :disabled="true" v-model="form.actualSimNo" placeholder="请输入..." auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="12">
                            <el-form-item label="车辆型号" prop="carModelId" :label-width="formLabelWidth">
                                <el-select v-model="form.carModelId" v-bind:style="{width:'182px'}" placeholder="请选择...">
                                    <el-option v-for="item in carModelSelectData" :key="item.modeId" :label="item.modelName" :value="item.modeId"></el-option>
                                </el-select>
                            </el-form-item>
                        </el-col>
                        <el-col :span="12">
                            <el-form-item label="ICCID" prop="ICCID" :label-width="formLabelWidth">
                                <el-input :style="{width: '182px'}" :disabled="true" placeholder="请输入..." v-model="form.iccid" auto-complete="off"></el-input>
                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" class="dialogClose" @click="closeWindow('form')">关 闭</el-button>
                    <el-button :disabled="btnSelect == 'edit' && !isEditPermisson" size="mini" type="success" @click="carSaveEvent('form')">保 存</el-button>
                </div>
            </el-dialog>
            <!-- 导入 -->
            <el-dialog class="import_win" :close-on-click-modal="false" v-drag="{width:640,height:372}" :title="'导入车辆信息'" @close="closeImportWindow" :visible.sync="dialogImportVisible" width="640px">
                <el-form class="import_win_form" :inline="true" size="mini">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button @click="downImportExcel" size="mini">下载模板</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <!-- <el-upload
                                    class="upload-demo"
                                    ref="uploadimport"
                                    :action="upLodImportBaseUrl"
                                    :file-list="importFileList"
                                    name="carTemplate"
                                    :on-change="importFileChange"
                                    :on-success="checkImport"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"
                                    >
                                        <el-button slot="trigger" size="mini">选取文件</el-button>
                                </el-upload> -->
                                <el-upload
                                    class="upload-demo"
                                    drag
                                    id="uploadimport"
                                    ref="uploadimport"
                                    :action="upLodImportBaseUrl"
                                    :file-list="importFileList"
                                    name="carTemplate"
                                    :on-change="importFileChange"
                                    :on-success="checkImport"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"
                                    >
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>
                            </el-form-item>
                        </el-col>
                    </el-row>

                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="closeImportWindow">关 闭</el-button>
                    <el-button size="mini" type="success" @click="importSaveEvent">保 存</el-button>
                </div>
            </el-dialog>

            <!-- 批量修改 -->
            <el-dialog class="import_win countEdit_win" :close-on-click-modal="false" v-drag="{width:640,height:372}" :title="'批量修改车辆信息'" @close="closeContEditWindow" :visible.sync="dialogCountEditVisible" width="640px">
                <el-form class="countEdit_win_form" :inline="true" size="mini">
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <el-button @click="downCountEditExcel" size="mini">下载模板</el-button>
                            </el-form-item>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col :span="24">
                            <el-form-item>
                                <!-- <el-upload
                                    class="upload-demo"
                                    ref="countEditupload"
                                    :action="upLodCountEditBaseUrl"
                                    :file-list="countEditFileList"
                                    :on-change="countEditFileChange"
                                    name="carModifyTemplate"
                                    :on-success="checkCountEdit"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"
                                    >
                                        <el-button slot="trigger" size="mini">选取文件</el-button>

                                </el-upload> -->

                                <el-upload
                                    class="upload-demo"
                                    drag
                                    ref="countEditupload"
                                    :action="upLodCountEditBaseUrl"
                                    :file-list="countEditFileList"
                                    name="carModifyTemplate"
                                    :on-change="countEditFileChange"
                                    :on-success="checkCountEdit"
                                    accept="application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel,.csv,text/plain"
                                    >
                                    <i class="el-icon-upload"></i>
                                    <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
                                    <!-- <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div> -->
                                </el-upload>

                            </el-form-item>
                        </el-col>
                    </el-row>
                </el-form>
                <div slot="footer" class="dialog-footer">
                    <el-button size="mini" @click="closeContEditWindow">关 闭</el-button>
                    <el-button type="success" size="mini" @click="countEditSaveEvent">保 存</el-button>
                </div>
            </el-dialog>
        </el-container>
    </div>
</template>

<script>
    import vOrgTree from 'components/vueOrgTree'
    import api from 'api/carManage'
    import tmapi from 'api/terminal'
    import cmapi from 'api/carModelManege'
    import axios from 'axios'
    // import ValidateUtil from 'utils/ValidateUtils'
    const tableCellKeyVal = {
        "carNo": '车牌号',
        "carVin": "VIN码",
        "orgName": "组织名称",
        "carModelName": "车辆型号",
        "productionDate": "生产日期",
        "tboxId": "终端号",
        "actualSimNo": "SIM卡号",
        "iccid": "ICCID",
        "createTime": "创建时间",
        "createUserName": "创建者"
    }

    export default {
        name: 'carManage',
        components: {
            vOrgTree
        },
        props: ["isRefresh"],
        data() {
            return {
                wrapHeight: 802, //功能模块的高度
                isIndeterminate: false,
                dragLineShow: false, //组织树拖动显示线
                isSupActive: true, //高级筛选是否开启
                orgTreeWidth: 192, //组织树默认宽度
                isSupText: '高级筛选', //高级筛选文字显示
                upLodImportBaseUrl: '',
                upLodCountEditBaseUrl: '',
                checkList: [], //设置报表列数组
                checkAll: true,
                tableCellList: Object.keys(tableCellKeyVal),
                tableCellKeyVal: tableCellKeyVal,
                isshow: true,
                orgPopoverShow: false,
                carMaFormSearWord: '',
                editRowData: null,
                isEditPermisson: this.GLOBAL.isHasPermisson('车辆管理_修改'),
                barOpt: {
                    barWidth: 7,
                    zIndex: 1083
                },
                carManageSearParam: { //模块搜索条件
                    carNo: '',
                    carVin: '',
                    orgUuid: '',
                    tboxId: '',
                    state: 1
                },
                tableSelectData: [],
                focusOrgData: [],
                orgTreeSetting: {
                    callback: {
                        onClick: this.formOrgTreeClickEvent
                    }
                },
                carManagesTab: [],
                TotalPages: 300, //表格总页数
                currentPage: 1, //分页当前页
                pageSize: 15,
                tabSelect: "normal",  //tab页选择类型
                dialogFormVisible: false, //模态框是否展开
                dialogImportVisible: false, //导入模态框是否张开
                dialogCountEditVisible: false, //批量修改是否展开
                formLabelWidth: '90px', //模态框lable宽度
                showTipFlg: true, //表格是否显示tip
                carModelSelectData: [], //车型下拉框
                importFileList: [],  //导入文件列表
                countEditFileList: [],  //导入文件列表
                form: { //模态框表单数据
                    carUuid: "",
                    carVin: "",
                    productionDateStr: '',
                    carNo: "",
                    tboxId: "",
                    orgUuid: "",
                    actualSimNo: "",
                    carModelId: "",
                    orgName: "",
                    factoryId: "",
                    iccid: ""
                },
                btnSelect: "",
                winTitle: '新增车辆', //模态框标题
                tableHeight: '500',  //表格高度
                rules: { //模态框表单验证规则
                    productionDateStr:[
                        { required: true, message: '请输入生产日期', trigger: 'blur'}
                    ],
                    orgUuid:[
                        {required: true, message: '请输入组织名称', trigger: 'change'}
                    ],
                    carModelId:[
                        {required: true, message: '请输入车辆型号', trigger: 'blur'}
                    ]
                },
                activeName:'first' //tab页
            }
        },
        created() {
            this.wrapHeight = this.$store.state.home.settings.deviceHeight - 22;
            this.tableHeight = this.wrapHeight - 212;
            // this.getTableCellSetList()
            this.GLOBAL.getTableCellSetList('carManage', this.tableCellList).then((res) => {
                this.checkList = res
            })

            this.getTableData();
            this.getCarModelSelectData()

            this.upLodImportBaseUrl = axios.defaults.baseURL + '/cars/getCarExcelData'
            this.upLodCountEditBaseUrl = axios.defaults.baseURL + '/cars/getCarModifyExcelData'
        },
        activated() {
            this.getCarModelSelectData()
        },
        methods: {
            tableCellCloseEvent(){
                this.GLOBAL.tableCellCloseEvent('carManage', this.tableCellKeyVal, this.checkList)
            },
            isTableCellShow(val){
                if(this.checkList.indexOf(val) > -1){
                    return true
                }
                return false
            },
            carVinAndNo(){
                this.form.carNo = String(this.form.carVin)

                this.form.carNo = this.form.carNo.substring(this.form.carNo.length - 8, this.form.carNo.length)

            },
            handleCheckAllChange(val){
                this.checkList = val ? this.tableCellList : [];
                this.isIndeterminate = false;
                var that = this

                window.setTimeout(function(){
                    $('#carmanege_wrap .el-table__body-wrapper').height(that.tableHeight - 40)
                }, 200)
            },
            handleCheckGroupChange(value){
                let checkedCount = value.length;

                this.checkAll = checkedCount === this.tableCellList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableCellList.length;
                var that = this

                window.setTimeout(function(){
                    $('#carmanege_wrap .el-table__body-wrapper').height(that.tableHeight - 40)
                }, 200)
            },
            dateFormat(date){
                var y = date.getFullYear();
                var m = date.getMonth() + 1;

                m = m < 10 ? '0' + m : m;
                var d = date.getDate();

                d = d < 10 ? '0' + d : d;
                var h = date.getHours();

                h = h < 10 ? '0' + h : h;
                var minute = date.getMinutes();

                minute = minute < 10 ? '0' + minute : minute;
                var second = date.getSeconds();

                second = second < 10 ? '0' + second : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },
            getCarModelSelectData(){
                var obj = {
                    pageNum: 1,
                    pageSize: 0
                }

                cmapi.searCarModelInfo(obj).then((response) =>{
                    this.carModelSelectData = response.data.list;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            checkCarNo(){
                var obj = null

                if(this.btnSelect == 'edit'){
                    obj = {
                        field: 'carNo',
                        carNo: this.form.carNo,
                        carUuid: this.editRowData.carUuid
                    }
                }else{
                    obj = {
                        field: 'carNo',
                        carNo: this.form.carNo
                    }
                }
                api.checkCarFiled(obj).then((response) =>{
                    if(response.data != ""){
                        this.$message({
                            type: 'error',
                            duration: 1500,
                            showClose: true,
                            message: response.data
                        });
                        this.form.carNo = "";
                    }
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });


            },
            checkCarVin(){
                var obj = null

                if(this.btnSelect == 'edit'){
                    obj = {
                        field: 'carVin',
                        carVin: this.form.carVin,
                        carUuid: this.editRowData.carUuid
                    }
                }else{
                    obj = {
                        field: 'carVin',
                        carVin: this.form.carVin
                    }
                }


                api.checkCarFiled(obj).then((response) =>{
                    if(response.data != ""){
                        this.$message({
                            type: 'error',
                            duration: 1500,
                            showClose: true,
                            message: response.data
                        });
                        this.form.carVin = "";
                    }
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            closeImportWindow(){
                this.dialogImportVisible = false
            },
            dataFromChild(data){
                if(data){
                    this.carManageSearParam.orgUuid = data.uuid
                }else{
                    this.carManageSearParam.orgUuid = ''
                }
                this.getTableData();
            },
            checkImport(response){
                if(response.code != '200'){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: response.message
                    });
                    this.$refs.uploadimport.clearFiles();
                    // $('.el-icon-close')[1].trigger('click')
                    this.importFileList = [];
                }
            },
            checkCountEdit(response){
                if(response.code != '200'){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: response.message
                    });
                    this.countEditFileList = [];
                    this.$refs.countEditupload.clearFiles();
                    $('.el-icon-close')[1].trigger('click')
                }
            },
            importFileChange(file){
                this.importFileList = [];
                this.importFileList.push(file)
            },
            countEditFileChange(file){
                this.countEditFileList = [];
                this.countEditFileList.push(file)
            },
            exportEvent(){
                if(this.carManagesTab.length <= 0){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '表格无数据'
                    });
                    return
                }
                var obj = {
                    carNo: this.carManageSearParam.carNo,
                    carVin: this.carManageSearParam.carVin,
                    tboxId: this.carManageSearParam.tboxId,
                    orgUuid: this.carManageSearParam.orgUuid,
                    state: this.carManageSearParam.state,
                    headers: '车牌号,VIN码,组织名称,车辆型号,生产日期,终端号,SIM卡号,ICCID,创建时间,创建者',
                    fields: 'carNo,carVin,orgName,carModelName,productionDate,tboxId,actualSimNo,iccid,createTime,createUserName',
                    widths: '100,100,100,100,100,100,100,100,100,100'

                }

                var dataStr = "";

                for(var tt in obj){
                    dataStr += tt + '=' + obj[tt] + '&'
                }

                window.location = axios.defaults.baseURL + '/cars/downloadCar?' + dataStr

            },
            downImportExcel(){
                window.location = axios.defaults.baseURL + '/common/downloadTemplate?templateName=carTemplate.xls'
            },
            downCountEditExcel(){
                window.location = axios.defaults.baseURL + '/common/downloadTemplate?templateName=carModifyTemplate.xls'
            },
            importSaveEvent(){
                if(this.importFileList.length == 0){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '请选择文件'
                    });
                    return
                }
                api.importSave().then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '保存成功'
                    });
                    this.dialogImportVisible = false
                    this.getTableData();
                    this.$store.state.home.isFreshCarTree = true

                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });

            },
            countEditSaveEvent(){
                if(this.countEditFileList.length == 0){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '请选择文件'
                    });
                    return
                }
                api.counEditSave().then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '修改成功'
                    });
                    this.dialogCountEditVisible = false
                    this.getTableData();
                    this.$store.state.home.isFreshCarTree = true

                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });

            },
            querySearchSelect(item){
                this.form.actualSimNo = item.actualSimNo;
                this.form.iccid = item.iccid;
                this.form.tboxId = item.tboxId;
                this.form.factoryId = item.factoryId;
            },
            querySearchAsync(queryString, callback){
                // if(queryString == ""){
                //     $('.el-autocomplete-suggestion__wrap').hide()
                //     $('.el-autocomplete-suggestion').hide()
                // }else{
                //     $('.el-autocomplete-suggestion__wrap').show()
                //     $('.el-autocomplete-suggestion').show()
                // }
                var obj = {
                    tboxId: queryString,
                    install: '2'
                }

                this.form.actualSimNo = "";
                this.form.iccid = "";

                if(this.btnSelect == "edit"){
                    obj = {
                        tboxId: queryString,
                        install: '2',
                        carUuid: this.editRowData.carUuid
                    }
                }

                tmapi.searTerminalInfo(obj).then((response) =>{
                    for(let i of response.data){
                        if(i.factoryName){
                            i.value = i.tboxId + "(" + i.factoryName + ")";  //将tboxId作为value
                        }else{
                            i.value = i.tboxId;  //将tboxId作为value
                        }

                    }

                    return callback(response.data)

                })

            },
            tableSelectChange(val){
                this.tableSelectData = val;
            },
            getOrgTreeData(){
                api.getOrgTree().then((response) =>{

                    var virRootData = this.$store.state.home.orgVirData

                    virRootData.children = response.data;
                    this.focusOrgData = virRootData

                    var orgTree = $.fn.zTree.init($("#carManege_ogrTree"), this.orgTreeSetting, this.focusOrgData);
                    var rootNode = orgTree.getNodes()[0]

                    orgTree.expandNode(rootNode, true)

                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            formOrgTreeClickEvent(ev, treeId, node){
                var formTree =  $.fn.zTree.getZTreeObj("carManege_ogrTree");

                if(node.id != -1){
                    this.form.orgName = node.name;
                    this.form.orgUuid = node.uuid;
                    this.orgPopoverShow = false
                }else{
                    formTree.cancelSelectedNode()
                    this.form.orgName = "";
                    this.form.orgUuid = "";
                }
            },
            carManageFormSearOrg(){
                var searchkey = this.carMaFormSearWord;
                var formTree =  $.fn.zTree.getZTreeObj("carManege_ogrTree");

                function treeDataFilter(node){
                    if(node.name.indexOf(searchkey) != -1){
                        return true
                    }else{
                        return false
                    }
                }
                formTree.cancelSelectedNode()
                if(searchkey != ""){
                    var nodeArr = formTree.getNodesByFilter(treeDataFilter)

                    for(var item of nodeArr){
                        formTree.selectNode(item, true)
                    }
                }
            },

            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData();
            },
            getTableData(){
                var data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    carNo: this.carManageSearParam.carNo,
                    carVin: this.carManageSearParam.carVin,
                    orgUuid: this.carManageSearParam.orgUuid,
                    tboxId: this.carManageSearParam.tboxId,
                    state: this.carManageSearParam.state
                }

                api.getCarList(data).then((response) =>{
                    this.carManagesTab = response.data.list;
                    this.TotalPages = response.data.total;
                    // this.state =
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            addEvent(){
                this.winTitle = "新增车辆"
                this.btnSelect = "add"
                this.dialogFormVisible = true;
            },
            countEditEvent(){
                this.countEditFileList = [];
                this.dialogCountEditVisible = true;
            },
            importEvent(){
                this.dialogImportVisible = true;
                this.importFileList = [];
            },
            // 车辆启用
            carStateClick(){
                if(this.tabSelect == "normal"){
                    this.isshow = true;
                    this.carManageSearParam.state = 1;
                    this.getTableData();

                }else if(this.tabSelect == "stop"){
                    this.isshow = false;
                    this.carManageSearParam.state = 0;
                    this.getTableData();
                }
            },
            startBtn(){
                this.startEvent();
            },
            startEvent(){
                var flg = this.isSelectTableData();

                if(flg){
                    this.$confirm('此操作将改变车辆状态，是否启用？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        var orgStr = "";
                        var seletData = this.tableSelectData;

                        for(let item of seletData){
                            orgStr += item.carUuid + ',';
                        }
                        var strLink = {carUuids: orgStr}

                        api.startCar(strLink).then(() =>{
                            this.getTableData();
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '启用成功'
                            });
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            duration: 1500,
                            showClose: true,
                            message: '已取消启用'
                        });
                    });
                }
            },
            // 车辆停用
            stopBtn(){
                this.stopEvent();
            },
            stopEvent(){
                var flg = this.isSelectTableData();

                if(flg){
                    this.$confirm('此操作将改变车辆状态，是否停用？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        var orgStr = "";
                        var seletData = this.tableSelectData;

                        for(let item of seletData){
                            orgStr += item.carUuid + ',';
                        }
                        var strLink = {carUuids: orgStr}

                        api.stopCar(strLink).then(() =>{
                            this.getTableData();
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '停用成功'
                            });
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            duration: 1500,
                            showClose: true,
                            message: '已取消停用'
                        });
                    });
                }
            },
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
            carSaveEvent(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.btnSelect == 'add'){
                            this.addSaveCarEvent();
                        }
                        if(this.btnSelect == 'edit'){
                            this.editSaveEvent();
                        }

                    } else {
                        return false;
                    }
                });
            },
            addSaveCarEvent(){
                api.saveCar(this.form).then(() =>{
                    this.dialogFormVisible = false;
                    this.getTableData();
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '添加成功'
                    });
                    this.$store.state.home.isFreshCarTree = true
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            editSaveEvent(){
                api.updateCar(this.form).then((response) =>{
                    if (response.code === 200){
                        this.dialogFormVisible = false;
                        this.getTableData();
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '修改成功'
                        });
                        this.$store.state.home.isFreshCarTree = true
                    }
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            cellClickEvent(row){
                this.dialogFormVisible = true;
                this.btnSelect = 'edit'
                this.winTitle = "修改车辆"
                var seletData = row;

                this.editRowData = row;
                this.form.carUuid = seletData.carUuid;
                this.form.carVin = seletData.carVin;
                this.form.productionDateStr = seletData.productionDate;
                this.form.carNo = seletData.carNo;
                this.form.tboxId = seletData.tboxId;
                this.form.orgUuid = seletData.orgUuid;
                this.form.actualSimNo = seletData.actualSimNo;
                this.form.carModelId = seletData.carModelId;
                this.form.iccid = seletData.iccid;
                this.form.orgName = seletData.orgName;
                this.form.factoryId = seletData.factoryId;

            },
            rowClickEvent(row){
                this.$refs.carManegetable.toggleRowSelection(row);
            },
            delectEvent(){
                var flg = this.isSelectTableData();

                if(flg){
                    this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        var orgStr = ""
                        var seletData = this.tableSelectData;

                        for(let item of seletData){
                            orgStr += item.carUuid + ',';
                        }

                        var paobj = {carUuids: orgStr}

                        api.deleteCar(paobj).then((response) =>{
                            if (response.code === 200){
                                this.dialogFormVisible = false;
                                this.getTableData();
                                this.$message({
                                    type: 'success',
                                    duration: 1500,
                                    showClose: true,
                                    message: '删除成功'
                                });
                                this.$store.state.home.isFreshCarTree = true
                            }
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                        });
                    }).catch(() => {
                        this.$message({
                            type: 'info',
                            duration: 1500,
                            showClose: true,
                            message: '已取消删除'
                        });
                    });
                }

            },
            closeWindow(formName) {
                this.dialogFormVisible = false;
                this.form.orgName = "";
                this.$refs[formName].resetFields();
                for(var p in this.form){
                    this.form[p] = "";
                }
                this.$refs.carManegetable.clearSelection()
                // $('.el-autocomplete-suggestion__wrap').hide()
                // $('.el-autocomplete-suggestion').hide()
            },
            openWindowEvent(){
                this.$nextTick(() => {
                    this.getOrgTreeData();
                    this.form.productionDateStr = this.dateFormat(new Date())
                })
            },
            closeContEditWindow(){
                this.dialogCountEditVisible = false;
            },
            orgTreeIshide(){
                this.$store.commit('setOrgTreeIshide', true);
            },
            orgTreeIsshow(){
                this.$store.commit('setOrgTreeIshide', false);
            },
            orgTreeMouseDownEvent(){
                this.dragLineShow = true;
                var menuWid = 150;
                var menuFlg = this.$store.state.home.settings.asideFolded;
                var wrapEle = document.getElementById('orgTreeBox');
                var oLine = document.getElementById('dragLine');

                if(menuFlg){
                    menuWid = 60;
                }else{
                    menuWid = 150;
                }

                if(this.dragLineShow){
                    oLine.style.display = 'inline-block';
                    document.onmousemove = function(event){
                        var e = event || window.event;
                        var scrollX = document.documentElement.scrollLeft || document.body.scrollLeft;
                        var x = e.pageX || e.clientX + scrollX;

                        this.orgTreeWidth = x - menuWid;

                        if(this.orgTreeWidth < 230){
                            this.orgTreeWidth = 230;
                        }
                        if(this.orgTreeWidth > 1192){
                            this.orgTreeWidth = 1192;
                        }
                        wrapEle.style.width = this.orgTreeWidth + 'px';
                    }

                    document.onmouseup = function() {
                        document.onmousemove = null;
                        document.onmouseup = null;

                        this.dragLineShow = false;

                        oLine.style.display = 'none';


                        // oLine.releaseCapture();
                    };
                    return false;
                }

                // oLine.setCapture();

                return false;
            },
            orgTreeMouseUpEvent(){
                this.dragLineShow = false;
            }
        }
    }

</script>

<style scoped>
    .carmanage_right{
        margin-left: 20px;
        position: relative;
        padding: 16px 35px 0px 20px;
        background: #ffffff
    }
    .el-aside {
        background-color: #ffffff;
    }
    .el-table {
        border-top: 0px;
    }
    .el-footer {
        color: #333;
        text-align: center;
    }
    .el-table-column {
        text-align: center;
    }
    ._totalPages {
        float: left;
        font-size: 14px;
    }
    ._carManageHead {
        height: auto !important;
    }
    ._carManageHead .el-form-item {
        padding: 0px;
    }
    ._carTab {
        border-top: 1px solid #ddd;
        height: 36px !important;
        padding: 0;
        background-color: #fff;
        /* margin-bottom: 12px; */
    }
    .active_car{
        background-color: #66B1FF !important;
    }
    .el-main{
        padding-top: 0px;
    }
    ._carManageHead .sear_box{
        background: #F9F9F9;
        padding-top: 0px;
        padding-bottom: 5px;
        margin-bottom: 0px;
        padding-left: 20px;
    }
    ._carManageHead .first_sear_box{
        padding-top: 10px;
    }
.carManege_sup_box{
    text-align: right;
    padding-right: 25px;
}
.sup_box_span{
    cursor: pointer;
}

.orgtree_hide_btn{
    width: 10px;
    height: 78px;
    position: absolute;
    top: 50%;
    left: -11px;
    z-index: 1000;
    margin-top: -39px;
    cursor: pointer;
}
.orgtree_show_btn{
    width: 10px;
    height: 78px;
    position: absolute;
    top: 50%;
    left: -2px;
    z-index: 1000;
    margin-top: -39px;
    cursor: pointer;
}
.drag_line_btn{
    width: 5px;
    height: 78px;
    position: absolute;
    z-index: 10001;
    left: -15px;
    cursor: e-resize;
    top: 0%;
    margin-top: -39px;
}
.drag_line{
    width: 1px;
    height: 100%;
    border-left: 1px dotted #333;
    position: absolute;
    z-index: 10002;
    left: -15px;
}
.searbox_wrap{
    border: 1px solid #dcdfe6;
    border-left: none;
    border-right: none;
}
.el-popover ul {
    padding-left: 0px;
}
.el-progress{
    margin-top: 7px;
}
.import_win_form,.countEdit_win_form{
    padding-left: 29px;
}
.searFormRow{
    padding-bottom: 16px;
    border-bottom: 1px solid #ddd
}

#carManege_ogrTree{
    width: max-content;
}

</style>

