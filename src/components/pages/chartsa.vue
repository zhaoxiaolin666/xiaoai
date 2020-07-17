import axios from 'axios';
<template>
  <div>
    <el-card>
      <ve-radar :data="radartData"></ve-radar>
    </el-card>
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
      radartData: {
        columns: ["name", "sales", "ministration", "techology", "marketing","delelopmer"],
        rows: []
      }
    };
  },
  //事件方法执行
  methods: {
    getradarData() {
      axios
        .get("/api/radarChat")
        .then(res => {
          if (res.data.code === 0) {
           this.radartData.rows = res.data.data;
            // console.log(this.radartData.rows);
          }
        //   console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //页面初始化方法
  mounted() {
    // 雷达图 get请求
    this.getradarData();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>
<style scoped lang='scss'>
</style>