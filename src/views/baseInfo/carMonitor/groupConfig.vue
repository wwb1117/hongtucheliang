<template>
    <el-container id="group">
        <el-header height="40%">
            <el-row class="row-mg-l">
                <el-col :span="4">
                    <el-button @click="deleteGroup" type="danger" class="el-icon-delete" size="medium" ></el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="primary" class="el-icon-edit" size="medium" ></el-button>
                </el-col>
                <el-col :span="4">
                    <el-button @click="openAdd" type="primary" class="fa fa-plus fa-6"></el-button>
                </el-col>
                <el-col :span="4">
                    <el-button type="info" class="el-icon-setting"></el-button>
                </el-col>
            </el-row>
        </el-header>

        <el-main height="60%">
            <ztree treeId="groupTree" ref="tree"
                :onClick="onClick"
                :onCheck="onCheck"
                :asyncUrl="getUrl"
                asyncEnable="true"
                asyncMethod="get"
                :asyncAutoParam="asyncAutoParam"
                :onAsyncError="onAsyncError"
                :beforeAsync="beforeAsync"
                :nodes="zNodes"
                enableCheck="true"
                search="true"
                :searchParams="searchParams"
                :searchHandler="searchHandler"
                :searchSelectRsHandler="searchSelectRsHandler">
            </ztree>
        </el-main>

        <el-footer height="10%">
            <el-row>

            </el-row>

        </el-footer>

        <el-dialog @open="resetAll" :lock-scroll="true" title="目录维护" :visible.sync="groupModalVisisble"
            width="30%" :before-close="cancleHandler">
            <el-form ref="groupRef" :rules="groupRules" label-position="right" label-width="80px" :model="group">
                <el-form-item label="目录名称" prop="groupName">
                    <el-input v-model="group.groupName" ></el-input>
                </el-form-item>
                <el-form-item label="上级目录" prop="parentGroupId">
                    <select-tree :multiSelect="true" :data="orgNodes" trigger="click" :showSearch="false" textKey="name"
                        idKey="id" :selectCallback="selectCallback"></select-tree>
                </el-form-item>
            </el-form>

            <span slot="footer" class="dialog-footer">
                <el-row>
                    <el-col :offset="14" :span="4">
                        <el-button type="primary" @click="saveGroup">保 存</el-button>
                    </el-col>
                    <el-col  :span="4">
                        <el-button @click="cancleHandler">取 消</el-button>
                    </el-col>
                </el-row>
            </span>
        </el-dialog>
    </el-container>

</template>

<style lang="" scoped>
    #group .el-button {
        padding: 3px 3px 3px 3px !important;
        margin-top: 10px;
        margin-left: 2px;
        margin-bottom: 3px;
    }
    .row-mg-l {
        margin-left: 10px;
    }
</style>

<script>
    import axios from 'axios'
    import configApi from 'api/monitor'
    import ztree from 'components/ZTree'
    import selectTree from 'components/SelectTree'
    import http from 'utils/HttpClient'

    const BASE_URL = axios.defaults.baseURL
    const LOAD_TREE_URL = BASE_URL + '/tree/groupcars/tree'
    const SAVE_GROUP_URL = BASE_URL + '/group'
    // const UPDATE_GROUP_URL = '/group'
    // const DELETE_GROUP_URL = '/group/'

    function log(o) {
        let con = console || window.console

        if(con && con.log) {
            con.log(o)
        }
    }

    export default {
        components: {
            ztree,
            selectTree
        },
        data() {
            return {
                isUpdate: false,
                groupModalVisisble: false,
                group: {
                    groupName: '',
                    parentGroupId: '',
                    contacts: '',
                    tel: ''
                },
                groupRules: {
                    'groupName': [
                        { required: true, message: '请请输入目录名称', trigger: 'blur' },
                        { min: 1, max: 100, message: '目录名称长度在 1 到 100 个字符', trigger: 'blur'}
                    ],
                    'parentGroupId': [
                        { required: true, message: '请选择上级目录', trigger: 'blur' }
                    ]
                },

                // 车辆树搜索条件
                searchParams: [
                    {value: 1, label: '车牌号', default: true},
                    {value: 2, label: 'SIM卡号', default: false},
                    {value: 3, label: '终端号', default: false},
                    {value: 4, label: 'VIN码', default: false}
                ],

                asyncAutoParam: ["pId=groupId"],
                // 车辆树节点
                zNodes: [
                    { id: "0", "pId": "-1", name: "车辆监控中心", open:false, isParent: true}
                ],

                orgNodes: [
                    { id: "0", "pId": "-1", name: "车辆监控中心", open:false, isParent: true},
                    { id: "1", "pId": "0", name: "西安研发部", open:false, isParent: true}
                ]
            }
        },
        props: [
        ],
        watch: {
        },
        methods: {

            // 车辆树搜索句柄
            searchHandler(type, val, callback) {
                log('type: ' + type + ', val：' + val)
                let param = {}

                http.post('/tree/query/demo', param).then((response) => {
                    log(response)

                    if(response.code == 200) {
                        return callback(response.data)
                    } else {
                        this.showMsg(response.message)
                    }
                }).catch((error) => {
                    log(error)
                })

            },
            // 选中搜索结果时触发
            searchSelectRsHandler(nodeId) {
                let node = this.$refs.tree.getNodeByTId(nodeId)

                this.$refs.tree.selectNode(node, false, false)
                this.$refs.tree.checkNode(node, true, false, false)
            },
            // 删除分组
            deleteGroup() {
                let nodes = this.$refs.tree.getNodesByChecked(true)

                log(nodes)
            },
            // 获取异步请求的url
            getUrl() {
                return LOAD_TREE_URL
            },
            beforeAsync(treeId, treeNode) {
                log(1)
                log(this.$refs.tree.getSetting())
                log(treeNode)
                return true
            },
            // 异步加载异常
            onAsyncError(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) {
                log(textStatus)
                log(errorThrown)
            },
            // 节点展开前事件
            beforeExpand(treeId, treeNode) {
                log(treeNode)
                return true
            },
            // 节点单击事件
            onClick(event, treeId, treeNode) {
                log(treeNode)
            },
            // 节点勾选事件
            onCheck(event, treeId, treeNode) {
                log('勾选事件触发')
                log(treeNode)
            },
            // 打开新增分组窗口
            openAdd() {
                log('open')
                this.groupModalVisisble = true
            },
            selectCallback(id) {
                this.group.parentGroupId = id
                log(id)
            },
            // 请求保存
            requestSave() {
                let that = this

                that.groupModalVisisble = false
                http.post(SAVE_GROUP_URL, this.group).then(response => {
                    that.showMsg(response.message)
                    if (response.code === 200) {
                        this.rebuildTree()
                        this.groupModalVisisble = false
                    }
                }).catch(error => {
                    that.showMsg(error.message)
                })
            },
            // 根据配置重新构建树
            rebuildTree() {
                this.$emit('loadTreeByConfig')
            },
            // 验证参数
            validate() {
                if(this.groupName == '') {
                    this.showMsg('请输入目录名称')
                    return false
                }
                if(this.parentGroupId == '') {
                    this.showMsg('请选择上级目录')
                    return false
                }
                return true
            },
            saveGroup() {
                let that = this

                if (this.validate()) {
                    this.$msgbox({
                        title: '消息',
                        message: '确定保存配置信息？',
                        showCancelButton: true,
                        confirmButtonText: '确定',
                        cancelButtonText: '取消',
                        callback: that.requestSave,
                        beforeClose: (action, instance, done) => {
                            if (action === 'confirm') {
                                instance.confirmButtonLoading = true
                                instance.confirmButtonText = '保存中...'
                                setTimeout(() => {
                                    done()
                                    setTimeout(() => {
                                        instance.confirmButtonLoading = false
                                    }, 300)
                                }, 1000)
                            } else {
                                done()
                            }
                        }
                    }).then(action => {
                        this.$message({
                            type: 'info',
                            message: 'action: ' + action
                        })
                    })
                }
            },
            queryGroup() {
                let that = this

                configApi.queryTreeConfig().then((response) => {
                    let group = response.data

                    if (!group) {
                        return
                    }
                    that.groupName = group.groupName
                    that.parentGroupId = group.groupName
                    that.contacts = group.contacts
                    that.tel = group.tel
                }).catch(err => {
                    that.showMsg(err.message)
                });
            },
            resetAll() {
                this.groupName = ''
                this.parentGroupId = ''
                this.contacts = ''
                this.tel = ''
            },
            cancleHandler() {
                this.groupModalVisisble = false
            },
            showMsg(message) {
                this.$message({
                    type: 'error',
                    duration: 1500,
                    showClose: true,
                    message: message
                });
            }
        },
        mounted() {
        }
    }
</script>
