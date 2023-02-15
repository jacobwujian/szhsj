<template>
  <div>
    <basePage :loading="loading" :empty-state="emptyState" :page-type="1" :show-chart-row1="false">
      <template slot="header">
        <a-form-model layout="inline" class="tempForm" @submit="fetch" @submit.native.prevent>
          <a-form-model-item label="菜单名称">
            <a-input v-model="menuName" class="inputCommon w200" />
          </a-form-model-item>

          <a-form-model-item>
            <a-button type="primary" class="addBtn" @click="showModal('add')">
              新增
            </a-button>
            <a-button type="primary" html-type="submit">
              应用
            </a-button>
          </a-form-model-item>
        </a-form-model>
      </template>

      <template slot="table">
        <MenuTable ref="base" :columns="columns" :scroll="{ x: 1300 }" :data="data" @fetch="fetch">
          <template slot="action" slot-scope="{ record }">
            <!-- <a-button v-if="record.status === 0" type="link">
              启用
            </a-button>
            <a-button v-if="record.status === 1" type="link">
              停用
            </a-button> -->
            <a-button type="link" @click="showModal('edit', record)">
              修改
            </a-button>
            <a-button type="link" @click="showConfirm('delete', record.id)">
              删除
            </a-button>
          </template>
        </MenuTable>
      </template>
    </basePage>

    <a-modal v-model="modalVisible" :title="modalTitle" :width="600" :footer="null" :destroy-on-close="true">
      <MenuForm ref="menuForm" :detail="detail" :modal-name="modalName" @close="close" />
    </a-modal>
  </div>
</template>

<script>
import basePage from '@/components/base/basePage'
import MenuTable from './components/menuTable.vue'
import moment from 'moment'
import { menuState, menuHierarchy, EnumMap } from '@/utils/typeEnum'
import { codeToText, ZJoptions } from '@/utils/cascader-address-options'
import MenuForm from './components/menuForm'

const columns = [
  {
    title: '菜单名称',
    dataIndex: 'menuItem',
    width: 300
  },
  {
    title: '菜单层级',
    dataIndex: 'level',
    width: 70,
    scopedSlots: { customRender: 'level', type: 'select', data: menuHierarchy }
  },
  {
    title: '菜单路径',
    dataIndex: 'menuPath',
    width: 450
  },
  {
    title: '菜单状态',
    dataIndex: 'status',
    width: 70,
    scopedSlots: { customRender: 'status', type: 'select', data: menuState }
  },
  {
    title: '创建时间',
    dataIndex: 'createTime',
    scopedSlots: { customRender: 'createTime', type: 'time' },
    width: 150
  },
  {
    title: '更新时间',
    dataIndex: 'updateTime',
    scopedSlots: { customRender: 'updateTime', type: 'time' },
    width: 150
  },
  {
    title: '操作',
    scopedSlots: { customRender: 'action' },
    width: 120
    // width: 180
  }
]

const confirmTypes = {
  stop: {
    api: 'stopProject',
    title: '暂停'
  },
  start: {
    api: 'launchProject',
    title: '启动'
  },
  delete: {
    api: 'deleteMenu',
    title: '删除',
    content: '是否确定删除？菜单如果删除，则此菜单下包含的所有子菜单将全部删除！'
  }
}
export default {
  components: { basePage, MenuTable, MenuForm },

  data() {
    return {
      loading: false,
      emptyState: false,
      start: null,
      end: null,
      columns,
      dataList: [],
      data: [],
      pagination: {
        total: 0,
        current: 1,
        pageSize: 10,
        showQuickJumper: true,
        showSizeChanger: true,
        size: 'middle'
      },
      areaOptions: ZJoptions,
      EnumMap,
      codeToText,
      modalName: '', // view- 详情 add- 新增 edit- 修改
      modalVisible: false,
      detail: '',
      menuName: ''
    }
  },
  computed: {
    modalTitle() {
      if (this.modalName === 'add') return '新增菜单'
      else if (this.modalName === 'edit') return '修改菜单'
      else return '菜单详情'
    }
  },

  methods: {
    showConfirm(type, id) {
      const title = confirmTypes[type].title
      const content = confirmTypes[type].content || `是否确定${title}该菜单？`
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
    confirmActions(type, id) {
      const apiName = confirmTypes[type].api
      apiName &&
        this.$api.menu[apiName]({ id }).then(res => {
          this.$message.success('操作成功')
          this.$refs.base.fetch()
        })
    },
    close(isFetch = false) {
      this.modalVisible = false
      if (isFetch) if (this.$refs.base) this.$refs.base.fetch()
    },
    showModal(type, record) {
      this.modalName = type
      this.detail = record
      this.modalVisible = true
    },
    moment,
    // 应用查询
    fetch() {
      this.loading = true
      this.$api.menu
        .getMenu({
          menuItem: this.menuName
        })
        .then(res => {
          if (!res) res = { list: [], total: 0 }
          let list = res.list
          this.data = list
          if (this.$refs.base) this.$refs.base.fetchSuccess(res.total)
        })
        .finally(() => {
          if (this.$refs.base) this.$refs.base.fetchFinally()
          this.loading = false
        })
    }
  }
}
</script>
<style lang="less" scoped>
.tempForm {
  display: flex;
  justify-content: space-between;
}
.addBtn {
  margin-right: 20px;
}
/deep/.inputCommon {
  background-color: #0f1727;
  border-color: #232942;
  color: #fff;
}
</style>
