/*
 * File: ZTree.vue
 * Project: ht-ui
 * File Created: 2018-04-03
 * Author: daijiang@hopechart.com
 * Copyright Daij
 */
<template>
    <div>
        <el-row v-show="search">
            <el-col :span="24">
                <el-autocomplete size="small" :maxlength="20" :minlength="1" :debounce="300" value-key="name"
                    clearable placeholder="请输入查询条件" v-model="searchParamVal" class="input-with-select autocomplete-mg"
                    :fetch-suggestions="responseQuerySuggestions" @select="responseSelectHandler" >
                    <el-select v-model="searchParam"  :placeholder="searchParamLabel" slot="prepend" @change="searchParamChangeHandler">
                        <el-option v-for="param in searchParams" :key="param.value" :label="param.label" :value="param.value">
                        </el-option>
                    </el-select>
                    <el-button slot="append" @click="doSearch" style="font-weight: bold; margin-left:3px;" icon="el-icon-search"></el-button>
                </el-autocomplete>
            </el-col>
        </el-row>
        <el-row>
            <el-col :span="24">
                <div class="ztree" :id="treeId" nodes="nodes"></div>
            </el-col>
        </el-row>
    </div>
</template>

<style lang="" scoped>
    .el-select .el-input {
        width: 130px !important;
    }
    .el-row-div {
        width: 100% !important;
    }
    .autocomplete-mg {
        margin-left: 3px;
        margin-top: 3px;
        margin-bottom: 3px;
    }
</style>

<script>
    // import HashMap from 'hashmap'

    function log(o) {
        let con = console || window.console

        if(con && con.log) {
            con.log(o)
        }
    }

    const SUPPORTS_CALLBACK = [
        'beforeAsync',      // 用于捕获异步加载之前的事件回调函数，zTree 根据返回值确定是否允许进行异步加载
        'beforeCheck',      // 用于捕获 勾选 或 取消勾选 之前的事件回调函数，并且根据返回值确定是否允许 勾选 或 取消勾选,
        'beforeClick',      // 用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作
        'beforeCollapse',   // 用于捕获父节点折叠之前的事件回调函数，并且根据返回值确定是否允许折叠操作
        'beforeExpand',     // 用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
        'beforeRightClick', // 用于捕获 zTree 上鼠标右键点击之前的事件回调函数，并且根据返回值确定触发 onRightClick 事件回调函数

        'onAsyncError',     // 用于捕获异步加载出现异常错误的事件回调函数。如果设置了 setting.callback.beforeAsync 方法，且返回 false，将无法触发 onAsyncSuccess / onAsyncError 事件回调函数
        'onAsyncSuccess',   // 用于捕获异步加载正常结束的事件回调函数
        'onCheck',          // 用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
        'onClick',          // 用于捕获节点被点击的事件回调函数
        'onCollapse',       // 用于捕获节点被折叠的事件回调函数
        'onExpand',         // 用于捕获节点被展开的事件回调函数
        'onRightClick'      // 用于捕获 zTree 上鼠标右键点击之后的事件回调函数
    ]

    export default {
        computed: {

        },
        data() {
            return {
                v: '1.0.1',
                searchLoding: false,
                searchItems: [],
                // 搜索参数label
                searchParamLabel: '',
                // 搜索参数
                searchParam: '',
                // 搜索值
                searchParamVal: '',

                ztree: null,
                customSetting: {
                    data: {
                        // 声明简单数据类型
                        simpleData: {
                            enable: true,
                            idKey: "id",
                            pIdKey: "pId",
                            rootPId: "-1"
                        }
                    },
                    async: {
                        enable: false,
                        contentType: "application/x-www-form-urlencoded",
                        type: "post",
                        dataType: "text",
                        url: "",
                        // 异步请求时的参数(等号左边是参数值，node上应该要有该属性，右边是传递给服务器的参数名)，例如[pId=paramName]
                        autoParam: [],
                        otherParam: [],
                        dataFilter: null
                    },
                    check: {
                        enable: false,
                        autoCheckTrigger: false,
                        // radio or checkbox
                        chkStyle: 'checkbox',
                        nocheckInherit: false,
                        chkDisabledInherit: false,
                        radioType: 'level',
                        chkboxType: {
                            "Y": "ps",
                            "N": "ps"
                        }
                    },
                    callback: {
                        onClick(event, treeId, clickFlag) {
                            log(clickFlag)
                        }
                    },
                    view: {
                        addDiyDom: null,
                        autoCancelSelected: true,
                        dblClickExpand: true,
                        expandSpeed: "fast",
                        fontCss: {},
                        nameIsHTML: false,
                        selectedMulti: true,
                        showIcon: true,
                        showLine: true,
                        showTitle: true,
                        txtSelectedEnable: false
                    }
                },
                defaultCallback: {
                }
                // bindedEvents: new HashMap()
            }
        },
        props: [

            'manualInit',                 // 手动初始化树 true：手动，false：自动

            // 基础配置属性
            'treeId',                   // 挂载元素ID
            'setting',                  // ZTree配置信息
            'nodes',                    // 节点信息
            'enableCheck',              // 开启勾选
            'chkStyle',                 // 复选框样式 checkbox or radio，默认checkbox，切enableCheck = true有效
            'chkboxType',               // 勾选时，父子节点级联关系

            // 搜索部分
            'search',                   // 是否显示搜索框 true：显示，false：不显示
            'searchParams',             // 搜索条件[{value: 1, label:'车牌号', default: true}, {value:2, label:'终端号', default：false}]
            'searchType',               // local：静态数据，remote：远程请求
            'searchUrl',                // 远程请求的url
            'searchHandler',            // 请求数据句柄函数
            'searchSelectRsHandler',    // 选中查询结果的句柄函数

            // 异步配置
            'asyncEnable',      // 开启异步，默认不开启
            'asyncUrl',         // 异步请求url
            'asyncMethod',      // 异步请求类型，默认post
            'asyncAutoParam',   // 异步加载时需要自动提交父节点属性的参数
            'asyncOtherParam',  // Ajax 请求提交的静态参数键值对
            // 'asyncDynamicUrl',  // 是否支持动态Url，true：支持；false：不支持。如果true，则需要配置asyncDynamicUrlHandler
            // 'asyncDynamicUrlHandler',   // 动态获取url的句柄函数

            // 回调事件
            'beforeAsync',      // 用于捕获异步加载之前的事件回调函数，zTree 根据返回值确定是否允许进行异步加载
            'beforeCheck',      // 用于捕获 勾选 或 取消勾选 之前的事件回调函数，并且根据返回值确定是否允许 勾选 或 取消勾选,
            'beforeClick',      // 用于捕获单击节点之前的事件回调函数，并且根据返回值确定是否允许单击操作
            'beforeCollapse',   // 用于捕获父节点折叠之前的事件回调函数，并且根据返回值确定是否允许折叠操作
            'beforeExpand',     // 用于捕获父节点展开之前的事件回调函数，并且根据返回值确定是否允许展开操作
            'beforeRightClick', // 用于捕获 zTree 上鼠标右键点击之前的事件回调函数，并且根据返回值确定触发 onRightClick 事件回调函数

            'onAsyncError',     // 用于捕获异步加载出现异常错误的事件回调函数。如果设置了 setting.callback.beforeAsync 方法，且返回 false，将无法触发 onAsyncSuccess / onAsyncError 事件回调函数
            'onAsyncSuccess',   // 用于捕获异步加载正常结束的事件回调函数
            'onCheck',          // 用于捕获 checkbox / radio 被勾选 或 取消勾选的事件回调函数
            'onClick',          // 用于捕获节点被点击的事件回调函数
            'onCollapse',       // 用于捕获节点被折叠的事件回调函数
            'onExpand',         // 用于捕获节点被展开的事件回调函数
            'onRightClick',     // 用于捕获 zTree 上鼠标右键点击之后的事件回调函数

            // 自定义函数
            'asyncDataFilter'   // 自定义异步数据预处理函数
        ],
        created() {
        },
        watch: {
            customSetting(newVal, oldVal) {
                if(newVal != oldVal) {
                    log('配置变更：' + JSON.stringify(newVal))
                }
            }
        },
        beforeMount() {
            this.initSetting()
            this.setSearchParamLabel()
        },
        mounted() {
            if(typeof this.manualInit == 'undefined' || this.manualInit == 'false' || this.manualInit == false) {
                this.initTree()
            }

        },
        methods: {
            // 搜索条件类型变化时触发
            searchParamChangeHandler() {
                this.searchParamVal = ''
            },
            // 返回输入建议
            responseQuerySuggestions(qu, callback) {
                let executeCallback = function(data) {
                    callback(data)
                }

                // 执行用户自定义回调，type: 参数类型(车牌、终端...), value: '陕AB1000'， callback(查询结果)
                this.searchHandler(this.searchParam, this.searchParamVal, executeCallback)

            },
            // 搜索结果被选中时调用
            responseSelectHandler(data) {
                log(data)

                this.searchSelectRsHandler(data.id)
            },
            // 触发搜索动作
            doSearch() {
                if(this.searchParamVal != "") {
                    log('查询类型：' + this.searchParam + ", 参数值：" + this.searchParamVal)
                    this.searchHandler(this.searchParam, this.searchParamVal)
                }
            },
            // 设置搜索条件标题信息
            setSearchParamLabel() {
                let searchParamLabel = ''

                log(this.searchParams)
                if(this.searchParams && this.searchParams.length > 0) {
                    this.searchParams.forEach(e => {
                        if(e.default == true) {
                            searchParamLabel = e.label
                        }
                    })
                }
                this.searchParamLabel = searchParamLabel
            },

            // 设置自动提交的参数
            setAutoParam(param) {
                this.customSetting.async.autoParam = param
            },
            // 设置其他参数信息
            setotherParam(param) {
                this.customSetting.async.otherParam = param
            },
            // 获取配置信息
            getSetting() {
                return this.customSetting
            },
            // 初始化设置信息
            initSetting() {
                if(!this.nodes.length || this.nodes.length == 0) {
                    throw Error('节点数据为空')
                }

                Object.assign(this.customSetting, this.setting == 'undefined' ? {} : this.setting)
                if(this.asyncEnable && (this.asyncEnable == 'true' || this.asyncEnable == true)) {
                    this.customSetting.async.enable = this.asyncEnable
                    if(this.asyncUrl) {
                        this.customSetting.async.url = this.asyncUrl
                    }

                    if(this.asyncMethod) {
                        this.customSetting.async.type = this.asyncMethod
                    }
                    if(this.asyncAutoParam) {
                        this.customSetting.async.autoParam = this.asyncAutoParam
                    }
                    if(this.asyncOtherParam) {
                        this.customSetting.async.otherParam = this.asyncOtherParam
                    }
                }

                if(this.enableCheck == true || this.enableCheck == 'true') {
                    this.customSetting.check.enable = true
                    if(this.chkStyle && (this.chkStyle == 'radio' || this.chkStyle == 'checkbox')) {
                        this.customSetting.check.chkStyle = this.chkStyle
                    }

                    if(this.chkboxType) {
                        this.customSetting.chkboxType = this.chkboxType
                    }
                }

                // 自定义异步数据预处理函数
                let filterHandler = function() {}

                if(this.asyncDataFilter) {
                    filterHandler = this.asyncDataFilter
                } else {
                    filterHandler = this.defaultAsyncDataFilter
                }
                this.customSetting.async.dataFilter = filterHandler

                if(this.beforeAsync) {
                    this.bindEvent('beforeAsync', this.beforeAsync)
                }
                if(this.beforeCheck) {
                    this.bindEvent('beforeCheck', this.beforeCheck)
                }
                if(this.beforeClick) {
                    this.bindEvent('beforeClick', this.beforeClick)
                }
                if(this.beforeCollapse) {
                    this.bindEvent('beforeCollapse', this.beforeCollapse)
                }
                if(this.beforeExpand) {
                    this.bindEvent('beforeExpand', this.beforeExpand)
                }
                if(this.beforeRightClick) {
                    this.bindEvent('beforeRightClick', this.beforeRightClick)
                }
                if(this.onAsyncError) {
                    this.bindEvent('onAsyncError', this.onAsyncError)
                }
                if(this.onAsyncSuccess) {
                    this.bindEvent('onAsyncSuccess', this.onAsyncSuccess)
                }
                if(this.onCheck) {
                    this.bindEvent('onCheck', this.onCheck)
                }
                if(this.onClick) {
                    this.bindEvent('onClick', this.onClick)
                }
                if(this.onCollapse) {
                    this.bindEvent('onCollapse', this.onCollapse)
                }
                if(this.onExpand) {
                    this.bindEvent('onExpand', this.onExpand)
                }
                if(this.onRightClick) {
                    this.bindEvent('onRightClick', this.onRightClick)
                }
            },
            // 初始化
            initTree() {
                log(this.customSetting)
                this.ztree = $.fn.zTree.init($("#" + this.treeId), this.customSetting, this.nodes)
            },
            // 设置异步请求的URL
            setAsyncUrl(url) {
                Object.assign(this.customSetting, {async: {url: url}})
            },
            // 设置异步请求开关
            setAsyncEnable(enable) {
                Object.assign(this.customSetting, {async: {enable: enable}})
            },
            // 设置是否允许勾选
            setCheckEnable(enable) {
                Object.assign(this.customSetting, {check: {enable: enable}})
            },
            // 验证事件名是否支持
            validateEvent(eventName) {
                let support = false

                for(let i = 0; i < SUPPORTS_CALLBACK.length; i++) {
                    if(SUPPORTS_CALLBACK[i] == eventName) {
                        support = true
                        break
                    }
                }
                return support
            },
            // 默认的异步数据预处理函数
            defaultAsyncDataFilter(treeId, parentNode, response) {
                if(response && response.code == 200) {
                    return response.data
                }
                return []
            },
            // 绑定回调事件
            bindEvent(eventName, handler) {

                if(this.validateEvent(eventName)) {
                    if(eventName == 'beforeAsync' || eventName == 'beforeCheck' || eventName == 'beforeCollapse' ||
                        eventName == 'beforeExpand' || eventName == 'beforeRightClick') {
                        this.customSetting.callback[eventName] = (treeId, treeNode) => {
                            handler(treeId, treeNode)
                        }
                    } else if(eventName == 'beforeClick') {
                        this.customSetting.callback[eventName] = (treeId, treeNode, clickFlag) => {
                            handler(treeId, treeNode, clickFlag)
                        }
                    } else if(eventName == 'onAsyncError') {
                        this.customSetting.callback[eventName] = (event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown) => {
                            handler(event, treeId, treeNode, XMLHttpRequest, textStatus, errorThrown)
                        }
                    }  else if(eventName == 'onAsyncSuccess') {
                        this.customSetting.callback[eventName] = (event, treeId, treeNode, msg) => {
                            handler(event, treeId, treeNode, msg)
                        }
                    } else if(eventName == 'onCheck' || eventName == 'onCollapse' || eventName == 'onExpand' ||
                        eventName == 'onRightClick') {
                        this.customSetting.callback[eventName] = (event, treeId, treeNode) => {
                            handler(event, treeId, treeNode)
                        }
                    } else if(eventName == 'onClick') {
                        this.customSetting.callback[eventName] = (event, treeId, treeNode, clickFlag) => {
                            handler(event, treeId, treeNode, clickFlag)
                        }
                    }

                    // this.bindedEvents.set(eventName, handler)
                } else {
                    throw new Error('事件' + eventName + '不被支持')
                }
            },
            // 解除绑定
            /*
            removeBuildEvent(eventName) {
                if(this.bindedEvents.has(eventName)) {
                    this.bindedEvents.remove(eventName)
                    log('解除事件绑定，事件名：' + eventName)
                }
            },
            */

            // 解除所有绑定事件
            /*
            removeAllEvent() {
                this.bindedEvents.clear()
            },
            // 拦截回调
            interceptCallback() {
                let events = this.bindedEvents

                events.forEach((value, key) => {
                    this.customSetting.callback[key] = value
                })
            },
            */

            /******************************************************************************************/
            /*               ZTree内部方法，父组件可通过$refs.functionName(params)方式调用               */
            /******************************************************************************************/

            /**
             * @description 根据ID获取ztree对象
             * @param treeId zTree 的 DOM 容器的 id
             * @returns zTree 对象，提供操作 zTree 的各种方法，对于通过 js 操作 zTree 来说必须通过此对象
             */
            getZtreeObjById(treeId) {
                return $.fn.zTree.getZTreeObj(treeId)
            },

            /**
             * @description 根据ID获取ztree对象
             * @returns * @returns zTree 对象，提供操作 zTree 的各种方法，对于通过 js 操作 zTree 来说必须通过此对象
             */
            getZtreeObj() {
                return $.fn.zTree.getZTreeObj(this.treeId)
            },

            /**
             * @description 根据 zTree 的唯一标识 tId 快速获取节点
             * @param tId 节点ID
             * @returns tId 对应的节点 JSON 数据对象。如无结果，返回 null
             */
            getNodeByTId(tId) {
                return this.getZtreeObj().getNodeByTId(tId)
            },

            /**
             * @description 获取 zTree 的全部节点数据
             * @returns 全部节点数据
             */
            getNodes() {
                return this.getZtreeObj().getNodes()
            },

            /**
             * @description 获取所有子节点
             * @param nodes 存储所有节点的集合Array
             * @param node 当前节点
             * @param filterType 带过滤的节点类型
             * @returns 全部节点数据
             */
            getChildren(nodes, node, filterType) {
                if (typeof node.nodeType != 'undefined' && node.nodeType != filterType) {
                    nodes.push(node);
                }
                if (node.isParent) {
                    for (var obj in node.children) {
                        this.getChildren(nodes, node.children[obj], filterType);
                    }
                }
                return nodes
            },

            /**
             * @description 递归获取全部节点
             * @returns 全部节点数据
             */
            getAllNodes() {
                return this.getLeafNodes()
            },

            /**
             * @description 获取所有叶子节点
             */
            getLeafNodes() {
                return this.getZtreeObj().getNodesByFilter(function (node) {
                    return typeof node.children == 'undefined' ||
                        node.children.length == 0 ||
                        node.children === null;
                })
            },

            /**
             * @description 根据自定义规则搜索节点数据 JSON 对象集合 或 单个节点数据
             * @param filterFun 自定义过滤器函数 参数：node， 返回值：boolean (true 表示符合搜索条件；false 表示不符合搜索条件)
             * @param isSingle true 表示只查找单个节点，  false 表示查找节点集合
             * @param parentNode 可以指定在某个父节点下的子节点中搜索 忽略此参数，表示在全部节点中搜索
             * @param invoke 用户自定义的数据对象，用于 filter 中进行计算
             * @returns isSingle = true 返回 第一个找到的节点数据 JSON，无结果时返回 null
             *          isSingle = false 返回 节点数据集合 Array(JSON)，无结果时返回 [ ]
             */
            getNodesByFilter(filterFun, isSingle, parentNode, invokeParam) {
                return this.getZtreeObj().getNodesByFilter(filterFun, isSingle, parentNode, invokeParam)
            },

            /**
             * @description 根据节点数据的属性搜索，获取条件完全匹配的节点数据对象
             * @param key 需要精确匹配的属性名称
             * @param value 需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可
             * @param parentNode 搜索范围，指定在某个父节点下的子节点中进行搜索 忽略此参数，表示在全部节点中搜索
             * @returns 配精确搜索的节点数据 1、如无结果，返回 null。 2、如有多个节点满足查询条件，只返回第一个匹配到的节点
             */
            getNodeByParam(key, value, parentNode) {
                return this.getZtreeObj().getNodeByParam(key, value, parentNode)
            },

            /**
             * @description 根据节点数据的属性搜索，获取条件完全匹配的节点数据对象集合
             * @param key 需要精确匹配的属性名称
             * @param value 需要精确匹配的属性值，可以是任何类型，只要保证与 key 指定的属性值保持一致即可
             * @param parentNode 可以指定在某个父节点下的子节点中搜索
             * @returns 匹配精确搜索的节点数据集合，如无结果，返回 [ ]
             */
            getNodesByParam(key, value, parentNode) {
                return this.getZtreeObj().getNodesByParam(key, value, parentNode)
            },

            /**
             * @description 根据节点数据的属性搜索，获取条件模糊匹配的节点数据对象集合
             * @param key 需要模糊匹配的属性名称
             * @param value 需要模糊匹配的属性值 模糊匹配只能针对 String 类型的数据
             * @param parentNode 可以指定在某个父节点下的子节点中搜索 忽略此参数，表示在全部节点中搜索
             * @returns 匹配模糊搜索的节点数据集合
             */
            getNodesByParamFuzzy(key, value, parentNode) {
                return this.getZtreeObj().getNodesByParamFuzzy(key, value, parentNode)
            },

            /**
             * @description 根据勾选状态获取节点
             * @param checked 获取输入框被勾选 或 未勾选的节点集合。[setting.check.enable = true 时有效]
             * @returns 返回全部符合要求的节点集合 Array
             */
            getCheckedNodes(checked) {
                return this.getZtreeObj().getCheckedNodes(checked)
            },

            /**
             * @description 获取 zTree 当前被选中的节点数据集合
             * @returns 当前被选中的节点数据集合
             */
            getSelectedNodes() {
                return this.getZtreeObj().getSelectedNodes()
            },

            /**
             * @description 展开 / 折叠 全部节点
             * @param expandFlag true 表示 展开 全部节点,false 表示 折叠 全部节点
             */
            expandAll(expandFlag) {
                this.getZtreeObj().expandAll(expandFlag)
            },

            /**
             * @description 展开 / 折叠 指定的节点
             * @param expandFlag true 表示 展开 全部节点,false 表示 折叠 全部节点
             * @param sonSign true 表示 全部子孙节点 进行与 expandFlag 相同的操作 false 表示 只影响此节点，对于其 子孙节点无任何影响
             * @param focus true 表示 展开 / 折叠 操作后，通过设置焦点保证此焦点进入可视区域内 false 表示 展开 / 折叠 操作后，不设置任何焦点
             * @param callbackFlag  true 表示执行此方法时触发 beforeExpand / onExpand 或 beforeCollapse / onCollapse 事件回调函数 false 表示执行此方法时不触发事件回调函数
             */
            expandNode(treeNode, expandFlag, sonSign, focus, callbackFlag) {
                this.getZtreeObj().expandNode(treeNode, expandFlag, sonSign, focus, callbackFlag)
            },

            /**
             * @description 勾选 或 取消勾选 全部节点
             * @param checked true 表示勾选全部节点 false 表示全部节点取消勾选
             */
            checkAllNodes(checked) {
                this.getZtreeObj().checkAllNodes(checked)
            },

            /**
             * @description 勾选 或 取消勾选 单个节点
             * @param treeNode 需要勾选 或 取消勾选 的节点数据
             * @param checked true 表示勾选全部节点 false 表示全部节点取消勾选
             * @param checkTypeFlag true 表示按照 setting.check.chkboxType 属性进行父子节点的勾选联动操作, 反之只影响当前节点
             * @param callbackFlag true 表示执行此方法时触发 beforeCheck & onCheck 事件回调函数，反之不触发回调
             */
            checkNode(treeNode, checked, checkTypeFlag, callbackFlag) {
                this.getZtreeObj().checkNode(treeNode, checked, checkTypeFlag, callbackFlag)
            },

            /**
             * @description 添加节点
             * @param parentNode 指定的父节点，如果增加根节点，请设置 parentNode 为 null 即可
             * @param index 新节点插入的位置（从 0 开始） index = -1 时，插入到最后 此参数可忽略
             * @param newNodes 需要增加的节点数据 JSON 对象集合，数据只需要满足 zTree 的节点数据必需的属性即可，详细请参
             * @param isSilent true 时，不展开父节点，其他值或缺省状态都自动展开
             * @returns 返回值是 zTree 最终添加的节点数据集合
             */
            addNodes(parentNode, index, newNodes, isSilent) {
                return this.getZtreeObj().addNodes(parentNode, index, newNodes, isSilent)
            },

            /**
             * @description 更新某节点数据，主要用于该节点显示属性的更新
             * @param treeNode 指定需要更新的节点 JSON 数据
             * @param checkTypeFlag rue 表示按照 setting.check.chkboxType 属性进行父子节点的勾选联动操作 false 表示只修改此节点勾选状态，无任何勾选联动操作
             */
            updateNode(treeNode, checkTypeFlag) {
                this.getZtreeObj().updateNode(treeNode, checkTypeFlag)
            },

            /**
             * @description 选中指定节点
             * @param treeNode 需要被选中的节点数据
             * @param addFlag true 表示追加选中，会出现多点同时被选中的情况; false （默认）表示单独选中，原先被选中的节点会被取消选中状态
             * @param isSilent true 选中节点时，不会让节点自动滚到到可视区域内，反之会让节点自动滚到到可视区域内
             */
            selectNode(treeNode, addFlag, isSilent) {
                this.getZtreeObj().selectNode(treeNode, addFlag, isSilent)
            },

            /**
             * @description 强行异步加载父节点的子节点
             * @param parentNode 需要被选中的节点数据
             * @param reloadType "refresh" 表示清空后重新加载, != "refresh" 时，表示追加子节点处理
             * @param isSilent  true 时，不展开父节点，其他值或缺省状态都自动展开
             * @param callback 刷新完成后的回调函数
             */
            reAsyncChildNodes(parentNode, reloadType, isSilent, callback) {
                this.getZtreeObj().reAsyncChildNodes(parentNode, reloadType, isSilent, callback)
            },

            /**
             * @description 强行异步加载父节点的子节点（ES6 Promise 版）
             * @param parentNode 需要被选中的节点数据
             * @param reloadType "refresh" 表示清空后重新加载, != "refresh" 时，表示追加子节点处理
             * @param isSilent  true 时，不展开父节点，其他值或缺省状态都自动展开
             * @returns ES6 的 Promise 对象，便于异步控制，使用时请注意浏览器兼容问题
             */
            reAsyncChildNodesPromise(parentNode, reloadType, isSilent) {
                return this.getZtreeObj().reAsyncChildNodes(parentNode, reloadType, isSilent)
            },

            /**
             * @description 刷新 zTree
             */
            refresh() {
                this.getZtreeObj().refresh()
            },

            /**
             * @description 清空某父节点的子节点
             * @param parentNode 需要清空子节点的父节点数据
             * @returns 将该父节点的子节点数据返回，如果不存在则返回 null
             */
            removeChildNodes(parentNode) {
                return this.getZtreeObj().removeChildNodes(parentNode)
            },

            /**
             * @description 删除节点
             * @param treeNode 需要被删除的节点数据
             * @param callbackFlag true 表示执行此方法时触发 beforeRemove & onRemove 事件回调函数, false 表示执行此方法时不触发事件回调函数
             */
            removeNode(treeNode, callbackFlag) {
                this.getZtreeObj().removeNode(treeNode, callbackFlag)
            }
        }
    }
</script>
