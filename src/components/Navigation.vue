<template>
  <div>
    <div>
      <el-col :span="12">
        <el-menu
          :default-active="$route.meta.parentPath"
          router="router"
          @open="handleOpen"
          @close="handleClose"
          background-color="#545c64"
          text-color="#fff"
          active-text-color="#ffd04b"
          style="width:200px"
          class="height"
        >
          <el-menu-item index="/homepage">
            <i class="el-icon-location"></i>
            <span slot="title">首页</span>
          </el-menu-item>
          <el-menu-item index="/Publishedarticles">
            <i class="el-icon-menu"></i>
            <span slot="title">已发布</span>
          </el-menu-item>
          <el-menu-item index="/statistics">
            <i class="el-icon-menu"></i>
            <span slot="title">统计</span>
          </el-menu-item>
          <el-menu-item index="/article">
            <i class="el-icon-check"></i>
            <span slot="title">发表文章</span>
          </el-menu-item>
          <el-menu-item index="/tabs">
            <i class="el-icon-setting"></i>
            <span slot="title">标签页</span>
          </el-menu-item>
          <el-menu-item index="/exports">
            <i class="el-icon-setting"></i>
            <span slot="title">导出excel</span>
          </el-menu-item>
          <el-menu-item index="/pictureup">
            <i class="el-icon-setting"></i>
            <span slot="title">图片上传</span>
          </el-menu-item>
          <el-menu-item index="/exitthesystem">
            <i class="el-icon-delete"></i>
            <span slot="title">退出系统</span>
          </el-menu-item>
        </el-menu>
      </el-col>
    </div>
  </div>
</template>

<script>
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
    handleOpen(key, keyPath) {
      console.log(key, keyPath);
    },
    handleClose(key, keyPath) {
      console.log(key, keyPath);
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
.height {
  height: 700px !important;
}
</style>