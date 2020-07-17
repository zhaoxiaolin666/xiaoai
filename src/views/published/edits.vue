<template>
  <div>
    <div>
      <div class="article_top">
        <div>
          <el-button type="danger" @click="looks">返回</el-button>
        </div>
        <div>
          <el-button type="primary" @click="release111">发布</el-button>
        </div>
      </div>
      <div>
        <el-form
          :model="ruleForm"
          :rules="rules"
          ref="ruleForm"
          label-width="100px"
          class="demo-ruleForm"
        >
          <!-- 文章标题 -->
          <el-form-item label="文章标题" prop="title">
            <el-input v-model="ruleForm.title"></el-input>
          </el-form-item>
          <!-- 文章摘要 -->
          <el-form-item label="文章摘要" prop="abstract">
            <el-input v-model="ruleForm.abstract"></el-input>
          </el-form-item>
          <div class="selection_column">
            <div>
              <!-- 作者 -->
              <el-form-item label="作者" prop="author">
                <el-input v-model="ruleForm.author"></el-input>
              </el-form-item>
            </div>
            <div>
              <!-- 类名 -->
              <el-form-item label="类目" prop="category">
                <el-select v-model="ruleForm.category" placeholder="请选择类目">
                  <el-option
                    v-for="item in options"
                    :key="item.label"
                    :label="item.label"
                    :value="item.value"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <!-- 来源  -->
              <el-form-item label="来源" prop="source">
                <el-select v-model="ruleForm.source" placeholder="请选择来源">
                  <el-option
                    v-for="item in options111"
                    :key="item.label111"
                    :label="item.label111"
                    :value="item.value111"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <!-- 重要性  -->
              <el-form-item label="重要性" prop="star">
                <el-select v-model="ruleForm.star" placeholder="请选择重要性">
                  <el-option
                    v-for="item in options222"
                    :key="item.label222"
                    :label="item.label222"
                    :value="item.value222"
                  ></el-option>
                </el-select>
              </el-form-item>
            </div>
            <div>
              <!-- 发布时间  -->
              <el-form-item label="发布时间" prop="date">
                <el-date-picker v-model="ruleForm.date" type="datetime" placeholder="选择日期时间" default-time="12:00:00"></el-date-picker>
              </el-form-item>
            </div>
          </div>
        </el-form>
      </div>
      <mavon-editor v-model="ruleForm.text" />
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
      // 绑定v-model
      ruleForm: {
        title: "", //文章标题
        abstract: "", //文章摘要
        author: "", //作者
        category: "", //类目
        source: "", //来源
        star:"", //重要性
        date: "", //发布时间
        text: "" //文章内容
      },
      //类目
      options: [
        {
          value: "Vue",
          label: "Vue"
        },
        {
          value: "React",
          label: "React"
        },
        {
          value: "Note.js",
          label: "Note.js"
        },
        {
          value: "性能优化",
          label: "性能优化"
        },
        {
          value: "JavaScript",
          label: "JavaScript"
        },
        {
          value: "小程序",
          label: "小程序"
        },
        {
          value: "工具类",
          label: "工具类"
        },
        {
          value: "其他",
          label: "其他"
        }
      ],
      //来源
      options111: [
        {
          value111: "原创",
          label111: "原创"
        },
        {
          value111: "转载",
          label111: "转载"
        },
        {
          value111: "与他人合作",
          label111: "与他人合作"
        }
      ],
      //重要性
      options222: [
        {
          value222: 1,
          label222: 1
        },
        {
          value222: 2,
          label222: 2
        },
        {
          value222: 3,
          label222: 3
        },
        {
          value222: 4,
          label222: 4
        },
        {
          value222: 5,
          label222: 5
        }
      ],
      //规则
      rules: {
        //文章标题
        title: [{ required: true, message: "请输入文章标题", trigger: "blur" }],

        //文章摘要
        abstract: [
          { required: true, message: "请输入文章摘要", trigger: "blur" }
        ],

        //作者
        author: [{ required: true, message: "请输入作者名", trigger: "blur" }],

        //类目
        category: [{ required: true, message: "请输入类目", trigger: "blur" }],

        //来源
        source: [{ required: true, message: "请输入来源", trigger: "blur" }],

        //重要性
        star: [{ required: true, message: "请输入重要性", trigger: "blur" }],

        //发布时间
        date: [{ required: true, message: "请输入发布时间", trigger: "blur" }]
      }
    };
  },
  //事件方法执行
  methods: {
    release111() {
      this.$refs.ruleForm.validate(valid => {
        if (valid) {
          axios
            .post("/api/article/update", {
              id:this.id,
              title: this.ruleForm.title,
              abstract: this.ruleForm.abstract,
              author: this.ruleForm.author,
              category: this.ruleForm.category,
              source: this.ruleForm.source,
              star: this.ruleForm.star,
              text: this.ruleForm.text,
              date: this.ruleForm.date
            })
            .then(res => {
            //   window.console.log(res.data);
              if (res.data.success === true) {
                // localStorage.setItem(
                //   "ruleForm111",
                //   JSON.stringify(this.ruleForm)
                // );
                // console.log(res.data.data);
                this.$message.success("发布成功");
                  this.ruleForm={}
              } else {
                this.$message.error("发布失败");
              }
              //   console.log(res.data);
            })
            .catch(err => {
              console.log(err);
            });
        } else {
          this.$message.error("发布失败");
        }
      });
      this.$router.push("/Publishedarticles");
    },
    looks() {
      this.$router.push("/Publishedarticles");
    }
  },
  //页面初始化方法
  mounted() {
       this.id=this.$route.query.id
    //  console.log(this.id)
      axios
        .post("/api/article/article", { _id:this.id })
        .then(res => {
            
            this.ruleForm=res.data.data
            // console.log(res.data.data)
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
.article_top {
  display: flex;
  justify-content: center;
  margin: 20px 0;
  background-color: #59a586;
  padding: 5px 0;
  div {
    margin: 0 20px;
  }
}
.selection_column {
  display: flex;
  justify-content: space-around;
  div {
    flex: 1;
  }
}
.bottom_center {
  display: flex;
  justify-content: center;
  margin: 30px 0;
}
</style>