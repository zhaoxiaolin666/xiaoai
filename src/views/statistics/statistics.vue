<template>
  <div>
    <div class="statistics_top">
      <div class="statistics_top1">
        <div>
          今日发布
          <i class="el-icon-check"></i>
        </div>
        <div>{{num}}</div>
      </div>
      <div class="statistics_top2">
        <div>
          原创文章
          <i class="el-icon-tickets"></i>
        </div>
        <div>{{a}}</div>
      </div>
      <div class="statistics_top3">
        <div>
          新留言
          <i class="el-icon-message-solid"></i>
        </div>
        <div>2</div>
      </div>
      <div class="statistics_top4">
        <div>
          新消息
          <i class="el-icon-phone-outline"></i>
        </div>
        <div>9</div>
      </div>
    </div>
    <div class="piepicture">
      <div>
        <ve-pie :data="chartData"></ve-pie>
      </div>
      <div>
        <ve-pie :data="chartData111"></ve-pie>
      </div>
    </div>
    <div>
      <ve-waterfall :data="chartData222"></ve-waterfall>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import lodash from "lodash";
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
      chartData: {
        columns: ["分类", "数量"],
        rows: []
      },
      chartData111: {
        columns: ["来源", "数量"],
        rows: []
      },
      originals: [],
      chartData222: {
        columns: ["时间", "数量"],
        rows: []
      },
      date111: [],
      a: 0,
      num: 0
    };
  },
  //事件方法执行
  methods: {
    getallArticleData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          let category = lodash.groupBy(res.data.data, "category");
          // console.log(category);
          for (let i in category) {
            let obj = {};
            obj["分类"] = i;
            obj["数量"] = category[i].length;
            this.chartData.rows.push(obj);
            //   console.log(i);
            //   console.log(category[i]);
          }
          //   console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getAllsourceData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          let source = lodash.groupBy(res.data.data, "source");
          // console.log(source);
          for (let i in source) {
            let obj = {};
            obj["来源"] = i;
            obj["数量"] = source[i].length;
            this.chartData111.rows.push(obj);
            this.a = source["原创"].length;
            //   console.log(i);
            //   console.log(source["原创"].length);
          }
          //   console.log(res.data);
        })
        .catch(err => {
          console.log(err);
        });
    },
    getdateData() {
      axios
        .get("/api/article/allArticle")
        .then(res => {
          let date = lodash.groupBy(res.data.data, "date");
          let date222 = dayjs(Date.now()).format("YYYY年MM月DD日");
          //   console.log(date222);
          for (let i in date) {
            this.date111 = dayjs(i).format("YYYY年MM月DD日");
            let obj = {};
            obj["时间"] = this.date111;
            obj["数量"] = date[i].length;
            this.chartData222.rows.push(obj);
            if (date222 === this.date111) {
              this.num++;
            }
            // console.log(this.num);
            // console.log(this.date111);

            //   console.log(this.chartData222.rows)
            //   console.log(i);
            //   console.log(source[i]);
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
    this.getallArticleData();
    this.getAllsourceData();
    this.getdateData();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.piepicture {
  display: flex;
  justify-content: space-around;
  div {
    flex: 1;
  }
}
.statistics_top {
  display: flex;
  justify-content: space-around;
  margin: 20px;
  height: 50px;
  div {
    flex: 1;
    color: #eee;
  }
}
.statistics_top1 {
  background-color: #19d4ae;
  text-align: center;
  padding-top: 5px;
}
.statistics_top2 {
  background-color: #d7c6fa;
  text-align: center;
  padding-top: 5px;
}
.statistics_top3 {
  background-color: #63c2ff;
  text-align: center;
  padding-top: 5px;
}
.statistics_top4 {
  background-color: #fa6e86;
  text-align: center;
  padding-top: 5px;
}
</style>