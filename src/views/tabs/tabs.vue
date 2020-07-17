<template>
  <div>
    <div>
      <el-tabs v-model="activeName" @tab-click="handleClick">
        <el-tab-pane :label="Unreadmessages" name="first">
          <div v-if="unreads.length">
            <div v-for="(item,index) in unreads" :key="index" class="tabs">
              <div>{{item.name}}</div>
              <div class="tabs1">
                <div>2018-04-19 21:00:00</div>
                <div>
                  <el-button type="primary" plain @click="unreadsflag(item,index)">标为已读</el-button>
                </div>
              </div>
            </div>
            <div class="marginleft">
              <el-button type="primary" @click="allunreadsflag">全部标为已读</el-button>
            </div>
          </div>
          <div v-else class="wu">暂无数据</div>
        </el-tab-pane>
        <el-tab-pane :label="Readmessage" name="second">
          <div v-if="reads.length">
            <div v-for="(item,index) in reads" :key="index" class="tabs">
              <div>{{item.name}}</div>
              <div class="tabs1">
                <div>2018-04-19 21:00:00</div>
                <div>
                  <el-button plain @click="readsflag(item,index)">删除</el-button>
                </div>
              </div>
            </div>
            <div class="marginleft">
              <el-button type="danger" @click="allreadsflag">删除全部</el-button>
            </div>
          </div>
          <div v-else class="wu">暂无数据</div>
        </el-tab-pane>
        <el-tab-pane :label="ecyclebin" name="third">
          <div v-if="recycles.length">
            <div v-for="(item,index) in recycles" :key="index" class="tabs">
              <div>{{item.name}}</div>
              <div class="tabs1">
                <div>2018-04-19 21:00:00</div>
                <div>
                  <el-button type="warning" @click="recyclesflag(item,index)">还原</el-button>
                </div>
              </div>
            </div>
            <div class="marginleft">
              <el-button type="info" @click="allrecyclesflag">清空回收站</el-button>
            </div>
          </div>
          <div v-else class="wu">暂无数据</div>
        </el-tab-pane>
      </el-tabs>
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
      activeName: "first",
      unreads: [
        { name: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护" },
        { name: "今晚12点整发大红包，先到先得" }
      ],
      reads: [
        { name: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护" },
        { name: "【系统通知】该系统将于今晚凌晨2点到5点进行升级维护" }
      ],
      recycles: [{ name: "【系统通知】您的优惠券已经过期了" }]
    };
  },
  //事件方法执行
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
    //标为已读 已读添加
    unreadsflag(item, index) {
      this.reads.push(item);
      this.unreads.splice(index, 1);
    },
    //全部标为已读 已读添加全部未读
    allunreadsflag() {
      this.unreads.map(item => {
        this.reads.push(item);
      });
      this.unreads.splice(0);
    },
    //删除已读 回收站添加
    readsflag(item, index) {
      this.recycles.push(item);
      this.reads.splice(index, 1);
    },
    //删除全部已读 回收站添加全部已读
    allreadsflag() {
      this.reads.map(item => {
        this.recycles.push(item);
      });
      this.reads.splice(0);
    },
    //还原回收站到已读
    recyclesflag(item, index) {
      this.reads.push(item);
      this.recycles.splice(index, 1);
    },
    //清空回收站
    allrecyclesflag() {
      this.recycles.splice(0);
    }
  },
  //页面初始化方法
  mounted() {},
  //监听方法  click事件等，执行drawFeatures方法
  //监听值变化
  watch: {},
  //计算
  computed: {
    //未读标签数
    Unreadmessages() {
      let a = `未读消息(${this.unreads.length})`;
      return a;
    },
    //已读标签数
    Readmessage() {
      let b = `已读消息(${this.reads.length})`;
      return b;
    },
    //回收站标签数
    ecyclebin() {
      let c = `回收站(${this.recycles.length})`;
      return c;
    }
  }
};
</script>

<style scoped lang='scss'>
.tabs {
  height: 40px;
  display: flex;
  justify-content: space-between;
  margin: 20px;
  .tabs1 {
    display: flex;
    align-items: center;
    div {
      margin: 0 10px;
    }
  }
}
.marginleft {
  margin: 20px;
}
.wu {
  margin-left: 20px;
}
</style>