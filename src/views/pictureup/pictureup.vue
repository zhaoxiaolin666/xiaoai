<template>
  <div>
    <el-card class="pictureups">
      <div>
        <div>支持拖拽</div>
        <div>
          <el-upload class="upload-demo" drag action="/api/upload/" multiple>
            <i class="el-icon-upload"></i>
            <div class="el-upload__text">
              将文件拖到此处，或
              <em>点击上传</em>
            </div>
            <div class="el-upload__tip" slot="tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </div>
        

        <div class="pictureups2">
            <el-button type="primary" class="btn" @click="toggleShow">上传图片</el-button>
        <my-upload
          @crop-success="cropSuccess"
          @crop-upload-success="cropUploadSuccess"
          @crop-upload-fail="cropUploadFail"
          v-model="show"
          :width="200"
          :height="200"
          img-format="png"
          :size="size"
          langType="zh"
          :noRotate="false"
          field="file"
          url="/api/upload/"
        ></my-upload>
        <img :src="imgDataUrl" />
        </div>
      </div>
    </el-card>
  </div>
</template>

<script>
import myUpload from "vue-image-crop-upload";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: { "my-upload": myUpload},
  // 定义变量
  data() {
    return {
        imgDataUrl: "",
        show: false,
        size:2.1
    };
  },
  //事件方法执行
  methods: {
      toggleShow() {
            this.show = !this.show;
        },
        cropSuccess(imgDataUrl, field) {
            console.log('-------- crop success --------',imgDataUrl, field);
        },
        //上传成功回调
        cropUploadSuccess(jsonData, field){
            console.log('-------- upload success --------');
            this.imgDataUrl = jsonData.files.Avatar1;
            console.log(jsonData);
            console.log('field: ' + field);
        },
        //上传失败回调
        cropUploadFail(status, field){
            console.log('-------- upload fail --------');
            console.log('上传失败状态'+ status);
            console.log('field: ' + field);
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
.pictureups {
  width: 100%;
}
.pictureups2{
    margin-top:20px;
}
</style>