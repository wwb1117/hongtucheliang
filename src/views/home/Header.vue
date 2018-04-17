<template>
    <div class="app-header navbar">
        <div v-bind:class="['navbar-header '+ getNavbarHeaderColor]" v-bind:style="{height: '54px', textAlign: 'center', lineHeight: '54px', width: '60px'}">
            <button class="pull-right visible-xs dk">
                <i class="glyphicon glyphicon-cog"></i>
            </button>
            <button class="pull-right visible-xs" :class="{'active':offScreen}" @click="justify">
                <i class="glyphicon glyphicon-align-justify"></i>
            </button>
            <!-- <a href="javascript:void(0)" class="navbar-brand text-lt"> -->
                <!-- <i class="icon-globe"></i> -->
                <img src="static/img/logo.png">
                <!-- <span class="hidden-folded">鸿运</span> -->
            <!-- </a> -->
        </div>
        <div v-bind:style="{marginLeft: '60px'}" v-bind:class="['collapse pos-rlt navbar-collapse box-shadow '+ getNavbarCollapseColor]">
            <span>鸿途车联网管理系统</span>
            <!-- <FastMenu></FastMenu> -->
            <Toolbar></Toolbar>
        </div>
    </div>
</template>

<script>
    import Toolbar from 'views/home/ToolBar'
    // import FastMenu from 'views/home/FastMenu'
    export default {
        name: 'HQHeader',
        components: {
            Toolbar
            // FastMenu
        },
        computed: {
            getNavbarHeaderColor() {
                return this.$store.state.home.settings.navbarHeaderColor
            },
            getNavbarCollapseColor() {
                return this.$store.state.home.settings.navbarCollapseColor
            },
            getAsideFolded() {
                return this.$store.state.home.settings.asideFolded
            },
            offScreen(){
                return this.$store.state.home.settings.offScreen
            }
        },
        methods: {
            justify(){
                this.$store.commit('setOffScreen', !this.$store.state.home.settings.offScreen)
            }
        }
    }
</script>
<style scoped>
    /* .app-header>div>span{
        font-family: Microsoft YaHei;
        font-size: 22px;
        line-height: 50px;
    } */
    .app-header>div>a>span{
        font-size: 14px;
    }
    .navbar-btn{
        margin-left: -20px;
    }
</style>

