<template>
  <div class="tabs_contain">
    <Card :bordered="false">
      <Tabs value="1" @on-click="handleClick">
        <TabPane label="敏感词" name="1">
          <filterwords></filterwords>
        </TabPane>
        <TabPane label="非法词" name="2">
          <sensitivewords></sensitivewords>
        </TabPane>
      </Tabs>
    </Card>
  </div>
</template>

<script>
import { mapMutations, mapActions, mapGetters } from "vuex";
import sensitivewords from "./components/sensitive-words";
import filterwords from "./components/filter-words";
export default {
  components: {
    sensitivewords,
    filterwords
  },
  data() {
    return {};
  },
  methods: {
    ...mapActions(["getFilterPage", "saveFilter", "deleteFilterByKey"]),

    // 标签页点击事件
    handleClick(name) {
      console.log(name);
      this.getFilterPage({
        filterType: name,
        filterContent: "",
        pageSize: 10,
        offset: 1
      });
    }
  },
  mounted() {
    // 一开始获取过滤词
    this.getFilterPage({
      filterType: 1,
      filterContent: "",
      pageSize: 10,
      offset: 1
    });
  }
};
</script>

<style lang="less" scoped>
@import "./keywords.less";
</style>
