<template>
    <div class="bg-light lter b-b app-tab">
        <ul class="nav nav-tabs">
            <li>
                <a href="javascript:void(0)" v-bind:style="{paddingRight: '0px'}">
                    <i class="fa fa-home" v-bind:style="{color: '#1bb9fb', fontSize: '18px'}"></i>
                </a>
            </li>
            <li role="presentation" v-for="menu in opendMenuList" :key="menu.name" :class="{'active':curOpendMenu.id === menu.id}">
                <a href="javascript:void(0)" @click="handleClick(menu)">
                    {{menu.name}}
                    <span class="close"
                    @click.stop="closeTab(menu)"
                    >
                        <i class="fa fa-close" ></i>
                    </span>
                </a>
            </li>
        </ul>
    </div>
</template>

<script>
    export default {
        name: 'HQTabs',
        computed: {
            opendMenuList() {
                return this.$store.state.menu.opendMenuList
            },
            curOpendMenu() {
                return this.$store.state.menu.curOpenMenu
            }
        },
        methods: {
            handleClick(menu) {
                this.$store.dispatch('setIsRefresh', menu);
                this.$store.dispatch('setCurOpendMenu', menu);
                this.$router.push({
                    path: '/' + menu.routerPath
                });
            },
            closeTab(menu){
                this.$store.dispatch('closeTab', menu);
                this.$router.push({
                    path: '/' + this.curOpendMenu.routerPath
                });

            }
        }
    }
</script>
<style>
</style>

