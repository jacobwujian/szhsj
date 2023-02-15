<template>
  <a-form-model ref="permissionForm" :model="form" :rules="rules" v-bind="formItemLayout" class="formModel">
    <a-form-model-item label="角色名称" prop="roleName">
      <a-input v-model.trim="form.roleName" :disabled="notEditable" placeholder="请输入角色名称" />
    </a-form-model-item>

    <a-form-model-item label="角色权限" prop="menuPermissionCodes">
      <a-spin :spinning="loading">
        <a-tree
          v-model="selectedKeys"
          :selected-keys="selectedKeys"
          :auto-expand-parent="autoExpandParent"
          checkable
          selectable
          :check-strictly="false"
          :show-line="showLine"
          :replace-fields="{ children: 'childMenu', title: 'menuItem', key: 'permissionCode' }"
          :expanded-keys="expandedKeys"
          :tree-data="menuAll"
          @expand="onExpand"
          @check="onCheck"
        />
        <!--  -->
      </a-spin>
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
import { validateZhEnNum } from '@/utils/validate'

const formItemLayout = {
  labelCol: { span: 4 },
  wrapperCol: { span: 18 }
}

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
      formItemLayout,
      form: {
        roleName: '',
        menuPermissionCodes: [],
        menuElementPermissionCodes: []
      },
      loading: false,
      // 展开指定的树节点
      expandedKeys: [],
      // 是否自动展开父节点
      autoExpandParent: true,
      // 选中复选框的树节点
      checkedKeys: [],
      // 设置选中的树节点
      selectedKeys: [],
      menuAll: [],
      showLine: true,
      levelThreeMenuList: []
    }
  },
  computed: {
    rules() {
      return {
        roleName: [
          { required: true, message: '请输入角色名称', trigger: 'blur' },
          { validator: validateZhEnNum, trigger: 'blur' }
        ]
      }
    },
    notEditable() {
      return this.modalName === 'view'
    }
  },
  watch: {
    // checkedKeys(val) {
    //   console.log(val)
    //   this.form.menuPermissionCodes = val
    // }
  },
  async created() {
    this.getAllMenu()
  },
  methods: {
    onCheck(checkedKeys, info) {
      this.form.menuPermissionCodes = checkedKeys.concat(info.halfCheckedKeys)
      this.selectedKeys = checkedKeys
    },

    onExpand(expandedKeys) {
      this.expandedKeys = expandedKeys
      this.autoExpandParent = false
    },

    getAllMenu() {
      this.loading = true
      this.$api.menu.getAllMenu().then(res => {
        let menu = res.childMenu
        this.menuAll = menu
        // 获取最底层菜单
        let that = this
        function findUnderlyMenu(tempMenu) {
          tempMenu.forEach(item => {
            if (item.childMenu != null) {
              // 继续回调
              findUnderlyMenu(item.childMenu)
            } else {
              // 获取到所有底层菜单的权限
              that.levelThreeMenuList.push(item.permissionCode)
            }
          })
        }
        findUnderlyMenu(menu)

        if (this.modalName !== 'add' && Object.keys(this.detail).length) {
          this.initForm()
          this.getRoleDetail()
        } else {
          this.loading = false
        }
      })
    },
    getRoleDetail() {
      return this.$api.role
        .getRoleDetail({ id: this.detail.id })
        .then(res => {
          if (!res) return false
          if (res.menuElementList && res.menuElementList.length) {
            let menuElementList = res.menuElementList
            // 找出当前权限的底层权限用于渲染页面
            let newProList = []
            this.levelThreeMenuList.forEach(item => {
              menuElementList.forEach(proItem => {
                if (proItem == item) {
                  newProList.push(proItem)
                }
              })
            })
            this.selectedKeys = newProList
            this.form.menuPermissionCodes = menuElementList
          }
          return true
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

    submitForm() {
      this.$refs.permissionForm.validate(valid => {
        if (!valid) return false
        if (this.modalName === 'add') this.add()
        else if (this.modalName === 'edit') this.edit()
      })
    },
    add() {
      this.loading = true

      this.$api.role
        .addRole(this.form)
        .then(res => {
          this.$message.success('新增成功')
          this.$emit('close', true)
        })
        .finally(() => {
          this.loading = false
        })
    },
    edit() {
      this.loading = true
      this.$api.role
        .updateRole({
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
</style>
