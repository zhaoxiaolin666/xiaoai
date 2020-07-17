<template>
  <div>
    <div>
      <el-card>
        <div class="progressbar_top"></div>
        <div class="progressbar_bottom" v-for="(item,index) in progress" :key="index">
          {{item.name}}
          <el-progress :percentage="item.progress*100" :format="format" v-if="item.progress<1"></el-progress>
          <el-progress :percentage="item.progress*100" status="success" v-if="item.progress===1"></el-progress>
        </div>
      </el-card>
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
    return {
      progress: []
    };
  },
  //事件方法执行
  methods: {
    getprogressbarData() {
      axios
        .get("/api/progress")
        .then(res => {
          if (res.data.code === 0) {
            this.progress = res.data.data;
            // console.log(res.data.data);
          }
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    format(percentage) {
      return percentage === 100 ? "" : `${percentage}%`;
    }
  },
  //页面初始化方法
  mounted() {
    //进度条get请求
    this.getprogressbarData();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.progressbar_top {
  background-image: url("https://wpimg.wallstcn.com/e7d23d71-cf19-4b90-a1cc-f56af8c0903d.png");
  height: 240px;
  background-repeat: no-repeat;
  background-size: 100% 100%;
  margin-bottom: 32px;
}
</style>