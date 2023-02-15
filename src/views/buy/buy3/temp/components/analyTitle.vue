<template>
  <div class="titlePage">
    <div class="title">
      <div class="titBox">
        <div class="boxTemp" />
        <div>{{ titleName }}</div>
      </div>
      <div class="refresh" @click="refresh">
        <a-icon type="sync" />
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
    }
  },

  methods: {
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
    background-color: rgb(2, 9, 27);
    border-radius: 10px 10px 0 0;
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
    }
    .titBox {
      display: flex;
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
