<template>
  <div>
    <div>
      <el-card>
        <div class="arrow">
          <!-- 上箭头 -->
          <div v-if="this.arrow===true" @click="arrowup">
            <i class="icon iconfont icon-up"></i>
          </div>
          <!-- 下箭头 -->
          <div v-if="this.arrow===false" @click="arrowdown">
            <i class="icon iconfont icon-arrowdown"></i>
          </div>
          <div>Todo list</div>
        </div>
        <div v-if="lists.length>0">
          <div
            v-for="(item,index) in lists"
            :key="index"
            @mouseenter="enter(item)"
            @mouseleave="leave(item)"
          >
            <div class="navlist">
              <div>
                <input type="checkbox" v-model="item.checked" @change="solo"/>
                {{item.name}}
              </div>
              <div>
                <button v-if="item.flag===true" @click="del(item,index)">删除</button>
              </div>
            </div>
          </div>
        </div>
        <div v-else>暂无数据</div>
        <div class="todo_bottom">
          <div>{{notodo}}items left</div>
          <div>
            <button @click="All">All</button>
          </div>
          <div @click="active">active</div>
          <div @click="compalted">compalted</div>
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
      arrow: null,//标记
      lists111: [],
      lists: []
    };
  },
  //事件方法执行
  methods: {
    gettodolist() {
      axios
        .get("/api/todoList")
        .then(res => {
          if (res.data.code === 0) {
            this.lists = res.data.data;
            this.lists111 = this.lists;
            // 移入移出标记 
            this.lists.map(item => {
              this.$set(item, "flag", false);
            });
            // 判断箭头初始方向
            this.arrow = this.lists.every(item => {
              return item.checked;
            });
            // console.log(this.arrow);
            // console.log(this.lists);
          }
          // console.log(res.data)
        })
        .catch(err => {
          console.log(err);
        });
    },
    // 全选按钮
    All(){
        this.lists = this.lists111
    },
    // All() {
    //   let a = this.lists.every(item => {
    //     return item.checked === true;
    //   });
    //   //   console.log(a);
    //   if (a) {
    //     this.lists.map(item => {
    //       item.checked = false;
    //     });
    //   } else {
    //     this.lists.map(item => {
    //       item.checked = true;
    //     });
    //   }
    // },
    // 移入
    enter(item) {
      item.flag = true;
    },
    // 移出
    leave(item) {
      item.flag = false;
    },
    // 删除按钮
    del(item, index) {
      this.lists111.splice(index, 1);
      this.lists=this.lists111
    },
    // 未完成统计
    active() {
      this.lists = this.lists111.filter(item => {
        return item.checked === false;
      });
    },
    // 完成统计
    compalted() {
      this.lists = this.lists111.filter(item => {
        return item.checked === true;
      });
    },
    // 上箭头点击事件
    arrowup() {
      this.lists.map(item => {
        item.checked = false;
        this.arrow = false;
      });
    },
    // 下箭头点击事件
    arrowdown() {
      this.lists.map(item => {
        item.checked = true;
        this.arrow = true;
      });
    },
    // 单选框change事件
    solo(){
         this.arrow = this.lists.every(item => {
        return item.checked;
      });
    //    console.log(this.arrow);
    }
  },
  //页面初始化方法
  mounted() {
    //todolist get请求
    this.gettodolist();
  },
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    //   统计未完成数
    notodo() {
      let a = this.lists.filter(item => {
        return item.checked === false;
      });
      return a.length;
    }
  }
};
</script>

<style scoped lang='scss'>
.arrow {
  display: flex;
  justify-content: space-between;
}
.todo_bottom {
  display: flex;
  justify-content: space-around;
  cursor: default;
   padding-bottom: 20px;
}
.navlist {
  display: flex;
  justify-content: space-between;
  height: 45px;
  cursor: default;
}
</style>