<!-- formModal -->
<template>
  <div>
    <div>
      <a-form-model
        ref="editForm"
        layout="vertical"
        :model="form"
        :rules="rules"
      >
        <a-row :gutter="[16, 16]">
          <template v-for="item in formList">
            <a-col
              v-if="!item.noShow&&(form.plantType!==2?true:(item.params!=='type'&&item.params!=='plantAttr'))"
              :key="item.params"
              :span="8"
            >
              <a-form-model-item
                :ref="item.params"
                :label="item.label"
                :prop="item.params"
              >
                <a-input
                  v-if="item.type === 'input'"
                  v-model.trim="form[item.params]"
                  :placeholder="item.placeholder"
                  :type="item.miss || 'text'"
                />
                <a-input-number
                  v-if="item.type === 'inputNumber'"
                  v-model.trim="form[item.params]"
                  :min="0"
                  :max="100"
                  :precision="2"
                  :step="1"
                />
                <a-select
                  v-if="item.type === 'select'"
                  v-model="form[item.params]"
                  :placeholder="item.placeholder"
                >
                  <a-select-option
                    v-for="sitem in item.data"
                    :key="sitem.value"
                    :value="sitem.value"
                  >
                    {{ sitem.name }}
                  </a-select-option>
                </a-select>
                <template v-if="item.type === 'upload'">
                  <CUpload
                    ref="cUpload"
                    :file-id="item.params && form[item.params]"
                    @on-success="uploadSuccess"
                  />
                </template>
                <a-cascader
                  v-if="item.type === 'areaPicker'"
                  v-model="form[item.params]"
                  :options="areaOptions"
                  :placeholder="item.placeholder"
                />
                <a-range-picker
                  v-if="item.type === 'datePicker'"
                  v-model="form[item.params]"
                />
              </a-form-model-item>
            </a-col>
            <a-col
              v-if="item.noShow && item.params === 'annual' && form['type'] == '1'"
              :key="item.params"
              :span="8"
            >
              <a-form-model-item
                :ref="item.params"
                :label="item.label"
                :prop="item.params"
              >
                <a-input
                  v-model.trim="form[item.params]"
                  :placeholder="item.placeholder"
                  :type="item.miss || 'text'"
                />
              </a-form-model-item>
            </a-col>
          </template>
        </a-row>
      </a-form-model>
    </div>
    <div class="model-footer">
      <a-space size="large">
        <a-button
          type="primary"
          @click="handleOk"
        >
          ??????
        </a-button>
        <a-button
          type="primary"
          @click="resetForm"
        >
          ??????
        </a-button>
        <a-button @click="$emit('close', false)">
          ??????
        </a-button>
      </a-space>
    </div>
  </div>
</template>

<script>
import CUpload from '@/components/base/c-upload'
import { validatePhone, validateEmail } from '@/utils/validate.js'
import { ZJoptions } from '@/utils/cascader-address-options'
import {plantType, plantArr, epCode, managementDepartment, unitProperty, plantTypeT} from '@/utils/typeEnum'
import Base64JS from '@/utils/enCode'
const regex = new RegExp('(?=.*[0-9])(?=.*[A-Z])(?=.*[a-z])(?=.*[^a-zA-Z0-9]).{8,30}')
export default {
  components: {
    CUpload
  },
  props: {
    value: {
      type: Boolean
    }
  },
  data() {
    let validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('???????????????'))
      } else {
        if (this.form.password !== '') {
          this.$refs.editForm.validateField('confirmpwd')
        }
        callback()
      }
    }
    let validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('?????????????????????'))
      } else if (value !== this.form.password) {
        callback(new Error('?????????????????????'))
      } else {
        callback()
      }
    }

    // let payvalidatePass = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('?????????????????????'))
    //   } else {
    //     if (this.form.payPassword !== '') {
    //       this.$refs.editForm.validateField('confirmPayPassword')
    //     }
    //     callback()
    //   }
    // }
    // let payvalidatePass2 = (rule, value, callback) => {
    //   if (value === '') {
    //     callback(new Error('???????????????????????????'))
    //   } else if (value !== this.form.payPassword) {
    //     callback(new Error('???????????????????????????'))
    //   } else {
    //     callback()
    //   }
    // }
    return {
      areaOptions: ZJoptions,
      loading: false,
      imageUrl: '',
      labelCol: { span: 6 },
      wrapperCol: { span: 16 },
      form: {
        ecRate: 0,
        twoDate: [],
        issuanceDate: {},
        expiredDate: {},
        plantType: 1
      },
      rules: {
        password: [
          { validator: validatePass, trigger: 'blur' },
          { required: true, message: '???????????????', trigger: 'blur' },
          { pattern: regex, message: '?????????????????????????????????????????????????????????,??????8-30???,??????Yhh@2918', trigger: 'blur' }
        ],
        confirmpwd: [
          { required: true, message: '???????????????', trigger: 'blur' },
          { validator: validatePass2, trigger: 'blur' },
          { pattern: regex, message: '?????????????????????????????????????????????????????????,??????8-30???,??????Yhh@2918', trigger: 'blur' }
        ],
        // payPassword: [
        //   { validator: payvalidatePass, trigger: 'blur' },
        //   { required: true, message: '?????????????????????', trigger: 'blur' },
        //   { pattern: regex, message: '?????????????????????????????????????????????????????????,??????8-30???,??????Yhh@2918', trigger: 'blur' }
        // ],
        // confirmPayPassword: [
        //   { required: true, message: '?????????????????????', trigger: 'blur' },
        //   { validator: payvalidatePass2, trigger: 'blur' },
        //   { pattern: regex, message: '?????????????????????????????????????????????????????????,??????8-30???,??????Yhh@2918', trigger: 'blur' }
        // ],
        companyName: [
          { required: true, message: '???????????????????????????', trigger: 'blur' },
          { pattern: /^\S{1,60}$/, message: '???????????????????????????', trigger: 'blur' }
        ],
        companyArea: [{ type: 'array', required: true, message: '?????????????????????', trigger: 'change' }],
        address: [{ pattern: /^\S{1,80}$/, message: '??????????????????????????????', trigger: 'blur' }],
        businessLicense: [{ required: true, message: '?????????????????????', trigger: 'blur' }],
        mail: [
          { max: 20, message: '??????????????????20???', trigger: 'change' },
          { required: true, message: '???????????????', trigger: 'blur' },
          { validator: validateEmail, trigger: 'blur' }
        ],
        phone: [
          { required: true, message: '??????????????????', trigger: 'blur' },
          { validator: validatePhone, trigger: 'blur' }
        ]
      },
      formList: [
        {
          type: 'input',
          params: 'plantName',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true
        },
        /*{
          type: 'input',
          params: 'registeredAddress',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true
        },*/
        {
          type: 'areaPicker',
          params: 'plantArea',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true
        },
        {
          type: 'input',
          params: 'address',
          placeholder: '?????????????????????',
          label: '????????????'
        },
        {
          type: 'select',
          params: 'plantType',
          placeholder: '?????????????????????',
          label: '????????????',
          data: plantTypeT,
          required: true
        },
        {
          type: 'select',
          params: 'companyName',
          placeholder: '???????????????????????????',
          label: '??????????????????',
          data: managementDepartment
        },
        // {
        //   type: 'select',
        //   params: 'epCode',
        //   placeholder: '?????????????????????',
        //   label: '????????????',
        //   required: true,
        //   data: epCode
        // },
     /*   {
          type: 'input',
          params: 'sewageLicense',
          placeholder: '??????????????????????????????',
          label: '?????????????????????'
        },*/
        {
          type: 'select',
          params: 'type',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true,
          data: plantType
        },
        {
          type: 'select',
          params: 'unitProperty',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true,
          data: unitProperty
        },
        {
          type: 'select',
          params: 'plantAttr',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true,
          data: plantArr
        },
        {
          type: 'input',
          params: 'registeredCapital',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true,
          reg: 'n'
        },
/*        {
          type: 'input',
          params: 'annual',
          placeholder: '??????????????????????????????:t???',
          label: '?????????????????????:t???',
          required: true,
          reg: 'n'
        },*/
        {
          type: 'upload',
          params: 'plantLicenseUrl',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true
        },
        {
          type: 'input',
          params: 'plantLicense',
          placeholder: '???????????????????????????',
          label: '??????????????????',
          required: true
        },
        {
          type: 'datePicker',
          params: 'twoDate',
          placeholder: '??????????????????????????????',
          label: '?????????????????????',
          required: true
        },
        {
          type: 'input',
          params: 'ad',
          placeholder: 'ds',
          label: 'as',
          noShow: true
        },
        {
          type: 'input',
          params: 'legalPerson',
          placeholder: '????????????????????????',
          label: '???????????????',
          required: true
        },
        // {
        //   type: 'input',
        //   params: 'legalPersonIdCard',
        //   placeholder: '???????????????????????????',
        //   label: '??????????????????',
        //   required: true
        // },
        {
          type: 'input',
          params: 'contact',
          placeholder: '????????????????????????',
          label: '???????????????',
          required: true
        },
        {
          type: 'input',
          params: 'phone',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true
        },
        {
          type: 'input',
          params: 'mail',
          placeholder: '?????????????????????',
          label: '????????????'
        },
        {
          type: 'input',
          params: 'postalCode',
          placeholder: '?????????????????????',
          label: '????????????'
        },
        {
          type: 'input',
          params: 'username',
          placeholder: '????????????????????????',
          label: '???????????????',
          required: true,
          reg: 'enz-20'
        },
        {
          type: 'input',
          params: 'password',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true,
          miss: 'password'
        },
        {
          type: 'input',
          params: 'confirmpwd',
          placeholder: '?????????????????????',
          label: '????????????',
          required: true,
          miss: 'password'
        }
        // ,
        // {
        //   type: 'input',
        //   params: 'payPassword',
        //   placeholder: '?????????????????????',
        //   label: '????????????',
        //   required: true,
        //   miss: 'password'
        // },
        // {
        //   type: 'input',
        //   params: 'confirmPayPassword',
        //   placeholder: '?????????????????????',
        //   label: '??????????????????',
        //   required: true,
        //   miss: 'password'
        // }
      ]
    }
  },
  computed: {},
  watch: {},
  created() {
    this.initForm()
    this.initRules()
    if (this.$route.path.indexOf(this.$cPath) !== 0) {
      const index = this.formList.findIndex(item => item.params === 'type')
      this.formList.splice(index, 1)
    }
  },
  mounted() {},
  destroyed() {},
  activated() {},
  methods: {
    initForm() {
      this.formList.forEach(item => {
        if (item.params in this.form) return

        if (item.type === 'areaPicker') {
          this.$set(this.form, item.params, [])
        } else {
          this.$set(this.form, item.params, '')
        }
      })
    },
    initRules() {
      const ruleType = {
        enz: `([\u4E00-\uFA29]|[\uE7C7-\uE7F3]|[a-zA-Z0-9_])`,
        en: `([a-zA-Z0-9_])`,
        n: `([0-9])`
      }
      this.formList.forEach(item => {
        if (this.rules[item.params]) return
        let list = []
        if (item.required) {
          list.push({ required: true, message: item.placeholder, trigger: 'blur' })
        }
        if (item.reg) {
          const regArr = item.reg.split('-')
          // ??????????????????
          const bit = regArr.length === 1 ? '*' : `{${regArr.length === 3 ? '' : '0,'}${regArr[1]}}`
          // ??????????????????
          const msg = item.placeholder.slice(0, 3) + '?????????' + (regArr.length === 1 ? '' : regArr.length === 3 ? `?????????${regArr[1]}??????` : `?????????${regArr[1]}??????`) + item.placeholder.slice(3)
          const regex = new RegExp(`^${ruleType[regArr[0]]}${bit}$`)
          list.push({ pattern: regex, message: msg, trigger: 'blur' })
        }
        this.rules[item.params] = list
      })
    },
    handleOk() {
      this.$refs.editForm.validate(valid => {
        if (valid) {
          this.form.issuanceDate = this.form.twoDate[0]
          this.form.expiredDate = this.form.twoDate[1]
          this.$api.user
            .registerUser({
              ...this.form,
              annual: this.form.annual,
              plantArea: this.form.plantArea.join(','),
              password: Base64JS.encode(this.form.password),
              confirmpwd: Base64JS.encode(this.form.confirmpwd),
              payPassword: Base64JS.encode(this.form.payPassword),
              confirmPayPassword: Base64JS.encode(this.form.confirmPayPassword)
            })
            .then(res => {
              this.$message.success('????????????, ????????????????????????')
              this.$emit('close')
            })
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    uploadSuccess(data) {
      this.form.plantLicenseUrl = data
      this.$refs.editForm.validateField('planLicenseUrl')
    },
    resetForm() {
      this.$refs.editForm.resetFields()
      this.$refs.cUpload && this.$refs.cUpload[0].reset()
    }
  }
}
</script>
<style lang="less" scoped>
/deep/.ant-form-vertical .ant-form-item {
  padding-bottom: 0;
}
</style>
