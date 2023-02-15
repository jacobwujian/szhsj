<template>
  <a-form-model ref="Form" :model="form" :rules="rules" :label-col="labelCol" :wrapper-col="wrapperCol">
    <a-form-model-item ref="menuItem" label="菜单名称" prop="menuItem">
      <a-input v-model="form.menuItem" />
      <!-- @blur=" () => { $refs.name.onFieldBlur() } " -->
    </a-form-model-item>
    <a-form-model-item label="菜单编码" prop="menuCode">
      <a-input v-model="form.menuCode" />
    </a-form-model-item>
    <a-form-model-item label="菜单层级" prop="level">
      <a-select v-model="form.level" placeholder="请选择菜单层级">
        <a-select-option v-for="(op, i) in menuHierarchy" :key="`${i}-${op.value}`" :value="op.value">
          {{ op.name }}
        </a-select-option>
      </a-select>
    </a-form-model-item>
    <a-form-model-item v-if="form.level != 1" label="父级菜单编码" prop="topMenuItemCode">
      <a-input v-model="form.topMenuItemCode" />
    </a-form-model-item>

    <a-form-model-item label="菜单地址" prop="menuPath">
      <a-input v-model="form.menuPath" />
      <!-- type="textarea" -->
    </a-form-model-item>

    <a-divider />

    <a-row class="btns-row">
      <a-col class="text-center">
        <a-space size="large">
          <a-button v-if="modalName !== 'view'" type="primary" html-type="submit" :loading="loading" @click="submitForm">
            确定
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
import { menuHierarchy } from '@/utils/typeEnum'
export default {
  props: {
    detail: {
      type: Object,
      default: null
    },
    modalName: {
      type: String,
      default: 'add'
    }
  },
  data() {
    return {
      menuHierarchy,
      labelCol: { span: 5 },
      wrapperCol: { span: 16 },
      other: '',
      form: {
        menuItem: '',
        menuCode: '',
        topMenuItemCode: '',
        level: 1,
        menuPath: ''
      },
      loading: false,

      rules: {
        menuItem: [
          { required: true, message: '请输入菜单名称', trigger: 'blur' }
          // { min: 3, max: 5, message: 'Length should be 3 to 5', trigger: 'blur' }
        ],
        menuCode: [{ required: true, message: '请输入菜单编码', trigger: 'blur' }],

        level: [
          {
            // type: 'array',
            required: true,
            message: '请选择菜单层级',
            trigger: 'change'
          }
        ],
        menuPath: [{ required: true, message: '请输入菜单路径', trigger: 'blur' }],
        topMenuItemCode: [{ required: true, message: '请输入父级菜单编码', trigger: 'blur' }]
      }
    }
  },
  created() {
    if (this.modalName !== 'add' && Object.keys(this.detail).length) {
      this.initForm()
    }
  },
  methods: {
    submitForm() {
      this.$refs.Form.validate(valid => {
        if (!valid) return false
        if (this.modalName === 'add') this.add()
        else if (this.modalName === 'edit') this.edit()
      })
    },
    add() {
      this.loading = true
      this.$api.menu
        .addMenu({
          ...this.form
        })
        .then(res => {
          this.$message.success('添加成功')
          this.$emit('close', true)
        })
        .finally(() => {
          this.loading = false
        })
    },
    edit() {
      this.loading = true
      this.$api.menu
        .updateMenu({
          id: this.detail.id,
          ...this.form
        })
        .then(res => {
          this.$message.success('修改成功')
          this.$emit('close', true)
        })
        .finally(() => {
          this.loading = false
        })
    },

    // 初始化表单
    initForm() {
      for (const key in this.form) {
        if (key in this.detail) {
          this.form[key] = this.detail[key]
        }
      }
    },
    resetForm() {
      this.$refs.Form.resetFields()
    }
  }
}
</script>

<style lang="less" scoped>
/deep/.ant-form-item-label > label {
  color: #000 !important;
}

/deep/ .ant-input {
  color: #000 !important;
  background-color: #fff !important;
}
/deep/ .ant-select-selection-selected-value {
  float: left;
  max-width: 100%;
  color: #000;
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

/deep/ .ant-select-selection {
  background-color: #fff !important;
}
</style>
