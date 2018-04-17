<template>
<div class="wrapper">
        <div class="col-md-13 col-md-push-13">
            <div class="row">
                <div class="panel panel-default">
                    <div class="panel-header">
                        <span>WEBSOCKET 测试Demo</span>
                    </div>
                    <div class="panel-body">
                        <form class="form-horizontal" role="form">
                            <div class="form-group">
                                <div class="col-sm-2">
                                        <span>{{message.price}}</span>
                                </div>
                            </div>
                            <div class="form-group">
                                <div class="col-sm-2">
                                        <span>{{message1.price}}</span>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    </div>
</div>

</template>

<script>
    import SockJS from 'sockjs-client'
    import Stomp from 'stompjs'

    export default {
        name: 'entry',
        data () {
            return {
                message:{},
                message1:{},
                sub:{},
                sub1:{},
                stompClient: null
            }
        },
        created () {
            this.connected()
        },
        methods: {
            connected: function () {
                console.log("第一步：封装客户端")
                let ws = new SockJS("http://www.hopechart.com/api/test-info/")

                this.stompClient = Stomp.over(ws)

                console.log("第二步：和服务端建立连接")
                this.stompClient.connect({}, this.subscribe);
            },
            subscribe:function(){
                console.log("第二步：订阅相关主题")
                this.sub = this.stompClient.subscribe('/stock/price', this.showMsg);
                this.sub1 = this.stompClient.subscribe('/stock/price-fast', this.showMsg1);
            },
            showMsg:function(msg){
                this.message = JSON.parse(msg.body)
            },
            showMsg1:function(msg){
                this.message1 = JSON.parse(msg.body)
            },
            unsubscribe:function(){
                if(this.sub){
                    this.sub.unsubscribe()
                }
                if(this.sub1){
                    this.sub1.unsubscribe()
                }
                alert("See you next time!");
            }
        },
        beforeDestroy(){
            this.stompClient.disconnect(this.unsubscribe())
        }
}
</script>
