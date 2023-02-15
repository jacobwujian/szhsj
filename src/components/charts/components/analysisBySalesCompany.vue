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
    dataList(nowData) {
      if (this.nowChart != null) {
        this.nowChart.dispose()
      }
      if (nowData.length != 0) {
        this.initChart()
      }
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
          }
        ]
      })

      myChart.on('click', params => {
        this.$emit('queryData', { type: 2, val: params.data.realName })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.CompanyPage {
  height: 100%;

  background-color: #02091b;
  margin-right: 12px;
  // border-radius: 0 0 10px 10px;
  // overflow: hidden;
}
.chart {
  // width: 566px;
  height: 100%;
}
</style>
