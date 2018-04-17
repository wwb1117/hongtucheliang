import api from 'api/menu'
import Promise from 'es6-promise'

// var defaultPage = {name:"首页", moduleLink:"/main", i18n:"defaultPage"}

var defaultPage = {
    id:"000",
    pid:"000",
    name:"首页",
    type:"F",
    icon:"fa fa-user-o",
    routerPath:"main",
    authUrl:null,
    createTime: 1491989296000,
    updateTime: null,
    isDeleted: false
}

export default {
    state: {
        defaultPage:defaultPage,
        menuList: [],               // 菜单列表
        permissionList:[],          // 权限列表
        opendMenuList:[defaultPage],       // 已打开菜单列表
        curOpenMenu:defaultPage,           // 当前打开的菜单列表
        curOpenFirMenuId: 1,
        curOpenSecMenuId:null,
        isRefresh:true
    },
    actions: {
        getMenuList({ commit }) {
            return new Promise((resolve, reject) => {
                api.getMenuList().then(response => {
                    if (response.status != 200) {
                        commit('FAILURE_GET_MENULIST')
                    } else {
                        commit('SUCCESS_GET_MENULIST', response.data)
                    }
                    resolve(response);
                }).catch(error => {
                    commit('FAILURE_GET_MENULIST')
                    reject(error);
                });
            });
        },
        setOpendMenuList({ commit }, value){
            commit('SET_OPEND_MENU_LIST', value)
        },
        setCurOpendMenu({ commit }, value){
            commit('SET_CUR_OPEND_MENU', value)
        },
        setIsRefresh({ commit }, value){
            commit('SET_IS_REFRESH', value)
        },
        closeTab({commit}, value){
            commit('CLOSE_TAB', value)
        },
        openDefaultPage({commit}){
            commit('OPEN_DEFAULT_PAGE')
        }
    },
    methods:{

    },
    mutations: {
        // 加载菜单列表成功
        ['SUCCESS_GET_MENULIST'](state, menuList) {
            state.menuList = menuList
        },
        ['SUCCESS_GET_PERSSION'](state, permissionList) {
            state.permissionList = permissionList
        },
        // 加载菜单列表失败
        ['FAILURE_GET_MENULIST'](state) {
            state.menuList = []
        },
        // 记录打开的菜单列表
        ['SET_OPEND_MENU_LIST'](state, value) {
            // 如果有子菜单，则不计入tab列表
            if (value.childCount > 0) {
                return;
            }

            let opendMenuListTemp = state.opendMenuList;
            let isAdd = true

            // 避免一个菜单加入多次 （需要遵循es6编码规范，需多多学习）
            for (let i = 0; i < opendMenuListTemp.length; i++) {
                if (opendMenuListTemp[i].id == value.id) {
                    isAdd = false;
                    break;
                }
            }

            if (isAdd) {
                opendMenuListTemp.push(value)
            }

            state.opendMenuList = opendMenuListTemp
        },
        // 记录当前打开的菜单
        ['SET_CUR_OPEND_MENU'](state, value) {
            // 一级菜单
            if (!value.pid) {
                // 控制一级菜单是否展开
                if (state.curOpenFirMenuId == value.id) {
                    state.curOpenFirMenuId = null
                } else {
                    state.curOpenFirMenuId = value.id
                }
                // 取消二级菜单选中
                state.curOpenSecMMenuId = null
            // 二级菜单
            } else {
                state.curOpenFirMenuId = value.pid;
                state.curOpenSecMenuId = value.id
            }

            // 如果有子菜单，则不设置当前打开菜单
            if (value.childCount > 0) {
                return;
            }

            state.curOpenMenu = value
        },
        // 记录页面是否需要重新刷新
        ['SET_IS_REFRESH'](state) {
            let flag = true;

            // for (let i = 0; i < state.opendMenuList.length; i++) {
            //     if (state.opendMenuList[i].id == value.id) {
            //         flag = false;
            //         break
            //     }
            // }

            state.isRefresh = flag
        },
        ['CLOSE_TAB'](state, value){
            let opendMenuListTemp = [];
            let lastIndex = 0
            let length = state.opendMenuList.length

            for (let i = 0; i < length; i++) {
                if (state.opendMenuList[i].id != value.id) {
                    opendMenuListTemp.push(state.opendMenuList[i]);
                }else{
                    lastIndex = i
                }
            }

            if(length == 1){ //菜单栏只有一项
                return
            }

            if(state.curOpenSecMenuId == value.id){  //关闭的菜单是当前打开的菜单
                let leng = opendMenuListTemp.length;

                if(length - 1 == 0){                //菜单栏只有一项
                    return
                }else if(lastIndex == length - 1){  //当前所关闭的菜单是最后一项
                    state.curOpenMenu = opendMenuListTemp[leng - 1];
                    state.curOpenFirMenuId = opendMenuListTemp[leng - 1].pid;
                    state.curOpenSecMenuId = opendMenuListTemp[leng - 1].id
                }else{
                    state.curOpenMenu = opendMenuListTemp[leng - 1];
                    state.curOpenFirMenuId = opendMenuListTemp[leng - 1].pid;
                    state.curOpenSecMenuId = opendMenuListTemp[leng - 1].id
                }

            }


            state.opendMenuList = opendMenuListTemp

        },
        ['OPEN_DEFAULT_PAGE'](state){
            state.opendMenuList = [defaultPage]
            state.curOpenMenu = defaultPage
            state.curOpenFirMenuId = "000"
            state.curOpenSecMenuId = defaultPage.id
        }
    }
};
