<template>
    <div class="clearfix hidden-xs text-center" id="aside-user" v-show="!asideFolded">

        <div>
            <a>
                <span class="thumb-lg w-auto-folded avatar m-t-sm">
                    <img src="static/img/b1.jpg" class="img-full" alt="...">
                </span>
            </a>
            <a>
                <span class="clear">
                    <span class="block m-t-sm">
                        <span class="text-lt">欢迎你，</span><strong class="font-bold text-lt">admin</strong>

                    </span>
                </span>
            </a>
        </div>
        <div class="line dk hidden-folded"></div>
    </div>
</template>

<script>
    export default {
        name:'AsideUser',
        computed: {
            asideFolded() {
                return this.$store.state.home.settings.asideFolded
            }
        }
    }
</script>
