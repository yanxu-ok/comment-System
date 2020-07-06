<template>
  <div style="margin:0 50px">
    <Card :bordered="false">
      <div class="ho_article_contain">
        <!-- 栏目 -->
        <template v-if="newColumnList && newColumnList.length != 0">
          <Select
            @on-change="selectChange"
            style="width:150px"
            v-model="cateKey"
          >
            <Option
              v-for="(item, index) in newColumnList"
              :value="item.columnKey"
              :key="index"
              >{{ item.columnName }}</Option
            >
          </Select>
        </template>
        <datePicker @dateValue="getDateValue"></datePicker>
      </div>
      <div style="margin-top:20px">
        <Table stripe :columns="columns" :data="getHotList">
          <template slot-scope="{ index }" slot="paiming">
            <div>{{ index + 1 }}</div>
          </template>
        </Table>
      </div>
      <div class="pagination_contain">
        <pagination
          :total="getNewTotal"
          @pageChange="getCurrectPage"
        ></pagination>
      </div>
    </Card>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import pagination from "_c/pagination";
import datePicker from "_c/date-picker";
export default {
  components: {
    datePicker,
    pagination
  },
  data() {
    return {
      columns: [
        {
          title: "排名",
          slot: "paiming"
        },
        {
          title: "文章名称",
          key: "programName"
        },
        {
          title: "日评论数",
          key: "commentNum"
        }
      ],
      date: null,
      cateKey: ""
    };
  },
  computed: {
    ...mapGetters([
      "getCurrectJigouId",
      "newColumnList",
      "getCurrectCateKey",
      "getNewTotal",
      "getHotList"
    ])
  },
  methods: {
    // 获取date值
    getDateValue(dateValue) {
      this.date = dateValue;
      console.log(dateValue);
      this.popularArticles({
        startTime: dateValue[0],
        endTime: dateValue[1],
        pageSize: 10,
        offset: 1
      });
    },
    // 当前页发生变化时
    getCurrectPage(currect) {
      console.log(currect);
      this.popularArticles({
        startTime: this.date[0],
        endTime: this.date[1],
        pageSize: 10,
        offset: currect
      });
    },
    ...mapActions(["getColumnList", "popularArticles"]),
    ...mapMutations(["setCurrectCateKey"]),

    // 下拉列表
    selectChange(value) {
      // 先改变栏目key 在请求
      this.setCurrectCateKey(value);
      this.cateKey = value;
      this.popularArticles({
        pageSize: 10,
        offset: 1
      });
    }
  },
  watch: {
    // 当栏目分类列表获取后，先请求第一页
    newColumnList(newList, oldList) {
      console.log(newList, oldList, "栏目分类列表变化");
      if (newList.length != 0) {
        this.cateKey = newList[0].columnKey;
        this.setCurrectCateKey(newList[0].columnKey);
        this.popularArticles({
          pageSize: 10,
          offset: 1
        });
      }
    },
    // 监听当前机构ID的变化 获取栏目分类列表
    getCurrectJigouId(newValue, oldValue) {
      console.log(newValue, oldValue);
      this.getColumnList(1);
    }
  },
  // 页面一加载获取栏目列表
  mounted() {
    this.getColumnList(1);
  }
};
</script>

<style lang="less" scoped>
@import "./hot-article.less";
</style>
