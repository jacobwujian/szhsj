<!-- 按申请单分析 -->
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
      default: 'Application'
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
    // name() {
    //   return this.dataList.map(item => item.name)
    // },
    // value() {
    //   return this.dataList.map(item => item.tempVal)
    // }
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
      let myChart = echarts.init(document.getElementById('Application'))
      console.log(myChart)
      this.nowChart = myChart
      myChart.setOption({
        xAxis: {
          type: 'category',
          data: this.dataList.map(item => {
            return item.name
          }),
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
              color: 'rgba(22, 37, 80, 1)',
              type: 'solid',
              width: 1
            }
          }
        },
        grid: {
          left: '105px'
        },
        legend: {
          data: this.legendData,
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
            data: this.dataList.map(item => {
              return item.tempVal
            }),
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
      myChart.on('click', params => {
        let code = ''
        this.dataList.forEach(item => {
          if (params.name == item.name) return (code = item.realName)
        })
        this.$emit('queryData', { type: 4, val: code, applicationAmount: params.data })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.NamePage {
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
