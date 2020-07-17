<template>
  <div>
    <el-card>
      <ve-histogram :data="columnarData" :settings="columnarSettings"></ve-histogram>
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
       this.columnarSettings = {
        metrics: ['actual','expected'],
        dimension: ['date']
      }
    return {
        columnarData: {
          columns: ['date', 'expected', 'actual'],
          rows: []
        }
    };
  },
  //事件方法执行
  methods: {
    getcolumnarData() {
      axios
        .get("/api/homeChat")
        .then(res => {
          if (res.data.code === 0) {
            this.columnarData.rows = res.data.data;
            // console.log(this.columnarData.rows);
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
    //柱形图 get请求
    this.getcolumnarData();
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