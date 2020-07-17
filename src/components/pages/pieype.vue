<template>
  <div>
    <el-card>
      <ve-pie :data="piechartData" :settings="chartSettings"></ve-pie>
    </el-card>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
      this.chartSettings = {
        roseType: 'radius'
      }
    return {
        // chartSettings:{},
       piechartData: {
          columns: [ 'name','data'],
          rows: []
        }
    };
  },
  //事件方法执行
  methods: {
      getpiechartData() {
      axios
        .get("/api/ringChat")
        .then(res => {
          if (res.data.code === 0) {
           this.piechartData.rows = res.data.data;
            // window.console.log(this.piechartData.rows);
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
    //   饼形图 请求
      this.getpiechartData();
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