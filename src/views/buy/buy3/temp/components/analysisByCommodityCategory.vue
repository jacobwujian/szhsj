<!-- 按商品类目分析 -->
<template>
  <div class="CategoryPage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'analysisByCommodityCategory'
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
      let myChart = echarts.init(document.getElementById('analysisByCommodityCategory'))
      this.nowChart = myChart
      myChart.setOption({
        series: [
          {
            type: 'treemap',
            data: this.dataList,
            width: '96%',
            height: '95%',

            breadcrumb: {
              show: false
            },
            // 是否开启拖拽漫游（移动和缩放）
            roam: 'false',
            itemStyle: {
              normal: {
                label: {
                  show: true,
                  // formatter: '{b}\n\n{c}'
                  formatter: '{b}\n{c}'
                },
                borderColor: '#fff'
              }
            }
          }
        ]
      })
      myChart.on('click', params => {
        this.$emit('queryData', { type: 3, val: params.data.realName })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.CategoryPage {
  height: 90%;
  margin-right: 12px;
  padding-right: 12px;
  background-color: rgb(2, 9, 27);
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
.chart {
  width: 556px;
  height: 100%;
}
</style>
