<template>
    <div>
    <HQTabs></HQTabs>
     <div class="app-content">
        <div class="app-content-body fade-in-up">
            <transition name="custom-classes-transition" enter-active-class="fadeIn">
                <keep-alive>
                    <router-view :isRefresh="isRefresh"></router-view>
                </keep-alive>
            </transition>
        </div>
    </div>
    </div>

</template>

<script>
    import HQTabs from './Tab.vue'
    export default {
        name: 'HQContent',
        components:{
            HQTabs
        },
        computed: {
            isRefresh(){
                return this.$store.state.menu.isRefresh
            }
        }
    }
</script>

<style>

</style>
