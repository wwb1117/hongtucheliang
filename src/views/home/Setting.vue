<template>
    <div v-bind:class="['settings panel panel-default '+  (isShow ? 'active' : '') ]" @click="isShow = !isShow">
        <!-- settings -->
        <button class="btn btn-default no-shadow pos-abt">
              <i class="fa fa-spin fa-gear"></i>
            </button>
        <div class="panel-heading">
            Settings
        </div>
        <div class="panel-body">
            <div class="m-b-sm">
                <label class="i-switch bg-info pull-right">
                    <input type="checkbox" v-model="headerFixed">
                    <i></i>
                  </label> 固定头部
            </div>
            <div class="m-b-sm">
                <label class="i-switch bg-info pull-right">
                    <input type="checkbox" v-model="asideFixed">
                    <i></i>
                  </label> 固定左边栏
            </div>
            <div class="m-b-sm">
                <label class="i-switch bg-info pull-right">
                    <input type="checkbox" v-model="asideFolded">
                    <i></i>
                  </label> 折叠左边栏
            </div>
            <!-- <div class="m-b-sm">
                <label class="i-switch bg-info pull-right">
                    <input type="checkbox" v-model="asideDock">
                    <i></i>
                  </label> Dock aside
            </div> -->
            <div>
                <label class="i-switch bg-info pull-right">
                    <input type="checkbox" v-model="container">
                    <i></i>
                  </label> 内容居中
            </div>
        </div>
        <div class="wrapper b-t b-light bg-light lter r-b">
            <div class="row row-sm">
                <div class="col-xs-6">
                    <!-- <label class="i-checks block m-b" @click="setColor('bg-black','bg-white-only','bg-black')">
                            <input type="radio" name="a" v-model="themeID" value="1">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-black header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-black"></b>
                            </span>
                        </label> -->
                        <label class="i-checks block m-b" @click="setColor('bg-default-left','bg-default','bg-light')">
                            <input type="radio" name="a" v-model="themeID" value="1">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-black header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-black"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-dark','bg-white-only','bg-dark')">
                            <input type="radio" name="a" v-model="themeID" value="13">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-dark header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-white-only','bg-white-only','bg-black')">
                            <input type="radio" v-model="themeID" value="2">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-white header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-black"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-primary','bg-white-only','bg-dark')">
                            <input type="radio" v-model="themeID" value="3">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-primary header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-info','bg-white-only','bg-black')">
                            <input type="radio" v-model="themeID" value="4">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-info header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-black"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-success','bg-white-only','bg-dark')">
                            <input type="radio" v-model="themeID" value="5">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-success header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                    <label class="i-checks block" @click="setColor('bg-danger','bg-white-only','bg-dark')">
                            <input type="radio" v-model="themeID" value="6">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-danger header"></b>
                                <b class="bg-white header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                </div>
                <div class="col-xs-6">
                    <label class="i-checks block m-b" @click="setColor('bg-black','bg-black','bg-white b-r')">
                            <input type="radio" v-model="themeID" value="7">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-black header"></b>
                                <b class="bg-black header"></b>
                                <b class="bg-white"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-dark','bg-dark','bg-light')">
                            <input type="radio" name="a" v-model="themeID" value="14">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                            </span>
                            <b class="bg-dark header"></b>
                            <b class="bg-dark header"></b>
                            <b class="bg-light"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-info dker','bg-info dker','bg-light dker b-r')">
                            <input type="radio" v-model="themeID" value="8">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-info dker header"></b>
                                <b class="bg-info dker header"></b>
                                <b class="bg-light dker"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-primary','bg-primary','bg-dark')">
                            <input type="radio" v-model="themeID" value="9">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-primary header"></b>
                                <b class="bg-primary header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-info dker','bg-info dk','bg-black')">
                            <input type="radio" v-model="themeID" value="10">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-info dker header"></b>
                                <b class="bg-info dk header"></b>
                                <b class="bg-black"></b>
                            </span>
                        </label>
                    <label class="i-checks block m-b" @click="setColor('bg-success','bg-success','bg-dark')">
                            <input type="radio" v-model="themeID" value="11">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                    <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-success header"></b>
                                <b class="bg-success header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                    <label class="i-checks block" @click="setColor('bg-danger dker bg-gd','bg-danger dker bg-gd','bg-dark')">
                            <input type="radio" v-model="themeID" value="12">
                            <span class="block bg-light clearfix pos-rlt">
                                <span class="active pos-abt w-full h-full bg-black-opacity text-center">
                                <i class="glyphicon glyphicon-ok text-white m-t-xs"></i>
                                </span>
                                <b class="bg-danger dker header"></b>
                                <b class="bg-danger dker header"></b>
                                <b class="bg-dark"></b>
                            </span>
                        </label>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: 'HQSetting',
        data() {
            return {
                isShow: false,
                themeID: this.$store.state.home.settings.themeID
            }
        },
        computed: {
            asideFolded: {
                get: function() {
                    return this.$store.state.home.settings.asideFolded
                },
                set: function(v) {
                    this.$store.commit('setAsideFolded', v)
                }
            },
            headerFixed: {
                get: function() {
                    return this.$store.state.home.settings.headerFixed
                },
                set: function(v) {
                    this.$store.commit('setHeaderFixed', v)
                }
            },
            asideFixed: {
                get: function() {
                    return this.$store.state.home.settings.asideFixed
                },
                set: function(v) {
                    this.$store.commit('setAsideFixed', v)
                }
            },
            asideDock: {
                get: function() {
                    return this.$store.state.home.settings.asideDock
                },
                set: function(v) {
                    this.$store.commit('setAsideDock', v)
                }
            },
            container: {
                get: function() {
                    return this.$store.state.home.settings.container
                },
                set: function(v) {
                    this.$store.state.home.settings.container = v
                    this.$store.commit('setContainer', v)
                }
            }
        },
        methods: {
            setColor(navbarHeaderColor, navbarCollapseColor, asideColor) {
                const color = {};

                color.navbarHeaderColor = navbarHeaderColor
                color.navbarCollapseColor = navbarCollapseColor
                color.asideColor = asideColor
                this.$store.commit('setColor', color)
            },
            setThemeId(themeID) {
                this.$store.commit('setThemeID', themeID)
            }
        }
    }
</script>
