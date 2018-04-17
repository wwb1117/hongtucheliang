<template>
    <div id="demo" style="height: 300px; width: 100%;"></div>
</template>

<script>
  import echarts from 'echarts'
  export default {
      name: 'Echart',
      props:["option"],
      mounted(){
          // 基于准备好的dom，初始化echarts实例
          var myChart = echarts.init(document.getElementById('demo'));

        // 使用刚指定的配置项和数据显示图表。
          myChart.setOption(this.option);
      }
  }
</script>
