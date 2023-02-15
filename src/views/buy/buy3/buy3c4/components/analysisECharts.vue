<template>
  <div class="salePage">
    <!-- 图表框 -->
    <div class="echartsBox">
      <!-- 一行三列 -->
      <a-row class="row">
        <a-col class="col col1" span="8">
          <div class="temp1">
            <AnalyTitle title-name="按部门分析" @refresh="queryData" />
            <AnalysisByDepartment :data-list="tempData.Department" :d-grid-size="35" @queryData="queryData" />
          </div>
        </a-col>
        <a-col class="col" span="8">
          <!-- 2行1列 -->
          <a-row style="height:50%">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按业务员分析" @refresh="queryData" />
                <AnalysisBySalesman :data-list="tempData.Salesman" :s-grid-size="33" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
          <a-row style="height:50%" class="tempRow">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按签约金额分析（百万元）" @refresh="queryData" />
                <AnalysisByAmount :data-list="tempData.ContractAmount" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col class="col" span="8">
          <!-- 2行1列 -->
          <a-row style="height:50%">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按销售公司分析" @refresh="queryData" />
                <AnalysisBySalesCompany :data-list="tempData.SalesCompany" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
          <a-row style="height:50%" class="tempRow">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按客户名称分析" @refresh="queryData" />
                <AnalysisByName :data-list="tempData.CustomerName" :legend-data="legendData" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
        </a-col>
      </a-row>
    </div>
  </div>
</template>

<script>
import AnalysisBySalesman from '@/components/charts/components/analysisBySalesman'
import AnalysisBySalesCompany from '@/components/charts/components/analysisBySalesCompany'
import AnalysisByName from '@/components/charts/components/analysisByName'
import AnalyTitle from '@/components/charts/components/analyTitle'
import AnalysisByAmount from '@/components/charts/components/analysisByAmount'
import AnalysisByDepartment from '@/components/charts/components/analysisByDepartment'

export default {
  components: {
    AnalysisBySalesman,
    AnalysisBySalesCompany,
    AnalysisByName,
    AnalyTitle,
    AnalysisByAmount,
    AnalysisByDepartment
  },
  props: {
    tempData: {
      type: Object,
      default: () => {}
    },
    legendData: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {}
  },
  methods: {
    // 查询数据
    queryData(obj) {
      // 子请求父方法
      this.$emit('queryData', obj)
    }
  }
}
</script>

<style lang="less" scoped>
.salePage {
  // background-color: #192d46;
}
// 主图表框
.echartsBox {
  height: 660px;
}
// 布局
.row {
  height: 100%;
}
.col {
  height: 100%;
  .temp {
    height: 85%;
  }
  .temp1 {
    height: 94%;
  }
}

.tempRow {
  margin-top: 10px;
}
</style>
