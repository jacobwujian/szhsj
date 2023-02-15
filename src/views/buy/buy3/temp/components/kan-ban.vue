<template>
  <div class="homePage">
    <div class="box">
      <div class="picBox">
        图片
      </div>
      <div class="textBox">
        本期异动条目数
      </div>
      <div class="numBox">
        12
      </div>
    </div>
    <div class="box">
      <div class="picBox">
        图片
      </div>
      <div class="textBox">
        上期异动条目数
      </div>
      <div class="numBox">
        27
      </div>
    </div>
    <div class="box">
      <div class="picBox">
        图片
      </div>
      <div class="textBox">
        环比
      </div>
      <div class="numBox">
        18
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: 'KanBna',
  props: {
    nowNumber: {
      type: Number,
      default: 1
    },
    lastNumber: {
      type: Number,
      default: 1
    }
  },
  data() {
    return {}
  },
  computed: {}
}
</script>
<style scoped lang="less">
.homePage {
  height: 385px;
  width: 554px;
  // margin-left: 12px;
  background-color: rgb(2, 9, 27);
  padding: 20px;
  border-radius: 0 0 10px 10px;
  overflow: hidden;
}
.box:not(:first-child) {
  margin-top: 22px;
}
.box {
  width: 504px;
  height: 100px;
  line-height: 100px;
  background-color: rgb(54, 70, 132);
  display: flex;
  justify-content: space-between;
  padding: 5px 30px;
  border-radius: 15px;
  .picBox {
    width: 100px;
    height: 90px;
    border: 1px solid;
  }
  .textBox {
    width: 150px;
    height: 90px;
    // border: 1px solid;
    color: #fff;
    font-size: 16px;
    // text-align: center;
  }
  .numBox {
    width: 100px;
    height: 90px;
    // border: 1px solid;
    color: #fff;
    font-size: 40px;
  }
}
</style>
