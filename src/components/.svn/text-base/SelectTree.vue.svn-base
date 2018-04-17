<template>
    <el-row>
        <el-popover
            ref="orgTreePop"
            @show="resetValues"
            placement="bottom-start"
            :width="defaultWidth"
            :v-model="showPopover"
            :trigger="trigger">
            <el-row v-show="showSearch">
                <el-input @keyup.native="searchCallback" v-model="searchValue"
                            v-bind:style="{width: '178px'}" prefix-icon="el-icon-search">
                </el-input>
            </el-row>
            <el-row>
                <EasyScrollbar :barOption="barOption">
                    <div v-bind:style="{maxHeight: '260px', minHeight: '260px'}">
                        <ztree treeId="orgTree" ref="orgTreeRef"
                            :onClick="onClick"
                            :onCheck="onCheck"
                            asyncEnable="false"
                            :nodes="nodes"
                            :enableCheck="enableChecked"
                            :chkboxType="chkboxType"
                            :search="false">
                        </ztree>
                    </div>
                </EasyScrollbar>
            </el-row>
        </el-popover>
        <el-input type="text" :clearable="true" @clear="clearValues" v-bind:style="{width:'182px'}" readonly="readonly" v-model="selectText" v-popover:orgTreePop :placeholder="placeholder" >
        </el-input>
    </el-row>
</template>

<style lang="" scoped>

</style>

<script>
    import ztree from './ZTree'
    import HashMap from 'hashmap'

    export default {
        components: {
            ztree
        },
        props: [
            'width',            // 宽度
            'trigger',          // 触发方式 click/focus/hover/manual
            'data',             // 节点数据
            'showSearch',       // 是否显示搜索，true：显示，false：不显示
            'searchCallback',   // 搜索回调
            'placeholder',      // 输入框提示信息
            'textKey',          // 标记组织名称所对应的属性名
            'idKey',            // 标记组织ID所对应的属性名
            'multiSelect',      // 是否支持多选，true：支持、false：不支持
            'multiSpilt',       // 多选分隔符，默认为英文半角逗号
            'selectCallback'    // 选中时的回调，用户给父组件返回节点数据
        ],
        methods: {
            // 弹出框显示时，重置数据及树勾选
            resetValues() {
                // 清空树勾选
                this.$refs.orgTreeRef.checkAllNodes(false)
                // 设置输入框值
                this.setText()
                // 重新勾选
                let keys = this.multiValues.keys()
                let nodes = this.$refs.orgTreeRef.getAllNodes()

                console.log('nodes.length = ' + nodes.length)
                for(let i = 0; i < keys.length; i++) {
                    for(let j = 0; j < nodes.length; j++) {
                        console.log(nodes[j][this.idKey] + ' = ' + keys[i])
                        if(nodes[j][this.idKey] == keys[i]) {
                            nodes[j].checked = true
                            this.$refs.orgTreeRef.updateNode(nodes[j], false)
                        }
                    }
                }
            },
            // 点击输入框清空时清楚数据
            clearValues() {
                // 清空树勾选
                this.$refs.orgTreeRef.checkAllNodes(false)
                // 清楚缓存数据
                this.multiValues.clear()
            },
            setText() {
                let that = this

                that.selectText = ''
                this.multiValues.forEach(function(item, key) {
                    if(key != 0 || key != '0') {
                        if(that.selectText != '') {
                            if(that.multiSpilt) {
                                that.selectText += that.multiSpilt
                            } else {
                                that.selectText += ','
                            }
                        }
                        that.selectText += item.value
                    }
                })
                console.log(this.selectText)
            },
            // 节点勾选事件
            onCheck(event, treeId, treeNode) {
                let id = treeNode[this.idKey]
                let text = treeNode[this.textKey]

                if(treeNode.checked == true) {
                    if(!this.multiValues.has(id)) {
                        this.multiValues.set(id, {key: id, value: text})
                    }
                } else {
                    if(this.multiValues.has(id)) {
                        this.multiValues.remove(id)
                    }
                }
                this.setText()
                return true
            },
            // 节点单击事件
            onClick(event, treeId, treeNode) {
                // 多选是单击事件不可用
                if(this.multiSelect == true) {
                    return true
                } else {
                    let id = treeNode[this.idKey]
                    let text = treeNode[this.textKey]

                    this.selectText = text
                    if(this.selectCallback) {
                        this.selectCallback([{key: id, value: text}])
                    }
                }
                return true
            }
        },
        beforeMount() {
            this.nodes = this.data
            if(this.multiSelect == true) {
                this.enableChecked = true
            }
            if(this.width) {
                this.defaultWidth = this.width
            }
        },
        data() {
            return {
                nodes: [],          // 节点数据
                defaultWidth: 240,  // 弹出框宽度
                chkboxType: {'Y': '', 'N': ''},
                showPopover: false, // 弹出框可见状态
                searchValue: '',    // 搜索框输入的值
                selectId: '',       // 所选数据的唯一标识值(可通过idKey指定)
                selectText: '',     // 所选节点的字面值，一般是节点的name属性(可通过textKey指定)
                barOption: {        // 滚动条配置项
                    barWidth: 7,
                    zIndex: 1000
                },
                multiValues: new HashMap(),
                enableChecked: false
            }
        }
    }
</script>
