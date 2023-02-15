<template>
  <div style="margin-right:12px;margin-top: 20px;">
    <div
      style="display: flex;background-color: rgb(13, 25, 64); height:40px; line-height: 40px; border-radius: 10px 10px 0 0;   overflow: hidden;
"
    >
      <div style="color: #fff;margin-left: 15px;">
        异动明细
      </div>
      <div>
        <a-button
          style="border-width: 0px;
          background-color: rgb(13, 25, 64);
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
      :scroll="{ x: 1000 }"
      :row-class-name="(record, index) => (index % 2 === 1 ? 'Discoloration' : 'Discoloration2')"
      bordered
      :row-key="
        columns => {
          if (columns.purordiCode) {
            return columns.purordiCode
          } else if (columns.salordgiCode) {
            return columns.salordgiCode
          } else if (columns.creditGrantiCode) {
            return columns.creditGrantiCode
          } else if (columns.purordgiCode) {
            return columns.purordgiCode
          } else if (columns.salordiCode) {
            return columns.salordiCode
          } else if (columns.id) {
            return columns.id
          }
        }
      "
    >
      <template v-for="(colCustom, key) in columnsCustom" :slot="colCustom.customRender" slot-scope="text, record, index">
        <template v-if="colCustom.type === 'select'">
          {{ EnumMap(colCustom.data, text === null ? 'notKey' : text) }}
        </template>
        <span v-else-if="colCustom.type === 'time'" :key="key" :title="text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss')">
          {{ text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss') }}
        </span>

        <slot v-else :name="colCustom.customRender" :record="record" :text="text" :index="index" />
      </template>
    </a-table>
  </div>
</template>
<script>
import { EnumMap } from '@/utils/typeEnum'

export default {
  name: 'TransferTable',
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
      EnumMap,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      },
      loading: false,
      form: {}
    }
  },
  computed: {
    columnsCustom() {
      return this.columns
        .filter(item => {
          return item.scopedSlots
        })
        .map(item => item.scopedSlots)
    }
    // 暂时不用
    // columnsFormat() {
    //   return this.columns.map(it => {
    //     const obj = {
    //       ...it,
    //       align: it.align || 'center',
    //       ellipsis: it.ellipsis === undefined ? true : it.ellipsis
    //     }
    //     if (it.scopedSlots && it.scopedSlots.type === 'time' && !it.hasOwnProperty('width')) obj.width = 160
    //     return obj
    //   })
    // }
  },
  methods: {
    handleDownload(col, datas, name) {
      import('@/vendor/Export2Excel').then(excel => {
        const tHeader = col
          .filter(e => {
            return e.dataIndex && e.dataIndex !== 'action'
          })
          .map(e => {
            return e.title
          })
        const data = this[datas].map((v, index) =>
          col
            .filter(e => {
              return e.dataIndex && e.dataIndex !== 'action'
            })
            .map(j => {
              if (j.scopedSlots && j.scopedSlots.type === 'select') {
                return EnumMap(j.scopedSlots.data, v[j.dataIndex])
              }
              if (j.scopedSlots && j.scopedSlots.type === 'time') {
                return this.$dayjs(v[j.dataIndex]).format(j.scopedSlots.format || 'YYYY-MM-DD HH:mm:ss')
              }
              return v[j.dataIndex]
            })
        )
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
/deep/.ant-table-thead > tr:first-child > th:first-child {
  // background-color: #112339;
  border-top-left-radius: 0px;
}
/deep/.ant-table-thead > tr:first-child > th:last-child {
  border-top-right-radius: 0px;
}
/deep/ .ant-table-thead > tr > th {
  text-align: center;
  background-color: rgb(2, 9, 27);
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
/deep/ .ant-table-tbody {
  .Discoloration {
    background-color: rgb(2, 11, 44);
  }
  .Discoloration2 {
    background-color: rgb(18, 30, 70);
  }
}
/deep/.ant-table-wrapper {
  background-color: rgb(13, 25, 64);
  border-radius: 0 0 10px 10px;
}
/deep/.ant-table-pagination.ant-pagination {
  margin-right: 15px;
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
  background: #494e8f;
}

/deep/.ant-table-placeholder {
  position: relative;
  z-index: 1;
  margin-top: -1px;
  padding: 16px 16px;
  color: rgba(0, 0, 0, 0.25);
  font-size: 14px;
  text-align: center;
  background: #192d46;
  border-top: 1px solid #e8e8e8;
  border-bottom: 1px solid #e8e8e8;
  border-radius: 0 0 4px 4px;
}
/deep/.ant-empty-description {
  color: #fff;
}
</style>
