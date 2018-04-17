<template>
  <div>
      <el-popover
        ref="focusorgtree"
        placement="bottom-start"
        width="200"
        trigger="click">

        <el-row>
            <el-input v-bind:style="{width: '178px'}" prefix-icon="el-icon-search" clearable>
            </el-input>
        </el-row>
        <el-row>
            <EasyScrollbar :barOption="barOpt">
                <div v-bind:style="{maxHeight: '250px'}">
                    <v-tree ref='orgtree' :data='focusOrgData' :multiple='false' :tpl='tplorg' />
                </div>
            </EasyScrollbar>
        </el-row>
    </el-popover>
    <el-input v-model="orgname" v-popover:focusorgtree auto-complete="off" placeholder="请输入..." clearable></el-input>
  </div>
</template>
<script>
    import api from 'api/carManage'
    export default {
        props: ["orgname", "treedata"],
        data() {
            return {
                focusOrgData: [],
                barOpt: {
                    barWidth: 7,
                    zIndex: 1083
                }
            }
        },
        created(){
            // this.getOrgTreeData()
            this.focusOrgData = this.treedata
        },
        methods: {
            tplorg (node, ctx) {
                let titleClass = node.selected ? 'node-title node-selected' : 'node-title'

                if (node.searched) {
                    titleClass += ' node-searched'
                }

                return <span>

                    <i class="fa fa-home" style="font-size:14px;color:#409EFF;"></i>

                    <span class={titleClass} domPropsInnerHTML={node.name} onClick={() => {

                        ctx.parent.nodeSelected(ctx.props.node)
                        var selectNodeArr = ctx.parent.getSelectedNodes();

                        var obj = {name: selectNodeArr[0].name, id: selectNodeArr[0].uuid}

                        this.$emit("searOrgInputProp", obj)

                    }}></span>

                </span>
            },
            async asyncLoad (node) {
                // method1:
                // this.$refs.tree.addNodes(node, await this.$api.demo.getChild()
                // method2:
                this.$set(node, 'loading', true)
                let data = await this.$api.demo.getChild()

                this.$set(node, 'children', data)
                this.$set(node, 'loading', false)
                // method3: use concat
            }

        },
        getOrgTreeData(){
            api.getOrgTree().then((response) =>{
                if (response.code === 200){
                    this.focusOrgData = response.data;
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
    }
</script>

