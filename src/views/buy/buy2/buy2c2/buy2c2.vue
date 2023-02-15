<template>
  <basePage :loading="loading" :empty-state="emptyState">
    <template slot="header">
      <a-form-model layout="inline" class="tempForm" @submit="install" @submit.native.prevent>
        <a-form-model-item label="申请日期">
          <a-date-picker :default-value="start" placeholder="开始日期" format="yyyy-MM-DD" @change="startChange" />
          <a-icon style="margin-left: 5px;margin-right: 5px;" type="minus" />
          <a-date-picker :default-value="end" placeholder="结束日期" format="yyyy-MM-DD" @change="endChange" />
        </a-form-model-item>
        <a-form-model-item>
          <a-button type="primary" html-type="submit">
            应用
          </a-button>
        </a-form-model-item>
      </a-form-model>
    </template>
    <template slot="empty">
      <a-empty />
    </template>
    <template slot="chart">
      <AnalyTitle title-name="预付款金额异动分析" :refresh-status="false" @refresh="queryData" />
      <Chart header="" :axis="axis" :data="data" />
    </template>
    <template slot="kanBan">
      <AnalyTitle title-name="异动看板" :refresh-status="false" @refresh="queryData" />
      <KanBan :now-number="nowNumber" :last-number="lastNumber" :last-last-number="lastLastNumber" />
    </template>
    <template slot="echartsBox">
      <AnalysisECharts :temp-data="tempData" :legend-data="legendData" @queryData="queryData" />
    </template>
    <template slot="tableBox">
      <transferTable :datas="datas" :columns="columns" />
    </template>
  </basePage>
</template>
<script>
import basePage from '@/components/base/basePage'
import Chart from '@/components/charts/baseLineChart.vue'
import KanBan from '@/components/base/kan-ban'
import AnalysisECharts from './components/analysisECharts'
import { contractStatus, creditType } from '@/utils/typeEnum.js'
import transferTable from '@/components/table/transferTable.vue'
import AnalyTitle from '@/components/charts/components/analyTitle'
import moment from 'moment'

const columns = [
  {
    title: '销售公司',
    dataIndex: 'companyName',
    width: 230
  },
  {
    title: '申请单号',
    dataIndex: 'creditCode',
    width: 200
  },
  {
    title: '状态',
    dataIndex: 'statusCode',
    width: 55,
    scopedSlots: { customRender: 'status', type: 'select', data: contractStatus }
  },
  {
    title: '申请日期',
    dataIndex: 'pageOdate',
    width: 150,
    scopedSlots: { customRender: 'pageOdate', type: 'time', format: 'YYYY-MM-DD' }
  },
  {
    title: '额度起始日期',
    dataIndex: 'creditStartDate',
    width: 150,
    scopedSlots: { customRender: 'creditStartDate', type: 'time', format: 'YYYY-MM-DD' }
  },
  {
    title: '额度截止日期',
    dataIndex: 'creditEndDate',
    width: 150,
    scopedSlots: { customRender: 'creditEndDate', type: 'time', format: 'YYYY-MM-DD' }
  },
  {
    title: '额度类型',
    dataIndex: 'creditTypeCode',
    width: 150,
    scopedSlots: { customRender: 'creditTypeCode', type: 'select', data: creditType }
  },
  {
    title: '公司客商',
    dataIndex: 'customerName',
    width: 270
  },
  {
    title: '金额(元)',
    dataIndex: 'creditAmount',
    width: 150
  },
  {
    title: '已用额度(元)',
    dataIndex: 'creditUsed',
    width: 150
  },
  {
    title: '剩余额度(元)',
    dataIndex: 'creditBalance',
    width: 150
  },
  {
    title: '信用期限(天)',
    dataIndex: 'creditLimit',
    width: 150
  },
  {
    title: '业务员',
    dataIndex: 'salesmanName',
    width: 150
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 150
  },
  {
    title: '适用部门',
    dataIndex: 'applyDeptName',
    width: 150
  },
  {
    title: '异常描述',
    dataIndex: 'excepVerifyResult',
    width: 350
  }
]

const datas = []
export default {
  name: 'Buy2c2',
  components: { Chart, KanBan, basePage, AnalysisECharts, transferTable, AnalyTitle },
  data() {
    return {
      datas,
      columns,
      monthFormat: 'YYYYMM',
      axis: [],
      data: [
        { name: '异动申请单数', data: [], color: 'rgb(71, 79, 223)', areaCor: 'rgba(71, 79, 223,1)' },
        { name: '异动授信金额（亿元）', data: [], color: 'rgb(49, 249, 250)', areaCor: 'rgba(49, 249, 250,1)' }
      ],
      chooseType: 0,
      nowNumber: 0,
      lastNumber: 0,
      lastLastNumber: 0,

      // 图表相关
      tempData: {},
      legendData: ['异常申请单金额（元）'],
      start: '',
      end: '',
      sendData: {},
      loading: false,
      emptyState: false
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
    moment,
    warnInfo() {
      this.$message.warning('暂无数据')
    },
    startChange(date, dateString) {
      this.start = dateString
      this.sendData.startTime = this.start
    },
    endChange(date, dateString) {
      this.end = dateString
      this.sendData.endTime = this.end
    },
    // 查询方法
    reqQuery(obj) {
      this.loading = true
      let that = this
      this.$api.buy
        .selectOverCreditCustomers(obj)
        .then(res => {
          if (res == null) return this.warnInfo()
          if (res.tableInfo.length == 0) {
            this.warnInfo()
          }
          this.emptyState = false
          let abnormalPlateInfo = res.abnormalPlateInfo
          let auxiliaryPlate = res.auxiliaryPlate
          //异动面板
          if (abnormalPlateInfo != undefined) {
            // 基本表数据
            that.axis = []
            that.data[0].data = []
            that.data[1].data = []
            if (auxiliaryPlate.length != 0) {
              that.nowNumber = auxiliaryPlate[0].numbers
              that.lastNumber = auxiliaryPlate[1].numbers
              that.lastLastNumber = auxiliaryPlate[2].numbers
            }

            abnormalPlateInfo.map(e => {
              that.data[0].data.push(Number(e.numbers))
              // 原来单位是亿元 现改成百万元 导致折线图不清晰
              that.data[1].data.push((Number(e.amount) / 100000000).toFixed(4))
              that.axis.push(e.tomonth)
            })
          }

          // 图表数据
          let chartInfo = res.chartInfo
          if (chartInfo != undefined) {
            this.tempData = chartInfo
          }
          //表格处理
          let tableInfo = res.tableInfo
          if (tableInfo != undefined) {
            // tableInfo.forEach(e => {
            //   // 等后端处理 公司码表
            //   e.corpbCode = '浙江东菱商贸有限公司'
            //   if (e.rgcapital == null) {
            //     e.rgcapital = 0
            //   }
            // })
            this.datas = tableInfo
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
    // 请求基本数据
    baseQuery(obj) {
      this.reqQuery(obj)
    },
    queryData(obj) {
      if (obj == undefined) {
        // 刷新
        this.sendData.bcode = ''
        this.sendData.wcode = ''
        this.sendData.gcode = ''
        this.sendData.grpcCode = ''
        this.sendData.applicationAmount = ''
        this.sendData.corpbCode = ''
        this.sendData.mixMoney = ''
        this.sendData.maxMoney = ''
        this.detailedQuery(this.sendData)
      } else {
        if (obj.type == 0) {
          // 部门详细查询
          this.sendData.bcode = obj.val
        } else if (obj.type == 1) {
          this.sendData.wcode = obj.val
        } else if (obj.type == 5) {
          this.sendData.gcode = obj.val
        } else if (obj.type == 3) {
          this.sendData.grpcCode = obj.val
        } else if (obj.type == 2) {
          this.sendData.corpbCode = obj.val
        } else if (obj.type == 6) {
          this.sendData.mixMoney = obj.mixMoney
          this.sendData.maxMoney = obj.maxMoney
        } else if (obj.type == 4) {
          this.sendData.grpcCode = obj.val
          this.sendData.applicationAmount = obj.applicationAmount
        }
        this.detailedQuery(this.sendData)
      }
    },
    detailedQuery(obj) {
      this.reqQuery(obj)
    },
    // 应用查询
    install() {
      this.sendData = {
        startTime: this.start,
        endTime: this.end
      }
      this.baseQuery(this.sendData)
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
/deep/ .ant-btn:hover,
.ant-btn:focus {
  border-color: #ffffff;
}
/deep/ .ant-input:hover {
  border-color: #ffffff;
}
/deep/ .ant-input:focus {
  border-color: #ffffff;
}
/deep/ .ant-input-number:hover {
  border-color: #ffffff;
}
/deep/ .ant-input-number-focused {
  border-color: #ffffff;
}
/deep/ .ant-select-selection {
  // background-color: #4e5eb5;
  border-width: 2px;
}
/deep/ .ant-select-open .ant-select-selection {
  border-color: #ffffff;
}
/deep/ .ant-select-selection:hover {
  border-color: #ffffff;
}
/deep/ .ant-select-focused .ant-select-selection,
.ant-select-selection:focus,
.ant-select-selection:active {
  border-color: #ffffff;
}
</style>
