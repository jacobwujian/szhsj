<!-- 按销售公司分析 -->
<template>
  <div class="CompanyPage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'AnalysisBySalesCompany'
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
      let myChart = echarts.init(document.getElementById('AnalysisBySalesCompany'))
      this.nowChart = myChart
      myChart.setOption({
        tooltip: {
          trigger: 'item'
        },

        series: [
          {
            type: 'pie',
            radius: '70%',
            data: this.dataList,
            label: {
              show: false,
              color: '#fff'
            }
            // 选中阴影
            // emphasis: {
            //   itemStyle: {
            //     shadowBlur: 10,
            //     shadowOffsetX: 0,
            //     shadowColor: 'rgba(0, 0, 0, 0.5)'
            //   }
            // }
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.CompanyPage {
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
