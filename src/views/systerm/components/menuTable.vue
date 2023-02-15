<template>
  <a-table class="c-table" :columns="columnsFormat" :data-source="data" :pagination="pagination" :scroll="scroll" :bordered="true" size="middle" :row-key="record => record.id" :row-class-name="(record, index) => (index % 2 === 1 ? 'Discoloration' : 'Discoloration2')" @change="handleTableChange">
    <template v-for="(colCustom, key) in columnsCustom" :slot="colCustom.customRender" slot-scope="text, record, index">
      <template v-if="colCustom.type === 'select'">
        <a-tag v-if="colCustom.customRender === 'chainStatus'" :key="key" :color="getColor(text)">
          {{ EnumMap(colCustom.data, text === null ? 'notKey' : text) }}
        </a-tag>
        <span v-else :key="key">{{ EnumMap(colCustom.data, text === null ? 'notKey' : text) }}</span>
      </template>
      <span v-else-if="colCustom.type === 'time'" :key="key" :title="text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss')">
        {{ text && $dayjs(text).format(colCustom.format || 'YYYY-MM-DD HH:mm:ss') }}
      </span>
      <template v-else-if="colCustom.type === 'price'">
        {{ text == 0 ? '/' : text && text / 100 }}
      </template>
      <span v-else-if="colCustom.type === 'area'" :key="key" :title="codeToText(text)">
        {{ codeToText(text) }}
      </span>
      <template v-else-if="colCustom.customRender === 'no'">
        {{ (pagination.current - 1) * pagination.pageSize + +index + 1 }}
      </template>
      <template v-else-if="colCustom.customRender === 'precisionNum'">
        {{ text > 0 ? text : 0 }}
      </template>
      <slot v-else :name="colCustom.customRender" :record="record" :text="text" :index="index" />
    </template>
  </a-table>
</template>

<script>
import { EnumMap } from '@/utils/typeEnum'
import { codeToText, ZJoptions } from '@/utils/cascader-address-options'
export default {
  props: {
    columns: {
      type: Array,
      default: () => []
    },
    data: {
      type: Array,
      default: () => []
    },
    scroll: {
      type: Object,
      default: () => ({})
    },
    // 是否初始化请求
    isInitFetch: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      areaOptions: ZJoptions,
      EnumMap,
      codeToText,
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      },
      loading: false
    }
  },
  computed: {
    columnsCustom() {
      return this.columns
        .filter(item => {
          return item.scopedSlots
        })
        .map(item => item.scopedSlots)
    },
    columnsFormat() {
      return this.columns.map(it => {
        const obj = {
          ...it,
          align: it.align || 'center',
          ellipsis: it.ellipsis === undefined ? true : it.ellipsis
        }
        if (it.scopedSlots && it.scopedSlots.type === 'time' && !it.hasOwnProperty('width')) obj.width = 160
        return obj
      })
    }
  },
  created() {
    if (this.isInitFetch) this.fetch()
  },
  methods: {
    handleTableChange({ current, pageSize }) {
      this.pagination.current = current
      this.pagination.pageSize = pageSize

      // 查询
      this.fetch()
    },
    fetch() {
      let params = {
        pageNum: this.pagination.current,
        pageSize: this.pagination.pageSize
      }

      this.$emit('fetch', params)
    },
    fetchSuccess(total) {
      this.pagination.total = total || 0
    },
    fetchFinally() {}
  }
}
</script>

<style lang="less" scoped>
// 表头样式
/deep/ .ant-table-thead > tr > th {
  text-align: center;
  background-color: rgb(2, 9, 27);
  color: aliceblue;
}
// 表格
// /deep/ .ant-table {
//   color: red;
// }
// 表格背景
/deep/.ant-table-placeholder {
  background-color: #192d46;
}
// 空数据
/deep/.ant-empty-description {
  color: #fff;
}
/deep/.ant-table-row-cell-ellipsis,
.ant-table-row-cell-break-word {
  text-align: left !important;
  color: #fff;
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
//鼠标放上变色
/deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
  background-color: #494e8f;
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
/deep/.ant-table-pagination.ant-pagination {
  margin-right: 15px;
}
/deep/.ant-table-row-expand-icon,
.ant-table-row-collapsed {
  color: #40a9ff;
}
</style>
