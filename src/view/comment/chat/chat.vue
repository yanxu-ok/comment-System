<template>
  <div class="chat">
    <Card :bordered="false">
      <i-select
        v-model="cateKey"
        @on-change="nameChange"
        style="width:180px;margin-left:30px"
      >
        <i-option
          v-for="(item, index) in newColumnList"
          :value="item.columnKey"
          :key="index"
          >{{ item.columnName }}</i-option
        >
      </i-select>
      <!-- 按条件搜索
      <i-select
        v-model="selectValue"
        @on-change="nameChange"
        style="width:180px;margin-left:30px"
      >
        <i-option
          v-for="(item, index) in cateList"
          :value="item.value"
          :key="index"
          >{{ item.label }}</i-option
        >
      </i-select> -->
      <!-- 搜索框 -->
      <!-- <Input v-model="searchValue" placeholder="" style="width: 200px" />
      <Button type="primary" @click="handleBtnClick">搜索</Button> -->

      <!-- 表格 -->
      <Table :columns="columns1" :data="crrectArticleList">
        <template slot-scope="{ row }" slot="proName">
          <div @click="handleBtnPd(row)" class="name">
            文章名:{{ row.programName }}
          </div>
        </template>
        <template slot-scope="{ row }" slot="date">
          <div>发布时间:{{ row.startTime }}</div>
        </template>
      </Table>
      <div style="text-align: center;">
        <pagination
          :page-size="10"
          :total="total"
          @pageChange="getCurrectPage"
        ></pagination>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions } from "vuex";
import pagination from "_c/pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      searchValue: "",
      selectValue: "",
      crrectArticleList: [], // 当前文章列表
      total: 0,
      cateKey: "",
      cateList: [
        {
          value: "1",
          label: "按评论关键词"
        },
        {
          value: "2",
          label: "按用户名"
        },
        {
          value: "3",
          label: "按用户ID"
        },
        {
          value: "4",
          label: "按标题关键字"
        }
      ],
      cateList1: [
        {
          value: "1",
          label: "直播"
        }
      ],
      columns1: [
        {
          title: "标题",
          align: "center",
          slot: "proName"
        },
        {
          title: "发布时间",
          slot: "date"
        }
      ]
    };
  },
  computed: {
    ...mapGetters([
      "getCurrectJigouId",
      "newColumnList",
      "getCurrectTotal",
      "getCurrectCateKey",
      "getHomeList",
      "getCurrectCommentTotal",
      "getCommentList"
    ])
  },
  methods: {
    ...mapMutations(["setCurrectCateKey"]),
    ...mapActions(["getColumnList", "getPList"]),
    // 搜索按钮事件
    handleBtnClick() {},
    // 下拉改变的
    nameChange(value) {
      console.log(value);
      this.setCurrectCateKey(value);
      this.cateKey = value;
      console.log(value, "当前选择的栏目key");
      this.getPList({
        page: 1,
        pageSize: 10
      }).then(res => {
        this.crrectArticleList = res;
        console.log(res);
      });
    },
    // 点击文章跳转
    handleBtnPd(row) {
      this.$router.push({
        name: "now-chat",
        query: {
          obj: row
        }
      });
    },
    // 当前页变化时
    getCurrectPage(currect) {
      this.getPList({
        page: currect,
        pageSize: 10
      }).then(res => {
        console.log(res);
        this.crrectArticleList = res;
      });
    }
  },
  watch: {
    // 监听当前机构ID的变化 获取栏目分类列表
    getCurrectJigouId(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getColumnList(1).then(res => {
        console.log(res, "监听的当前栏目列表");
        if (res != null && res.length != 0) {
          this.cateKey = res[0].columnKey;
          this.setCurrectCateKey(res[0].columnKey);
          this.getPList({
            page: 1,
            pageSize: 10
          }).then(res => {
            this.crrectArticleList = res;
            console.log(res);
          });
        } else {
          this.$Message.info("当前没有栏目");
        }
      });
    }
  },
  mounted() {
    // 获取栏目分类列表
    this.getColumnList(1).then(res => {
      console.log(res, "页面加载的栏目列表");
      if (res != null && res.length != 0) {
        this.cateKey = res[0].columnKey;
        this.setCurrectCateKey(res[0].columnKey);
        this.getPList({
          page: 1,
          pageSize: 10
        }).then(res => {
          this.crrectArticleList = res;
          console.log(res);
        });
      } else {
        this.$Message.info("当前没有栏目");
      }
    });
  }
};
</script>

<style lang="less" scoped>
@import "./chat.less";
</style>
