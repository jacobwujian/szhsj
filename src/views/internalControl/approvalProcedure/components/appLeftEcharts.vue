<template>
  <div class="homePage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
import { approvalTypeCode } from '@/utils/typeEnum'
export default {
  props: {
    id: {
      type: String,
      default: 'leftChart'
    },
    leftChart: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nowChart: null,
      xDate: [],
      yDate1: [],
      yDate2: [],
      map: {},
      approvalTypeCode
    }
  },
  watch: {
    leftChart(nowData) {
      this.xDate = []
      this.yDate1 = []
      this.yDate2 = []
      nowData.forEach(item => {
        this.xDate.push(this.map.get(item.typeCode))
        if (item.approvalTypeTotalNum == null) {
          this.yDate1.push(0)
        } else {
          this.yDate1.push(item.approvalTypeTotalNum)
        }
        if (item.countTotalNum == null) {
          this.yDate2.push(0)
        } else {
          this.yDate2.push(item.countTotalNum)
        }
      })
      if (this.nowChart != null) {
        this.nowChart.dispose()
      }
      if (nowData.length != 0) {
        this.initChart()
      }
    }
  },
  // mounted() {
  //   this.initChart()
  // },
  created() {
    this.map = new Map()
    this.approvalTypeCode.forEach(({ value, name }) => this.map.set(value, name))
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById('leftChart'))
      this.nowChart = myChart
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        legend: {
          data: ['审批总数', '异常数量'],
          left: '65%',
          top: '2%',
          textStyle: {
            fontSize: 14,
            color: '#ffffff'
          }
        },

        xAxis: [
          {
            type: 'category',
            axisLabel: {
              textStyle: {
                color: '#ffffff'
              },
              interval: 0,
              rotate: 40
            },
            data: this.xDate
          }
        ],
        yAxis: [
          {
            type: 'value',
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
          }
        ],
        series: [
          {
            name: '审批总数',
            type: 'bar',
            color: '#5087ec',
            data: this.yDate1
          },
          {
            name: '异常数量',
            type: 'bar',
            color: '#de868f',
            data: this.yDate2
          }
        ]
      })
    }
  }
}
</script>

<style lang="less" scoped>
.homePage {
  width: 100%;
  height: 100%;
}
.chart {
  height: 100%;
  // width: 98%;
}
</style>
