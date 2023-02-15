<!-- <template> -->
  <!-- <div style="margin-left: 15px;margin-right:15px;margin-top: 15px;"> -->
    <!-- <div style="display: flex;background-color: #3C4763;"> -->
      <!-- <div style="color: #fff;margin-left: 15px;margin-top: 6px"> -->
        <!-- 异动明细 -->
      <!-- </div> -->
      <!-- <div> -->
        <!-- <a-button
          style="border-width: 0px;
          background-color: #3C4763;
          color: #fff;
          margin-left: 1500px;
          text-decoration: underline"
          @click="handleDownload(columns, 'data', '异动明细表')"
        > -->
          <!-- 导出异动 -->
        <!-- </a-button> -->
      <!-- </div> -->
    <!-- </div> -->
    <!-- <a-table
      :columns="columns"
      :data-source="data"
      bordered
    > -->
      <!-- <template
        slot="name"
        slot-scope="text"
        style="border: 1px solid red;"
      > -->
        <!-- <a>{{ text }}</a> -->
      <!-- </template> -->
    <!-- </a-table> -->
  <!-- </div> -->
</template>
<script>
// const columns = [
//   {
//     title: '客户名称',
//     dataIndex: 'Customername',
//     scopedSlots: { customRender: 'name' }
//   },
//   {
//     title: '合同编号',
//     dataIndex: 'ContractNo'
//   },
//   {
//     title: '业务员',
//     dataIndex: 'salesman'
//   },
//   {
//     title: '业务类型',
//     dataIndex: 'Businesstype'
//   },
//   {
//     title: '签约日期',
//     dataIndex: 'Signingdate'
//   },
//   {
//     title: '合同有效日期',
//     dataIndex: 'Validcontractdate'
//   },
//   {
//     title: '签约金额(万元)',
//     dataIndex: 'Signingmoney'
//   },
//   {
//     title: '销售公司',
//     dataIndex: 'Salescompany'
//   },
//   {
//     title: '商品名称',
//     dataIndex: 'Tradename'
//   },
//   {
//     title: '数量',
//     dataIndex: 'quantity'
//   },
//   {
//     title: '单价(元)',
//     dataIndex: 'Unitprice'
//   },
//   {
//     title: '钢铁现货价(元)',
//     dataIndex: 'Steelprice'
//   },
//   {
//     title: '超过阈值比例(%)',
//     dataIndex: 'Thresholdscale'
//   }
// ]

// const data = [
//   {
//     key: '1',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '2',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '3',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '4',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '5',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '6',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '7',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '8',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '9',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '10',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '11',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }, {
//     key: '12',
//     Customername: '上海找钢网信息科技股份有限公司',
// 	ContractNo: '959982666x',
// 	salesman: '邹洪梅',
// 	Businesstype: '拼盘业务',
// 	Signingdate: '2022-03-14',
// 	Validcontractdate: '2022-05-31',
// 	Signingmoney:8.449,
// 	Salescompany:'浙江东菱商贸有限公司',
// 	Tradename:'热轧卷板',
// 	quantity:17,
// 	Unitprice:4970,
// 	Steelprice:4770,
// 	Thresholdscale:4.0241
//   }
// ]
// export default {
//   name: 'Sale4c3',
//     data() {
//         return {
//             data,
//       		columns
//         }
//     },
//     methods: {
//         handleDownload(col, datas, name) {
//           console.log(col, datas, name)
//             import('@/vendor/Export2Excel').then(excel => {
//                 const tHeader = col.map(e => {
//                     return e.title
//                 })
//                 const data = this[datas].map(v => col.map(j => v[j.dataIndex]))
//                 console.log(data)
//                 excel.export_json_to_excel({
//                     header: tHeader,
//                     data: [data],
//                     filename: name
//                 })
//             })
//         }
//     }
// }
</script>
<style lang="less" scoped>
// th.column-money,
// td.column-money {
//   text-align: center !important;
// }
// /deep/ .ant-table-thead > tr > th{
// 	color: aliceblue;
// 	text-align: center;
// }
// /deep/ .ant-table {
//     box-sizing: border-box;
//     margin: 0;
//     padding: 0;
//     color: aliceblue;
//     font-size: 14px;
//     font-variant: tabular-nums;
//     line-height: 1.5;
//     list-style: none;
//     font-feature-settings: 'tnum';
//     position: relative;
//     clear: both;
// }
// /deep/.ant-pagination-item-active a {
//     color: #000000;
// }

// /deep/.ant-pagination-item-active {
//     font-weight: 500;
//     background: #fff;
// 	border-color: #bbbbbb;
// }

// /deep/.ant-table-bordered .ant-table-tbody > tr > td {
//     border-right: 1px solid rgba(147, 144, 144, 0.49);
//     text-align: center;
// }

// /deep/[data-v-b323990a] .ant-table-bordered .ant-table-tbody > tr > td {
//     border: 1px solid rgba(147, 144, 144, 0.49);
//     text-align: center;
// }
// /deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
//     background: #738DDB;
// }
</style>