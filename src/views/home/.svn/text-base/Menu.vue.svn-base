<template>
    <div v-bind:style="{height: wrapHeight + 'px' }" v-bind:class="[offScreen?'app-aside hidden-xs '+ asideColor +' off-screen':'app-aside hidden-xs '+ asideColor ]">
        <div class="aside-wrap">
            <div class="slimScrollDiv" style="position: relative; width: auto; height: 100%;">
                <div class="navi-wrap">
                    <!-- <AsideUser></AsideUser> -->
                    <nav class="navi">
                        <!--左侧菜单-->
                        <ul id="menu_ul" class="nav">
                            <!-- <li class="sildnav_colbtn_box">
                                    <a href="javascript:void(0);" class="sildnav_colbtn" @click="collapse()">
                                        <i class="fa" v-bind:class="[this.$store.state.home.settings.asideFolded ? 'fa-indent' : 'fa-outdent']"></i>
                                    </a>
                                </li> -->
                            <li v-bind:style="{'border-bottom': '1px solid #ddd','height':'40px','margin':'0px 18px'}">
                                <a href="javascript:void(0)" class="auto colspan">
                                    <!-- <span v-bind:style="{color: '#272829', fontWeight: 700}">功能导航</span> -->
                                    <span class="pull-right text-muted"></span>
                                    <i class="fa" @click="collapse()" v-bind:class="[this.$store.state.home.settings.asideFolded ? 'fa-indent zhedie' : 'fa-outdent']"></i>
                                </a>
                            </li>
                            <li @click="pmenuEvent($event)" :style="{'margin-top':'30px','color':'#666','font-size':'14px'}" v-for="firMenu in menuList" :key="firMenu.name" :class="{'active':curFirMenuId == firMenu.id}">
                                <!--如果一级菜单有子菜单，点击触发展开折叠事件-->
                                <a href="javascript:void(0)" class="auto">
                                        <span class="pull-right text-muted" v-show="firMenu.childCount > 0">
                                            <i class="fa fa-fw fa-angle-right text"></i>
                                            <i class="fa fa-fw fa-angle-down text-active"></i>
                                        </span>
                                        <i v-bind:class="firMenu.icon"></i>
                                        <span>{{firMenu.name}}</span>
                                    </a>
                                <ul class="nav nav-sub dk">
                                    <li v-for="secMenu in firMenu.children" :key="secMenu.name" :class="{'active':curSecMenuId === secMenu.id}">
                                        <a @click="handleClick(secMenu,1)">
                                            <!-- <i v-bind:class="secMenu.icon"></i> -->
                                            {{secMenu.name}}
                                        </a>
                                    </li>
                                </ul>
                            </li>
                        </ul>
                    </nav>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    // import AsideUser from 'views/home/AsideUser'
    export default {
        props: ["menuList"],
        name: 'HQMenu',
        // components:{
        //     AsideUser
        // },
        wrapHeight: 786,
        computed: {
            opendMenuList() {
                return this.$store.state.menu.opendMenuList
            },
            asideColor() {
                return this.$store.state.home.settings.asideColor
            },
            asideFolded() {
                return this.$store.state.home.settings.asideFolded
            },
            curFirMenuId() {
                return this.$store.state.menu.curOpenFirMenuId
            },
            curSecMenuId() {
                return this.$store.state.menu.curOpenSecMenuId
            },
            offScreen() {
                return this.$store.state.home.settings.offScreen
            }
        },
        methods: {
            handleClick(menu, isChild) {
                if (this.$store.state.menu.opendMenuList.length > 11) {
                    this.$message.warning("对不起，最多只能打开11个页签")
                    return
                }
                // if (this.asideColor) {
                //     this.$store.commit('setAsideFolded', false);
                // }
                // if (menu.pid) {
                //     this.$store.commit('setOffScreen', !this.$store.state.home.settings.offScreen)
                // }
                // this.$store.dispatch('setIsRefresh', menu);
                if (isChild) {
                    // 记录已经打开的菜单列表
                    this.$store.dispatch('setOpendMenuList', menu);
                    // 记录当前打开的菜单
                    this.$store.dispatch('setCurOpendMenu', menu);
                    // 路由跳转
                    this.$router.push({
                        path: '/' + menu.routerPath
                    });
                }
            },
            pmenuEvent($event){
                $('#menu_ul>li').removeClass('active')
                $event.currentTarget.className = 'active'
            },
            collapse() {
                this.$store.commit('setAsideFolded', !this.$store.state.home.settings.asideFolded)
            }
        },
        created() {
            this.wrapHeight = this.$store.state.home.settings.deviceHeight + 40;
        }
    }
</script>

<style scoped>
    .sildnav_colbtn_box {
        background: #edf1f2 !important;
    }
    .navi ul.nav li a{
        color: #666;
    }
    .navi ul.nav li a:hover{
        color: #3fc5fd;
    }
    .navi ul.nav li a > i::before{
        color: #999;
    }
    .fa-indent{
        /* padding: 20px 60px; */
        padding: 8px 0px;
    }
    .fa-outdent{
        /* padding: 0px 0px; */
        padding: 0px 60px;
    }
</style>
