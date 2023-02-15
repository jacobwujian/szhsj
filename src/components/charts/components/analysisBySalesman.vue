<!-- 按业务员分析 -->
<template>
  <div class="SalesmanPage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

const color = ['#4851f5', '#908942', '#0fbb59', '#7529de', '#c1d062', '#1dcea6', '#bda8dc', '#baae2d', '#486bf5', '#762ae4', '#a03e0d', '#a1950f', '#14924a', '#d98719', '#a46819', '#d0c79e', '#b3cd27', '#a662b6', '#73c0de']

export default {
  props: {
    id: {
      type: String,
      default: 'AnalysisBySalesman'
    },
    dataList: {
      type: Array,
      default: () => []
    },
    sGridSize: {
      type: Number,
      default: 0
    },
    sSizeRange: {
      type: Array,
      default: () => [17, 33]
    }
  },
  data() {
    return {
      nowChart: null,
      list: [],
      color
    }
  },
  watch: {
    dataList(nowData) {
      if (this.nowChart != null) {
        this.nowChart.dispose()
      }
      let colorLength = this.color.length
      let tempNum = 0
      let newColor = ''

      this.list = this.dataList.map((e, index) => {
        newColor = this.color[tempNum]
        tempNum++
        if (tempNum > colorLength - 1) tempNum = 0
        return {
          textStyle: {
            color: newColor
            // color: `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`
          },
          // name: `${e.name}\n${e.value}`,
          name: `${e.name}(${e.value})`,
          realName: e.realName,
          value: e.value
        }
      })

      if (nowData.length != 0) {
        this.initChart()
      }
    }
  },
  methods: {
    // 渲染
    initChart() {
      let myChart = echarts.init(document.getElementById('AnalysisBySalesman'))
      this.nowChart = myChart
      myChart.setOption({
        series: [
          {
            type: 'wordCloud',
            //用来调整词之间的距离
            gridSize: this.sGridSize,
            // 要限制显示个数 否则会装不下
            //是否允许词云在边界外渲染，直接使用默认参数 false 就可以，否则容易造成词重叠。
            drawOutOfBound: false,
            //用来调整字的大小范围
            sizeRange: this.sSizeRange,
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            rotationRange: [0, 0],
            // left: 0,
            // top: '10px',
            width: '90%',
            height: '90%',
            shape: 'circle',
            data: this.list
          }
        ]
      })

      myChart.on('click', params => {
        this.$emit('queryData', { type: 1, val: params.data.realName })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.SalesmanPage {
  height: 100%;

  margin-right: 12px;
  background-color: #02091b;
  // border-radius: 0 0 10px 10px;
  // overflow: hidden;
}
.chart {
  // width: 566px;
  height: 100%;
}
</style>
