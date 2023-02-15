<template>
  <div class="salePage">
    <!-- 图表框 -->
    <div class="echartsBox">
      <!-- 一行三列 -->
      <a-row class="row">
        <a-col class="col" span="8">
          <!-- 2行1列 -->
          <a-row style="height:50%">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按部门分析" @refresh="queryData" />
                <AnalysisByDepartment :data-list="tempData.Department" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
          <a-row class="tempRow" style="height:50%;">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按业务员分析" @refresh="queryData" />
                <AnalysisBySalesman :data-list="tempData.Salesman" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
        </a-col>
        <a-col class="col" span="8">
          <!-- 2行1列 -->
          <a-row style="height:50%">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按签约金额分析（百万元）" @refresh="queryData" />
                <AnalysisByAmount :data-list="tempData.ContractAmount" @queryData="queryData" />
              </div>
            </a-col>
          </a-row>
          <a-row class="tempRow" style="height:50%">
            <a-col class="col">
              <div class="temp">
                <AnalyTitle title-name="按商品类目分析" @refresh="queryData" />
                <AnalysisByCommodityCategory ref="AnalysisByCommodityCategory" :data-list="tempData.CommodityCategories" @queryData="queryData" />
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
          <a-row class="tempRow" style="height:50%">
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
import AnalysisBySalesman from './analysisBySalesman'
import AnalysisBySalesCompany from './analysisBySalesCompany'
import AnalysisByName from './analysisByName'
import AnalyTitle from './analyTitle'
import AnalysisByDepartment from './analysisByDepartment'
import AnalysisByAmount from './analysisByAmount'
import AnalysisByCommodityCategory from './analysisByCommodityCategory'

export default {
  components: {
    AnalysisBySalesman,
    AnalysisBySalesCompany,
    AnalysisByName,
    AnalyTitle,
    AnalysisByDepartment,
    AnalysisByAmount,
    AnalysisByCommodityCategory
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
}
// 主图表框
.echartsBox {
  height: 780px;
  margin-bottom: 30px;
}
// 布局
.row {
  height: 100%;
  // border: 1px solid red;
}
.col {
  height: 100%;
  // border: 1px solid;
  .temp {
    // border: 1px solid;
    height: 100%;
  }
}
.tempRow {
  margin-top: 20px;
  // border: 1px solid red;
}
// .row50 {
//   height: 50%;
//   background-color: #fff;
// }
</style>
