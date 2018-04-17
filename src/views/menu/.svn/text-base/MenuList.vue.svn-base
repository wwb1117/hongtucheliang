<template>
	 <div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <div class="col-sm-2">
                                    <button type="button" class="btn btn-sm btn-primary" slot="append" icon="" @click="dialogCreateVisible = true"><i class="fa fa-plus"></i> 新 增</button>
                                </div>
                            </div>
                        </form>
                        <div class="el-table-self">
                            <!--v-loading="loading" element-loading-text="拼命加载中..."-->
                            <el-table :data="tableData" border style="width: 100%">
                                <el-table-column type="expand">
                                    <template slot-scope="props">
                                        <div v-if="props.row.children.length !=0">
                                            <el-table :data="props.row.children" style="width: 100%">
                                                <el-table-column v-for="column in columns" :prop="column.value" :label="column.label" :key="column.value" :formatter="column.formatter">
                                                </el-table-column>
                                                <el-table-column label="操作">
                                                    <template slot-scope="scopeC">
                                                        <el-button size="small" type="info" @click="updateRow(scopeC.$index, props.row.children)">编 辑</el-button>
                                                        <el-button size="small" type="danger" @click="deleteRow(scopeC.$index, props.row.children)">删 除</el-button>
                                                    </template>
                                                </el-table-column>
                                            </el-table>
                                        </div>
                                    </template>
                                </el-table-column>
                                <el-table-column v-for="column in columns" :fixed="column.fixed" :prop="column.value" :label="column.label" :key="column.value" :formatter="column.formatter">
                                </el-table-column>
                                <el-table-column label="操作">
                                    <template slot-scope="scope">
                                        <button type="button" class="btn btn-xs btn-primary" @click="updateRow(scope.$index, tableData)">编 辑</button>
                                        <button type="button" class="btn btn-xs btn-danger" @click="deleteRow(scope.$index, tableData)">删 除</button>
                                        <button type="button" class="btn btn-xs btn-info" @click="insertNextRow(scope.$index, tableData)"> 添加下级菜单</button>
                                    </template>
                                </el-table-column>
                            </el-table>
                        </div>
                    </div>
                </div>
                <!-- 创建菜单 begin-->
                <el-dialog title="创建菜单" v-model="dialogCreateVisible" :close-on-click-modal="false" :close-on-press-escape="false" @close="reset">
                    <form class="form-horizontal" method="post" id="#create" :model="create" ref="create">
                        <div class="form-group">
                            <div v-show="nextShow">
                                <label class="col-sm-2 col-md-2 control-label">上级菜单:</label>
                                <div class="col-sm-4 col-md-4">
                                    <el-input v-model="showParent" :disabled="true"></el-input>
                                    <el-input v-model="create.parent" v-show="false"></el-input>
                                </div>
                            </div>
                            <label class="col-sm-2 col-md-2 control-label" for="">名称:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="create.name"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label" for="">链接:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="create.moduleLink"></el-input>
                            </div>
                            <label class="col-sm-2 col-md-2 control-label" for="">权限标识:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="create.permissionCode"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">图标:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="create.icon"></el-input>
                            </div>
                            <label class="col-sm-2 control-label">可见:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-radio-group v-model="create.show">
                                    <el-radio class="radio" label="1">显示</el-radio>
                                    <el-radio class="radio" label="2">隐藏</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label"> 备注:</label>
                            <div class="col-sm-10 col-md-10">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="create.remark"></el-input>
                            </div>
                        </div>
                    </form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogCreateVisible = false">取 消</el-button>
                        <el-button type="primary" :loading="createLoading" @click="createMenu">确 定</el-button>
                    </div>
                </el-dialog>

                <!-- 修改菜单 begin-->
                <el-dialog title="修改菜单信息" v-model="dialogUpdateVisible" :close-on-click-modal="false" :close-on-press-escape="false">
                    <form class="form-horizontal" method="post" id="#update" :model="update" ref="update">
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label">上级菜单:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-select v-model="update.parent" clearable placeholder="请选择">
                                    <el-option v-for="item in options" :key="item.value" :label="item.label" :value="item.value">
                                    </el-option>
                                </el-select>
                            </div>
                            <label class="col-sm-2 col-md-2 control-label" for="">名称:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="update.name"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 col-md-2 control-label" for="">链接:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="update.moduleLink"></el-input>
                            </div>
                            <label class="col-sm-2 col-md-2 control-label" for="">权限标识:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="update.permissionCode"></el-input>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label">图标:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-input v-model="update.icon"></el-input>
                            </div>
                            <label class="col-sm-2 control-label">可见:</label>
                            <div class="col-sm-4 col-md-4">
                                <el-radio-group v-model="update.show">
                                    <el-radio class="radio" label="1">显示</el-radio>
                                    <el-radio class="radio" label="2">隐藏</el-radio>
                                </el-radio-group>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="col-sm-2 control-label"> 备注:</label>
                            <div class="col-sm-10 col-md-10">
                                <el-input type="textarea" :rows="2" placeholder="请输入内容" v-model="create.remark"></el-input>
                            </div>
                        </div>
                    </form>
                    <div slot="footer" class="dialog-footer">
                        <el-button @click="dialogUpdateVisible = false">取 消</el-button>
                        <el-button type="primary" :loading="updateLoading" @click="updateMenu">确 定</el-button>
                    </div>
                </el-dialog>
            </div>
        </div>
	</div>
</template>

<script>
	import api from './../../api/menu.js'
	export default {
	    props: ["isRefresh"],
	    data() {
	        return {
	            options: [],
	            create: {
	                parent: '',
	                name: '',
	                show: '1',
	                moduleLink: '',
	                icon: '',
	                remark: '',
	                permissionCode: ''
	            },
	            update: {
	                id: '',
	                parent: '',
	                name: '',
	                show: '1',
	                moduleLink: '',
	                icon: '',
	                remark: '',
	                permissionCode: ''
	            },
	            nextShow: false,
	            dialogCreateVisible: false, //创建对话框的显示状态
	            dialogUpdateVisible: false, //编辑对话框的显示状态
	            createLoading: false,
	            updateLoading: false,
	            showParent: '',
	            columns: [{
	                value: 'name',
	                label: '名称'
	            }, {
	                value: 'type',
	                label: '类型',
	                formatter: function(row, column, cellValue) {
	                    if(cellValue == 'M') {
	                        return '模块'
	                    }
	                    return '操作'
	                }
	            }, {
	                value: 'moduleLink',
	                label: '链接地址'
	            }, {
	                value: 'permissionCode',
	                label: '权限标识'
	            }], //表格列配置数据,{vlaue:对应数据对象中的属性，label：对应的是标题文字，className：对应的是列的样式类名}
	            tableData: [], //表格数据s
	            loading: true
	        }
	    },
	    activated() {
	        if(this.isRefresh) {
	            this.getMenus();
	        }
	    },
	    methods: {
			// 重置表单
	        reset() {
	            this.$refs.create.reset();
	        },
			// 获取日志列表
	        getMenus() {
	            this.loading = true;
	            api.queryMenuList().then((response) => {
	                var data = response.data;

	                this.tableData = data;
	                this.loading = false;
	            }).catch((response) => {
	                this.$message.error('错了哦，这是一条错误消息' + response.message);
	                this.loading = false;
	            });
	        },
	        createMenu() {
	            api.saveMenu(this.create).then((response) => {
	                var data = response.data;

	                if(data == 1) {
	                    this.$message.success('创建菜单成功！');
	                    this.dialogCreateVisible = false;
	                    this.createLoading = false;
	                    this.reset();
	                    this.getMenus();
	                }
	            }).catch(() => {
	                this.$message.error('创建菜单失败！');
	            });
	        },
	        deleteRow(index, rows) {
	            this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
	                confirmButtonText: '确定',
	                cancelButtonText: '取消',
	                type: 'warning'
	            }).then(() => {
	                api.deleteMenu({
	                    'id': rows[index].id
	                }).then((response) => {
	                    var data = JSON.parse(response.data);

	                    if(data.data == 1) {
	                        this.$message.success('删除成功！');
	                        rows.splice(index, 1);
	                    }
	                })
	            }).catch((response) => {
	                console.log(response);
	                this.$message({
	                    type: 'info',
	                    message: '已取消删除'
	                })
	            })
	        },
	        insertNextRow(index, rows) {
	            this.dialogCreateVisible = true;
	            this.nextShow = true;
	            this.showParent = rows[index].name;
	            this.create.parent = rows[index].id;
	        },
	        updateRow(index, rows) {
	            this.dialogUpdateVisible = true;
	            this.options.length = 0;
	            for(var i = 0; i < this.tableData.length; i++) {
	                this.options.push({
	                    'value': this.tableData[i].id,
	                    'label': this.tableData[i].name
	                });
	            }
	            this.update.parent = String(rows[index].parent);
	            this.update.id = rows[index].id;
	            this.update.name = rows[index].name;
	            this.update.show = String(rows[index].show);
	            this.update.moduleLink = rows[index].moduleLink;
	            this.update.icon = rows[index].icon;
	            this.update.remark = rows[index].remark;
	            this.update.permissionCode = rows[index].permissionCode;
	        },
	        updateMenu() {
	            api.updatedMenu(this.update).then((response) => {
	                var data = response.data;

	                if(data == 1) {
	                    this.$message.success('修改菜单成功！');
	                    this.dialogUpdateVisible = false;
	                    this.updateLoading = false;
	                    this.getMenus();
	                }
	            }).catch(() => {
	                this.$message.error('修改菜单失败！');
	            });
	        }
	    }
	}
</script>

<style>
	.el-select {
		width: 100%
	}
</style>
