<template>
<div id="drivingrecord_wrap" class="fun_wrap" v-bind:style="{marginLeft: '0px', background: '#f0f3f4'}">
    <el-container class="fun_wrap fun_content_wrap" v-bind:style="{height: wrapHeight + 'px',position: 'relative'}">
        <el-header>
            <el-header>
                <div class="searbox_wrap">
                    <div class="searFormRow1">
                        <el-row :span="24" class="sear_box">
                            <el-form :inline="true" ref="drivingRecordTable" class="_carManageHeader" size="small" :model="drivingRecordSearParam">
                                <el-form-item>
                                    <el-select v-model="drivingRecordSearParam.type" class="drivingRecordSearch">
                                        <el-option v-for="item in chooseSearchCondition" :label="item.name" :key="item.id" :value="item.id"></el-option>
                                    </el-select>
                                </el-form-item>
                                <el-form-item  prop="inputValue">
                                    <el-popover
                                        :value="ztreeDialog"
                                        ref="searchZtreeType"
                                        placement="bottom-start"
                                        v-model="orgPopoverShow"
                                        width="200"
                                        trigger="click"
                                        @show="showCarTree">
                                            <EasyScrollbar>
                                                <div v-bind:style="{minHeight: '280px',maxHeight:'280px'}">
                                                    <ul class="ztree" ref="drivingRecord_ogrTree" id="drivingRecord_ogrTree"></ul>
                                                </div>
                                            </EasyScrollbar>
                                    </el-popover>

                                    <el-autocomplete
                                        v-model="drivingRecordSearParam.inputValue"
                                        :style="{width: '180px','margin-left':'-8px'}"
                                        :fetch-suggestions="querySearchAsync"
                                        :trigger-on-focus="true"
                                        placeholder="请输入..." clearable
                                        @select="querySearchSelect"
                                        >
                                        <i class="el-icon-zoom-in el-input__icon changeColor" slot="suffix" v-popover:searchZtreeType></i>
                                        </el-autocomplete>
                                    </el-form-item>

                                <el-form-item>
                                    <el-radio-group @change="messageOrdataType" v-model="searchBtnSelect" :style="{'margin-left':'30px'}">
                                        <el-radio :label="1">原始报文</el-radio>
                                        <el-radio :label="2">数据类型</el-radio>
                                    </el-radio-group>
                                    <el-popover
                                        ref="dataTypeZtree"
                                        placement="bottom-start"
                                        v-model="orgPopoverShow1"
                                        @show="showCarTree"
                                        width="200"
                                        trigger="click"
                                        >
                                            <EasyScrollbar :barOption="barOpt">
                                                <div v-bind:style="{minHeight: '280px',maxHeight:'280px'}">
                                                    <ul class="ztree" ref="dataType_ogrTree" id="dataType_ogrTree"></ul>
                                                </div>
                                            </EasyScrollbar>
                                    </el-popover>
                                    <el-input v-popover:dataTypeZtree v-model="drivingRecordSearParam.dataTypesName" :style="{width: '180px','overflow':'hiden','white-space':'nowrap','text-overflow':'ellipsis'}" placeholder="请选择..."></el-input>
                                </el-form-item>

                            </el-form>
                        </el-row>
                        <el-row :span="24" class="secFormRow sear_box">
                            <el-form :inline="true" ref="drivingRecordTable" class="_carManageHeader" size="small" :model="drivingRecordSearParam">
                                <el-form-item label="开始日期" prop="fromDateStr" :label-width="formLabelWidth">
                                    <el-date-picker default-time="['00:00','23:59:59']" v-model="drivingRecordSearParam.fromDateStr" type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" clearable :style="{width: '180px','margin-left':'19px'}"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="结束日期" prop="toDateStr" :label-width="formLabelWidth" :style="{'margin-left':'-38px'}">
                                    <el-date-picker :default-time="['00:00','23:59:59']" v-model="drivingRecordSearParam.toDateStr" type="datetime" :editable="false" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期" clearable :style="{width: '180px'}"></el-date-picker>
                                </el-form-item>
                                <el-form-item label="快捷时间">
                                    <el-date-picker v-model="quickTime" :picker-options="pickerOptions" align="right" type="date" :style="{width: '180px'}" placeholder="今天" :editable="false">
                                    </el-date-picker>
                                </el-form-item>
                                <el-button type="success" size="mini" :style="{'height':'32px', marginLeft: '20px'}" @click="searchTabData">查询</el-button>
                                <el-button prop='export' v-hasPermisson="'终端管理_导出'" class="myBtnType_Cyan" size="mini" icon="el-icon-upload2" plain @click="exportBtn">导出</el-button>
                            </el-form>
                        </el-row>
                            <el-row :style="{position: 'relative'}">
                                <div :style="{position: 'absolute', right: '20px', top: '-10px'}">
                                    <el-popover
                                        ref="setTableCol"
                                        placement="bottom-start"
                                        width="100"
                                        @hide="tableCellCloseEvent"
                                        trigger="click">

                                        <EasyScrollbar>
                                            <div v-bind:style="{maxHeight: '250px'}">
                                                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange">全选</el-checkbox>
                                                <el-checkbox-group @change="handleCheckGroupChange" v-model="checkList">
                                                    <el-checkbox v-for="(value, key) in tableCellKeyVal" :key="key" :label="key">{{value}}</el-checkbox>
                                                </el-checkbox-group>
                                            </div>
                                        </EasyScrollbar>
                                    </el-popover>
                                    <span v-popover:setTableCol class="fa-stack" :style="{color: '#999'}">
                                        <i class="fa fa-filter fa-2x"></i>
                                        <i :style="{paddingLeft: '15px', paddingTop: '5px'}" class="fa fa-align-center fa-stack-1x"></i>
                                    </span>
                                </div>
                            </el-row>
                    </div>
                </div>
            </el-header>
        </el-header>
        <el-main>
            <el-table ref="drivingRecordTable" :mode="drivingRecordForm" :data="drivingRecordTable" :height="tableHeight" tooltip-effect="dark" :stripe="true" size="mini" highlight-current-row :border="true">
                <!-- 公共字段 -->
                <el-table-column :show-overflow-tooltip="showTipFlg" width="50" header-align="left" type="index" label="序号"></el-table-column>
                <el-table-column v-if="isTableCellShow('carNo')" key="carNo" :show-overflow-tooltip="showTipFlg" header-align="left" prop="carNo" label="车牌号"></el-table-column>
                <el-table-column v-if="isTableCellShow('dataTimeStr')" key="dataTimeStr" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dataTimeStr" label="发生时间"></el-table-column>
                <el-table-column v-if="isTableCellShow('saveTimeStr')" key="saveTimeStr" :show-overflow-tooltip="showTipFlg" header-align="left" prop="saveTimeStr" label="存储时间"></el-table-column>
                <!-- GPS -->
                <el-table-column v-if="isTableCellShow('dwStatTag18')" key="dwStatTag18" :show-overflow-tooltip="showTipFlg" header-align="center" prop="dwStatTag18" label="GPS">
                    <el-table-column v-if="isTableCellShow('dirTag')" key="dirTag" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dirTag" label="方向"></el-table-column>
                    <el-table-column v-if="isTableCellShow('speedGPS')" key="speedGPS" :show-overflow-tooltip="showTipFlg" header-align="left" width="140px" prop="speedGPS" label="GPS车速(公里/时)"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag1')" key="dwStatTag1" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag1" label="定位"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag3')" key="dwStatTag3" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag3" label="东经/西经"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag2')" key="dwStatTag2" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag2" label="南纬/北纬"></el-table-column>
                    <el-table-column v-if="isTableCellShow('height')" key="height" :show-overflow-tooltip="showTipFlg" header-align="left" prop="height" label="海拔高度"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('mileage')" key="mileage" :show-overflow-tooltip="showTipFlg" header-align="left" prop="mileage" label="总里程(公里)"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('lng')" key="lng" :show-overflow-tooltip="showTipFlg" header-align="left" prop="lng" label="经度"></el-table-column>
                    <el-table-column v-if="isTableCellShow('lat')" key="lat" :show-overflow-tooltip="showTipFlg" header-align="left" prop="lat" label="纬度"></el-table-column>
                    <el-table-column v-if="isTableCellShow('oilCost')" key="oilCost" :show-overflow-tooltip="showTipFlg" header-align="left" prop="oilCost" label="燃油累积使用量"></el-table-column>
                    <el-table-column v-if="isTableCellShow('driverID')" key="driverID" :show-overflow-tooltip="showTipFlg" header-align="left" prop="driverID" label="驾驶员ID"></el-table-column>
                    <el-table-column v-if="isTableCellShow('speedPluse')" key="speedPluse" :show-overflow-tooltip="showTipFlg" header-align="left" prop="speedPluse" label="车速(公里/时)"></el-table-column>
                    <el-table-column v-if="isTableCellShow('rev')" key="rev" :show-overflow-tooltip="showTipFlg" header-align="left" prop="rev" label="转速(转/分)"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('oilLevel')" key="oilLevel" :show-overflow-tooltip="showTipFlg" header-align="left" prop="oilLevel" label="油量(升)"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag4')" key="dwStatTag4" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag4" label="运营"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag5')" key="dwStatTag5" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag5" label="加密"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag89')" key="dwStatTag89" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag89" label="载重状态"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag10')" key="dwStatTag10" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag10" label="油路"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag11')" key="dwStatTag11" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag11" label="电路"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag12')" key="dwStatTag12" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag12" label="车门"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag13')" key="dwStatTag13" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag13" label="前门"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag14')" key="dwStatTag14" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag14" label="中门"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag15')" key="dwStatTag15" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag15" label="后门"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag16')" key="dwStatTag16" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag16" label="驾驶席门"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag17')" key="dwStatTag17" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag17" label="自定义门"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag19')" key="dwStatTag19" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag19" label="北斗"></el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag20')" key="dwStatTag20" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag20" label="GLONASS"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag21')" key="dwStatTag21" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag21" label="GALILEO"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag0')" key="alarmTag0" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag0" label="紧急报警"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag1')" key="alarmTag1" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag1" label="超速报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag2')" key="alarmTag2" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag2" label="疲劳驾驶"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag3')" key="alarmTag3" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag3" label="危险预警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag4')" key="alarmTag4" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag4" label="GNSS模块故障"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag5')" key="alarmTag5" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag5" label="GNSS天线未接"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag6')" key="alarmTag6" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag6" label="GNSS天线短路"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag7')" key="alarmTag7" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag7" label="终端主电源欠压"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag8')" key="alarmTag8" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag8" label="终端主电源掉电"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag9')" key="alarmTag9" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag9" label="终端LCD或显示器故障"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag10')" key="alarmTag10" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag10" label="TTS模块故障"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag11')" key="alarmTag11" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag11" label="摄像头故障"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag12')" key="alarmTag12" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag12" label="道路运输证IC卡模块故障"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag13')" key="alarmTag13" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag13" label="超速预警"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag14')" key="alarmTag14" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag14" label="疲劳驾驶预警"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag18')" key="alarmTag18" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag18" label="当天累计驾驶超时"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag19')" key="alarmTag19" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag19" label="超时停车"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag20')" key="alarmTag20" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag20" label="进出区域"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag21')" key="alarmTag21" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag21" label="进出路线"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag22')" key="alarmTag22" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag22" label="路段行驶时间不足/过长"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag23')" key="alarmTag23" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag23" label="路线偏离报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag24')" key="alarmTag24" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag24" label="车辆VSS故障"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag25')" key="alarmTag25" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag25" label="车辆油量异常"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag26')" key="alarmTag26" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag26" label="车辆被盗"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag27')" key="alarmTag27" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag27" label="车辆非法点火"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag28')" key="alarmTag28" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag28" label="车辆非法位移"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag29')" key="alarmTag29" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag29" label="碰撞预警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag30')" key="alarmTag30" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag30" label="侧翻预警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('alarmTag31')" key="alarmTag31" :show-overflow-tooltip="showTipFlg" header-align="left" prop="alarmTag31" label="非法开门报警"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag0')" key="swtTag0" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag0" label="近光灯"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag1')" key="swtTag1" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag1" label="远光灯"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag2')" key="swtTag2" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag2" label="右转向灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag3')" key="swtTag3" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag3" label="左转向灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag4')" key="swtTag4" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag4" label="制动"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag5')" key="swtTag5" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag5" label="倒档"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag6')" key="swtTag6" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag6" label="雾灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag7')" key="swtTag7" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag7" label="示廓灯"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag8')" key="swtTag8" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag8" label="喇叭"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag9')" key="swtTag9" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag9" label="空调"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag10')" key="swtTag10" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag10" label="空挡"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag11')" key="swtTag11" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag11" label="缓速器"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag12')" key="swtTag12" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag12" label="ABS"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag13')" key="swtTag13" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag13" label="加热器"></el-table-column>
                    <el-table-column v-if="isTableCellShow('swtTag14')" key="swtTag14" :show-overflow-tooltip="showTipFlg" header-align="left" prop="swtTag14" label="离合器"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('signal')" key="signal" :show-overflow-tooltip="showTipFlg" header-align="left" prop="signal" label="GNSS信号强度"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('satellite')" key="satellite" :show-overflow-tooltip="showTipFlg" header-align="left" prop="satellite" label="GNSS定位卫星数"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dwStatTag0')" key="dwStatTag0" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag0" label="ACC"> </el-table-column>

                </el-table-column>
                <!-- 开关量 -->
                <!-- <el-table-column v-if="isTableCellShow('openClose')" key="openClose" :show-overflow-tooltip="showTipFlg" header-align="center" prop="openClose" label="开关量">开关量 -->
                <el-table-column v-if="isTableCellShow('openClose')" key="openClose" :show-overflow-tooltip="showTipFlg" header-align="center">开关量
                    <el-table-column v-if="isTableCellShow('switch0')" key="switch0" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch0" label="油门踏板"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch1')" key="switch1" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch1" label="刹车"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch2')" key="switch2" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch2" label="手刹"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch3')" key="switch3" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch3" label="离合器状态"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch4')" key="switch4" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch4" label="倒车"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch5')" key="switch5" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch5" label="举升缸状态"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch6')" key="switch6" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch6" label="排气自动开关"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch7')" key="switch7" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch7" label="翻斗未回应"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch8')" key="switch8" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch8" label="驾驶室翻转"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch9')" key="switch9" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch9" label="左转向灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch10')" key="switch10" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch10" label="右转向灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch11')" key="switch11" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch11" label="远光灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch12')" key="switch12" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch12" label="取力器开关"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch13')" key="switch13" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch13" label="取力器空挡"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch14')" key="switch14" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch14" label="空滤报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch15')" key="switch15" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch15" label="空调"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch16')" key="switch16" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch16" label="加热器"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch17')" key="switch17" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch17" label="近光灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch18')" key="switch18" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch18" label="空档"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch19')" key="switch19" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch19" label="制动蹄片磨损信号"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch20')" key="switch20" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch20" label="T15开关"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch21')" key="switch21" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch21" label="顶盖开合"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch22')" key="switch22" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch22" label="举升"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch23')" key="switch23" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch23" label="载重状态"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch24')" key="switch24" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch24" label="行车取力"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch25')" key="switch25" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch25" label="停车取力"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch26')" key="switch26" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch26" label="挂车状态"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch27')" key="switch27" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch27" label="紧急制动"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch28')" key="switch28" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch28" label="前雾灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch29')" key="switch29" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch29" label="后雾灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch30')" key="switch30" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch30" label="日间行车灯"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch31')" key="switch31" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch31" label="ABS启动信号"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch32')" key="switch32" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch32" label="倒档"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch33')" key="switch33" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch33" label="排风扇"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch34')" key="switch34" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch34" label="泄爆装置"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch35')" key="switch35" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch35" label="防盗报警器"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch36')" key="switch36" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch36" label="厢内喷淋"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch37')" key="switch37" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch37" label="轮毂降温"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch38')" key="switch38" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch38" label="除湿器"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch39')" key="switch39" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch39" label="厢内超温报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch40')" key="switch40" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch40" label="厢内超压报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch42')" key="switch41" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch41" label="厢内湿度报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch42')" key="switch42" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch42" label="轮毂超温报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch43')" key="switch43" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch43" label="烟雾报警"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch44')" key="switch44" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch44" label="顶盖闭合状态1"></el-table-column>
                    <el-table-column v-if="isTableCellShow('switch45')" key="switch45" :show-overflow-tooltip="showTipFlg" header-align="left" prop="switch45" label="顶盖闭合状态2"></el-table-column>
                </el-table-column>
                 <!-- CAN类 -->
                <!-- <el-table-column v-if="isTableCellShow('dataTimeStr')" key="dataTimeStr" :show-overflow-tooltip="showTipFlg" header-align="center" prop="dwStatTag0" label="CAN">
                    <el-table-column v-if="isTableCellShow('dataTimeStr')" key="dataTimeStr" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag0" label="速度(km/h)"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dataTimeStr')" key="dataTimeStr" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag0" label="电压(v)"> </el-table-column>
                    <el-table-column v-if="isTableCellShow('dataTimeStr')" key="dataTimeStr" :show-overflow-tooltip="showTipFlg" header-align="left" prop="dwStatTag0" label="扭矩"> </el-table-column>
                </el-table-column> -->


            </el-table>
        </el-main>
        <el-footer class="footer_page">
            <el-row :span="24">
                <el-col :span="15" :offset="9">
                    <el-pagination
                    @size-change="handleSizeChange"
                    @current-change="handleCurrentChange"
                    :current-page="pageNum"
                    :page-sizes="[15, 20, 30, 50]"
                    :page-size="pageSize"
                    layout="total, sizes, prev, pager, next, jumper"
                    :total="pageTotal" background>
                    </el-pagination>
                </el-col>
            </el-row>
        </el-footer>
        <el-dialog v-drag="{width:700,height:372}" :title="winTitle"  @close="closeWindow('form')"  :close-on-click-modal="false" width="500px">

        </el-dialog>
    </el-container>
</div>


</template>

<script>
    import dapi from 'api/drivingRecord'
    import axios from 'axios'
    const tableCellKeyVal = {
        /*********公共类******************/
        "carNo": '车牌号',
        "dataTimeStr": "发生时间",
        "saveTimeStr": "存储时间",
        /**********GPS大类**************/
        "dwStatTag18": "GPS",
        "dirTag": "方向",
        "speedGPS": "GPS车速(公里/时)",
        "dwStatTag1": "定位",
        "dwStatTag2": "南纬/北纬",
        "dwStatTag3": "东经/西经",
        "height": "海拔高度",
        "mileage": "总里程(公里)",

        "lng": "经度",
        "lat": "纬度",
        "oilCost": "燃油累积使用量",
        "driverID": "驾驶员ID",
        "speedPluse": "车速(公里/时)",
        "rev": "转速(转/分)",
        "oilLevel": "油量(升)",
        "dwStatTag4": "运营",
        "dwStatTag5": "加密",
        "dwStatTag89": "载重状态",
        "dwStatTag10": "油路",
        "dwStatTag11": "电路",
        "dwStatTag12": "车门",
        "dwStatTag13": "前门",
        "dwStatTag14": "中门",
        "dwStatTag15": "后门",
        "dwStatTag16": "驾驶席门",
        "dwStatTag17": "自定义门",
        "dwStatTag19": "北斗",
        "dwStatTag20": "GLONASS",
        "dwStatTag21": "GALILEO",
        "alarmTag0": "紧急报警",
        "alarmTag1": "超速报警",
        "alarmTag2": "疲劳驾驶",
        "alarmTag3": "危险预警",
        "alarmTag4": "GNSS模块故障",
        "alarmTag5": "GNSS天线未接",
        "alarmTag6": "GNSS天线短路",
        "alarmTag7": "终端主电源欠压",
        "alarmTag8": "终端主电源掉电",
        "alarmTag9": "终端LCD或显示器故障",
        "alarmTag10": "TTS模块故障",
        "alarmTag11": "摄像头故障",
        "alarmTag12": "道路运输证IC卡模块故障",
        "alarmTag13": "超速预警",
        "alarmTag14": "疲劳驾驶预警",
        "alarmTag18": "当天累计驾驶超时",
        "alarmTag19": "超时停车",
        "alarmTag20": "进出区域",
        "alarmTag21": "进出路线",
        "alarmTag22": "路段行驶时间不足/过长",
        "alarmTag23": "路线偏离报警",
        "alarmTag24": "车辆VSS故障",
        "alarmTag25": "车辆油量异常",
        "alarmTag26": "车辆被盗",
        "alarmTag27": "车辆非法点火",
        "alarmTag28": "车辆非法位移",
        "alarmTag29": "碰撞预警",
        "alarmTag30": "侧翻预警",
        "alarmTag31": "非法开门报警",
        "swtTag0": "近光灯",
        "swtTag1": "远光灯",
        "swtTag2": "右转向灯",
        "swtTag3": "左转向灯",
        "swtTag4": "制动",
        "swtTag5": "倒档",
        "swtTag6": "雾灯",
        "swtTag7": "示廓灯",
        "swtTag8": "喇叭",
        "swtTag9": "空调",
        "swtTag10": "空挡",
        "swtTag11": "缓速器",
        "swtTag12": "ABS",
        "swtTag13": "加热器",
        "swtTag14": "离合器",
        "signal": "GNSS信号强度",
        "satellite": "GNSS定位卫星数",
        "dwStatTag0": "ACC",
        /**********开关量**************/
        "openClose":  "开关量",
        "switch0":  "油门踏板",
        "switch1":  "刹车",
        "switch2":  "手刹",
        "switch3":  "离合器状态",
        "switch4":  "倒车",
        "switch5":  "举升缸状态",
        "switch6":  "排气自动开关",
        "switch7":  "翻斗未回应",
        "switch8":  "驾驶室翻转",
        "switch9":  "左转向灯",
        "switch10": "右转向灯",
        "switch11": "远光灯",
        "switch12": "取力器开关",
        "switch13": "取力器空挡",
        "switch14": "空滤报警",
        "switch15": "空调",
        "switch16": "加热器",
        "switch17": "近光灯",
        "switch18": "空档",
        "switch19": "制动蹄片磨损信号",
        "switch20": "T15开关",
        "switch21": "顶盖开合",
        "switch22": "举升",
        "switch23": "载重状态",
        "switch24": "行车取力",
        "switch25": "停车取力",
        "switch26": "挂车状态",
        "switch27": "紧急制动",
        "switch28": "前雾灯",
        "switch29": "后雾灯",
        "switch30": "日间行车灯",
        "switch31": "ABS启动信号",
        "switch32": "倒档",
        "switch33": "排风扇",
        "switch34": "泄爆装置",
        "switch35": "防盗报警器",
        "switch36": "厢内喷淋",
        "switch37": "轮毂降温",
        "switch38": "除湿器",
        "switch39": "厢内超温报警",
        "switch40": "厢内超压报警",
        "switch41": "厢内湿度报警",
        "switch42": "轮毂超温报警",
        "switch43": "烟雾报警",
        "switch44": "顶盖闭合状态1",
        "switch45": "顶盖闭合状态2"





        /**********CAN类**************/


    }

    export default {
        name: 'drivingRecord',
        data() {
            return{
                expandLevelIndex: 0, // 树逐级展开的层级索引,开始为0,表示从第一次开始展开,每展开一级加1
                carUuid: "",
                orgPopoverShow: false,
                orgPopoverShow1: false,
                orgUuids: [],
                barOpt: {
                    barWidth: 7,
                    zIndex: 1083
                },
                isIndeterminate: true,
                wrapHeight: 802, //功能模块的高度
                tableHeight: '',  //表格高度
                showTipFlg: true,
                checkList: [], //设置报表列数组
                checkAll: false,
                tableCellList: Object.keys(tableCellKeyVal),
                tableCellKeyVal: tableCellKeyVal,
                winTitle: '',
                inputValue: '',
                dataTypeOrgTree: {
                    check: {
                        enable: true,
                        chkStyle: "checkbox",
                        autoCheckTrigger: true
                    },
                    callback: {
                        onClick: this.dataTypeOrgTreeClickEvent,
                        beforeCheck: this.dataTypeTreeBeforeCheck,
                        onCheck: this.dataTypeTreeOncheck
                    },
                    view:{
                        addHoverDom: null
                    },
                    async: {
                        enable: true,
                        url: axios.defaults.baseURL + '/drivingRecord/loadCloudDataType',
                        type: "get",
                        autoParam: ["dataType=type"],
                        otherParam: ["terminalId", ""],
                        dataFilter: this.dataTypeTreeDataFilter
                    }
                },
                orgTreeSetting: {
                    view:{
                        addHoverDom: null
                    },
                    callback: {
                        onClick: this.formOrgTreeClickEvent,
                        onAsyncSuccess: this.carTreeOnExpand
                    },
                    async: {
                        enable: true,
                        url: axios.defaults.baseURL + '/tree/org',
                        type: "get",
                        autoParam: ["id=orgId"],
                        otherParam: ["left", "true"]
                    }
                },
                rootTreeData: [],
                focusOrgData: [],
                ztreeDialog: false,
                drivingRecordSelectData: [], //数据类型下拉框数据
                drivingRecordTable: [],  //表格数据
                chooseSearchCondition: [{
                    id: 1,
                    name: '车牌号'
                }, {
                    id: 2,
                    name: 'SIM卡号'
                }, {
                    id: 3,
                    name: '终端号'
                }, {
                    id: 4,
                    name: 'VIN码'
                }],
                searchBtnSelect: 1,    //查询条件:原始报文或者数据类型
                formLabelWidth: '110px',
                pageNum: 2,
                pageSize: 15,
                pageTotal: 200,
                terminalId: '',   //根据车辆终端号查询获取行车记录类型信息
                type: 1,    //数据类型分类
                drivingRecordSearParam: {  //模态框搜索条件
                    terminalId: "",
                    dataTypeNum: '',
                    dataTypes: '',
                    dataTypesName: '',             //数据类型
                    bigType: 1,
                    fromDateStr: '',
                    toDateStr: '',
                    type: 1,
                    inputValue:""

                    // baseType: '',
                    // dataTypeNum: ''

                },
                drivingRecordForm: {
                    carNo: "",
                    dataTimeStr: "",
                    saveTimeStr: "",
                    dwStatTag18: "GPS",
                    dirTag: "",
                    speedGPS: "",
                    dwStatTag1: "",
                    dwStatTag2: "",
                    dwStatTag3: "",
                    height: "",
                    mileage: "",
                    lng: "",
                    lat: "",
                    oilCost: "",
                    driverID: "",
                    speedPluse: "",
                    rev: "",
                    oilLevel: "",
                    dwStatTag4: "",
                    dwStatTag5: "",
                    dwStatTag89: "",
                    dwStatTag10: "",
                    dwStatTag11: "",
                    dwStatTag12: "",
                    dwStatTag13: "",
                    dwStatTag14: "",
                    dwStatTag15: "",
                    dwStatTag16: "",
                    dwStatTag17: "",
                    dwStatTag19: "",
                    dwStatTag20: "",
                    dwStatTag21: "",
                    alarmTag0: "",
                    alarmTag1: "",
                    alarmTag2: "",
                    alarmTag3: "",
                    alarmTag4: "",
                    alarmTag5: "",
                    alarmTag6: "",
                    alarmTag7: "",
                    alarmTag8: "",
                    alarmTag9: "",
                    alarmTag10: "",
                    alarmTag11: "",
                    alarmTag12: "",
                    alarmTag13: "",
                    alarmTag14: "",
                    alarmTag18: "",
                    alarmTag19: "",
                    alarmTag20: "",
                    alarmTag21: "",
                    alarmTag22: "",
                    alarmTag23: "",
                    alarmTag24: "",
                    alarmTag25: "",
                    alarmTag26: "",
                    alarmTag27: "",
                    alarmTag28: "",
                    alarmTag29: "",
                    alarmTag30: "",
                    alarmTag31: "",
                    swtTag0: "",
                    swtTag1: "",
                    swtTag2: "",
                    swtTag3: "",
                    swtTag4: "",
                    swtTag5: "",
                    swtTag6: "",
                    swtTag7: "",
                    swtTag8: "",
                    swtTag9: "",
                    swtTag10: "",
                    swtTag11: "",
                    swtTag12: "",
                    swtTag13: "",
                    swtTag14: "",
                    signal: "",
                    satellite: "",
                    openClose: "开关量",
                    switch0: "",
                    switch1: "",
                    switch2: "",
                    switch3: "",
                    switch4: "",
                    switch5: "",
                    switch6: "",
                    switch7: "",
                    switch8: "",
                    switch9: "",
                    switch10: "",
                    switch11: "",
                    switch12: "",
                    switch13: "",
                    switch14: "",
                    switch15: "",
                    switch16: "",
                    switch17: "",
                    switch18: "",
                    switch19: "",
                    switch20: "",
                    switch21: "",
                    switch22: "",
                    switch23: "",
                    switch24: "",
                    switch25: "",
                    switch26: "",
                    switch27: "",
                    switch28: "",
                    switch29: "",
                    switch30: "",
                    switch31: "",
                    switch32: "",
                    switch33: "",
                    switch34: "",
                    switch35: "",
                    switch36: "",
                    switch37: "",
                    switch38: "",
                    switch39: "",
                    switch40: "",
                    switch41: "",
                    switch42: "",
                    switch43: "",
                    switch44: "",
                    switch45: ""

                },
                value: '',

                pickerOptions: {
                    shortcuts: [{
                        text: '今天',
                        onClick(picker) {
                            picker.$emit('pick', new Date());
                        }
                    }, {
                        text: '昨天',
                        onClick(picker) {
                            const date = new Date();

                            date.setTime(date.getTime() - 3600 * 1000 * 24);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周前',
                        onClick(picker) {
                            const date = new Date();

                            date.setTime(date.getTime() - 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }, {
                        text: '一周后',
                        onClick(picker) {
                            const date = new Date();

                            date.setTime(date.getTime() + 3600 * 1000 * 24 * 7);
                            picker.$emit('pick', date);
                        }
                    }]
                },
                quickTime: '',
                treeArr: [],
                treeAdd: []

            }
        },
        created() {
            this.wrapHeight = this.$store.state.home.settings.deviceHeight - 22;
            this.tableHeight = this.wrapHeight - 183;
            this.GLOBAL.getTableCellSetList('drivingRecord', this.tableCellList).then((res) => {
                this.checkList = res
            })
            this.searchTabData();

        },
        mounted() {
            var virRootData = this.$store.state.home.orgVirData

            this.rootTreeData[0] = virRootData
            $.fn.zTree.init($("#drivingRecord_ogrTree"), this.orgTreeSetting, this.rootTreeData)
            $.fn.zTree.init($("#dataType_ogrTree"), this.dataTypeOrgTree, this.rootTreeData)

            this.showCarTree();

        },
        methods:{

            //获取数据类型
            useTboxGetDataTypeList(){
                var data = {
                    terminalId: this.terminalId,
                    type: this.type
                }

                dapi.searchDataTypeList(data).then((response) =>{
                    var virRootData = this.$store.state.home.orgVirData

                    for(var item of response.data){
                        item.name = item.dataTypeName;
                        if(item.dataType == '20'){
                            item.isParent = true
                        }
                    }
                    virRootData.children = response.data;

                    this.rootTreeData[0] = virRootData
                    this.dataTypeOrgTree.async.otherParam = ["terminalId", this.terminalId];
                    var dataTypeTree = $.fn.zTree.init($("#dataType_ogrTree"), this.dataTypeOrgTree, this.rootTreeData)
                    var rootNode = dataTypeTree.getNodes()[0]

                    dataTypeTree.expandNode(rootNode, true)
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            dataTypeOrgTreeClickEvent(ev, treeId, node){
                var dataTypeTree = $.fn.zTree.getZTreeObj("dataType_ogrTree");
                var treeNode = dataTypeTree.getNodeByParam('id', node.id, null)

                if(node.id != -1){
                    dataTypeTree.expandNode(treeNode, true)
                    // this.drivingRecordSearParam.baseType = node.dataTypeName
                    this.drivingRecordSearParam.dataTypesName = node.dataTypeName

                }else{
                    dataTypeTree.cancelSelectedNode()
                }
            },
            dataTypeTreeOncheck(){
                var dataTypeTree = $.fn.zTree.getZTreeObj("dataType_ogrTree")
                var getTreeData = dataTypeTree.getCheckedNodes()

                // console.log(getTreeData)
                this.drivingRecordSearParam.dataTypesName = ''
                this.drivingRecordSearParam.dataTypes = ''
                this.drivingRecordSearParam.dataTypeNum = getTreeData.length - 1
                for(var item of getTreeData){
                    if(!item.id){
                        // alert("12")
                        console.log(this.drivingRecordSearParam.dataTypesName)
                        console.log(this.drivingRecordSearParam.dataTypes)
                        this.drivingRecordSearParam.dataTypesName += item.dataTypeName + '/'
                        this.drivingRecordSearParam.dataTypes += item.dataType + ';'
                    }
                }

            },
            // 勾选前判断
            dataTypeTreeBeforeCheck(treeId, treeNode){
                if(!treeNode.checked){
                    var dataTypeTree = $.fn.zTree.getZTreeObj("dataType_ogrTree");
                    var getTreeData = dataTypeTree.getCheckedNodes()
                    var parentNode = treeNode.getParentNode()
                    var leve1 = []
                    var leve2 = []

                    for(var item of getTreeData){
                        var itemParent = item.getParentNode()

                        if(itemParent){
                            if(itemParent.dataType == 20){
                                leve2.push(item)
                            }else{
                                leve1.push(item);
                            }
                        }
                    }
                    if(parentNode.dataType == '20'){
                        if(leve2.length >= 2){
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: "二级菜单最多可选择两项"
                            });
                            return false
                        }
                    }else{
                        if(leve1.length >= 3){
                            this.$message({
                                type: 'error',
                                duration: 1500,
                                showClose: true,
                                message: "一级菜单最多可选择三项"
                            });
                            return false
                        }
                    }
                }
            },
            dataTypeTreeDataFilter(treeId, parentNode, responseData){
                var dataArr = responseData.data;

                for(var item of dataArr){
                    item.name = item.dataTypeName;
                }
                return dataArr

            },
            formOrgTreeClickEvent(ev, treeId, node){
                var formTree =  $.fn.zTree.getZTreeObj("drivingRecord_ogrTree");

                if(node.id != -1){
                    if(this.drivingRecordSearParam.type == 2){
                        this.drivingRecordSearParam.inputValue = node.sim
                    } else if(this.drivingRecordSearParam.type == 3){
                        this.drivingRecordSearParam.inputValue = node.tboxId
                    }else if(this.drivingRecordSearParam.type == 4){
                        this.drivingRecordSearParam.inputValue = node.vin
                    }else {
                        this.drivingRecordSearParam.inputValue = node.name
                    }

                }else{
                    formTree.cancelSelectedNode()
                    this.drivingRecordSearParam.inputValue = ""
                }
            },
            showCarTree() {
                var orgTree = $.fn.zTree.getZTreeObj("drivingRecord_ogrTree")
                var rootNode = orgTree.getNodes()[0]    //获取 zTree 的全部节点数据

                orgTree.expandNode(rootNode, true, false, true, true)         //展开/折叠 指定的节点, roorNode为需要展开或折叠的节点数据
                this.expandLevelIndex = 0
                var item = this.orgUuids[0];
                var orgNode = orgTree.getNodeByParam("id", item, null)

                orgTree.expandNode(orgNode, true, false, true, true)

            },
            carTreeOnExpand() {
                var orgTree = $.fn.zTree.getZTreeObj("drivingRecord_ogrTree")

                if (this.expandLevelIndex < this.orgUuids.length - 1) {
                    this.expandLevelIndex++
                    var orgNode = orgTree.getNodeByParam("id", this.orgUuids[this.expandLevelIndex], null)

                    orgTree.expandNode(orgNode, true, false, true, true)
                } else {
                    var carNode = orgTree.getNodeByParam("id", this.carUuid, null)

                    if (carNode) {
                        orgTree.cancelSelectedNode();
                        orgTree.selectNode(carNode)
                    }
                }
            },
            tableCellCloseEvent(){
                this.GLOBAL.getTableCellSetList('drivingRecord', this.tableCellKeyVal, this.checkList)
            },
            isTableCellShow(val){
                if(this.checkList.indexOf(val) > -1){
                    return true;
                }
                return false;
            },
            handleCheckAllChange(val){
                this.checkList = val ? this.tableCellList : [];
                this.isIndeterminate = false;
                var that = this

                window.setTimeout(function(){
                    $('#drivingrecord_wrap .el-table__body-wrapper').height(that.tableHeight - 40)
                }, 200)
            },
            handleCheckGroupChange(value){
                let checkedCount = value.length;

                this.checkAll = checkedCount === this.tableCellList.length;
                this.isIndeterminate = checkedCount > 0 && checkedCount < this.tableCellList.length;
                var that = this

                window.setTimeout(function(){
                    $('#drivingrecord_wrap .el-table__body-wrapper').height(that.tableHeight - 40)
                }, 200)
            },
            // 分页
            handleSizeChange(val) {
                this.pageSize = val;
            },
            handleCurrentChange(val) {
                this.pageNum = val;
            },
            searchZtreeType(){
                this.ztreeDialog = true;
                this.showCarTree();
            },
            dateFormat(date){
                var y = date.getFullYear();
                var m = date.getMonth() + 1;

                m = m < 10 ? '0' + m : m;
                var d = date.getDate();

                d = d < 10 ? '0' + d : d;
                var h = date.getHours();

                h = h < 10 ? '0' + h : h;
                var minute = date.getMinutes();

                minute = minute < 10 ? '0' + minute : minute;
                var second = date.getSeconds();

                second = second < 10 ? '0' + second : second;
                return y + '-' + m + '-' + d + ' ' + h + ':' + minute + ':' + second;
            },



           // 根据输入信息模糊查询获取车辆信息
            messageOrdataType(val){
                this.drivingRecordSearParam.bigType = val;
            },
            querySearchSelect(item){
                if(this.drivingRecordSearParam.type == 2){
                    this.drivingRecordSearParam.inputValue = item.actualSimNo
                } else if(this.drivingRecordSearParam.type == 3){
                    this.drivingRecordSearParam.inputValue = item.tboxId
                }else if(this.drivingRecordSearParam.type == 4){
                    this.drivingRecordSearParam.inputValue = item.carVin
                } else {
                    this.drivingRecordSearParam.inputValue = item.carNo
                }

                this.orgUuids = item.orgUuids
                this.carUuid = item.carUuid
                this.expandLevelIndex = 0
                this.useTboxGetDataTypeList()
            },
            // 异步加载
            querySearchAsync(queryString, callback){
                if(queryString == ""){
                    $('.el-autocomplete-suggestion__wrap').hide()
                    $('.el-autocomplete-suggestion').hide()
                }else{
                    $('.el-autocomplete-suggestion__wrap').show()
                    $('.el-autocomplete-suggestion').show()
                }

                var data = {
                    type: this.drivingRecordSearParam.type,
                    inputValue: this.drivingRecordSearParam.inputValue
                }

                dapi.selectSearchEvent(data).then((response) =>{
                    if(this.drivingRecordSearParam.type == 1){
                        for(let i of response.data){
                            i.value = i.carNo;
                            this.terminalId = i.terminalId;
                        }
                        return callback(response.data)
                    }else if(this.drivingRecordSearParam.type == 2){
                        for(let i of response.data){
                            i.value = i.actualSimNo;
                            this.terminalId = i.terminalId;
                        }
                        return callback(response.data)
                    }else if(this.drivingRecordSearParam.type == 3){
                        for(let i of response.data){
                            i.value = i.tboxId;
                            this.terminalId = i.terminalId;
                        }
                        return callback(response.data)
                    }else if(this.drivingRecordSearParam.type == 4){
                        for(let i of response.data){
                            i.value = i.carVin;
                            this.terminalId = i.terminalId;
                        }
                        return callback(response.data)
                    }

                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                })
            },
            //查询行车记录
            searchTabData(){
                // this.drivingRecordSearParam.fromDateStr = this.dateFormat(new Date());
                // this.drivingRecordSearParam.toDateStr = this.dateFormat(new Date());

                var data = {
                    terminalId: this.terminalId,
                    dataTypeNum: this.drivingRecordSearParam.dataTypeNum,
                    dataTypesName: this.drivingRecordSearParam.dataTypesName,
                    dataTypes: this.drivingRecordSearParam.dataTypes,
                    bigType: this.drivingRecordSearParam.bigType,
                    fromDateStr: this.drivingRecordSearParam.fromDateStr,
                    toDateStr: this.drivingRecordSearParam.toDateStr,
                    pageNum: this.pageNum,
                    pageSize: this.pageSize,
                    pageTotal: this.pageTotal,

                    type: this.drivingRecordSearParam.type,
                    inputValue: this.drivingRecordSearParam.inputValue

                }

                dapi.getDrivingRecordList(data).then((response) =>{
                    this.drivingRecordTable = response.data.list;
                    this.pageTotal = response.data.total;
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                })
            },
            exportBtn(){
                this.exportEvent();             //导出
            },
            exportEvent(){
                if(this.drivingRecordTable.length <= 0){
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: '表格无数据'
                    });
                    return
                }
                var totalData = {
                    terminalId: this.terminalId,
                    dataTypeNum: this.drivingRecordSearParam.dataTypeNum,
                    dataTypes: this.drivingRecordSearParam.dataTypes,
                    bigType: this.drivingRecordSearParam.bigType,
                    fromDateStr: this.drivingRecordSearParam.fromDateStr,
                    toDateStr:this.drivingRecordSearParam.toDateStr,
                    pageNum:this.pageNum,
                    pageSize:this.pageSize,
                    pageTotal: this.pageTotal,
                    headers: '车牌号,发生时间,存储时间,GPS,方向,GPS车速(公里/时),定位,南纬/北纬,东经/西经,海拔高度,总里程(公里),经度,纬度,燃油累积使用量,驾驶员ID,车速(公里/时),转速(转/分),油量(升),运营,加密,载重状态,油路,电路,车门,前门,中门,后门,驾驶席门,自定义门,北斗,GLONASS,GALILEO,紧急报警,超速报警,疲劳驾驶,危险预警,GNSS模块故障,GNSS天线未接,GNSS天线短路,终端主电源欠压,终端主电源掉电,终端LCD或显示器故障,TTS模块故障,摄像头故障,道路运输证IC卡模块故障,超速预警,疲劳驾驶预警,当天累计驾驶超时,超时停车,进出区域,进出路线,路段行驶时间不足/过长,路线偏离报警,车辆VSS故障,车辆油量异常,车辆被盗,车辆非法点火,车辆非法位移,碰撞预警,侧翻预警,非法开门报警,近光灯,远光灯,右转向灯,左转向灯,制动,倒档,雾灯,示廓灯,喇叭,空调,空挡,缓速器,ABS,加热器,离合器,GNSS信号强度,GNSS定位卫星数,开关量,油门踏板,刹车,手刹,离合器状态,倒车,举升缸状态,排气自动开关,翻斗未回应,驾驶室翻转,左转向灯,右转向灯,远光灯,取力器开关,取力器空挡,空滤报警,空调,加热器,近光灯,空档,制动蹄片磨损信号,T15开关,顶盖开合,举升,载重状态,行车取力,停车取力,挂车状态,紧急制动,前雾灯,后雾灯,日间行车灯,ABS启动信号,倒档,排风扇,泄爆装置,防盗报警器,厢内喷淋,轮毂降温,除湿器,厢内超温报警,厢内超压报警,厢内湿度报警,轮毂超温报警,烟雾报警,顶盖闭合状态1,顶盖闭合状态2',
                    fields: 'carNo,dataTimeStr,saveTimeStr,dwStatTag18,dirTag,speedGPS,dwStatTag1,dwStatTag2,dwStatTag3,height,mileage,lng,lat,oilCost,driverID,speedPluse,rev,oilLevel,dwStatTag4,dwStatTag5,dwStatTag89,dwStatTag10,dwStatTag11,dwStatTag12,dwStatTag13,dwStatTag14,dwStatTag15,dwStatTag16,dwStatTag17,dwStatTag18,dwStatTag19,dwStatTag20,dwStatTag21,alarmTag0,alarmTag1,alarmTag2,alarmTag3,alarmTag4,alarmTag5,alarmTag6,alarmTag7,alarmTag8,alarmTag9,alarmTag10,alarmTag11,alarmTag12,alarmTag13,alarmTag14,alarmTag18,alarmTag19,alarmTag20,alarmTag21,alarmTag22,alarmTag23,alarmTag24,alarmTag25,alarmTag26,alarmTag27,alarmTag28,alarmTag29,alarmTag30,alarmTag31,swtTag0,swtTag1,swtTag2,swtTag3,swtTag4,swtTag5,swtTag6,swtTag7,swtTag8,swtTag9,swtTag10,swtTag11,swtTag12,swtTag13,swtTag14,signal,satellite,openClose,switch0,switch1,switch2,switch3,switch4,switch5,switch6,switch7,switch8,switch9,switch10,switch11,switch12,switch13,switch14,switch15,switch16,switch17,switch18,switch19,switch20,switch21,switch22,switch23,switch24,switch25,switch26,switch27,switch28,switch29,switch30,switch31,switch32,switch33,switch34,switch35,switch36,switch37,switch38,switch39,switch40,switch41,switch42,switch43,switch44,switch45'
                }
                var dataStr = '';

                for(var item in totalData) {
                    dataStr += item + '=' + totalData[item] + '&'
                }
                window.location = axios.defaults.baseURL + '/drivingRecord/downloadDrivingRecord?' + dataStr
            }
        }
    }
</script>

<style scoped>
.searFormRow1{
    padding-bottom: 16px;
}
/* 行车记录表头第二行表单 */
.drivingRecordSearch{
    width: 100px;
    border: 0px !important;
}
.drivingRecordSearch .el-option{
     border:solid 1px #fff !important;
}
.secFormRow{
    margin:20px 0px 10px -24px;
}
.changeColor{
    font-size: 18px;
    padding-top: 2px;
}
.changeColor:hover{
    color: #1bb9fb;
}
.el-table .el-table__header th, .el-table .el-table__header tr{
    border-right: 1px solid #ddd;
}

</style>


