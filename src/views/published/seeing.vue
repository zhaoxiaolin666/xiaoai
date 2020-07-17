<template>
  <div>
        <div style="margin:20px">
            <el-button type="primary" @click="backpublished">返回</el-button>
        </div>
        <div class="centerlook">
            <div class="centerlook1">{{looks.title}}</div>
            <div class="centerlook2">摘要：{{looks.abstract}}</div>
            <div class="centerlook3">发表于：{{looks.date}}</div>
        </div>
        <div>
            <el-card>
                    <div style="display:flex">{{looks.text}}</div>
            </el-card>
        </div>
  </div>
</template>

<script>
import axios from 'axios'
import dayjs from 'dayjs'
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
       id:'',
       looks:[]
    };
  },
  //事件方法执行
  methods: {
      backpublished(){
          this.$router.push('/Publishedarticles')
      }
  },
  //页面初始化方法
  mounted() {
     this.id=this.$route.query.id
     console.log(this.id)
      axios
        .post("/api/article/article", { _id:this.id })
        .then(res => {
            this.looks=res.data.data
            // console.log(res.data.data)
            this.looks.date=dayjs(this.looks.date).format("YYYY年MM月DD日")
        })
        .catch(err => {
          console.log(err);
        });
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.centerlook{
    text-align: center;
}
.centerlook1{
    font-size: 30px;
    font-weight: 700;
}
.centerlook3{
    color:#ccc;
    font-size:12px;
}
</style>