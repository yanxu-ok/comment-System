<template>
  <div>
    <platformForm></platformForm>
    <Card :bordered="false">
      <div class="pl_contain">
        <div v-for="(item, index) in getPlatFormList" :key="index">
          <img src="" class="platform_img" />
          <div>{{ item.platformName }}</div>
        </div>
      </div>
      <div class="pingtai">
        平台列表
        <hr />
        <Tabs type="card" style="margin-top:20px" @on-click="tabsClick">
          <TabPane
            v-for="(tab, index) in getPlatFormList"
            :key="index"
            :label="tab.platformName"
            :name="tab.platformKey"
          >
            <Icon
              type="md-refresh"
              size="28"
              @click="jiGouRefresh(tab.platformKey)"
            />
            <Table
              row-key="id"
              :columns="columns"
              :data="getJiGouList"
              :load-data="handleLoadData"
            >
              <template slot-scope="{ row }" slot="org">
                <span>{{ row.orgName || row.columnName }}</span>
              </template>
              <template slot-scope="{ row }" slot="delete">
                <!-- <Button
                type="error"
                @click="jiGouDelete(row)"
                v-if="row.children"
              >
                删除
              </Button> -->
                <!-- <Icon
                type="md-refresh"
                size="28"
                v-if="row.children"
                @click="cateRefresh(row)"
              /> -->
                <i-switch
                  v-if="!row.children"
                  @on-change="getSwitchChange(row)"
                  v-model="row.status"
                  :true-value="1"
                  :false-value="0"
                ></i-switch>
              </template>
            </Table>
          </TabPane>
        </Tabs>
      </div>
    </Card>
  </div>
</template>

<script>
import platformForm from "./components/platform-form";
import { mapMutations, mapGetters, mapActions, mapState } from "vuex";
export default {
  components: {
    platformForm
  },
  data() {
    return {
      tabs: 3,
      columns: [
        {
          title: "机构",
          tree: true,
          slot: "org"
        },
        {
          title: "操作",
          slot: "delete"
        }
      ]
    };
  },
  computed: {
    ...mapGetters(["getPlatFormList", "getJiGouList"])
  },
  methods: {
    ...mapActions([
      "jiGouRefresh",
      "getPlatforms",
      "getSwitchChange",
      "cateRefresh",
      "getJiGouDelete",
      "getPlatformAdd",
      "tabsClick",
      "getCatesList"
    ]),
    // 点击树形显示数据 获取栏目列表
    handleLoadData(item, callback) {
      console.log(item);
      this.getCatesList({ item, callback });
    }
  },
  mounted() {
    // 页面一加载获取平台
    this.getPlatforms();
  },
  // 监听一下平台数组 根据平台id获取机构列表
  watch: {
    getPlatFormList(newValue, oldVlue) {
      // console.log(newValue);
      this.tabsClick(newValue[0].platformKey);
    }
  }
};
</script>

<style lang="less" scoped>
@import "./platform-bind.less";
</style>
