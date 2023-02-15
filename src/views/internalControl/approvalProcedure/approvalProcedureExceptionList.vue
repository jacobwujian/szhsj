<template>
  <basePage :loading="loading" :empty-state="emptyState" :page-type="1">
    <template slot="header">
      <a-form-model layout="inline" class="tempForm" @submit="install" @submit.native.prevent>
        <a-form-model-item label="申请日期">
          <a-date-picker :default-value="start" placeholder="开始日期" format="yyyy-MM-DD" @change="startChange" />
          <a-icon style="margin-left: 5px;margin-right: 5px;" type="minus" />
          <a-date-picker :default-value="end" placeholder="结束日期" format="yyyy-MM-DD" @change="endChange" />
        </a-form-model-item>
        <a-form-model-item label="审批完成时间大于（小时）">
          <a-input-number id="inputNumber" v-model="examineApproveTime" class="inputCommon w200" :min="0" />
        </a-form-model-item>
        <a-form-model-item label="相邻环节审批时间大于（小时）">
          <a-input-number id="inputNumber" v-model="adjacentExamineApproveTime" class="inputCommon w200" :min="0" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" html-type="submit">
            应用
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </template>

    <template slot="chart">
      <ApproveEcharts :left-chart="leftChart" :right-chart="rightChart" :approval-total-num="approvalTotalNum" :abnormal-num="abnormalNum" />
    </template>
    <template slot="process">
      <ProcessStatistical />
    </template>

    <template slot="table">
      <AbnormalStatistics :temp-status="tempStatus" :columns="columns" :data-list="dataList" @operat="operat" />
    </template>
  </basePage>
</template>

<script>
import basePage from '@/components/base/basePage'
import moment from 'moment'
import ApproveEcharts from './components/approveEcharts.vue'
import ProcessStatistical from './components/processStatistical.vue'
import AbnormalStatistics from './components/abnormalStatistics.vue'

const columns = [
  {
    title: '销售公司',
    dataIndex: 'companyName',
    width: 220
  },
  {
    title: '审批单号',
    dataIndex: 'approvalName',
    width: 250
  },
  {
    title: '审批类型',
    dataIndex: 'approvalTypeName',
    width: 150
  },
  {
    title: '审核开始时间',
    dataIndex: 'approvalStartTime',
    scopedSlots: { customRender: 'approvalStartTime', type: 'time', format: 'YYYY-MM-DD' },
    width: 200
  },
  {
    title: '审核结束时间',
    dataIndex: 'approvalEndTime',
    scopedSlots: { customRender: 'approvalStartTime', type: 'time', format: 'YYYY-MM-DD' },
    width: 200
  },
  {
    title: '审核发起人',
    dataIndex: 'salesmanName',
    width: 150
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 150
  },
  {
    title: '审批流程',
    dataIndex: 'approvalProcess',
    width: 270
  },
  {
    title: '异常描述',
    dataIndex: 'excepVerifyResult',
    width: 600
  }
]
export default {
  components: { basePage, ApproveEcharts, ProcessStatistical, AbnormalStatistics },

  data() {
    return {
      loading: false,
      emptyState: false,
      start: null,
      end: null,
      examineApproveTime: 40,
      adjacentExamineApproveTime: 10,
      columns,
      dataList: [],
      tempStatus: 0,
      leftChart: [],
      rightChart: [],
      proStatistical: [],
      abnStatistics: {},
      approvalTotalNum: 0,
      abnormalNum: 0
    }
  },
  created() {
    let time = new Date()
    this.end = moment(time, 'YYYY-MM-DD')
    time = new Date(time.setFullYear(time.getFullYear() - 1))
    this.start = moment(time, 'YYYY-MM-DD')
  },
  mounted() {
    this.install()
  },
  methods: {
    operat(type) {
      this.tempStatus = type
      if (type == 0) {
        this.dataList = this.abnStatistics['01']
      } else if (type == 1) {
        this.dataList = this.abnStatistics['02']
      } else if (type == 2) {
        this.dataList = this.abnStatistics['03']
      } else if (type == 3) {
        this.dataList = this.abnStatistics['04']
      } else if (type == 4) {
        this.dataList = this.abnStatistics['05']
      }
    },
    moment,
    startChange(date, dateString) {
      this.start = dateString
      this.sendData.startTime = this.start
    },
    endChange(date, dateString) {
      this.end = dateString
      this.sendData.endTime = this.end
    },
    // 应用查询
    install() {
      this.loading = true
      let params = {
        approvalCompletionTime: this.examineApproveTime,
        adjacentApprovalTime: this.adjacentExamineApproveTime,
        startTime: this.start,
        endTime: this.end
      }
      this.$api.internalControl
        .selectApprovalExamination(params)
        .then(res => {
          // 图表数据
          let examinationAppProAbn = res.examinationAppProAbn
          this.leftChart = examinationAppProAbn.leftChart
          this.rightChart = examinationAppProAbn.rightChart

          // 流程数据
          let proStatistical = res.proStatistical
          this.proStatistical = proStatistical

          // 表格数据
          let abnStatistics = res.abnStatistics
          this.abnStatistics = abnStatistics

          // 审批总量
          let approvalTotalNum = res.approvalTotalNum
          this.approvalTotalNum = approvalTotalNum

          // 异常数量
          let abnormalNum = res.abnormalNum
          this.abnormalNum = abnormalNum
        })
        .finally(() => {
          this.operat(0)
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.tempForm {
  display: flex;
  justify-content: space-between;
}
.button {
  background-color: rgb(55, 99, 194);
  // border-width: 2px;
  // color: #4e5eb5;
  width: 100px;
  font-size: 17px;
  // height: 40px;
  // line-height: 40px;
}
</style>
