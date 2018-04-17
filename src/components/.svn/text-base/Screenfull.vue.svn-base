<template>
    <li class="hidden-xs">
        <a class="dropdown-toggle" @click='screenfull'>
            <i v-bind:class="'fa ' + (isFullscreen?'fa-compress':'fa-expand')" ></i>
        </a>
    </li>
</template>

<script>
    import screenfull from 'screenfull'
    export default {
        name: 'screenfull',
        data() {
            return {
                isFullscreen: false
            }
        },
        methods: {
            screenfull() {
                if (!screenfull.enabled) {
                    this.$message.error('当前浏览器不支持全屏显示');
                    return false
                }
                screenfull.toggle()
            }
        },
        mounted(){
            document.addEventListener('fullscreenchange', () => {
                this.isFullscreen = !this.isFullscreen;
            });
            document.addEventListener('mozfullscreenchange', () => {
                this.isFullscreen = !this.isFullscreen;
            });
            document.addEventListener('webkitfullscreenchange', () => {
                this.isFullscreen = !this.isFullscreen;
            });
            document.addEventListener('msfullscreenchange', () => {
                this.isFullscreen = !this.isFullscreen;
            });
        }
    }
</script>
