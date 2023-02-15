<template>
  <div class="homePage">
    <div class="box">
      <div class="picBox">
        <img src="../../static/kanBan/Group.png" alt="" />
      </div>
      <div class="textBox">
        本期异动条目数
      </div>
      <div class="numBox">
        <span>{{ nowNumber }}</span>
        <img v-if="nowNumber > lastNumber" src="../../static/kanBan/rise (2).png" alt="" />
        <img v-else-if="nowNumber < lastNumber" src="../../static/kanBan/decline (2).png" alt="" />
      </div>
    </div>
    <div class="box">
      <div class="picBox">
        <img src="../../static/kanBan/Group (3).png" alt="" />
      </div>
      <div class="textBox">
        上期异动条目数
      </div>
      <div class="numBox">
        <span>{{ lastNumber }}</span>
        <img v-if="lastNumber > lastLastNumber" src="../../static/kanBan/rise (2).png" alt="" />
        <img v-else-if="lastNumber < lastLastNumber" src="../../static/kanBan/decline (2).png" alt="" />
      </div>
    </div>
    <div class="box">
      <div class="picBox">
        <img src="../../static/kanBan/Group (2).png" alt="" />
      </div>
      <div class="textBox">
        环比
      </div>
      <div class="numBox">
        <!-- 再需确认 -->
        <span v-if="lastNumber != 0 && nowNumber != 0">{{ Math.round(((lastNumber - nowNumber) / lastNumber) * 10000) / 100 }}</span>
        <span v-else>{{ 0 }}</span>
        <img src="../../static/kanBan/percentage.png" alt="" />
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
      default: 0
    },
    lastNumber: {
      type: Number,
      default: 0
    },
    lastLastNumber: {
      type: Number,
      default: 0
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
  height: 100%;
  margin-right: 12px;
  background-color: rgb(2, 9, 27);
  padding: 20px;
  // border-radius: 0 0 10px 10px;
  // overflow: hidden;
}
.box:not(:first-child) {
  margin-top: 20px;
}
.box {
  height: 80px;
  line-height: 75px;
  background-color: rgb(9, 21, 47);
  display: flex;
  justify-content: space-between;
  padding: 0 30px;
  border-radius: 15px;
  .picBox {
    width: 80px;
    text-align: center;
    img {
      width: 75%;
      height: 75%;
    }
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
    width: 120px;
    // border: 1px solid;
    color: #fff;
    font-size: 40px;
    img {
      // border: 1px solid;
      margin-left: 10px;
    }
  }
}
</style>
