<!-- 按客户名称分析 -->
<template>
  <div class="NamePage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'AnalysisByName'
    },
    dataList: {
      type: Array,
      default: () => []
    },
    legendData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nowChart: null
    }
  },
  computed: {
    name() {
      return this.dataList.map(item => item.name)
    },
    value() {
      return this.dataList.map(item => item.value)
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
      let myChart = echarts.init(document.getElementById('AnalysisByName'))
      this.nowChart = myChart
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: this.name,
          axisLabel: {
            inside: false,
            rotate: 45
          }, //设置坐标轴字体颜色和宽度
          axisLine: {
            //这是x轴文字颜色
            lineStyle: {
              color: '#fff'
            }
          },
          show: false
        },
        yAxis: {
          type: 'value',
          axisLine: {
            //这是y轴文字颜色
            lineStyle: {
              color: '#fff'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              // color: 'rgba(22, 37, 80, 1)',
              type: 'solid',
              width: 1
            }
          }
        },
        legend: {
          // data: ['异常销售单数'],
          data: this.legendData,
          // bottom: '10',
          left: '65%',
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#ffffff'
          }
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        series: [
          {
            name: this.legendData[0],
            // name: '异常销售单数',
            data: this.value,
            type: 'bar',
            barWidth: 30, //柱图宽度
            itemStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
                  {
                    offset: 0,
                    color: 'rgb(2, 106, 243)'
                  },
                  {
                    offset: 1,
                    color: 'rgb(0, 198, 255)'
                  }
                ])
              }
            }
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.NamePage {
  height: 90%;
  background-color: rgb(25, 45, 70);
  margin-right: 12px;
}
.chart {
  width: 566px;
  height: 100%;
}
</style>
