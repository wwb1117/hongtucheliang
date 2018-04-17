<template>
    <div>
        <p align="center">{{date}} {{time}}</p>
    </div>
</template>

<script>
    export default {
        name: 'Clock',
        data() {
            return {
                time: '',
                date: ''
            }
        },
        methods: {
            updateTime: function() {
                var cd = new Date();
                var week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六'];

                this.time = this.zeroPadding(cd.getHours(), 2) + ':' + this.zeroPadding(cd.getMinutes(), 2) + ':' + this.zeroPadding(cd.getSeconds(), 2);
                this.date = this.zeroPadding(cd.getFullYear(), 4) + '-' + this.zeroPadding(cd.getMonth() + 1, 2) + '-' + this.zeroPadding(cd.getDate(), 2) + ' ' + week[cd.getDay()];
            },
            zeroPadding: function(num, digit) {
                var zero = '';

                for (var i = 0; i < digit; i++) {
                    zero += '0';
                }
                return (zero + num).slice(-digit);
            }
        },
        beforeMount() {
            setInterval(this.updateTime, 1000);
        }
    }
</script>
