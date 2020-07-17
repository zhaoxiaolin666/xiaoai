<template>
  <div>
    <div class="tops">
      <div class="left">欢迎{{name.username}}来到小爱后台管理系统</div>
      <div class="right">
        <div>{{this.tips}},亲爱的{{name.username}}</div>
        <div>上次登录时间：{{this.time}}</div>
      </div>
    </div>
  </div>
</template>

<script>
import dayjs from "dayjs";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      name: {},
      time: "",
      tips: ""
      // activeIndex: '1',
      // activeIndex2: '1'
    };
  },
  //事件方法执行
  methods: {
    // handleSelect(key, keyPath) {
    //   console.log(key, keyPath);
    // }
  },
  //页面初始化方法
  mounted() {
    this.name = JSON.parse(localStorage.getItem("usernames"));
    let arr = this.name.date;
    this.time = dayjs(arr).format("YYYY年MM月DD日HH时mm分ss秒");
    let d = new Date();
    let hour = d.getHours();
    // console.log(hour)
    if (hour > 6 && hour <= 12) {
      this.tips = "早上好";
    } else if (hour > 12 && hour <= 14) {
      this.tips = "中午好";
    } else if (hour > 14 && hour <= 18) {
      this.tips = "下午好";
    } else {
      this.tips = "该睡觉了";
    }
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.tops {
  width: 100%;
  background-color: #2e5e85;
  display: flex;
  justify-content: space-between;
  color: #eee;
}
.left {
  padding: 20px 20px;
}
.right {
  display: flex;
  padding: 20px 30px;
}
.right div {
  margin-left: 10px;
}
</style>