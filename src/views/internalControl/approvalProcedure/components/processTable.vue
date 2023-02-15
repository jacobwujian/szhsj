<template>
  <a-table :columns="columns" :data-source="data" :scroll="{ x: 700, y: 360 }" :pagination="false">
    <!-- <a slot="action" slot-scope="text" href="javascript:;">{{ text }}</a> -->
  </a-table>
</template>
<script>
const columns = [
  // fixed: 'left'
  { title: '流程名称', width: 120, dataIndex: 'name' },
  { title: '数量', width: 100, dataIndex: 'num' },
  { title: '流程图', dataIndex: 'tag' }
  // {
  //   title: 'Action',
  //   key: 'operation',
  //   fixed: 'right',
  //   width: 100,
  //   scopedSlots: { customRender: 'action' }
  // }
]

const data = [
  {
    key: '1',
    name: '贸易协议',
    num: 12,
    tag: '草拟-业务部门经理-事业部门副总经理-事业部门总经理-合同专管员-分管领导-总经理-生效'
  },
  {
    key: '2',
    name: '销售合同',
    num: 12,
    tag: '草拟-业务部门经理-事业部门副总经理-事业部门总经理-合同专管员-分管领导-总经理-生效'
  },
  {
    key: '3',
    name: '项目',
    num: 12,
    tag: '草拟-业务部门经理-事业部门总经理-合同专管员-生效'
  },
  {
    key: '4',
    name: '报表',
    num: 12,
    tag: '批草拟-重大贸易审批提报审-生效'
  },
  {
    key: '5',
    name: '到货单',
    num: 12,
    tag: '草拟-业务部门经理-生效'
  },
  {
    key: '6',
    name: '业务统计查询',
    num: 12,
    tag: '草拟-部门经理-运管部分-分管部门-总经理-董事长-生效'
  },
  {
    key: '7',
    name: '付款单',
    num: 12,
    tag: '草拟-业务员-业务部门经理-事业部经理-财务部副经理-财务部经理-分管领导-总经理-生效'
  }
]

export default {
  data() {
    return {
      data,
      columns
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-table-fixed {
  background-color: #02091b;
  color: #fff;
}
// 行
/deep/.ant-table-row {
  line-height: 32px;
}
// 阻止默认样式变色
/deep/.ant-table-tbody > tr:hover > td {
  background: transparent !important;
}

// 控制表头
/deep/.ant-table-thead > tr > th {
  // text-align: center;
  background-color: rgb(2, 9, 27);
  border: 0.1px solid #747475;
  color: #fff;
}
// 行
/deep/.ant-table-tbody > tr > td {
  border: 0.1px solid #747475;
}

//翻页字体颜色
// /deep/.ant-pagination-item-active a {
//   color: #000000;
// }
// /deep/.ant-table-pagination.ant-pagination {
//   margin-right: 15px;
// }
// /deep/.ant-pagination-item-active {
//   font-weight: 500;
//   background: #fff;
//   border-color: #bbbbbb;
// }
// /deep/.ant-table-placeholder {
//   position: relative;
//   z-index: 1;
//   margin-top: -1px;
//   padding: 16px 16px;
//   color: rgba(0, 0, 0, 0.25);
//   font-size: 14px;
//   text-align: center;
//   background: #192d46;
//   border-top: 1px solid #e8e8e8;
//   border-bottom: 1px solid #e8e8e8;
//   border-radius: 0 0 4px 4px;
// }

// 隔行变色 #37445C #2A394E
// /deep/ .ant-table-tbody {
//   .Discoloration {
//     background-color: rgb(2, 11, 44);
//   }
//   .Discoloration2 {
//     background-color: rgb(18, 30, 70);
//   }
// }

//鼠标放上变色 下面有阻止
// /deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
//   background: #738ddb;
// }
</style>
