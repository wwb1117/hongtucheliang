<template>
    <div class="login-container">
        <div class="inner-bg">
            <div class="container">
                <div class="row">
                    <div class="col-sm-6 col-sm-offset-3 form-box">
                        <div class="form-top">
                            <div class="form-top-left">
                                <h3><strong>鸿泉</strong> 4.0平台</h3>
                                <p>温馨提示：建议使用IE10及以上、360极速模式、火狐等浏览器浏览！</p>
                            </div>
                            <div class="form-top-right">
                                <i class="fa fa-lock"></i>
                            </div>
                        </div>
                        <div class="form-bottom">
                            <div class="form-group" v-show="errorMsg != ''">
                                <span><font color="#de615e">{{errorMsg}}</font></span>
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-username">用户名</label>
                                <input type="text" placeholder="请输入用户名" class="form-username form-control" v-model="user.username" @keyup.enter="handleLogin()">
                            </div>
                            <div class="form-group">
                                <label class="sr-only" for="form-password">密 码</label>
                                <input type="password" name="form-password" placeholder="请输入密码" class="form-password form-control" v-model="user.password" @keyup.enter="handleLogin()">
                            </div>
                            <button class="btn" @click="handleLogin()">登录</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    /*eslint-disable no-unused-vars*/
    import backstretch from 'jquery-backstretch'
    import $ from 'jquery'
    export default {
        name: 'login',
        data() {
            return {
                user: {
                    username: '',
                    password: '',
                    captcha:''
                },
                errorMsg:''
            }
        },
        methods: {
            init(){
                // 左侧菜单折叠
                this.$store.commit('setAsideFolded', true);

                //记录当前打开的页面
                this.$store.dispatch('openDefaultPage');
                // 记录已经打开的菜单列表
                // this.$store.dispatch('setOpendMenuList', menu);
                // 默认打开首页
                this.$router.push({path: '/' + this.$store.state.menu.curOpenMenu.routerPath});

            },
            handleLogin() {
                this.$store.dispatch('Login', this.user).then((response) => {

                    this.init();

                    this.$store.commit('setLoginInfo', response);

                    window.localStorage.setItem("loginInfo", JSON.stringify(response));

                    var perMunuList = response.data.privilegeNodeList
                    var menuList = []
                    var permissionArr = []
                    var iconArr = this.$store.state.home.iconArr
                    var munuRouterMap = this.$store.state.home.munuRouterMap

                    $.each(perMunuList, function(i, item){
                        var mainmenu = {
                            id: item.privisId,
                            name: item.name,
                            icon: iconArr[item.sort - 1],
                            children: [],
                            pid: item.parent
                        }

                        $.each(item.children, function(j, item2){
                            var secmenu = {
                                id: item2.privisId,
                                name: item2.name,
                                routerPath: munuRouterMap[item2.name],
                                pid: item2.parent
                            }

                            mainmenu.children.push(secmenu)

                            $.each(item2.children, function(k, item3){
                                permissionArr.push(item2.name + "_" + item3.name)
                            })
                        })

                        menuList.push(mainmenu)
                    })

                    this.$store.commit('SUCCESS_GET_MENULIST', menuList);
                    this.$store.commit('SUCCESS_GET_PERSSION', permissionArr);

                    window.localStorage.setItem("menuList", JSON.stringify(menuList));
                    window.localStorage.setItem("permission", JSON.stringify(permissionArr));

                }).catch(err => {
                    this.errorMsg = err.message
                    this.loading = false;
                });
            }
        },
        beforeCreate() {
            // 使用jquery插件，切换背景图片
            $.backstretch(['static/img/bg1.jpg', 'static/img/bg2.jpg', 'static/img/bg3.jpg'], {
                duration: 3000,
                fade: 750
            })
        }
    }
</script>

<style scoped>
    body {
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        color: #888;
        line-height: 30px;
        text-align: center;
    }
    strong {
        font-weight: 500;
    }
    a,
    a:hover,
    a:focus {
        color: #de615e;
        text-decoration: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }
    h1,
    h2 {
        margin-top: 10px;
        font-size: 38px;
        font-weight: 100;
        color: #555;
        line-height: 50px;
    }
    h3 {
        font-size: 22px;
        font-weight: 300;
        color: #555;
        line-height: 30px;
    }
    img {
        max-width: 100%;
    }
    ::-moz-selection {
        background: #de615e;
        color: #fff;
        text-shadow: none;
    }
    ::selection {
        background: #de615e;
        color: #fff;
        text-shadow: none;
    }
    .btn-link-1 {
        display: inline-block;
        height: 50px;
        margin: 5px;
        padding: 16px 20px 0 20px;
        background: #de615e;
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    .btn-link-1:hover,
    .btn-link-1:focus,
    .btn-link-1:active {
        outline: 0;
        opacity: 0.6;
        color: #fff;
    }
    .btn-link-1.btn-link-1-facebook {
        background: #4862a3;
    }
    .btn-link-1.btn-link-1-twitter {
        background: #55acee;
    }
    .btn-link-1.btn-link-1-google-plus {
        background: #dd4b39;
    }
    .btn-link-1 i {
        padding-right: 5px;
        vertical-align: middle;
        font-size: 20px;
        line-height: 20px;
    }
    .btn-link-2 {
        display: inline-block;
        height: 50px;
        margin: 5px;
        padding: 15px 20px 0 20px;
        background: rgba(0, 0, 0, 0.3);
        border: 1px solid #fff;
        font-size: 16px;
        font-weight: 300;
        line-height: 16px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
    }
    .btn-link-2:hover,
    .btn-link-2:focus,
    .btn-link-2:active,
    .btn-link-2:active:focus {
        outline: 0;
        opacity: 0.6;
        background: rgba(0, 0, 0, 0.3);
        color: #fff;
    }
    /***** Top content *****/
    .inner-bg {
        padding: 100px 0 170px 0;
    }
    .login-container .text {
        color: #fff;
    }
    .login-container .text h1 {
        color: #fff;
    }
    .login-container .description {
        margin: 20px 0 10px 0;
    }
    .login-container .description p {
        opacity: 0.8;
    }
    .login-container .description a {
        color: #fff;
    }
    .login-container .description a:hover,
    .login-container .description a:focus {
        border-bottom: 1px dotted #fff;
    }
    .form-box {
        margin-top: 35px;
    }
    .form-top {
        overflow: hidden;
        padding: 0 25px 15px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.35);
        -moz-border-radius: 4px 4px 0 0;
        -webkit-border-radius: 4px 4px 0 0;
        border-radius: 4px 4px 0 0;
        text-align: left;
    }
    .form-top-left {
        float: left;
        width: 75%;
        padding-top: 25px;
    }
    .form-top-left h3 {
        margin-top: 0;
        color: #fff;
    }
    .form-top-left p {
        opacity: 0.8;
        color: #fff;
    }
    .form-top-right {
        float: left;
        width: 25%;
        padding-top: 5px;
        font-size: 66px;
        color: #fff;
        line-height: 100px;
        text-align: right;
        opacity: 0.3;
    }
    .form-bottom {
        padding: 25px 25px 30px 25px;
        background: #444;
        background: rgba(0, 0, 0, 0.3);
        -moz-border-radius: 0 0 4px 4px;
        -webkit-border-radius: 0 0 4px 4px;
        border-radius: 0 0 4px 4px;
        text-align: left;
    }
    .form-bottom textarea {
        height: 100px;
    }
    .form-bottom button.btn {
        width: 100%;
    }
    .form-bottom .input-error {
        border-color: #de615e;
    }
    .social-login {
        margin-top: 35px;
    }
    .social-login h3 {
        color: #fff;
    }
    .social-login-buttons {
        margin-top: 25px;
    }
    /***** Media queries *****/
    @media (min-width: 992px) and (max-width: 1199px) {}
    @media (min-width: 768px) and (max-width: 991px) {}
    @media (max-width: 767px) {
        .inner-bg {
            padding: 60px 0 110px 0;
        }
    }
    @media (max-width: 415px) {
        h1,
        h2 {
            font-size: 32px;
        }
    }
    input[type="text"],
    input[type="password"],
    textarea,
    textarea.form-control {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #fff;
        border: 3px solid #fff;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #888;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }
    textarea,
    textarea.form-control {
        padding-top: 10px;
        padding-bottom: 10px;
        line-height: 30px;
    }
    input[type="text"]:focus,
    input[type="password"]:focus,
    textarea:focus,
    textarea.form-control:focus {
        outline: 0;
        background: #fff;
        border: 3px solid #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    input[type="text"]:-moz-placeholder,
    input[type="password"]:-moz-placeholder,
    textarea:-moz-placeholder,
    textarea.form-control:-moz-placeholder {
        color: #888;
    }
    input[type="text"]:-ms-input-placeholder,
    input[type="password"]:-ms-input-placeholder,
    textarea:-ms-input-placeholder,
    textarea.form-control:-ms-input-placeholder {
        color: #888;
    }
    input[type="text"]::-webkit-input-placeholder,
    input[type="password"]::-webkit-input-placeholder,
    textarea::-webkit-input-placeholder,
    textarea.form-control::-webkit-input-placeholder {
        color: #888;
    }
    button.btn {
        height: 50px;
        margin: 0;
        padding: 0 20px;
        vertical-align: middle;
        background: #de615e;
        border: 0;
        font-family: 'Roboto', sans-serif;
        font-size: 16px;
        font-weight: 300;
        line-height: 50px;
        color: #fff;
        -moz-border-radius: 4px;
        -webkit-border-radius: 4px;
        border-radius: 4px;
        text-shadow: none;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
        -o-transition: all .3s;
        -moz-transition: all .3s;
        -webkit-transition: all .3s;
        -ms-transition: all .3s;
        transition: all .3s;
    }
    button.btn:hover {
        opacity: 0.6;
        color: #fff;
    }
    button.btn:active {
        outline: 0;
        opacity: 0.6;
        color: #fff;
        -moz-box-shadow: none;
        -webkit-box-shadow: none;
        box-shadow: none;
    }
    button.btn:focus {
        outline: 0;
        opacity: 0.6;
        background: #de615e;
        color: #fff;
    }
    button.btn:active:focus,
    button.btn.active:focus {
        outline: 0;
        opacity: 0.6;
        background: #de615e;
        color: #fff;
    }
</style>
