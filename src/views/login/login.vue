<template>
  <div class="box">
    <div class="box1">
      <div>
        <div style="color:#555">欢迎来到小爱后台系统</div>
        <el-form :model="form" :rules="rules" status-icon ref="form">
          <el-form-item label="请输入用户" prop="username">
            <el-input v-model="form.username" style="width:400px"></el-input>
          </el-form-item>
          <el-form-item label="请输入密码" prop="password">
            <el-input v-model="form.password" show-password style="width:400px"></el-input>
          </el-form-item>
          <div style="display:flex">
            <el-form-item label="请输入验证码" prop="code">
              <el-input v-model="form.code" style="width:40%"></el-input>
            </el-form-item>
            <div v-html="codeimg" @click="codes"></div>
          </div>
          <el-form-item>
            <el-button type="primary" @click="login" style="width:30% text-align:center">立即登录</el-button>
            <el-button type="primary" @click="register" style="width:30% text-align:center">立即注册</el-button>
          </el-form-item>
        </el-form>
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
    return {
      codeimg: "",
      form: {
        username: "",
        password: "",
        code: ""
      },
      obj: {},

      rules: {
        username: [
          { required: true, message: "用户名不能为空", trigger: "blur" },
          { min: 2, max: 8, message: "用户名在2-8之间", trigger: "blur" }
        ],
        password: [
          { required: true, message: "密码不能为空", trigger: "blur" },
          { min: 6, max: 15, message: "密码在6-15之间", trigger: "blur" }
        ],
        code: [{ required: true, message: "验证码不能为空", trigger: "blur" }]
      }
    };
  },
  //事件方法执行
  methods: {
    // 跳转立即注册
    register() {
      this.$router.push("/register");
    },
    //二维码切换
    codes() {
      axios
        .get("/api/captcha")
        .then(res => {
          this.codeimg = res.data;
          console.log(res);
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 登录请求
    login() {
      this.$refs.form.validate(valid => {
        if (valid) {
          axios
            .post("/api/user/login", {
              username: this.form.username,
              password: this.form.password,
              code: this.form.code
            })
            .then(res => {
              if (res.data.code === 200) {
                (this.form.username = ""),
                  (this.form.password = ""),
                  (this.form.code = ""),
                  this.$message.success(res.data.message);
                console.log("登录打印" + res.data);
                this.obj = res.data.data[0];
                // console.log("登录打印2"+res.data.data)
                localStorage.setItem("usernames", JSON.stringify(this.obj));
                //跳转主页
                this.$router.push("/homepage");
              } else {
                this.$message.error(res.data.message);
              }
              console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("登录失败");
        }
      });
    }
  },
  //页面初始化方法
  mounted() {
    // 二维码
    axios
      .get("/api/captcha")
      .then(res => {
        this.codeimg = res.data;
        console.log(res);
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
.box {
  height: 100%;
  width: 100%;
  background-image: url("http://img5.imgtn.bdimg.com/it/u=2783946986,2573261917&fm=26&gp=0.jpg");
  background-repeat: no-repeat;
  background-size: 100% 100%;
  position: absolute;
  padding-top: 201px;
}
.box1 {
  width: 30%;
  display: flex;
  justify-content: center;
  align-items: center;
  margin: 0 auto;
  border: 1px solid #999;
  padding: 30px;
}
</style>