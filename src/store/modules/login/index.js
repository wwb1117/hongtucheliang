import {login} from 'api/login';
import Promise from 'es6-promise'

export default {
    state: {
        permissionList:[],                      // 权限列表
        menuList:[]                            // 菜单列表
    },
    actions: {
        // 登录
        Login({ commit }, user) {
            return new Promise((resolve, reject) => {
                login(user).then(response => {
                    sessionStorage.setItem("user", JSON.stringify(response.data.user))
                    sessionStorage.setItem("permissionList", JSON.stringify(response.data.permissionList))
                    resolve(response);
                }).catch(error => {
                    reject(error);
                });
            });
        }
    },
    mutations:{
        SET_SETTING: (state, setting) => {
            state.setting = setting;
        },
        SET_STATUS: (state, status) => {
            state.status = status;
        },
        SET_NAME: (state, name) => {
            state.name = name;
        },
        SET_AVATAR: (state, avatar) => {
            state.avatar = avatar;
        },
        SET_ROLES: (state, roles) => {
            state.roles = roles;
        },
        LOGIN_SUCCESS: () => {
            console.log('login success')
        },
        LOGOUT_USER: state => {
            state.user = '';
        }
    }
};
