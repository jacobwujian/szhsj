<!--  -->
<template>
	<basePage :empty-state="true">
		<template slot="tableBox">
			<c-page ref="base2" :search-type="searchType" :scroll="{ x: 1300 }" :columns="columns" :data="list" @fetch="fetch">
				<template slot="headerLeft2">
					<a-button style="margin-left:106px ;" type="primary" @click="showModal('import')">数据导入</a-button>
				</template>

				<template slot="action" slot-scope="{ record }">
					<a-button disabled type="link" @click="showConfirm('del', record.id)">删除</a-button>
					<a-button disabled type="link" @click="showModal('edit', record)">修改</a-button>
				</template>
			</c-page>

			<a-modal v-model="modalVisible" :title="modal.title" :width="500" :footer="null" :destroy-on-close="true">
				<component :is="modal.component" :ref="modal.component" :form-type="modalName" :detail="detail" @close="close" />
			</a-modal>
		</template>
	</basePage>
</template>

<script>
import EditForm from './components/EditPerson.vue'
import ImportBank from './components/ImportBank.vue'
import basePage from '@/components/base/basePage'

const jd = [{ name: '借', value: 1 }, { name: '贷', value: 2 }]
const searchType = [
	{
		type: 'input',
		label: '凭证号',
		params: 'voucherNumber'
	},
	{
		type: 'input',
		label: '本方账号',
		params: 'ownAccount'
	},
	{
		type: 'input',
		label: '对方账号',
		params: 'otherAccount'
	},
	{
		type: 'select',
		label: '借贷',
		params: 'borrowOrLoan',
		data: jd
	}
]

const columns = [
	{
		title: '序号',
		width: 60,
		scopedSlots: { customRender: 'no' }
	},
	{
		title: '凭证号',
		width: 200,
		dataIndex: 'voucherNumber'
	},
	{
		title: '本方账号',
		width: 200,
		dataIndex: 'ownAccount'
	},
	{
		title: '对方账号',
		width: 200,
		dataIndex: 'otherAccount'
	},
	{
		title: '交易时间',
		width: 200,
		scopedSlots: { customRender: 'transactionTime', type: 'time' },
		dataIndex: 'transactionTime'
	},
	{
		title: '借贷',
		width: 50,
		scopedSlots: { customRender: 'borrow_or_loan', type: 'select', data: jd },
		dataIndex: 'borrowOrLoan'
	},
	{
		title: '借方发生额',
		width: 150,
		dataIndex: 'borrowAmount'
	},
	{
		title: '贷方发生额',
		width: 150,
		dataIndex: 'loanAmount'
	},
	{
		title: '对方行号',
		width: 200,
		dataIndex: 'otherBankNumber'
	},
	{
		title: '摘要',
		width: 200,
		dataIndex: 'summary'
	},
	{
		title: '用途',
		width: 100,
		dataIndex: 'useWay'
	},
	{
		title: '对方单位名称',
		width: 250,
		dataIndex: 'otherCompanyName'
	},
	{
		title: '余额',
		width: 150,
		dataIndex: 'balance'
	},
	{
		title: '个性化信息',
		width: 250,
		dataIndex: 'detailsInfo'
	},
	{
		title: '操作',
		dataIndex: 'action',
		width: 200,
		scopedSlots: { customRender: 'action' }
	}
]

const confirmTypes = {
	stop: {
		api: 'stopDevice',
		title: '停用'
	},
	start: {
		api: 'launchDevice',
		title: '启用'
	},
	revoke: {
		api: 'revokeDevice',
		title: '吊销',
		content: '是否确定吊销？项目如果吊销，将无法重启'
	},
	del: {
		api: 'deleteDevice',
		title: '删除'
	}
}

export default {
	components: {
		basePage,
		EditForm,
		ImportBank
	},
	data() {
		return {
			searchType,
			columns,
			list: [],
			modalName: '', // add- 新增 review- 审核 edit- 修改
			detail: '', // 选中数据详情,用于修改
			modalVisible: false,
			test: null,
			testShow: false,
			testinput: '',
			isShowLZ: false
		}
	},
	computed: {
		modal() {
			let obj = {
				title: '',
				component: ''
			}

			if (this.modalName === 'import') {
				obj.title = '数据导入'
				obj.component = 'ImportBank'
			}

			if (this.modalName === 'edit') {
				obj.title = '修改银行信息'
				obj.component = 'EditForm'
			}

			return obj
		}
	},
	methods: {
		testModel(record) {
			this.test = record
			this.testShow = true
		},
		/**
		 * 查询table data
		 * @param {Object} params 查询参数
		 */
		fetch(params) {
			this.$api.bankDetail
				.selectBankDetails(params)
				.then(res => {
					if (!res) res = { list: [], total: 0 }
					const { list, total } = res
					if (Array.isArray(list)) this.list = list
					this.$refs.base2.fetchSuccess(total)
				})
				.finally(() => {
					this.$refs.base2.fetchFinally()
				})
		},
		/**
		 * 修改/导入弹窗
		 * @param {String} type 操作类型
		 * @param {String} detail 数据详情
		 */
		showModal(type, detail) {
			this.modalName = type
			this.modalVisible = true
			if (detail) this.detail = detail
		},
		/**
		 * 确认弹窗
		 * @param {string} type 操作类型
		 * @param {string} id
		 */
		showConfirm(type, id) {
			const title = confirmTypes[type].title
			const content = confirmTypes[type].content || `是否确定${title}该人员？`
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
				this.$api.device[apiName]({ id }).then(res => {
					this.$message.success('操作成功')
					this.$refs.base2.fetch()
				})
		},
		close(isFetch = false) {
			this.modalVisible = false
			if (isFetch) this.$refs.base2.fetch()
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

/deep/.ant-table-tbody > tr:hover:not(.ant-table-expanded-row):not(.ant-table-row-selected) > td {
	background: #494e8f;
}
/deep/ .ant-table-middle > .ant-table-content > .ant-table-body > table > .ant-table-thead > tr > th {
	padding: 12px 8px;
	background-color: #02091b;
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
	background-color: #0f1727;
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
	background-color: #0f1727;
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
	background: #192d46;
}
//下拉框背景颜色
/deep/ .ant-select-selection {
	display: block;
	box-sizing: border-box;
	background-color: #0f1727;
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
/deep/ .ant-btn-link:hover,
.ant-btn-link:focus {
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
/deep/ .ant-empty-description {
	color: #fff;
}
//表单样式
/deep/.ant-input-disabled {
	background-color: #fff;
	color: black;
}
/deep/ .ant-btn-link:hover,
.ant-btn-link:focus {
	color: yellow;
	background-color: transparent;
}
/deep/ .ant-table-bordered .ant-table-thead > tr > th,
.ant-table-bordered .ant-table-tbody > tr > td {
	background-color: #02091b;
}
</style>
