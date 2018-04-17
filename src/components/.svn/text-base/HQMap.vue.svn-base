<template>
    <div>
        <el-row style="background-color:#efefef">
            <el-col :span="1"><i class="fa fa-window-maximize fa-lg" aria-hidden="true"></i></el-col>
            <el-col :span="1"><i class="fa fa-arrows-h fa-lg" aria-hidden="true"></i></el-col>
            <el-col :span="1"><i @click="removeMarker(1)" class="fa fa-eye fa-lg" aria-hidden="true"></i></el-col>
            <el-col :span="1"><i @click="addMarker" class="fa fa-search fa-lg" aria-hidden="true"></i></el-col>

        </el-row>
        <el-row>
            <el-col :span="24">
                <el-amap :style="mapStyle"  ref="hqMapRef" vid="hqMap" :amap-manager="amapManager" :center="center" :zoom="zoom"
                :plugin="plugin" :events="events">
                    <el-amap-marker v-for="marker in markers" :key="marker.id" :position="marker.position"
                        :events="marker.events" :visible="marker.visible" :draggable="marker.draggable" :vid="marker.id">
                    </el-amap-marker>
                </el-amap>
            </el-col>
        </el-row>

    </div>

</template>

<style lang="" scoped>
    .mapStyle {
        height: 600px;
    }
</style>

<script>
    import {AMapManager } from 'vue-amap'
    import HashMap from 'hashmap'

    const  DEFAULT_MAP_CENTER = [120.209947, 30.245853]

    export default {
        data() {
            return {
                zoom: this.zoomNum,
                center: DEFAULT_MAP_CENTER,
                amapManager: new AMapManager(),
                amap: null,
                markers: [],
                markersHashMap : new HashMap(),
                plugin: [{ pName:'ToolBar', position:'RT' }, 'AMap.OverView', 'AMap.Scale'/*, 'AMap.MarkerClusterer'*/],
                events: {
                    init: (o) => {
                        this.amap = o || AMap
                    },
                    zoomchange: () => {

                    },
                    click: (e) => {
                        console.log('lng：' + e.lnglat.lng + ', lat：' + e.lnglat.lat)
                    }
                }
            }
        },
        props: ['mapStyle', 'zoomNum'],
        methods: {
            getVueMap() {
                return this.amapManager._componentMap
            },
            getAMap() {
                return this.amapManager._map
            },
            /**
             * @param items [{'label': '车牌号', 'value': '陕AB1234'}, {'label': '终端号', 'value': '10000001'}]
             * @param colNum 每行列数
             */
            buildTip(items, colNum) {
                if(items instanceof Array && items.length > 0) {
                    let row = items.length / colNum
                    let rowTag = ''

                    for(let i = 0; i < row; i++) {
                        rowTag += '<el-row>'

                        for(let j = 0; j < colNum; j++) {
                            rowTag += items[i].label + "：" + items[i].value
                        }
                        rowTag += '</el-row>'
                    }

                    return rowTag
                }
                return ''
            },
            /**
             * 构建Maker
             * @see http://lbs.amap.com/api/javascript-api/guide/draw-on-map/marker-point
             */
            addMarker() {
                let marker = {
                    id: 1,
                    position: [121.59996, 31.197646]
                }

                this.markers.push(marker)
            },
            removeMarker(id) {
                this.markers.$remove(this.markers.find(t => t.goods_id === id))
            }
        },
        beforeMount() {

        },
        mounted(){

        },
        watch: {
            markersHashMap(newVal, oldVal) {
                if(newVal != oldVal) {
                    this.markersHashMap.forEach((val, key) => {
                        console.log(val + " = " + key)
                    })
                }

            }
        }
    }
</script>
