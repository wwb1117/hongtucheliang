<template>
    <el-container id="userManageWrap" class="fun_wrap fun_content_wrap" v-bind:style="{height: wrapHeight + 'px',position: 'relative'}">
        <el-header>
            <el-row class="searFormRow">
                <el-col :span="24">
                    <div :style="{'float':'left'}">
                        <el-form :inline="true" size="small" ref="userManegeSearParam" :model="userManegeSearParam" :rules="rules">
                            <el-form-item label="登录账号" prop="loginName" verify can-be-empty VerifyLoginName>
                                <el-input class="sear_input" v-model="userManegeSearParam.loginName" placeholder="请输入..." clearable></el-input>
                            </el-form-item>
                            <el-form-item label="用户名称" prop="userName" verify can-be-empty>
                                <el-input class="sear_input" v-model="userManegeSearParam.userName" placeholder="请输入..." clearable></el-input>
                            </el-form-item>
                            <el-form-item label="角色" prop="roleName" verify can-be-empty VerifyRoleName>
                                <el-input class="sear_input" v-model="userManegeSearParam.roleName" placeholder="请输入..." clearable></el-input>
                            </el-form-item>
                        </el-form>
                    </div>
                    <div :style="{width:'100px', float:'left', marginLeft: '20px', verticalAlign: 'top'}">
                        <el-button size="mini" type="success" @click="getTableData">查询</el-button>
                    </div>
                </el-col>
            </el-row>
            <el-row class="btnGroupRow">
                <el-col :span="6">
                    <el-button size="mini" v-hasPermisson="'用户管理_删除'" @click="deleteEvent" type="danger" icon="el-icon-delete">删除</el-button>
                    <el-button size="mini" v-hasPermisson="'用户管理_重置密码'" @click="restPwdEvent" class="myBtnTypeStop" icon="el-icon-refresh">重置密码</el-button>
                    <!-- <el-button size="mini" class="myBtnTypeStop" icon="fa fa-stop-circle-o">停用</el-button> -->
                </el-col>
                <el-col :span="18" v-bind:style="{textAlign: 'right', float: 'right', position: 'relative'}">
                    <!-- <el-button size="mini" class="myBtnType_Cyan" icon="el-icon-upload2">导出</el-button> -->
                    <!-- <el-button size="mini" class="myBtnType_Cyan" icon="el-icon-upload2">修改</el-button> -->
                    <el-button size="mini" v-hasPermisson="'用户管理_新增'" @click="addEvent" type="primary" icon="el-icon-plus">新增</el-button>

                    <div :style="{position: 'absolute', right: '20px', top: '45px'}">
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
                            <i :style="{paddingLeft: '20px', paddingTop: '5px'}" class="fa fa-align-center fa-stack-1x"></i>
                        </span>
                    </div>
                </el-col>
            </el-row>
        </el-header>

        <el-main>
            <el-table ref="table" @row-click="rowClickEvent" :data="userManagesTab" :height="tableHeight" :stripe="true" size="mini" highlight-current-row :border="true" @selection-change="tableSelectChange">
                <el-table-column :show-overflow-tooltip="showTipFlg" width="34" header-align="left" prop="" type="selection" label=""></el-table-column>
                <el-table-column :show-overflow-tooltip="showTipFlg" width="52" header-align="left" prop="" type="index" label="序号"></el-table-column>
                <el-table-column v-if="isTableCellShow('loginName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="loginName" label="登录账号">
                    <template slot-scope="scope">
                        <div v-if="isEditPermisson" @click="editEvent(scope.row)" :style="{'color':'#409EFF','cursor':'pointer','margin-left':'6px'}">
                            <span class="el-icon-edit"></span>
                            <span>{{ scope.row.loginName}}</span>
                        </div>
                        <div v-if="!isEditPermisson" @click="editEvent(scope.row)" v-bind:style="{color:'#409EFF',cursor:'pointer'}">
                            <span class="fa fa-book"></span>
                            <span>{{ scope.row.loginName}}</span>
                        </div>
                    </template>
                </el-table-column>
                <el-table-column v-if="isTableCellShow('userName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="userName" label="用户名称"></el-table-column>
                <el-table-column v-if="isTableCellShow('roleName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="roleName" label="角色"></el-table-column>
                <el-table-column v-if="isTableCellShow('provinceName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="provinceName" label="所属省份"></el-table-column>
                <el-table-column v-if="isTableCellShow('cityName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="cityName" label="所属城市"> </el-table-column>
                <el-table-column v-if="isTableCellShow('orgName')" :show-overflow-tooltip="showTipFlg" :formatter="tableOrgNameFormat" header-align="left" prop="orgName" label="授权组织">
                    <!-- <template slot-scope="scope">
                        <span v-bind:style="{color:'#409EFF',cursor:'pointer'}">{{ scope.row.orgName }}</span>
                    </template> -->
                </el-table-column>
                <el-table-column v-if="isTableCellShow('state')" :show-overflow-tooltip="showTipFlg" :formatter="tableStateFormat" header-align="left" prop="state" label="账号状态"></el-table-column>
                <el-table-column v-if="isTableCellShow('updateUserName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="updateUserName" label="最后修改人"></el-table-column>
                <el-table-column v-if="isTableCellShow('createUserName')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="createUserName" label="创建账号"></el-table-column>
                <el-table-column v-if="isTableCellShow('telephone')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="telephone" label="电话"></el-table-column>
                <el-table-column v-if="isTableCellShow('email')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="email" label="邮箱"></el-table-column>
                <el-table-column v-if="isTableCellShow('address')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="address" label="地址"></el-table-column>
                <el-table-column v-if="isTableCellShow('remark')" :show-overflow-tooltip="showTipFlg" header-align="left" prop="remark" label="备注"></el-table-column>
            </el-table>
        </el-main>
        <el-footer class="footer_page">
            <el-row :gutter="20" :span="24">
                <el-col :span="20" :offset="2">
                    <el-pagination @size-change="handleSizeChange" @current-change="handleCurrentChange" :current-page="1" :page-size="pageSize" :page-sizes="[15, 20, 30, 50]" layout="total, sizes, prev, pager, next, jumper" background :total="TotalPages">
                    </el-pagination>
                </el-col>
            </el-row>
        </el-footer>
        <el-dialog :close-on-click-modal="false" v-drag="{width:680,height:372}" :title="winTitle" @open="openWinEvent" @close="closeWindow('userDialogFormList')" :visible.sync="dialogFormVisible" width="680px" class="userManageDialog">
            <el-form :model="userDialogFormList" size="small" ref="userDialogFormList" :disabled="btnSelect == 'edit' && !isEditPermisson" :rules="rules" :label-position="labelPosition" :inline="true" label-width="100px">
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="登录账号" prop="loginName" class="verify" verify VerifyLoginName :label-width="formLabelWidth">
                            <el-input v-focus="btnSelect == 'add'" @change="checkLoginName" v-model="userDialogFormList.loginName" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="用户名称" prop="userName" :label-width="formLabelWidth">
                            <el-input @change="checkUserName" v-model="userDialogFormList.userName" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="授权组织" prop="orgName" :label-width="formLabelWidth">
                            <!-- <el-popover
                                ref="focusorgtree"
                                placement="bottom-start"
                                width="200"
                                trigger="click">
                                <el-row>
                                    <EasyScrollbar :barOption="barOpt">
                                        <div v-bind:style="{maxHeight: '250px'}">
                                            <ul class="ztree" ref="user_orgTree" v-bind:style="{display: 'table'}" id="user_orgTree"></ul>
                                        </div>
                                    </EasyScrollbar>
                                </el-row>
                            </el-popover> -->
                            <el-input v-model="userDialogFormList.orgName" readonly="readonly" @focus="userCarPerMissionWin = true" auto-complete="off" placeholder="请选择..." ></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="角色" prop="roleId" :label-width="formLabelWidth">
                            <el-select v-model="userDialogFormList.roleId" placeholder="请选择...">
                                <el-option v-for="item in roleList" :label="item.name" :key="item.roleId" :value="item.roleId"></el-option>
                            </el-select>
                            <el-popover
                                ref="popover1"
                                placement="bottom-start"
                                title="角色预览"
                                width="200"
                                @show ="roleTreeShow"
                                trigger="click"
                            >
                                <EasyScrollbar :barOption="barOpt">
                                    <div v-bind:style="{maxHeight: '250px'}">
                                        <ul class="ztree" ref="role_pre_Tree" id="role_pre_Tree"></ul>
                                    </div>
                                </EasyScrollbar>
                            </el-popover>
                            <i class="el-icon-view" v-show="userDialogFormList.roleId" v-popover:popover1 v-bind:style="{cursor: 'pointer'}"></i>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="所属省份" prop="provinceId" :label-width="formLabelWidth">
                            <el-select v-model="userDialogFormList.provinceId" @change="provinceChange" placeholder="请选择..." >
                                <el-option v-for="item in provinceList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                            </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="状态" prop="state" :label-width="formLabelWidth">
                            <el-radio-group v-model="userDialogFormList.state">
                                <el-radio label="1">开</el-radio>
                                <el-radio label="0">关</el-radio>
                            </el-radio-group>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="所属城市" prop="cityId" :label-width="formLabelWidth">
                        <el-select v-model="userDialogFormList.cityId" placeholder="请选择...">
                            <el-option v-for="item in cityList" :label="item.name" :key="item.id" :value="item.id"></el-option>
                        </el-select>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="邮箱" prop="email" verify can-be-empty VerifyEmail :label-width="formLabelWidth">
                            <el-input v-model="userDialogFormList.email" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="24">
                        <el-form-item label="电话" prop="telephone" verify can-be-empty VerifyPhone :label-width="formLabelWidth">
                            <el-input v-model="userDialogFormList.telephone" placeholder="请输入..." class="user_input_width" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="24">
                        <el-form-item label="地址" prop="address" :label-width="formLabelWidth">
                            <el-input v-model="userDialogFormList.address" placeholder="请输入..." class="user_input_width" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="24">
                        <el-form-item label="备注" prop="remark" :label-width="formLabelWidth">
                            <el-input  type="textarea" v-model="userDialogFormList.remark" placeholder="请输入..." class="user_input_width" clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="small" @click="closeWindow('userDialogFormList')">取 消</el-button>
                <el-button size="small" type="success" :disabled="btnSelect == 'edit' && !isEditPermisson" @click="saveEvent('userDialogFormList')">保 存</el-button>
            </div>
        </el-dialog>

        <el-dialog :close-on-click-modal="false" v-drag="{width:680,height:372}" title="车辆权限" @open="userCarTreeWinOpen" :visible.sync="userCarPerMissionWin" id="userCarPerMissionWin" width="680px">
            <el-row class="rolePerssionWrap" v-bind:style="{borderBottom: '1px solid #ddd'}">
                <el-col :span="12" v-bind:style="{borderRight: '1px solid #ddd'}">
                    <el-row class="win_banner">
                        所有车辆
                    </el-row>
                    <el-row>
                        <EasyScrollbar :barOption="barOpt">
                            <div class="user_car_tree_wrap">
                                <ul class="ztree" v-bind:style="{display: 'table'}" id="user_left_orgTree"></ul>
                            </div>
                        </EasyScrollbar>
                    </el-row>
                </el-col>
                <el-col :span="12">
                    <el-row class="win_banner">
                        授权车辆
                    </el-row>
                    <el-row>
                        <EasyScrollbar :barOption="barOpt">
                            <div class="user_car_tree_wrap">
                                <ul class="ztree" v-bind:style="{display: 'table'}" id="user_right_orgTree"></ul>
                            </div>
                        </EasyScrollbar>
                    </el-row>
                </el-col>
            </el-row>
            <div slot="footer" class="dialog-footer">
                <el-button @click="userCarPerMissClose" size="small">关 闭</el-button>
                <el-button type="success" @click="userCarPerMissionWinSaveEvent" size="small">保存</el-button>
            </div>
     </el-dialog>
    </el-container>
</template>

<script>
    import api from 'api/userManege'
    import cityapi from 'api/cityInfo'
    import perapi from 'api/permissionManege'
    import roleapi from 'api/role'
    import axios from 'axios'
    const tableCellKeyVal = {
        "loginName": '登录账号',
        "userName": "用户名称",
        "roleName": "角色",
        "provinceName": "所属省份",
        "cityName": "所属城市",
        "orgName": "授权组织",
        "state": "账号状态",
        "updateUserName": "最后修改人",
        "createUserName": "创建账号",
        "telephone": "电话",
        "email": "邮箱",
        "address": "地址",
        "remark": "备注"
    }

    export default {
        name: 'userManage',
        data() {
            return {
                wrapHeight: 802, //功能模块的高度
                winTitle: '',
                isEditPermisson: this.GLOBAL.isHasPermisson('用户管理_修改'),
                userCarPerMissionWin: false,
                lefttreeInitFlg: true,
                righttreeInitFlg: true,
                checkAll: true,
                checkList: [],
                tableCellList: Object.keys(tableCellKeyVal),
                tableCellKeyVal: tableCellKeyVal,
                isIndeterminate: false,
                barOpt: {
                    barWidth: 7,
                    zIndex: 1083,
                    horizrailenabled: true
                },
                userManegeSearParam: {
                    loginName: '',
                    userName: '',
                    roleName: ''
                },

                TotalPages: 300, //表格总页数
                currentPage: 1, //分页当前页
                pageSize: 15,

                btnSelect: '',
                userId: "",
                isLook: false,
                dialogFormVisible: false,
                formLabelWidth: '90px', //模态框lable宽度
                userManagesTab: [],
                orgTreeBaseData: [],
                tableSelectData: [],
                roleTreeData: [],
                provinceList: [],
                cityList: [],
                roleList: [],
                prenodeArr: [],
                userDialogFormList: {
                    userOrg: [],
                    userCar: [],
                    createUserName: "",
                    updateUserName: "",
                    loginName: '',
                    userName: '',
                    userId: '',
                    provinceName: '',
                    provinceId: '',
                    roleId: '',
                    roleName: '',
                    cityName: '',
                    cityId: '',
                    state: '1',
                    orgName: '',
                    orgId: '',
                    email: '',
                    telephone: '',
                    address: '',
                    remark: ''
                },
                editProvinceId: '',
                editCityId: '',
                rightTreeRootData: [],
                leftTreeRootData: [{
                    "checked":"false",
                    "children":[],
                    "icon":"",
                    "iconClose":"",
                    "iconOpen":"",
                    "id":"-1",
                    "tId":"-1",
                    "isParent":"true",
                    "name":"车辆监控中心",
                    "open":"false",
                    "parentTId":"0",
                    "type":0
                }],
                treeSeting: {
                    check: {
                        enable: true,
                        chkStyle: "checkbox"
                    },
                    callback: {
                        onClick: this.leftTreeOnclick,
                        onCheck: this.newLeftTreeOnCheck,
                        onExpand: this.leftOnExpand,
                        onAsyncSuccess: this.leftSysSuccesCB
                    },
                    async: {
                        enable: true,
                        url: axios.defaults.baseURL + '/tree/org',
                        type: "get",
                        autoParam: ["id=orgId"],
                        dataFilter: this.leftTreeFiltData,
                        otherParam: ["left", "true"]
                    }
                },
                treeRightSeting: {
                    async: {
                        enable: true,
                        url: axios.defaults.baseURL + '/tree/org',
                        type: "get",
                        otherParam: ["left", "false"],
                        dataFilter: this.rightTreeFiltData,
                        autoParam: ["id=orgId"]
                    },
                    callback: {
                        onClick: this.rightTreeOnclick,
                        onExpand: this.rightOnExpand
                    },
                    data: {
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: 0
                        }
                    }
                },
                roleTreeseting: {},
                labelPosition: 'right',
                tableHeight: '500',
                showTipFlg: true,
                rules: {
                    loginName:[
                        { required: true, message: '请输入登录账号', trigger: 'blur'},
                        { min: 4, max: 10, message: '长度在4到10位字符', trigger: 'blur'
                        }],
                    userName:[
                        { required: true, message: '请输入用户名称', trigger: 'blur'},
                        { min: 1, max: 10, message: '长度在 1 到 10 个字符', trigger: 'blur'
                        }],
                    orgId:[
                        {required: true, message: '请选择所属组织', trigger: 'change'}
                    ],
                    roleId:[
                        {required: true, message: '请选择角色', trigger: 'change'}
                    ],
                    address:[{trigger: 'blur',  max: 100}],
                    remark:[{trigger: 'blur',  max: 100}],
                    orgName:[
                        {required: true, message: '请选择授权组织', trigger: 'change'}
                    ]
                }
            }
        },
        created() {
            this.wrapHeight = this.$store.state.home.settings.deviceHeight - 22;   //margin-top 12px
            this.tableHeight = this.wrapHeight - 201;

            this.GLOBAL.getTableCellSetList('userManage', this.tableCellList).then((res) => {
                this.checkList = res
            })

            this.getTableData()

            this.getProvinceList()

        },
        methods: {
            tableCellCloseEvent(){
                this.GLOBAL.tableCellCloseEvent('userManage', this.tableCellKeyVal, this.checkList)
            },
            isTableCellShow(val){
                if(this.checkList.indexOf(val) > -1){
                    return true
                }
                return false
            },
            handleCheckAllChange(val){
                this.checkList = val ? this.tableCellList : [];
                this.isIndeterminate = false;
                var that = this

                window.setTimeout(function(){
                    $('#userManageWrap .el-table__body-wrapper').height(that.tableHeight - 40)
                }, 200)
            },
            handleCheckGroupChange(value){
                let checkedCount = value.length;

                this.checkAll = checkedCount === this.tableCellList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableCellList.length;
                var that = this

                window.setTimeout(function(){
                    $('#userManageWrap .el-table__body-wrapper').height(that.tableHeight - 40)
                }, 200)
            },
            rightSycDataUrl(){
                if(this.firstInitRightTree){
                    return ""
                }else{
                    return axios.defaults.baseURL + '/tree/org'
                }
            },
            editInitRightData(){
                var obj = {
                    orgId: -1,
                    left: false,
                    targetUser: this.userId
                }

                api.getOrgTreeData(obj).then((response) =>{
                    this.rightTreeRootData = response
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            rightOnExpand(event, treeId, treeNode){
                var leftTree = $.fn.zTree.getZTreeObj("user_left_orgTree")
                var leftNode = leftTree.getNodeByParam('id', treeNode.id, null)

                if(leftNode){
                    leftTree.expandNode(leftNode, true)
                }
            },
            leftOnExpand(event, treeId, treeNode){
                var rightTree = $.fn.zTree.getZTreeObj("user_right_orgTree")
                var rightNode = rightTree.getNodeByParam('id', treeNode.id, null)

                if(rightNode){
                    rightTree.expandNode(rightNode, true)
                }
            },
            isPreNodeInRight(node){ //祖先元素是否在右侧树
                this.prenodeArr = []
                this.prenodeArr.push(node)
                this.getPreNodeArrEvent(node)
                var rightTree = $.fn.zTree.getZTreeObj("user_right_orgTree")

                for(var item of this.prenodeArr){
                    var flg = rightTree.getNodeByParam("id", item.id, null)

                    if(flg !== null){
                        return true
                    }
                }

                return false

            },
            getPreNodeArrEvent(node){
                var pnode = node.getParentNode()

                if(pnode && pnode.id != '-1'){
                    this.prenodeArr.push(pnode)
                    this.getPreNodeArrEvent(pnode)
                }
            },
            userCarPerMissionWinSaveEvent(){
                this.userDialogFormList.userOrg = []
                this.userDialogFormList.userCar = []
                var rightTree = $.fn.zTree.getZTreeObj("user_right_orgTree")
                var leftTree = $.fn.zTree.getZTreeObj("user_left_orgTree")
                // var allNodes = rightTree.transformToArray(rightTree.getNodes())
                var allNodes = rightTree.getNodes()
                // var rootflg = true

                for(var item of allNodes){
                    if(item.pId == 0){
                        var lnode = leftTree.getNodeByParam("id", item.id, null)
                        var lpnode = lnode.getParentNode()

                        if(item.isParent){  //组织
                            var userOrg = {
                                orgUuid: item.id,
                                pId: lpnode ? lpnode.id : "-1",
                                orgCheckAll: 1
                                // isRoot: rootflg
                            }

                            this.userDialogFormList.userOrg.push(userOrg)
                        }else{  //车
                            var userCar = {
                                carUuid: item.id,
                                orgUuid: lpnode ? lpnode.id : "-1"
                            }

                            this.userDialogFormList.userCar.push(userCar)
                        }
                    }
                }
                if(this.userDialogFormList.userOrg.length == 0 && this.userDialogFormList.userCar.length == 0){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '请选择授权组织'
                    });
                    this.userDialogFormList.orgName = ""
                }else{
                    this.userDialogFormList.orgName = '已选择'
                    this.userCarPerMissionWin = false
                }
            },
            tableStateFormat(row, column, cellValue){
                if(cellValue == 1){
                    return "开"
                }
                return "关"
            },
            tableOrgNameFormat(row, column, cellValue){
                if(cellValue == ""){
                    return "车辆监控中心"
                }
                return cellValue
            },
            roleTreeShow(){
                this.getRoleTreeData(this.userDialogFormList.roleId)
            },
            getRoleTreeData(roleId){
                perapi.getEditTreeData(roleId).then((response) =>{
                    this.roleTreeData = response.data;
                    var roletree = $.fn.zTree.init($("#role_pre_Tree"), this.roleTreeseting, this.roleTreeData);

                    roletree.expandAll(true)
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });

            },
            checkLoginName(){
                api.checkLoginName(this.userDialogFormList.loginName).then((response) =>{
                    if(response.data){
                        this.$message({
                            type: 'error',
                            duration: 1500,
                            showClose: true,
                            message: '登录账号重复'
                        });
                        this.userDialogFormList.loginName = ""
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
            checkUserName(){
                api.checkUserName(this.userDialogFormList.userName).then((response) =>{
                    if(response.data){
                        this.$message({
                            type: 'error',
                            duration: 1500,
                            showClose: true,
                            message: '用户名称重复'
                        });
                        this.userDialogFormList.userName = ""
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
            provinceChange(val){
                cityapi.getCityFormPro(val).then((response) =>{
                    this.cityList = response.data
                    this.userDialogFormList.cityId = ""
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            getRoleList(){
                var obj = {
                    pageNum: 1,
                    pageSize: 0
                }

                roleapi.getRoleList(obj).then((response) =>{
                    this.roleList = response.data.list
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            getProvinceList(){
                cityapi.getProvincesList().then((response) =>{
                    this.provinceList = response.data
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            getCityList(){
                cityapi.getCityList().then((response) =>{
                    this.cityList = response.data
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            openWinEvent(){
                this.$nextTick(() => {
                    this.getRoleList()
                    this.lefttreeInitFlg = true
                    this.righttreeInitFlg = true
                    if(this.btnSelect == 'add'){
                        this.userDialogFormList.state = "1"
                        this.getCityList()
                    }
                    if(this.btnSelect == 'edit'){
                        this.editInitRightData()
                        if(this.editProvinceId){
                            this.provinceChange(this.editProvinceId)
                        }else{
                            this.getCityList()
                        }
                        var that = this

                        window.setTimeout(function(){
                            if(that.editCityId){
                                that.userDialogFormList.cityId = String(that.editCityId)
                            }
                        }, 300)

                    }
                })
            },
            userCarPerMissClose(){
                this.userCarPerMissionWin = false

            },
            userCarTreeWinOpen(){
                this.$nextTick(() => {
                    if(this.btnSelect == 'add'){
                        if(this.lefttreeInitFlg){
                            this.treeSeting.async.otherParam = ["left", "true"]
                            this.treeRightSeting.async.otherParam = ["left", "false"]

                            $.fn.zTree.init($("#user_left_orgTree"), this.treeSeting, this.leftTreeRootData);

                            // $.fn.zTree.destroy("user_right_orgTree");

                            $.fn.zTree.init($("#user_right_orgTree"), this.treeRightSeting, []);
                        }
                        this.lefttreeInitFlg = false
                    }
                    if(this.btnSelect == 'edit'){
                        if(this.righttreeInitFlg){
                            this.treeSeting.async.otherParam = ["left", "true", "targetUser", this.userId]
                            this.treeRightSeting.async.otherParam = ["left", "false", "targetUser", this.userId]

                            $.fn.zTree.init($("#user_left_orgTree"), this.treeSeting, this.leftTreeRootData);
                            $.fn.zTree.init($("#user_right_orgTree"), this.treeRightSeting, this.rightTreeRootData);
                        }
                        this.righttreeInitFlg = false

                        // this.treeOncheck()
                    }

                    var leftTree = $.fn.zTree.getZTreeObj("user_left_orgTree");
                    var leftNode = leftTree.getNodes()

                    leftTree.expandNode(leftNode[0], true)

                })
            },
            rightTreeOnclick(ev, treeid, node){
                var leftTree = $.fn.zTree.getZTreeObj("user_left_orgTree");
                var lnode = leftTree.getNodeByParam("id", node.id, null);

                leftTree.cancelSelectedNode()
                if(lnode){
                    leftTree.selectNode(lnode, true)
                }
            },
            leftTreeOnclick(ev, treeid, node){
                var rightTree = $.fn.zTree.getZTreeObj("user_right_orgTree");
                var rnode = rightTree.getNodeByParam("id", node.id, null);

                rightTree.cancelSelectedNode()
                if(rnode){
                    rightTree.selectNode(rnode, true)
                }
            },
            leftNodeFilter(node){
                var check = node.getCheckStatus().checked
                var half = node.getCheckStatus().half

                if(check && !half){
                    return true
                }
            },
            leftSysSuccesCB(event, treeId, treeNode){
                // console.log(treeNode)
                if(treeNode.children.length > 0){
                    for(var item of treeNode.children){
                        this.leftFiltDataCallBack(item)
                    }
                }
            },
            leftFiltDataCallBack(node){
                var leftTree = $.fn.zTree.getZTreeObj("user_left_orgTree");
                // console.log(node)

                if(node.checkState == 1){
                    leftTree.expandNode(node, true)
                }
            },
            leftTreeFiltData(treeId, parentNode, responseData){
                var resArr = []

                if(!responseData.code){
                    var pcheck = parentNode.getCheckStatus().checked
                    var phalf = parentNode.getCheckStatus().half

                    if(this.btnSelect == 'add'){
                        if(parentNode.checked){
                            for(var item of responseData){
                                item.checked = true
                            }
                        }
                        resArr = responseData
                    }else{ //修改
                        if(pcheck && !phalf){
                            if(parentNode.checked){
                                for(var item1 of responseData){
                                    item1.checked = true
                                }
                            }
                        }
                        resArr = responseData
                    }
                }

                return resArr

            },
            rightTreeFiltData(treeId, parentNode, responseData){
                var restArr = []

                if(!responseData.code){

                    for(var item1 of responseData){
                        var flg = true

                        for(var item2 of restArr){
                            if(item2.id === item1.id){
                                flg = false
                                break
                            }
                        }
                        if(flg){

                            var obj = {}

                            obj.id = item1.id
                            obj.name = item1.name
                            obj.pId = item1.parentTId
                            obj.iconSkin = item1.iconSkin
                            obj.isParent = item1.isParent

                            restArr.push(obj)
                        }
                    }
                }
                return restArr
            },
            newLeftTreeOnCheck(){
                var leftTree = $.fn.zTree.getZTreeObj("user_left_orgTree");
                var checkNodeArr = leftTree.getNodesByFilter(this.leftNodeFilter)
                var restArr = []

                for(var item1 of checkNodeArr){
                    var flg = true

                    for(var item2 of restArr){
                        if(item2.id === item1.id){
                            flg = false
                            break
                        }
                    }
                    if(flg){
                        var parentnode = item1.getParentNode()
                        var obj = {}

                        if(item1.id != -1){ //虚拟根节点不移动到右边树
                            obj.id = item1.id
                            obj.name = item1.name
                            obj.iconSkin = item1.iconSkin
                            obj.isParent = item1.isParent
                            if(parentnode){
                                obj.pId = parentnode.id
                            }else{
                                obj.pId = 0
                            }
                            restArr.push(obj)
                        }
                    }
                }
                // restArr.push(this.rightTreeRootData[0])
                $.fn.zTree.init($("#user_right_orgTree"), this.treeRightSeting, restArr);
            },
            tableSelectChange(val){
                this.tableSelectData = val;
            },
            rowClickEvent(row){
                this.$refs.table.toggleRowSelection(row);
            },
            getTableData(){
                var data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    loginName: this.userManegeSearParam.loginName,
                    userName: this.userManegeSearParam.userName,
                    role: this.userManegeSearParam.roleName
                }

                api.getUserList(data).then((response) =>{
                    this.userManagesTab = response.data.rows;
                    this.TotalPages = response.data.total;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            handleSizeChange(val) {
                this.pageSize = val;
                this.getTableData();
            },
            handleCurrentChange(val) {
                this.currentPage = val;
                this.getTableData();
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
                    this.btnSelect = "";
                    return false;
                }
                return true;
            },
            btnChange(val) {
                this.isLook = false;
                if(val == 'add'){
                    this.winTitle = "新增用户"
                    this.dialogFormVisible = true;
                }
                if(val == 'edit'){
                    this.editEvent()
                }
                if(val == 'delete'){
                    this.deleteEvent()
                }
                if(val == 'look'){

                    this.takeLookEvent()
                }
                if(val == 'restpwd'){
                    this.restPwdEvent()
                }
            },
            addEvent(){
                this.btnSelect = "add"
                this.winTitle = "新增用户"
                this.dialogFormVisible = true;
            },
            takeLookEvent(){
                var flg = this.isSelectTableData();

                if(flg){
                    var seletData = this.tableSelectData[this.tableSelectData.length - 1];

                    this.winTitle = "查看用户"
                    this.isLook = true;

                    this.fillFormDataEvent(seletData)

                    this.dialogFormVisible = true;
                }
            },
            restPwdEvent(){
                var flg = this.isSelectTableData();

                if(flg){

                    this.$confirm('是否重置密码为初始化密码，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        var seletData = this.tableSelectData[this.tableSelectData.length - 1];
                        var userId = seletData.userId
                        var data = {
                            userId: userId,
                            pwd: '123456'
                        }

                        api.editUserPwd(data).then(() =>{
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '重置密码成功'
                            });
                            this.btnSelect = ""
                        }).catch(err =>{
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: err.message
                            });
                            this.btnSelect = ""
                        });
                    }).catch(() => {
                        this.btnSelect = "";
                        this.$message({
                            type: 'info',
                            duration: 1500,
                            showClose: true,
                            message: '已取消重置'
                        });
                    });
                }
            },
            fillFormDataEvent(seletData){

                for(var kk in this.userDialogFormList){
                    this.userDialogFormList[kk] = seletData[kk]
                }

                this.editProvinceId = seletData.provinceId
                this.editCityId = seletData.cityId
                if(this.userDialogFormList.orgName == ""){
                    this.userDialogFormList.orgName = "车辆监控中心"
                }

                this.userDialogFormList.state = String(this.userDialogFormList.state)
            },
            getUserOrgCarInfo(){
                api.getUserOrgCarInfo(this.userId).then((response) =>{
                    this.userDialogFormList.userOrg = response.data.userOrg
                    this.userDialogFormList.userCar = response.data.userCar
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            editEvent(seletData){
                // var flg = this.isSelectTableData();

                // if(flg){
                this.btnSelect = "edit"
                this.userId = seletData.userId
                this.winTitle = "修改用户信息"

                this.getUserOrgCarInfo()

                this.fillFormDataEvent(seletData)
                this.dialogFormVisible = true;

                // }
            },
            saveEvent(formName){
                this.$refs[formName].validate((valid) => {
                    if (valid) {
                        if(this.btnSelect == 'add'){
                            this.addSaveEvent();
                        }
                        if(this.btnSelect == 'edit'){
                            this.editSaveEvent();
                        }

                    } else {
                        return false;
                    }
                });
            },
            addSaveEvent(){

                var val = JSON.stringify(this.userDialogFormList)
                var obj = {
                    user: val
                }

                api.saveAddUser(obj).then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '新增成功'
                    });
                    this.btnSelect = ""
                    this.dialogFormVisible = false;
                    this.getTableData();
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                    this.btnSelect = ""
                });
            },
            editSaveEvent(){
                var val = JSON.stringify(this.userDialogFormList)
                var obj = {
                    user: val
                }

                api.updateUser(obj).then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '修改成功'
                    });
                    this.btnSelect = ""
                    this.dialogFormVisible = false;
                    this.getTableData();
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                    this.btnSelect = ""
                });
            },
            deleteEvent(){
                var flg = this.isSelectTableData();

                if(flg){
                    this.$confirm('此操作将永久删除此用户，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        this.btnSelect = "";
                        var ids = []
                        var seletData = this.tableSelectData;

                        for(let item of seletData){
                            ids.push(item.userId)
                        }

                        api.deleteUser({"ids": JSON.stringify(ids)}).then(() =>{
                            this.btnSelect = "";
                            this.dialogFormVisible = false;
                            this.getTableData();
                            this.$message({
                                type: 'success',
                                duration: 1500,
                                showClose: true,
                                message: '删除成功'
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
                        this.btnSelect = "";
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
                this.btnSelect = "";
                this.$refs[formName].resetFields();
                for(var p in this.userDialogFormList){
                    this.userDialogFormList[p] = "";
                }
                this.$refs.table.clearSelection();
            }

        }
    }
</script>

<style scoped>
    .user_manage {
        margin: 12px 17px 0px 18px;
        border: solid 1px #ddd;
        background-color: #fff;
    }
    .user_form_inline{
        margin-top: -12px;
        margin-left: 14px;
    }
    .el-table {
        border-top: 0px;
        border-bottom: 0px;
    }
    .el-footer {
        color: #333;
        text-align: center;
    }
    .totalPages {
        float: left;
        font-size: 14px;
    }
    .el-pagination {
        margin-top: 14px;
    }
   .user_input_width{
       width: 491px !important;
   }
   .el-header{
       padding: 0px;
   }
   .padding_set{
       padding-left: 20px;
   }

.searbox_wrap{
    border: 1px solid #dcdfe6;
    border-left: none;
    border-right: none;
    margin-top: 20px;
}
.sear_box{
        background: #F9F9F9;
        padding-top: 0px;
        padding-bottom: 0px;
        margin-bottom: 0px;
    }
.first_sear_box{
        padding-top: 10px;
    }
.win_banner{
        text-align: center;
        background: #F7F7F5;
        height: 32px;
        line-height: 32px;
        font-weight: 700;
        /* box-shadow:0px 2px 5px #ddd; */
    }
.user_car_tree_wrap{
    height: 410px;
    width: 210px;
}
</style>

