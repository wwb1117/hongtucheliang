<template>
    <div class="wrapper-md">
        <div class="row">
            <div class="col-sm-12 col-md-3 col-lg-3">
                <div class="panel panel-default">
                    <div class="panel-heading font-bold">
                        组织列表
                    </div>
                    <div class="panel-body">
                        <div class="dk r r-2x">
                            <el-tree :data="treeData" :props="defaultProps" @node-click="handleNodeClick">
                            </el-tree>
                        </div>
                    </div>
                </div>
            </div>
            <div class="col-sm-12 col-md-9 col-lg-9">          
             <div class="panel panel-default">
                <div class="panel-heading font-bold">
                    数据管理
                </div>
                <div class="panel-body">
                    <form class="form-horizontal" method="post" ref="org" :model="org">
                        <div class="form-group">
                            <label class="col-sm-2 control-label" for="input-id-1">部门名称：</label>
                            <div class="col-sm-4">
                                <el-input v-model="org.fullName"></el-input>
                            </div>
                            <label class="col-sm-2 control-label">部门简称：</label>
                            <div class="col-sm-4">
                                <el-input v-model="org.simpleName"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">所属部门：</label>
                            <div class="col-sm-4">
                                <el-select v-model="org.parent" clearable filterable placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.id" :label="item.fullName" :value="item.id">
                                    </el-option>
                                </el-select>
                            </div>
                            <label class="col-sm-2 control-label">管理员：</label>
                            <div class="col-sm-4">
                                <el-input v-model="org.admin"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">联系电话：</label>
                            <div class="col-sm-4">
                                <el-input name="phone" v-model="org.phone"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">备注：</label>
                            <div class="col-sm-10">
                                <el-input type="textarea" :rows="4" placeholder="请输入内容" v-model="org.remark"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <div class="col-md-2"></div>
                            <div class="col-md-10">
                                <el-button type="primary" class="el-button--small" @click="reset">
                                    <i class="fa fa-reply"></i>重 置
                                </el-button>
                                <el-button type="success" class="el-button--small" @click="insertOrg"><i class="fa fa-check-circle"></i> 保 存</el-button>
                                <el-button type="danger" class="el-button--small" @click="deleteOrg"><i class="fa fa-times"></i> 删 除</el-button>
                            </div>
                        </div>
                    </form>
                </div>
             </div>            
            </div>
        </div>
    </div>
</template>

<script>
    import api from './../../api/department.js'
    export default {
        props: ["isRefresh"],
        data() {
            return {
                options: [],
                treeData: [],
                defaultProps: {
                    children: 'children',
                    label: 'fullName'
                },
                org: {
                    id: null,
                    simpleName: '',
                    fullName: '',
                    parent: '',
                    admin: '',
                    phone: '',
                    remark: ''
                }
            };
        },
        activated() {
            if (this.isRefresh) {
                this.getOrgTree();
                this.getOrgList();
                this.reset();
            }
        },
        methods: {
            // 重置表单
            reset() {
                this.org.id = null;
                this.org.parent = '';
                this.$refs['org'].reset();
            },
            handleNodeClick(data) {
                this.org.id = data.id;
                this.org.simpleName = data.simpleName;
                this.org.fullName = data.fullName;
                this.org.parent = data.parent;
                this.org.admin = data.admin;
                this.org.phone = data.phone;
                this.org.remark = data.remark;
            },
            getOrgTree() {
                api.queryTreeList().then((response) => {
                    var data = response.data;

                    this.treeData = data;
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                });
            },
            getOrgList() {
                api.queryOrgList().then((response) => {
                    var data = response.data;

                    this.options = data;
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                });
            },
            insertOrg() {
                api.saveOrg(this.org).then((response) => {
                    var data = response.data;

                    if (data == 1) {
                        if (this.org.id === null) {
                            this.$message.success('添加部门信息成功！');
                        } else {
                            this.$message.success('修改部门信息成功！');
                        }
                        this.reset();
                        this.getOrgTree();
                        this.getOrgList();
                    }
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                });
            },
            deleteOrg() {
                api.deleteOrg({
                    'id': this.org.id
                }).then((response) => {
                    var data = response.data;

                    if (data == 1) {
                        this.$message.success('删除部门信息成功！');
                        this.reset();
                        this.getOrgTree();
                        this.getOrgList();
                    }
                }).catch((response) => {
                    this.$message.error('错了哦，这是一条错误消息' + response.message);
                });
            }
        }
    };
</script>

<style>
    .el-select {
        width: 100%
    }
</style>
