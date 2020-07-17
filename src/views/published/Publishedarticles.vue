<template>
  <div>
    <div>
      <el-card>
        <div>
          <el-table
            :data="tableData.slice((currentPage-1)*pagesize,currentPage*pagesize)"
            style="width: 100%"
          >
            <el-table-column label="#" width="50">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.$index+1 }}</span>
              </template>
            </el-table-column>
            <el-table-column label="标题" width="200">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.title }}</span>
              </template>
            </el-table-column>
            <el-table-column label="作者" width="150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.author }}</span>
              </template>
            </el-table-column>
            <el-table-column label="类目" width="150">
              <template slot-scope="scope">
                <div slot="reference" class="name-wrapper">
                  <el-tag size="medium" v-if="scope.row.category==='Vue'">{{ scope.row.category }}</el-tag>
                  <el-tag
                    type="success"
                    v-if="scope.row.category==='React'"
                  >{{ scope.row.category }}</el-tag>
                  <el-tag type="info" v-if="scope.row.category==='Note.js'">{{ scope.row.category }}</el-tag>
                  <el-tag type="warning" v-if="scope.row.category==='性能优化'">{{ scope.row.category }}</el-tag>
                  <el-tag
                    type="danger"
                    v-if="scope.row.category==='JavaScript'"
                  >{{ scope.row.category }}</el-tag>
                  <el-tag type="info" v-if="scope.row.category==='小程序'">{{ scope.row.category }}</el-tag>
                  <el-tag type="warning" v-if="scope.row.category==='工具类'">{{ scope.row.category }}</el-tag>
                  <el-tag type="danger" v-if="scope.row.category==='其他'">{{ scope.row.category }}</el-tag>
                </div>
              </template>
            </el-table-column>
            <el-table-column label="来源" width="150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.source }}</span>
              </template>
            </el-table-column>
            <el-table-column label="重要性" width="150">
              <template slot-scope="scope">
                <el-rate v-model="scope.row.star" disabled show-score text-color="#ff9900"></el-rate>
              </template>
            </el-table-column>
            <el-table-column label="发布时间" width="150">
              <template slot-scope="scope">
                <span style="margin-left: 10px">{{ scope.row.date }}</span>
              </template>
            </el-table-column>
            <el-table-column label="操作" width="250">
              <template slot-scope="scope">
                <div class="buttoms">
                  <el-button size="mini" @click="handleEdit(scope.$index, scope.row)">编辑</el-button>
                  <el-button
                    size="mini"
                    type="danger"
                    @click="handleDelete(scope.$index, scope.row)"
                  >删除</el-button>
                  <el-button
                    type="success"
                    size="mini"
                    @click="seeDelete(scope.$index, scope.row)"
                  >查看</el-button>
                </div>
              </template>
            </el-table-column>
          </el-table>
          <div>
            <el-pagination
              @size-change="handleSizeChange"
              @current-change="handleCurrentChange"
              :current-page="currentPage"
              :page-size="pagesize"
              layout="total, sizes, prev, pager, next, jumper"
              :total="tableData.length"
            ></el-pagination>
          </div>
        </div>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import dayjs from "dayjs";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: {},
  // 定义变量
  data() {
    return {
      tableData: [],
      currentPage: 1,
      pagesize: 10,
      deleteData: [],
      articleData: []
    };
  },
  //事件方法执行
  methods: {
    //   发布get请求
    getpublishedData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          if (res.data.code === 200) {
            this.tableData = res.data.data;
            // console.log(res.data.data);
            this.num111 = this.tableData.length;
            this.tableData.map(item => {
              item.date = dayjs(item.date).format("YYYY年MM月DD日HH时mm分ss秒");
              item.star = Number(item.star);
            });
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
    // 点击事件编辑
    handleEdit(index, row) {
      axios
        .post("/api/article/update", { _id: row._id })
        .then(res => {
            // console.log(row._id)
            this.$router.push({path:'/edits',query:{id:row._id}})
        //   this.$router.push("/edits");
        })
        .catch(err => {
          console.log(err);
        });
    //   console.log(index, row);
    },
    // 点击事件删除
    handleDelete(index, row) {
      axios
        .post("/api/article/delete", { _id: row._id })
        .then(res => {
          this.tableData.splice(index, 1);
          if (this.pagesize >= this.tableData.length) {
           
          }
        })
        .catch(err => {
          console.log(err);
        });
      console.log(index, row);
    },
    //点击事件查看
    seeDelete(index, row) {
      axios
        .post("/api/article/article", { _id: row._id })
        .then(res => {
            // console.log(res.data)
            // console.log(row._id)
             this.$router.push({path:'/seeing',query:{id:row._id}})//传对象 id
        //   this.$router.push("/seeing");
        })
        .catch(err => {
          console.log(err);
        });
    //   console.log(index, row);
    }
  },
  //页面初始化方法
  mounted() {
    this.getpublishedData();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.buttoms {
  display: flex;
}
</style>