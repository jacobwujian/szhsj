<template>
  <div class="homePage">
    <a-spin :spinning="loading" tip="请求数据中ing..." class="spin">
      <!-- 条件头 -->
      <a-row class="header">
        <slot name="header" />
      </a-row>

      <!-- 图表样式 不动 -->
      <a-row v-if="pageType == 0">
        <a-row v-if="emptyState == false" class="chartRow">
          <a-col :span="16" class="tempCol">
            <slot name="chart" />
          </a-col>
          <a-col :span="8" class="tempCol">
            <slot name="kanBan" />
          </a-col>
        </a-row>
        <a-row>
          <slot name="echartsBox" />
        </a-row>
        <a-row><slot name="tableBox"/></a-row>
      </a-row>
      <!-- 再新增内控样式插槽 互不影响-->
      <a-row v-else-if="pageType == 1">
        <a-row v-if="showChartRow1" type="flex" justify="space-between" class="chartRow1">
          <a-col class="chartCol1">
            <slot name="chart" />
          </a-col>
          <a-col class="processCol1">
            <slot name="process" />
          </a-col>
        </a-row>
        <a-row class="tableRow1">
          <a-col class="tableCol1">
            <slot name="table" />
          </a-col>
        </a-row>
      </a-row>
    </a-spin>
  </div>
</template>
<script>
export default {
  name: 'BasePage',
  props: {
    loading: {
      type: Boolean,
      default: false
    },
    emptyState: {
      type: Boolean,
      default: false
    },
    pageType: {
      type: Number,
      default: 0
    },
    showChartRow1: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {}
  },
  created() {},
  methods: {
    install() {}
  }
}
</script>
<style lang="less" scoped>
.tempCol {
  height: 100%;
}
.chartRow {
  // border: 1px solid;
  height: 328px;
  margin-bottom: 60px;
}
.homePage {
}
.header {
  padding: 10px 10px 10px 15px;
  // height: 60px;
  // line-height: 60px;
  background-color: #000000;
  // color: rgb(55, 99, 194);
  color: #ffffff;
  font-size: 18px;
  margin-bottom: 10px;
}
.inputCommon {
  background-color: #fff;
  border-width: 2px;
  color: rgb(55, 99, 194);
}
/deep/.anticon svg {
  color: #8d8e91;
}
/deep/.ant-form-item label {
  color: #ffffff;
  font-size: 18px;
}
/deep/.ant-input-number {
  border: 1px solid #232942;
  background-color: #0f1727;
}
/deep/.ant-input-number-input {
  color: #ffffff;
  background-color: #0f1727;
}
/deep/.ant-calendar-picker-input.ant-input {
  color: #ffffff;
  background-color: #0f1727;
  border: 1px solid #232942;
}
/deep/.ant-select-selection {
  background-color: #0f1727;
  border: 0px solid #232942;
  border-width: 0px;
}
/deep/.ant-select-selection-selected-value {
  color: #ffffff;
}
.w80 {
  width: 80px;
}
.w200 {
  width: 200px;
}
.ant-spin-nested-loading > div > .ant-spin .ant-spin-text {
  color: rgba(255, 255, 255, 0.48);
}
.ant-empty-description {
  color: #fff;
}
.empty {
  // border: 1px solid;
}

// 内控
.chartCol1 {
  background-color: #02091b;
  width: 66%;
  // border: 1px solid white;
}
.processCol1 {
  background-color: #02091b;
  width: 32.5%;
  // border: 1px solid white;
  margin-left: 12px;
  margin-right: 12px;
}

.chartRow1 {
  margin-bottom: 12px;
}
.tableCol1 {
  background-color: #02091b;
  // border: 1px solid white;
  margin-right: 12px;
}
</style>
