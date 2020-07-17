<template>
  <div>
    <div style="margin:20px 0">
      <el-input v-model="search" placeholder="请输入商品名" style="width:300px"></el-input>
    </div>
    <el-card class="elcard">
      <div class="export_top">
        <div>名称</div>
        <div>商品编号</div>
        <div>原价</div>
        <div>现价</div>
        <div>操作</div>
      </div>
      <div
        v-for="(item,index) in  exportsdata.slice((currentPage-1)*pagesize,currentPage*pagesize)"
        :key="index"
        class="export_bottom"
      >
        <div>{{item.NAME}}</div>
        <div>{{item.GOODS_SERIAL_NUMBER}}</div>
        <div>{{item.ORI_PRICE}}</div>
        <div>{{item.PRESENT_PRICE}}</div>
        <div>
          <div>
            <el-button type="primary" @click="dialogs(item,index)">
              <i class="el-icon-edit"></i>修改
            </el-button>
          </div>
          <div>
            <el-button type="danger" @click="dels(item,index)">
              <i class="el-icon-delete"></i>删除
            </el-button>
          </div>
        </div>
      </div>
    </el-card>
    <div class="block">
      <el-pagination
        @size-change="handleSizeChange"
        @current-change="handleCurrentChange"
        :current-page="currentPage"
        :page-size="pagesize"
        layout="total, sizes, prev, pager, next, jumper"
        :total="exportsdata.length"
      ></el-pagination>
    </div>

    <!-- 导出xls  -->
    <div class="excel">
    <div class="excel1">
      <download-excel
        class="export-excel-wrapper"
        :fetch="fetchData"
        :fields="json_fields"
        name="filename.xls"
        type="xls"
      >
        <el-button type="primary" size="small">导出XLS</el-button>
      </download-excel>
    </div>

    <!-- 导出csv  -->
    <div class="excel2">
      <download-excel
        class="export-excel-wrapper"
        style="cursor: default"
        :fetch="fetchData"
        :fields="json_fields"
        name="exportsdata.csv"
        type="csv"
      >
        <el-button type="danger" size="small">导出CVS</el-button>
      </download-excel>
    </div>
    </div>

    <!-- 对话框  -->
    <el-dialog title="提示" :visible.sync="dialogVisible" width="30%">
      <div>
        <div>名称：</div>
        <div>
          <el-input v-model="name" style="width:400px"></el-input>
        </div>
      </div>
      <div>
        <div>原价：</div>
        <div>
          <el-input v-model="oriprice" style="width:400px"></el-input>
        </div>
      </div>
      <div>
        <div>现价：</div>
        <div>
          <el-input v-model="presentoriprice" style="width:400px"></el-input>
        </div>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="dialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="dialogVisible111">确 定</el-button>
      </span>
    </el-dialog>
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
      json_fields: {
        商品: "NAME",
        商品编号: "GOODS_SERIAL_NUMBER",
        原价: "ORI_PRICE",
        现价: "PRESENT_PRICE"
      },
      search: "",
      exportsdata: [],
      exportsdata111: [],
      currentPage: 1,
      pagesize: 10,
      dialogVisible: false,
      name: "",
      oriprice: "",
      presentoriprice: "",
      indexsss: ""
    };
  },
  //事件方法执行
  methods: {
    getexportsData() {
      axios
        .get("/api/tableData")
        .then(res => {
          if (res.data.code === 0) {
            this.exportsdata = res.data.data;
            this.exportsdata111 = this.exportsdata;
            this.nums = this.exportsdata.length;
            // console.log(this.exportsdata);
          }
          //   console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    handleSizeChange(val) {
      this.pagesize = val;
      // console.log(`每页 ${val} 条`);
    },
    handleCurrentChange(val) {
      this.currentPage = val;
      // console.log(`当前页: ${val}`);
    },
    //删除
    dels(item, index) {
      index = index + this.pagesize * (this.currentPage - 1);
      this.exportsdata.splice(index, 1);
      this.$message.success("删除成功");
    },
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then(_ => {
          done();
        })
        .catch(_ => {});
    },
    //操作修改
    dialogs(item, index) {
      this.dialogVisible = true;
      let a = parseInt(index + this.pagesize * (this.currentPage - 1));
      this.name = this.exportsdata[a].NAME;
      this.oriprice = this.exportsdata[a].ORI_PRICE;
      this.presentoriprice = this.exportsdata[a].PRESENT_PRICE;
      this.indexsss = a;
    },
    //确定修改
    dialogVisible111() {
      //   console.log(this.indexsss);
      this.dialogVisible = false;
      this.exportsdata[this.indexsss].NAME = this.name;
      this.exportsdata[this.indexsss].ORI_PRICE = this.oriprice;
      this.exportsdata[this.indexsss].PRESENT_PRICE = this.presentoriprice;
      this.indexsss = "";
    },
    async fetchData(){
     const  list  = this.exportsdata
      return list;
    },
  },
  //页面初始化方法
  mounted() {
    this.getexportsData();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {
    //   搜索
    search(val) {
        this.currentPage=1
      this.exportsdata = this.exportsdata111.filter(item => {
        return JSON.stringify(item).includes(val);
      });
    }
  },
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.elcard {
  padding: 0 10px;
  position: relative;
}
.exhibition {
  border: 1px solid red;
  position: absolute;
  left: 400px;
  background-color: white;
  padding: 20px;
}
.operation {
  display: flex;
  justify-content: flex-end;
  margin-top: 50px;
}
.export_top {
  display: flex;
  justify-content: space-around;
  padding: 20px 0;
}
.export_bottom {
  display: flex;
  justify-content: space-around;
  padding: 10px 0;
}
.export_bottom:hover {
  background-color: #eee;
}
.export_bottom > div {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
}
.excel {
  display: flex;
}
</style>