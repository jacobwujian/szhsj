<!-- 按签约金额分析 -->
<template>
  <div class="AmountPage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'AnalysisByAmount'
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nowChart: null
    }
  },
  watch: {
    dataList() {
      if (this.nowChart != null) {
        this.nowChart.dispose()
      }
      this.initChart()
    }
  },

  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById('AnalysisByAmount'))
      this.nowChart = myChart
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },

        series: [
          {
            type: 'pie',
            radius: ['60%', '80%'],
            data: this.dataList,
            label: {
              color: '#fff'
            },

            itemStyle: {
              emphasis: {
                // 阴影
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
              // normal: {
              //   color: function(params) {
              //     //自定义颜色
              //     // var colorList = ['#C1232B', '#B5C334', '#FCCE10', '#E87C25', '#27727B', '#FE8463', '#9BCA63', '#FAD860', '#F3A43B', '#60C0DD', '#D7504B', '#C6E579', '#F4E001', '#F0805A', '#26C0C0']
              //     var colorList = ['rgb(49, 251, 251)', 'rgb(255, 207, 96)', 'rgb(77, 210, 255)', 'rgb(5, 93, 255)', 'rgb(64, 32, 229)', 'rgb(162, 125, 233)', 'rgb(242, 226, 23)', 'rgb(38, 225, 196)', 'rgb(102, 111, 232)']
              //     return colorList[params.dataIndex]
              //   }
              // }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.AmountPage {
  height: 90%;
  background-color: rgb(2, 9, 27);
  margin-right: 12px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
.chart {
  width: 566px;
  height: 100%;
}
</style>
