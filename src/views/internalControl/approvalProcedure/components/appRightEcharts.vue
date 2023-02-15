<template>
  <div class="homePage">
    <!-- 文字 -->
    <div class="textBox">
      <div>
        <span>
          审批总数：<span>{{ approvalTotalNum }}</span>
        </span>
      </div>
      <div class="textBoxItem2">
        <span>
          异常数量：<span>{{ abnormalNum }}</span>
        </span>
        <span>
          异常占比：
          <span>
            <span v-if="abnormalNum == 0 || approvalTotalNum == 0"> 0%</span>
            <span v-else>{{ ((abnormalNum / approvalTotalNum) * 100).toFixed(4) }}%</span>
          </span>
        </span>
      </div>
    </div>

    <!-- 图表 -->
    <div class="chartBox">
      <div :id="id" class="chart" />
    </div>
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'
import { excepType } from '@/utils/typeEnum'
export default {
  props: {
    id: {
      type: String,
      default: 'rightChart'
    },
    rightChart: {
      type: Array,
      default: () => []
    },
    approvalTotalNum: {
      type: Number,
      default: 0
    },
    abnormalNum: {
      type: Number,
      default: 0
    }
  },
  data() {
    return {
      nowChart: null,
      excepType,
      xDate: [],
      yDate2: [],
      map: {}
    }
  },
  watch: {
    rightChart(nowData) {
      this.xDate = []
      this.yDate2 = []
      nowData.forEach(item => {
        this.xDate.push(this.map.get(item.typeCode))
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
  created() {
    this.map = new Map()
    this.excepType.forEach(({ value, name }) => this.map.set(value, name))
  },
  methods: {
    initChart() {
      let myChart = echarts.init(document.getElementById('rightChart'))
      this.nowChart = myChart
      myChart.setOption({
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow'
          }
        },
        grid: {
          left: '2%',
          bottom: '10%',
          containLabel: true
        },
        xAxis: {
          type: 'value',
          axisLabel: {
            formatter: '{value}',
            textStyle: {
              color: '#ffffff'
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
        yAxis: {
          type: 'category',
          axisLabel: {
            textStyle: {
              color: '#ffffff'
            }
          },
          data: this.xDate
        },
        series: [
          {
            // name: '2012',
            type: 'bar',
            color: '#5087ec',
            barWidth: 20, //柱图宽度
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
.textBox {
  float: left;
  // border: 1px solid white;
  width: 65%;
  margin-left: 25%;
}
.textBoxItem2 {
  display: flex;
  justify-content: space-between;
}
.chartBox {
  // border: 1px solid white;
  width: 100%;
  height: 100%;
}
.chart {
  height: 100%;
  // width: 98%;
}
</style>
