<template>
  <div>
    <div class="chu">
      <div class="chu1">
        <div class="topchu">期待您的下次光临</div>
        <div class="chu2">
          <el-button type="primary" @click="tuichu">确定退出</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {};
  },
  //事件方法执行
  methods: {
    tuichu() {
      axios
        .get("/api/user/logout")
        .then(res => {
          if (res.data.code === 0) {
            localStorage.clear();
            this.$message.success(res.data.message);
            this.$router.push("/login");
          }
          console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
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
.chu {
  width: 100vw;
  height: 100vh;
  position: relative;
}
.chu1 {
  position: absolute;
  top: 300px;
  left: 500px;
  text-align: center;
}
.topchu {
  font-size: 24px;
  font-weight: 500;
}
.chu2 {
  display: flex;
  justify-content: center;
}
</style>