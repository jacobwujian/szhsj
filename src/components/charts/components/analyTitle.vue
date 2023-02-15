<template>
  <div class="titlePage">
    <div class="title">
      <div class="titBox">
        <div class="boxTemp" />
        <div>{{ titleName }}</div>
        <div v-if="operatStatus == true" class="operatBox">
          <div v-for="(item, index) in operatList" :id="operatItemTemp + index" :key="index" class="operatItem" @click="operat(item.type, $event)">
            {{ item.name }}
          </div>
        </div>
      </div>
      <div v-if="refreshStatus == true" class="refresh" @click="refresh">
        刷新
        <!-- <a-icon type="sync" /> -->
        <img src="../../../static/analyTitle/refresh.png" alt="" />
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    titleName: {
      type: String,
      default: ''
    },
    refreshStatus: {
      type: Boolean,
      default: true
    },
    operatList: {
      type: Array,
      default: () => []
    },
    operatStatus: {
      type: Boolean,
      default: false
    },
    tempStatus: {
      type: Number,
      default: 9
    }
  },
  data() {
    return {
      operatItem: 'operatItem',
      operatItemTemp: 'operatItemTemp',
      tempDom: ''
    }
  },
  mounted() {
    if (this.tempStatus == 0) {
      this.tempDom = document.getElementById('operatItemTemp0')
      this.tempDom.style.borderColor = '#fff'
    }
  },
  methods: {
    operat(type, event) {
      this.tempDom.style.borderColor = '#02091b'
      event.target.style.borderColor = '#fff'
      this.tempDom = event.target
      this.$emit('operat', type)
    },
    // 刷新
    refresh() {
      // 子请求父方法
      this.$emit('refresh')
    }
  }
}
</script>

<style lang="less" scoped>
.titlePage {
  .title {
    // background-color: #5c657f;
    background-color: #02091b;
    // border-radius: 10px 10px 0 0;
    color: #fff;
    line-height: 50px;
    padding: 0 20px;
    display: flex;
    justify-content: space-between;
    // margin: 5px 12px 0 12px;
    margin: 0 12px 0 0;
    font-size: 20px;
    font-weight: 500;
    user-select: none;
    .refresh {
      cursor: pointer;
      color: rgb(122, 185, 254);
      font-size: 16px;
    }
    .titBox {
      display: flex;
      .operatBox {
        height: 65%;
        line-height: 32px;
        margin-top: 9px;
        margin-left: 25px;
        text-align: center;
        background-color: #2e6280;
        color: #fff;
        font-size: 17px;
        display: flex;
        .operatItem {
          border: 1px solid #02091b;
          padding: 0 10px;
          cursor: pointer;
        }
      }
      .boxTemp {
        height: 25px;
        width: 5px;
        margin: auto;
        margin-right: 10px;
        background-color: rgb(84, 128, 233);
        border-radius: 25px;
      }
    }
  }
}
</style>
