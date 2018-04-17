<template>
    <ul class="nav navbar-nav navbar-right">
        <!-- <Screenfull></Screenfull> -->
        <!-- <CustomFastMenu></CustomFastMenu> -->
        <!--用户信息-->
        <li>首页</li>
        <li>帮助</li>
        <li>留言</li>
        <li>安卓/苹果下载</li>
        <li v-bind:style="{height: '54px'}" class="dropdown user user-menu">
            <!-- <a href="javascript:void(0)" class="dropdown-toggle" dropdown-toggle>
                <img src="static/img/b1.jpg" class="user-image" alt="User Image">
                <span class="hidden-xs">admin.大圣</span>
                <i class="fa fa-caret-down"></i>
            </a>
            <ul class="dropdown-menu animated fadeInRight">
                <li>
                    <a href="javascript:void(0)">退出登录</a>
                </li>
            </ul> -->
            <el-dropdown v-bind:style="{height: '49px'}" trigger="click" @command="handelClick">
                <el-button v-bind:style="{background: 'transparent', color: '#ffffff', border: 'none', verticalAlign: 'middle'}">
                    <img src="static/img/b1.jpg" class="user-image" alt="User Image">
                    <span v-bind:style="{lineHeight: '18px'}" class="hidden-xs">{{userName}}</span>
                    <i class="fa fa-caret-down"></i>
                    <!-- <i class="el-icon-arrow-down el-icon--right"></i> -->
                </el-button>
                <el-dropdown-menu slot="dropdown">
                    <el-dropdown-item command="loginout">退出登录</el-dropdown-item>
                </el-dropdown-menu>
            </el-dropdown>
        </li>
        <!--语言切换-->
        <!-- <li class="dropdown hidden-sm" :class="{'open':langIsOpen}" dropdown @click.stop="openLangSelect()">
            <a href="javascript:void(0)" class="dropdown-toggle" dropdown-toggle>
                        {{$t(lang)}} <b class="caret"></b>
                    </a>
            <ul class="dropdown-menu animated fadeInRight w">
                <li v-for="(lang, key) in langs">
                    <a @click="openLangSelect();changeLanage(key)" href="javascript:void(0)">{{$t(key)}}</a>
                </li>
            </ul>
        </li> -->
    </ul>
</template>

<script>
    // import Screenfull from 'components/Screenfull'
    // import CustomFastMenu from 'views/menu/CustomFastMenu'
    // import {} from 'api/userCustom'
    import {logout} from 'api/login'
    export default {
        name: 'Toolbar',
        // components: {
        //     Screenfull,
        //     CustomFastMenu
        // },
        data() {
            return {
                ruleForm: {
                    name: '',
                    region: '',
                    date1: '',
                    date2: '',
                    delivery: false,
                    type: [],
                    resource: '',
                    desc: ''
                },
                userName: '',
                langs: this.$store.state.home.langs,
                visible: false,
                customMenuList: []
            }
        },
        computed: {

        },
        created(){
            // this.userName = this.$store.state.home.loginInfo.data.user.userName
            var userInfo = JSON.parse(window.localStorage.getItem("loginInfo"));

            this.userName = userInfo.data.user.userName
        },
        methods: {
            logout() {
                logout().then(() => {
                    sessionStorage.clear()
                    this.$router.push({
                        path: '/login'
                    })

                    var timerArr = this.GLOBAL.timerArr

                    for(var item of timerArr){
                        if(item){
                            clearInterval(item)
                        }
                    }
                }).catch(err =>{
                    this.$message({
                        type: 'error',
                        duration: 1500,
                        showClose: true,
                        message: err.message
                    });
                });
            },
            handelClick(command){
                if(command == "loginout"){
                    this.logout()
                }
            },
            updatePassword(){
                this.$emit("listenToChildEvent", true)
            }
        }
    }
</script>
<style scoped>
    .navbar-right>li{
        margin-left: 10px;
        font-size: 14px;
        line-height: 54px;
        color: #ffffff;
    }
    .user-menu a{
        color: #ffffff;
    }
    .user-menu i {
        font-size: 14px;
    }
    .zhedie{
        text-align: center;
        line-height: 54px;
    }
</style>
