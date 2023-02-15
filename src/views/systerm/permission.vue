<!--  -->
<template>
  <div>
    <c-page
      ref="base"
      :search-type="searchType"
      :columns="columns"
      :data="data"
      @fetch="fetch"
    >
      <template slot="headerLeft">
          <a-button
            type="primary"
            style="margin-left:106px ;"
            @click="showModal('add')"
          >
            新增
          </a-button>
      </template>
      <template
        slot="action"
        slot-scope="{ record }"
      >
        <a-button
          v-if="record.status === 0"
          type="link"
          @click="showConfirm('start', record.id)"
        >
          启用
        </a-button>
        <a-button
          v-if="record.status === 1"
          type="link"
          @click="showConfirm('stop', record.id)"
        >
          停用
        </a-button>
        <a-button
          type="link"
          @click="showModal('edit', record)"
        >
          修改
        </a-button>
        <a-button
          type="link"
          @click="showModal('view', record)"
        >
          详情
        </a-button>
      </template>
    </c-page>

    <a-modal
      v-model="modalVisible"
      :title="modalTitle"
      :width="600"
      :footer="null"
      :destroy-on-close="true"
    >
      <PermissionForm
        ref="permissionForm"
        :detail="detail"
        :modal-name="modalName"
        @close="close"
      />
    </a-modal>
  </div>
</template>

<script>
import PermissionForm from './components/PermissionForm1'
import { switchStatus } from '@/utils/typeEnum'

const searchType = [
  {
    type: 'input',
    label: '角色名称',
    params: 'roleName'
  },
  {
    type: 'datePicker',
    label: '创建时间',
    params: 'create'
  },
  {
    type: 'select',
    label: '状态',
    params: 'status',
    data: switchStatus
  }
]

const columns = [
  {
    title: '序号',
    width: 55,
    scopedSlots: { customRender: 'no' }
  },
  {
    title: '角色名称',
    dataIndex: 'roleName'
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime', type: 'time' },
    width: '24%'
  },
  {
    title: '状态',
    dataIndex: 'status',
    scopedSlots: { customRender: 'status', type: 'select', data: switchStatus }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' }
  }
]

const confirmTypes = {
  stop: {
    api: 'stopRole',
    title: '停用'
  },
  start: {
    api: 'startRole',
    title: '启用'
  }
}

const data = []

export default {
  components: {
    PermissionForm
  },
  data() {
    return {
      switchStatus,
      searchType,
      data,
      columns,
      modalName: '', // view- 详情 add- 新增 edit- 修改
      modalVisible: false,
      detail: ''
    }
  },
  computed: {
    modalTitle() {
      if (this.modalName === 'add') return '权限配置'
      else if (this.modalName === 'edit') return '修改权限'
      else return '权限详情'
    }
  },
  methods: {
    /**
     * 查询table data
     * @param {Object} params 查询参数
     */
    fetch(params) {
      this.$api.role
        .allRole(params)
        .then(res => {
          if (!res) res = { list: [], total: 0 }
          this.data = res.list
          if (this.$refs.base) this.$refs.base.fetchSuccess(res.total)
        })
        .finally(() => {
          if (this.$refs.base) this.$refs.base.fetchFinally()
        })
    },
    /**
     * 弹窗open
     * @param {String} type 操作类型
     * @param {String} detail 该条数据详情
     */
    showModal(type, record) {
      this.modalName = type
      this.detail = record
      this.modalVisible = true
    },
    /**
     * 确认弹窗
     * @param {string} type 操作类型
     * @param {string} id
     */
    showConfirm(type, id) {
      const title = confirmTypes[type].title
      const content = confirmTypes[type].content || `是否确定${title}该角色？`
      const that = this
      this.$confirm({
        title: `${title}提示`,
        content: content,
        onOk() {
          that.confirmActions(type, id)
        },
        onCancel() {}
      })
    },
    // 确认操作
    confirmActions(type, id) {
      const apiName = confirmTypes[type].api
      apiName &&
        this.$api.role[apiName]({ id }).then(res => {
          this.$message.success('操作成功')
          if (this.$refs.base) this.$refs.base.fetch()
        })
    },
    close(isFetch = false) {
      this.modalVisible = false
      if (isFetch) if (this.$refs.base) this.$refs.base.fetch()
    }
  }
}
</script>
<style lang="less" scoped>
// 状态栏颜色
/deep/.ant-table-row-cell-ellipsis .ant-table-column-title {
  display: block;
  color: #fff;
}
// 词头颜色
/deep/.ant-form-item label {
  position: relative;
  color: #fff;
}
//鼠标放上变色
/deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
  background: #494e8f;
}
// 表头背景颜色
/deep/ .ant-table-middle > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
  padding: 12px 8px;
  background-color: #02091B;
}
// 输入框背景颜色
/deep/ .ant-input {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 0;
  font-variant: tabular-nums;
  list-style: none;
  font-feature-settings: 'tnum';
  position: relative;
  display: inline-block;
  width: 100%;
  height: 32px;
  padding: 4px 11px;
  color: #fff;
  font-size: 14px;
  line-height: 1.5;
  background-color: #0F1727;
  background-image: none;
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  transition: all 0.3s;
}

/deep/ .ant-form-item-label {
  display: inline-block;
  overflow: hidden;
  line-height: 73px;
  white-space: nowrap;
  text-align: right;
  vertical-align: middle;
}
// 下拉框样式
/deep/ .ant-select {
  box-sizing: border-box;
  margin-top: 20px;
  padding: 0;
  color: rgba(0, 0, 0, 0.65);
  font-size: 14px;
  font-variant: tabular-nums;
  line-height: 1.5;
  list-style: none;
  font-feature-settings: 'tnum';
  background-color: #0F1727;
  position: relative;
  display: inline-block;
  outline: 0;
}

/deep/ .ant-pagination-item-link {
  color: rgba(0, 0, 0, 0.25);
  border-color: #fbfbfb;
  cursor: not-allowed;
  margin-top: 10px;
}

/deep/.ant-pagination-item-active {
  font-weight: 500;
  background: #fff;
  border-color: #1890ff;
  margin-top: 20px;
}
// 翻页样式
/deep/ .ant-pagination-item {
  display: inline-block;
  min-width: 32px;
  height: 32px;
  margin-right: 8px;
  margin-top: 20px;
  font-family: Arial;
  line-height: 30px;
  text-align: center;
  vertical-align: middle;
  list-style: none;
  background-color: rgb(255, 255, 255);
  border: 1px solid #d9d9d9;
  border-radius: 4px;
  outline: 0;
  cursor: pointer;
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
// 词头上下间距
/deep/ .ant-pagination-options-quick-jumper {
  display: inline-block;
  height: 32px;
  line-height: 32px;
  vertical-align: top;
  margin-top: 20px;
}
//暂无数据样式
/deep/ .ant-table-bordered.ant-table-empty .ant-table-placeholder {
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
    background: #192D46;
}
//下拉框背景颜色
/deep/ .ant-select-selection {
    display: block;
    box-sizing: border-box;
    background-color: #0F1727;
    border: 1px solid #d9d9d9;
    border-top-width: 1.02px;
    border-radius: 4px;
    outline: none;
    transition: all 0.3s cubic-bezier(0.645, 0.045, 0.355, 1);
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
// 下拉框字体颜色
/deep/ .ant-select-selection__rendered {
    position: relative;
    display: block;
    margin-right: 11px;
    margin-left: 11px;
    line-height: 30px;
    color: #fff;
}
// 操作字体颜色
/deep/ .ant-btn-link {
    color: #fff;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
}
// 操作鼠标放上变色
/deep/ .ant-btn-link:hover, .ant-btn-link:focus {
    color: yellow;
    background-color: transparent;
}
// 输入取消颜色
/deep/ .ant-input-affix-wrapper .ant-input-suffix :not(.anticon) {
    line-height: 5;
    margin-top: 20px;
    color: #fff;
}
// 下拉框颜色
.anticon {
    display: inline-block;
    color: inherit;
    font-style: normal;
    line-height: 0;
    text-align: center;
    color: #fff;
    text-transform: none;
    vertical-align: -0.125em;
    text-rendering: optimizeLegibility;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}
// 空查字体样式
/deep/ .ant-empty-description{
  color: #fff;
}
//表单样式
/deep/.ant-input-disabled{
  background-color: #fff;
      color: black;
}
</style>
