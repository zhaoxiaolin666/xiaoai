<template>
  <div class="box">
    <div class="box1">
      <div style="color:#555">欢迎来到小爱后台系统</div>
      <el-form :model="form" :rules="rules" status-icon ref="form">
        <el-form-item label="请输入用户" prop="username">
          <el-input v-model="form.username"></el-input>
        </el-form-item>
        <el-form-item label="请输入密码" prop="password">
          <el-input v-model="form.password" show-password></el-input>
        </el-form-item>
        <el-form-item >
          <el-button type="primary" @click="register" style="width:30% text-align:center">立即注册</el-button>
          <el-button type="primary" @click="login" style="width:30% text-align:center">立即登录</el-button>
        </el-form-item>
      </el-form>
    </div>
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
    return {
      form: {
        username: "",
        password: ""
      },

      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "用户名在2-8之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "密码在6-15之间", trigger: "blur" }
        ]
      }
    };
  },
  //事件方法执行
  methods: {
    // 注册请求
    register() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios.post('/api/user/register',{username:this.form.username,password:this.form.password}).then(res=>{
            if(res.data.code===200){
              this.form.username='',
              this.form.password=''
              //  localStorage.setItem('user',JSON.stringify(this.form))
               this.$message.success(res.data.message);
            }else{
               this.$message.error(res.data.message);
            }
            console.log(res.data)
          }).catch(err=>{
            console.log(err)
          })
          
        } 
        else {
          this.$message.error("表单填写错误，请检查");
        }
        
      });
    },
    // 跳转登录
  login(){
    this.$router.push("/login");
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
.box {
  height: 100%;
  width: 100%;
  background-image: url('http://img5.imgtn.bdimg.com/it/u=2783946986,2573261917&fm=26&gp=0.jpg');
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  padding-top: 200px;
}
.box1 {
  margin: 0 auto;
  border: 1px solid #999;
  width:300px;
  height:300px;
  padding:30px;
}
</style>