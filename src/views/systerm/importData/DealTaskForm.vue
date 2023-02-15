	<a-form-model class="childForm" ref="DealTaskForm" :model="form" :rules="rules" v-bind="formItemLayout">
		<a-form-model-item v-for="(item, index) in formItems" :key="index" :label="item.label" :prop="item.params">
			<a-input v-if="item.type === 'input'" v-model="form[item.params]" allow-clear :placeholder="`请输入${item.label}`" />
			<a-date-picker v-if="item.type === 'date'" v-model="form[item.params]" />
			<a-select v-if="item.type === 'select'" v-model="form[item.params]" :placeholder="`请选择${item.label}`" :not-fount-content="null">
				<a-select-option v-for="(op, i) in item.data" :key="`${i}-${op.value}`" :value="op.value">{{ op.name }}</a-select-option>
			</a-select>
		</a-form-model-item>
		<div style="text-align: center;"><a-button type="primary" @click="submit">确定</a-button></div>
	</a-form-model>
</template>

<script>
import { importDataStatus, importDataType } from '@/utils/typeEnum'
const regEx = new RegExp(
	'^\\s*($|#|\\w+\\s*=|(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?(?:,(?:[0-5]?\\d)(?:(?:-|\\/|\\,)(?:[0-5]?\\d))?)*)\\s+(\\?|\\*|(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?(?:,(?:[01]?\\d|2[0-3])(?:(?:-|\\/|\\,)(?:[01]?\\d|2[0-3]))?)*)\\s+(\\?|\\*|(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?(?:,(?:0?[1-9]|[12]\\d|3[01])(?:(?:-|\\/|\\,)(?:0?[1-9]|[12]\\d|3[01]))?)*)\\s+(\\?|\\*|(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?(?:,(?:[1-9]|1[012])(?:(?:-|\\/|\\,)(?:[1-9]|1[012]))?(?:L|W)?)*|\\?|\\*|(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?(?:,(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC)(?:(?:-)(?:JAN|FEB|MAR|APR|MAY|JUN|JUL|AUG|SEP|OCT|NOV|DEC))?)*)\\s+(\\?|\\*|(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?(?:,(?:[0-6])(?:(?:-|\\/|\\,|#)(?:[0-6]))?(?:L)?)*|\\?|\\*|(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?(?:,(?:MON|TUE|WED|THU|FRI|SAT|SUN)(?:(?:-)(?:MON|TUE|WED|THU|FRI|SAT|SUN))?)*)(|\\s)+(\\?|\\*|(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?(?:,(?:|\\d{4})(?:(?:-|\\/|\\,)(?:|\\d{4}))?)*))$'
)
const tests = '0 59 08 1,2 1  ?'
export default {
	name: 'DealTaskForm',
	data() {
		return {
			formItemLayout: {
				labelCol: { span: 6 },
				wrapperCol: { span: 16 }
			},
			loading: false,
			formItems: [
				{ label: '任务名称', params: 'taskName', type: 'input' },
				{ label: 'corn表达式', params: 'taskValue', type: 'input' },
				{ label: '开始时间', params: 'runTime', type: 'date' },
				{ label: '结束时间', params: 'endTime', type: 'date' },
				{
					label: '状态',
					params: 'status',
					type: 'select',
					data: [
						{
							name: '正常',
							value: '0'
						},
						{
							name: '暂停',
							value: '2'
						}
					]
				},
				{ label: '类型', params: 'type', type: 'select', data: importDataType }
			],
			form: { taskName: '', taskValue: '', runTime: null, endTime: null, status: '0', type: '0' },
			rules: {
				taskName: [{ required: true, message: '请输入任务名称', trigger: 'blur' }, { pattern: /^\S{1,60}$/, message: '请输入任务名称', trigger: 'blur' }],
				taskValue: [{ required: true, message: '请输入表达式', trigger: 'blur' }, { pattern: regEx, message: '请输入正确的表达式', trigger: 'blur' }],
				runTime: [{ required: true, message: '请输入开始时间', trigger: 'blur' }],
				endTime: [{ required: true, message: '请输入结束时间', trigger: 'blur' }],
				status: [{ required: true, message: '请输入状态', trigger: 'blur' }],
				type: [{ required: true, message: '请输入类型', trigger: 'blur' }]
			}
		}
	},
	mounted() {},
	created() {},
	methods: {
		query() {},
		submit() {
			let that = this
			this.$refs.DealTaskForm.validate(valid => {
				if (!valid) return false
				console.log(this.form)
				that.$api.importData
					.insertTaskManage(this.form)
					.then(res => {
						console.log(res)
					})
					.finally(() => {
						console.log(11)
					})
			})
		}
	}
}
</script>

<style lang="less" scoped>
.childForm {
	/deep/ .ant-input {
		background-color: white;
	}
	/deep/ .ant-input-affix-wrapper .ant-input:not(:last-child) {
		color: black;
	}
	/deep/ .ant-select-selection {
		background-color: white;
	}
	/deep/ .ant-form-item-required {
		color: black;
		margin-right: 30px;
	}
	/deep/ .ant-calendar-picker-icon {
		margin-top: 0;
	}
	/deep/ .ant-calendar-picker-clear {
		margin-top: 0;
	}
	/deep/ .ant-select-selection-selected-value {
		color: black;
	}
}
</style>
