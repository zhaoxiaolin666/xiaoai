<template>
  <div>
    <div class="pages">
      <div class="pages1">
        <div class="card1">
          <el-card>
            <div class="changecard">
              <div class="icon1">
                <i class="iconfont icon-lianxiren"></i>
              </div>
              <div></div>
              <div class="card4">
                <div class="card2">New Visits</div>
                <countTo :startVal="startVal" :endVal="obj.visits" :duration="5000" class="card3"></countTo>
              </div>
            </div>
          </el-card>
        </div>
        <div class="card1">
          <el-card>
            <div class="changecard">
              <div class="icon2">
                <i class="iconfont icon-xinxi"></i>
              </div>
              <div class="card4">
                <div class="card2">Messages</div>
                <countTo :startVal="startVal" :endVal="obj.messages" :duration="5000" class="card3"></countTo>
              </div>
            </div>
          </el-card>
        </div>
        <div class="card1">
          <el-card>
            <div class="changecard">
              <div class="icon3">
                <i class="iconfont icon-renminbi"></i>
              </div>
              <div class="card4">
                <div class="card2">Purchases</div>
                <countTo
                  :startVal="startVal"
                  :endVal="obj.purchases"
                  :duration="5000"
                  class="card3"
                ></countTo>
              </div>
            </div>
          </el-card>
        </div>
        <div class="card1">
          <el-card>
            <div class="changecard">
              <div class="icon4">
                <i class="iconfont icon-gouwuche"></i>
              </div>
              <div class="card4">
                <div class="card2">Shoppings</div>
                <countTo :startVal="startVal" :endVal="obj.shopping" :duration="5000" class="card3"></countTo>
              </div>
            </div>
          </el-card>
        </div>
      </div>
      <el-card class="pages2">
        <ve-line :data="chartData"></ve-line>
      </el-card>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import countTo from "vue-count-to";
export default {
  name: "",
  //接收父组件传递过来的参数
  props: {},
  //注册组件
  components: { countTo },
  // 定义变量
  data() {
    return {
      obj: {},
      startVal: 0,
      endVal: "",
      chartData: {
        columns: ["date", "actual", "expected"],
        rows: []
      }
    };
  },
  //事件方法执行
  methods: {
    getChartData() {
      axios
        .get("/api/homeChat")
        .then(res => {
          if (res.data.code === 0) {
            this.chartData.rows = res.data.data;
            // window.console.log(this.chartData.rows);
          }
        })
        .catch(err => {
          console.log(err);
        });
    },
    getHomeData() {
      axios
        .get("/api/homeData")
        .then(res => {
          if (res.data.code === 0) {
            this.obj = res.data.data;
            // console.log(this.obj)
          }
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    }
  },
  //页面初始化方法
  mounted() {
    //计数器get请求
    this.getHomeData();
    //折线图 get请求
    this.getChartData();
  },

  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.pages {
  display: flex;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  background-color: #eee;
}
.pages1 {
  width: 100%;
  display: flex;
  justify-content: space-around;
  align-items: center;
}
.card1 {
  width: 20%;
  margin: 20px;
}
.changecard {
  display: flex;
  justify-content: space-between;
}
.card1 > div {
  flex: 1;
}
.card2 {
  color: #999;
}
.card3 {
  color: #666;
}
.icon1 > i {
  font-size: 50px;
  color: #44c8c5;
}
.icon2 > i {
  font-size: 50px;
  color: #40a5f4;
}
.icon3 > i {
  font-size: 50px;
  color: #f4778b;
}
.icon4 > i {
  font-size: 50px;
  color: #feba85;
}
.pages2 {
  width: 100%;
}
.pages3 {
  width: 500px;
  height: 300px;
}
</style>