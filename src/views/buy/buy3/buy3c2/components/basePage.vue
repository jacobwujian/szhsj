<template>
  <div class="homePage">
    <a-spin :spinning="loading" tip="请求数据中ing..." class="spin">
      <!-- 条件头 -->
      <a-row class="header">
        <slot name="header" />
      </a-row>
      <!-- 空页面 -->
      <a-row v-show="emptyState == true" class="empty">
        <slot name="empty" />
      </a-row>
      <!-- 数据 -->
      <a-row v-show="emptyState == false">
        <a-row>
          <a-col :span="16">
            <slot name="chart" />
          </a-col>
          <a-col :span="8">
            <slot name="kanBan" />
          </a-col>
        </a-row>
        <a-row>
          <slot name="echartsBox" />
        </a-row>
        <a-row><slot name="tableBox"/></a-row>
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
.homePage {
}
.header {
  height: 60px;
  line-height: 60px;
  background-color: #fff;
  color: rgb(55, 99, 194);
  font-size: 18px;
  margin-bottom: 10px;
  margin-top: 0px;
}
.inputCommon {
  background-color: #fff;
  border-width: 2px;
  color: rgb(55, 99, 194);
}
/deep/.ant-select-selection-selected-value {
  color: #4e5eb5;
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
</style>
