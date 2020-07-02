<template>
  <div style="margin-top:20px">
    <Table
      row-key="id"
      :columns="columns"
      :data="getParamsColumnList"
      border
      width="1300"
      style="margin: 0 auto"
      :highlight-row="true"
      :load-data="handleLoadData"
    >
      <template slot-scope="{ row }" slot="columnName">
        <span>{{ row.columnName }}</span>
      </template>
      <template slot-scope="{ row }" slot="deepSetup">
        <router-link
          :to="{ name: 'list-article', query: { articleid: row } }"
          v-if="row.children.length != 0"
        >
          <div style="font-size:16px;">
            点此查看
          </div>
        </router-link>
      </template>
      <template slot-scope="{ row, index }" slot="forbid">
        <i-switch
          v-model="row.addSetting"
          :disabled="getSetting.addSetting"
          @on-change="
            switchChange({ row, setting: 'addSetting', type: 'column' })
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
            switchChange({ row, setting: 'hideSetting', type: 'column' })
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
            switchChange({ row, setting: 'releaseSetting', type: 'column' })
          "
          :true-value="1"
          :false-value="0"
        />
      </template>
    </Table>
    <div class="pagination_contain">
      <pagination
        :total="getTotal"
        :page-size="10"
        @pageChange="getCurrectPage"
      ></pagination>
    </div>
  </div>
</template>

<script>
import { mapGetters, mapActions, mapMutations } from "vuex";
import pagination from "@/components/pagination";
export default {
  components: {
    pagination
  },
  data() {
    return {
      columns: [
        {
          title: "政务号",
          width: "500",
          renderHeader: (h, params) => {
            return h("div", {}, params.column.title);
          },
          slot: "columnName",
          tree: true
        },
        {
          title: "禁止评论",
          width: "200",
          align: "center",
          slot: "forbid"
        },
        {
          title: "隐藏评论",
          width: "200",
          align: "center",
          align: "center",
          slot: "hide"
        },
        {
          title: "先发后审",
          width: "200",
          align: "center",
          slot: "gloal"
        },
        {
          title: "深层配置",
          slot: "deepSetup",
          align: "center"
        }
      ]
    };
  },
  methods: {
    ...mapActions([
      "getCateParamsList",
      "getArticleList",
      "getCatePageList",
      "getZhengwuPageList",
      "setDetailSetting"
    ]),
    // 点击开关时触发事件
    switchChange(obj) {
      this.setDetailSetting(obj);
    },
    // 点击树形显示数据 获取栏目列表
    handleLoadData(item, callback) {
      this.getZhengwuPageList({ item, callback });
    },
    // 当前页发生变化时
    getCurrectPage(currect) {
      let { orgKey, parentColumnKey, platformKey } = this.$route.query;
      this.getCateParamsList({
        orgKey,
        parentColumnKey,
        platformKey,
        offset: currect,
        pazesize: 10
      });
    },
    ...mapMutations(["setCurrectParams"])
  },
  computed: {
    ...mapGetters(["getParamsColumnList", "getTotal", "getSetting"])
  },
  mounted() {
    // console.log(this.$route.query);
    let { orgKey, parentColumnKey, platformKey } = this.$route.query;
    // 页面一加载请求响应的参数
    this.getCateParamsList({
      orgKey,
      parentColumnKey,
      platformKey,
      offset: 1,
      pazeSize: 10
    });
  }
};
</script>

<style lang="less" scoped>
@import "./list-government.less";
</style>
