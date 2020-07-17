<template>
  <div>
    <div class="box">
      <top></top>
      <div style="display:flex;">
        <div class="box1"  style="width:13%">
          <navigation></navigation>
        </div>
        <div class="box2" style="width:87%">
          <router-view></router-view>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import top from "../components/top.vue";
import navigation from "../components/Navigation.vue";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {
    top,
    navigation
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
.box1 {
  display: flex;
}
.box2 {
  height: 700px;
  overflow: auto;
}
</style>