<template>
  <div id="echart" class="main chart" />
</template>

<script>
import echarts from '@/plugins/echarts'
export default {
  name: 'ChartView',
  props: {
    header: {
      type: String,
      default: null
    },
    data: {
      type: Array,
      default: () => []
    },
    axis: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      chooseTitle: 0,
      chooseClass: 'titleMargin chooseMargin'
    }
  },
  computed: {
    titleSet() {
      return `{a|${this.header}}`
    }
  },
  watch: {
    data() {
      this.eChartInit()
    },
    axis() {
      this.eChartInit()
    }
  },
  mounted() {
    this.eChartInit()
  },
  methods: {
    eChartInit() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById('echart'), 'dark')
      // 绘制图表
      myChart.setOption({
        backgroundColor: 'rgb(2, 9, 27)',
        // backgroundColor: '#192D46',
        title: {
          text: this.titleSet,
          textStyle: {
            rich: {
              a: {
                color: '#ffffff',
                // width: 1200,
                fontWeight: 400,
                fontSize: 17
              }
            }
          },
          padding: [
            10, // 上
            10, // 右
            10, // 下
            10 // 左
          ],
          madding: [
            0, // 上
            0, // 右
            15, // 下
            0 // 左
          ],
          // backgroundColor: '#3C4763'
          backgroundColor: 'rgb(2, 9, 27)'
        },
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: 70,
          right: 30
          // bottom: 80
        },
        legend: {
          data: this.data.map(e => {
            return e.name
          }),
          // bottom: 50,
          left: '65%',
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#ffffff'
          }
        },
        xAxis: {
          data: this.axis,
          axisLabel: {
            // rotate: 35,
            margin: 20,
            textStyle: {
              color: '#ffffff',
              fontSize: 14
            }
          },
          // 刻度线垂直对齐
          axisTick: {
            alignWithLabel: true
          }
        },
        yAxis: {
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#ffffff',
              fontSize: 14
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: 'rgba(22, 37, 80, 1)',
              type: 'solid',
              width: 1
            }
          }
        },
        series: this.data.map(e => {
          return {
            name: e.name,
            type: 'line',
            symbol: 'emptyCircle',
            symbolSize: 7,
            color: e.color,
            data: e.data,
            // 平滑显示曲线
            smooth: true,
            // 区域颜色
            areaStyle: {
              normal: {
                color: new echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: e.areaCor
                    },
                    {
                      offset: 1,
                      color: 'rgba(135, 211, 226,0.3)'
                    }
                  ],
                  false
                ),
                shadowColor: 'rgba(44,118,222, 0.8)',
                shadowBlur: 20
              }
            }
          }
        })
      })
    }
  }
}
</script>

<style scoped>
.main {
  width: 100%;
  height: 100%;
}
.chart {
  width: 1120px;
  height: 385px;
  position: relative;
  display: inline-block;
  /* margin-left: 12px; */
  /* background-color: #fff; */
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
</style>
