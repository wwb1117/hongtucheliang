// 引入vue相关相关依赖
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store'
import directive from './directive/customDirective'
import myBase from './utils/base'
import components from './components/index'
import 'vue2-animate/dist/vue2-animate.min.css'

// 引入代码填充,解决浏览器兼容问题n
import 'babel-polyfill'
// IE浏览器报错问题n
import 'event-source-polyfill'

// 仅限于开发环境使用，用于模拟后端接口
// import './mock/index.js';

import 'element-ui/lib/theme-chalk/index.css'
// import '../theme/index.css'

// import elementUIVerify from 'element-ui-verify'

// 引入滚动条插件
import EasyScroll from 'easyscroll'
Vue.use(EasyScroll)

// 引入全局css
import './assets/css/bootstrap.css'
import './assets/css/animate.css'
import './assets/css/font-awesome.min.css'
import './assets/css/simple-line-icons.css'
import './assets/css/font.css'

// 引入jquery ,ztree
import 'jquery'
import 'ztree'
import 'ztree/css/metroStyle/metroStyle.css'

import './assets/css/app.css'

// 引入国际化
import VueI18n from 'vue-i18n'
import zh from './i18n/zh-cn.json'
import en from './i18n/en-us.json'

import VueAMap from 'vue-amap'
Vue.use(VueAMap)

VueAMap.initAMapApiLoader({
    key: 'a35de24331e8007c04755f4dc68ca059',
    plugin: ['AMap.Autocomplete', 'AMap.PlaceSearch', 'AMap.Scale', 'AMap.OverView', 'AMap.ToolBar', 'AMap.MapType', 'AMap.PolyEditor', 'AMap.CircleEditor']
})

Vue.use(VueI18n)
Vue.use(directive)
Vue.use(components)

import "./utils/ValidateUtils"

//自定义全局变量和函数
Vue.prototype.GLOBAL = myBase

myBase.backSpaceBiden()  //禁用浏览器返回键

//Vue.use(EasyScroll)

// 从浏览器缓存中获取用户当前的系统设置
var settings = window.localStorage.getItem("settings")

// 如果当前网站没有相关属性设置，则获取默认设置，并置入缓存；否则，取用户当前设置
if (settings) {
    store.state.home.settings = JSON.parse(settings)
} else {
    window.localStorage.setItem("settings", JSON.stringify(store.state.home.settings))
}

//获取登录信息
var loginInfo = JSON.parse(window.localStorage.getItem("loginInfo"))

if (loginInfo) {
    store.commit('SUCCESS_GET_MENULIST', loginInfo.data.menuList);
}

// 进入页面重新获取屏幕可视高度
var winheight = document.documentElement.clientHeight;
var winwidth = document.documentElement.clientWidth;

var diveheight = winheight - 130;

if (winwidth < 1280) {
    diveheight = diveheight - 17;
}

store.commit('setDeviceHeight', diveheight);

var menulist = JSON.parse(window.localStorage.getItem("menuList"));
var permission = JSON.parse(window.localStorage.getItem("permission"));

store.commit('SUCCESS_GET_MENULIST', menulist);
store.commit('SUCCESS_GET_PERSSION', permission);

// 国际化初始化
var language = (navigator.language || navigator.browserLanguage).toLowerCase();

if (language.indexOf("zh") > -1) {
    store.commit('setLang', "zh-CN")
} else {
    store.commit('setLang', "en-US")
}
var i18n = new VueI18n({
    locale: store.state.home.lang,
    messages: {
        "zh-CN": zh,
        "en-US": en
    }
})

// 设置最小分辨率
document.body.style.minWidth = "1280px";
document.body.style.overflow = "auto";


/* eslint-disable no-new */
new Vue({
    el: '#app',
    router,
    store,
    i18n,
    template: '<App/>',
    components: {
        App
    },
    created() {
        // 适应移动端
        // let x = document.body.clientWidth;

        // if(x < 768){
        //     this.$store.commit('setOffScreen', true)
        // }

    }
})


