<template>
  <div>
    <platformForm></platformForm>
    <Card :bordered="false">
      <div class="pl_contain">
        <div v-for="(item, index) in getPlatFormList" :key="index">
          <template>
            <img
              src="../../../assets/images/icon_huaban.png"
              class="platform_img"
            />
          </template>
          <div>{{ item.platformName }}</div>
        </div>
      </div>
      <div class="pingtai">
        平台列表
        <hr />
        <Tabs type="card" style="margin-top:20px" @on-click="tabsClick1">
          <TabPane
            v-for="(tab, index) in getPlatFormList"
            :key="index"
            :label="tab.platformName"
            :name="tab.platformKey"
          >
            <div class="shuaxin">
              <Button
                type="primary"
                @click="jiGouRefresh(tab.platformKey)"
                style="margin-bottom:10px"
                >刷新机构</Button
              >
              <Input
                v-model="value"
                placeholder="请输入机构名称"
                style="width: 200px;margin-left:20px"
              />
            </div>
            <Table
              row-key="id"
              :columns="columns"
              :data="currectJigouList"
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
      ],
      value: "",
      getJiGouList: []
    };
  },
  computed: {
    ...mapGetters(["getPlatFormList"]),
    // 搜索框 模糊查询
    currectJigouList() {
      return this.getJiGouList.filter((item, index) => {
        return item.orgName.indexOf(this.value) >= 0;
      });
    }
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
    },
    // 标签点击事件
    tabsClick1(name) {
      console.log(name);
      this.tabsClick(name).then(res => {
        console.log(res);
        this.getJiGouList = res;
      });
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
      this.tabsClick(newValue[0].platformKey).then(res => {
        this.getJiGouList = res;
      });
    }
  }
};
</script>

<style lang="less" scoped>
@import "./platform-bind.less";
</style>
