import Vue from 'vue'
// 引入elementUi
import ElementUI from 'element-ui'
// 引入elementUi 表单验证插件
import elementUIVerify from 'element-ui-verify'
import enLocale from 'element-ui/lib/locale/lang/en'

Vue.use(ElementUI, {enLocale})

var myErroeTemplat = {
    empty: '请输入{alias}',
    length: '请输入{length}位字符',
    minLength: '输入内容至少{minLength}位',
    number: '请输入数字',
    int: '请输入整数',
    lt: '输入数字应小于{lt}',
    lte: '输入数字不能大于{lte}',
    gt: '输入数字应大于{gt}',
    gte: '输入数字不能小于{gte}',
    maxDecimalLength: '该输入项最多接受{maxDecimalLength}位小数',
    phone: '请输入正确的手机号',
    email: '请输入正确的邮箱',
    verifyCode: '请输入正确的验证码'
}

Vue.use(elementUIVerify, {
    errorMessageTemplate: myErroeTemplat,
    fieldChange: 'verify'
})

//******************************************************************VIN码
elementUIVerify.addRule("VerifyVin", () => [{
    validator(rule, val, callback1) {
        if(/^[A-Za-z0-9]+$/.test(val)){
            callback1()
        }else{
            callback1(Error("请输入数字和字母"))
        }

    }
}])
//******************************************************************SIM卡号
elementUIVerify.addRule("VerifySimNo", () => [{
    validator(rule, val, callback1) {
        if(val.length > 13){
            callback1(Error("请输入 13 位SIM卡号"))
        }else{
            if(/^[0-9]*$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入数字"))
            }
        }
    }
}])
//******************************************************************车牌号
elementUIVerify.addRule("VerifyCarNo", () => [{
    validator(rule, val, callback1) {
        if(val.length > 10){
            callback1(Error("最多可输入 10 位车牌号"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字或字母"))
            }
        }
    }
}])
//******************************************************************车型名称
elementUIVerify.addRule("VerifyCarModelName", () => [{
    validator(rule, val, callback1) {
        if(val.length > 40){
            callback1(Error("最多可输入 40 位车型名称"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字或字母"))
            }
        }
    }
}])
//******************************************************************公告号
elementUIVerify.addRule("VerifyModelCode", () => [{
    validator(rule, val, callback1) {
        if(val.length > 40){
            callback1(Error("最多可输入 40 位公告号"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字或字母"))
            }
        }
    }
}])
//******************************************************************公告批次
elementUIVerify.addRule("VerifyNoticeBatchno", () => [{
    validator(rule, val, callback1) {
        if(val.length > 10){
            callback1(Error("最多可输入 10 位公告批次"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字或字母"))
            }
        }
    }
}])

//******************************************************************终端号
elementUIVerify.addRule("VerifyTerminal", () => [{
    validator(rule, val, callback1) {
        if(val.length > 20){
            callback1(Error("最多可输入 20 位终端号"))
        }else{
            if(/^[A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入数字或字母"))
            }
        }
    }
}])
//******************************************************************终端型号
elementUIVerify.addRule("VerifyTerminalModel", () => [{
    validator(rule, val, callback1) {
        if(val.length > 40){
            callback1(Error("最多可输入 40 位终端型号"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字或字母"))
            }
        }
    }
}])
//******************************************************************角色名称
elementUIVerify.addRule("VerifyRoleName", () => [{
    validator(rule, val, callback1) {
        if(val.length > 10){
            callback1(Error("最多可输入 10 位角色名称"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字或字母"))
            }
        }
    }
}])
//******************************************************************ICCID
elementUIVerify.addRule("VerifyICCID", () => [{
    validator(rule, val, callback1) {
        if(val.length > 20){
            callback1(Error("最多可输入 20 位ICCID"))
        }else{
            if(/^[A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入数字或字母"))
            }
        }
    }
}])
//******************************************************************终端版本号
elementUIVerify.addRule("VerifyTeminalVer", () => [{
    validator(rule, val, callback1) {
        if(val.length > 10){
            callback1(Error("最多可输入 10 位终端版本号"))
        }else{
            if(/^[A-Za-z0-9]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入数字或字母"))
            }
        }
    }
}])
//******************************************************************电话号码
elementUIVerify.addRule("VerifyPhone", () => [{
    validator(rule, val, callback1) {
        if(/^(13[0-9]|14[5|7]|15[0|1|2|3|5|6|7|8|9]|18[0|1|2|3|5|6|7|8|9])\d{8}$/.test(val)){
            callback1()
        }else if(/\d{3}-\d{8}|\d{4}-\d{7}/.test(val)){
            callback1()
        }else{
            callback1(Error("请输入正确的电话号码"))
        }
    }
}])
//******************************************************************邮箱
elementUIVerify.addRule("VerifyEmail", () => [{
    validator(rule, val, callback1) {
        if(/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/.test(val)){
            callback1()
        }else{
            callback1(Error("请输入正确的邮箱地址"))
        }
    }
}])
//******************************************************************数字字母
elementUIVerify.addRule("VerifyNumABC", () => [{
    validator(rule, val, callback1) {
        if(/^[A-Za-z0-9]+$/.test(val)){
            callback1()
        }else{
            callback1(Error("请输入数字或字母"))
        }
    }
}])
//******************************************************************数字
elementUIVerify.addRule("VerifyNum", () => [{
    validator(rule, val, callback1) {
        if(/^[0-9]+(.[0-9]{1,3})?$/.test(val)){
            callback1()
        }else{
            callback1(Error("请输入数字"))
        }
    }
}])
//******************************************************************数字字母中文
elementUIVerify.addRule("VerifyNumABCZh", () => [{
    validator(rule, val, callback1) {
        if(/^[\u4E00-\u9FA5A-Za-z0-9]+$/.test(val)){
            callback1()
        }else{
            callback1(Error("请输入中文，数字或字母"))
        }
    }
}])
//******************************************************************登录账号
elementUIVerify.addRule("VerifyLoginName", () => [{
    validator(rule, val, callback1) {
        if(val.length > 10 || val.length < 4){
            callback1(Error("请输入长度在4 到 10位登录账号"))
        }else{
            if(/^[\u4E00-\u9FA5A-Za-z0-9@_-]+$/.test(val)){
                callback1()
            }else{
                callback1(Error("请输入中文，数字，字母"))
            }
        }
    }
}])
