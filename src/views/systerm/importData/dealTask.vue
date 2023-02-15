<template>
  <div>
    <basePage :empty-state="true">
      <template slot="tableBox">
        <c-page
          ref="base"
          :search-type="searchType"
          :columns="columns"
          :data="data"
          @fetch="fetch"
        >
          <template slot="headerLeft">
            <div style="background-color: black; width:141px;height: 20px;display: flex;flex-direction: row-reverse;">
              <a-button
                v-if="$store.state.user.userInfo.userType === 0"
                type="primary"
                style="margin-top:21px ;margin-left:106px ;"
                @click="showModal"
              >
                新增
              </a-button>
            </div>
          </template>
          <template
            slot="action"
            slot-scope="record"
          >
            <a-button
              type="link"
              @click="openImport(record)"
            >
              导入数据
            </a-button>
          </template>
        </c-page>
		<a-modal v-model="show" title="新增任务" :width="600" :footer="null" :destroy-on-close="true" :mask-closable="false">
			<DealTaskForm
			  ref="accountForm"
			  @close="() => {this.show = fasle}"
			/>
		</a-modal>
      </template>
    </basePage>
  </div>
</template>

<script>
import basePage from '@/components/base/basePage'
import DealTaskForm from './components/DealTaskForm.vue'
import { importDataStatus, importDataType } from '@/utils/typeEnum'

const regEx = new RegExp('^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?)*))$')


const searchType = [
  {
    type: 'input',
    label: '任务名称',
    params: 'taskName'
  }, {
    type: 'input',
    label: '任务值',
    params: 'taskValue'
  }, {
    type: 'select',
    label: '任务类型',
    params: 'type',
    data: importDataType
  }
]

const columns = [
  {
    title: 'corn表达式',
    dataIndex: 'taskValue',
    width:200
  },
  {
    title: '任务名称',
    dataIndex: 'taskName',
    width:450
  },
  {
    title: '任务状态',
    dataIndex: 'status',
    width:200,
    scopedSlots: { customRender: 'status', type: 'select', data: importDataStatus }
  },
   {
    title: '任务类型',
    dataIndex: 'type',
    width:200,
    scopedSlots: { customRender: 'type', type: 'select', data: importDataType }
  },
  {
    title: '执行时间',
    dataIndex: 'endTime',
    width:350,
    scopedSlots: { customRender: 'endTime', type: 'time' }
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width:300
  }
]

export default {
  components: {
    basePage,
	DealTaskForm
  },
  data() {
    return {
      searchType,
      importDataType,
      columns,
      data:[],
      taskValue:0,
	  show: false
      // loading: false
    }
  },
  computed: {
  },
  mounted() {
    this.selectTaskManage()
  },
  methods: {
    fetch(params) {
      this.$api.importData.selectTaskManage(params)
        .then(res => {
          if(!res) res = {list: [], total: 0}
          this.data = res.list
          if (this.$refs.base)
          this.$refs.base.fetchSuccess(res.total)
        })
        .finally(() => {
          if (this.$refs.base)
          this.$refs.base.fetchFinally()
        })
    },
    selectTaskManage() {
      // this.loading = true
      this.$api.importData.selectTaskManage({
        pageNum:1,
        pageSize:10
      })
        .then(res => {
          this.data = res.list
        })
        .finally(() => {
          // this.loading = false
        })
    },
    showModal(){
      this.show = true
    },
    openImport(val) {
      var taskValue = val.record.taskValue
      var status = val.record.status
      this.$message.success('开始导入')
      this.selectTaskManage()
      this.$api.importData.openImport({
        taskValue:taskValue,
        status:status
      })
        .then(res => {
         if (res = true) {
          this.$message.success('导入成功')
          console.log('导入成功')
         }else{
          this.$message.error('导入失败,请联系管理员')
         }
        })
        .finally(() => {})
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-table-middle>.ant-table-content>.ant-table-body>table>.ant-table-tbody>tr>td{
    color: #fff;
    padding: 12px 8px;
}

/deep/.ant-table-row-cell-ellipsis .ant-table-column-title {
    display: block;
    color: #fff;
}

/deep/.ant-form-item label {
    position: relative;
    color: #fff;
    font-size: 14px;
}
// 鼠标放上变色
/deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
    background: #738DDB;
}
// 表头样式
/deep/ .ant-table-middle > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th{
    padding: 12px 8px;
    background-color: #02091B;
}
// 输入框背景样式
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
    color: rgba(0, 0, 0, 0.65);
    font-size: 14px;
    line-height: 1.5;
    background-color: #0F1727;
    background-image: none;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    transition: all 0.3s;
}
// 表单上间距
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
// 翻页边框颜色
/deep/ .ant-pagination-item-link {
    color: rgba(0, 0, 0, 0.25);
    border-color: #fbfbfb;
    cursor: not-allowed;
    margin-top: 10px;
}
// 翻页选择颜色
/deep/.ant-pagination-item-active {
    font-weight: 500;
    background: #fff;
    border-color: #1890ff;
    margin-top: 20px;
}
// 翻页字体颜色
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
    background-color: #fff;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    outline: 0;
    cursor: pointer;
    -webkit-user-select: none;
    -moz-user-select: none;
    -ms-user-select: none;
    user-select: none;
}
// 字体间距
/deep/ .ant-pagination-options-quick-jumper {
    display: inline-block;
    height: 32px;
    line-height: 32px;
    vertical-align: top;
    margin-top: 20px;
}
// 空查背景样式
/deep/ .ant-table-bordered.ant-table-empty .ant-table-placeholder {
    border-right: 1px solid #e8e8e8;
    border-left: 1px solid #e8e8e8;
    background: #192D46;
}
// 下拉框背景颜色
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
    color: #ffffff;
    background-color: transparent;
    border-color: transparent;
    box-shadow: none;
}
// 鼠标操作变色
/deep/ .ant-btn-link:hover, .ant-btn-link:focus {
    color: yellow;
    background-color: transparent;
}
// 取消键样式
/deep/ .ant-input-affix-wrapper .ant-input-suffix :not(.anticon) {
    line-height: 5;
    margin-top: 20px;
    color: #fff;
}
// 输入取消键样式
/deep/ .ant-input-affix-wrapper .ant-input:not(:last-child) {
    padding-right: 30px;
    color: #fff;
}
// 空查字体样式
/deep/ .ant-empty-description{
  color: #fff;
}
/deep/ .header{
  padding: 0;
    background-color: #000000;
    color: #ffffff;
    font-size: 0;
    margin-bottom: 0;
}
</style>
