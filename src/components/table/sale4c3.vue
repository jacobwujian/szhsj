<template>
  <div style="margin-left: 15px;margin-right:15px;margin-top: 15px;">
    <div style="display: flex;background-color: #3C4763;">
      <div style="color: #fff;margin-left: 15px;margin-top: 6px">
        异动明细
      </div>
      <div>
        <a-button
          style="border-width: 0px;
          background-color: #3C4763;
          color: #fff;
          margin-left: 1500px;
          text-decoration: underline"
          @click="handleDownload(columns, 'datas', '异动明细表')"
        >
          导出异动
        </a-button>
      </div>
    </div>
    <a-table
      :columns="columns"
      :data-source="datas"
      :row-class-name="(record, index) => (index % 2 === 1 ? 'Discoloration' : 'Discoloration2')"
      bordered
      :row-key="columns=>columns.id"
    >
      <template
        slot="name"
        slot-scope="text"
        style="border: 1px solid red;"
      >
        <a>{{ text }}</a>
      </template>
    </a-table>
  </div>
</template>
<script>
export default {
  name: 'Sale4c3',
  props: {
    datas: {
      type: Array,
      default: () => {}
    },
    columns: {
      type: Array,
      default: () => {}
    }
  },
    data() {
        return {
        }
    },
    methods: {
        handleDownload(col, datas, name) {
          console.log(col, datas, name)
            import('@/vendor/Export2Excel').then(excel => {
                const tHeader = col.map(e => {
                    return e.title
                })
                const data = this[datas].map(v => col.map(j => v[j.dataIndex]))
                console.log(data)
                excel.export_json_to_excel({
                    header: tHeader,
                    data: [data],
                    filename: name
                })
            })
        }
    }
}
</script>
<style lang="less" scoped>
th.column-money,
td.column-money {
  text-align: center !important;
}
/deep/.ant-table-thead>tr:first-child>th:first-child {
  background-color: #112339;
    border-top-left-radius: 4px;
}
/deep/ .ant-table-thead > tr > th{
	text-align: center;
  background-color: #112339;
  color: aliceblue;
}
/deep/ .ant-table {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: aliceblue;
    font-size: 14px;
    font-variant: tabular-nums;
    line-height: 1.5;
    list-style: none;
    font-feature-settings: 'tnum';
    position: relative;
    clear: both;
}
//翻页字体颜色
/deep/.ant-pagination-item-active a {
    color: #000000;
}
// 隔行变色 #37445C #2A394E
/deep/ .ant-table-tbody{
  .Discoloration{
  background-color: #37445C;
  }
  .Discoloration2{
  background-color: #2A394E;
  }
}

/deep/.ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
	border-color: #bbbbbb;
}

/deep/.ant-table-bordered .ant-table-tbody > tr > td {
    border-right: 1px solid rgba(147, 144, 144, 0.49);
    text-align: center;
    }

/deep/[data-v-b323990a] .ant-table-bordered .ant-table-tbody > tr > td {
    border: 1px solid rgba(147, 144, 144, 0.49);
    text-align: center;
}

//鼠标放上变色
/deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: #738DDB;
}
</style>