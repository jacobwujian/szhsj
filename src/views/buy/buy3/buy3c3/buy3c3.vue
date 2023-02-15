<template>
  <basePage :loading="loading" :empty-state="emptyState">
    <!-- <a-spin :spinning="loading"> -->
    <template slot="header">
      <!-- @submit.native.prevent 阻止回车事件 -->
      <a-form-model layout="inline" class="tempForm" @submit="install" @submit.native.prevent>
        <a-form-model-item label="签约日期">
          <a-date-picker :default-value="start" placeholder="开始日期" format="yyyy-MM-DD" @change="startChange" />
          <a-icon style="margin-left: 5px;margin-right: 5px;" type="minus" />
          <a-date-picker :default-value="end" placeholder="结束日期" format="yyyy-MM-DD" @change="endChange" />
        </a-form-model-item>
        <a-form-model-item label="业务类型">
          <a-select v-model="chooseType" class="inputCommon" style="width: 150px;font-size: 16px;">
            <template #suffixIcon />
            <a-select-option v-for="item in businessType" :key="item.value" :value="item.value">
              {{ item.name }}
            </a-select-option>
          </a-select>
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
      <AnalyTitle title-name="采购单价格异动分析" :refresh-status="false" @refresh="queryData" />
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
import { businessType, executStatus, tradeType, businessMode } from '@/utils/typeEnum.js'
import transferTable from '@/components/table/transferTable.vue'
import AnalyTitle from '@/components/charts/components/analyTitle'
import moment from 'moment'

const columns = [
  {
    title: '销售公司',
    dataIndex: 'companyName',
    width: 180
  },
  {
    title: '合同编号',
    dataIndex: 'contractCode',
    width: 250
  },
  {
    title: '合同状态',
    dataIndex: 'statusCode',
    width: 150,
    scopedSlots: { customRender: 'statusCode', type: 'select', data: executStatus }
  },
  {
    title: '项目号',
    dataIndex: 'prjectCode',
    width: 200
  },
  {
    title: '签约日期',
    dataIndex: 'contractDate',
    width: 150,
    scopedSlots: { customRender: 'contractDate', type: 'time', format: 'YYYY-MM-DD' }
  },
  {
    title: '合同有效日期',
    dataIndex: 'effectiveDate',
    width: 150,
    scopedSlots: { customRender: 'effectiveDate', type: 'time', format: 'YYYY-MM-DD' }
  },
  {
    title: '最后交货日期',
    dataIndex: 'deliveryDate',
    width: 150,
    scopedSlots: { customRender: 'deliveryDate', type: 'time', format: 'YYYY-MM-DD' }
  },
  {
    title: '部门',
    dataIndex: 'deptName',
    width: 150
  },
  // 不知道是不是公司客商↓
  {
    title: '供应商',
    dataIndex: 'customerName',
    width: 250
  },
  {
    title: '业务类型',
    dataIndex: 'busiTypeCode',
    width: 150,
    scopedSlots: { customRender: 'busiTypeCode', type: 'select', data: businessMode }
  },
  {
    title: '贸易类型',
    dataIndex: 'tradeTypeName',
    width: 150
    // ,
    // scopedSlots: { customRender: 'tradeTypeCode', type: 'select', data: tradeType }
  },
  {
    title: '业务员',
    dataIndex: 'salesmanName',
    width: 150
  },
  {
    title: '签约金额(元)',
    dataIndex: 'contractAmount',
    width: 150
  },
  {
    title: '总数量',
    dataIndex: 'totalNum',
    width: 150
  },
  {
    title: '异常描述',
    dataIndex: 'excepVerifyResult',
    width: 550
  }
]

const datas = []
export default {
  name: 'Buy3c3',
  components: { Chart, KanBan, basePage, AnalysisECharts, transferTable, AnalyTitle },
  data() {
    return {
      datas,
      columns,
      monthFormat: 'YYYYMM',
      axis: [],
      data: [
        { name: '异动采购单数', data: [], color: 'rgb(71, 79, 223)', areaCor: 'rgba(71, 79, 223,1)' },
        { name: '异动涉及金额（百万元）', data: [], color: 'rgb(49, 249, 250)', areaCor: 'rgba(49, 249, 250,1)' }
      ],
      chooseType: 0,
      businessType: businessType,
      nowNumber: 0,
      lastNumber: 0,
      lastLastNumber: 0,

      // 图表相关
      tempData: {},
      legendData: ['异常采购单数'],
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
        .selectUnitPriceExceptionList(obj)
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
              that.data[1].data.push((Number(e.amount) / 1000000).toFixed(4))
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
            tableInfo.forEach(e => {
              // // 等后端处理 公司码表
              // e.corpbCode = '浙江东菱商贸有限公司'
              // if (e.rgcapital == null) {
              //   e.rgcapital = 0
              // }
            })
            this.datas = tableInfo
          }
        })
        .finally(() => {
          this.loading = false
        })
    },
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
    // 二次查询
    detailedQuery(obj) {
      this.reqQuery(obj)
    },
    install() {
      this.sendData = {
        startTime: this.start,
        endTime: this.end,
        businessMode: this.chooseType
      }
      this.baseQuery(this.sendData)
    }
  }
}
</script>
<style lang="less" scoped>
.example {
  text-align: center;
  background: rgba(0, 0, 0, 0.05);
  border-radius: 4px;
  margin-bottom: 20px;
  padding: 30px 50px;
  margin: 20px 0;
}
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
