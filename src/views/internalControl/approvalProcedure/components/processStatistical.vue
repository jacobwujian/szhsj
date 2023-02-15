<template>
  <!-- 流程统计 -->
  <div class="processPage">
    <!-- 标题 -->
    <div>
      <AnalyTitle title-name="流程统计" :refresh-status="false" />
    </div>
    <!-- 表格 -->
    <div class="tableBox">
      <ProcessTable />
    </div>
  </div>
</template>

<script>
import AnalyTitle from '@/components/charts/components/analyTitle'
import ProcessTable from './processTable.vue'

export default {
  components: {
    AnalyTitle,
    ProcessTable
  }
}
</script>
<style lang="less" scoped>
.processPage {
  color: white;
}
.tableBox {
  padding: 0 15px;
}
</style>
