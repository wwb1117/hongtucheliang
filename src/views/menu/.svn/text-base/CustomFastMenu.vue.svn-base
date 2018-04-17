<template>
    <li class="hidden-xs">
        <a @click="visible = true" title="设置快捷菜单">
            <small><font><i class="fa fa-gears"></i></font></small>
        </a>
        <el-dialog title="设置快捷菜单" size="tiny" :visible.sync="visible" :modal-append-to-body="false" :lock-scroll="false" @close="visible = false" @open="getMenuList();getUserCustom()">
            <form class="form-horizontal" role="form">
                <div class="form-group">
                    <div class="col-sm-12">
                        <el-tree :data="menuList" node-key="id" ref="tree" :props="defaultProps" accordion :check-strictly="true" :show-checkbox="true">
                        </el-tree>
                    </div>
                </div>
            </form>
            <span slot="footer" class="dialog-footer">
                <el-button size="small" @click="visible = false">取 消</el-button>
                <el-button size="small" @click="saveCustomMenu()" type="primary">保存</el-button>
            </span>
        </el-dialog>
    </li>
</template>

<script>
    import menu from 'api/menu'
    import userCustom from 'api/userCustom'
    export default {
        name: 'customFastMenu',
        data() {
            return {
                visible: false,
                menuList: [],
                userCustom:{},
                defaultProps: {
                    children: 'children',
                    label: 'name',
                    disabled:function(data){
                        if(data.childCount > 0){
                            return true
                        }
                        return false
                    }
                }
            };
        },
        methods: {
            getUserCustom(){
                userCustom.getUserCustom().then((response) =>{
                    if (response.code === 200){
                        // 设置默认选中
                        if(response.data !== null){
                            this.userCustom = response.data
                            let userCustomeMenuIds = JSON.parse(this.userCustom.userData)['userCustomMenuIds'].split(',')
                            this.$refs.tree.setCheckedKeys(userCustomeMenuIds)
                        }

                    }
                }).catch(err =>{
                    this.$message.error('查询用户自定义菜单失败' + err);
                });

            },
            getModuleList(){
                let userId = JSON.parse(sessionStorage.getItem('user')).id

                menu.getModuleList(userId).then((response) =>{
                    if (response.code === 200){
                        this.menuList = response.data;
                    }
                }).catch(err =>{
                    console.log(err);
                });
            },
            saveCustomMenu() {
                let customMenuIds = this.$refs.tree.getCheckedKeys()

                if(customMenuIds.length == 0){
                    this.$message('请选择菜单');
                    return
                }

                let param = {}

                // 如果是修改
                if(this.userCustom.id){
                    param.id = this.userCustom.id
                    let userDataTemp = JSON.parse(this.userCustom.userData)

                    userDataTemp['userCustomMenuIds'] = customMenuIds.join(",")
                    param['userData'] = JSON.stringify(userDataTemp)
                }else{
                    let userData = {"userCustomMenuIds":customMenuIds.join(",")}

                    param['userData'] = JSON.stringify(userData)
                }

                userCustom.saveUserCustom(param).then((response) =>{
                    if (response.code === 200){
                        this.$message.success('保存成功');
                        this.visible = false
                    }
                }).catch(err =>{
                    this.$message.error('保存失败' + err);
                });

            }
        }
    }
</script>

