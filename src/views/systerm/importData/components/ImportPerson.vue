<template>
  <a-form-model
    ref="importForm"
    :model="form"
    :rules="rules"
    v-bind="formItemLayout"
	class="importForm"
  >
    <a-form-model-item
      label="导入人员信息"
      prop="file"
    >
      <CUpload
        :file-type="fileType"
        :file-suffix="['xlsx']"
        :is-auto-upload="false"
        @on-file="getFile"
      >
        <span
          slot="tip"
          style="margin-left: 8px"
        >
          请上传人员信息，支持Excel文件
        </span>
      </CUpload>
      <a-space size="large">
        <a-button
          type="link"
          @click="download"
        >
          下载模板
        </a-button>
      </a-space>
    </a-form-model-item>

    <a-divider />

    <a-row class="btns-row">
      <a-col class="text-center">
        <a-space size="large">
          <a-button
            type="primary"
            html-type="submit"
            :loading="loading"
            @click="onUpload"
          >
            确认
          </a-button>
          <a-button @click="$emit('close')">
            取消
          </a-button>
        </a-space>
      </a-col>
    </a-row>
  </a-form-model>
</template>

<script>
const formItemLayout = {
  labelCol: { span: 6 },
  wrapperCol: { span: 16 }
}

import CUpload from '@/components/base/c-upload'

export default {
  components: {
    CUpload
  },
  data() {
    return {
      formItemLayout,
      fileType: ['application/vnd.ms-excel', 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
      form: {
        file: null
      },
      loading: false
    }
  },
  computed: {
    rules() {
      return {
        file: [
          { required: true, message: '请导入人员信息', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    download() {
      window.open(`${window.location.origin}/人员明细模板.xlsx`)
    },
    onUpload() {
      const formData = new FormData()
      formData.append('file', this.form.file)
	  console.log(this.form.file)
      this.$refs.importForm.validate(valid => {
        if (!valid) {
			return false
		}

        this.loading = true
		this.$api.personInfo.insertPersonInfos(formData).then(res => {
          this.$emit('close', true)
        }).finally(() => {
          this.loading = false
        })
      })
    },
    getFile(file) {
      if (file) this.form.file = file
    }
  }
}
</script>
<style lang="less" scoped>
	.importForm{
		/deep/ .ant-form-item-required{
			color: #000;
		}
		/deep/ .ant-form-item-label{
			line-height: 45px;
		}
		/deep/ .ant-btn-link{
			color: blue;
		}
	}
</style>