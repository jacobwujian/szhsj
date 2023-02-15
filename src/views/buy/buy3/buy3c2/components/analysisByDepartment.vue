<!-- 按部门分析 -->
<template>
  <div class="DepartmentPage">
    <div :id="id" class="chart" />
  </div>
</template>

<script>
import echarts from '@/plugins/echarts'

export default {
  props: {
    id: {
      type: String,
      default: 'AnalysisByDepartment'
    },
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      nowChart: null,
      list: []
    }
  },
  watch: {
    dataList() {
      if (this.nowChart != null) {
        this.nowChart.dispose()
      }
      this.list = this.dataList.map(e => {
        return {
          textStyle: {
            color: `rgb(${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)},${Math.round(Math.random() * 255)})`
          },
          // name: `${e.name}\n${e.value}`,
          name: `${e.name}(${e.value})`,
          realName: e.realName,
          value: e.value
        }
      })

      this.initChart()
    }
  },
  methods: {
    // 渲染
    initChart() {
      let myChart = echarts.init(document.getElementById('AnalysisByDepartment'))
      this.nowChart = myChart
      myChart.setOption({
        series: [
          {
            type: 'wordCloud',
            //用来调整词之间的距离
            gridSize: 30,
            //用来调整字的大小范围
            sizeRange: [17, 45],
            //用来调整词的旋转方向，，[0,0]--代表着没有角度，也就是词为水平方向，需要设置角度参考注释内容
            // rotationRange: [-45, 0, 45, 90],
            rotationRange: [0, 0],
            //随机生成字体颜色
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
        console.log(params)
        this.$emit('queryData', { type: 1, val: params.data.realName })
      })
    }
  }
}
</script>

<style lang="less" scoped>
.DepartmentPage {
  height: 90%;
  background-color: rgb(25, 45, 70);
  margin-right: 12px;
}
.chart {
  width: 566px;
  height: 100%;
}
</style>
