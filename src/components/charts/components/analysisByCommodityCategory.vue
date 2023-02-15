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
        this.$emit('queryData', { type: 5, val: params.data.realName })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.CategoryPage {
  height: 100%;

  margin-right: 12px;
  // padding-right: 0px;
  background-color: #02091b;
  // border-radius: 0 0 10px 10px;
  // overflow: hidden;
}
.chart {
  // width: 556px;
  height: 100%;
}
</style>
