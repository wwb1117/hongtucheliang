<template>
    <div class="col-sm-6">
        <form name="forma" class="form-horizontal form-validation">
            <div class="panel">
                <h5 class="font-bold">终端基本信息</h5>
                <div class="panel-body">
                    <div class="col-sm-12">
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>终端名称：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.productName}}
                                </small>
                            </span>
                        </div>
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>终端型号：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.modelNo}}
                                </small>
                            </span>
                        </div>
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>终端厂商：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.producer}}
                                </small>
                            </span>
                        </div>
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>监控信道种类：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.channelType}}
                                </small>
                            </span>
                        </div>
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>终端适用车型：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.trialModel}}
                                </small>
                            </span>
                        </div>
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>终端定位模式：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.positionMode}}
                                </small>
                            </span>
                        </div>
                        <div class="list-group list-group-lg list-group-sp">
                            <span class="clear">
                                <span>出厂日期：</span>
                                <small class="text-muted text-ellipsis1">
                                    {{terminalInfo.factoryDate}}
                                </small>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </form>
    </div>
</template>

<script>
 export default{
     props:['terminalInfo']
 }
</script>
