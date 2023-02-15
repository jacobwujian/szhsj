<template>
  <!-- 异常统计 -->
  <div class="abnPage">
    <!-- 标题 -->
    <div>
      <AnalyTitle title-name="异常统计" :temp-status="tempStatus" :refresh-status="false" :operat-list="operatList" :operat-status="true" @operat="operat" />
    </div>
    <!-- 表格 -->
    <div class="tableBox">
      <AbnTable :columns="columns" :data-list="dataList" />
    </div>
  </div>
</template>

<script>
import AnalyTitle from '@/components/charts/components/analyTitle'
import AbnTable from './abnTable.vue'
export default {
  components: {
    AnalyTitle,
    AbnTable
  },
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    dataList: {
      type: Array,
      default: () => []
    },
    tempStatus: {
      type: Number,
      default: -1
    }
  },
  data() {
    return {
      operatList: [
        { name: '审批完成超时', type: 0 },
        { name: '审批环节超时', type: 1 },
        { name: '参与审批小于3人', type: 2 },
        { name: '间隔审批异常', type: 3 },
        { name: '审批人员异常', type: 4 }
      ]
    }
  },
  methods: {
    operat(type) {
      this.$emit('operat', type)
    }
  }
}
</script>

<style lang="less" scoped>
.abnPage {
  color: white;
}
.tableBox {
  padding: 10px 15px;
}
</style>
