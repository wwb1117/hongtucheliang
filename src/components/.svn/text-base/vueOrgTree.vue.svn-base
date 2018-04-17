<template>
    <div v-bind:style="{background: '#f9f9f9', paddingTop: '20px', height: wrapHeight + 'px'}">
        <el-form class="sear_form" :inline="true" ref="form" size="mini" v-bind:style="{padding: '0 0px 0 10px'}">
            <el-form-item v-bind:style="{margin: '0'}">
                <el-input v-bind:style="{display:'none'}"></el-input>
                <input
                 class="orgSearInput"
                 v-bind:style="{
                 width: '150px',
                 border: 'none', height: '30px',
                 background: 'transparent',
                 borderBottom: '1px solid #ddd',
                 padding: '7px 0 7px 0'
                 }"
                 @keyup.prevent="orgTreeSearch($event)"
                 v-model="searchword"
                 placeholder="请输入关键字"
                >
                <!-- @keyup="orgTreeSearch($event)" -->
            </el-form-item>
            <el-form-item v-bind:style="{margin: '0'}">
                <el-button type="success" @click="orgTreeSearch" icon="el-icon-search" v-bind:style="{padding: '7px'}"></el-button>
            </el-form-item>
        </el-form>
        <div class="orgTreeBtnBox">
            <!-- <el-row>
                <el-col :span="24">
                    <el-radio-group v-model="btnSelect" @change="btnChange" size="mini">
                        <el-radio-button label="add">
                            <i class="el-icon-plus"></i>
                            新增
                        </el-radio-button>
                        <el-radio-button label="edit">
                            <i class="el-icon-edit"></i>
                            修改
                        </el-radio-button>
                        <el-radio-button label="delete">
                            <i class="el-icon-delete"></i>
                            删除
                        </el-radio-button>
                    </el-radio-group>
                </el-col>
            </el-row> -->
            <el-button v-hasPermisson="'车辆管理_删除组织'" type="danger" size="mini" @click="deletEvent" v-bind:style="{paddingLeft: '7px', paddingRight: '7px'}" icon="el-icon-delete">删除</el-button>
            <el-button v-hasPermisson="'车辆管理_修改组织'" class="myBtnType_DCyan" size="mini" @click="editEvent" v-bind:style="{paddingLeft: '7px', paddingRight: '7px'}" icon="el-icon-edit">修改</el-button>
            <el-button v-hasPermisson="'车辆管理_新增组织'" type="primary" size="mini" @click="addEvent" v-bind:style="{paddingLeft: '7px', paddingRight: '7px'}" icon="el-icon-plus">新增</el-button>

            <!-- <el-row> -->
                <EasyScrollbar :barOption="barOpt">
                    <div>
                        <!-- <v-tree ref='tree1' id="mainorgTree" :style="{display: 'block'}" :scoped="true" :data='treeData' :multiple='false' :tpl='tpl' :halfcheck='true' /> -->
                        <ul class="ztree" ref="orgManageMainTree" id="orgManageMainTree"></ul>
                    </div>
                </EasyScrollbar>
            <!-- </el-row> -->

        </div>



        <el-dialog v-drag="{width:680,height:372}" @open="openWindow" :title="winTitle" @close="closeWindow('form')" :visible.sync="dialogFormVisible" width="680px">
            <el-form :model="form" ref="form" :rules="rules" size="small" :inline="true" label-width="100px">
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="组织名称" prop="name" :label-width="formLabelWidth">
                            <el-input v-focus="btnSelect == 'add'" v-model="form.name" @change="checkOrgName" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="上级组织" prop="parentId" :label-width="formLabelWidth">
                            <el-popover
                                ref="focusorgtree"
                                placement="bottom-start"
                                width="200"
                                v-model="orgPopoverShow"
                                trigger="click">
                                <el-row>
                                    <el-input @keyup.native="formOrgTreeSearch" v-model="formOrgSearWord" v-bind:style="{width: '178px'}" prefix-icon="el-icon-search">
                                    </el-input>
                                </el-row>
                                <el-row>
                                    <EasyScrollbar :barOption="barOpt">
                                        <div v-bind:style="{maxHeight: '250px'}">
                                            <ul class="ztree" ref="orgManageFormTree" id="orgManageFormTree"></ul>
                                        </div>
                                    </EasyScrollbar>
                                </el-row>
                            </el-popover>
                            <el-input v-model="form.parentName" readonly="readonly" v-popover:focusorgtree auto-complete="off" placeholder="请选择..."></el-input>

                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="负责人" prop="leader" :label-width="formLabelWidth">
                            <el-input v-model="form.leader" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="联系电话" verify can-be-empty VerifyPhone prop="telephone" :label-width="formLabelWidth">
                            <el-input v-model="form.telephone" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
                <el-row class="user_dailog_form">
                    <el-col :span="12">
                        <el-form-item label="联系地址" prop="address" :label-width="formLabelWidth">
                            <el-input v-model="form.address" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                    <el-col :span="12">
                        <el-form-item label="备注信息" prop="remark" :label-width="formLabelWidth">
                            <el-input v-model="form.remark" auto-complete="off" placeholder="请输入..." clearable></el-input>
                        </el-form-item>
                    </el-col>
                </el-row>
            </el-form>
            <div slot="footer" class="dialog-footer">
                <el-button size="mini" @click="closeWindow('form')">关 闭</el-button>
                <el-button size="mini" type="success" @click="saveEvent('form')">保 存</el-button>
            </div>
        </el-dialog>

        <div></div>

    </div>
</template>
<script>
    import api from 'api/carManage'
    // import searTreeInput from 'components/searOrgInput'
    export default {
        name: 'HelloWorld',
        data() {
            return {
                lang: 'zh',
                searchword: '',
                formOrgSearWord: '',
                selectTreeNode: null,
                wrapHeight: null,
                btnSelect: '',
                orgPopoverShow: false,
                barOpt: {
                    barWidth: 7,
                    zIndex: 1083
                },
                treeData: [],
                orgMainTreeSetting: {
                    callback: {
                        onClick: this.mainOrgClickEvent
                    }
                },
                formOrgTreeSetting: {
                    callback: {
                        onClick: this.formOrgClickEvent
                    }
                },
                dialogFormVisible: false,
                form: {
                    name: '',
                    orgUuid: '',
                    parentId: '',
                    leader: '',
                    telephone: '',
                    parentName: '',
                    address: '',
                    remark: ''
                },
                addEditTreeName: '', //新增、修改组织名称
                treeList: [],
                rules: { //模态框表单验证规则
                    name:[
                        { required: true, message: '请输入组织名称', trigger: 'blur'},
                        { min: 0, max: 30, message: '最多可输入 30 个字符', trigger: 'blur'}
                    ],
                    parentId:[
                        { required: true, message: '请选择上级组织', trigger: 'change'}
                    ],
                    leader:[
                        { max: 30, message: '最多可输入 30 个字符', trigger: 'blur'}
                    ],
                    remark:[
                        { max: 100, message: '最多可输入 100 个字符', trigger: 'blur'}
                    ],
                    address:[
                        { max: 100, message: '最多可输入 100 个字符', trigger: 'blur'}
                    ]
                },
                formLabelWidth: '90px', //模态框lable宽度
                winTitle: '新增组织'
            }
        },
        created(){
            this.getOrgTreeData();
            this.wrapHeight = this.$store.state.home.settings.deviceHeight - 2;

        },
        mounted(){
            $('.orgTreeBtnBox .easy-scrollbar__wrap').height(this.wrapHeight - 100)
        },
        methods: {
            mainOrgClickEvent(ev, treeid, node){
                var mainTree =  $.fn.zTree.getZTreeObj("orgManageMainTree");

                if(node.id != -1){
                    mainTree.selectNode(node)
                    this.selectTreeNode = node
                }else{
                    mainTree.cancelSelectedNode()
                    this.selectTreeNode = null
                }
                this.$emit("orgNodeForCarManege", this.selectTreeNode)
            },
            formOrgClickEvent(ev, treeid, node){
                var formTree =  $.fn.zTree.getZTreeObj("orgManageFormTree");

                if(node.id != -1){
                    this.form.parentName = node.name;
                    this.form.parentId = node.uuid;
                    this.orgPopoverShow = false
                }else{
                    formTree.cancelSelectedNode()
                    this.form.parentName = "";
                    this.form.parentId = "";
                }

            },
            orgTreeSearch () {
                var searchkey = this.searchword;
                var mainTree =  $.fn.zTree.getZTreeObj("orgManageMainTree");

                function treeDataFilter(node){
                    if(node.name.indexOf(searchkey) != -1){
                        return true
                    }else{
                        return false
                    }
                }

                mainTree.cancelSelectedNode()
                if(searchkey != ""){
                    var nodeArr = mainTree.getNodesByFilter(treeDataFilter)

                    for(var item of nodeArr){
                        mainTree.selectNode(item, true)
                    }
                }

            },
            formOrgTreeSearch(){
                var searchkey = this.formOrgSearWord;
                var formTree =  $.fn.zTree.getZTreeObj("orgManageFormTree");

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
            checkOrgName(){
                var obj = {
                    field: 'name',
                    name: this.form.name
                }

                if(this.btnSelect == 'edit'){
                    obj.orgUuid = this.selectTreeNode.uuid
                }

                api.checkOrgName(obj).then((response) =>{
                    if(response.data != ""){
                        this.$message({
                            type: 'error',
                            duration: 1500,
                            showClose: true,
                            message: response.data
                        });
                        this.form.name = "";
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
            getAllParentNode(rootNode){
                if(rootNode && rootNode.getParentNode()){
                    this.treeList.push(rootNode.getParentNode());
                    this.getAllParentNode(rootNode.getParentNode());
                    return this.treeList;
                }
            },
            getOrgTreeData(){
                api.getOrgTree().then((response) =>{
                    if (response.code === 200){
                        var virRootData = this.$store.state.home.orgVirData

                        virRootData.children = response.data;
                        this.treeData = virRootData

                        var orgTree = $.fn.zTree.init($("#orgManageMainTree"), this.orgMainTreeSetting, this.treeData);
                        var rootNode = orgTree.getNodes()[0]

                        if(this.addEditTreeName != ''){
                            rootNode = orgTree.getNodeByParam("name", this.addEditTreeName, null);
                            this.treeList = [];
                            var treeList = this.getAllParentNode(rootNode);

                            for(let item of treeList){
                                orgTree.expandNode(item, true)
                            }
                            this.addEditTreeName = '';
                        }
                        orgTree.expandNode(rootNode, true)

                        this.selectTreeNode = null        //勾选的树节点置空

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
            addEvent(){
                this.winTitle = "新增组织"
                this.dialogFormVisible  = true;
                this.btnSelect = 'add'
            },
            editEvent(){
                var uuid;

                if(this.selectTreeNode){
                    this.winTitle = "修改组织"
                    this.dialogFormVisible  = true;
                    this.btnSelect = 'edit'
                    uuid = this.selectTreeNode.uuid;
                    this.getOrgInfoByUuid(uuid)
                }else{
                    this.$notify({
                        title: '警告',
                        message: '请选择组织进行修改',
                        type: 'warning',
                        offset: 200,
                        duration: 1500
                    });
                }
            },
            deletEvent(){
                if(this.selectTreeNode){
                    this.deleteEvent(this.selectTreeNode.uuid);
                }else{
                    this.$notify({
                        title: '警告',
                        message: '请选择组织进行删除',
                        type: 'warning',
                        offset: 200,
                        duration: 1500
                    });
                }
            },
            getOrgInfoByUuid(uuid){
                api.getOrgInfoByUuid(uuid).then((response) =>{
                    for(var p in this.form){
                        this.form[p] = response.data[p]
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
            deleteEvent(orguuid){
                this.$confirm('此操作将永久删除该组织，是否继续？', '提示', {
                    confirmButtonText: '确定',
                    cancelButtonText: '取消',
                    type: 'error'
                }).then(() => {
                    api.deleteOrg(orguuid).then(() =>{
                        this.getOrgTreeData();
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '删除成功'
                        });
                        this.getOrgTreeData();
                        this.$store.state.home.isFreshCarTree = true

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
                api.saveOrg(this.form).then((response) =>{
                    if (response.code === 200){
                        this.dialogFormVisible = false;
                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: "新增成功"
                        });
                        this.getOrgTreeData();
                        this.$store.state.home.isFreshCarTree = true
                        this.addEditTreeName = this.form.name;
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
            editSaveEvent(){
                api.updateOrg(this.form).then((response) =>{
                    if (response.code === 200){
                        this.dialogFormVisible = false;
                        this.getOrgTreeData();

                        this.$message({
                            type: 'success',
                            duration: 1500,
                            showClose: true,
                            message: '修改成功'
                        });
                        this.$store.state.home.isFreshCarTree = true
                        this.addEditTreeName = this.form.name;
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
            closeWindow(formName){
                this.dialogFormVisible  = false;
                this.$refs[formName].resetFields();
                for(var p in this.form){
                    this.form[p] = "";
                }
            },
            openWindow(){
                this.$nextTick(() => {
                    var formOrgTree = $.fn.zTree.init($("#orgManageFormTree"), this.formOrgTreeSetting, this.treeData);
                    var rootNode = formOrgTree.getNodes()[0]

                    formOrgTree.expandNode(rootNode, true)
                })
            }
        }
    }
</script>
<style scoped>
    .halo-tree{
        padding-left: 0px;
        width: max-content;
    }
    .el-icon-search{
        color:#0064b4
    }
    .orgTreeBtnBox{
        padding-top: 20px;
        padding-left: 7px;
        min-height: 30px;
    }
    .orgSearInput::-webkit-input-placeholder{
        color:#ddd;
        font-size: 16px;
    }
    .orgSearInput::-moz-placeholder{   /* Mozilla Firefox 19+ */
        color:#ddd;
        font-size: 16px;
    }
    .orgSearInput:-moz-placeholder{    /* Mozilla Firefox 4 to 18 */
        color:#ddd;
        font-size: 16px;
    }
    .orgSearInput:-ms-input-placeholder{  /* Internet Explorer 10-11 */
        color:#ddd;
        font-size: 16px;
    }
    #orgTree{
        width: max-content
    }

</style>

