<template>
    <el-dialog @open="resetAll" v-drag="{width:640,height:372}" :close-on-click-modal="false" :lock-scroll="true" title="车辆树显示设置" :visible.sync="configModalVisisble" width="640px" :before-close="cancleHandler">
        <!-- car state start -->
        <el-row>
            <el-col :span="24">
                <el-checkbox @change="stateCheckedEvent" v-model="stateChecked">按车辆状态分类</el-checkbox>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="2" :span="22">
                <el-radio-group @change="stateChangeEvent" v-model="statusType">
                    <el-radio :label="1">显示在线车辆</el-radio>
                    <el-radio :label="6">显示未知状态车辆</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <el-row>
            <el-col :offset="2" :span="22">
                <el-radio-group @change="stateChangeEvent" v-model="statusType">
                    <el-radio :label="5">显示离线车辆</el-radio>
                    <el-radio :label="7">显示报警车辆</el-radio>
                </el-radio-group>
            </el-col>
        </el-row>
        <!-- car state end -->
        <!-- car property start -->
        <el-row>
            <el-col :span="24">
                <el-checkbox @change="propertyCheckedEvent" v-model="propertyChecked">按车辆属性分类</el-checkbox>
            </el-col>
        </el-row>
        <el-row :style="{margin: '5px 0 10px 0'}">
            <el-col :offset="2" :span="22">
                <span>一级属性</span>
                <el-select @change="propertyChnageEvent(1)" size="small" popper-class="cus-select-class" v-model="levelOne" placeholder="请选择">
                    <el-option v-for="item in propertiesOne" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :style="{margin: '5px 0 10px 0'}">
            <el-col :offset="2" :span="22">
                <span>二级属性</span>
                <el-select @change="propertyChnageEvent(2)" size="small" v-model="levelTwo" placeholder="请选择">
                    <el-option v-for="item in propertiesTwo" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <el-row :style="{margin: '5px 0 10px 0'}">
            <el-col :offset="2" :span="22">
                <span>三级属性</span>
                <el-select @change="propertyChnageEvent(3)" size="small" v-model="levelThree" placeholder="请选择">
                    <el-option v-for="item in propertiesThree" :disabled="item.disabled" :key="item.value" :label="item.label" :value="item.value">
                    </el-option>
                </el-select>
            </el-col>
        </el-row>
        <!-- car property end -->
        <span slot="footer" class="dialog-footer">
            <el-button size="mini" @click="cancleHandler">取 消</el-button>
            <el-button size="mini" type="success" @click="saveTreeConfig">保 存</el-button>
        </span>
    </el-dialog>
</template>


<script>
    const PROPERTY_ENUM = ['org', 'carmodel', 'producedate']
    const CAR_PROPERTY = [{
        value: '',
        label: '请选择',
        disabled: false
    },
    {
        value: 'org',
        label: '组织',
        disabled: false
    },
    {
        value: 'carmodel',
        label: '车型',
        disabled: false
    },
    {
        value: 'producedate',
        label: '生产年份',
        disabled: false
    }]

    import configApi from 'api/monitor'
    export default {
        data() {
            return {
                isUpdate: false,
                configModalVisisble: false,
                propertiesOne: [],
                propertiesTwo: [],
                propertiesThree: [],
                stateChecked: false,
                statusType: 0,
                propertyChecked: false,
                levelOne: '',
                levelTwo: '',
                levelThree: ''
            }
        },
        // 子组件使用父组件数据
        props: [
            'treeConfigVisible'
        ],
        created() {
            var that = this

            this.$nextTick(function(){
                that.queryTreeConfig().then(() => {
                    that.rebuildTree()
                })
            })
        },
        methods: {
            requestSave() {
                let that = this
                let param = {
                    carAttr: that.levelOne + ',' + that.levelTwo + ',' + that.levelThree,
                    carAttrEnable: this.propertyChecked == true ? 1 : 0,
                    // 0：全部，1：行驶在线，3：停车在线，5：离线，6：未知，7：报警车辆
                    statusType: that.statusType,
                    statusTypeEnable: this.stateChecked == true ? 1 : 0
                }

                that.configModalVisisble = false
                configApi.saveOrUpdateTreeConfig(this.isUpdate, param).then(response => {
                    that.showMsg(response.message, 'success')
                    if (response.code === 200) {
                        this.rebuildTree()
                        this.configModalVisisble = false
                    }
                }).catch(error => {
                    that.showMsg(error.message)
                })
            },
            rebuildTree() {
                if(this.propertyChecked){
                    this.$emit('loadTreeByConfig', 1)
                }else{
                    this.$emit('loadTreeByConfig', 0)
                }
            },
            saveTreeConfig() {
                let that = this

                if (this.validateProperty()) {
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
            queryTreeConfig() {
                let that = this

                return configApi.queryTreeConfig().then((response) => {
                    let config = response.data

                    if(!config) {
                        return
                    }
                    this.isUpdate = true
                    if (config.carAttrEnable == 1) {
                        that.propertyChecked = true
                    }
                    if (config.statusTypeEnable == 1) {
                        that.stateChecked = true
                    }
                    this.statusType = config.statusType

                    let tempProperties = config.carAttr.split(',')

                    this.levelOne = tempProperties[0]
                    this.levelTwo = tempProperties[1]
                    this.levelThree = tempProperties[2]

                    this.propertiesOne = this.disableProperty([this.levelTwo, this.levelThree], this.propertiesOne)
                    this.propertiesTwo = this.disableProperty([this.levelOne, this.levelThree], this.propertiesTwo)
                    this.propertiesThree = this.disableProperty([this.levelOne, this.levelTwo], this.propertiesThree)

                }).catch(err => {
                    that.showMsg(err.message)
                });
            },
            resetAll() {
                this.stateChecked = false
                this.propertyChecked = false
                this.resetState()
                this.resetProperty()
                this.initProperties()

                this.queryTreeConfig()
            },
            resetProperty() {
                this.initProperties()
                this.levelOne = ''
                this.levelTwo = ''
                this.levelThree = ''
            },
            resetState() {
                this.statusType = 0
            },
            initProperties() {
                this.propertiesOne = []
                this.propertiesTwo = []
                this.propertiesThree = []
                for (let i = 0; i < CAR_PROPERTY.length; i++) {
                    this.propertiesOne.push(CAR_PROPERTY[i])
                    this.propertiesTwo.push(CAR_PROPERTY[i])
                    this.propertiesThree.push(CAR_PROPERTY[i])
                }
            },
            cancleHandler() {
                this.configModalVisisble = false
            },
            resetPropertyChecked(val) {
                if (this.levelOne == '' && this.levelTwo == '' && this.levelThree == '') {
                    this.propertyChecked = false
                } else if (!this.propertyChecked && val != 0) {
                    this.propertyChecked = true
                }
            },
            validateProperty() {
                let ok = true

                if(this.propertyChecked) {
                    if (this.levelOne == '') {
                        this.showMsg('请选择第一级属性！')
                        ok = false
                    } else if (this.levelTwo == '') {
                        this.showMsg('请选择第二级属性！')
                        ok = false
                    } else if (this.levelThree == '') {
                        this.showMsg('请选择第三级属性！')
                        ok = false
                    }
                }

                return ok
            },
            enableProperty(val, properties) {
                for (let i = 0; i < properties.length; i++) {
                    if (val == properties[i].value) {
                        properties[i].disabled = false
                    }
                }
            },
            disableProperty(vals, properties) {
                for (let i = 0; i < properties.length; i++) {
                    if (properties[i].value == 0) {
                        continue
                    }
                    for (let j = 0; j < vals.length; j++) {
                        if (properties[i].value == vals[j]) {
                            properties[i].disabled = true
                        }
                    }
                }
                return properties
            },
            stateCheckedEvent() {
                if (!this.stateChecked) {
                    this.resetState()
                } else {
                    this.statusType = 1
                }
            },
            propertyCheckedEvent() {
                if (!this.propertyChecked) {
                    this.resetProperty()
                }
            },
            stateChangeEvent() {
                if (this.statusType != 0) {
                    this.stateChecked = true
                }
            },
            propertyChnageEvent(level) {
                let val = ''

                if (level != 1 && this.levelOne == '') {
                    this.showMsg('请选择第一级属性！')
                    this.resetProperty()
                    return
                }
                if (level == 1) {
                    val = this.levelOne
                    // 修改时，若修改了一级，二三级自动调整为“请选择”
                    this.levelTwo = ''
                    this.levelThree = ''
                    this.propertiesTwo = this.disableProperty([this.levelOne, this.levelThree], this.propertiesTwo)
                    this.propertiesThree = this.disableProperty([this.levelOne, this.levelTwo], this.propertiesThree)
                } else if (level == 2) {
                    val = this.levelTwo
                    // 若修改了第二级，第三级自动勾选剩余的一个
                    if(this.levelThree == '') {
                        this.levelThree = this.filter([this.levelOne, this.levelTwo])[0]
                    }

                    this.propertiesOne = this.disableProperty([this.levelTwo, this.levelThree], this.propertiesOne)
                    this.propertiesThree = this.disableProperty([this.levelOne, this.levelTwo], this.propertiesThree)
                } else if (level == 3) {
                    val = this.levelThree
                    this.propertiesOne = this.disableProperty([this.levelTwo, this.levelThree], this.propertiesOne)
                    this.propertiesTwo = this.disableProperty([this.levelOne, this.levelThree], this.propertiesTwo)
                }
                this.resetPropertyChecked(val)
            },
            filter(src) {
                return PROPERTY_ENUM.filter(key => !src.includes(key))
            },
            showMsg(message, type) {
                this.$message({
                    type: typeof type == 'undefined' ? 'error' : 'success',
                    duration: 1500,
                    showClose: true,
                    message: message
                });
            }
        },
        watch: {
            levelOne(newVal, oldVal) {
                if (newVal != oldVal && newVal == '') {
                    this.enableProperty(oldVal, this.propertiesTwo)
                    this.enableProperty(oldVal, this.propertiesThree)
                }
            },
            levelTwo(newVal, oldVal) {
                if (newVal != oldVal && newVal == '') {
                    this.enableProperty(oldVal, this.propertiesOne)
                    this.enableProperty(oldVal, this.propertiesThree)
                }
            },
            levelThree(newVal, oldVal) {
                if (newVal != oldVal && newVal == '') {
                    this.enableProperty(oldVal, this.propertiesOne)
                    this.enableProperty(oldVal, this.propertiesTwo)
                }
            },
            configModalVisisble(newVal, oldVal) {
                if (oldVal != newVal) {
                    this.$emit('resetTreeConfigVsible', newVal)
                }
            },
            treeConfigVisible(newVal, oldVal) {
                if (oldVal != newVal) {
                    this.configModalVisisble = newVal
                }
            }
        },
        mounted() {
            this.initProperties()
        }
    }
</script>
