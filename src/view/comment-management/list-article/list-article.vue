<template>
  <div>
    <!-- 事件选择器 -->
    <!-- <datePicker></datePicker> -->
    <!-- 表格 -->
    <div style="margin-top:20px">
      <Table
        row-key="id"
        :columns="columns"
        :data="getActList"
        border
        width="1105"
        style="margin: 0 auto"
        :highlight-row="true"
      >
        <template slot-scope="{ row, index }" slot="forbid">
          <i-switch
            v-model="row.addSetting"
            :disabled="getSetting.addSetting"
            @on-change="
              switchChange({
                row,
                setting: 'addSetting',
                type: 'programe',
                obj
              })
            "
            :true-value="0"
            :false-value="1"
          />
        </template>
        <template slot-scope="{ row, index }" slot="hide">
          <i-switch
            v-model="row.hideSetting"
            :disabled="getSetting.hideSetting"
            @on-change="
              switchChange({
                row,
                setting: 'hideSetting',
                type: 'programe',
                obj
              })
            "
            :true-value="1"
            :false-value="0"
          />
        </template>
        <template slot-scope="{ row, index }" slot="gloal">
          <i-switch
            v-model="row.releaseSetting"
            :disabled="getSetting.releaseSetting"
            @on-change="
              switchChange({
                row,
                setting: 'releaseSetting',
                type: 'programe',
                obj
              })
            "
            :true-value="1"
            :false-value="0"
          />
        </template>
      </Table>
    </div>
    <div class="pagination_contain">
      <pagination :total="getTotal" @pageChange="getCurrectPage"></pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapMutations, mapActions, mapState } from "vuex";
import pagination from "_c/pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      columns: [
        {
          title: "文稿列表",
          key: "articleName",
          width: "500",
          renderHeader: (h, params) => {
            return h("div", {}, params.column.title);
          }
        },
        {
          title: "禁止评论",
          key: "addSetting",
          width: "200",
          align: "center",
          slot: "forbid"
        },
        {
          title: "隐藏评论",
          key: "hideSetting",
          width: "200",
          align: "center",
          slot: "hide"
        },
        {
          title: "先发后审",
          key: "releaseSetting",
          align: "center",
          slot: "gloal"
        }
      ],
      obj: {}
    };
  },
  computed: {
    ...mapGetters(["getTotal", "getActList", "getSetting"])
  },
  methods: {
    // 当前页发生变化时
    getCurrectPage(currect) {
      let { columnKey, platformKey } = this.obj;
      console.log(currect);
      this.getArticleList({
        columnKey,
        platformKey,
        pageSize: 10,
        offset: currect
      });
    },
    // 点击开关时触发事件
    switchChange(obj) {
      this.setDetailSetting(obj);
    },
    ...mapActions(["getArticleList", "setDetailSetting"])
  },
  mounted() {
    this.obj = this.$route.query.articleid;
    console.log(this.obj, "传递过来文章参数");
    let { columnKey, platformKey } = this.obj;
    /// 获取文章
    this.getArticleList({
      columnKey,
      platformKey,
      pageSize: 10,
      offset: 1
    });
  }
};
</script>

<style lang="less" scoped>
@import "./list-article.less";
</style>
