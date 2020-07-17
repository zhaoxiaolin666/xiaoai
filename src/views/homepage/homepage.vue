<template>
  <div>
    <div>
      <div>
        <headpage></headpage>
      </div>
      <div class="charts">
        <div>
          <chartsa></chartsa>
        </div>
        <div>
          <pieype></pieype>
        </div>
        <div>
          <columnar></columnar>
        </div>
      </div>
      <div class="followingtable">
        <div class="followingtable1">
          <orders></orders>
        </div>
        <div class="followingtable2">
            <todolist></todolist>
        </div>
        <div class="followingtable3">
          <progressbar></progressbar>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import headpage from "../../components/pages/headpage.vue";
import chartsa from "../../components/pages/chartsa.vue";
import pieype from "../../components/pages/pieype.vue";
import columnar from "../../components/pages/Columnar.vue";
import orders from "../../components/pages/orders.vue";
import progressbar from "../../components/pages/progressbar.vue";
import todolist from "../../components/pages/todolist.vue";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {
    headpage,
    chartsa,
    pieype,
    columnar,
    orders,
    progressbar,
    todolist
  },
  // 定义变量
  data() {
    return {};
  },
  //事件方法执行
  methods: {},
  //页面初始化方法
  mounted() {},
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.charts {
  display: flex;
  justify-content: space-around;
}
.charts > div {
  flex: 1;
}
.followingtable {
  display: flex;
  justify-content: space-between;
}
.followingtable1 {
  flex: 2;
}
.followingtable2 {
  flex: 1;
}
.followingtable3 {
  flex: 1;
}
</style>