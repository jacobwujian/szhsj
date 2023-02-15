<template>
  <a-table :row-class-name="(record, index) => (index % 2 === 1 ? 'Discoloration' : 'Discoloration2')" :row-key="dataList => dataList.id" :columns="columns" :data-source="dataList" :scroll="{ x: 1300 }">
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
    dataList: {
      type: Array,
      default: () => []
    }
  },
  data() {
    return {
      areaOptions: ZJoptions,
      EnumMap,
      codeToText
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
  },
  watch: {
    dataList(nowData) {}
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-empty-description {
  color: #fff;
}
/deep/.ant-table-fixed {
  text-align: center;
  background-color: #02091b;
  color: #fff;
}
// 行
/deep/.ant-table-row {
  line-height: 32px;
}
// 阻止默认样式变色
// /deep/.ant-table-tbody > tr:hover > td {
//   background: transparent !important;
// }

// 控制表头
/deep/.ant-table-thead > tr > th {
  text-align: center;
  background-color: rgb(2, 9, 27);
  border: 0.1px solid #747475;
  color: #fff;
}

// 行
/deep/.ant-table-tbody > tr > td {
  border: 0.1px solid #747475;
}

//翻页字体颜色
/deep/.ant-pagination-item-active a {
  color: #000000;
}
/deep/.ant-table-pagination.ant-pagination {
  margin-right: 15px;
}
/deep/.ant-pagination-item-active {
  font-weight: 500;
  background: #fff;
  border-color: #bbbbbb;
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
</style>
