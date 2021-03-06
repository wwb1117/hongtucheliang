export default {
    state: {
        lang:"zh-CN",
        langs:{
            "zh-CN":"中文",
            "en-US":"英文"
        },
        version: '1.0',
        langIsOpen:false,
        userCustomIsOpen:false,
        orgTreeIsHide:false,
        orgTreeWidth: 192,
        baseUrl: '',
        isFreshCarTree: false,
        settings: {
            themeID: 10,
            navbarHeaderColor: 'bg-default-left dker',
            navbarCollapseColor: 'bg-default dk',
            asideColor: 'bg-light',
            headerFixed: true,
            asideFixed: false,
            asideFolded: false,
            asideDock: false,
            container: false,
            offScreen: false,
            deviceHeight: '638'
        },
        timerArr: [],
        orgVirData: {
            "checked":"false",
            "children":[],
            "icon":"",
            "iconClose":"",
            "iconOpen":"",
            "id":"-1",
            "pId": 'null',
            "isParent":"true",
            "name":"车辆监控中心",
            "open":"false",
            "parentTId":"0",
            "type":0
        },
        loginInfo: {},
        munuRouterMap: {
            '车辆管理': 'carManage',
            '车型管理': 'vehicleManage',
            '终端管理': 'terminalManage',
            '用户管理': 'userManage',
            '角色管理': 'roleManage',
            '位置监控': 'carMonitor',
            '行车记录查询': 'drivingRecord'
        },
        iconArr: ["fa fa-cog", "fa fa-user-circle-o", "fa fa-pie-chart"]
    },
    mutations: {
        setBaseUrl(state, value){
            state.baseUrl = value
        },
        addTimer(state, value){
            state.timerArr.push(value)
        },
        setLoginInfo(state, value){
            state.loginInfo = value
        },
        setOrgTreeWidth(state, value){
            state.orgTreeWidth = value
        },
        setOrgTreeIshide(state, value){
            state.orgTreeIsHide = value
        },
        setDeviceHeight(state, value){
            state.settings.deviceHeight = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setLangIsOpen(state, value){
            state.langIsOpen = value
        },
        setUserCustomIsOpen(state, value){
            state.userCustomIsOpen = value
        },
        setThemeID(state, value) {
            state.settings.themeID = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setNavbarHeaderColor(state, value) {
            state.settings.navbarHeaderColor = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setNavbarCollapseColor(state, value) {
            state.settings.navbarCollapseColor = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setAsideColor(state, value) {
            state.settings.asideColor = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setHeaderFixed(state, value) {
            state.settings.headerFixed = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setAsideFixed(state, value) {
            state.settings.asideFixed = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setAsideFolded(state, value) {
            state.settings.asideFolded = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setAsideDock(state, value) {
            state.settings.asideDock = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setContainer(state, value) {
            state.settings.container = value
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
        },
        setColor(state, obj){
            state.settings.navbarHeaderColor = obj.navbarHeaderColor
            state.settings.navbarCollapseColor = obj.navbarCollapseColor
            state.settings.asideColor = obj.asideColor
            window.localStorage.setItem("settings", JSON.stringify(state.settings))
            window.localStorage.clear();
        },
        setLang(state, lang){
            state.lang = lang
        },
        setOffScreen(state, value){
            state.settings.offScreen = value
        }
    }
};
