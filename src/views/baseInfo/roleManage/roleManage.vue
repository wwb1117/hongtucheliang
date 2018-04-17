<template>
  <el-container class="fun_wrap fun_content_wrap" v-bind:style="{height: wrapHeight + 'px' }">
      <el-header>
        <el-row class="searFormRow">
            <el-col :span="12">
                <el-form :inline="true" ref="roleManageSearParam" :model="roleManageSearParam" size="small" :rules="rules">
                    <el-form-item v-bind:style="{paddingLeft: '0px'}" label="角色" prop="roleName" verify can-be-empty VerifyRoleName>
                        <el-input class="sear_input" v-model="roleManageSearParam.roleName" placeholder="请输入..." clearable></el-input>
                        <el-input v-bind:style="{display:'none'}"></el-input>
                    </el-form-item>
                    <el-form-item :style="{paddingLeft: '0px',marginLeft: '20px'}">
                        <el-button class="sear_btn" type="success" size="mini"  @click="getTableData">查询</el-button>
                    </el-form-item>
                </el-form>
            </el-col>
        </el-row>
        <el-row class="btnGroupRow">
            <el-col :span="6">
                <el-button size="mini" v-hasPermisson="'角色管理_删除'" @click="deleteEvent" type="danger" icon="el-icon-delete">删除</el-button>
            </el-col>
            <el-col :span="18" v-bind:style="{textAlign: 'right', float: 'right'}">
                <!-- <el-button size="mini" class="myBtnType_Cyan" icon="el-icon-upload2" @click="editEvent">修改</el-button> -->
                <el-button size="mini" v-hasPermisson="'角色管理_新增'" @click="addEvent"  type="primary" icon="el-icon-plus">新增</el-button>
            </el-col>
        </el-row>
      </el-header>

      <el-main>
        <el-table ref="table" @row-click="rowClickEvent" @selection-change="selectTableChange" :data="roleListData" :height="tableHeight" tooltip-effect="dark" :stripe="true" size="mini" highlight-current-row :border="true">
            <el-table-column width="34" header-align="left" type="selection" label=""></el-table-column>
            <el-table-column width="52" header-align="left" type="index" label="序号"></el-table-column>
            <el-table-column header-align="left" prop="name" label="角色名称">
                <template slot-scope="scope">
                    <div v-if="isEditPermisson" @click="editEvent(scope.row)" :style="{'color':'#409EFF','cursor':'pointer','margin-right':'6px'}">
                        <span class="el-icon-edit"></span>
                        <span >{{ scope.row.name }}</span>
                    </div>
                    <div v-if="!isEditPermisson" @click="editEvent(scope.row)" v-bind:style="{color:'#409EFF',cursor:'pointer'}">
                        <span class="fa fa-book"></span>
                        <span >{{ scope.row.name }}</span>
                    </div>
                </template>
            </el-table-column>
            <el-table-column header-align="left" prop="createUserName" label="创建人"></el-table-column>
            <el-table-column header-align="left" prop="createTime" label="创建时间"></el-table-column>

        </el-table>
      </el-main>

      <el-footer class="footer_page">
        <el-row :span="24">
            <el-col :span="20" :offset="2">
                <el-pagination @size-change="roleSizeChange" @current-change="roleCurrentChange" :current-page="1" :page-sizes="[15, 20, 30, 50]" :page-size="15" layout="total, sizes, prev, pager, next, jumper" background :total="TotalPages">
                </el-pagination>
            </el-col>
        </el-row>
      </el-footer>

     <el-dialog :close-on-click-modal="false" v-drag="{width:740,height:372}" title="权限设置" id="rolePerssWin" @open="openWinEvent" @close="closeWindow('form')" :visible.sync="dialogFormVisible" width="470px">
        <el-row class="role_win_input_wrap">
            <el-form :model="form" ref="form" :rules="rules" :disabled="btnSelect == 'edit' && !isEditPermisson" label-width="50px" size="mini">
                <el-form-item prop="roleName" verify VerifyRoleName label="角色">
                    <el-input v-focus="btnSelect == 'add'" v-model="form.roleName" @keyup.native="checkRoleName" placeholder="请输入..." clearable></el-input>
                    <el-input v-bind:style="{display:'none'}"></el-input>
                </el-form-item>
            </el-form>
        </el-row>
        <el-row class="rolePerssionWrap">
            <el-col :span="12">
                <el-row class="win_banner">
                    所有菜单
                </el-row>
                <el-row>
                    <EasyScrollbar :barOption="barOpt">
                        <div class="role_win_tree_wrap">
                            <ul class="ztree" ref="roleManege_leftTree" id="roleManege_leftTree"></ul>
                        </div>
                    </EasyScrollbar>
                </el-row>
            </el-col>
            <el-col :span="12">
                <el-row class="win_banner">
                    授权功能
                </el-row>
                <el-row>
                    <EasyScrollbar :barOption="barOpt">
                        <div class="role_win_tree_wrap">
                            <ul class="ztree" id="roleManege_rightTree"></ul>
                        </div>
                    </EasyScrollbar>
                </el-row>
            </el-col>
        </el-row>
        <div slot="footer" class="dialog-footer">
            <el-button size="small" @click="closeWindow('form')">取 消</el-button>
            <el-button type="success" :disabled="btnSelect == 'edit' && !isEditPermisson" size="small" @click="roleSaveEvent('form')">保存</el-button>
        </div>
     </el-dialog>


  </el-container>
</template>

<script>
    import api from 'api/role'
    import perapi from 'api/permissionManege'
    export default {
        name:'roleManage',
        data() {
            return{
                wrapHeight: 802,
                tableHeight: 500,
                selectTableData: [],
                editRoleId: null,
                isEditPermisson: this.GLOBAL.isHasPermisson('角色管理_修改'),
                roleManageSearParam:{
                    roleName:''
                },
                form: {
                    roleName: ""
                },
                rules: {},
                barOpt: {
                    barWidth: 7,
                    zIndex: 1083
                },
                roleListData:[],
                TotalPages: 300, //表格总页数
                currentPage: 1, //分页当前页
                pageSize: 15,   //单前页行数
                btnSelect:'',
                dialogFormVisible:false,
                PerssTreeData: [],
                editTreeData: [],
                rightTreeData: [],
                rightRootNode: {},
                rightLeve1: [],
                rightLeve0: [],
                disableLevel0: [],
                disableLevel1: [],
                disableLevel2: [],
                rightLeve2: [],
                treeSeting: {
                    check: {
                        enable: true,
                        chkStyle: "checkbox"
                    },
                    callback: {
                        onCheck: this.leftTreeOncheck,
                        onExpand: this.leftOnExpandEvent,
                        onCollapse: this.leftOnCollapseEvent,
                        onClick: this.leftTreeOnclick
                    },
                    data: {
                        key: {
                            checked: "check"
                        }
                    },
                    view: {
                        showLine: true
                    }
                },
                rightTreeSeting: {
                    callback: {
                        onClick: this.rightTreeOnclick,
                        onCollapse: this.rightOnCollapseEvent,
                        onExpand: this.rightOnExpandEvent
                    }
                }

            }
        },
        created() {
            this.wrapHeight = this.$store.state.home.settings.deviceHeight - 22;   //margin-top 12px
            this.tableHeight = this.wrapHeight - 201;
            this.getTableData()
            this.getAddTreeData()
        },
        methods:{
            leftOnExpandEvent(event, treeId, treeNode){
                var leftTree = $.fn.zTree.getZTreeObj("roleManege_leftTree");
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");
                var rnode = rightTree.getNodeByParam("privisId", treeNode.privisId, null);

                if(rnode){
                    rightTree.expandNode(rnode, true)
                    leftTree.cancelSelectedNode()
                    leftTree.selectNode(treeNode, true)
                    rightTree.cancelSelectedNode()
                    rightTree.selectNode(rnode, true)

                }
            },
            rightOnExpandEvent(event, treeId, treeNode){
                var leftTree = $.fn.zTree.getZTreeObj("roleManege_leftTree");
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");
                var lnode = leftTree.getNodeByParam("privisId", treeNode.privisId, null);

                if(lnode){
                    leftTree.expandNode(lnode, true)
                    leftTree.cancelSelectedNode()
                    leftTree.selectNode(lnode, true)
                    rightTree.cancelSelectedNode()
                    rightTree.selectNode(treeNode, true)

                }
            },
            leftOnCollapseEvent(event, treeId, treeNode){
                var leftTree = $.fn.zTree.getZTreeObj("roleManege_leftTree");
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");
                var rnode = rightTree.getNodeByParam("privisId", treeNode.privisId, null);

                if(rnode){
                    rightTree.expandNode(rnode, false)
                    leftTree.cancelSelectedNode()
                    leftTree.selectNode(treeNode, true)
                    rightTree.cancelSelectedNode()
                    rightTree.selectNode(rnode, true)

                }
            },
            rightOnCollapseEvent(event, treeId, treeNode){
                var leftTree = $.fn.zTree.getZTreeObj("roleManege_leftTree");
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");
                var lnode = leftTree.getNodeByParam("privisId", treeNode.privisId, null);

                if(lnode){
                    leftTree.expandNode(lnode, false)
                    leftTree.cancelSelectedNode()
                    leftTree.selectNode(lnode, true)
                    rightTree.cancelSelectedNode()
                    rightTree.selectNode(treeNode, true)

                }
            },
            rightTreeOnclick(event, treeId, treeNode){
                var leftTree = $.fn.zTree.getZTreeObj("roleManege_leftTree");
                var lnode = leftTree.getNodeByParam("privisId", treeNode.privisId, null);

                leftTree.cancelSelectedNode()
                if(lnode){
                    leftTree.selectNode(lnode, true)
                }
            },
            leftTreeOnclick(event, treeId, treeNode){
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");
                var lnode = rightTree.getNodeByParam("privisId", treeNode.privisId, null);

                rightTree.cancelSelectedNode()
                if(lnode){
                    rightTree.selectNode(lnode, true)
                }
            },
            checkRoleName(){
                if(this.form.roleName != ""){
                    var obj = {
                        field: 'name',
                        name: this.form.roleName
                    }

                    api.checkRoleName(obj).then((response) =>{
                        if(response.data != ""){
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: response.data
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
                }
            },
            selectTableChange(val){
                this.selectTableData = val
            },
            isSelectTableData(){
                var seletLeng = this.selectTableData.length;

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
            editEvent(seletData){
                this.btnSelect = "edit"
                this.editRoleId = seletData.roleId
                this.form.roleName = seletData.name

                api.getEditTreeData(this.editRoleId).then((response) =>{
                    this.editTreeData = response.data.privilegeTreeNode;
                    this.dialogFormVisible = true;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            cellClickEvent(row, column){
                if(column.property == 'name'){
                    this.btnSelect = 'edit'
                    var seletData = row;

                    this.editRoleId = seletData.roleId;
                    this.form.roleName = seletData.name

                    api.getEditTreeData(this.editRoleId).then((response) =>{
                        this.editTreeData = response.data.privilegeTreeNode;
                        this.dialogFormVisible = true;
                    }).catch(err =>{
                        this.$message({
                            type: 'error',
                            duration: 1500,
                            showClose: true,
                            message: err.message
                        });
                    });
                }
            },
            rowClickEvent(row){
                this.$refs.table.toggleRowSelection(row);
            },
            openWinEvent(){
                if(this.btnSelect == 'add'){
                    this.form.roleName = ""
                    this.$nextTick(() => {
                        this.initLeftTree(this.PerssTreeData)
                    })
                }
                if(this.btnSelect == 'edit'){
                    this.$nextTick(() => {
                        this.initLeftTree(this.editTreeData)
                        this.leftTreeOncheck()
                    })
                }
            },
            leftTreeOncheck(){
                var leftTree = $.fn.zTree.getZTreeObj('roleManege_leftTree');
                var nodes = leftTree.getCheckedNodes();

                var level0 = []
                var level1 = []
                var level2 = []

                for(var item of nodes){
                    if(item.level == 0){
                        var obj0 = {}

                        for(var tt in item){
                            obj0[tt] = item[tt]
                        }

                        obj0.children = []
                        level0.push(obj0)
                    }
                    if(item.level == 1){
                        var obj = {}

                        for(var kk in item){
                            obj[kk] = item[kk]
                        }
                        obj.children = []
                        level1.push(obj)
                    }
                    if(item.level == 2){
                        level2.push(item)
                    }
                }

                this.initRightTree(level0, level1, level2)

            },
            initRightTree(arr0, arr1, arr2){
                this.canRightTreeData(arr0, arr1, arr2)
                $.fn.zTree.init($("#roleManege_rightTree"), this.rightTreeSeting, this.rightTreeData);

                // rightTree.expandAll(true);
            },
            initLeftTree(data){

                this.disableLevel1 = []
                this.disableLevel2 = []
                this.disableLevel0 = []
                var leftTree = $.fn.zTree.init($("#roleManege_leftTree"), this.treeSeting, data);
                var node = leftTree.getNodesByParam("chkDisabled", true, null);

                for(var item of node){
                    if(item.level == 0){
                        var obj = {}

                        // leftTree.expandNode(item, true, false, true); //展开一级节点
                        for(var k in  item){
                            obj[k] = item[k]
                        }

                        obj.children = []
                        this.disableLevel0.unshift(obj);
                        this.rightRootNode = obj;
                        this.rightRootNode.children = [];
                    }
                    if(item.level == 1){
                        var obj1 = {}

                        for(var k1 in  item){
                            obj1[k1] = item[k1]
                        }
                        obj1.children = []
                        this.disableLevel1.unshift(obj1);
                    }
                    if(item.level == 2){
                        var obj2 = {}

                        for(var k2 in  item){
                            obj2[k2] = item[k2]
                        }
                        this.disableLevel2.push(obj2)
                    }
                }

                this.initRightTree([], [], [])

            },
            canRightTreeData(arr0, arr1, arr2){
                this.rightLeve0 = arr0
                this.rightLeve1 = arr1
                this.rightLeve2 = arr2

                function compare(property){
                    return function(obj1, obj2){
                        var value1 = obj1[property];
                        var value2 = obj2[property];

                        return value1 - value2;     // 升序
                    }
                }

                for(var item0 of this.disableLevel0){
                    item0.children = []
                    this.rightLeve0.unshift(item0)
                }
                for(var item1 of this.disableLevel1){
                    item1.children = []
                    this.rightLeve1.unshift(item1)
                }
                for(var item2 of this.disableLevel2){
                    this.rightLeve2.unshift(item2)
                }
                for(var item12 of this.rightLeve2){
                    for(var parent11 of this.rightLeve1){
                        if(parent11.privisId == item12.parent){
                            parent11.children.unshift(item12)
                            parent11.children.sort(compare('privisId'))
                        }
                    }
                }
                for(var item11 of this.rightLeve1){
                    for(var parent10 of this.rightLeve0){
                        if(parent10.privisId == item11.parent){
                            parent10.children.unshift(item11)
                            parent10.children.sort(compare('privisId'))
                        }
                    }
                }

                // this.rightRootNode.children = this.rightLeve1

                this.rightTreeData = this.rightLeve0;

            },
            roleSizeChange(val) {
                this.pageSize = val
                this.getTableData()
            },
            roleCurrentChange(val) {
                this.currentPage = val
                this.getTableData()
            },
            btnChange(val) {
                if(val == 'add'){
                    this.dialogFormVisible = true;
                }
                if(val == 'edit'){
                    this.editEvent()
                }
                if(val == 'delete'){
                    this.deleteEvent()
                }
            },
            addEvent(){
                this.btnSelect = "add"
                this.dialogFormVisible = true;
            },
            roleSaveEvent(formName){
                this.$refs[formName].validate((valid) => {
                    if(valid){
                        if(this.btnSelect == 'add'){
                            this.addSaveEvent();
                        }
                        if(this.btnSelect == 'edit'){
                            this.editSaveEvent();
                        }
                    }else{
                        return false
                    }
                })

            },
            addSaveEvent(){
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");

                var rightnodes = rightTree.transformToArray(rightTree.getNodes())

                var  privileges = ""

                for(var item of rightnodes){
                    privileges += item.privisId + ','
                }

                privileges = privileges.substring(0, privileges.length - 1)

                var obj = {
                    name: this.form.roleName,
                    privileges:  privileges
                }

                api.saveRole(obj).then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '添加成功'
                    });
                    this.btnSelect = "";
                    this.dialogFormVisible = false;
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
            editSaveEvent(){
                var rightTree = $.fn.zTree.getZTreeObj("roleManege_rightTree");

                var rightnodes = rightTree.transformToArray(rightTree.getNodes())

                var  privileges = ""

                for(var item of rightnodes){
                    privileges += item.privisId + ','
                }

                var obj = {
                    roleId: this.editRoleId,
                    name: this.form.roleName,
                    privileges:  privileges
                }

                api.updateRole(obj).then(() =>{
                    this.$message({
                        type: 'success',
                        duration: 1500,
                        showClose: true,
                        message: '修改成功'
                    });
                    this.btnSelect = "";
                    this.dialogFormVisible = false;
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
            deleteEvent(){
                var flg = this.isSelectTableData();

                if(flg){
                    this.$confirm('此操作将永久删除该文件，是否继续？', '提示', {
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        type: 'error'
                    }).then(() => {
                        this.btnSelect = "";
                        var roleIds = ""
                        var seletData = this.selectTableData;

                        for(let item of seletData){
                            roleIds += item.roleId + ',';
                        }

                        var paobj = {roleIds: roleIds}

                        api.deleteRole(paobj).then(() =>{
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
                this.form.roleName = "";
                this.$refs[formName].resetFields();
                this.$refs.table.clearSelection();
            },
            getTableData(){
                var data = {
                    pageNum: this.currentPage,
                    pageSize: this.pageSize,
                    name: this.roleManageSearParam.roleName
                }

                api.getRoleList(data).then((response) =>{
                    this.TotalPages = response.data.total
                    this.roleListData = response.data.list;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            getAddTreeData(){
                var loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"))
                var loginUserId = loginInfo.data.user.userId

                perapi.getPermissionTree({userId: loginUserId}).then((response) =>{
                    this.PerssTreeData = response.data;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            }

        }
    }
</script>

<style scoped>
    .roleManage {
        margin: 12px 18px 0px 18px;
        border: solid 1px #ddd;
        background-color: #fff;
    }
    .roleManageHeader{
        margin: 20px 0;
        padding-left: 20px;
    }
    .roleFormInline{
        margin-top: -12px;
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

    .rolePerssionWrap{
        height: 370px;
        border-bottom: 1px solid #ddd;
        margin-top: 10px;
    }
    .rolePerssionWrap>.el-col{
        height: 100%;
    }
    .rolePerssionWrap>.el-col:first-child{
        border-right: 1px solid #ddd;
    }
    .role_win_tree_wrap{
        height: 340px;
        line-height: 10px;
        /* overflow: auto; */
    }
    .halo-tree{
        padding-left: 5px;
        padding-right: 3px;
    }
    .win_banner{
        text-align: center;
        background: #F7F7F5;
        height: 32px;
        line-height: 32px;
        font-weight: 700;
        /* box-shadow:0px 2px 5px #ddd; */
    }
    .el-header{
        height: auto !important;
    }
    .sear_box_wrap{
        background: #F9F9F9;
        padding-top: 10px;
        /* padding-bottom: 5px; */
        /* margin-bottom: 0px; */
        padding-left: 20px;
        border: 1px solid #dcdfe6;
        border-left: none;
        border-right: none;
    }
    .halo-tree{
        width: max-content !important;
    }

</style>


