<template>
  <div>
    <div>
      <el-card>
        <div class="orders">
          <div>Order_No</div>
          <div>Price</div>
          <div>Status</div>
        </div>
        <div v-for="(item,index) in order" :key="index" class="orders">
          <div>{{item.num}}</div>
          <div>¥{{item.price}}</div>
          <div>
            <div v-if="item.status===0" class="kuang1">pending</div>
            <div v-else-if="item.status===1" class="kuang2">success</div>
          </div>
        </div>
      </el-card>
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
      order: []
    };
  },
  //事件方法执行
  methods: {
    getordersData() {
      axios
        .get("/api/orderData")
        .then(res => {
          if (res.data.code === 0) {
            this.order = res.data.data;
            // window.console.log(res.data.data);
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
    //订单get请求
    this.getordersData();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {}
};
</script>

<style scoped lang='scss'>
.orders {
  display: flex;
  justify-content: center;
  border-bottom: 1px solid #ccc;
  padding: 8px 0 10px 0;
}
.orders div:nth-child(1) {
  flex: 3;
  text-align: center;
}
.orders div:nth-child(2),
.orders div:nth-child(3) {
  flex: 1;
  text-align: center;
}
.kuang1{
    width: 80px;
    margin-left:20px;
    padding:3px;
     border:1px solid pink;
     border-radius: 3px;
     background-color: #FEF0F0;
     color:#F57170;
}
.kuang2{
    width: 80px;
    margin-left:20px;
    padding:3px;
     border:1px solid #A1CB68;
     border-radius: 3px;
     background-color: #F0F9EB;
     color:#A1CB68;
}
</style>