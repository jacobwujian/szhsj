<template>
  <a-form-model
    ref="ruleForm"
    :model="form"
    :rules="rules"
    :label-col="labelCol"
    :wrapper-col="wrapperCol"
  >
    <a-form-model-item ref="taskName" label="任务名称" prop="taskName">
      <a-input v-model="form.taskName" />
    </a-form-model-item>

    <a-form-model-item label="任务编码" prop="taskValue">
      <a-input v-model="form.taskValue" />
    </a-form-model-item>

    <a-form-model-item label="任务接口" prop="taskControl">
      <a-input v-model="form.taskControl" />
    </a-form-model-item>

    <a-form-model-item label="任务类型" prop="type">
      <a-select
        v-model="form.type"
        placeholder="请选择任务类型"
      >
        <a-select-option value="0">
          手动任务
        </a-select-option>
        <a-select-option value="1">
          定时任务
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item :wrapper-col="{ span: 14, offset: 4 }">
      <a-button
        type="primary"
        @click="onSubmit"
      >
        提交
      </a-button>
      <a-button
        style="margin-left: 120px;"
        @click="$emit('close')"
      >
        关闭
      </a-button>
    </a-form-model-item>
  </a-form-model>
</template>
<script>
export default {
  data() {
    return {
      labelCol: { span: 4 },
      wrapperCol: { span: 14 },
      form: {
        taskName: '',
        type: undefined,
        taskValue: ''
      },
      rules: {
        taskName: [
          { required: true, message: '请输入任务名称', trigger: 'blur' }
        ],
        type: [{ required: true, message: '请选择任务类型', trigger: 'change' }],
        taskValue: [{ required: true, message: '请输入任务编号', trigger: 'change' }],
        taskControl: [{ required: true, message: '请输入后端接口', trigger: 'change' }]
      }
    }
  },
  methods: {
    onSubmit() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          this.$api.importData.insertTaskManage({
            taskName:this.form.taskName,
            taskValue:this.form.taskValue,
            type:this.form.type,
            taskControl:this.form.taskControl
          })
        .then(res => {
         if (res = true) {
          this.$message.success('新增成功')
          this.$emit('close', true)
         }else{
          this.$message.error('新增失败,请联系管理员')
         }
        })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    }
  }
}
</script>
<style lang="less" scoped>
.inputName{
    text-align: center;
    line-height: 100px;
    height: 100px;
}
.boxInput{
    display:block;
    text-align: center;
}
/deep/.ant-input{
    background-color: #fff !important;
    margin-left: 20px !important;
}
/deep/ .ant-select-selection {
    background-color: #fff !important;
}

/deep/ .ant-select {
    background-color: #fff !important;
    margin-left: 20px !important;
}
/deep/ .ant-form-item label {
    color: black !important;
}

/deep/ .ant-select-selection-selected-value {
    color: #000 !important;
}
/deep/ .ant-form-item{
    width: 500px !important;
    margin-bottom: 0 !important;
}

/deep/ .has-error .ant-form-explain, .has-error .ant-form-split {
    margin-left: 20px !important;
}
</style>