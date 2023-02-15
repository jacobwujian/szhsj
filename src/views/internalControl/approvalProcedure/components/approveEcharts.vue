<template>
  <!-- 审批程序异常分析 -->
  <div class="appPage">
    <!-- 标题 -->
    <div>
      <AnalyTitle title-name="审批程序异常分析" :refresh-status="false" />
    </div>
    <!-- 图表 -->
    <div class="chartsBox">
      <!-- 左图 -->
      <div class="leftChart temp1">
        <AppLeftEcharts :left-chart="leftChart" />
      </div>
      <!-- 右图 -->
      <div class="rightChart temp1">
        <AppRightEcharts :right-chart="rightChart" :approval-total-num="approvalTotalNum" :abnormal-num="abnormalNum" />
      </div>
    </div>
  </div>
</template>

<script>
import AnalyTitle from '@/components/charts/components/analyTitle'
import AppLeftEcharts from './appLeftEcharts.vue'
import AppRightEcharts from './appRightEcharts.vue'
export default {
  components: {
    AnalyTitle,
    AppLeftEcharts,
    AppRightEcharts
  },
  props: {
    leftChart: {
      type: Array,
      default: () => []
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
  }
}
</script>

<style lang="less" scoped>
.chartsBox {
  display: flex;
  justify-content: space-between;
  height: 400px;
}
.leftChart {
  width: 60%;
  height: 100%;
}
.rightChart {
  width: 40%;
  height: 100%;
}
.temp1 {
  // border: 1px solid white;
  // height: 400px;
}
.appPage {
  color: white;
}
</style>
