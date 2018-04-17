<template>
    <div class="app" v-bind:class="{'app-header-fixed':headerFixed,'app-aside-fixed':asideFixed, 'app-aside-folded':asideFolded,'app-aside-dock':asideDock, 'container':container}" @click="handleFloatFlag()">
        <HQHeader></HQHeader>
        <HQMenu :menuList = "menuList"></HQMenu>
        <HQContent></HQContent>
        <HQFooter></HQFooter>
        <!-- <HQSetting></HQSetting> -->
    </div>
</template>

<script>
    import HQHeader from 'views/home/Header'
    import HQMenu from 'views/home/Menu'
    import HQContent from 'views/home/Content'
    import HQFooter from 'views/home/Footer'
    import HQSetting from 'views/home/Setting'
    // import api from 'api/menu'
    export default {
        name: 'home',
        components: {
            HQHeader,
            HQMenu,
            HQContent,
            HQFooter,
            HQSetting
        },
        data () {
            return {
                menuList:[]
            }
        },
        computed: {
            asideFolded() {
                return this.$store.state.home.settings.asideFolded
            },
            headerFixed() {
                if(this.$store.state.home.settings.asideDock  &&  this.$store.state.home.settings.asideFixed){
                    this.$store.commit('setHeaderFixed', true)
                }

                return this.$store.state.home.settings.headerFixed
            },
            asideFixed() {
                return this.$store.state.home.settings.asideFixed
            },
            asideDock() {
                return this.$store.state.home.settings.asideDock
            },
            container() {
                if(this.$store.state.home.settings.container){
                    this.$store.commit('setHeaderFixed', false)
                    this.$store.commit('setAsideFixed', false)
                }
                return this.$store.state.home.settings.container
            }
        },
        methods : {
            // 这里不需要使用状态管理，待修改
            getModuleList:function (){
                this.menuList = this.$store.state.menu.menuList;
            },
            handleFloatFlag:function(){
                this.$store.commit('setLangIsOpen', false)
                this.$store.commit('setUserCustomIsOpen', false)
            }
        },
        created(){
            this.getModuleList();
            this.$router.push({path: '/main'});
        }
    }
</script>
