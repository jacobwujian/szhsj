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
  background-color: rgb(25, 45, 70);
  margin-right: 12px;
}
.chart {
  width: 566px;
  height: 100%;
}
</style>
